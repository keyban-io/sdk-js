/*
 * @module RPC services
 */

import { IFrameRpcError, KeybanBaseError, SdkError } from "~/errors";
import type { AuthConnection, KeybanUser } from "~/index";

type Hex = `0x${string}`;

export interface IKeybanAuth {
  isAuthenticated(): Promise<boolean>;
  getUser(): Promise<KeybanUser | null>;
  getLoginUrl(connection?: AuthConnection): Promise<string>;
  getLogoutUrl(redirect?: string): Promise<string>;
}

export interface IKeybanSigner {
  dkg(network: string): Promise<string>;
  sign(clientShare: string, message: string): Promise<Hex>;
  publicKey(clientShare: string): Promise<Hex>;
}

export interface IKeybanClientShareStorage {
  get(): Promise<string | null>;
  set(clientShare: string): Promise<void>;
}

/*
 * RPC types
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CastFn<T> = T extends (...args: any[]) => any ? T : never;

interface IRpc {
  auth: IKeybanAuth;
  ecdsa: IKeybanSigner;
  clientShareStorage: IKeybanClientShareStorage;
}

type Service = keyof IRpc;
type Method<S extends Service> = keyof IRpc[S] & string;
type ClassMethod<S extends Service, M extends Method<S>> = CastFn<IRpc[S][M]>;

type RpcCall<
  S extends Service,
  M extends Method<S>,
  CM extends ClassMethod<S, M> = ClassMethod<S, M>,
> = {
  __KEYBAN_RPC: true;

  service: S;
  method: M;
  params: Parameters<CM>;
};

type RpcResult<
  S extends Service,
  M extends Method<S>,
  CM extends ClassMethod<S, M> = ClassMethod<S, M>,
> = [Awaited<ReturnType<CM>>, null] | [null, string];

/*
 * RPC implementation
 */

export class RpcServer implements IRpc {
  auth!: IKeybanAuth;
  ecdsa!: IKeybanSigner;
  clientShareStorage!: IKeybanClientShareStorage;

  domains: Promise<string[]>;

  constructor(services: IRpc) {
    Object.assign(this, services);

    const appId = new URL(window.location.href).searchParams.get("appId");
    const apiUrl = new URL(window.location.origin);
    this.domains = fetch(new URL(`/applications/${appId}`, apiUrl))
      .then((res) => res.json())
      .then(({ domains }) => domains);

    window.addEventListener("message", this.handleMessage);
  }

  // Forced validation of service's methods, see listener below
  static #definitions: {
    [S in Service]: {
      [M in Method<S>]: true;
    };
  } = {
    auth: {
      isAuthenticated: true,
      getUser: true,
      getLoginUrl: true,
      getLogoutUrl: true,
    },
    ecdsa: {
      dkg: true,
      sign: true,
      publicKey: true,
    },
    clientShareStorage: {
      get: true,
      set: true,
    },
  };

  handleMessage = async <S extends Service, M extends Method<S>>(
    event: MessageEvent<RpcCall<S, M>>,
  ) => {
    if (!event.data.__KEYBAN_RPC) return;

    try {
      // Check the message originated from an allowed domain for this
      // specific application.
      const domains = await this.domains;
      if (!domains.includes(event.origin))
        throw new IFrameRpcError(
          IFrameRpcError.types.InvalidOrigin,
          "RpcServer",
        );

      const { service, method } = event.data;

      // An attacker could possibly try to call a method on the service
      // object that is not intended to be exposed. This  ensures the
      // method is effectively allowed.
      if (!RpcServer.#definitions[service]?.[method])
        throw new IFrameRpcError(
          IFrameRpcError.types.InvalidCall,
          `RpcServer:${service}.${method}`,
        );

      const fn = this[service]?.[method] as ClassMethod<S, M>;
      if (!fn)
        throw new IFrameRpcError(
          IFrameRpcError.types.InvalidCall,
          `RpcServer:${service}.${method}`,
        );

      const result = await fn.apply(this[service], event.data.params);

      event.ports[0].postMessage([result, null]);
    } catch (error) {
      let err = error;

      if (!(err instanceof KeybanBaseError)) {
        console.error(error);
        err = new SdkError(
          SdkError.types.UnknownIframeRpcError,
          "RpcServer",
          error as Error,
        );
      }

      event.ports[0].postMessage([null, JSON.stringify(err)]);
    }
  };
}

/*
 * RPC client
 */

export class RpcClient {
  #iframeUrl: URL;
  #iframe: Promise<HTMLIFrameElement>;

  static #instances: Map<string, RpcClient> = new Map();

  static getInstance(iframeUrl: URL): RpcClient {
    const key = iframeUrl.toString();
    if (!RpcClient.#instances.has(key))
      RpcClient.#instances.set(key, new RpcClient(iframeUrl));

    return RpcClient.#instances.get(key)!;
  }

  private constructor(iframeUrl: URL) {
    this.#iframeUrl = iframeUrl;

    this.#iframe = new Promise((resolve, reject) => {
      const iframe = Object.assign(document.createElement("iframe"), {
        src: this.#iframeUrl,
        hidden: true,
        onload: () => resolve(iframe),
        onerror: reject,
      });

      document.body.appendChild(iframe);
    });
  }

  destroy() {
    this.#iframe.then((iframe) => document.body.removeChild(iframe));
  }

  async call<
    S extends Service,
    M extends Method<S>,
    CM extends ClassMethod<S, M> = ClassMethod<S, M>,
  >(
    service: S,
    method: M,
    ...params: Parameters<CM>
  ): Promise<Awaited<ReturnType<CM>>> {
    const iframe = await this.#iframe;
    const channel = new MessageChannel();

    return await new Promise((resolve, reject) => {
      channel.port1.onmessage = ({
        data: [result, error],
      }: MessageEvent<RpcResult<S, M>>) => {
        channel.port1.close();
        return error != null
          ? reject(new KeybanBaseError(JSON.parse(error)))
          : resolve(result);
      };

      const message: RpcCall<S, M> = {
        __KEYBAN_RPC: true,
        service,
        method,
        params,
      };

      iframe.contentWindow?.postMessage(message, this.#iframeUrl.origin, [
        channel.port2,
      ]);
    });
  }
}

/*
 * RPC services
 */

import { KeybanBaseError } from "~/errors";

type Hex = `0x${string}`;

/**
 * Interface for the Keyban signer.
 * This interface defines the methods that a Keyban signer must implement.
 * The signer is responsible for generating and signing keys.
 * The signer is also responsible for generating the public key from the client share.
 * The signer is used by the Keyban client to sign messages and generate public keys.
 * @private
 */
export interface IKeybanSigner {
  dkg(apiUrl: string, keyId: string, accessToken: string): Promise<void>;
  sign(
    apiUrl: string,
    appId: string,
    accessToken: string,
    message: string,
  ): Promise<Hex>;
  publicKey(): Promise<Hex>;
}

/*
 * RPC types
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CastFn<T> = T extends (...args: any[]) => any ? T : never;

interface IRpc {
  ecdsa: IKeybanSigner;
}

type Service = keyof IRpc;
type Method<S extends Service> = keyof IRpc[S];
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
  ecdsa!: IKeybanSigner;

  constructor(services: IRpc) {
    Object.assign(this, services);

    window.addEventListener(
      "message",
      async <S extends Service, M extends Method<S>>({
        data,
        ports,
      }: MessageEvent<RpcCall<S, M>>) => {
        if (!data.__KEYBAN_RPC) return;

        try {
          const { service, method } = data;

          const fn = this[service]?.[method] as ClassMethod<S, M>;
          if (!fn) throw new Error("Invalid RPC call");

          const result = await fn(...data.params);

          ports[0].postMessage([result, null]);
        } catch (error) {
          ports[0].postMessage([null, JSON.stringify(error)]);
        }
      },
    );
  }
}

/*
 * RPC client
 */

export class RpcClient {
  #iframe: Promise<HTMLIFrameElement>;

  constructor(iframeURL: URL) {
    this.#iframe = new Promise((resolve, reject) => {
      const iframe = Object.assign(document.createElement("iframe"), {
        src: iframeURL,
        hidden: true,
        onload: () => resolve(iframe),
        onerror: reject,
      });

      document.body.appendChild(iframe);
    });
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

      iframe.contentWindow?.postMessage(message, "*", [channel.port2]);
    });
  }
}

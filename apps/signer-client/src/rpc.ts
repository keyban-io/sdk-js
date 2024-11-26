/*
 * RPC services
 */

export interface ISigner {
  greet(name: string): Promise<void>;
  square(x: number): Promise<number>;
}

export interface IYolo {
  yolo(): Promise<void>;
}

/*
 * RPC types
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CastFn<T> = T extends (...args: any[]) => any ? T : never;

interface IRpc {
  signer: ISigner;
  yolo: IYolo;
}

type Service = keyof IRpc;
type Method<S extends Service> = keyof IRpc[S];
type ClassMethod<S extends Service, M extends Method<S>> = CastFn<IRpc[S][M]>;

type RpcCall<
  S extends Service,
  M extends Method<S>,
  CM extends ClassMethod<S, M> = ClassMethod<S, M>,
> = {
  __keybanRPC: true;

  service: S;
  method: M;
  params: Parameters<CM>;
};

type RpcResult<
  S extends Service,
  M extends Method<S>,
  CM extends ClassMethod<S, M> = ClassMethod<S, M>,
> = [Awaited<ReturnType<CM>>, null] | [null, Error];

/*
 * RPC implementation
 */

export class RpcServer implements IRpc {
  signer: ISigner;
  yolo: IYolo;

  constructor(signer: ISigner, yolo: IYolo) {
    this.signer = signer;
    this.yolo = yolo;

    window.addEventListener(
      "message",
      <S extends Service, M extends Method<S>>({
        data,
        ports,
      }: MessageEvent<RpcCall<S, M>>) => {
        if (!data.__keybanRPC) return;

        const fn = this[data.service]?.[data.method] as ClassMethod<S, M>;
        if (!fn)
          return ports[0].postMessage([null, new Error("Invalid RPC call")]);

        fn(...data.params)
          .then((result: ReturnType<ClassMethod<S, M>>) => {
            ports[0].postMessage([result, null]);
          })
          .catch((error: Error) => {
            ports[0].postMessage([null, error]);
          });
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
        return error ? reject(error) : resolve(result);
      };

      const message: RpcCall<S, M> = {
        __keybanRPC: true,
        service,
        method,
        params,
      };

      iframe.contentWindow?.postMessage(message, "*", [channel.port2]);
    });
  }
}

export const createRpcClient = (iframeURL: URL) => {
  const client = new RpcClient(iframeURL);

  type S = Service;
  type M = Method<Service>;
  type CM = ClassMethod<S, M>;

  return new Proxy({} as IRpc, {
    get(_, service: Service) {
      return new Proxy(
        {},
        {
          get(_, method: Method<Service>) {
            return async (...params: Parameters<CM>) => {
              return client.call(service, method, ...params);
            };
          },
        },
      );
    },
  });
};

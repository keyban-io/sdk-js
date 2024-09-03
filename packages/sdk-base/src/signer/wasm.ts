import { KeybanBaseError, SdkError } from "~/errors";

export const WasmKeybanSigner = (initWasmFile: () => Promise<unknown>) => {
  abstract class AbstractWasmKeybanSigner {
    constructor() {
      if (!WebAssembly)
        throw new SdkError(
          SdkError.types.WebAssemblyNotSupported,
          "AbstractWasmKeybanSigner",
        );
    }

    static #wasmPromise = initWasmFile();

    static wrap =
      <Args extends any[], Ret = unknown>(
        fn: (...args: Args) => Promise<Ret>,
      ) =>
      async (...args: Args) => {
        await AbstractWasmKeybanSigner.#wasmPromise;
        return fn(...args).catch((err) => {
          throw new KeybanBaseError(err);
        });
      };
  }

  return AbstractWasmKeybanSigner;
};

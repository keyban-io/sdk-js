import { KeybanBaseError, SdkError } from "@keyban/sdk-base";

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
      <Args extends unknown[], Ret = unknown>(
        fn: (...args: Args) => Promise<Ret>,
      ) =>
      (...args: Args) =>
        AbstractWasmKeybanSigner.#wasmPromise
          .then(() => fn(...args))
          .catch((err) => {
            throw new KeybanBaseError(err);
          });
  }

  return AbstractWasmKeybanSigner;
};

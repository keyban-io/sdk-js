import { KeybanBaseError } from "@keyban/sdk-base";

import { SignerClientError } from "~/errors/SignerClientError";

export const WasmKeybanSigner = (initWasmFile: () => Promise<unknown>) => {
  abstract class AbstractWasmKeybanSigner {
    constructor() {
      if (!WebAssembly)
        throw new SignerClientError(
          SignerClientError.types.WebAssemblyNotSupported,
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
            console.error(err);
            throw new KeybanBaseError(err);
          });
  }

  return AbstractWasmKeybanSigner;
};

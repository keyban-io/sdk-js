import initWasm from "@keyban/ecdsa-wasm-client";
import { KeybanBaseError } from "@keyban/sdk-base/errors";
import { IKeybanSigner } from "@keyban/sdk-base/rpc";

import { WasmError } from "~/errors/WasmError";
import { AbstractKeybanSigner } from "~/signer/signer";
import { API_URL } from "~/utils/api";

export class KeybanSigner_ECDSA
  extends AbstractKeybanSigner
  implements IKeybanSigner
{
  static #wasm = initWasm()
    .then(() => globalThis.ecdsa)
    .catch((err) => {
      throw new WasmError(
        WasmError.types.WebAssemblyInitialization,
        "KeybanSigner_ECDSA",
        err,
      );
    });

  constructor() {
    if (!WebAssembly)
      throw new WasmError(
        WasmError.types.WebAssemblyNotSupported,
        "KeybanSigner_ECDSA",
      );

    super();
  }

  async dkg(appId: string, accessToken: string) {
    const wasm = await KeybanSigner_ECDSA.#wasm;
    return wasm.dkg(API_URL.origin, appId, accessToken).catch((err) => {
      throw new KeybanBaseError(err);
    });
  }

  async sign(appId: string, accessToken: string, message: string) {
    const [wasm, clientShare] = await Promise.all([
      KeybanSigner_ECDSA.#wasm,
      this.getClientShare(appId, accessToken),
    ]);

    return wasm
      .sign(API_URL.origin, appId, accessToken, clientShare, message)
      .catch((err) => {
        throw new KeybanBaseError(err);
      });
  }

  async publicKey(appId: string, accessToken: string) {
    const [wasm, clientShare] = await Promise.all([
      KeybanSigner_ECDSA.#wasm,
      this.getClientShare(appId, accessToken),
    ]);

    return wasm.publicKey(clientShare).catch((err) => {
      throw new KeybanBaseError(err);
    });
  }
}

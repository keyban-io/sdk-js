import initWasm from "@keyban/ecdsa-wasm-client";
import { KeybanBaseError } from "@keyban/sdk-base/errors";
import { IKeybanSigner } from "@keyban/sdk-base/rpc";

import { WasmError } from "~/errors/WasmError";
import { AbstractKeybanSigner } from "~/signer/signer";
import { API_URL } from "~/utils/api";
import { APP_ID } from "~/utils/appId";

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

  constructor(auth: { getToken(): Promise<string> }) {
    if (!WebAssembly)
      throw new WasmError(
        WasmError.types.WebAssemblyNotSupported,
        "KeybanSigner_ECDSA",
      );

    super(auth);
  }

  async dkg() {
    const wasm = await KeybanSigner_ECDSA.#wasm;
    return wasm
      .dkg(API_URL.origin, APP_ID, await this.auth.getToken())
      .catch((err) => {
        throw new KeybanBaseError(err);
      });
  }

  async sign(clientShareKey: JsonWebKey, message: string) {
    const [wasm, clientShare] = await Promise.all([
      KeybanSigner_ECDSA.#wasm,
      this.getClientShare(clientShareKey),
    ]);

    return wasm
      .sign(
        API_URL.origin,
        APP_ID,
        await this.auth.getToken(),
        clientShare,
        message,
      )
      .catch((err) => {
        throw new KeybanBaseError(err);
      });
  }

  async publicKey(clientShareKey: JsonWebKey) {
    const [wasm, clientShare] = await Promise.all([
      KeybanSigner_ECDSA.#wasm,
      this.getClientShare(clientShareKey),
    ]);

    return wasm.publicKey(clientShare).catch((err) => {
      throw new KeybanBaseError(err);
    });
  }
}

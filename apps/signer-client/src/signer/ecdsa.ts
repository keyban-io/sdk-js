import initWasm from "@keyban/ecdsa-wasm-client";
import { KeybanBaseError } from "@keyban/sdk-base/errors";
import { IKeybanSigner } from "@keyban/sdk-base/rpc";

import { KeybanAuth } from "~/auth";
import { API_URL, APP_ID, NETWORK } from "~/constants";
import { WasmError } from "~/errors/WasmError";

export class KeybanSigner_ECDSA implements IKeybanSigner {
  static #wasm = initWasm()
    .then(() => globalThis.ecdsa)
    .catch((err) => {
      throw new WasmError(
        WasmError.types.WebAssemblyInitialization,
        "KeybanSigner_ECDSA",
        { rootError: err },
      );
    });

  #auth: KeybanAuth;

  constructor(auth: KeybanAuth) {
    if (!WebAssembly)
      throw new WasmError(
        WasmError.types.WebAssemblyNotSupported,
        "KeybanSigner_ECDSA",
      );

    this.#auth = auth;
  }

  async dkg() {
    const wasm = await KeybanSigner_ECDSA.#wasm;

    return wasm
      .dkg(
        API_URL.origin,
        `?network=${NETWORK}`,
        APP_ID,
        await this.#auth.getToken(),
      )
      .catch((err) => {
        throw new KeybanBaseError(err);
      });
  }

  async sign(clientShare: string, message: string) {
    const wasm = await KeybanSigner_ECDSA.#wasm;

    return wasm
      .sign(
        API_URL.origin,
        APP_ID,
        await this.#auth.getToken(),
        clientShare,
        message,
      )
      .catch((err) => {
        throw new KeybanBaseError(err);
      });
  }

  async publicKey(clientShare: string) {
    const wasm = await KeybanSigner_ECDSA.#wasm;

    return wasm.publicKey(clientShare).catch((err) => {
      throw new KeybanBaseError(err);
    });
  }
}

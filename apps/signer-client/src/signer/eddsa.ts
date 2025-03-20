import initWasm, { dkg, public_key, sign } from "@keyban/eddsa-wasm-client";
import { KeybanBaseError } from "@keyban/sdk-base/errors";
import { IKeybanSigner } from "@keyban/sdk-base/rpc";

import { KeybanAuth } from "~/auth";
import { WasmError } from "~/errors/WasmError";
import { API_URL } from "~/utils/api";
import { APP_ID } from "~/utils/appId";

export class KeybanSigner_EDDSA implements IKeybanSigner {
  static #wasm = initWasm()
    .then(() => {
      return { dkg, sign, public_key };
    })
    .catch((err: Error) => {
      throw new WasmError(
        WasmError.types.WebAssemblyInitialization,
        "KeybanSigner_EDDSA",
        err,
      );
    });

  #auth: KeybanAuth;

  constructor(auth: KeybanAuth) {
    if (!WebAssembly)
      throw new WasmError(
        WasmError.types.WebAssemblyNotSupported,
        "KeybanSigner_EDDSA",
      );

    this.#auth = auth;
  }

  async dkg(network: string) {
    const wasm = await KeybanSigner_EDDSA.#wasm;

    return wasm
      .dkg(
        API_URL.origin + `?network=${network}`,
        APP_ID,
        await this.#auth.getToken(),
      )
      .catch((err) => {
        throw new KeybanBaseError(err);
      });
  }

  async sign(clientShare: string, message: string) {
    const wasm = await KeybanSigner_EDDSA.#wasm;

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
    const wasm = await KeybanSigner_EDDSA.#wasm;

    return wasm.public_key(clientShare).catch((err) => {
      throw new KeybanBaseError(err);
    });
  }
}

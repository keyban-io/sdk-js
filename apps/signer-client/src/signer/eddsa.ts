import initWasm, { dkg, public_key, sign } from "@keyban/eddsa-wasm-client";
import { KeybanBaseError } from "@keyban/sdk-base/errors";
import { IKeybanSigner } from "@keyban/sdk-base/rpc";

import { KeybanAuth } from "~/auth";
import { API_URL, APP_ID, NETWORK } from "~/constants";
import { WasmError } from "~/errors/WasmError";

export class KeybanSigner_EDDSA implements IKeybanSigner {
  static #wasm = initWasm()
    .then(() => {
      return { dkg, sign, public_key };
    })
    .catch((err: Error) => {
      throw new WasmError(
        WasmError.types.WebAssemblyInitialization,
        "KeybanSigner_EDDSA",
        { rootError: err },
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

  async dkg() {
    const wasm = await KeybanSigner_EDDSA.#wasm;

    return wasm
      .dkg(
        API_URL.origin + `?network=${NETWORK}`,
        APP_ID,
        await this.#auth.getToken(),
      )
      .catch((err: Error) => {
        // @ts-expect-error: I don't known how to pass correct type here
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
      .catch((err: Error) => {
        // @ts-expect-error: I don't known how to pass correct type here
        throw new KeybanBaseError(err);
      });
  }

  async publicKey(clientShare: string) {
    const wasm = await KeybanSigner_EDDSA.#wasm;

    return wasm.public_key(clientShare).catch((err: Error) => {
      // @ts-expect-error: I don't known how to pass correct type here
      throw new KeybanBaseError(err);
    });
  }
}

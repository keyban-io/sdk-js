import initWasmFile from "ecdsa-wasm-client";
import { SdkError } from "~/errors";
import type { KeybanSigner } from "~/signer";

export type ClientShare_ECDSA = {
  Setup: string;
  SecretShare: string;
  Public: string;
  ChainKey: string;
};

let wasmPromise: Promise<void> | undefined;

export function KeybanSigner_ECDSA(): KeybanSigner<ClientShare_ECDSA> {
  if (!WebAssembly)
    throw new SdkError(SdkError.types.WebAssemblyNotSupported, "getSigner");

  wasmPromise ??= initWasmFile();

  const wrap =
    <Args extends any[], Ret = unknown>(
      fn: (...args: Args) => Ret | Promise<Ret>,
    ) =>
    async (...args: Args) => {
      await wasmPromise;
      return fn(...args);
    };

  return {
    storagePrefix: "KEYBAN-ECDSA",

    dkg: wrap((...args) => globalThis.ecdsa.dkg(...args).then(JSON.parse)),
    sign: wrap((keyId, clientShare, message, apiUrl) =>
      globalThis.ecdsa.sign(
        keyId,
        JSON.stringify(clientShare),
        message,
        apiUrl,
      ),
    ),
    publicKey: wrap((clientShare) =>
      globalThis.ecdsa.publicKey(JSON.stringify(clientShare)),
    ),
  };
}

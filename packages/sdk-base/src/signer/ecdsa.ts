import initWasmFile from "ecdsa-wasm-client";
import type { KeybanSigner } from "~/signer";
import { SdkError } from "~/errors";

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
      fn: (...args: Args) => Ret | Promise<Ret>
    ) =>
    async (...args: Args) => {
      await wasmPromise;
      return fn(...args);
    };

  return {
    storagePrefix: "KEYBAN-ECDSA",

    add: wrap((...args) => (window as any).ecdsa.add(...args)),
    dkg: wrap((...args) => (window as any).ecdsa.dkg(...args).then(JSON.parse)),
    sign: wrap((keyId, clientShare, message) =>
      (window as any).ecdsa.sign(keyId, JSON.stringify(clientShare), message)
    ),
    publicKey: wrap((clientShare) =>
      (window as any).ecdsa.publicKey(JSON.stringify(clientShare))
    ),
  };
}

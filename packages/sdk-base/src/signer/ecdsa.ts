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
    (fn: Function) =>
    async (...args: any[]) => {
      await wasmPromise;
      return fn(...args);
    };

  return {
    storagePrefix: "KEYBAN-ECDSA",

    add: wrap((...args: any[]) => (window as any).ecdsa.add(...args)),
    dkg: wrap((...args: any[]) =>
      (window as any).ecdsa.dkg(...args).then(JSON.parse)
    ),
    sign: wrap(
      (keyId: string, clientShare: ClientShare_ECDSA, message: string) =>
        (window as any).ecdsa.sign(keyId, JSON.stringify(clientShare), message)
    ),
    publicKey: wrap((clientShare: ClientShare_ECDSA) =>
      (window as any).ecdsa.publicKey(JSON.stringify(clientShare))
    ),
    clientPublicKey: (clientShare) => clientShare.Public,
  };
}

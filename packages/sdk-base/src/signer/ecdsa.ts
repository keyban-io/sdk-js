import initWasmFile from "ecdsa-wasm-client";
import type { KeybanSigner } from "~/signer";
import { SdkError } from "~/errors";

export type ClientShare_ECDSA = {
  Setup: string;
  SecretShare: string;
  Public: string;
  ChainKey: string;
};

export async function KeybanSigner_ECDSA(): Promise<
  KeybanSigner<ClientShare_ECDSA>
> {
  if (!WebAssembly)
    throw new SdkError(SdkError.types.WebAssemblyNotSupported, "getSigner");

  await initWasmFile();

  const { add, dkg, sign, publicKey } = (window as any).ecdsa;

  return {
    storagePrefix: "KEYBAN-ECDSA",

    add: (...args) => Promise.resolve(add(...args)),
    dkg: (...args) => dkg(...args).then(JSON.parse),
    sign: (keyId, clientShare, message) =>
      sign(keyId, JSON.stringify(clientShare), message),
    publicKey: (clientShare) => publicKey(JSON.stringify(clientShare)),
    clientPublicKey: (clientShare) => clientShare.Public,
  };
}

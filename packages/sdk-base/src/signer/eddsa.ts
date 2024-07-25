import initWasmFile, { add, dkg, sign } from "eddsa-wasm-client";
import { KeybanSigner } from "~/signer";
import { SdkError } from "~/errors";

export type ClientShare_EdDSA = {
  client_pubkey: string;
  secret_share: {
    version: string;
    keypair: string;
  };
  server_pubkey: string;
};

export async function KeybanSigner_EdDSA(): Promise<
  KeybanSigner<ClientShare_EdDSA>
> {
  if (!WebAssembly)
    throw new SdkError(SdkError.types.WebAssemblyNotSupported, "getSigner");

  await initWasmFile();

  return {
    storagePrefix: "KEYBAN-EDDSA",

    add: (...args) => Promise.resolve(add(...args)),
    dkg,
    sign: (keyId, clientShare, message) =>
      sign(keyId, clientShare.secret_share, message),
    publicKey: async () => {
      throw new Error("Unimplemented: eddsa signer publicKey");
    },
    clientPublicKey: (clientShare) => clientShare.client_pubkey,
  };
}

import initWasmFile, { add, dkg, InitOutput, sign } from "eddsa-wasm-client";
import { KeybanSigner } from "~/signer";
import { SdkError } from "~/errors";
import { Hex } from "viem";

export type ClientShare_EdDSA = {
  client_pubkey: string;
  secret_share: {
    version: string;
    keypair: string;
  };
  server_pubkey: string;
};

let wasmPromise: Promise<InitOutput> | undefined;

export function KeybanSigner_EdDSA(): KeybanSigner<ClientShare_EdDSA> {
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
    storagePrefix: "KEYBAN-EDDSA",

    add: wrap(add),
    dkg: wrap(dkg),
    sign: wrap(
      (keyId: string, clientShare: ClientShare_EdDSA, message: string) =>
        sign(keyId, clientShare.secret_share, message)
    ),
    publicKey: wrap(async () => {
      // throw new Error("Unimplemented: eddsa signer publicKey");
      console.warn("Unimplemented: eddsa signer publicKey");
      return "TODO" as unknown as Hex;
    }),
    clientPublicKey: (clientShare) => clientShare.client_pubkey,
  };
}

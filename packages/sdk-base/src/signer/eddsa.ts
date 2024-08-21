import initWasmFile, { dkg, sign } from "eddsa-wasm-client";
import { type KeybanSigner } from "~/signer";
import { WasmKeybanSigner } from "~/signer/wasm";

export class KeybanSigner_EdDSA
  extends WasmKeybanSigner(initWasmFile)
  implements KeybanSigner
{
  storagePrefix = "KEYBAN-EDDSA";

  dkg: KeybanSigner["dkg"] = KeybanSigner_EdDSA.wrap((...args) =>
    dkg(...args).then(JSON.stringify),
  );

  sign: KeybanSigner["sign"] = KeybanSigner_EdDSA.wrap(
    async (keyId, clientShare, message, apiUrl) => {
      const { secret_share } = JSON.parse(clientShare);
      const hash = await sign(keyId, secret_share, message, apiUrl);
      return `0x${hash}` as const;
    },
  );

  publicKey: KeybanSigner["publicKey"] = async (clientShare) => {
    const { client_pubkey } = JSON.parse(clientShare);
    return `0x${client_pubkey}` as const;
  };
}

import initWasmFile, { dkg, sign } from "eddsa-wasm-client";
import { type IKeybanSigner } from "~/signer";
import { WasmKeybanSigner } from "~/signer/wasm";

export class KeybanSigner_EdDSA
  extends WasmKeybanSigner(initWasmFile)
  implements IKeybanSigner
{
  storagePrefix = "KEYBAN-EDDSA";

  dkg: IKeybanSigner["dkg"] = KeybanSigner_EdDSA.wrap((...args) =>
    dkg(...args).then(JSON.stringify),
  );

  sign: IKeybanSigner["sign"] = KeybanSigner_EdDSA.wrap(
    async (keyId, clientShare, message, apiUrl) => {
      const { secret_share } = JSON.parse(clientShare);
      const hash = await sign(keyId, secret_share, message, apiUrl);
      return `0x${hash}` as const;
    },
  );

  publicKey: IKeybanSigner["publicKey"] = async (clientShare) => {
    const { client_pubkey } = JSON.parse(clientShare);
    return `0x${client_pubkey}` as const;
  };
}

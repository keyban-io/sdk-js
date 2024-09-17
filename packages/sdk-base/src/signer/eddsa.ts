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
    async (apiUrl, appId, accessToken, clientShare, message) => {
      const { secret_share } = JSON.parse(clientShare);
      const hash = await sign(
        apiUrl,
        appId,
        accessToken,
        secret_share,
        message,
      );
      return `0x${hash}` as const;
    },
  );

  publicKey: IKeybanSigner["publicKey"] = async (clientShare) => {
    const { client_pubkey } = JSON.parse(clientShare);
    return `0x${client_pubkey}` as const;
  };
}

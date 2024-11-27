import initWasmFile from "@keyban/ecdsa-wasm-client";
import { IKeybanSigner } from "@keyban/sdk-base/rpc";

import { WasmKeybanSigner } from "~/signer/wasm";

export class KeybanSigner_ECDSA
  extends WasmKeybanSigner(initWasmFile)
  implements IKeybanSigner
{
  dkg: IKeybanSigner["dkg"] = KeybanSigner_ECDSA.wrap(async (...args) => {
    const clientShare = localStorage.getItem("KEYBAN_ECDSA");
    if (clientShare) return;

    localStorage.setItem("KEYBAN_ECDSA", await globalThis.ecdsa.dkg(...args));
  });

  sign: IKeybanSigner["sign"] = KeybanSigner_ECDSA.wrap(
    (apiUrl, appId, accessToken, message) => {
      const clientShare = localStorage.getItem("KEYBAN_ECDSA");
      if (!clientShare) throw new Error("InvalidClientShare");

      return globalThis.ecdsa.sign(
        apiUrl,
        appId,
        accessToken,
        clientShare,
        message,
      );
    },
  );

  publicKey: IKeybanSigner["publicKey"] = KeybanSigner_ECDSA.wrap(() => {
    const clientShare = localStorage.getItem("KEYBAN_ECDSA");
    if (!clientShare) throw new Error("InvalidClientShare");
    return globalThis.ecdsa.publicKey(clientShare);
  });
}

import initWasmFile from "@keyban/ecdsa-wasm-client";
import { IKeybanSigner } from "@keyban/sdk-base/rpc";

import { parseJwt } from "~/jwt";
import { WasmKeybanSigner } from "~/signer/wasm";

export class KeybanSigner_ECDSA
  extends WasmKeybanSigner(initWasmFile)
  implements IKeybanSigner
{
  dkg: IKeybanSigner["dkg"] = KeybanSigner_ECDSA.wrap(
    async (appId, accessToken) => {
      const { sub } = parseJwt(accessToken);

      const clientShare = localStorage.getItem(`KEYBAN_ECDSA:${sub}`);
      if (clientShare) return;

      localStorage.setItem(
        `KEYBAN_ECDSA:${sub}`,
        await globalThis.ecdsa.dkg(window.location.origin, appId, accessToken),
      );
    },
  );

  sign: IKeybanSigner["sign"] = KeybanSigner_ECDSA.wrap(
    (appId, accessToken, message) => {
      const { sub } = parseJwt(accessToken);

      const clientShare = localStorage.getItem(`KEYBAN_ECDSA:${sub}`);
      if (!clientShare) throw new Error("InvalidClientShare");

      return globalThis.ecdsa.sign(
        window.location.origin,
        appId,
        accessToken,
        clientShare,
        message,
      );
    },
  );

  publicKey: IKeybanSigner["publicKey"] = KeybanSigner_ECDSA.wrap(
    (_, accessToken) => {
      const { sub } = parseJwt(accessToken);

      const clientShare = localStorage.getItem(`KEYBAN_ECDSA:${sub}`);
      if (!clientShare) throw new Error("InvalidClientShare");

      return globalThis.ecdsa.publicKey(clientShare);
    },
  );
}

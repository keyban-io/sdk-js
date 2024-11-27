import initWasmFile from "@keyban/ecdsa-wasm-client";
import { IKeybanSigner } from "@keyban/sdk-base/rpc";

import { WasmKeybanSigner } from "~/signer/wasm";

export class KeybanSigner_ECDSA
  extends WasmKeybanSigner(initWasmFile)
  implements IKeybanSigner
{
  dkg: IKeybanSigner["dkg"] = KeybanSigner_ECDSA.wrap((...args) =>
    globalThis.ecdsa.dkg(...args),
  );

  sign: IKeybanSigner["sign"] = KeybanSigner_ECDSA.wrap((...args) =>
    globalThis.ecdsa.sign(...args),
  );

  publicKey: IKeybanSigner["publicKey"] = KeybanSigner_ECDSA.wrap((...args) =>
    globalThis.ecdsa.publicKey(...args),
  );
}

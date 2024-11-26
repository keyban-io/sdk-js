import { type IKeybanSigner } from "~/signer";
import { WasmKeybanSigner } from "~/signer/wasm";

import initWasmFile from "@keyban/ecdsa-wasm-client";

export class KeybanSigner_ECDSA
  extends WasmKeybanSigner(initWasmFile)
  implements IKeybanSigner {
  storagePrefix = "KEYBAN-ECDSA";

  dkg: IKeybanSigner["dkg"] = KeybanSigner_ECDSA.wrap((...args) =>
    (globalThis as any).ecdsa.dkg(...args),
  );

  sign: IKeybanSigner["sign"] = KeybanSigner_ECDSA.wrap((...args) =>
    (globalThis as any).ecdsa.sign(...args),
  );

  publicKey: IKeybanSigner["publicKey"] = KeybanSigner_ECDSA.wrap((...args) =>
    (globalThis as any).ecdsa.publicKey(...args),
  );
}

import initWasmFile from "ecdsa-wasm-client";
import { type KeybanSigner } from "~/signer";
import { WasmKeybanSigner } from "~/signer/wasm";

export class KeybanSigner_ECDSA
  extends WasmKeybanSigner(initWasmFile)
  implements KeybanSigner
{
  storagePrefix = "KEYBAN-ECDSA";

  dkg: KeybanSigner["dkg"] = KeybanSigner_ECDSA.wrap((...args) =>
    globalThis.ecdsa.dkg(...args),
  );

  sign: KeybanSigner["sign"] = KeybanSigner_ECDSA.wrap((...args) =>
    globalThis.ecdsa.sign(...args),
  );

  publicKey: KeybanSigner["publicKey"] = KeybanSigner_ECDSA.wrap((...args) =>
    globalThis.ecdsa.publicKey(...args),
  );
}

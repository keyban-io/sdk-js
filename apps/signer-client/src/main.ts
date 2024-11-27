import { RpcServer } from "@keyban/sdk-base/rpc";

import { KeybanSigner_ECDSA } from "~/signer/ecdsa";

new RpcServer({
  ecdsa: new KeybanSigner_ECDSA(),
});

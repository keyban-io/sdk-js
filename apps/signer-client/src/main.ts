import { RpcServer } from "@keyban/sdk-base/rpc";

import { KeybanAuth } from "~/auth";
import { KeybanClientShareStorage } from "~/clientShareStorage";
import { KeybanSigner_ECDSA } from "~/signer/ecdsa";

const auth = new KeybanAuth();
const ecdsa = new KeybanSigner_ECDSA(auth);
const clientShareStorage = new KeybanClientShareStorage(auth);

new RpcServer({ auth, ecdsa, clientShareStorage });

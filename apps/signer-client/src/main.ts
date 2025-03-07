import { RpcServer } from "@keyban/sdk-base/rpc";

import { KeybanAuth } from "~/auth";
import { KeybanClientShareStorage } from "~/clientShareStorage";
import { KeybanSigner_ECDSA } from "~/signer/ecdsa";

import { KeybanSigner_EDDSA } from "./signer/eddsa";

const auth = new KeybanAuth();
const ecdsa = new KeybanSigner_ECDSA(auth);
const eddsa = new KeybanSigner_EDDSA(auth);
const clientShareStorage = new KeybanClientShareStorage(auth);

new RpcServer({ auth, ecdsa, eddsa, clientShareStorage });

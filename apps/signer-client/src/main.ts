import { RpcServer } from "@keyban/sdk-base/rpc";

import { KeybanAuth } from "~/auth";
import { KeybanSigner_ECDSA } from "~/signer/ecdsa";

const url = new URL(window.location.href);
const appId = url.searchParams.get("appId");
if (!appId) throw new Error("Invalid appId");

const auth = new KeybanAuth();
const ecdsa = new KeybanSigner_ECDSA(auth);

new RpcServer({ auth, ecdsa });

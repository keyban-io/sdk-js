import { RpcServer } from "@keyban/sdk-base/rpc";

import { KeybanAccount } from "~/account";
import { KeybanAuth } from "~/auth";
import { KeybanClientShareStorage } from "~/clientShareStorage";
import { APPLICATION_PROMISE } from "~/constants";
import { KeybanSigner_ECDSA } from "~/signer/ecdsa";
import { KeybanSigner_EDDSA } from "~/signer/eddsa";
import { KeybanTpp } from "~/tpp";

const auth = new KeybanAuth();
const ecdsa = new KeybanSigner_ECDSA(auth);
const eddsa = new KeybanSigner_EDDSA(auth);
const account = new KeybanAccount(auth);
const clientShareStorage = new KeybanClientShareStorage(auth);
const tpp = new KeybanTpp(auth);

new RpcServer(
  { auth, ecdsa, eddsa, account, clientShareStorage, tpp },
  APPLICATION_PROMISE.then(({ domains }) => domains),
);

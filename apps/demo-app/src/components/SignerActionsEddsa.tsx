import type React from "react";
import {
  KeybanLocalStorage,
  KeybanProvider,
  KeybanSigner,
} from "@keyban/sdk-react";
import SignerActionsContent from "../pages/SignerActionsContent";

const SignerActionsEddsa: React.FC = () => (
  <KeybanProvider signer={KeybanSigner.EdDSA} storage={KeybanLocalStorage}>
    <SignerActionsContent keyId="my-eddsa-key-id" />
  </KeybanProvider>
);

export default SignerActionsEddsa;

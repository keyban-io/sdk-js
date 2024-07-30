import type React from "react";
import {
  KeybanLocalStorage,
  KeybanProvider,
  KeybanSigner,
} from "@keyban/sdk-react";
import SignerActionsContent from "../pages/SignerActionsContent";

const SignerActionsEcdsa: React.FC = () => (
  <KeybanProvider signer={KeybanSigner.ECDSA} storage={KeybanLocalStorage}>
    <SignerActionsContent keyId="my-ecdsa-key-id" />
  </KeybanProvider>
);

export default SignerActionsEcdsa;

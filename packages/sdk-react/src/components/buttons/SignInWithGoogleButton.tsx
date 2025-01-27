import Button from "@mui/material/Button";
import * as React from "react";

import { useKeybanAuth } from "../../index"; // Adjust the import path as needed
import { GoogleIcon } from "../CustomIcons";

const SignInWithGoogleButton: React.FC = () => {
  const { login } = useKeybanAuth();

  return (
    <Button
      fullWidth
      variant="outlined"
      onClick={() => login("google-oauth2")}
      startIcon={<GoogleIcon />}
    >
      Sign in with Google
    </Button>
  );
};

export default SignInWithGoogleButton;

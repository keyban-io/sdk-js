import Button from "@mui/material/Button";
import * as React from "react";

import { useKeybanAuth } from "../../index"; // Adjust the import path as needed
import { GoogleIcon } from "../CustomIcons";

const SignInWithGoogleButton: React.FC<{ language?: "en" | "fr" | "es" }> = ({
  language = "en",
}) => {
  const { login } = useKeybanAuth();

  const translations = {
    en: { signInGoogle: "Sign in with Google" },
    fr: { signInGoogle: "Se connecter avec Google" },
    es: { signInGoogle: "Iniciar sesión con Google" },
  };

  return (
    <Button
      fullWidth
      variant="outlined"
      onClick={() => login("google-oauth2")}
      startIcon={<GoogleIcon />}
    >
      {translations[language].signInGoogle}
    </Button>
  );
};

export default SignInWithGoogleButton;

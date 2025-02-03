import Button from "@mui/material/Button";
import * as React from "react";

import { useKeybanAuth } from "../../index";
import { getDefaultLanguage } from "../../utils/languageUtils";
import { FacebookIcon } from "../CustomIcons";

const SignInWithFacebookButton: React.FC<{ language?: "en" | "fr" | "es" }> = ({
  language = getDefaultLanguage(),
}) => {
  const { login } = useKeybanAuth();

  const translations = {
    en: { signInFacebook: "Sign in with Facebook" },
    fr: { signInFacebook: "Se connecter avec Facebook" },
    es: { signInFacebook: "Iniciar sesión con Facebook" },
  };

  return (
    <Button
      fullWidth
      variant="outlined"
      onClick={() => login("facebook-oauth2")}
      startIcon={<FacebookIcon />}
    >
      {translations[language].signInFacebook}
    </Button>
  );
};

export default SignInWithFacebookButton;

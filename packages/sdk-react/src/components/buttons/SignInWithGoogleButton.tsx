import Button from "@mui/material/Button";
import * as React from "react";

import { useKeybanAuth } from "../../index"; // Adjust the import path as needed
import { getDefaultLanguage } from "../../utils/languageUtils";
import { GoogleIcon } from "../CustomIcons";

const SignInWithGoogleButton: React.FC<{ language?: "en" | "fr" | "es" }> = ({
  language = getDefaultLanguage(),
}) => {
  const { login } = useKeybanAuth();

  const translations = {
    en: { signInGoogle: "Sign in with Google" },
    fr: { signInGoogle: "Se connecter avec Google" },
    es: { signInGoogle: "Iniciar sesión con Google" },
  };

  const [t, setT] = React.useState(translations[language]);

  React.useEffect(() => {
    setT(translations[language]);
  }, [language]);

  return (
    <Button
      fullWidth
      variant="outlined"
      onClick={() => login("google-oauth2")}
      startIcon={<GoogleIcon />}
    >
      {t.signInGoogle}
    </Button>
  );
};

export default SignInWithGoogleButton;

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

  const [t, setT] = React.useState(translations[language]);

  React.useEffect(() => {
    setT(translations[language]);
  }, [language]);

  return (
    <Button
      fullWidth
      variant="outlined"
      onClick={() => login("google-oauth2")}
      startIcon={<FacebookIcon />}
    >
      {t.signInFacebook}
    </Button>
  );
};

export default SignInWithFacebookButton;

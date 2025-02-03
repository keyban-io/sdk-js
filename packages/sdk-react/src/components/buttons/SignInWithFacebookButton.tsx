import Button from "@mui/material/Button";
import * as React from "react";

import { useKeybanAuth } from "../../index";
import { getDefaultLanguage } from "../../utils/languageUtils";
import { FacebookIcon } from "../CustomIcons";

// Définition des traductions en dehors du composant
const translations = {
  en: { signInFacebook: "Sign in with Facebook" },
  fr: { signInFacebook: "Se connecter avec Facebook" },
  es: { signInFacebook: "Iniciar sesión con Facebook" },
};

const SignInWithFacebookButton: React.FC<{ language?: "en" | "fr" | "es" }> = ({
  language = getDefaultLanguage(),
}) => {
  const { login } = useKeybanAuth();

  // Calcul de la traduction active avec fallback sur l'anglais
  const t = React.useMemo(
    () => translations[language] || translations.en,
    [language],
  );

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

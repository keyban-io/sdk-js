import Button from "@mui/material/Button";
import * as React from "react";

import { useKeybanAuth } from "../../index"; // Ajuster le chemin si nécessaire
import { getDefaultLanguage } from "../../utils/languageUtils";
import { GoogleIcon } from "../CustomIcons";

// Définition des traductions en dehors du composant
const translations = {
  en: { signInGoogle: "Sign in with Google" },
  fr: { signInGoogle: "Se connecter avec Google" },
  es: { signInGoogle: "Iniciar sesión con Google" },
};

const SignInWithGoogleButton: React.FC<{ language?: "en" | "fr" | "es" }> = ({
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
      startIcon={<GoogleIcon />}
    >
      {t.signInGoogle}
    </Button>
  );
};

export default SignInWithGoogleButton;

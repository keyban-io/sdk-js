import EmailIcon from "@mui/icons-material/Email";
import Button from "@mui/material/Button";
import * as React from "react";

import { useKeybanAuth } from "../../index";
import { getDefaultLanguage } from "../../utils/languageUtils";

// Ajout des traductions en dehors du composant
const translations = {
  en: { signInEmail: "Sign in with Email" },
  fr: { signInEmail: "Se connecter avec Email" },
  es: { signInEmail: "Iniciar sesión con Email" },
};

const SignInWithEmailButton: React.FC<{ language?: "en" | "fr" | "es" }> = ({
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
      onClick={() => login("email")}
      startIcon={<EmailIcon />}
    >
      {t.signInEmail}
    </Button>
  );
};

export default SignInWithEmailButton;

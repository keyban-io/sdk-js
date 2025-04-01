import EmailIcon from "@mui/icons-material/Email";
import Button from "@mui/material/Button";
import * as React from "react";

import { useKeybanAuth } from "../../index";
import { getDefaultLanguage } from "../../utils/languageUtils";

// Traductions pour le bouton d'auth par email/mot de passe
const translations = {
  en: { signInUsernamePassword: "Sign in with Email/Password" },
  fr: { signInUsernamePassword: "Se connecter avec Email/Mot de passe" },
  es: { signInUsernamePassword: "Iniciar sesión con Email/Contraseña" },
};

const SignInWithUsernamePasswordButton: React.FC<{
  language?: "en" | "fr" | "es";
}> = ({ language = getDefaultLanguage() }) => {
  const { login } = useKeybanAuth();
  const t = React.useMemo(
    () => translations[language] || translations.en,
    [language],
  );

  return (
    <Button
      fullWidth
      variant="outlined"
      onClick={() => login("username-password")}
      startIcon={<EmailIcon />}
    >
      {t.signInUsernamePassword}
    </Button>
  );
};

export default SignInWithUsernamePasswordButton;

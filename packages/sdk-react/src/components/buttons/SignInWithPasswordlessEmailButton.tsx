import VpnKeyOffIcon from "@mui/icons-material/VpnKeyOff";
import Button from "@mui/material/Button";
import * as React from "react";

import { useKeybanAuth } from "../../index";
import { getDefaultLanguage } from "../../utils/languageUtils";

// Ajout des traductions en dehors du composant
const translations = {
  en: { signInEmail: "Passwordless sign in via Email" },
  fr: { signInEmail: "Connexion sans mot de passe par e-mail" },
  es: { signInEmail: "Inicio de sesión sin contraseña por correo" },
};

const SignInWithPasswordlessEmailButton: React.FC<{
  language?: "en" | "fr" | "es";
}> = ({ language = getDefaultLanguage() }) => {
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
      startIcon={<VpnKeyOffIcon />}
    >
      {t.signInEmail}
    </Button>
  );
};

export default SignInWithPasswordlessEmailButton;

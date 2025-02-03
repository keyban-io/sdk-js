import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import { SvgIconProps } from "@mui/material/SvgIcon";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { ChangeEvent, useMemo, useState } from "react";

import { getDefaultLanguage } from "../../utils/languageUtils";
import { KeybanIcon, SitemarkIcon } from "../CustomIcons";
import SignIn from "../sign-in/SignIn";

// Définition des traductions en dehors du composant
const translations = {
  en: {
    emailInvalid: "Please enter a valid email address.",
    passwordTooShort: "Password must be at least 6 characters long.",
    nameRequired: "Name is required.",
    signUpHeading: "Sign up",
    alreadyHasAccount: "Already have an account?",
    signInLink: "Sign in",
    fullNameLabel: "Full name",
    emailLabel: "Email",
    passwordLabel: "Password",
    namePlaceholder: "Jon Snow",
    emailPlaceholder: "your@email.com",
    passwordPlaceholder: "••••••",
    poweredBy: "Powered by",
  },
  fr: {
    emailInvalid: "Veuillez saisir une adresse e-mail valide.",
    passwordTooShort: "Le mot de passe doit contenir au moins 6 caractères.",
    nameRequired: "Le nom est requis.",
    signUpHeading: "S’inscrire",
    alreadyHasAccount: "Vous avez déjà un compte ?",
    signInLink: "Se connecter",
    fullNameLabel: "Nom complet",
    emailLabel: "E-mail",
    passwordLabel: "Mot de passe",
    namePlaceholder: "Jean Dupont",
    emailPlaceholder: "votre@email.com",
    passwordPlaceholder: "••••••",
    poweredBy: "Propulsé par",
  },
  es: {
    emailInvalid:
      "Por favor, introduce una dirección de correo electrónico válida.",
    passwordTooShort: "La contraseña debe tener al menos 6 caracteres.",
    nameRequired: "Se requiere el nombre.",
    signUpHeading: "Registrarse",
    alreadyHasAccount: "¿Ya tienes una cuenta?",
    signInLink: "Iniciar sesión",
    fullNameLabel: "Nombre completo",
    emailLabel: "Correo electrónico",
    passwordLabel: "Contraseña",
    namePlaceholder: "Juan Pérez",
    emailPlaceholder: "tu@correo.com",
    passwordPlaceholder: "••••••",
    poweredBy: "Impulsado por",
  },
};

/**
 * Renders a sign-up form component with optional third-party authentication.
 * @param props - The component props.
 * @param [props.SitemarkIcon] - Optional custom SitemarkIcon component.
 * The custom icon should have a width and height similar to the default icon.
 * Default icon dimensions: width: 40px, height: 40px.
 * @param [props.enableGoogleAuth] - Optional flag to enable Google authentication.
 * @param [props.enableLoginPasswordAuth] - Optional flag to enable LoginPassword authentication.
 * @param [props.enableFacebookAuth] - Optional flag to enable Facebook authentication.
 * @param props.language - The language for the sign-up form.
 * @remarks
 * This component validates user inputs for name, email, and password.
 * It displays error messages for invalid fields and prevents form submission
 * until those errors are resolved. Toggling to a sign-in form is also supported.
 * @returns The sign-up form component.
 * @private
 */
export default function SignUp({
  SitemarkIcon: CustomSitemarkIcon,
  enableGoogleAuth = true,
  enableLoginPasswordAuth = true,
  enableFacebookAuth = true,
  language = getDefaultLanguage(),
}: {
  SitemarkIcon?: React.ComponentType<SvgIconProps>;
  enableGoogleAuth?: boolean;
  enableLoginPasswordAuth?: boolean;
  enableFacebookAuth?: boolean;
  language?: "en" | "fr" | "es";
}) {
  // États pour les valeurs des champs contrôlés
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // États pour les erreurs de validation
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // Calcul de la traduction avec fallback sur l'anglais
  const t = useMemo(() => {
    return translations[language] || translations.en;
  }, [language]);

  const SitemarkIconComponent = CustomSitemarkIcon || SitemarkIcon;

  const [isSignIn, setIsSignIn] = useState(false);

  const validateInputs = (): boolean => {
    let isValid = true;

    // Validation de l'e-mail
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      isValid = false;
    } else {
      setEmailError(false);
    }

    // Validation du mot de passe
    if (!password || password.length < 6) {
      setPasswordError(true);
      isValid = false;
    } else {
      setPasswordError(false);
    }

    // Validation du nom
    if (!name || name.trim().length === 0) {
      setNameError(true);
      isValid = false;
    } else {
      setNameError(false);
    }

    return isValid;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateInputs()) {
      return;
    }
    // Traitement des données validées
    console.log({
      name,
      email,
      password,
    });
  };

  const toggleSignIn = () => {
    setIsSignIn(!isSignIn);
  };

  if (isSignIn) {
    return (
      <SignIn
        SitemarkIcon={CustomSitemarkIcon}
        enableGoogleAuth={enableGoogleAuth}
        enableLoginPasswordAuth={enableLoginPasswordAuth}
        enableFacebookAuth={enableFacebookAuth}
        language={language}
      />
    );
  }

  return (
    <Stack
      direction="column"
      justifyContent="space-between"
      height="calc((1 - var(--template-frame-height, 0)) * 100dvh)"
      minHeight="100%"
      sx={(theme) => ({
        padding: theme.spacing(2),
        [theme.breakpoints.up("sm")]: {
          padding: theme.spacing(4),
        },
      })}
    >
      <MuiCard
        variant="outlined"
        sx={(theme) => ({
          display: "flex",
          flexDirection: "column",
          alignSelf: "center",
          width: "100%",
          padding: theme.spacing(4),
          gap: theme.spacing(2),
          margin: "auto",
          [theme.breakpoints.up("sm")]: {
            width: "450px",
          },
        })}
      >
        {SitemarkIconComponent && <SitemarkIconComponent />}
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          {t.signUpHeading}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <FormControl>
            <FormLabel htmlFor="name">{t.fullNameLabel}</FormLabel>
            <TextField
              autoComplete="name"
              name="name"
              required
              fullWidth
              id="name"
              placeholder={t.namePlaceholder}
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
              error={nameError}
              helperText={nameError ? t.nameRequired : ""}
              color={nameError ? "error" : "primary"}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="email">{t.emailLabel}</FormLabel>
            <TextField
              required
              fullWidth
              id="email"
              placeholder={t.emailPlaceholder}
              name="email"
              autoComplete="email"
              variant="outlined"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              error={emailError}
              helperText={emailError ? t.emailInvalid : ""}
              color={emailError ? "error" : "primary"}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">{t.passwordLabel}</FormLabel>
            <TextField
              required
              fullWidth
              name="password"
              placeholder={t.passwordPlaceholder}
              type="password"
              id="password"
              autoComplete="new-password"
              variant="outlined"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              error={passwordError}
              helperText={passwordError ? t.passwordTooShort : ""}
              color={passwordError ? "error" : "primary"}
            />
          </FormControl>

          <Button type="submit" fullWidth variant="contained">
            {t.signUpHeading}
          </Button>
        </Box>
        <Typography sx={{ textAlign: "center", mt: 2 }}>
          {t.alreadyHasAccount}{" "}
          <Link
            component="button"
            onClick={toggleSignIn}
            variant="body2"
            sx={{ alignSelf: "center" }}
          >
            {t.signInLink}
          </Link>
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 2,
            color: "text.secondary",
          }}
        >
          <Typography
            variant="caption"
            sx={{ mr: 1, display: "flex", alignItems: "center" }}
          >
            {t.poweredBy}
          </Typography>
          <Box
            sx={{
              width: 100,
              height: 12,
              display: "flex",
              alignItems: "center",
            }}
          >
            <KeybanIcon />
          </Box>
        </Box>
      </MuiCard>
    </Stack>
  );
}

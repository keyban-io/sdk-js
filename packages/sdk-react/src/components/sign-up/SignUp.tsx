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
import { useState } from "react";

import { getDefaultLanguage } from "../../utils/languageUtils";
import { KeybanIcon, SitemarkIcon } from "../CustomIcons";
import SignIn from "../sign-in/SignIn";

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
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState("");
  const [isSignIn, setIsSignIn] = useState(false);

  const SitemarkIconComponent = CustomSitemarkIcon || SitemarkIcon;

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
    },
  };

  const validateInputs = () => {
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;
    const name = document.getElementById("name") as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage(translations[language].emailInvalid);
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage(translations[language].passwordTooShort);
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (!name.value || name.value.length < 1) {
      setNameError(true);
      setNameErrorMessage(translations[language].nameRequired);
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage("");
    }

    return isValid;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (nameError || emailError || passwordError) {
      event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get("name"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
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
      />
    );
  }

  return (
    <>
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
            padding: (theme) => theme.spacing(4),
            gap: (theme) => theme.spacing(2),
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
            {translations[language].signUpHeading}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="name">
                {translations[language].fullNameLabel}
              </FormLabel>
              <TextField
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                placeholder="Jon Snow"
                error={nameError}
                helperText={nameErrorMessage}
                color={nameError ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">
                {translations[language].emailLabel}
              </FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                placeholder="your@email.com"
                name="email"
                autoComplete="email"
                variant="outlined"
                error={emailError}
                helperText={emailErrorMessage}
                color={passwordError ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">
                {translations[language].passwordLabel}
              </FormLabel>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                error={passwordError}
                helperText={passwordErrorMessage}
                color={passwordError ? "error" : "primary"}
              />
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              {translations[language].signUpHeading}
            </Button>
          </Box>
          <Typography sx={{ textAlign: "center", mt: 2 }}>
            {translations[language].alreadyHasAccount}{" "}
            <Link
              component="button"
              onClick={toggleSignIn}
              variant="body2"
              sx={{ alignSelf: "center" }}
            >
              {translations[language].signInLink}
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
              Powered by
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
    </>
  );
}

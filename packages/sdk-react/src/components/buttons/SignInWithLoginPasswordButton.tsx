import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useMemo, useState } from "react";

import { useKeybanAuth } from "../../index"; // Ajuster le chemin si nécessaire
import { getDefaultLanguage } from "../../utils/languageUtils";
import ForgotPassword from "../sign-in/components/ForgotPassword";

// Déclaration des traductions en dehors du composant
const translations = {
  en: {
    emailInvalid: "Please enter a valid email address.",
    passwordTooShort: "Password must be at least 6 characters long.",
    rememberMe: "Remember me",
    signInBtn: "Sign in",
    forgotPassword: "Forgot your password?",
    noAccount: "Don’t have an account?",
    signUpLink: "Sign up",
    emailPlaceholder: "your@email.com",
    passwordPlaceholder: "••••••",
    emailLabel: "Email",
    passwordLabel: "Password",
  },
  fr: {
    emailInvalid: "Veuillez saisir une adresse e-mail valide.",
    passwordTooShort: "Le mot de passe doit contenir au moins 6 caractères.",
    rememberMe: "Se souvenir de moi",
    signInBtn: "Se connecter",
    forgotPassword: "Mot de passe oublié ?",
    noAccount: "Vous n’avez pas de compte ?",
    signUpLink: "S’inscrire",
    emailPlaceholder: "votre@email.com",
    passwordPlaceholder: "••••••",
    emailLabel: "E-mail",
    passwordLabel: "Mot de passe",
  },
  es: {
    emailInvalid:
      "Por favor, introduce una dirección de correo electrónico válida.",
    passwordTooShort: "La contraseña debe tener al menos 6 caracteres.",
    rememberMe: "Recordarme",
    signInBtn: "Iniciar sesión",
    forgotPassword: "¿Olvidaste tu contraseña?",
    noAccount: "¿No tienes una cuenta?",
    signUpLink: "Registrarse",
    emailPlaceholder: "tu@correo.com",
    passwordPlaceholder: "••••••",
    emailLabel: "Correo electrónico",
    passwordLabel: "Contraseña",
  },
};

interface SignInWithLoginPasswordButtonProps {
  toggleSignUp: () => void;
  language?: "en" | "fr" | "es";
}

const SignInWithLoginPasswordButton: React.FC<
  SignInWithLoginPasswordButtonProps
> = ({ toggleSignUp, language = getDefaultLanguage() }) => {
  const { login } = useKeybanAuth();

  // États pour les valeurs des champs contrôlés
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // États pour la gestion des erreurs
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  // Gestion de l'affichage de la fenêtre ForgotPassword
  const [open, setOpen] = useState(false);

  // Traductions via useMemo pour éviter de recréer l'objet à chaque rendu
  const t = useMemo(
    () => translations[language] || translations.en,
    [language],
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const validateInputs = (): boolean => {
    let isValid = true;
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage(t.emailInvalid);
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password || password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage(t.passwordTooShort);
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateInputs()) {
      return;
    }
    console.log({ email, password });
    await login("Username-Password-Authentication");
  };

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: 2,
      }}
    >
      <FormControl>
        <FormLabel htmlFor="email">{t.emailLabel}</FormLabel>
        <TextField
          error={emailError}
          helperText={emailErrorMessage}
          id="email"
          type="email"
          name="email"
          placeholder={t.emailPlaceholder}
          autoComplete="email"
          autoFocus
          required
          fullWidth
          variant="outlined"
          color={emailError ? "error" : "primary"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="password">{t.passwordLabel}</FormLabel>
        <TextField
          error={passwordError}
          helperText={passwordErrorMessage}
          name="password"
          placeholder={t.passwordPlaceholder}
          type="password"
          id="password"
          autoComplete="current-password"
          required
          fullWidth
          variant="outlined"
          color={passwordError ? "error" : "primary"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
      <FormControlLabel
        control={<Checkbox value="remember" />}
        label={t.rememberMe}
      />
      <ForgotPassword
        open={open}
        handleClose={handleClose}
        language={language}
      />
      <Button type="submit" fullWidth variant="contained">
        {t.signInBtn}
      </Button>
      <Link
        component="button"
        type="button"
        onClick={handleClickOpen}
        variant="body2"
        sx={{ alignSelf: "center" }}
      >
        {t.forgotPassword}
      </Link>
      <Typography sx={{ textAlign: "center" }}>
        {t.noAccount}{" "}
        <Link
          component="button"
          onClick={toggleSignUp}
          variant="body2"
          sx={{ alignSelf: "center" }}
        >
          {t.signUpLink}
        </Link>
      </Typography>
    </Stack>
  );
};

export default SignInWithLoginPasswordButton;

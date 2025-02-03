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

import { useKeybanAuth } from "../../index"; // Adjust the import path as needed
import { getDefaultLanguage } from "../../utils/languageUtils";
import ForgotPassword from "../sign-in/components/ForgotPassword";

const SignInWithLoginPasswordButton: React.FC<{
  toggleSignUp: () => void;
  language?: "en" | "fr" | "es";
}> = ({ toggleSignUp, language = getDefaultLanguage() }) => {
  const { login } = useKeybanAuth();
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [t, setT] = React.useState(translations[language]);

  React.useEffect(() => {
    setT(translations[language]);
  }, [language]);

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
    },
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (emailError || passwordError) {
      return;
    }
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    await login("Username-Password-Authentication");
  };

  const validateInputs = () => {
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage(t.emailInvalid);
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage(t.passwordTooShort);
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
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
        <FormLabel htmlFor="email">Email</FormLabel>
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
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="password">Password</FormLabel>
        <TextField
          error={passwordError}
          helperText={passwordErrorMessage}
          name="password"
          placeholder={t.passwordPlaceholder}
          type="password"
          id="password"
          autoComplete="current-password"
          autoFocus
          required
          fullWidth
          variant="outlined"
          color={passwordError ? "error" : "primary"}
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
      <Button
        type="submit"
        fullWidth
        variant="contained"
        onClick={validateInputs}
      >
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

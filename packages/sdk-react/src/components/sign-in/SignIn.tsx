import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { SvgIconProps } from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";
import { useState } from "react";

import { getDefaultLanguage } from "../../utils/languageUtils";
import SignInWithFacebookButton from "../buttons/SignInWithFacebookButton";
import SignInWithGoogleButton from "../buttons/SignInWithGoogleButton";
import SignInWithLoginPasswordButton from "../buttons/SignInWithLoginPasswordButton";
import { KeybanIcon, SitemarkIcon } from "../CustomIcons";
import SignUp from "../sign-up/SignUp";

/**
 * Represents the configuration options for the SignIn component.
 * @property SitemarkIcon - An optional custom icon component that replaces the default SitemarkIcon.
 * @property enableGoogleAuth - Determines whether Google authentication is enabled.
 * @property enableLoginPasswordAuth - Determines whether traditional username/password authentication is enabled.
 * @property enableFacebookAuth - Determines whether Facebook authentication is enabled.
 */
export interface SignInProps {
  /**
   * Optional custom SitemarkIcon component.
   * The custom icon should have a width and height similar to the default icon.
   * Default icon dimensions: width: 40px, height: 40px.
   */
  SitemarkIcon?: React.ComponentType<SvgIconProps>;
  /**
   * Optional flag to enable Google authentication.
   */
  enableGoogleAuth?: boolean;
  /**
   * Optional flag to enable LoginPassword authentication.
   */
  enableLoginPasswordAuth?: boolean;
  /**
   * Optional flag to enable Facebook authentication.
   */
  enableFacebookAuth?: boolean;
}

/**
 * SignIn component renders a sign-in form with email and password fields,
 * along with options to sign in with Google or Facebook, and a link to sign up.
 * It includes validation for email and password fields and displays error messages
 * if the inputs are invalid.
 * @param props - The component props.
 * @param [props.SitemarkIcon] - Optional custom SitemarkIcon component.
 * The custom icon should have a width and height similar to the default icon.
 * Default icon dimensions: width: 40px, height: 40px.
 * @param [props.enableGoogleAuth] - Optional flag to enable Google authentication.
 * @param [props.enableLoginPasswordAuth] - Optional flag to enable LoginPassword authentication.
 * @param [props.enableFacebookAuth] - Optional flag to enable Facebook authentication.
 * @param [props.language] - Optional language code for translations. Defaults to the browser's language or "en".
 * @returns The rendered SignIn component.
 */
export default function SignIn({
  SitemarkIcon: CustomSitemarkIcon,
  enableGoogleAuth = true,
  enableLoginPasswordAuth = true,
  enableFacebookAuth = true,
  language = getDefaultLanguage(),
}: SignInProps & { language?: "en" | "fr" | "es" }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const SitemarkIconComponent = CustomSitemarkIcon || SitemarkIcon;

  const translations = {
    en: {
      signInHeading: "Sign in",
      poweredBy: "Powered by",
      signUpLink: "Sign up",
      dontHaveAccount: "Don’t have an account?",
      signInWithFacebook: "Sign in with Facebook",
    },
    fr: {
      signInHeading: "Se connecter",
      poweredBy: "Propulsé par",
      signUpLink: "S’inscrire",
      dontHaveAccount: "Vous n’avez pas de compte ?",
      signInWithFacebook: "Se connecter avec Facebook",
    },
    es: {
      signInHeading: "Iniciar sesión",
      poweredBy: "Desarrollado por",
      signUpLink: "Registrarse",
      dontHaveAccount: "¿No tienes una cuenta?",
      signInWithFacebook: "Iniciar sesión con Facebook",
    },
  };

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  if (isSignUp) {
    return (
      <SignUp
        SitemarkIcon={CustomSitemarkIcon}
        enableGoogleAuth={enableGoogleAuth}
        enableLoginPasswordAuth={enableLoginPasswordAuth}
        enableFacebookAuth={enableFacebookAuth}
        language={language}
      />
    );
  }

  return (
    <>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={(theme) => ({
          height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
          minHeight: "100%",
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
              maxWidth: "450px",
            },
          })}
        >
          <SitemarkIconComponent />
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            {translations[language].signInHeading}
          </Typography>
          {enableLoginPasswordAuth && (
            <SignInWithLoginPasswordButton
              toggleSignUp={toggleSignUp}
              language={language}
            />
          )}
          {(enableGoogleAuth || enableFacebookAuth) &&
            enableLoginPasswordAuth && <Divider>or</Divider>}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {enableGoogleAuth && <SignInWithGoogleButton language={language} />}
            {enableFacebookAuth && (
              <SignInWithFacebookButton language={language} />
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Typography
              variant="caption"
              sx={{ mr: 1, display: "flex", alignItems: "center" }}
            >
              {translations[language].poweredBy}
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
          <Typography>
            {translations[language].dontHaveAccount}{" "}
            <Button onClick={toggleSignUp}>
              {translations[language].signUpLink}
            </Button>
          </Typography>
        </MuiCard>
      </Stack>
    </>
  );
}

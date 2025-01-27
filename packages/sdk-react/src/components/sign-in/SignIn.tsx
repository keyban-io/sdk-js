import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { SvgIconProps } from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";
import { useState } from "react";

import SignInWithGoogleButton from "../buttons/SignInWithGoogleButton";
import SignInWithLoginPasswordButton from "../buttons/SignInWithLoginPasswordButton";
import { FacebookIcon, KeybanIcon, SitemarkIcon } from "../CustomIcons";
import AppTheme from "../shared-theme/AppTheme";
import ColorModeSelect from "../shared-theme/ColorModeSelect";
import SignUp from "../sign-up/SignUp";

const Card = styled(MuiCard)(({ theme }) => ({
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
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

/**
 * Represents the configuration options for the SignIn component.
 * @property disableCustomTheme - When set to true, disables the default custom theme styling.
 * @property SitemarkIcon - An optional custom icon component that replaces the default SitemarkIcon.
 * @property enableGoogleAuth - Determines whether Google authentication is enabled.
 * @property enableLoginPasswordAuth - Determines whether traditional username/password authentication is enabled.
 * @property enableFacebookAuth - Determines whether Facebook authentication is enabled.
 */
export interface SignInProps {
  disableCustomTheme?: boolean;
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
 * @param [props.disableCustomTheme] - Optional flag to disable custom theme.
 * @param [props.SitemarkIcon] - Optional custom SitemarkIcon component.
 * The custom icon should have a width and height similar to the default icon.
 * Default icon dimensions: width: 40px, height: 40px.
 * @param [props.enableGoogleAuth] - Optional flag to enable Google authentication.
 * @param [props.enableLoginPasswordAuth] - Optional flag to enable LoginPassword authentication.
 * @param [props.enableFacebookAuth] - Optional flag to enable Facebook authentication.
 * @returns The rendered SignIn component.
 */
export default function SignIn({
  disableCustomTheme,
  SitemarkIcon: CustomSitemarkIcon,
  enableGoogleAuth = true,
  enableLoginPasswordAuth = true,
  enableFacebookAuth = true,
}: SignInProps) {
  const [isSignUp, setIsSignUp] = useState(false); // Added isSignUp state
  const SitemarkIconComponent = CustomSitemarkIcon || SitemarkIcon;

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  if (isSignUp) {
    return (
      <SignUp
        disableCustomTheme={disableCustomTheme}
        SitemarkIcon={CustomSitemarkIcon}
        enableGoogleAuth={enableGoogleAuth}
        enableLoginPasswordAuth={enableLoginPasswordAuth}
        enableFacebookAuth={enableFacebookAuth}
      />
    );
  }

  return (
    <AppTheme disableCustomTheme={disableCustomTheme}>
      <CssBaseline enableColorScheme />
      <SignInContainer
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <ColorModeSelect
          sx={{ position: "fixed", top: "1rem", right: "1rem" }}
        />
        <Card variant="outlined">
          <SitemarkIconComponent />
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign in
          </Typography>
          {enableLoginPasswordAuth && (
            <SignInWithLoginPasswordButton
              disableCustomTheme={disableCustomTheme}
              toggleSignUp={toggleSignUp} // Passed toggleSignUp as prop
            />
          )}
          {(enableGoogleAuth || enableFacebookAuth) &&
            enableLoginPasswordAuth && <Divider>or</Divider>}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {enableGoogleAuth && <SignInWithGoogleButton />}
            {enableFacebookAuth && (
              <Button
                fullWidth
                variant="outlined"
                onClick={() => alert("Sign in with Facebook")}
                startIcon={<FacebookIcon />}
              >
                Sign in with Facebook
              </Button>
            )}
          </Box>
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
        </Card>
      </SignInContainer>
    </AppTheme>
  );
}

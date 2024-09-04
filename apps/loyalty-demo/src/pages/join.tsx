import React from "react";
import { Button, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

const GOOGLE_OAUTH_CLIENT_ID =
  "441240382343-o3fnq28ms148dv3h8f1j70nc9865no95.apps.googleusercontent.com";

export default function JoinPage() {
  const handleClick = React.useCallback(() => {
    const url = new URL("/o/oauth2/auth", "https://accounts.google.com");
    url.searchParams.set(
      "redirect_uri",
      new URL("/wallet", window.location.origin).toString(),
    );
    url.searchParams.set("response_type", "token");
    url.searchParams.set("client_id", GOOGLE_OAUTH_CLIENT_ID);
    url.searchParams.set("scope", "openid email profile");

    window.location.href = url.toString();
  }, []);

  return (
    <>
      <Typography align="center">
        Welcome to the [Brand Name] loyalty program
      </Typography>

      <Typography align="center">
        Enjoy exclusive benefits by joining our loyalty program. You can
        accumulate points and redeem them for rewards.
      </Typography>

      <Typography align="center">
        Click the button below to continue:
      </Typography>

      <Button
        onClick={handleClick}
        variant="contained"
        startIcon={<GoogleIcon />}
      >
        Login with Google
      </Button>
    </>
  );
}

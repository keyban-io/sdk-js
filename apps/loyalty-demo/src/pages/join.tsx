import React from 'react';

import {
  Box,
  Button,
  SvgIcon,
  Typography,
} from '@mui/material';

const GOOGLE_OAUTH_CLIENT_ID =
  "441240382343-o3fnq28ms148dv3h8f1j70nc9865no95.apps.googleusercontent.com";

export default function JoinPage() {
  const loginUrl = React.useMemo(() => {
    const url = new URL("/o/oauth2/auth", "https://accounts.google.com");
    url.searchParams.set(
      "redirect_uri",
      new URL("/wallet", window.location.origin).toString(),
    );
    url.searchParams.set("response_type", "token");
    url.searchParams.set("client_id", GOOGLE_OAUTH_CLIENT_ID);
    url.searchParams.set("scope", "openid email profile");

    return url;
  }, []);

  return (
    <>
      <Box
        component="img"
        sx={{
          height: 236,
          width: 236,
          maxHeight: { xs: 236, md: 100 },
          maxWidth: { xs: 236, md: 100 },
        }}
        alt="Keyban logo"
        src="/keyban-logo-small.svg"
      />

      <Typography align="center" variant="h5">
        Welcome to the Keyban loyalty program demo
      </Typography>

      <Typography align="center">
        Enjoy exclusive benefits by joining our loyalty program. You can
        accumulate points and redeem them for rewards.
      </Typography>

      <Typography align="center">
        Login with your Google account to join the loyalty program:
      </Typography>

      <Button
        component="a"
        href={loginUrl.toString()}
        variant="outlined"
        startIcon={<GoogleIcon />}
      >
        Login with Google
      </Button>
    </>
  );
}

const GoogleIcon = () => (
  <SvgIcon>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 0 24 24"
      width="24"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
      <path d="M1 1h22v22H1z" fill="none" />
    </svg>
  </SvgIcon>
);

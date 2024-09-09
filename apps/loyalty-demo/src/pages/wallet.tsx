import React from 'react';

import {
  Box,
  Button,
  SvgIcon,
  Typography,
} from '@mui/material';

type UserInfo = {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  picture?: string;
};

const API_URL = {
  "https://loyalty.demo.keyban.io": "https://api.demo.keyban.io",
  "https://loyalty.testing.keyban.io": "https://api.testing.keyban.io",
  "https://loyalty.keyban.localtest.me": "https://api.keyban.localtest.me",
  "http://localhost:4200": "https://api.keyban.localtest.me",
}[window.location.origin];

export default function WalletPage() {
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
      <Typography align="center" variant="h6">
        Your Keyban demo loyalty card
      </Typography>
      <Typography align="center" variant="h6">
        Loyalty points: <code>10</code>
      </Typography>
      <Typography align="center">
        <GoogleWalletButton />
      </Typography>
    </>
  );
}

const GoogleWalletButton = React.lazy(async () => {
  const parsedHash = new URLSearchParams(window.location.hash.substring(1));
  const accessToken = parsedHash.get("access_token");
  if (!accessToken) throw new Error("Invalid access token");

  const url = new URL("/oauth2/v1/userinfo", "https://www.googleapis.com");
  url.searchParams.set("alt", "json");
  url.searchParams.set("access_token", accessToken);

  const { email }: UserInfo = await fetch(url).then((res) => res.json());

  const walletLink = await fetch(new URL("/loyalty/wallets", API_URL), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  }).then((res) => res.text());

  return {
    default: () => (
      <Button
        component="a"
        href={walletLink}
        variant="outlined"
        startIcon={<GoogleWalletIcon />}
      >
        Add to google wallet
      </Button>
    ),
  };
});

const GoogleWalletIcon = () => (
  <SvgIcon>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="29"
      height="26"
      viewBox="0 0 29 26"
    >
      <g>
        <clipPath d="M0,0h29v26h-29z" />
        <path
          d="M29,9.63H0V4.815C0,2.167 2.105,0 4.677,0H24.323C26.895,0 29,2.167 29,4.815V9.63Z"
          fill="#34A853"
        />
        <path
          d="M29,13.722H0V8.907C0,6.259 2.105,4.093 4.677,4.093H24.323C26.895,4.093 29,6.259 29,8.907V13.722Z"
          fill="#FFBB00"
        />
        <path
          d="M29,17.815H0V13C0,10.352 2.105,8.185 4.677,8.185H24.323C26.895,8.185 29,10.352 29,13V17.815Z"
          fill="#FE2C25"
        />
        <path
          d="M0,10.785L18.406,15.311C20.581,15.841 22.896,15.359 24.673,13.963L29,10.593V21.185C29,23.833 26.895,26 24.323,26H4.677C2.105,26 0,23.833 0,21.185V10.785Z"
          fill="#4285F4"
          fill-rule="evenodd"
        />
      </g>
    </svg>
  </SvgIcon>
);

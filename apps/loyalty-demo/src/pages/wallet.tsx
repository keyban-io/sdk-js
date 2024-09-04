import React from "react";
import { Button, Typography } from "@mui/material";

type UserInfo = {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  picture?: string;
};

const API_URL = {
  "https://loyalty-demo.testing.keyban.io": "https://api.testing.keyban.io",
  "https://loyalty-demo.keyban.localtest.me": "https://api.keyban.localtest.me",
  "http://localhost:4200": "https://api.keyban.localtest.me",
}[window.location.origin];

const WalletButton = React.lazy(async () => {
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
      <Button component="a" href={walletLink} variant="contained">
        Add to google wallet
      </Button>
    ),
  };
});

export default function WalletPage() {
  return (
    <>
      <Typography align="center"> Your fid [Brand Name] card</Typography>
      <Typography align="center"> Loyalty points: XXX</Typography>
      <Typography align="center">
        <WalletButton />
      </Typography>
    </>
  );
}

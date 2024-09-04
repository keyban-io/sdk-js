import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Container,
  Typography,
} from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import React from "react";

const GOOGLE_OAUTH_CLIENT_ID =
  "441240382343-o3fnq28ms148dv3h8f1j70nc9865no95.apps.googleusercontent.com";

type UserInfo = {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  picture?: string;
};

export default function App() {
  const [accessToken, setAccessToken] = React.useState<string>();
  React.useEffect(() => {
    const parsedHash = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = parsedHash.get("access_token");
    if (!accessToken) return;

    setAccessToken(accessToken);
  }, []);

  const [userInfo, setUserInfo] = React.useState<UserInfo>();
  const [error, setError] = React.useState<Error>();
  React.useEffect(() => {
    if (!accessToken) return;

    const url = new URL("/oauth2/v1/userinfo", "https://www.googleapis.com");
    url.searchParams.set("alt", "json");
    url.searchParams.set("access_token", accessToken);

    fetch(url)
      .then((res) => res.json())
      .then(setUserInfo)
      .catch(setError);
  }, [accessToken]);

  return (
    <Container fixed>
      <Typography variant="h1">Loyalty Demo</Typography>

      {error && (
        <Alert severity="error">
          <pre>{error.stack}</pre>
        </Alert>
      )}

      <Button
        onClick={() => {
          const url = new URL("/o/oauth2/auth", "https://accounts.google.com");
          url.searchParams.set("redirect_uri", window.location.origin);
          url.searchParams.set("response_type", "token");
          url.searchParams.set("client_id", GOOGLE_OAUTH_CLIENT_ID);
          url.searchParams.set("scope", "openid email profile");

          window.location.href = url.toString();
        }}
      >
        Login
      </Button>

      {userInfo && (
        <Card>
          <CardHeader
            avatar={<Avatar src={userInfo.picture} />}
            title={userInfo.name}
            subheader={
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <span>{userInfo.email}</span>
                {userInfo.verified_email && <VerifiedIcon fontSize="inherit" />}
              </Box>
            }
          />
        </Card>
      )}
    </Container>
  );
}

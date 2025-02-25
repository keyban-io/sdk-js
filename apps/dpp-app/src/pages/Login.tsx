import { Stack, Typography, CircularProgress } from "@mui/material";
import { useKeybanAuth } from "@keyban/sdk-react"; // Adjust the import path as needed
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { SignIn } from "@keyban/sdk-react";
import { SitemarkIcon } from "../components/SitemarkIcon";

export default function Login() {
  const { isAuthenticated, isLoading } = useKeybanAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  if (isLoading) {
    return (
      <Stack
        sx={{
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
        <Typography variant="h6">Chargement...</Typography>
      </Stack>
    );
  }

  return (
    <SignIn
      enableGoogleAuth={true}
      enableLoginPasswordAuth={true}
      enableFacebookAuth={false}
      language="fr"
      sitemarkIcon={SitemarkIcon}
    />
  );
}

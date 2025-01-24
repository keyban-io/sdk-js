import { Container, Typography, CircularProgress } from "@mui/material";
import { useKeybanAuth } from "@keyban/sdk-react"; // Adjust the import path as needed
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import LoginPanel from "./LoginPanel";

export default function Login() {
  const { isAuthenticated, isLoading, login } = useKeybanAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleLogin = async (method: string) => {
    // Implement different login methods here
    if (method === "google") {
      // Call the login function for Google
      await login("google-oauth2");
    } else {
      // Call the default login function
      await login("Username-Password-Authentication");
    }
  };

  if (isLoading) {
    return (
      <Container sx={{ py: 2, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="h6">Chargement...</Typography>
      </Container>
    );
  }

  return <LoginPanel handleLogin={handleLogin} />;
}

import {
  Button,
  Container,
  Typography,
  CircularProgress,
  Box,
  Paper,
  Avatar,
  TextField,
} from "@mui/material";
import { useKeybanAuth } from "@keyban/sdk-react"; // Adjust the import path as needed
import { useNavigate, useLocation } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import EmailIcon from "@mui/icons-material/Email";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useEffect } from "react";

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
      await loginWithGoogle();
    } else {
      // Call the default login function
      await login();
    }
  };

  const loginWithGoogle = async () => {
    // Implement Google login logic here
    await login();
  };

  if (isLoading) {
    return (
      <Container maxWidth="sm" sx={{ py: 2, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="h6">Chargement...</Typography>
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={6}
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 4,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Connexion
        </Typography>
        <Box sx={{ mt: 3, width: "100%" }}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            startIcon={<GoogleIcon />}
            onClick={() => handleLogin("google")}
            sx={{ mb: 2 }}
          >
            Se connecter avec Google
          </Button>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Adresse Email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            startIcon={<EmailIcon />}
            onClick={() => handleLogin("email")}
          >
            Se connecter avec Email
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

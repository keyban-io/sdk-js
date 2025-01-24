import { Container, Typography, Paper, Avatar, TextField } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LoginButton from "./LoginButton";

interface LoginPanelProps {
  handleLogin: (method: string) => void;
}

export default function LoginPanel({ handleLogin }: LoginPanelProps) {
  return (
    <Container component="main" disableGutters>
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
          Welcome
        </Typography>
        <LoginButton method="google" onClick={() => handleLogin("google")} />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Adresse Email"
          name="email"
          autoComplete="email"
          autoFocus
          sx={{ maxWidth: "400px" }}
        />
        <LoginButton method="email" onClick={() => handleLogin("email")} />
      </Paper>
    </Container>
  );
}

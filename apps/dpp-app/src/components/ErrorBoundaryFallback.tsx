import { Container, Paper, Typography, Button } from "@mui/material";

export function ErrorBoundaryFallback({ error }: { error: Error }) {
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h5" color="error" gutterBottom>
          Oups, quelque chose s'est mal passé
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {error.message}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => window.location.reload()}
        >
          Réessayer
        </Button>
      </Paper>
    </Container>
  );
}

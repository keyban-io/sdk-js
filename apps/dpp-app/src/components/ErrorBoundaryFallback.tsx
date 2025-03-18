import { useState } from "react";
import { Container, Paper, Typography, Button, Box } from "@mui/material";

export function ErrorBoundaryFallback({ error }: { error: Error }) {
  const [showStack, setShowStack] = useState(false);

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h5" color="error" gutterBottom>
          Oups, quelque chose s'est mal passé
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {error.message}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => window.location.reload()}
          >
            Réessayer
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setShowStack(!showStack)}
          >
            {showStack ? "Masquer la stack" : "Afficher la stack"}
          </Button>
        </Box>
        {showStack && error.stack && (
          <Typography
            variant="body2"
            component="pre"
            sx={{ mt: 2, textAlign: "left", overflowX: "auto" }}
          >
            {error.stack}
          </Typography>
        )}
      </Paper>
    </Container>
  );
}

import { Typography, Container, Box, Card } from "@mui/material";
import ProductCard from "../components/ProductCard";
import Grid2 from "@mui/material/Grid2";

export default function Dashboard() {
  return (
    <Container maxWidth="sm" sx={{ py: 2, pb: 8, position: "relative" }}>
      <Card
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: "16px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      />

      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Grid2 container spacing={2} sx={{ mb: 3 }}>
          <Grid2 size={{ xs: 12 }}>
            <ProductCard productId="1" fullSizeImage />
          </Grid2>
        </Grid2>

        <Typography variant="h5" gutterBottom>
          Mes Autres Appareils
        </Typography>

        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <ProductCard productId="2" />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <ProductCard productId="3" />
          </Grid2>
        </Grid2>
      </Box>
    </Container>
  );
}

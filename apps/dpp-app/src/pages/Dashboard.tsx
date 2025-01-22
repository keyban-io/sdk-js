import { Typography, Container, Box } from "@mui/material";
import ProductCard from "../components/ProductCard";
import Grid2 from "@mui/material/Grid2";

export default function Dashboard() {
  return (
    <Container sx={{ py: 2, pb: 8, position: "relative" }}>
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

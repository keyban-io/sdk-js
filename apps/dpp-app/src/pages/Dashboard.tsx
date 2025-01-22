import { Typography, Container } from "@mui/material";
import ProductCard from "../components/ProductCard";
import Grid2 from "@mui/material/Grid2";

export default function Dashboard() {
  return (
    <Container disableGutters>
      <ProductCard productId="1" fullSizeImage />

      <Typography variant="h5" gutterBottom align="center">
        Mes Autres Appareils
      </Typography>

      <Grid2 container spacing={2} alignItems="stretch">
        <Grid2
          size={{ xs: 12, md: 6 }}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <ProductCard productId="2" sx={{ flex: 1 }} />
        </Grid2>
        <Grid2
          size={{ xs: 12, md: 6 }}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <ProductCard productId="3" sx={{ flex: 1 }} />
        </Grid2>
      </Grid2>
    </Container>
  );
}

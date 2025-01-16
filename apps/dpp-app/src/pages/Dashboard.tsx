import { Typography, Container, Grid } from "@mui/material";
import products from "../data/products.json";
import ProductCard from "../components/ProductCard";

export default function Dashboard() {
  return (
    <Container maxWidth="sm" sx={{ py: 2, pb: 8 }}>
      <Typography variant="h4" gutterBottom>
        Tableau de Bord | Weavenn x Keyban
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12}>
          <ProductCard productId="1" fullSizeImage />
        </Grid>
      </Grid>

      <Typography variant="h5" gutterBottom>
        Mes Autres Appareils
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <ProductCard productId="2" />
        </Grid>
        <Grid item xs={12} md={6}>
          <ProductCard productId="3" />
        </Grid>
      </Grid>
    </Container>
  );
}

import { Typography, Container, Box, Card, CardContent } from "@mui/material";
import ProductCard from "../components/ProductCard";
import Grid2 from "@mui/material/Grid2";

export default function Dashboard() {
  return (
    <Container disableGutters>
      <Card sx={{ mx: "auto", maxWidth: 600 }}>
        <CardContent>
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Typography variant="h5">Mes Produits</Typography>
          </Box>

          <Grid2 container spacing={2} alignItems="stretch">
            <Grid2
              size={{ xs: 12, md: 6 }}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <ProductCard productId="1" sx={{ flex: 1 }} />
            </Grid2>
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
            <Grid2
              size={{ xs: 12, md: 6 }}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <ProductCard productId="4" sx={{ flex: 1 }} />
            </Grid2>
            <Grid2
              size={{ xs: 12, md: 6 }}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <ProductCard productId="5" sx={{ flex: 1 }} />
            </Grid2>
          </Grid2>
        </CardContent>
      </Card>
    </Container>
  );
}

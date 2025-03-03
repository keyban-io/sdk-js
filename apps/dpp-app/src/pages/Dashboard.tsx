import {
  Typography,
  Container,
  Box,
  Card,
  CardContent,
  Stack,
  CircularProgress,
  Button, // Ajout du Button MUI
} from "@mui/material";
import ProductCard from "../components/ProductCard";
import Grid2 from "@mui/material/Grid2";
import {
  useKeybanAccount,
  useKeybanAccountNfts,
  type KeybanNftBalance,
} from "@keyban/sdk-react";
import Product from "../models/Product";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [account, accountError] = useKeybanAccount();
  const [nfts, nftsError, { fetchMore, loading }] = useKeybanAccountNfts(
    account!,
    { first: 5 },
  );

  useEffect(() => {
    if (nfts && nfts.nodes.length === 0) {
      navigate("/product-entry");
    }
  }, [nfts, navigate]);

  if (accountError) {
    return <div>Error fetching account: {accountError.message}</div>;
  }
  if (nftsError) {
    return <div>Error fetching NFTs: {nftsError.message}</div>;
  }

  if (!nfts) {
    return (
      <Stack
        sx={{
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
        <Typography variant="h6">Chargement...</Typography>
      </Stack>
    );
  }

  return (
    <Container disableGutters>
      <Card sx={{ mx: "auto", maxWidth: 600 }}>
        <CardContent>
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Typography variant="h5">Mes Produits</Typography>
          </Box>

          <Grid2 container spacing={2} alignItems="stretch">
            {nfts.nodes.map((nft: KeybanNftBalance) => {
              return (
                nft.nft && (
                  <Grid2
                    key={nft.id} // added unique key prop
                    size={{ xs: 12, md: 6 }}
                    sx={{ display: "flex", flexDirection: "column" }}
                  >
                    <ProductCard
                      product={new Product(nft.nft.metadata)}
                      tokenAddress={
                        (nft.nft.collection?.id ?? "0x") as `0x${string}`
                      }
                      tokenId={nft.nft.tokenId}
                      sx={{ flex: 1 }}
                    />
                  </Grid2>
                )
              );
            })}
          </Grid2>
          {nfts.hasNextPage && (
            <Button
              variant="outlined"
              onClick={fetchMore}
              disabled={loading}
              sx={{
                mt: 2,
                width: "100%",
                borderRadius: "16px",
                height: "56px",
                backgroundColor: "var(--mui-palette-background-paper)",
              }}
            >
              {loading ? "Loading..." : "Load More"}
            </Button>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}

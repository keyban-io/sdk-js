import {
  Typography,
  Container,
  Box,
  Card,
  CardContent,
  Stack,
  CircularProgress,
  Button,
} from "@mui/material";
import ProductCard from "../components/ProductCard";
import Grid2 from "@mui/material/Grid2";
import {
  useKeybanAccount,
  useKeybanAccountNfts,
  type KeybanNftBalance,
} from "@keyban/sdk-react";
import Product from "../models/Product";
import { useState } from "react";
import AddProductModal from "../components/AddProductModal";

export default function Dashboard() {
  const [account, accountError] = useKeybanAccount();
  const [nfts, nftsError, { fetchMore, loading }] = useKeybanAccountNfts(
    account!,
    { first: 5 }
  );
  const [modalOpen, setModalOpen] = useState(false);

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
      {nfts.nodes.length === 0 ? (
        <Card sx={{ mx: "auto", maxWidth: 600, mt: 4 }}>
          <CardContent>
            <Box sx={{ textAlign: "center", mb: 2 }}>
              <Typography variant="h5">
                Oh là là, aucun produit n'est encore là !
              </Typography>
            </Box>
            <Button
              variant="contained"
              onClick={() => setModalOpen(true)}
              sx={{
                width: "100%",
                borderRadius: "16px",
                height: "56px",
              }}
            >
              Ajoutez votre produit et laissez la magie opérer !
            </Button>
          </CardContent>
        </Card>
      ) : (
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
                      key={nft.id}
                      size={{ xs: 12, md: 6 }}
                      sx={{ display: "flex", flexDirection: "column" }}
                    >
                      {nft.nft.metadata &&
                      Object.keys(nft.nft.metadata).length === 0 ? (
                        <Card
                          sx={{
                            flex: 1,
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                            borderRadius: "16px",
                          }}
                        >
                          <CardContent
                            sx={{
                              background:
                                "linear-gradient(to right, #f0f0f0, #ffffff)",
                              textAlign: "center",
                            }}
                          >
                            <Box>
                              <Typography variant="body1">
                                {nft.nft.collection?.name ??
                                  "Unknown Collection"}
                              </Typography>
                              <Typography variant="body2">
                                Token ID: {nft.nft.tokenId}
                              </Typography>
                              <Typography variant="body2">
                                Contract ID: {nft.nft.collection?.id ?? "N/A"}
                              </Typography>
                            </Box>
                          </CardContent>
                        </Card>
                      ) : (
                        <ProductCard
                          product={new Product(nft.nft.metadata)}
                          tokenAddress={
                            (nft.nft.collection?.id ?? "0x") as `0x${string}`
                          }
                          tokenId={nft.nft.tokenId}
                          sx={{ flex: 1 }}
                        />
                      )}
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
      )}

      <AddProductModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </Container>
  );
}

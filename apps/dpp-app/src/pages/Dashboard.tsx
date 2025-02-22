import { Typography, Container, Box, Card, CardContent } from "@mui/material";
import ProductCard from "../components/ProductCard";
import Grid2 from "@mui/material/Grid2";
import {
  useKeybanAccount,
  useKeybanAccountNfts,
  type KeybanNftBalance,
} from "@keyban/sdk-react";
import Product from "../models/Product";

export default function Dashboard() {
  const [account, accountError] = useKeybanAccount();
  const [nfts, nftsError, { fetchMore, loading }] = useKeybanAccountNfts(
    account!,
    { first: 5 },
  );

  if (accountError) {
    return <div>Error fetching account: {accountError.message}</div>;
  }
  if (nftsError) {
    return <div>Error fetching NFTs: {nftsError.message}</div>;
  }

  if (!nfts) {
    return <div>Chargement des produits...</div>;
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
            <button onClick={fetchMore} disabled={loading}>
              {loading ? "Loading..." : "Load More"}
            </button>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}

import { useNavigate, useParams } from "react-router-dom";

import {
  type KeybanNft,
  useKeybanAccount,
  useKeybanAccountNfts,
} from "@keyban/sdk-react";
import {
  Alert,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

interface NftMetadata {
  name?: string;
  description?: string;
}

const NftDetailsPage = () => {
  const { nftId } = useParams();
  const navigate = useNavigate();

  // Récupérer le compte
  const [account, accountError] = useKeybanAccount({
    suspense: true,
  });
  if (accountError) throw accountError;

  // Récupérer la liste des NFTs associés à ce compte
  const [nfts, nftError] = useKeybanAccountNfts(account, { suspense: true });
  if (nftError) throw nftError;

  // Trouver le NFT spécifique par son ID
  const nft = nfts?.find((nft) => nft.id === nftId) as KeybanNft | undefined;

  const metadata = nft?.metadata as NftMetadata;

  if (!nft) {
    return (
      <Alert severity="error">
        <Typography variant="h6" component="div">
          NFT not found
        </Typography>
        <Button variant="contained" onClick={() => navigate("/")}>
          Back to Dashboard
        </Button>
      </Alert>
    );
  }

  return (
    <>
      <Container maxWidth="md" sx={{ marginTop: 4 }}>
        <Card sx={{ padding: 2 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              {nft.imageUrl ? (
                <CardMedia
                  component="img"
                  image={nft.imageUrl}
                  alt={metadata.name}
                  sx={{ width: "100%", borderRadius: 2 }}
                />
              ) : (
                <Skeleton variant="rectangular" width="100%" height={300} />
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <CardContent>
                {/* Affichage du nom de la collection */}
                <Typography variant="h6" color="textSecondary">
                  Collection : {nft.token.name}
                </Typography>
                {/* Affichage du nom du NFT */}
                <Typography variant="h4" component="div" gutterBottom>
                  {metadata.name}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ marginBottom: 2 }}
                >
                  {metadata.description}
                </Typography>

                <Stack spacing={1}>
                  {(
                    nft.metadata as {
                      attributes?: { trait_type: string; value: string }[];
                    }
                  )?.attributes?.map((attribute, index) => (
                    <Typography key={index}>
                      <strong>{attribute.trait_type} :</strong>{" "}
                      {attribute.value}
                    </Typography>
                  ))}
                </Stack>
              </CardContent>
            </Grid>
          </Grid>
        </Card>

        <Stack direction="row" justifyContent="center" sx={{ marginTop: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/")}
          >
            Back to Dashboard
          </Button>
        </Stack>
      </Container>
    </>
  );
};

export default NftDetailsPage;

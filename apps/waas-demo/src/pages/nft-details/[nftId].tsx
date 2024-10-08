import type React from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

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

interface NftMetadataProperty {
  type: string;
  description: string;
  value: string;
}

interface NftMetadata {
  name?: string;
  description?: string;
  image?: string;
  properties?: {
    [key: string]: NftMetadataProperty;
  };
}

const NftDetailsPage: React.FC = () => {
  const { nftId } = useParams<{ nftId: string }>();
  const navigate = useNavigate();

  // Retrieve the account
  const [account, accountError] = useKeybanAccount({
    suspense: true,
  });
  if (accountError) throw accountError;

  // Retrieve the list of NFTs associated with this account
  const [nfts, nftError] = useKeybanAccountNfts(account, { suspense: true });
  if (nftError) throw nftError;

  // Find the specific NFT by its ID
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
              {metadata.image ? (
                <CardMedia
                  component="img"
                  image={metadata.image}
                  alt={metadata.name}
                  sx={{ width: "100%", borderRadius: 2 }}
                />
              ) : (
                <Skeleton variant="rectangular" width="100%" height={300} />
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <CardContent>
                {/* Display the collection name */}
                <Typography variant="h6" color="textSecondary">
                  Collection: {metadata.properties?.collection?.value}
                </Typography>
                {/* Display the NFT name */}
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
                {/* Display the balance */}
                <Typography variant="body1" color="textSecondary">
                  Balance: {nft.balance.toString()}
                </Typography>
                <Stack spacing={1} sx={{ marginTop: 2 }}>
                  {metadata.properties &&
                    Object.entries(metadata.properties)
                      .filter(([key]) => key !== "collection") // Exclude the 'collection' property
                      .map(([key, prop]) => (
                        <Typography key={nft.id + nft.token.address}>
                          <strong>{key.replace(/_/g, " ")}:</strong>{" "}
                          {prop.value}
                        </Typography>
                      ))}
                </Stack>
              </CardContent>
            </Grid>
          </Grid>
        </Card>

        {/* Add Transfer NFT Button */}
        <Stack
          direction="row"
          justifyContent="center"
          sx={{ marginTop: 4 }}
          spacing={2}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              navigate("/transfer-nft", {
                state: { nftId: nft.id },
              })
            }
          >
            Transfer NFT
          </Button>
          <Button
            variant="contained"
            color="secondary"
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

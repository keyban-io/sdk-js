import {
  type Address,
  useKeybanAccount,
  useKeybanAccountNft,
} from "@keyban/sdk-react";
import {
  Alert,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import type React from "react";
import { useNavigate, useParams } from "react-router-dom";

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
  const [, rawTokenAddress, tokenId] = nftId?.split(":") || [];
  const tokenAddress = rawTokenAddress?.startsWith("0x")
    ? (rawTokenAddress as Address)
    : (`0x${rawTokenAddress}` as Address);
  const navigate = useNavigate();

  // Retrieve the account
  const [account, accountError] = useKeybanAccount();
  if (accountError) throw accountError;

  // Retrieve the NFT balance associated with this account
  const [balance, nftError] = useKeybanAccountNft(
    account,
    tokenAddress,
    tokenId,
  );
  if (nftError) throw nftError;

  const metadata =
    balance && "nft" in balance && balance.nft
      ? (balance.nft.metadata as NftMetadata)
      : undefined;

  if (!balance) {
    return (
      <Alert severity="error">
        <Typography variant="h6" component="div">
          Balance not found
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/")}
          color="secondary"
        >
          Back to Dashboard
        </Button>
      </Alert>
    );
  }

  return (
    <>
      <Container maxWidth="md" sx={{ marginTop: 4 }}>
        <Card sx={{ padding: 2 }}>
          <Grid2 container spacing={4}>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              {metadata?.image ? (
                <CardMedia
                  component="img"
                  image={metadata.image}
                  alt={metadata.name}
                  sx={{ width: "100%", borderRadius: 2 }}
                />
              ) : (
                <Skeleton variant="rectangular" width="100%" height={300} />
              )}
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <CardContent>
                {/* Display the collection name */}
                <Typography variant="h6" color="textSecondary">
                  Collection: {metadata?.properties?.collection?.value}
                </Typography>
                {/* Display the NFT name */}
                <Typography variant="h5" component="div" gutterBottom>
                  {metadata?.name}
                </Typography>

                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ marginBottom: 2 }}
                >
                  {metadata?.description}
                </Typography>
                {/* Display the balance */}
                {balance && "balance" in balance && (
                  <Typography variant="body1" color="textSecondary">
                    Balance: {balance.balance.toString()}
                  </Typography>
                )}
                <Stack spacing={1} sx={{ marginTop: 2 }}>
                  {metadata?.properties &&
                    Object.entries(metadata.properties)
                      .filter(([key]) => key !== "collection") // Exclude the 'collection' property
                      .map(([key, prop]) => (
                        <Typography key={key}>
                          <strong>{key.replace(/_/g, " ")}:</strong>{" "}
                          {prop.value}
                        </Typography>
                      ))}
                </Stack>
              </CardContent>
            </Grid2>
          </Grid2>
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
                state: { nftId: "id" in balance ? balance.id : "" },
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

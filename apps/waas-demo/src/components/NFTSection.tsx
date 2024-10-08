import React from "react";

import { useNavigate } from "react-router-dom";

import {
  type KeybanNft,
  useKeybanAccount,
  useKeybanAccountNfts,
} from "@keyban/sdk-react";
import {
  Alert,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
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

const NFTSection: React.FC = () => {
  const [account, accountError] = useKeybanAccount({ suspense: true });
  if (accountError) throw accountError;

  const [nfts, nftError] = useKeybanAccountNfts(account, {
    suspense: true,
  });
  if (nftError) throw nftError;

  const navigate = useNavigate();

  if (!nfts || nfts.length === 0) {
    return (
      <Alert severity="info">
        <Typography variant="h6" component="div">
          No NFTs available in this account.
        </Typography>
      </Alert>
    );
  }

  // Group NFTs by their collection name from metadata properties
  const nftCollections = nfts.reduce(
    (acc, nft) => {
      const metadata = nft.metadata as NftMetadata;
      const collectionName =
        metadata?.properties?.collection?.value ?? "Unknown Collection";
      if (!acc[collectionName]) {
        acc[collectionName] = [];
      }
      acc[collectionName].push(nft);
      return acc;
    },
    {} as Record<string, KeybanNft[]>,
  );

  return (
    <div>
      {Object.keys(nftCollections).map((collectionName) => (
        <div key={collectionName} style={{ marginBottom: "2rem" }}>
          <Typography variant="h4" component="div" sx={{ mb: 2 }}>
            {collectionName}
          </Typography>
          <Grid container spacing={2}>
            {nftCollections[collectionName].map((nft) => {
              const metadata = nft.metadata as NftMetadata;
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={nft.id}>
                  <Card
                    sx={{
                      maxWidth: 345,
                      "&:hover": {
                        boxShadow: 6,
                        transform: "scale(1.02)",
                        transition: "transform 0.2s",
                      },
                    }}
                  >
                    <CardActionArea
                      onClick={() => navigate(`/nft-details/${nft.id}`)}
                    >
                      <CardMedia
                        component="img"
                        image={metadata?.image ?? ""}
                        alt={metadata?.name ?? ""}
                        loading="lazy"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {metadata?.name ?? ""}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          ID: {nft.id}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Balance:{nft.balance.toString()}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </div>
      ))}
    </div>
  );
};

export default NFTSection;

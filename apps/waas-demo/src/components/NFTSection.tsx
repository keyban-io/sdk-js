import type React from "react";

import { useNavigate } from "react-router-dom";

import { useKeybanAccount, useKeybanAccountNft } from "@keyban/sdk-react";
import {
  Alert,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

const NFTSection: React.FC = () => {
  const [account, accountError] = useKeybanAccount({ suspense: true });
  if (accountError) throw accountError;

  const [nfts, nftError] = useKeybanAccountNft(account, { suspense: true });
  if (nftError) throw nftError;

  const navigate = useNavigate();

  if (!nfts || nfts.length === 0) {
    return (
      <Alert severity="info">
        <Typography variant="h6" component="div">
          Aucun NFT disponible dans ce compte.
        </Typography>
      </Alert>
    );
  }

  // Regrouper les NFTs par leur token.name (nom de la collection)
  const nftCollections = nfts.reduce(
    (acc, nft) => {
      const collectionName = nft.token.name ?? "Collection Inconnue";
      if (!acc[collectionName]) {
        acc[collectionName] = [];
      }
      acc[collectionName].push(nft);
      return acc;
    },
    {} as Record<string, typeof nfts>,
  );

  return (
    <div>
      {Object.keys(nftCollections).map((collectionName) => (
        <div key={collectionName} style={{ marginBottom: "2rem" }}>
          <Typography variant="h4" component="div" sx={{ mb: 2 }}>
            {collectionName}
          </Typography>
          <Grid container spacing={2}>
            {nftCollections[collectionName].map((nft) => (
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
                      image={nft.imageUrl ?? ""}
                      alt={(nft.metadata as { name?: string })?.name ?? ""}
                      loading="lazy"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {(nft.metadata as { name?: string })?.name ?? ""}
                      </Typography>
                      {/* Ajouter des informations supplémentaires si nécessaire */}
                      <Typography variant="body2" color="text.secondary">
                        ID: {nft.id}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      ))}
    </div>
  );
};

export default NFTSection;

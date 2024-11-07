import type React from "react";

import { useNavigate } from "react-router-dom";

import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  type KeybanNft,
  useKeybanAccount,
  useKeybanAccountNfts,
} from "@keyban/sdk-react";
import {
  Alert,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Tooltip,
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
  const [account, accountError] = useKeybanAccount();
  if (accountError) throw accountError;

  const [nftBalances, nftError] = useKeybanAccountNfts(account);
  if (nftError) throw nftError;

  const navigate = useNavigate();

  if (!nftBalances?.edges.length) {
    return (
      <Alert severity="info">
        <Typography variant="h6" component="div">
          No NFTs available in this account.
        </Typography>
      </Alert>
    );
  }

  // Regrouper les NFTs par nom de collection
  const nftCollections = nftBalances.edges.reduce(
    (acc, { node }) => {
      if (!node) return acc;

      const metadata = node.nft?.metadata as NftMetadata;
      const collectionName =
        metadata?.properties?.collection?.value ?? "Unknown Collection";

      acc[collectionName] ??= [];
      acc[collectionName].push(node);
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
          <Grid container spacing={2} alignItems="stretch">
            {nftCollections[collectionName].map((nftBalance) => {
              const metadata = nftBalance.nft?.metadata as NftMetadata;
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={nftBalance.id}>
                  <Card
                    sx={{
                      maxWidth: 345,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      "&:hover": {
                        boxShadow: 6,
                        transform: "scale(1.02)",
                        transition: "transform 0.2s",
                      },
                    }}
                  >
                    <CardActionArea
                      onClick={() => navigate(`/nft-details/${nftBalance.id}`)}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        flexGrow: 1,
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={metadata?.image ?? ""}
                        alt={metadata?.name ?? ""}
                        loading="lazy"
                        sx={{
                          height: 200,
                          width: "100%",
                          objectFit: "cover",
                        }}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="div">
                          {metadata?.name ?? ""}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          ID: {nftBalance.nft?.tokenId}
                        </Typography>

                        {/* Afficher le balance uniquement s'il est supérieur à 1 */}
                        {Number.parseInt(nftBalance.balance.toString(), 10) >
                          1 && (
                          <Typography variant="body2" color="text.secondary">
                            Balance: {nftBalance.balance.toString()}
                          </Typography>
                        )}
                      </CardContent>
                    </CardActionArea>
                    <CardActions sx={{ justifyContent: "flex-end" }}>
                      <Tooltip title="Transfer NFT">
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() =>
                            navigate("/transfer-nft", {
                              state: { nftId: nftBalance.id },
                            })
                          }
                        >
                          <FontAwesomeIcon icon={faPaperPlane} />
                        </IconButton>
                      </Tooltip>
                    </CardActions>
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

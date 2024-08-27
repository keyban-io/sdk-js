import type React from "react";
import {
  Stack,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";

interface NFT {
  id: string;
  name: string;
  imageUrl: string;
}

interface NFTSectionProps {
  nfts: NFT[];
}

const NFTSection: React.FC<NFTSectionProps> = ({ nfts }) => {
  const rows = Math.ceil(nfts.length / 3);

  return (
    <Stack spacing={2} alignItems="center">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <Stack key={rowIndex} direction="row" spacing={2}>
          {nfts.slice(rowIndex * 3, rowIndex * 3 + 3).map((nft) => (
            <Card key={nft.id} sx={{ maxWidth: 200 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={nft.imageUrl}
                  alt={nft.name}
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {nft.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Stack>
      ))}
    </Stack>
  );
};

export default NFTSection;

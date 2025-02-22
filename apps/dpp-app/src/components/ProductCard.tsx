import {
  Card,
  CardContent,
  Typography,
  Box,
  Tooltip,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Hex } from "@keyban/sdk-react";

import Product from "../models/Product";

import InfoIcon from "@mui/icons-material/Info";

interface ProductCardProps {
  product: Product;
  tokenAddress: Hex;
  tokenId: string;
  fullSizeImage?: boolean;
  sx?: object; // Add sx prop for custom styles
}

export default function ProductCard({
  product,
  tokenAddress,
  tokenId,
  sx,
}: ProductCardProps) {
  const navigate = useNavigate();

  if (!product) {
    return null;
  }

  const handleDetailsClick = () => {
    navigate(`/product-details/${tokenAddress}/${tokenId}`);
  };

  return (
    <Box
      sx={{
        position: "relative",
        mb: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between", // Add this line
        ...sx,
      }}
    >
      <Box
        sx={{
          width: "100%",
          borderRadius: "16px 16px 0 0", // Rounded top corners
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          zIndex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center", // Add this line
          flex: 1, // Add this line to make the image container grow
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{ maxWidth: "100%", maxHeight: "100%" }} // Add maxHeight to ensure the image fits within the container
        />
        <Box
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            display: "flex",
            gap: 1,
          }}
        >
          <Tooltip title="Voir les détails">
            <IconButton
              color="primary"
              onClick={handleDetailsClick}
              sx={{
                zIndex: 1000,
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                border: "1px solid rgba(0, 0, 0, 0.1)",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              }}
            >
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Box sx={{ mt: -2, zIndex: 2, position: "relative" }}>
        <Card
          sx={{
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            borderRadius: "16px", // Rounded corners,
            flex: 1, // Make the card grow to fill the container
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end", // Add this line to position the content at the bottom
          }}
        >
          <CardContent
            sx={{
              background: "linear-gradient(to right, #f0f0f0, #ffffff)", // Adjust gradient background to start with a lighter gray
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              {/* Nouvelle barre au-dessus de product.name */}
              <Box
                sx={{
                  width: "10%",
                  height: "2px",
                  backgroundColor: "primary.main",
                  margin: "auto",
                  borderRadius: "2px",
                  mb: 1,
                }}
              />
              <Typography variant="body1">{product.name}</Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

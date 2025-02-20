import {
  Card,
  CardContent,
  Typography,
  Box,
  Tooltip,
  IconButton,
} from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import { useNavigate } from "react-router-dom";
import productBosch from "../assets/Four_integrable_multifonction_Bosch_HBA171BS4F.json";
import productSmeg from "../assets/Grille_pain_Smeg_TSF01_2_fentes_Toaster_Noir.json";
import productSamsung from "../assets/Lave_linge_hublot_Samsung_Ecobubble_WW80CGC04DTH_8kg_Blanc.json";
import productLG from "../assets/Refrigerateur_combine_LG_GBV3100DEP_Noir.json";
import productLGTV from "../assets/TV_OLED_Evo_LG_OLED55C4_139cm_4K_UHD_Smart_TV_2024_Noir_et_Brun.json";
import Product from "../models/Product";
import { formatDate } from "../utils/formatDate";

const products = [
  // Consolidated product data from JSON files
  new Product(productBosch),
  new Product(productSmeg),
  new Product(productSamsung),
  new Product(productLG),
  new Product(productLGTV),
];

import InfoIcon from "@mui/icons-material/Info";
import TimelineDot from "@mui/lab/TimelineDot";

interface ProductCardProps {
  productId: string;
  fullSizeImage?: boolean;
  sx?: object; // Add sx prop for custom styles
}

export default function ProductCard({ productId, sx }: ProductCardProps) {
  const navigate = useNavigate();
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return null;
  }

  const handleDetailsClick = () => {
    navigate(`/product-details/${productId}`);
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
                  height: "3px",
                  mb: 1,
                  backgroundColor: "primary.main",
                  margin: "auto",
                  borderRadius: "2px",
                }}
              />
              <Typography variant="h5">{product.name}</Typography>
              {product.attributesMap["Status"] && (
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  {product.attributesMap["Status"].value}
                </Typography>
              )}
              {product.attributesMap["Ownership status"] && (
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {product.attributesMap["Ownership status"].value}
                </Typography>
              )}
              {product.attributesMap["Acquisition date"] && (
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  Date d’acquisition :{" "}
                  {formatDate(
                    product.attributesMap["Acquisition date"].value as number,
                  )}
                </Typography>
              )}
              {product.eventsMap["Acquisition date"] && (
                <Typography variant="caption" color="textSecondary">
                  (Event Acquisition :{" "}
                  {formatDate(product.eventsMap["Acquisition date"] as number)})
                </Typography>
              )}
              <Timeline>
                <TimelineItem>
                  <TimelineOppositeContent
                    align="right"
                    variant="body2"
                    color="text.secondary"
                  >
                    {formatDate(product.latestEvent?.value as number)}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot color="secondary"></TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    {" "}
                    <Typography>{product.latestEvent?.trait_type}</Typography>
                  </TimelineContent>
                </TimelineItem>
              </Timeline>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

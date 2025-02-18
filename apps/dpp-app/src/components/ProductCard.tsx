import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
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
import productBosch from "../../../../../tests/specs/features/metadata/eletronics/tpp-app/Four intégrable multifonction 71l 60cm a pyrolyse et hydrolyse inox Bosch HBA171BS4F.json";
import productSmeg from "../../../../../tests/specs/features/metadata/eletronics/tpp-app/Grille-pain Smeg TSF01 2 fentes Toaster Noir.json";
import productSamsung from "../../../../../tests/specs/features/metadata/eletronics/tpp-app/Lave-linge hublot Samsung Ecobubble™ WW80CGC04DTH 8 kg Blanc.json";
import productLG from "../../../../../tests/specs/features/metadata/eletronics/tpp-app/Réfrigérateur combiné LG GBV3100DEP Noir.json";
import productLGTV from "../../../../../tests/specs/features/metadata/eletronics/tpp-app/TV OLED Evo LG OLED55C4 139 cm 4K UHD Smart TV 2024 Noir et Brun.json";
import { mapAttributes } from "../utils/attributes";
import { mapEvents } from "../utils/events";

const products = [
  // Consolidated product data from JSON files
  productBosch,
  productSmeg,
  productSamsung,
  productLG,
  productLGTV,
];
import VerifiedIcon from "@mui/icons-material/Verified";
import BuildIcon from "@mui/icons-material/Build";
import UpdateIcon from "@mui/icons-material/Update";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EventIcon from "@mui/icons-material/Event";
import InfoIcon from "@mui/icons-material/Info";
import TimelineDot from "@mui/lab/TimelineDot";

const iconMap: { [key: string]: React.ReactElement } = {
  VerifiedIcon: <VerifiedIcon />,
  BuildIcon: <BuildIcon />,
  UpdateIcon: <UpdateIcon />,
  CheckCircleIcon: <CheckCircleIcon />,
  EventIcon: <EventIcon />,
};

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

  // Mappe les attributs et events pour un accès simplifié
  const attrs = mapAttributes(product.attributes || []);
  const eventsMap = mapEvents(product.events || []);

  // Find the most recent event
  const mostRecentEvent = eventsMap[0];

  // Format date to be human-readable
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Conversion de la date d'acquisition si disponible
  const acquisitionEvent = eventsMap["Acquisition date"];
  const acquisitionDate = attrs["Acquisition date"]
    ? new Date(attrs["Acquisition date"] * 1000).toISOString()
    : null;

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
              <Typography variant="h5">{product.name}</Typography>
              {attrs["Status"] && (
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  {attrs["Status"]}
                </Typography>
              )}
              {attrs["Ownership status"] && (
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {attrs["Ownership status"]}
                </Typography>
              )}
              {acquisitionDate && (
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  Date d’acquisition : {formatDate(acquisitionDate)}
                </Typography>
              )}
              {acquisitionEvent && (
                <Typography variant="caption" color="textSecondary">
                  (Event Acquisition :{" "}
                  {formatDate(new Date(acquisitionEvent * 1000).toISOString())})
                </Typography>
              )}
              <Timeline>
                <TimelineItem>
                  <TimelineOppositeContent
                    align="right"
                    variant="body2"
                    color="text.secondary"
                  >
                    {formatDate(mostRecentEvent.date)}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot color="secondary">
                      {iconMap[mostRecentEvent.icon]}
                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    {" "}
                    <Typography>{mostRecentEvent.description}</Typography>
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

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
import products from "../data/products.json";
import VerifiedIcon from "@mui/icons-material/Verified";
import BuildIcon from "@mui/icons-material/Build";
import UpdateIcon from "@mui/icons-material/Update";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EventIcon from "@mui/icons-material/Event";
import InfoIcon from "@mui/icons-material/Info";
import samsungWashingMachine from "../assets/Samsung WW80CGC04DTH washing machine.webp";
import lgRefrigerator from "../assets/LG GBV3100EPY Refrigerator.webp";
import boschOven from "../assets/Bosch HBA171BB3F integrated oven.webp";
import smegToasterBlue from "../assets/Smeg TSF01 Bleu.png";
import lgOledTv from "../assets/TV OLED LG OLED55C4 2024.webp";
import TimelineDot from "@mui/lab/TimelineDot";

const iconMap: { [key: string]: React.ReactElement } = {
  VerifiedIcon: <VerifiedIcon />,
  BuildIcon: <BuildIcon />,
  UpdateIcon: <UpdateIcon />,
  CheckCircleIcon: <CheckCircleIcon />,
  EventIcon: <EventIcon />,
};

const imageMap: { [key: string]: string } = {
  samsungWashingMachine,
  lgRefrigerator,
  boschOven,
  smegToasterBlue,
  lgOledTv,
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

  // Sort events by date from most recent to oldest
  const sortedEvents = product.events.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  // Find the most recent event
  const mostRecentEvent = sortedEvents[0];

  // Format date to be human-readable
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
          src={imageMap[product.imageKey]}
          alt={product.alt}
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
              {product.status && (
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  {product.status}
                </Typography>
              )}
              {product.ownershipStatus && (
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {product.ownershipStatus}
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
                    <TimelineDot color="primary">
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
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 1,
                  flexWrap: "wrap",
                  mt: 2,
                }}
              >
                {product.benefits.map((benefit, index) => (
                  <Chip
                    key={index}
                    icon={iconMap[benefit.icon]}
                    label={benefit.label}
                    color="primary"
                  />
                ))}
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

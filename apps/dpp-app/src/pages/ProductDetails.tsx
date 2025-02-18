import React from "react";
import { Container, Typography, Box, Card, CardContent } from "@mui/material";
import { useParams } from "react-router-dom";
import VerifiedIcon from "@mui/icons-material/Verified";
import BuildIcon from "@mui/icons-material/Build";
import UpdateIcon from "@mui/icons-material/Update";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EventIcon from "@mui/icons-material/Event";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import RepairIcon from "@mui/icons-material/Build";
import RecycleIcon from "@mui/icons-material/Autorenew";
import TransferIcon from "@mui/icons-material/TransferWithinAStation";
import Tooltip from "@mui/material/Tooltip";
import EuroIcon from "@mui/icons-material/Euro";
import IconButton from "@mui/material/IconButton";
import productBosch from "../../../../../tests/specs/features/metadata/eletronics/tpp-app/Four intégrable multifonction 71l 60cm a pyrolyse et hydrolyse inox Bosch HBA171BS4F.json";
import productSmeg from "../../../../../tests/specs/features/metadata/eletronics/tpp-app/Grille-pain Smeg TSF01 2 fentes Toaster Noir.json";
import productSamsung from "../../../../../tests/specs/features/metadata/eletronics/tpp-app/Lave-linge hublot Samsung Ecobubble™ WW80CGC04DTH 8 kg Blanc.json";
import productLG from "../../../../../tests/specs/features/metadata/eletronics/tpp-app/Réfrigérateur combiné LG GBV3100DEP Noir.json";
import productLGTV from "../../../../../tests/specs/features/metadata/eletronics/tpp-app/TV OLED Evo LG OLED55C4 139 cm 4K UHD Smart TV 2024 Noir et Brun.json";
import { mapAttributes } from "../utils/attributes";
import { mapEvents } from "../utils/events";

const iconMap: { [key: string]: React.ReactElement } = {
  VerifiedIcon: <VerifiedIcon />,
  BuildIcon: <BuildIcon />,
  UpdateIcon: <UpdateIcon />,
  CheckCircleIcon: <CheckCircleIcon />,
  EventIcon: <EventIcon />,
};

const products = [
  // Consolidated product data from JSON files
  productBosch,
  productSmeg,
  productSamsung,
  productLG,
  productLGTV,
];

export default function ProductDetails() {
  const { productId } = useParams();
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return <Typography variant="h6">Produit non trouvé</Typography>;
  }

  // Mappe les attributs et les events pour un accès simplifié
  const attrs = mapAttributes(product.attributes || []);
  const eventsMap = mapEvents(product.events || []);

  const acquisitionDate = attrs["Acquisition date"]
    ? new Date(attrs["Acquisition date"] * 1000).toISOString()
    : null;

  // Par exemple, accès à la date d'acquisition via l'event "Acquisition date"
  const acquisitionEvent = eventsMap["Acquisition date"];

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
    <Container sx={{ pb: 4, position: "relative" }} disableGutters>
      <Card
        sx={{
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          mb: 2,
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img src={product.image} alt={product.name} />
        <Box
          sx={{
            position: "absolute",
            bottom: 32, // Adjusted to move the buttons slightly above the bottom
            right: 16,
            display: "flex",
            gap: 1,
          }}
        >
          <Tooltip title="Réparer">
            <IconButton
              color="primary"
              aria-label="repair"
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 1)",
                },
              }}
            >
              <RepairIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Revendre">
            <IconButton
              color="primary"
              aria-label="sell"
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 1)",
                },
              }}
            >
              <EuroIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Recycler">
            <IconButton
              color="primary"
              aria-label="recycle"
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 1)",
                },
              }}
            >
              <RecycleIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Transferer">
            <IconButton
              color="primary"
              aria-label="transfer"
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 1)",
                },
              }}
            >
              <TransferIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Card>
      <Card
        sx={{
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          borderRadius: "16px",
          position: "relative",
          zIndex: 1,
          mt: -4, // Adjust margin top to position above the first card
        }}
      >
        <CardContent
          sx={{
            background: "linear-gradient(to right, #f0f0f0, #ffffff)", // Adjust gradient background to start with a lighter gray
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: "100%",
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h5">{product.name}</Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom>
                {attrs["Status"]}
              </Typography>
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
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  (Event : Acquisition -{" "}
                  {formatDate(new Date(acquisitionEvent * 1000).toISOString())})
                </Typography>
              )}
              <Timeline>
                {eventsMap.map((event, index) => (
                  <TimelineItem key={index}>
                    <TimelineOppositeContent
                      sx={{ py: "20px" }}
                      align="right"
                      variant="body2"
                      color="text.secondary"
                    >
                      {formatDate(event.date)}
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot color="secondary">
                        {iconMap[event.icon]}
                      </TimelineDot>
                      {index < sortedEvents.length - 1 && <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>
                      <Typography>{event.description}</Typography>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

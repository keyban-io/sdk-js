import React from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Chip,
  Card,
  CardContent,
} from "@mui/material";
import { useParams } from "react-router-dom";
import products from "../data/products.json";
import VerifiedIcon from "@mui/icons-material/Verified";
import BuildIcon from "@mui/icons-material/Build";
import UpdateIcon from "@mui/icons-material/Update";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import samsungWashingMachine from "../assets/Samsung WW80CGC04DTH washing machine.webp";
import lgRefrigerator from "../assets/LG GBV3100EPY Refrigerator.webp";
import boschOven from "../assets/Bosch HBA171BB3F integrated oven.webp";
import EventIcon from "@mui/icons-material/Event";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";

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
};

export default function ProductDetails() {
  const { productId } = useParams();
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return <Typography variant="h6">Produit non trouvé</Typography>;
  }

  // Sort events by date from most recent to oldest
  const sortedEvents = product.events.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

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
        <img src={imageMap[product.imageKey]} alt={product.alt} />
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
        <CardContent>
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
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Typography variant="h5">{product.name}</Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom>
                {product.status}
              </Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom>
                Date d’acquisition : {formatDate(product.acquisitionDate)}
              </Typography>
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
              <Timeline>
                {sortedEvents.map((event, index) => (
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
              <Button variant="text">[ Voir l’historique complet ]</Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

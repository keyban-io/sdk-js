import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Grid,
} from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import { useNavigate } from "react-router-dom";
import products from "../data/products.json";
import VerifiedIcon from "@mui/icons-material/Verified";
import BuildIcon from "@mui/icons-material/Build";
import UpdateIcon from "@mui/icons-material/Update";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import samsungWashingMachine from "../assets/Samsung WW80CGC04DTH washing machine.webp";
import lgRefrigerator from "../assets/LG GBV3100EPY Refrigerator.webp";
import boschOven from "../assets/Bosch HBA171BB3F integrated oven.webp";

const iconMap: { [key: string]: React.ReactNode } = {
  VerifiedIcon: <VerifiedIcon />,
  BuildIcon: <BuildIcon />,
  UpdateIcon: <UpdateIcon />,
  CheckCircleIcon: <CheckCircleIcon />,
};

const imageMap: { [key: string]: string } = {
  samsungWashingMachine,
  lgRefrigerator,
  boschOven,
};

interface ProductCardProps {
  productId: string;
  fullSizeImage?: boolean;
}

export default function ProductCard({
  productId,
  fullSizeImage,
}: ProductCardProps) {
  const navigate = useNavigate();
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return null;
  }

  const handleDetailsClick = () => {
    navigate(`/product-details/${productId}`);
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        pb: 2,
      }}
    >
      <CardContent>
        <Box
          sx={{
            width: "100%",
            maxWidth: fullSizeImage ? "100%" : "200px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              flex: "1 0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: fullSizeImage ? "auto" : "150px",
            }}
          >
            <img
              src={imageMap[product.imageKey]}
              alt={product.alt}
              style={{
                maxWidth: fullSizeImage ? "100%" : "100%",
                maxHeight: fullSizeImage ? "auto" : "100%",
              }}
            />
          </Box>
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Typography>{product.name}</Typography>
            {product.status && (
              <Typography variant="body1" color="textSecondary" gutterBottom>
                {product.status}
              </Typography>
            )}
            <Timeline>
              <TimelineItem>
                <TimelineOppositeContent
                  sx={{ py: "20px" }}
                  align="right"
                  variant="body2"
                  color="text.secondary"
                >
                  {product.date}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color="primary">
                    {iconMap[product.eventIcon]}
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Typography>{product.event}</Typography>
                </TimelineContent>
              </TimelineItem>
              {product.additionalEvents?.map((additionalEvent, index) => (
                <TimelineItem key={index}>
                  <TimelineOppositeContent
                    sx={{ py: "20px" }}
                    align="right"
                    variant="body2"
                    color="text.secondary"
                  >
                    {additionalEvent.date}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot color="secondary">
                      {iconMap[additionalEvent.icon]}
                    </TimelineDot>
                    {index < product.additionalEvents.length - 1 && (
                      <TimelineConnector />
                    )}
                  </TimelineSeparator>
                  <TimelineContent>
                    <Typography>{additionalEvent.description}</Typography>
                  </TimelineContent>
                </TimelineItem>
              ))}
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
        </Box>
      </CardContent>
      <Button
        variant="contained"
        sx={{ mt: 2, alignSelf: "center" }}
        onClick={handleDetailsClick}
      >
        Voir les détails
      </Button>
    </Card>
  );
}

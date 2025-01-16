import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
} from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  image: string;
  alt: string;
  name: string;
  event: string;
  benefits: { label: string; icon: React.ReactElement }[];
  date: string;
  additionalEvents?: {
    date: string;
    description: string;
    icon: React.ReactNode;
  }[];
  status?: string;
  eventIcon: React.ReactNode;
  fullSizeImage?: boolean;
}

export default function ProductCard({
  image,
  alt,
  name,
  event,
  benefits,
  date,
  additionalEvents,
  status,
  eventIcon,
  fullSizeImage,
}: ProductCardProps) {
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate("/product-details", {
      state: {
        product: {
          image,
          alt,
          name,
          event,
          benefits: benefits.map((benefit) => ({
            label: benefit.label,
            icon: benefit.icon.type.displayName,
            description: benefit.description,
          })),
          date,
          additionalEvents: additionalEvents?.map((event) => ({
            ...event,
            icon: event.icon.type.displayName,
          })),
          status,
          eventIcon: eventIcon.type.displayName,
          events: additionalEvents?.map((event) => event.description) || [],
        },
      },
    });
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
              src={image}
              alt={alt}
              style={{
                maxWidth: fullSizeImage ? "100%" : "100%",
                maxHeight: fullSizeImage ? "auto" : "100%",
              }}
            />
          </Box>
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Typography>{name}</Typography>
            {status && (
              <Typography variant="body1" color="textSecondary" gutterBottom>
                {status}
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
                  {date}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color="primary">{eventIcon}</TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Typography>{event}</Typography>
                </TimelineContent>
              </TimelineItem>
              {additionalEvents?.map((additionalEvent, index) => (
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
                      {additionalEvent.icon}
                    </TimelineDot>
                    {index < additionalEvents.length - 1 && (
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
              {benefits.map((benefit, index) => (
                <Chip
                  key={index}
                  icon={benefit.icon as React.ReactElement}
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

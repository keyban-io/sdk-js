import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";

interface ProductCardProps {
  image: string;
  alt: string;
  name: string;
  event: string;
  benefit: string;
}

export default function ProductCard({
  image,
  alt,
  name,
  event,
  benefit,
}: ProductCardProps) {
  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            width: "100%",
            maxWidth: "200px",
            height: "300px",
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
              height: "150px",
            }}
          >
            <img
              src={image}
              alt={alt}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
              }}
            />
          </Box>
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Typography>{name}</Typography>
            <Timeline>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>{event}</TimelineContent>
              </TimelineItem>
            </Timeline>
            <Typography>{benefit}</Typography>
            <Button variant="contained">Voir les détails</Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

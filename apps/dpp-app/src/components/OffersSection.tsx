import React from "react";
import { Box, Typography } from "@mui/material";

interface OffersSectionProps {
  offers: Array<{ title: string; description: string; price: number }>;
}

const OffersSection: React.FC<OffersSectionProps> = ({ offers }) => (
  <Box sx={{ mt: 2, width: "100%" }}>
    {offers.map((offer, idx) => (
      <Box
        key={idx}
        sx={{
          p: 1,
          borderBottom: "1px solid",
          borderColor: "divider",
          mb: 1,
        }}
      >
        <Typography variant="body2" fontWeight="bold">
          {offer.title} - {offer.price}€
        </Typography>
        <Typography variant="body2">{offer.description}</Typography>
      </Box>
    ))}
  </Box>
);

export default OffersSection;

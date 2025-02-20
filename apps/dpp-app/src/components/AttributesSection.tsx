import React from "react";
import { Box, Typography } from "@mui/material";
import { formatDate } from "../utils/formatDate";

// Composant pour afficher les caractéristiques du produit
interface AttributesSectionProps {
  attributesMap: {
    [key: string]: { value: string | number; display_type?: string };
  };
}

// Updated AttributesSection component for improved rendering
const AttributesSection: React.FC<AttributesSectionProps> = ({
  attributesMap,
}) => (
  <Box sx={{ mt: 2, width: "100%" }}>
    <Box>
      {Object.entries(attributesMap).map(([attr, value]) => (
        <Box
          key={attr}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 1,
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography variant="body2" fontWeight="bold">
            {attr}
          </Typography>
          {value.display_type === "date" ? (
            <Typography variant="body2">
              {formatDate(Number(value.value))}
            </Typography>
          ) : (
            <Typography variant="body2">{value.value}</Typography>
          )}
        </Box>
      ))}
    </Box>
  </Box>
);

export default AttributesSection;

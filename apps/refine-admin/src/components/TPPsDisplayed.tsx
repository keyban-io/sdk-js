"use client";

import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import { tppsChartData } from "../dashboardData";
import { useTimeFrame } from "../hooks/useTimeFrame";

// Fonction de mapping
const mapTimeFrame = (tf: string) => {
  if (tf === "days") return "daily";
  if (tf === "weeks") return "weekly";
  if (tf === "months") return "monthly";
  if (tf === "years") return "yearly";
  return "weekly"; // overall par défaut
};

type TppData = { date: string; TPPs: number; userTPPs: number };

export const TPPsDisplayed: React.FC = () => {
  const { timeFrame } = useTimeFrame();
  const timeframeKey = mapTimeFrame(timeFrame);
  // Cast the TPP data with an explicit type
  const data =
    (tppsChartData[timeframeKey as keyof typeof tppsChartData] as TppData[]) ||
    [];

  // Use explicit type for items in reduce
  const tppOwned = data.reduce(
    (sum: number, item: TppData) => sum + item.TPPs,
    0,
  );
  const tppDisplayed = data.reduce(
    (sum: number, item: TppData) => sum + item.userTPPs,
    0,
  );

  return (
    <Paper elevation={3} sx={{ p: 2, borderRadius: 4, width: "100%" }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        TPPs Displayed
      </Typography>
      <Box
        width="100%"
        height={270}
        minHeight={270}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box textAlign="center">
          <Typography variant="subtitle1">Owned</Typography>
          <Typography variant="h2">{tppOwned}</Typography>
        </Box>
        <Box textAlign="center">
          <Typography variant="subtitle1">Displayed</Typography>
          <Typography variant="h2">{tppDisplayed}</Typography>
        </Box>
      </Box>
    </Paper>
  );
};

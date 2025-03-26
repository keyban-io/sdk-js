"use client";

import React from "react";
import { Typography, Paper, Box } from "@mui/material";
import { tppsChartData } from "../dashboardData";
import { useTimeFrame } from "./TimeFrameSelector/useTimeFrame";

type TppData = { date: string; TPPs: number; userTPPs: number };

export const TotalTPPCount: React.FC = () => {
  const { timeFrame } = useTimeFrame();
  // Cast the TPP data with an explicit type
  const data =
    (tppsChartData[timeFrame as keyof typeof tppsChartData] as TppData[]) || [];

  const createdTPPs = data.reduce(
    (sum: number, item: TppData) => sum + item.TPPs,
    0
  );
  const ownedTPPs = data.reduce(
    (sum: number, item: TppData) => sum + item.userTPPs,
    0
  );
  const percentage =
    createdTPPs > 0 ? Math.round((ownedTPPs / createdTPPs) * 100) : 0;

  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 4, width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          py: 6,
          px: 2,
        }}
      >
        <Typography variant="h1" component="div">
          {percentage}%
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 4 }}>
          Owned TPP
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 6,
          }}
        >
          <Box textAlign="center">
            <Typography variant="h1">{ownedTPPs}</Typography>
            <Typography variant="subtitle1">TPP Owned</Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

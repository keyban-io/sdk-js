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
    0,
  );
  const associatedTPPs = data.reduce(
    (sum: number, item: TppData) => sum + item.userTPPs,
    0,
  );
  const percentage =
    createdTPPs > 0 ? Math.round((associatedTPPs / createdTPPs) * 100) : 0;

  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 4, width: "100%" }}>
      {/* Main information: percentage display */}
      <Box textAlign="center" sx={{ mt: 2 }}>
        <Typography variant="h1" component="div">
          {percentage}%
        </Typography>
        <Typography variant="subtitle1" sx={{ mt: 1 }}>
          Associated TPP
        </Typography>
      </Box>
      <Box
        width="100%"
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          minHeight: 270,
        }}
      >
        <Box textAlign="center">
          <Typography variant="subtitle1">Created</Typography>
          <Typography variant="h2">{createdTPPs}</Typography>
        </Box>
        <Box textAlign="center">
          <Typography variant="subtitle1">Associated</Typography>
          <Typography variant="h2">{associatedTPPs}</Typography>
        </Box>
      </Box>
    </Paper>
  );
};

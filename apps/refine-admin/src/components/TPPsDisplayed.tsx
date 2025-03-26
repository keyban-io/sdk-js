"use client";

import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import { tppsChartData } from "../dashboardData";
import { useTimeFrame } from "./TimeFrameSelector/useTimeFrame";

type TppData = { date: string; TPPs: number; userTPPs: number };

export const TPPsDisplayed: React.FC = () => {
  const { timeFrame } = useTimeFrame();
  // Cast the TPP data with an explicit type
  const data =
    (tppsChartData[timeFrame as keyof typeof tppsChartData] as TppData[]) || [];

  // Use explicit type for items in reduce
  const tppCreated = data.reduce(
    (sum: number, item: TppData) => sum + item.TPPs,
    0
  );

  return (
    <Paper elevation={3} sx={{ p: 2, borderRadius: 4, width: "100%" }}>
      <Box
        width="100%"
        height={270}
        minHeight={270}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly", // changed from "space-between"
        }}
      >
        <Box textAlign="center">
          <Typography variant="h2">{tppCreated}</Typography>
          <Typography variant="subtitle1">TPP created</Typography>
        </Box>
      </Box>
    </Paper>
  );
};

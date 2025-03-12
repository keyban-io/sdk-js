"use client";

import React from "react";
import { Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { usersChartData } from "../dashboardData"; // updated import
import { useTimeFrame } from "./TimeFrameSelector/useTimeFrame";

export const UsersChart: React.FC = () => {
  const { timeFrame } = useTimeFrame();
  const theme = useTheme();
  // Ensure timeFrame is valid, fallback to "daily"
  const data = usersChartData[timeFrame as keyof typeof usersChartData];

  return (
    <Paper elevation={3} sx={{ p: 2, borderRadius: 4, width: "100%" }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Evolution of the number of users
      </Typography>
      <ResponsiveContainer width="100%" height={270} minHeight={270}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={theme.palette.primary.main}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={theme.palette.primary.main}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} />
          <Tooltip formatter={(value: number) => value.toString()} />
          <Area
            type="monotone"
            dataKey="users"
            stroke={theme.palette.primary.main}
            fillOpacity={1}
            fill="url(#colorUsers)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Paper>
  );
};

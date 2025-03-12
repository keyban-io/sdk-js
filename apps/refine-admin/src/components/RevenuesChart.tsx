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
import { revenuesChartData } from "../dashboardData";
import { useTimeFrame } from "./TimeFrameSelector/useTimeFrame";

type RevenueData = { date: string; revenue: number };

export const RevenuesChart: React.FC = () => {
  const theme = useTheme();
  const { timeFrame } = useTimeFrame();
  // Cast the revenue data with an explicit type
  const data =
    (revenuesChartData[
      timeFrame as keyof typeof revenuesChartData
    ] as RevenueData[]) || [];

  return (
    <Paper elevation={3} sx={{ p: 2, borderRadius: 4, width: "100%" }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Product service revenue over time
      </Typography>
      <ResponsiveContainer width="100%" height={270} minHeight={270}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
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
          <YAxis
            axisLine={false}
            tickLine={false}
            tickFormatter={(val) => `${val}€`}
          />
          <Tooltip formatter={(value: number) => `${value}€`} />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke={theme.palette.primary.main}
            fillOpacity={1}
            fill="url(#colorRevenue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Paper>
  );
};

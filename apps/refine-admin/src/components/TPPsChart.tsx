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
  Legend,
} from "recharts";
import { tppsChartData } from "../../src/dashboardData";
import { useTimeFrame } from "./TimeFrameSelector/useTimeFrame";

type TppData = { date: string; TPPs: number; userTPPs: number };

export const TPPsChart: React.FC = () => {
  const theme = useTheme();
  const { timeFrame } = useTimeFrame();
  // Cast the TPP data with an explicit type
  const data =
    (tppsChartData[timeFrame as keyof typeof tppsChartData] as TppData[]) || [];

  return (
    <Paper elevation={3} sx={{ p: 2, borderRadius: 4, width: "100%" }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Evolution of TPPs and User TPPs
      </Typography>
      <ResponsiveContainer width="100%" height={270} minHeight={270}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorTPPs" x1="0" y1="0" x2="0" y2="1">
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
            <linearGradient id="colorUserTPPs" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={theme.palette.secondary.main}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={theme.palette.secondary.main}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <Legend
            verticalAlign="top"
            height={36}
            formatter={(value: string) =>
              value === "userTPPs" ? "User TPPs" : value
            }
          />
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} />
          <Tooltip formatter={(value: number) => value.toString()} />
          <Area
            type="monotone"
            dataKey="TPPs"
            stroke={theme.palette.primary.main}
            fillOpacity={1}
            fill="url(#colorTPPs)"
          />
          <Area
            type="monotone"
            dataKey="userTPPs"
            stroke={theme.palette.secondary.main}
            fillOpacity={1}
            fill="url(#colorUserTPPs)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Paper>
  );
};

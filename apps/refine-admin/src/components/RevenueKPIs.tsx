"use client";

import React from "react";
import { Typography, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { revenueKPIsData } from "../dashboardData"; // updated import

export const RevenueKPIs: React.FC = () => {
  const theme = useTheme();
  const colors = [theme.palette.primary.main, theme.palette.secondary.main];

  return (
    <Paper elevation={3} sx={{ p: 2, borderRadius: 4, width: "100%" }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Revenue KPIs
      </Typography>
      <ResponsiveContainer width="100%" height={270} minHeight={270}>
        <PieChart>
          <Pie
            data={revenueKPIsData}
            innerRadius={50}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            label={({ value }) => `${value}€`}
          >
            {revenueKPIsData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Legend
            verticalAlign="bottom"
            align="center"
            layout="horizontal"
            iconType="circle"
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Paper>
  );
};

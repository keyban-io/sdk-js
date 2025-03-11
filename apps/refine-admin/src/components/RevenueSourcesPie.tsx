"use client";

import React from "react";
import { Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { revenueSourcesPieData } from "../dashboardData"; // added import

export const RevenueSourcesPie: React.FC = () => {
  const theme = useTheme();
  const colors = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.primary.light,
  ];

  return (
    <Paper elevation={3} sx={{ p: 2, borderRadius: 4, width: "100%" }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Revenue product vs services
      </Typography>
      <ResponsiveContainer width="100%" height={270} minHeight={270}>
        <PieChart>
          <Pie
            data={revenueSourcesPieData} // using imported data
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={3}
            dataKey="value"
            label={({ value }) => `${value}€`}
          >
            {revenueSourcesPieData.map((_, index) => (
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

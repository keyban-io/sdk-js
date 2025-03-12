import React from "react";
import { Typography, Paper, Box } from "@mui/material";
import { usersChartData } from "../dashboardData";
import { useTimeFrame } from "./TimeFrameSelector/useTimeFrame";

type UsersData = { date: string; users: number };

export const TotalUsers: React.FC = () => {
  const { timeFrame } = useTimeFrame();
  // Cast the user data with an explicit type
  const data =
    (usersChartData[timeFrame as keyof typeof usersChartData] as UsersData[]) ||
    [];

  const totalUsers = data.reduce(
    (sum: number, item: UsersData) => sum + item.users,
    0,
  );

  return (
    <Paper elevation={3} sx={{ p: 2, borderRadius: 4, width: "100%" }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        New Users
      </Typography>
      <Box
        width="100%"
        height={270}
        minHeight={270}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Typography variant="h1">{totalUsers}</Typography>
      </Box>
    </Paper>
  );
};

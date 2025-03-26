import React from "react";
import { Typography, Paper, Box } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
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
    0
  );

  return (
    <Paper elevation={3} sx={{ p: 2, borderRadius: 4, width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          py: 6,
          px: 2,
          height: "100%",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <PersonIcon fontSize="large" sx={{ mr: 1 }} />
          <Typography variant="h1" component="span">
            {totalUsers}
          </Typography>
        </Box>
        <Typography variant="subtitle1">New Users</Typography>
      </Box>
    </Paper>
  );
};

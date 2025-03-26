import React from "react";
import { Typography, Paper, Box } from "@mui/material";

export const TPPsPerUser: React.FC = () => {
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
        <Typography variant="h1">1,2</Typography>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          TPPs per User
        </Typography>
      </Box>
    </Paper>
  );
};

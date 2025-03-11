import React from "react";
import { Typography, Paper, Box } from "@mui/material";

export const TPPsPerUser: React.FC = () => {
  return (
    <Paper elevation={3} sx={{ p: 2, borderRadius: 4, width: "100%" }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        TPPs per User
      </Typography>
      <Box
        width="100%"
        height={270}
        minHeight={270}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Typography variant="h1">1,2</Typography>
      </Box>
    </Paper>
  );
};

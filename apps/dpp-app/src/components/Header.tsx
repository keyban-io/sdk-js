import React from "react";
import { Box, Typography } from "@mui/material";

const Header: React.FC = () => {
  return (
    <Box sx={{ mb: 4, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Application Logo
      </Typography>
    </Box>
  );
};

export default Header;

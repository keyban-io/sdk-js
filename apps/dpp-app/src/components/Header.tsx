import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

const HeaderContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(2),
  boxShadow: (theme.shadows as string[])[0] || "none",
  textAlign: "center",
}));

const Logo = styled("img")({
  height: "50px",
  marginBottom: "8px",
});

const Header: React.FC = () => {
  return (
    <HeaderContainer sx={{ maxWidth: "sm", margin: "0 auto" }}>
      <Logo src="/path/to/logo.png" alt="Application Logo" />
      <Typography variant="h4" component="h1">
        Application Name
      </Typography>
    </HeaderContainer>
  );
};

export default Header;

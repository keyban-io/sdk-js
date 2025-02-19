import React from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import { SitemarkIcon } from "./SitemarkIcon.tsx"; // nouvelle importation

const HeaderContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(2),
  boxShadow: (theme.shadows as string[])[0] || "none",
  textAlign: "center",
}));

const Header: React.FC = () => {
  return (
    <HeaderContainer sx={{ maxWidth: "sm", margin: "0 auto" }}>
      <SitemarkIcon />
    </HeaderContainer>
  );
};

export default Header;

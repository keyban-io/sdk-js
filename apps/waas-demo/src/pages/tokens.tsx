import type React from "react";

import { useNavigate } from "react-router-dom";

import {
  Button,
  Stack,
  Typography,
} from "@mui/material";

import TokensSection from "../components/TokensSection";

const TransferPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <Stack direction="column" spacing={4}>
      <Typography variant="h4" align="center">
        Tokens
      </Typography>
      <TokensSection pageSize={2} />
      <div
        style={{
          position: "sticky",
          bottom: 0,
          alignSelf: "center",
          marginTop: "auto",
        }}
      >
        <Button variant="contained" onClick={handleBackClick}>
          Back to Dashboard
        </Button>
      </div>
    </Stack>
  );
};

export default TransferPage;

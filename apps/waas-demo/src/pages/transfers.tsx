import { Button, Stack, Typography } from "@mui/material";
import type React from "react";
import { useNavigate } from "react-router-dom";

import TransferList from "../components/TransferList";

const TransferPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <Stack direction="column" spacing={4}>
      <Typography variant="h5" align="center">
        Transfer History
      </Typography>
      <TransferList pageSize={10} />
      <div
        style={{
          position: "sticky",
          bottom: 0,
          alignSelf: "center",
          marginTop: "auto",
        }}
      >
        <Button variant="contained" onClick={handleBackClick} color="secondary">
          Back to Dashboard
        </Button>
      </div>
    </Stack>
  );
};

export default TransferPage;

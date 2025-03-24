import { useState } from "react";
import { useKeybanAccount } from "@keyban/sdk-react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  Select,
  MenuItem,
} from "@mui/material";

export default function Settings() {
  const [account, accountError] = useKeybanAccount();
  if (accountError) throw accountError;
  const domain = window.location.origin;
  let availableChains: { value: string; label: string }[] = [];
  let defaultChain = "";
  if (
    domain === "https://dpp-app.keyban.fr" ||
    domain === "https://dpp-app.staging.keyban.fr"
  ) {
    availableChains = [
      { value: "StarknetSepolia", label: "Starknet Sepolia" },
      { value: "StarknetMainnet", label: "Starknet Mainnet" },
    ];
    defaultChain = "StarknetSepolia";
  } else if (
    domain === "https://dpp-app.marc.lvh.me" ||
    domain === "https://dpp-app.testing.keyban.fr"
  ) {
    availableChains = [
      { value: "StarknetSepolia", label: "Starknet Sepolia" },
      { value: "StarknetDevnet", label: "Starknet Devnet" },
    ];
    defaultChain = "StarknetDevnet";
  } else {
    availableChains = [{ value: "StarknetDevnet", label: "Starknet Devnet" }];
    defaultChain = "StarknetDevnet";
  }

  const [selectedChain, setSelectedChain] = useState<string>(() => {
    return localStorage.getItem("selectedChain") || defaultChain;
  });

  return (
    <Container disableGutters>
      <Card sx={{ mx: "auto", maxWidth: 600 }}>
        <CardContent>
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Typography variant="h5">Paramètres</Typography>
          </Box>
          <Typography variant="body1">
            <p>Adresse de votre portefeuille: {account.address}</p>{" "}
          </Typography>
          <Typography variant="body1">
            Blockchain:{" "}
            <Select
              value={selectedChain}
              onChange={(e) => {
                const newChain = e.target.value as string;
                setSelectedChain(newChain);
                localStorage.setItem("selectedChain", newChain);
                // Reload the app to apply the new chain selection
                window.location.reload();
              }}
            >
              {availableChains.map((chain) => (
                <MenuItem key={chain.value} value={chain.value}>
                  {chain.label}
                </MenuItem>
              ))}
            </Select>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}

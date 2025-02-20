import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ProductEntry() {
  const [serialNumber, setSerialNumber] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Process form submission
    console.log("Serial:", serialNumber, "Order:", orderNumber);
    // Redirect after submission if needed
    navigate("/dashboard");
  };

  return (
    <Container disableGutters>
      <Card sx={{ mx: "auto", maxWidth: 600 }}>
        <CardContent>
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Ajouter un produit
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Numéro de série"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Numéro de commande"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                fullWidth
                margin="normal"
              />
              <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                Soumettre
              </Button>
            </form>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

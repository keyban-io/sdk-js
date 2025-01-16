import React from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Chip,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { useParams } from "react-router-dom";
import products from "../data/products.json";
import VerifiedIcon from "@mui/icons-material/Verified";
import BuildIcon from "@mui/icons-material/Build";
import UpdateIcon from "@mui/icons-material/Update";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import samsungWashingMachine from "../assets/Samsung WW80CGC04DTH washing machine.webp";
import lgRefrigerator from "../assets/LG GBV3100EPY Refrigerator.webp";
import boschOven from "../assets/Bosch HBA171BB3F integrated oven.webp";

const iconMap: { [key: string]: React.ReactNode } = {
  VerifiedIcon: <VerifiedIcon />,
  BuildIcon: <BuildIcon />,
  UpdateIcon: <UpdateIcon />,
  CheckCircleIcon: <CheckCircleIcon />,
};

const imageMap: { [key: string]: string } = {
  samsungWashingMachine,
  lgRefrigerator,
  boschOven,
};

export default function ProductDetails() {
  const { productId } = useParams();
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return <Typography variant="h6">Produit non trouvé</Typography>;
  }

  return (
    <Container maxWidth="sm" sx={{ py: 2, pb: 8 }}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          pb: 2,
        }}
      >
        <CardContent>
          <Box
            sx={{
              width: "100%",
              maxWidth: "100%",
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                flex: "1 0 auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "auto",
              }}
            >
              <img
                src={imageMap[product.imageKey]}
                alt={product.alt}
                style={{
                  maxWidth: "100%",
                  maxHeight: "auto",
                }}
              />
            </Box>
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Typography variant="h4" gutterBottom>
                TPP - {product.name}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Modèle : EcoBubble 2023
              </Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom>
                Statut : {product.status}
              </Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom>
                Date d’acquisition : {product.acquisitionDate}
              </Typography>
              <Typography variant="h5" gutterBottom>
                ✅ Bénéfices Associés :
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 1,
                  flexWrap: "wrap",
                  mt: 2,
                }}
              >
                {product.benefits.map((benefit, index) => (
                  <Chip
                    key={index}
                    icon={iconMap[benefit.icon]}
                    label={benefit.label}
                    color="primary"
                  />
                ))}
              </Box>
              <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
                🛠 Événements Récents :
              </Typography>
              <Box sx={{ mb: 3 }}>
                {product.additionalEvents?.map((event, index) => (
                  <Typography key={index} variant="body2" gutterBottom>
                    - {event.description} ({event.date})
                  </Typography>
                ))}
                <Button variant="text">[ Voir l’historique complet ]</Button>
              </Box>
              <Typography variant="h5" gutterBottom>
                🎯 Actions Disponibles :
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Button variant="contained" sx={{ mb: 1 }}>
                  Télécharger le certificat
                </Button>
                <Button variant="contained" sx={{ mb: 1 }}>
                  Signaler un problème
                </Button>
                <Button variant="contained" sx={{ mb: 1 }}>
                  Partager les informations du produit
                </Button>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

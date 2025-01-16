import { Typography, Container, Grid } from "@mui/material";
import productImage from "../assets/Samsung WW80CGC04DTH washing machine.webp";
import fridgeImage from "../assets/LG GBV3100EPY Refrigerator.webp";
import ovenImage from "../assets/Bosch HBA171BB3F integrated oven.webp";
import ProductCard from "../components/ProductCard";
import UpdateIcon from "@mui/icons-material/Update";
import VerifiedIcon from "@mui/icons-material/Verified";
import BuildIcon from "@mui/icons-material/Build";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function Dashboard() {
  return (
    <Container maxWidth="sm" sx={{ py: 2, pb: 8 }}>
      <Typography variant="h4" gutterBottom>
        Tableau de Bord | Weavenn x Keyban
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12}>
          <ProductCard
            image={productImage}
            alt="Lave-linge Samsung EcoBubble"
            name="Lave-linge Samsung EcoBubble"
            event="Inspection qualité réalisée"
            benefits={[
              { label: "Traçabilité", icon: <VerifiedIcon /> },
              { label: "Réparabilité", icon: <BuildIcon /> },
            ]}
            date="12/01/2025"
            additionalEvents={[
              {
                date: "10/01/2025",
                description: "Certificat de garantie mis à jour",
                icon: <UpdateIcon />,
              },
            ]}
            status="Reconditionné - Comme neuf"
            eventIcon={<CheckCircleIcon />}
          />
        </Grid>
      </Grid>

      <Typography variant="h5" gutterBottom>
        Mes Autres Appareils
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <ProductCard
            image={fridgeImage}
            alt="Réfrigérateur LG"
            name="Réfrigérateur LG"
            event="Maintenance recommandée"
            benefits={[{ label: "Traçabilité", icon: <VerifiedIcon /> }]}
            date="12/01/2025"
            eventIcon={<BuildIcon />}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ProductCard
            image={ovenImage}
            alt="Four Bosch"
            name="Four Bosch"
            event="Rappel émis"
            benefits={[{ label: "Recyclabilité", icon: <BuildIcon /> }]}
            date="12/01/2025"
            eventIcon={<BuildIcon />}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

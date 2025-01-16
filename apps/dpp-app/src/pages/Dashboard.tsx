import {
  Typography,
  Card,
  CardContent,
  Button,
  Container,
  Grid,
} from "@mui/material";
import productImage from "../assets/Samsung WW80CGC04DTH washing machine.webp";
import fridgeImage from "../assets/LG GBV3100EPY Refrigerator.webp";
import ovenImage from "../assets/Bosch HBA171BB3F integrated oven.webp";
import ProductCard from "../components/ProductCard";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import UpdateIcon from "@mui/icons-material/Update";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import VerifiedIcon from "@mui/icons-material/Verified";
import BuildIcon from "@mui/icons-material/Build";

export default function Dashboard() {
  return (
    <Container maxWidth="sm" sx={{ py: 2, pb: 8 }}>
      <Typography variant="h4" gutterBottom>
        Tableau de Bord | Weavenn x Keyban
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Mon Dernier Produit Acquis
              </Typography>
              <img
                src={productImage}
                alt="Lave-linge Samsung EcoBubble"
                style={{
                  width: "100%",
                  maxWidth: "200px",
                  height: "auto",
                  margin: "0 auto",
                  display: "block",
                }}
              />
              <Typography variant="h6" gutterBottom>
                Lave-linge Samsung EcoBubble
              </Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom>
                Reconditionné - Comme neuf
              </Typography>
              <Timeline>
                <TimelineItem>
                  <TimelineOppositeContent
                    sx={{ py: "20px" }}
                    align="right"
                    variant="body2"
                    color="text.secondary"
                  >
                    12/01/2025
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot color="primary">
                      <CheckCircleIcon />
                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: "16px" }}>
                    Inspection qualité réalisée
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineOppositeContent
                    sx={{ py: "20px" }}
                    align="right"
                    variant="body2"
                    color="text.secondary"
                  >
                    10/01/2025
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot color="secondary">
                      <UpdateIcon />
                    </TimelineDot>
                  </TimelineSeparator>
                  <TimelineContent>
                    Certificat de garantie mis à jour
                  </TimelineContent>
                </TimelineItem>
              </Timeline>
              <Typography variant="body2" gutterBottom>
                <strong>Bénéfices :</strong>
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 1,
                  flexWrap: "wrap",
                }}
              >
                <Chip
                  icon={<VerifiedIcon />}
                  label="Traçabilité"
                  color="primary"
                />
                <Chip
                  icon={<BuildIcon />}
                  label="Réparabilité"
                  color="secondary"
                />
              </Box>
              <Button variant="contained" sx={{ mt: 2 }}>
                Voir les détails
              </Button>
            </CardContent>
          </Card>
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
            benefit="Traçabilité"
            date="12/01/2025"
            benefitIcon={<VerifiedIcon />}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ProductCard
            image={ovenImage}
            alt="Four Bosch"
            name="Four Bosch"
            event="Rappel émis"
            benefit="Recyclabilité"
            date="12/01/2025"
            benefitIcon={<BuildIcon />}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

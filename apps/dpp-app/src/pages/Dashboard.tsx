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

export default function Dashboard() {
  return (
    <Container maxWidth="sm" sx={{ py: 2 }}>
      <Typography variant="h4" gutterBottom>
        Tableau de Bord | Weavenn x Keyban
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                🔥 Mon Dernier Produit Acquis
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
              <Typography variant="body2" gutterBottom>
                <strong>Événements :</strong>
              </Typography>
              <ul>
                <li>Inspection qualité réalisée (12/01/2025)</li>
                <li>Certificat de garantie mis à jour (10/01/2025)</li>
              </ul>
              <Typography variant="body2" gutterBottom>
                <strong>Bénéfices :</strong> ✅ Traçabilité | 🔧 Réparabilité
              </Typography>
              <Button variant="contained">Voir les détails</Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h5" gutterBottom>
        Mes Autres Appareils
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <img
                src={fridgeImage}
                alt="Réfrigérateur LG"
                style={{
                  width: "100%",
                  maxWidth: "100px",
                  height: "auto",
                  margin: "0 auto",
                  display: "block",
                }}
              />
              <Typography>Réfrigérateur LG</Typography>
              <Typography>
                Dernier Événement : Maintenance recommandée
              </Typography>
              <Typography>Bénéfice : ✅ Traçabilité</Typography>
              <Button variant="contained">Voir les détails</Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <img
                src={ovenImage}
                alt="Four Bosch"
                style={{
                  width: "100%",
                  maxWidth: "100px",
                  height: "auto",
                  margin: "0 auto",
                  display: "block",
                }}
              />
              <Typography>Four Bosch</Typography>
              <Typography>Dernier Événement : Rappel émis</Typography>
              <Typography>Bénéfice : ♻️ Recyclabilité</Typography>
              <Button variant="contained">Voir les détails</Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

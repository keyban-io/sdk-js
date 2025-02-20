import { useKeybanAccount } from "@keyban/sdk-react";
import { Container, Card, CardContent, Typography, Box } from "@mui/material";

export default function Settings() {
  const [account, accountError] = useKeybanAccount();
  if (accountError) throw accountError;

  return (
    <Container disableGutters>
      <Card sx={{ mx: "auto", maxWidth: 600 }}>
        <CardContent>
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Typography variant="h5">Paramètres</Typography>
          </Box>
          <Typography variant="body1">
            {/* ...content des paramètres... */}
            <p>Adresse de votre portefeuille: {account.address}</p>{" "}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}

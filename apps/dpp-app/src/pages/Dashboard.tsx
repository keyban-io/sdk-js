import {
  Typography,
  Container,
  Box,
  Card,
  CardContent,
  Stack,
  CircularProgress,
  Button,
} from "@mui/material";
import ProductCard from "../components/ProductCard";
import Grid2 from "@mui/material/Grid2";
import {
  useKeybanAccount,
  useKeybanAccountNfts,
  useKeybanClient,
  type KeybanNftBalance,
} from "@keyban/sdk-react";
import Product from "../models/Product";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";

// Fonction de hachage sha256
async function hashSHA256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default function Dashboard() {
  const [account, accountError] = useKeybanAccount();
  const [nfts, nftsError, { fetchMore, loading }] = useKeybanAccountNfts(
    account!,
    { first: 5 }
  );
  const keybanClient = useKeybanClient();

  // Nouveaux états pour la modal "Ajouter un tpp"
  const [modalOpen, setModalOpen] = useState(false);
  const [ean, setEan] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  // New state for showing progress indicator
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTPPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const concatenated = ean + serialNumber;
      const tppId = await hashSHA256(concatenated);
      const recipient = account?.address || "";
      const { transactionHash } = await keybanClient.tppClaim(tppId, recipient);
      console.log("Transaction hash:", transactionHash);
      setModalOpen(false);
      // Optionnel : déclencher un rafraîchissement des NFT ou afficher un message de succès
    } catch (error: any) {
      console.error("Erreur lors de tppClaim", error);
      setSubmissionError("Erreur lors de l'ajout du tpp");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (accountError) {
    return <div>Error fetching account: {accountError.message}</div>;
  }
  if (nftsError) {
    return <div>Error fetching NFTs: {nftsError.message}</div>;
  }

  if (!nfts) {
    return (
      <Stack
        sx={{
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
        <Typography variant="h6">Chargement...</Typography>
      </Stack>
    );
  }

  return (
    <Container disableGutters>
      {nfts.nodes.length === 0 ? (
        <Card sx={{ mx: "auto", maxWidth: 600, mt: 4 }}>
          <CardContent>
            <Box sx={{ textAlign: "center", mb: 2 }}>
              <Typography variant="h5">
                Oh là là, aucun produit n'est encore là !
              </Typography>
            </Box>
            <Button
              variant="contained"
              onClick={() => setModalOpen(true)}
              sx={{
                width: "100%",
                borderRadius: "16px",
                height: "56px",
              }}
            >
              Ajoutez votre produit et laissez la magie opérer !
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card sx={{ mx: "auto", maxWidth: 600 }}>
          <CardContent>
            <Box sx={{ textAlign: "center", mb: 2 }}>
              <Typography variant="h5">Mes Produits</Typography>
            </Box>

            <Grid2 container spacing={2} alignItems="stretch">
              {nfts.nodes.map((nft: KeybanNftBalance) => {
                return (
                  nft.nft && (
                    <Grid2
                      key={nft.id}
                      size={{ xs: 12, md: 6 }}
                      sx={{ display: "flex", flexDirection: "column" }}
                    >
                      {nft.nft.metadata &&
                      Object.keys(nft.nft.metadata).length === 0 ? (
                        <Card
                          sx={{
                            flex: 1,
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                            borderRadius: "16px",
                          }}
                        >
                          <CardContent
                            sx={{
                              background:
                                "linear-gradient(to right, #f0f0f0, #ffffff)",
                              textAlign: "center",
                            }}
                          >
                            <Box>
                              <Typography variant="body1">
                                {nft.nft.collection?.name ??
                                  "Unknown Collection"}
                              </Typography>
                              <Typography variant="body2">
                                Token ID: {nft.nft.tokenId}
                              </Typography>
                              <Typography variant="body2">
                                Contract ID: {nft.nft.collection?.id ?? "N/A"}
                              </Typography>
                            </Box>
                          </CardContent>
                        </Card>
                      ) : (
                        <ProductCard
                          product={new Product(nft.nft.metadata)}
                          tokenAddress={
                            (nft.nft.collection?.id ?? "0x") as `0x${string}`
                          }
                          tokenId={nft.nft.tokenId}
                          sx={{ flex: 1 }}
                        />
                      )}
                    </Grid2>
                  )
                );
              })}
            </Grid2>
            {nfts.hasNextPage && (
              <Button
                variant="outlined"
                onClick={fetchMore}
                disabled={loading}
                sx={{
                  mt: 2,
                  width: "100%",
                  borderRadius: "16px",
                  height: "56px",
                  backgroundColor: "var(--mui-palette-background-paper)",
                }}
              >
                {loading ? "Loading..." : "Load More"}
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle>Ajouter un TPP</DialogTitle>
        <form onSubmit={handleTPPSubmit}>
          <DialogContent>
            <TextField
              label="EAN"
              fullWidth
              margin="normal"
              value={ean}
              onChange={(e) => setEan(e.target.value)}
              disabled={isSubmitting}
            />
            <TextField
              label="Numéro de série"
              fullWidth
              margin="normal"
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
              disabled={isSubmitting}
            />
            {submissionError && (
              <Typography color="error" variant="body2">
                {submissionError}
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setModalOpen(false)} disabled={isSubmitting}>
              Annuler
            </Button>
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              {isSubmitting ? <CircularProgress size={24} /> : "Soumettre"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
}

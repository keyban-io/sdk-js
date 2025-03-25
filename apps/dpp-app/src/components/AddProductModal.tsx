import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useState } from "react";

import { useKeybanClient, useKeybanAccount } from "@keyban/sdk-react";

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AddProductModal({
  open,
  onClose,
}: AddProductModalProps) {
  const keybanClient = useKeybanClient();
  const [account] = useKeybanAccount();

  const [ean, setEan] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Local hash function
  function hashSHA256(message: string): Promise<string> {
    const msgBuffer = new TextEncoder().encode(message);
    return crypto.subtle.digest("SHA-256", msgBuffer).then((hashBuffer) => {
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionError(null);
    try {
      const concatenated = ean + serialNumber;
      const tppId = await hashSHA256(concatenated);
      const recipient = account?.address || "";
      const { transactionHash } = await keybanClient.tppClaim(tppId, recipient);
      console.log("Transaction hash:", transactionHash);
      // Reset fields after successful submit
      setEan("");
      setSerialNumber("");
      onClose();
    } catch (error: unknown) {
      console.error("Error submitting form", error);
      if (error == "Error: This TPP has already been claimed") {
        setSubmissionError(
          "Oups, ce produit est déjà attribué ! Avez-vous bien vérifié ?"
        );
      } else {
        setSubmissionError(`Erreur lors de l'ajout du tpp (${error})`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Ajouter un Produit</DialogTitle>
      <form onSubmit={handleSubmit}>
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
          <Button onClick={onClose} disabled={isSubmitting}>
            Annuler
          </Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? <CircularProgress size={24} /> : "Soumettre"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

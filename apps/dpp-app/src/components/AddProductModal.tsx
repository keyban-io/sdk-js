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

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (ean: string, serialNumber: string) => Promise<void>;
}

export default function AddProductModal({
  open,
  onClose,
  onSubmit,
}: AddProductModalProps) {
  const [ean, setEan] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionError(null);
    try {
      await onSubmit(ean, serialNumber);
      // Reset fields after successful submit
      setEan("");
      setSerialNumber("");
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

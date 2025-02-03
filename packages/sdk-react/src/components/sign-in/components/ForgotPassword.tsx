import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import OutlinedInput from "@mui/material/OutlinedInput";
import * as React from "react";

import { getDefaultLanguage } from "../../../utils/languageUtils";

interface ForgotPasswordProps {
  open: boolean;
  handleClose: () => void;
}

/**
 * A React component that renders a dialog for resetting a password.
 * @param props - The properties object.
 * @param props.open - A boolean indicating whether the dialog is open.
 * @param props.handleClose - A function to handle closing the dialog.
 * @param props.language - The language for the dialog content.
 * @returns The ForgotPassword component.
 * @example
 * <ForgotPassword open={isOpen} handleClose={handleCloseFunction} />
 */
export default function ForgotPassword({
  open,
  handleClose,
  language = getDefaultLanguage(),
}: ForgotPasswordProps & { language?: "en" | "fr" | "es" }) {
  const translations = {
    en: {
      title: "Reset password",
      description:
        "Enter your account's email address, and we'll send you a link to reset your password.",
      cancelLabel: "Cancel",
      continueLabel: "Continue",
      emailPlaceholder: "Email address",
    },
    fr: {
      title: "Réinitialiser le mot de passe",
      description:
        "Entrez l'adresse e-mail de votre compte et nous vous enverrons un lien pour réinitialiser votre mot de passe.",
      cancelLabel: "Annuler",
      continueLabel: "Continuer",
      emailPlaceholder: "Adresse e-mail",
    },
    es: {
      title: "Restablecer contraseña",
      description:
        "Ingresa el correo de tu cuenta y te enviaremos un enlace para restablecer tu contraseña.",
      cancelLabel: "Cancelar",
      continueLabel: "Continuar",
      emailPlaceholder: "Correo electrónico",
    },
  };

  const [t, setT] = React.useState(translations[language]);

  React.useEffect(() => {
    setT(translations[language]);
  }, [language]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          handleClose();
        },
        sx: { backgroundImage: "none" },
      }}
    >
      <DialogTitle>{t.title}</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
      >
        <DialogContentText>{t.description}</DialogContentText>
        <OutlinedInput
          autoFocus
          required
          margin="dense"
          id="email"
          name="email"
          label="Email address"
          placeholder={t.emailPlaceholder}
          type="email"
          fullWidth
        />
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose}>{t.cancelLabel}</Button>
        <Button variant="contained" type="submit">
          {t.continueLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

import "@fontsource/nunito/300.css";
import "@fontsource/nunito/400.css";
import "@fontsource/nunito/500.css";
import "@fontsource/nunito/700.css";
import "@fontsource/chivo/300.css";
import "@fontsource/chivo/400.css";
import "@fontsource/chivo/500.css";
import "@fontsource/chivo/700.css";

import { createTheme } from "@mui/material/styles";

const KeybanTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#07689f",
      light: "#a2d5f2",
      dark: "#283149",
    },
    secondary: {
      main: "#a2d5f2",
      dark: "#ffffff",
    },
    background: {
      default: "#edf1f4",
    },
    text: {
      primary: "#707070",
      secondary: "#07689F",
      disabled: "#707070",
    },
    error: {
      main: "#d32f2f",
    },
    warning: {
      main: "#ed6c02",
    },
    success: {
      main: "#2e7d32",
    },
    info: {
      main: "#07689f",
    },
  },
  typography: {
    // Réduction de la taille de police de base de 14px (par défaut) à 12px
    fontSize: 12,
    fontFamily: '"Nunito", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Chivo", "Helvetica", "Arial", sans-serif',
      // Vous pouvez ajuster les tailles spécifiques si nécessaire
      fontSize: "2rem", // Exemple de réduction
    },
    h2: {
      fontFamily: '"Chivo", "Helvetica", "Arial", sans-serif',
      fontSize: "1.75rem",
    },
    h3: {
      fontFamily: '"Chivo", "Helvetica", "Arial", sans-serif',
      fontSize: "1.5rem",
    },
    h4: {
      fontFamily: '"Chivo", "Helvetica", "Arial", sans-serif',
      fontSize: "1.25rem",
    },
    h5: {
      fontFamily: '"Chivo", "Helvetica", "Arial", sans-serif',
      fontSize: "1rem",
    },
    h6: {
      fontFamily: '"Chivo", "Helvetica", "Arial", sans-serif',
      fontSize: "0.875rem",
    },
    body1: {
      fontSize: "0.875rem",
    },
    body2: {
      fontSize: "0.75rem",
    },
    // Vous pouvez ajuster d'autres variantes si nécessaire
  },
});

export default KeybanTheme;

import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/700.css";
import "@fontsource/chivo/500.css";
import "@fontsource/chivo/700.css";

import { createTheme } from "@mui/material/styles";

const KeybanTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#183E5B',
      light: '#9DCFF4',
      dark: '#0a2435',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#EF9341',
      light: '#F2BC40',
      dark: '#BF7634',
      contrastText: '#ffffff',
    },
    background: {
      default: "#f4f4f4",
    },
    text: {
      primary: '#0a2435',
      secondary: '#0a2435',
      disabled: '#0a2435',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: '#EF9341', // Couleur de fond des boutons primaires
          color: '#ffffff',            // Texte en blanc
          '&:hover': {
            backgroundColor: '#d88e34', // Optionnel : Couleur au survol
          },
        },
        containedSecondary: {
          backgroundColor: '#9DCFF4', // Couleur de fond des boutons secondaires
          color: '#ffffff',            // Texte en blanc
          '&:hover': {
            backgroundColor: '#7AB8E3', // Couleur au survol des boutons secondaires (foncée de 10%)
          },
        },
      },
    },
  },
  typography: {
    // Réduction de la taille de police de base de 14px (par défaut) à 12px
    fontSize: 12,
    fontFamily: '"Inter"',
    h1: {
      fontFamily: '"Chivo"',
      // Vous pouvez ajuster les tailles spécifiques si nécessaire
      fontSize: "2rem", // Exemple de réduction
    },
    h2: {
      fontFamily: '"Chivo"',
      fontSize: "1.75rem",
    },
    h3: {
      fontFamily: '"Chivo"',
      fontSize: "1.5rem",
    },
    h4: {
      fontFamily: '"Chivo"',
      fontSize: "1.25rem",
    },
    h5: {
      fontFamily: '"Chivo"',
      fontSize: "1rem",
    },
    h6: {
      fontFamily: '"Chivo"',
      fontSize: "0.875rem",
    },
    body1: {
      fontSize: "0.875rem",
    },
    body2: {
      fontSize: "0.75rem",
    },
    subtitle1: {
      fontFamily: 'Chivo',
    },
    subtitle2: {
      fontFamily: 'Chivo',
    },
    },
});

export default KeybanTheme;

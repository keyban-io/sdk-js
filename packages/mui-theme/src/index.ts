// src/theme.ts
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/chivo/500.css";
import "@fontsource/chivo/700.css";

import { PaletteMode } from "@mui/material/styles";

// Palette de couleurs communes aux deux modes
const commonPalette = {
  typography: {
    fontFamily: '"Inter", sans-serif',
    h1: {
      fontFamily: '"Chivo", sans-serif',
      fontWeight: 700,
      fontSize: '2.5rem', // Adjusted size
    },
    h2: {
      fontFamily: '"Chivo", sans-serif',
      fontWeight: 700,
      fontSize: '2rem',
    },
    h3: {
      fontFamily: '"Chivo", sans-serif',
      fontWeight: 700,
      fontSize: '1.75rem',
    },
    h4: {
      fontFamily: '"Chivo", sans-serif',
      fontWeight: 700,
      fontSize: '1.5rem',
    },
    h5: {
      fontFamily: '"Chivo", sans-serif',
      fontWeight: 700,
      fontSize: '1.25rem',
    },
    h6: {
      fontFamily: '"Chivo", sans-serif',
      fontWeight: 700,
      fontSize: '1rem',
    },
    body1: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 400,
      fontSize: '0.875rem',
    },
    body2: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 400,
      fontSize: '0.75rem',
    },
    subtitle1: {
      fontFamily: '"Chivo", sans-serif',
      fontWeight: 500,
      fontSize: '0.875rem',
    },
    subtitle2: {
      fontFamily: '"Chivo", sans-serif',
      fontWeight: 500,
      fontSize: '0.75rem',
    },
  },
};

const commonComponents = {
  MuiButton: {
    styleOverrides: {
      containedPrimary: {
        backgroundColor: '#EF9341',
        color: '#ffffff',
        fontWeight: 'bold',
        '&:hover': {
          backgroundColor: '#d88e34',
        },
      },
      containedSecondary: {
        backgroundColor: '#9DCFF4',
        color: '#ffffff',
        fontWeight: 'bold',
        '&:hover': {
          backgroundColor: '#7AB8E3',
        },
      },
      outlinedPrimary: {
        borderColor: '#183E5B',
        color: '#183E5B',
        '&:hover': {
          borderColor: '#0a2435', // Variante plus foncée
          backgroundColor: 'rgba(24, 62, 91, 0.08)', // Légère coloration au survol
        },
      },
      outlinedSecondary: {
        borderColor: '#EF9341',
        color: '#EF9341',
        '&:hover': {
          borderColor: '#BF7634',
          backgroundColor: 'rgba(239,147,65, 0.08)',
        },
      },
      textPrimary: {
        color: '#183E5B',
        '&:hover': {
          backgroundColor: 'rgba(24, 62, 91, 0.08)',
        },
      },
      textSecondary: {
        color: '#EF9341',
        '&:hover': {
          backgroundColor: 'rgba(239,147,65, 0.08)',
        },
      },
    },
  },
};

// Thème Clair
const lightThemeOptions = {
  palette: {
    mode: 'light' as PaletteMode,
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
      paper: "#ffffff",
    },
    text: {
      primary: '#0a2435',
      secondary: '#0a2435',
      disabled: '#0a2435',
    },
  },
  components: commonComponents,
  typography: commonPalette.typography,
};

// Thème Sombre
const darkThemeOptions = {
  palette: {
    mode: 'dark' as PaletteMode,
    primary: {
      main: '#9DCFF4',
      light: '#E6F5FF',
      dark: '#2D669B',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#EF9341',
      light: '#F2BC40',
      dark: '#BF7634',
      contrastText: '#ffffff',
    },
    background: {
      default: "#0A2435",
      paper: "#0A2435",
    },
    text: {
      primary: '#ffffff',
      secondary: '#ffffff',
      disabled: '#ffffff',
    },
  },
  components: commonComponents,
  typography: commonPalette.typography,
};

export { lightThemeOptions, darkThemeOptions };

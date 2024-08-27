import '@fontsource/outfit/300.css';
import '@fontsource/outfit/400.css';
import '@fontsource/outfit/500.css';
import '@fontsource/outfit/700.css';

import React from 'react';

import ReactDOM from 'react-dom/client';

import App from '@/App.tsx';
import CssBaseline from '@mui/material/CssBaseline';
import {
  createTheme,
  ThemeProvider,
} from '@mui/material/styles';

// Créer un thème personnalisé avec la police "Outfit"
const theme = createTheme({
  typography: {
    fontFamily: '"Outfit", "Helvetica", "Arial", sans-serif',
  },
});

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </React.StrictMode>,
  );
}

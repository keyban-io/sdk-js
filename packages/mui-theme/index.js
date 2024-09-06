import '@fontsource/nunito/300.css';
import '@fontsource/nunito/400.css';
import '@fontsource/nunito/500.css';
import '@fontsource/nunito/700.css';
import '@fontsource/chivo/300.css';
import '@fontsource/chivo/400.css';
import '@fontsource/chivo/500.css';
import '@fontsource/chivo/700.css';

import { createTheme } from '@mui/material/styles';

const KeybanTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#07689f',
      light: '#a2d5f2',
      dark: '#283149',
    },
    secondary: {
      main: '#a2d5f2',
      dark: '#ffffff',
    },
    background: {
      default: '#edf1f4',
    },
    text: {
      primary: '#707070',
      secondary: '#07689F',
      disabled: '#707070',
    },
    error: {
      main: '#d32f2f',
    },
    warning: {
      main: '#ed6c02',
    },
    success: {
      main: '#2e7d32',
    },
    info: {
      main: '#07689f',
    },
  },
  typography: {
    fontFamily: '"Nunito", "Helvetica", "Arial", sans-serif', // Default font family for all text
    h1: {
      fontFamily: '"Chivo", "Helvetica", "Arial", sans-serif', // Titles (h1 to h6) will use Chivo
    },
    h2: {
      fontFamily: '"Chivo", "Helvetica", "Arial", sans-serif',
    },
    h3: {
      fontFamily: '"Chivo", "Helvetica", "Arial", sans-serif',
    },
    h4: {
      fontFamily: '"Chivo", "Helvetica", "Arial", sans-serif',
    },
    h5: {
      fontFamily: '"Chivo", "Helvetica", "Arial", sans-serif',
    },
    h6: {
      fontFamily: '"Chivo", "Helvetica", "Arial", sans-serif',
    },
    code: {
      fontSize: '95%',
    }
  }
});

export default KeybanTheme;

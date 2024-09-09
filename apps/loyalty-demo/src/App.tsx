import { AppRouter } from '@/lib/router';
import KeybanTheme from '@keyban/mui-theme';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

export default function App() {
  return (
    <ThemeProvider theme={KeybanTheme}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>
  );
}

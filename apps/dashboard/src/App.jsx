import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { darkThemeOptions } from "@keyban/mui-theme";

function App() {
  return (
    <ThemeProvider theme={darkThemeOptions}>
      <CssBaseline />
      {/* Votre code ici */}
    </ThemeProvider>
  );
}

export default App;

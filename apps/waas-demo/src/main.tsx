import React from "react";

import ReactDOM from "react-dom/client";

import App from "@/App.tsx";
import config from "@/config";
import { Auth0Provider } from "@auth0/auth0-react";
import KeybanTheme from "@keyban/mui-theme";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ThemeProvider theme={KeybanTheme}>
        <CssBaseline />
        <Auth0Provider {...config.auth}>
          <App />
        </Auth0Provider>
        ,
      </ThemeProvider>
    </React.StrictMode>,
  );
}

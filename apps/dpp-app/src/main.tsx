import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import theme from "./theme";
import { BrowserRouter } from "react-router-dom";
import { KeybanProvider } from "@keyban/sdk-react";
import keybanConfig from "./config";
import AppWithNav from "./components/AppWithNav";
import Header from "./components/Header";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <KeybanProvider
        apiUrl={keybanConfig.apiUrl}
        appId={keybanConfig.appId}
        chain={keybanConfig.chain}
        clientShareProvider={keybanConfig.clientShareProvider}
      >
        <BrowserRouter>
          <Header />
          <AppWithNav />
        </BrowserRouter>
      </KeybanProvider>
    </ThemeProvider>
  </React.StrictMode>,
);

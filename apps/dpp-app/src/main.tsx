import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import theme from "./theme";
import { BrowserRouter } from "react-router-dom";
import { KeybanProvider } from "@keyban/sdk-react";
import keybanConfig from "./config";
import AppWithNav from "./components/AppWithNav";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorBoundaryFallback } from "./components/ErrorBoundaryFallback";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <KeybanProvider
          apiUrl={keybanConfig.apiUrl}
          appId={keybanConfig.appId}
          chain={keybanConfig.chain}
          clientShareProvider={keybanConfig.clientShareProvider}
        >
          <BrowserRouter>
            <AppWithNav />
          </BrowserRouter>
        </KeybanProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);

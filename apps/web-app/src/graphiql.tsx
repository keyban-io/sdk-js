import React from "react";
import ReactDOM from "react-dom/client";
import { GraphiQL } from "graphiql";
import { createGraphiQLFetcher } from "@graphiql/toolkit";

import "graphiql/graphiql.css";
import "./graphiql.css";

import TextField from "@/components/molecules/TextField";

// eslint-disable-next-line react-refresh/only-export-components
function App() {
  const [apiUrl, setApiUrl] = React.useState(
    "https://subql.keyban.localtest.me",
  );

  const fetcher = React.useMemo(() => {
    const httpUrl = new URL(apiUrl);

    const wsUrl = new URL(httpUrl);
    wsUrl.protocol = "wss";

    return createGraphiQLFetcher({
      url: httpUrl.toString(),
      subscriptionUrl: wsUrl.toString(),
    });
  }, [apiUrl]);

  return (
    <>
      <div style={{ paddingInline: 16, paddingBlockStart: 8 }}>
        <TextField label="API URL" value={apiUrl} onChange={setApiUrl} />
      </div>
      <GraphiQL fetcher={fetcher} />
    </>
  );
}

const rootElement = document.getElementById("graphiql");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}

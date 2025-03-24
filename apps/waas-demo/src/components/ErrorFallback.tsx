import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, AlertTitle, IconButton, Typography } from "@mui/material";
import type { FallbackProps } from "react-error-boundary";

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const isNetworkError = error.message
    .toLowerCase()
    .includes("failed to fetch");

  return (
    <Alert
      severity="error"
      action={
        <IconButton
          color="inherit"
          onClick={resetErrorBoundary}
          size="small"
          title="Try again"
        >
          <FontAwesomeIcon icon={faRefresh} style={{ width: "1em" }} />
        </IconButton>
      }
    >
      <AlertTitle>Something went wrong</AlertTitle>
      {isNetworkError && (
        <Typography variant="body2" sx={{ mb: 2 }}>
          The selected blockchain is not available. Please select another.
        </Typography>
      )}
      <p>{error.message}</p>
      <pre>{error.stack}</pre>
    </Alert>
  );
}

import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, AlertTitle, IconButton } from "@mui/material";
import type { FallbackProps } from "react-error-boundary";

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
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
      <p>{error.message}</p>
      <pre>{error.stack}</pre>
    </Alert>
  );
}

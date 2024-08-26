import { FallbackProps } from "react-error-boundary";
import { Alert, AlertTitle, IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";

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

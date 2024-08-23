import { useErrorBoundary } from "react-error-boundary";
import styled from "@emotion/styled";

const ErrorContainer = styled.div`
  background-color: var(--container-background-color);
  color: var(--text-color);
  padding: var(--padding);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  font-family: var(--font-family);
  max-width: 900px;
  margin: 0 auto; /* Center the container */
`;

const ErrorMessage = styled.pre`
  color: var(--error-color);
  white-space: pre-wrap; /* Ensures long lines wrap and maintain whitespace */
  word-wrap: break-word; /* Breaks words that are too long to fit within the container */
`;

const RetryButton = styled.button`
  background-color: var(--primary);
  color: white;
  padding: var(--padding);
  border-radius: var(--border-radius);
  border: none;
  cursor: pointer;
  &:hover {
    background-color: var(--primary-hover-color);
  }
`;

export function ErrorFallback({ error }: { error: Error }) {
  const { resetBoundary } = useErrorBoundary();

  return (
    <ErrorContainer role="alert">
      <p>Something went wrong:</p>
      <ErrorMessage>{error.message}</ErrorMessage>
      <RetryButton onClick={resetBoundary}>Try again</RetryButton>
    </ErrorContainer>
  );
}

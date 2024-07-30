export const getErrorMessage = (error: unknown): string => {
  if (typeof error === "object" && error !== null) {
    return JSON.stringify(error, null, 2);
  }
  return (error as Error).message
    ? (error as Error).message
    : (error as Error).toString();
};

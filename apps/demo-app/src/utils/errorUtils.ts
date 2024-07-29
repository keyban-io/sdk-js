// sdk/apps/demo-app/src/utils/errorUtils.ts
export const getErrorMessage = (error: unknown): string => {
  if (typeof error === 'object' && error !== null) {
    return JSON.stringify(error);
  }
  return (error as Error).message ? (error as Error).message : (error as Error).toString();
};

/**
 * Enum representing possible server error types.
 *
 * - 'NetworkFailureEdDSAKeyGeneration': A network failure occurred between the two phases of the generation of the master key. The server has logged a timeout failure.
 * - 'Unauthorized': Server was unable to authorize your request and rejected it. Check if the API key is correclty set up.
 */
export type ServerError = 'NetworkFailureEdDSAKeyGeneration' | 'Unauthorized';

export const parseServerError = (errorType: `${string}:${ServerError}`) => {
  if (errorType.endsWith('Unauthorized')) {
    return 'Server was unable to authorize your request and rejected it. Check if the API key is correclty set up.';
  }

  if (errorType.endsWith('NetworkFailureEdDSAKeyGeneration')) {
    return 'A network failure occurred between the two phases of the generation of the master key. The server has logged a timeout failure.';
  }

  return 'Unkown error';
};

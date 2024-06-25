export type ServerError = 'SeverNotResponing' | 'Unauthorized';

export const parseServerError = (errorType: `${string}:${ServerError}`) => {
  if (errorType.endsWith('SeverNotResponing')) {
    return 'Server not responding';
  }

  if (errorType.endsWith('Unauthorized')) {
    return 'Server was unable to authorize your request and rejected it. Check if the API key is correclty set up.';
  }

  return 'Unkown error';
};

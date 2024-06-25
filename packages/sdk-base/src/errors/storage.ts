export type StorageError = 'ConnectionError' | 'MissingShare' | 'SaveFailed';

export const parseStorageError = (errorType: `${string}:${StorageError}`) => {
  if (errorType.endsWith('ConnectionError')) {
    return 'SDK was unable to connect to your storage solution';
  }

  if (errorType.endsWith('MissingShare')) {
    return 'Share under provided key ID is empty or invalid';
  }

  if (errorType.endsWith('SaveFailed')) {
    return 'SDK encontered an error when trying to save your share into storage';
  }

  return 'Unkown error';
};

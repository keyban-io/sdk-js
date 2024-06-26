/**
 * Enum representing possible storage error types.
 *
 * - 'ConnectionError': SDK was unable to connect to your storage solution.
 * - 'RetrievalFailed': Retrival of the share from storage failed ungracefully. Storage provider might be implement incorrectly.
 * - 'SaveFailed': SDK encontered an error when trying to save your share into storage.
 */
export type StorageError = 'ConnectionError' | 'RetrivalFailed' | 'SaveFailed';

export const parseStorageError = (errorType: `${string}:${StorageError}`) => {
  if (errorType.endsWith('ConnectionError')) {
    return 'SDK was unable to connect to your storage solution.';
  }

  if (errorType.endsWith('RetrivalFailed')) {
    return 'Retrival of the share from storage failed ungracefully. Storage provider might be implement incorrectly.';
  }

  if (errorType.endsWith('SaveFailed')) {
    return 'SDK encontered an error when trying to save your share into storage.';
  }

  return 'Unknown error';
};

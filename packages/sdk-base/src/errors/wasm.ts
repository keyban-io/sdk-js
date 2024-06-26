/**
 * Enum representing possible WASM error types.
 *
 * - 'DkgFailed': Indicates that the Distributed Key Generation (DKG) process has failed.
 *   DKG is a cryptographic process used to securely generate a shared secret key among multiple parties without
 *   any single party knowing the entire key. A failure in this process could indicate issues in communication,
 *   protocol implementation, or security breaches.
 *
 * - 'SignatureFailed': Suggests that a digital signature operation has failed. Digital signatures are used to
 *   verify the authenticity and integrity of a message, software, or digital document. A failure in signature
 *   verification or generation could indicate problems such as incorrect keys, corrupted data, or an issue with
 *   the cryptographic algorithms being used.
 */
export type WasmErrors = 'DkgFailed' | 'SignatureFailed';

export const parseWasmError = (errorType: `${string}:${WasmErrors}`) => {
  if (errorType.endsWith('DkgFailed')) {
    return 'Dkg failed for some reason';
  }

  return 'Unkown error';
};

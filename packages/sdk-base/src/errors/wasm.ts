export type WasmErrors = 'DkgFailed' | 'SignatureFailed';

export const parseWasmError = (errorType: `${string}:${WasmErrors}`) => {
  if (errorType.endsWith('DkgFailed')) {
    return 'Dkg failed for some reason';
  }

  return 'Unkown error';
};

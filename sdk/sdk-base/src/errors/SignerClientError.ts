export enum SignerClientErrors {
  CLIENT_NOT_INITIALIZED = "CLIENT_NOT_INITIALIZED",
  FAILED_TO_SAVE_TO_STORE = "FAILED_TO_SAVE_TO_STORE",
  FAILED_TO_READ_FROM_STORE = "FAILED_TO_READ_FROM_STORE",
}
export class SignerClientError extends Error {
  nativeError;
  constructor(code: SignerClientErrors, nativeError?: unknown) {
    super(code);
    this.name = "SignerClientError";
    this.stack = new Error().stack;
    this.nativeError = nativeError;
  }
}

export default SignerClientError;

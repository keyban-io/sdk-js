export enum EddsaClientErrors {
  CANNOT_PERFORM_ACTION_WITHOUT_ACCOUNT = "CANNOT_PERFORM_ACTION_WITHOUT_ACCOUNT",
}
class SignerClientError extends Error {
  constructor(code: EddsaClientErrors) {
    super(code);
    this.name = "SignerClientError";
    this.stack = new Error().stack;
  }
}

export default SignerClientError;

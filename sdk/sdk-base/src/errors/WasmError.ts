export enum WasmErrors {
  WASM_NOT_INITIALIZED = "WASM_NOT_INITIALIZED",
}

/**
 * @group errors
 * Error class for WASM related errors.
 */
export class WasmError extends Error {
  constructor(code: WasmErrors) {
    super(code);
    this.name = "WasmError";
    this.stack = new Error().stack;
  }
}

export default WasmError;

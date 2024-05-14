export type WasmErrorTypes = "OFFLINE";

class WasmError extends Error {
  constructor(code: WasmErrorTypes) {
    super(code);
    this.name = "WasmError";
    this.stack = new Error().stack;
  }
}

export default WasmError;

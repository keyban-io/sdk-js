import initSync, { type InitOutput } from "eddsa-wasm-client";

const initWasm = async (): Promise<InitOutput> => {
  try {
    const response = await initSync();
    return response;
  } catch (e) {
    console.error("Error loading WASM:", e);
    throw e;
  }
};
export { initWasm };

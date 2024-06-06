import initWasmFile, { add, dkg } from 'eddsa-wasm-client';
import type { WasmApi } from '~/eddsa';

const initWasm = async (): Promise<WasmApi> => {
  await initWasmFile();
  return {
    add: (...args) => Promise.resolve(add(...args)),
    dkg: dkg as WasmApi['dkg'],
  };
};
export { initWasm };

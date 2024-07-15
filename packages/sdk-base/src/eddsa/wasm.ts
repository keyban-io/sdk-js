import initWasmFile, { add, dkg, sign } from 'eddsa-wasm-client';
import type { WasmApi } from '~/eddsa';

const initEddsaWasm = async (): Promise<WasmApi> => {
  await initWasmFile();
  return {
    add: (...args) => Promise.resolve(add(...args)),
    signMessage: sign,
    dkg: dkg as WasmApi['dkg'],
  };
};
export { initEddsaWasm };

import initWasmFile, { add, dkg, sign } from 'eddsa-wasm-client';
import type { EddsaWasmApi } from '~/eddsa';

const initEddsaWasm = async (): Promise<EddsaWasmApi> => {
  await initWasmFile();
  return {
    add: (...args) => Promise.resolve(add(...args)),
    signMessage: sign,
    dkg: dkg as EddsaWasmApi['dkg'],
  };
};
export { initEddsaWasm };

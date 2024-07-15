import initWasmFile from 'ecdsa-wasm-client';
import type { WasmApi } from '~/eddsa';

const initEcdsaWasm = async (): Promise<WasmApi> => {
  await initWasmFile();
  // ts-ignore
  const ecdsa = (window as any).ecdsa;
  return {
    add: (...args) => Promise.resolve(Math.max(...args)),
    signMessage: ecdsa.sign,
    dkg: ecdsa.dkg as WasmApi['dkg'],
  };
};
export { initEcdsaWasm };

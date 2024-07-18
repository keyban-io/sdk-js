import initWasmFile from 'ecdsa-wasm-client';
import type { EcdsaWasmApi } from './ecdsa.types';

const initEcdsaWasm = async (): Promise<EcdsaWasmApi> => {
  await initWasmFile();
  // ts-ignore
  const ecdsa = (window as any).ecdsa;
  return {
    add: (...args) => Promise.resolve(Math.max(...args)),
    signMessage: ecdsa.sign,
    dkg: ecdsa.dkg as EcdsaWasmApi['dkg'],
  };
};
export { initEcdsaWasm };

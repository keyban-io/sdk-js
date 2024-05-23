import * as process from 'node:process';

const readEnv = (key: string, required?: boolean) => {
  const env = process.env[key];

  if (required && !env) {
    throw new Error(`Missing required ${key} env variable`);
  }

  return env;
};

export const wasmBinaryEndpoint = readEnv('WASM_BINARY_ENDPOINT');

// const readEnv = (key: string, required?: boolean) => {
//   const env = process.env[key];
//
//   if (required && !env) {
//     throw new Error(`Missing required ${key} env variable`);
//   }
//
//   return env;
// };

// export const wasmBinaryEndpoint = readEnv("WASM_BINARY_ENDPOINT");

// todo figure out the way to read .env in both web and native, plus keyban.local is not working
export const backendEndpoint = "http://localhost:3000"; //readEnv("BACKEND_URL");

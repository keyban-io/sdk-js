export type Hex = string;

// All return types should be a promise, even it wasm methods are sync
// the reason is that react native will promisify them anyway

export type WasmApi = {
  signMessage: (address: string, payload: string) => Promise<Hex>;
  generateKeypair: () => Promise<unknown>;
  add: (n1: number, n2: number) => Promise<number>;
};

export type StorageProviderApi = {
  save: (key: string, payload: string) => Promise<boolean>;
  get: (key: string) => Promise<string | undefined>;
};

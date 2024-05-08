export type Hex = string;

export type WasmApi = {
  signMessage: (address: string, payload: string) => Hex;
  generateKeypair: () => unknown;
  add: (n1: number, n2: number) => number;
};

export type StorageProviderApi = {
  save: (key: string, payload: string) => Promise<boolean>;
  get: (key: string) => Promise<string>;
};

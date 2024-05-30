export type Hex = string;

// All return types should be a promise, even it wasm methods are sync
// the reason is that react native will promisify them anyway
export type WasmApi = {
  signMessage: (secret: SecretShare, payload: string) => Promise<Hex>;
  generateKeypair: () => Promise<ClientShare>;
  add: (n1: number, n2: number) => Promise<number>;
  dkg: (n1: number, n2: number) => Promise<number>;
};

export type StorageProviderApi = {
  save: (key: string, payload: string) => Promise<boolean>;
  get: (key: string) => Promise<string | undefined>;
};

export type ClientShare = {
  secretShare: SecretShare;
  publicShare: PublicShare;
  publicServerKey: string;
};

export type SecretShare = Uint8Array;

export type PublicShare = {
  key: string;
};

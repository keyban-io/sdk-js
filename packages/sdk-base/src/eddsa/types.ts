export type Hex = string;

// All return types should be a promise, even it wasm methods are sync
// the reason is that react native will promisify them anyway
export type WasmApi = {
  // signMessage: (secret: SecretShare, payload: string) => Promise<Hex>;
  dkg: (keyId: string) => Promise<ClientShare>;
  add: (n1: number, n2: number) => Promise<number>;
};

export type StorageProviderApi = {
  save: (key: string, payload: string) => Promise<boolean>;
  get: (key: string) => Promise<string | undefined>;
};

export type ClientShare = {
  secretShare: SecretShare;
  client_pubkey: string;
  server_pubkey: string;
};

export type SecretShare = Uint8Array;

// export type PublicShare = {
//   key: string;
// };

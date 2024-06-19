export type Hex = string;

// All return types should be a promise, even it wasm methods are sync
// the reason is that react native will promisify them anyway
export type WasmApi = {
  // signMessage: (secret: SecretShare, payload: string) => Promise<Hex>;
  dkg: (keyId: string) => Promise<ClientShare>;
  add: (n1: number, n2: number) => Promise<number>;
};

export type StorageProviderApi = {
  save: (
    key: string,
    share: ClientShare,
    password?: string,
  ) => Promise<boolean>;
  get: (key: string, password?: string) => Promise<ClientShare | undefined>;
};

export type ClientShare = {
  secret_share: SecretShare;
  client_pubkey: string;
  server_pubkey: string;
  keyId: string;
};

export type SecretShare = {
  keypair: string;
  version: string;
};

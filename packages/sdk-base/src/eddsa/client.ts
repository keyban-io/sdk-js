import { healthCheck } from '~/api/apiClient';
import SignerClientError, {
  SignerClientErrors,
} from '~/errors/SignerClientError';
import { EddsaAccount } from './account';
import type { ClientShare, StorageProviderApi, WasmApi } from './types';

/**
 * Client class for EDDSA Hedera connectivity and general logic.
 */
class EddsaClient {
  /** Interface offering the WebAssembly Rust logic following {@link WasmApi} */
  wasmApi;

  /**
   * The constructor of the `EddsaClient` class.
   * @param wasmApi - The source of the WebAssembly Rust logic, for web is plain WebAssembly object, for react-native it required bridger
   */
  constructor(wasmApi: WasmApi) {
    this.wasmApi = wasmApi;
  }

  /**
   * Function for EDDSA account creation
   * @param keyId - TBA
   * @param storageProvider - Any storage provider following {@link StorageProviderApi}. For web, it can be local storage, for native AsyncStorage.
   * @returns Instance of {@link EddsaAccount}
   */
  async createAccount(
    keyId: string,
    storageProvider: StorageProviderApi,
  ): Promise<EddsaAccount> {
    // 1. Generate account with WASM
    const { server_pubkey, client_pubkey } = await this.wasmApi.dkg(keyId);
    // 2. Save client share to provided storage
    const savedSharesString = await storageProvider.get('keyban-eddsa');
    const savedShares = JSON.parse(savedSharesString || '[]') as ClientShare[];
    savedShares.push({
      client_pubkey,
      server_pubkey,
      secretShare: new Uint8Array(),
    });
    await storageProvider
      .save('keyban-eddsa', JSON.stringify(savedShares))
      .catch((e) => {
        throw new SignerClientError(
          SignerClientErrors.FAILED_TO_SAVE_TO_STORE,
          e,
        );
      });
    // 3. return Account instance
    return new EddsaAccount(
      {
        client_pubkey,
        server_pubkey,
        secretShare: new Uint8Array(),
      },
      this.wasmApi,
    );
  }

  /**
   * Function for retrieving EDDSA accounts from provided storage
   * @param storageProvider - Any storage provider following {@link StorageProviderApi}. For web, it can be local storage, for native AsyncStorage.
   * @returns Array of {@link EddsaAccount}
   */
  async getSaveAccounts(
    storageProvider: StorageProviderApi,
  ): Promise<EddsaAccount[]> {
    // 3. Get all client shares for storage
    const savedSharesString = await storageProvider
      .get('keyban-eddsa')
      .catch((e) => {
        throw new SignerClientError(
          SignerClientErrors.FAILED_TO_READ_FROM_STORE,
          e,
        );
      });
    const savedShares = JSON.parse(savedSharesString ?? '[]') as ClientShare[];
    // 4. Return Account instances
    return savedShares.map(
      (clientShare) => new EddsaAccount(clientShare, this.wasmApi),
    );
  }

  async healthCheck(): Promise<'operational' | 'down'> {
    try {
      const res = await healthCheck();
      if (res.ok) {
        return 'operational';
      }

      return 'down';
    } catch (e) {
      console.error('Failed to perform health check', e);
      return 'down';
    }
  }

  /**
   * Function for setting up chain metadata
   */
  async setChainMetadata() {
    /**/
  }

  /**
   * Function for connecting to chain provider
   */
  async connectToProvider() {
    /**/
  }
}

export { type StorageProviderApi, type WasmApi, EddsaClient };

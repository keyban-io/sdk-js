import { healthCheck } from '~/api/apiClient';
import SignerClientError, {
  SignerClientErrors,
} from '~/errors/SignerClientError';
import { EddsaAccount } from './account';
import type { StorageProviderApi, WasmApi } from './types';

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
   * Function for initialization of EDDSA Account instance.
   * @param storageProvider - Any storage provider following {@link StorageProviderApi}. For web, it can be local storage, for native AsyncStorage.
   * @returns Instance of {@link EddsaAccount}
   */
  async initialize(
    storageProvider: StorageProviderApi,
    keyId: string,
  ): Promise<EddsaAccount> {
    let savedShare = await storageProvider.get(keyId);

    if (!savedShare) {
      const dkgResult = await this.wasmApi.dkg(keyId);

      savedShare = {
        ...dkgResult,
        keyId,
      };
    }

    await storageProvider.save(keyId, savedShare).catch((e) => {
      throw new SignerClientError(
        SignerClientErrors.FAILED_TO_SAVE_TO_STORE,
        e,
      );
    });
    // 3. return Account instance
    return new EddsaAccount(savedShare, this.wasmApi, storageProvider);
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

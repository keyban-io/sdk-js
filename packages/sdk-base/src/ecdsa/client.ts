import { healthCheck } from '~/api/apiClient';
import { StorageError } from '..';
import { EddsaAccount } from '../eddsa/account';
import type { StorageProviderApi, WasmApi } from '../eddsa/types';

/**
 * Client class for EcDSA algorithm connectivity and general logic across multiple blockchains.
 *
 * The EcDSA algorithm is supported by several blockchains, including:
 * - N/A
 *
 * This client provides a generic interface to interact with the EcDSA algorithm on any compatible blockchain.
 */
class EcdsaClient {
  /** Interface offering the WebAssembly Rust logic following {@link WasmApi} */
  public wasmApi: WasmApi;

  /**
   * The constructor of the `EcdsaClient` class.
   * @param wasmApi - The source of the WebAssembly Rust logic. For web, it is a plain WebAssembly object. For react-native, a bridger is required.
   */
  constructor(wasmApi: WasmApi) {
    this.wasmApi = wasmApi;
  }

  /**
   * Initializes an EcDSA Account instance.
   * @param storageProvider - Any storage provider following {@link StorageProviderApi}. For web, it can be local storage; for native, AsyncStorage.
   * @param keyId - The key identifier used for storing and retrieving shares.
   * @returns Instance of {@link EcdsaAccount}
   */
  async initialize(
    storageProvider: StorageProviderApi,
    keyId: string,
  ): Promise<EddsaAccount> {
    let savedShare = await storageProvider.get(keyId).catch((e) => {
      throw new StorageError(
        StorageError.types.RetrivalFailed,
        'EcdsaClient.initialize',
        e,
      );
    });

    if (!savedShare) {
      const dkgResult = await this.wasmApi.dkg(keyId);

      savedShare = {
        ...dkgResult,
        keyId,
      };
    }

    await storageProvider.save(keyId, savedShare).catch((e) => {
      throw new StorageError(
        StorageError.types.SaveFailed,
        'EcdsaClient.initialize',
        e,
      );
    });

    return new EddsaAccount(savedShare, this.wasmApi, storageProvider);
  }

  /**
   * Performs a health check to determine the operational status.
   * @returns A promise that resolves to either 'operational' or 'down' based on the health check result.
   */
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
   * Function for setting up chain metadata.
   * This is a placeholder method and has not been implemented yet.
   */
  async setChainMetadata() {
    /**/
  }

  /**
   * Function for connecting to chain provider.
   * This is a placeholder method and has not been implemented yet.
   */
  async connectToProvider() {
    /**/
  }
}

export { type StorageProviderApi, type WasmApi, EcdsaClient };

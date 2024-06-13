import { describe, expect, it } from 'vitest';
import { EddsaClient, type WasmApi } from '~/eddsa/client';
import SignerClientError, {
  SignerClientErrors,
} from '~/errors/SignerClientError';
import { initWasm } from '~/wasm';
import type { ClientShare } from './types';

describe('EDDSA Client', () => {
  describe('Empty storage behaviour', async () => {
    const storage = {
      get: (_: string) => Promise.resolve(undefined),
      save: (_: string, _1: unknown) => Promise.resolve(true),
    };

    it('Should throw error when saving account', async () => {
      const wasmApi = await initWasm();

      const client = new EddsaClient(wasmApi as unknown as WasmApi);
      const error = await client
        .initialize({
          ...storage,
          save: (_: string, _1: ClientShare) => Promise.reject(false),
        })
        .catch((e) => e);
      expect(error instanceof SignerClientError).toEqual(true);
      expect(error.message).toEqual(SignerClientErrors.FAILED_TO_SAVE_TO_STORE);
    });
  });
});

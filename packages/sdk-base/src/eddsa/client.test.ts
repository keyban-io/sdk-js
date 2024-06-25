import { describe, expect, it } from 'vitest';
import { EddsaClient, type WasmApi } from '~/eddsa/client';
import { initWasm } from '~/wasm';
import { KeybanError, type KeybanErrorTypes } from '..';
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
        .initialize(
          {
            ...storage,
            save: (_: string, _1: ClientShare) => Promise.reject(false),
          },
          'test-key-id',
        )
        .catch((e) => e);
      expect(error instanceof KeybanError).toEqual(true);
      expect(error.type).toEqual('StorageError:SaveFailed' as KeybanErrorTypes);
    });
  });
});

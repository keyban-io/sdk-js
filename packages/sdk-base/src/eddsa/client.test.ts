import { describe, expect, it } from 'vitest';
import { EddsaClient, type WasmApi } from '~/eddsa/client';
import { StorageError } from '..';
import type { ClientShare } from './types';
import { initEddsaWasm } from './wasm';

describe('EDDSA Client', () => {
  describe('Empty storage behaviour', async () => {
    const storage = {
      get: (_: string) => Promise.resolve(undefined),
      save: (_: string, _1: unknown) => Promise.resolve(true),
    };

    it('Should throw error when saving account', async () => {
      const wasmApi = await initEddsaWasm();

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
      expect(error instanceof StorageError).toEqual(true);
      expect(error.title).toEqual(StorageError.types.SaveFailed);
    });
  });
});

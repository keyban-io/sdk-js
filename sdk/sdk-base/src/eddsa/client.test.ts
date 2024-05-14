import { describe, expect, it } from "vitest";
import { EddsaClient, type WasmApi } from "~/eddsa/client";
import { getWasmBuffer } from "~/wasm";
import SignerClientError, {
  EddsaClientErrors,
} from "~/errors/SignerClientError";

describe("EDDSA Client", () => {
  describe("Empty storage behaviour", async () => {
    const storage = {
      get: (_: string) => Promise.resolve(undefined),
      save: (_: string, _1: unknown) => Promise.resolve(true),
    };
    const wasmBuffer = await getWasmBuffer();
    const wasmApi = await WebAssembly.instantiate(wasmBuffer);
    const client = new EddsaClient(
      wasmApi.instance.exports as WasmApi,
      storage
    );

    it("Should throw error", async () => {
      const error = await client.sign({}).catch((e) => e);
      expect(error instanceof SignerClientError).toEqual(true);
      expect(error.message).toEqual(
        EddsaClientErrors.CANNOT_PERFORM_ACTION_WITHOUT_ACCOUNT
      );
    });
  });
});

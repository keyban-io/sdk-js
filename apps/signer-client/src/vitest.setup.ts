import { vi } from "vitest";

// Mock ecdsa wasm module
vi.mock("@keyban/ecdsa-wasm-client", () => {
  globalThis.ecdsa = {
    dkg: vi.fn(async () => "CLIENT_SHARE"),
    sign: vi.fn(async () => "0xSIGNED_HASH" as const),
    publicKey: vi.fn(async () => "0xPUBLIC_KEY" as const),
  };

  return { default: async () => {} };
});

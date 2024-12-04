import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, vi } from "vitest";

export const server = setupServer();

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

// Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());

// Mock ecdsa wasm module
vi.mock("@keyban/ecdsa-wasm-client", () => {
  globalThis.ecdsa = {
    dkg: vi.fn(async () => "CLIENT_SHARE"),
    sign: vi.fn(async () => "0xSIGNED_HASH" as const),
    publicKey: vi.fn(async () => "0xPUBLIC_KEY" as const),
  };

  return { default: async () => {} };
});

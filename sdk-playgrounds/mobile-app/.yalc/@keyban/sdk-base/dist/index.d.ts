/**
 * Adds two numbers
 * @param a - The first input number
 * @param b - The second input number
 * @returns The sum of the two input numbers
 * @example add(1, 2) // 3
 */
declare function add(a: number, b: number): number;
/**
 * Subtracts two numbers
 * @param a - The first input number
 * @param b - The second input number
 * @returns The difference of the two input numbers
 * @example subtract(2, 1) // 1
 */
declare function subtract(a: number, b: number): number;

type Hex = string;
type WasmApi = {
    signMessage: (address: string, payload: string) => Promise<Hex>;
    generateKeypair: () => Promise<unknown>;
    add: (n1: number, n2: number) => Promise<number>;
};
type StorageProviderApi = {
    save: (key: string, payload: string) => Promise<boolean>;
    get: (key: string) => Promise<string>;
};

declare class EddsaClient {
    wasmApi: WasmApi;
    storageProvider: StorageProviderApi;
    clientKeyShare: string | null;
    constructor(wasmApi: WasmApi, storageProvider: StorageProviderApi);
    initialize(): Promise<"initialized-empty" | "initialized-with-key">;
    sign(payload: Record<string, unknown>): Promise<string>;
    prepareWasmPayload(payload: Record<string, unknown>): string;
    createKeypair(): Promise<void>;
    add(num1: number, num2: number): Promise<number>;
}

declare const getWasmBuffer: () => Promise<ArrayBuffer>;

declare function generateUUID(): string;

declare const hexToU8a: (hex: string) => Uint8Array;
declare const u8aToHex: (uint8Array: Uint8Array) => string;

export { EddsaClient, type StorageProviderApi, type WasmApi, add, generateUUID, getWasmBuffer, hexToU8a, subtract, u8aToHex };

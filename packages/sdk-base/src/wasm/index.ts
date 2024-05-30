// import {
//   initSync as initWasm,
//   type InitOutput as WasmInstance,
// } from "eddsa-wasm-client";
// import wasm from "./";
import type { WasmApi } from "~/eddsa";
import wasm from "./eddsa_wasm_client_bg.wasm";
// const fetchWasmBuffer = async () =>
//   Uint8Array.from([
//     0x00, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00, 0x01, 0x87, 0x80, 0x80,
//     0x80, 0x00, 0x01, 0x60, 0x02, 0x7f, 0x7f, 0x01, 0x7f, 0x03, 0x82, 0x80,
//     0x80, 0x80, 0x00, 0x01, 0x00, 0x07, 0x87, 0x80, 0x80, 0x80, 0x00, 0x01,
//     0x03, 0x61, 0x64, 0x64, 0x00, 0x00, 0x0a, 0x8d, 0x80, 0x80, 0x80, 0x00,
//     0x01, 0x87, 0x80, 0x80, 0x80, 0x00, 0x00, 0x20, 0x00, 0x20, 0x01, 0x6a,
//     0x0b,
//   ]);

const initWasm = async (): Promise<WasmApi> => {
  try {
    // Construct the URL to the WASM file
    const route = new URL("./eddsa_wasm_client_bg.wasm", import.meta.url);
    console.log("WASM URL:", route.toString(), wasm);

    // Fetch the WASM file
    const response = await fetch(route.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/wasm",
      },
    });
    console.log("Fetch response:", response);

    // Do something with the total

    // Check the Content-Type header
    const contentType = response.headers.get("Content-Type");
    if (
      !response.ok ||
      !contentType ||
      !contentType.includes("application/wasm")
    ) {
      throw new Error(
        `Failed to load WASM file. Status: ${response.status}, Content-Type: ${contentType}`
      );
    }

    // Read the response as an ArrayBuffer
    const bytes = await response.arrayBuffer();
    console.log("WASM bytes length:", bytes.byteLength);

    // Instantiate the WebAssembly module
    const wasmModule = await WebAssembly.instantiate(bytes);
    return wasmModule.instance.exports as WasmApi;
  } catch (e) {
    console.error("Error loading WASM:", e);
    throw e;
  }
};
export { initWasm };

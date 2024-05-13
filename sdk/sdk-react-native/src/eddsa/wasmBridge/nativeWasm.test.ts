import { describe, expect, it, beforeAll } from "vitest";
import { NativeWasm } from "./nativeWasm";
import { WasmInvoker } from "./wasmInvoker";
import { getWasmBuffer, type WasmApi } from "@keyban/sdk-base";
import EventEmitter from "node:events";

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

// Listener for the event

describe("Native bridge", () => {
  let nativeWasm: NativeWasm;
  let wasmInvoker: WasmInvoker;
  beforeAll(async () => {
    const bufferSrc = await getWasmBuffer();
    const module = await WebAssembly.instantiate(bufferSrc);
    wasmInvoker = new WasmInvoker(module.instance.exports as WasmApi); // on webview
    nativeWasm = new NativeWasm(
      (
        { data, type } // on react-native
      ) => myEmitter.emit("nativeMessage", { type, data })
    );

    myEmitter.on("webMessage", (message: { type: string; data: string }) => {
      console.log("Received message from web:", message);
      nativeWasm.receiveMessage(message.data);
    });
    myEmitter.on(
      "nativeMessage",
      async (message: { type: string; data: string }) => {
        console.log("Received message from native:", message);
        if (message.type === "add") {
          const result = await wasmInvoker.add(message.data as string);
          myEmitter.emit("webMessage", { type: "add", data: result });
        }
      }
    );

    // Emitting an event
    myEmitter.emit("event", "Hello, world!");
  });

  it("Add fucntion", async () => {
    const res = await nativeWasm.add(3, 3);
    expect(3 + 3).toEqual(res);
  });
});

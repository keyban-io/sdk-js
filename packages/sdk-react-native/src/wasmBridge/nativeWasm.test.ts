import EventEmitter from "node:events";
import { type WasmApi, initWasm } from "@keyban/sdk-base";
import { beforeAll, describe, expect, it } from "vitest";
import { NativeWasm } from "./nativeWasm";
import { WasmInvoker } from "./wasmInvoker";

class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

describe("Native bridge", () => {
  let nativeWasm: NativeWasm;
  let wasmInvoker: WasmInvoker;
  beforeAll(async () => {
    const wasmApi = await initWasm();
    // const module = await WebAssembly.instantiate(bufferSrc);
    wasmInvoker = new WasmInvoker(wasmApi as unknown as WasmApi); // on webview
    nativeWasm = new NativeWasm(
      (
        { data, type } // on react-native
      ) => myEmitter.emit("nativeToWebView", { type, data })
    );

    myEmitter.on(
      "webViewToNative",
      (message: { type: string; data: string }) => {
        console.log("Received message from web:", message);
        nativeWasm.receiveMessage(message.data);
      }
    );
    myEmitter.on(
      "nativeToWebView",
      async (message: { type: string; data: string }) => {
        console.log("Received message from native:", message);
        switch (message.type as keyof WasmApi) {
          case "add": {
            const result = await wasmInvoker.add(message.data as string);
            myEmitter.emit("webViewToNative", { type: "add", data: result });
            break;
          }
          case "dkg": {
            const result = await wasmInvoker.dkg(message.data as string);
            myEmitter.emit("webViewToNative", {
              type: "generateKeypair",
              data: result,
            });
            break;
          }
          // case "signMessage": {
          //   const result = await wasmInvoker.signMessage(
          //     message.data as string
          //   );
          //   myEmitter.emit("webViewToNative", {
          //     type: "signMessage",
          //     data: result,
          //   });
          //   break;
          // }
        }
      }
    );
  });

  it("Add", async () => {
    const res = await nativeWasm.add(3, 3);
    expect(3 + 3).toEqual(res);
  });

  it("DKG", async () => {
    const clientShare = await nativeWasm.dkg();
    expect(clientShare.client_pubkey).toBeDefined();
    expect(clientShare.secretShare).toBeDefined();
    expect(clientShare.server_pubkey).toBeDefined();
  });
});

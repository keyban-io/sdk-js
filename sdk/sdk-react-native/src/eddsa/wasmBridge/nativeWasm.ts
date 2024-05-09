import { generateUUID } from "@keyban/sdk-base";
import type { WasmApi } from "@keyban/sdk-base";
import { EddsaAddRequest } from "../../../compiled";

type PromiseResolveFn = (data: string) => void;
type EmitFn = (params: { type: keyof WasmApi; data: string }) => void;

export class NativeWasm implements WasmApi {
  promiseMap = new Map<string, PromiseResolveFn>();
  emitFn: EmitFn | null = null;
  constructor(emitFn: (params: { type: string; data: string }) => void) {
    this.promiseMap = new Map<string, PromiseResolveFn>();
    this.emitFn = emitFn;
  }

  signMessage = (_: string, _1: string): Promise<string> => {
    return Promise.resolve("");
  };

  generateKeypair = (): Promise<unknown> => {
    return Promise.resolve("");
  };

  async add(num1: number, num2: number): Promise<number> {
    this.ensureEmitFn();
    const callId = generateUUID(); // this should be random uuid
    const uaPayload = EddsaAddRequest.encode({
      callId,
      num1,
      num2,
    }).finish();

    const resultString = await this.promisifyMessage(() => {
      this.emitFn?.({
        type: "add",
        data: Buffer.from(uaPayload).toString("hex"),
      });
    }, callId);

    console.log("NativeWasm received: ", resultString);

    return JSON.parse(resultString).result;
  }

  // UTILS

  ensureEmitFn() {
    if (!this.emitFn) {
      throw new Error("critical: missing emmit function");
    }

    return true;
  }
  receiveMessage(messageString: string) {
    const { id } = JSON.parse(messageString);
    const resFn = this.promiseMap.get(id);

    if (!resFn) return;
    this.promiseMap.delete(id);

    resFn(messageString);
  }

  promisifyMessage(callback: () => void, callId: string): Promise<string> {
    return new Promise((res, rej) => {
      callback();
      this.promiseMap.set(callId, res);

      // timeout after 10seconds
      setTimeout(rej, 10_000);
    });
  }
}

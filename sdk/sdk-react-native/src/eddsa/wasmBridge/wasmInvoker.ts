import type { WasmApi } from "@keyban/sdk-base";
import { EddsaAddRequest, EddsaAddResponse } from "~/../compiled";

export class WasmInvoker {
  wasmApi;

  constructor(wasmApi: WasmApi) {
    this.wasmApi = wasmApi;
  }

  async add(protoPayload: string) {
    const eddsaAddRequest = EddsaAddRequest.decode(
      Buffer.from(protoPayload, "hex")
    );
    const sum = await this.wasmApi.add(
      eddsaAddRequest.num1,
      eddsaAddRequest.num2
    );

    const responseProto = EddsaAddResponse.encode({
      sum,
      callId: eddsaAddRequest.callId,
    }).finish();
    return Buffer.from(responseProto).toString("hex");
  }
}

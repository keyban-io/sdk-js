import { hexToU8a, u8aToHex, type WasmApi } from "@keyban/sdk-base";
import {
  EddsaAddRequest,
  EddsaAddResponse,
  GenericMessage,
} from "~/../compiled";
import { Buffer } from "buffer/";

if (!global.Buffer) {
  global.Buffer = Buffer as typeof global.Buffer;
}

export class WasmInvoker {
  wasmApi;

  constructor(wasmApi: WasmApi) {
    this.wasmApi = wasmApi;
  }

  async add(protoPayload: string) {
    const { callId, payload } = GenericMessage.decode(hexToU8a(protoPayload));
    const { num1, num2 } = EddsaAddRequest.decode(hexToU8a(payload));
    const sum = await this.wasmApi.add(num1, num2);

    const responseBytes = EddsaAddResponse.encode({
      sum,
    }).finish();

    return this.prepareGenericMessage(callId, u8aToHex(responseBytes));
  }

  prepareGenericMessage(callId: string, payload: string) {
    const arrayBufferMessage = GenericMessage.encode({
      callId,
      payload,
    }).finish();
    return u8aToHex(arrayBufferMessage);
  }
}

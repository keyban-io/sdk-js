import { type WasmApi, hexToU8a, u8aToHex } from '@keyban/sdk-base';
import {
  EddsaAddRequest,
  EddsaAddResponse,
  EddsaDkgResponse,
  EddsaSignMessageRequest,
  EddsaSignMessageResponse,
  GenericMessage,
} from '~/proto_compiled';

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

  async dkg(protoPayload: string) {
    const { callId } = GenericMessage.decode(hexToU8a(protoPayload));
    const { secretShare, server_pubkey, client_pubkey } =
      await this.wasmApi.dkg('keyid');

    const responseBytes = EddsaDkgResponse.encode({
      secretShare: secretShare,
      serverPubkey: server_pubkey,
      clientPubkey: client_pubkey,
    }).finish();
    return this.prepareGenericMessage(callId, u8aToHex(responseBytes));
  }
  async signMessage(protoPayload: string) {
    const { callId, payload } = GenericMessage.decode(hexToU8a(protoPayload));
    // const { payload: signaturePayload, secretShare } =
    EddsaSignMessageRequest.decode(hexToU8a(payload));

    const signature = 'signature';
    // await this.wasmApi.signMessage(
    // secretShare,
    // signaturePayload
    // );

    const responseBytes = EddsaSignMessageResponse.encode({
      signature,
    }).finish();

    return this.prepareGenericMessage(callId, u8aToHex(responseBytes));
  }

  private prepareGenericMessage(callId: string, payload: string) {
    const arrayBufferMessage = GenericMessage.encode({
      callId,
      payload,
    }).finish();
    return u8aToHex(arrayBufferMessage);
  }
}

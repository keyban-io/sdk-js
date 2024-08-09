import { type WasmApi, u8aToHex } from '@keyban/sdk-base';
import {
  EddsaDkgResponse,
  EddsaSignMessageRequest,
  EddsaSignMessageResponse,
  GenericMessage,
} from '~/proto_compiled';
import { hexToU8a } from '~/utils/hex';

if (!global.Buffer) {
  global.Buffer = Buffer as typeof global.Buffer;
}

export class WasmInvoker {
  wasmApi;

  constructor(wasmApi: WasmApi) {
    this.wasmApi = wasmApi;
  }

  async dkg(protoPayload: string) {
    const { callId } = GenericMessage.decode(hexToU8a(protoPayload));
    const { secret_share, server_pubkey, client_pubkey } =
      await this.wasmApi.dkg('keyid');

    const responseBytes = EddsaDkgResponse.encode({
      secretShare: secret_share,
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

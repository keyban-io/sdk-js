import {
  type ClientShare,
  type Hex,
  type SecretShare,
  type WasmApi,
  generateUUID,
  hexToU8a,
  u8aToHex,
} from '@keyban/sdk-base';
import {
  EddsaAddRequest,
  EddsaAddResponse,
  EddsaDkgResponse,
  EddsaSignMessageRequest,
  EddsaSignMessageResponse,
  GenericMessage,
} from '~/proto_compiled';

type PromiseResolveFn = (data: string) => void;
type EmitFn = (params: { type: keyof WasmApi; data: string }) => void;

export class NativeWasm implements WasmApi {
  private promiseMap = new Map<string, PromiseResolveFn>();
  private emitFn: EmitFn | null = null;
  constructor(emitFn: (params: { type: string; data: string }) => void) {
    this.promiseMap = new Map<string, PromiseResolveFn>();
    this.emitFn = emitFn;
  }

  async add(num1: number, num2: number): Promise<number> {
    this.ensureEmitFn();
    const callId = generateUUID(); // this should be random uuid
    const addPayload = EddsaAddRequest.encode({
      num1,
      num2,
    }).finish();

    const resultString = await this.promisifyMessage(() => {
      this.emitFn?.({
        type: 'add',
        data: this.prepareGenericMessage(callId, u8aToHex(addPayload)),
      });
    }, callId);

    const decodedResult = EddsaAddResponse.decode(hexToU8a(resultString));

    return decodedResult.sum;
  }

  // UTILS

  private ensureEmitFn() {
    if (!this.emitFn) {
      throw new Error('critical: missing emmit function');
    }

    return true;
  }
  receiveMessage(messageHex: string) {
    const decodedGenericMessage = GenericMessage.decode(hexToU8a(messageHex));
    const { callId, payload } = decodedGenericMessage;
    const resFn = this.promiseMap.get(callId);

    if (!resFn) return;
    this.promiseMap.delete(callId);

    resFn(payload);
  }

  private prepareGenericMessage(callId: string, payload: string) {
    const arrayBufferMessage = GenericMessage.encode({
      callId,
      payload,
    }).finish();
    return u8aToHex(arrayBufferMessage);
  }

  private promisifyMessage(
    callback: () => void,
    callId: string,
  ): Promise<string> {
    return new Promise((res, rej) => {
      callback();
      this.promiseMap.set(callId, res);

      // timeout after 10seconds
      setTimeout(rej, 10_000);
    });
  }

  async dkg(): Promise<ClientShare> {
    this.ensureEmitFn();
    const callId = generateUUID(); // this should be random uuid
    const resultString = await this.promisifyMessage(() => {
      this.emitFn?.({
        type: 'dkg',
        data: this.prepareGenericMessage(callId, ''),
      });
    }, callId);

    const response = EddsaDkgResponse.decode(hexToU8a(resultString));

    return {
      server_pubkey: response.serverPubkey,
      client_pubkey: response.clientPubkey,
      secretShare: response.secretShare,
    };
  }

  async signMessage(secret: SecretShare, payload: string): Promise<Hex> {
    this.ensureEmitFn();
    const callId = generateUUID(); // this should be random uuid

    const addPayload = EddsaSignMessageRequest.encode({
      secretShare: secret,
      payload,
    }).finish();

    const resultString = await this.promisifyMessage(() => {
      this.emitFn?.({
        type: 'dkg',
        data: this.prepareGenericMessage(callId, u8aToHex(addPayload)),
      });
    }, callId);

    const decodedResult = EddsaSignMessageResponse.decode(
      hexToU8a(resultString),
    );

    return decodedResult.signature;
  }
}

import { generateUUID, hexToU8a, u8aToHex } from '@keyban/sdk-base';
import type { WasmApi } from '@keyban/sdk-base';
import {
	EddsaAddRequest,
	EddsaAddResponse,
	GenericMessage,
} from '~/../compiled';

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
		return Promise.resolve('');
	};

	generateKeypair = (): Promise<unknown> => {
		return Promise.resolve('');
	};

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

	ensureEmitFn() {
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

	prepareGenericMessage(callId: string, payload: string) {
		const arrayBufferMessage = GenericMessage.encode({
			callId,
			payload,
		}).finish();
		return u8aToHex(arrayBufferMessage);
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

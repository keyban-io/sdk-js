import { describe, expect, it } from 'vitest';

import { hexToU8a, u8aToHex } from './hex';

const helloStringBytes = new Uint8Array([104, 101, 108, 108, 111]);
const helloStringHex = '68656c6c6f';
const helloString = 'hello';

describe('Hex utils', () => {
	it('U8A to Hex', () => {
		const bufferHex = Buffer.from(helloString).toString('hex');
		const utilsHex = u8aToHex(helloStringBytes);

		expect(bufferHex).toEqual(utilsHex);
	});

	it('Hex to U8A', () => {
		const utilsU8A = hexToU8a(helloStringHex);

		expect(helloStringBytes.toString()).toEqual(utilsU8A.toString());
	});
});

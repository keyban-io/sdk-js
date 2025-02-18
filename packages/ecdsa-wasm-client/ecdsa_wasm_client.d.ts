declare module "@keyban/ecdsa-wasm-client";

declare global {
  // eslint-disable-next-line no-var
  var ecdsa: {
    dkg(
      apiUrl: string,
      queryParams: string,
      appId: string,
      accessToken: string,
    ): Promise<string>;
    sign(
      apiUrl: string,
      appId: string,
      accessToken: string,
      clientShare: string,
      message: string,
    ): Promise<`0x${string}`>;
    publicKey(clientShare: string): Promise<`0x${string}`>;
  };
}

export default function initWasm(): Promise<void>;

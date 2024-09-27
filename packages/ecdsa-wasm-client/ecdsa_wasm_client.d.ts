declare module "@keyban/ecdsa-wasm-client";

declare global {
  var ecdsa: {
    dkg(apiUrl: string, appId: string, accessToken: string): Promise<string>;
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

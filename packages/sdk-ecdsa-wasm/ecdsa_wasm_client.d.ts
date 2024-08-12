declare module "ecdsa-wasm-client";

export declare global {
  var ecdsa: {
    dkg(keyId: string): Promise<string>;
    sign(
      keyId: string,
      clientShare: string,
      message: string,
    ): Promise<`0x${string}`>;
    publicKey(clientShare: string): Promise<`0x${string}`>;
  };
}

export default function initWasm(): Promise<void>;

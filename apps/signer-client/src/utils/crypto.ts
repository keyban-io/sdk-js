import "core-js/actual/typed-array/from-hex";
import "core-js/actual/typed-array/to-hex";

import { CryptoError } from "~/errors/CryptoError";

const ALGORITHM: AesKeyGenParams = {
  name: "AES-GCM", // AES-GCM is recommended for authenticated encryption
  length: 256, // Key length (128, 192, or 256 bits)
};

export type EncryptedData = {
  iv: string;
  cipher: string;
};

export async function generateKey() {
  const key = await crypto.subtle
    .generateKey(
      ALGORITHM,
      true, // Whether the key is extractable (can be exported)
      ["encrypt", "decrypt"], // Key usages
    )
    .catch((err: Error) => {
      throw new CryptoError(
        CryptoError.types.GenerateKey,
        "generateKey.generateKey",
        err,
      );
    });

  return crypto.subtle.exportKey("jwk", key).catch((err: Error) => {
    throw new CryptoError(
      CryptoError.types.ExportKey,
      "generateKey.exportKey",
      err,
    );
  });
}

export async function encrypt(
  key: JsonWebKey,
  data: string,
): Promise<EncryptedData> {
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const encryptedData = await crypto.subtle
    .encrypt(
      { ...ALGORITHM, iv },
      await importKey(key, ["encrypt"]),
      new TextEncoder().encode(data),
    )
    .catch((err: Error) => {
      throw new CryptoError(CryptoError.types.Encrypt, "encrypt.encrypt", err);
    });

  return {
    // @ts-expect-error: Uint8Array.prototype.toHex is polyfilled by core-js
    iv: new Uint8Array(iv).toHex(),
    // @ts-expect-error: Uint8Array.prototype.toHex is polyfilled by core-js
    cipher: new Uint8Array(encryptedData).toHex(),
  };
}

export async function decrypt(key: JsonWebKey, { iv, cipher }: EncryptedData) {
  const decrypted = await crypto.subtle
    .decrypt(
      {
        ...ALGORITHM,
        // @ts-expect-error: Uint8Array.fromHex is polyfilled by core-js
        iv: Uint8Array.fromHex(iv),
      },
      await importKey(key, ["decrypt"]),
      // @ts-expect-error: Uint8Array.fromHex is polyfilled by core-js
      Uint8Array.fromHex(cipher),
    )
    .catch((err: Error) => {
      throw new CryptoError(CryptoError.types.Decrypt, "decrypt.decrypt", err);
    });

  return new TextDecoder().decode(decrypted);
}

function importKey(key: JsonWebKey, usages: ReadonlyArray<KeyUsage>) {
  return crypto.subtle
    .importKey("jwk", key, ALGORITHM, false, usages)
    .catch((err: Error) => {
      throw new CryptoError(
        CryptoError.types.ImportKey,
        "decrypt.importKey",
        err,
      );
    });
}

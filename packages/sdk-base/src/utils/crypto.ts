import "core-js/actual/typed-array/from-hex";
import "core-js/actual/typed-array/to-hex";

import { CryptoError } from "~/errors";

/**
 * Key generation parameters for the AES-GCM algorithm.
 *
 * - **name**: The name of the algorithm used, here AES-GCM, which is recommended for authenticated encryption.
 * - **length**: The length of the key in bits. AES-GCM supports key lengths of 128, 192, or 256 bits.
 *   - **128 bits**: Offers a good balance between security and performance.
 *   - **192 bits**: Provides a higher level of security.
 *   - **256 bits**: Offers the highest level of security.
 */
const ALGORITHM: AesKeyGenParams = {
  name: "AES-GCM",
  length: 256, // Key length in bits (128, 192, or 256)
};

/**
 * Type representing the encrypted data.
 *
 * - **iv**: Initialization Vector used for encryption.
 *   - Size: 96 bits (12 bytes), which is standard for AES-GCM.
 * - **cipher**: Ciphertext resulting from the encryption process.
 *   - Size: Variable, depends on the size of the input data.
 */
export type EncryptedData = {
  iv: string;
  cipher: string;
};

/**
 * Generates a cryptographic key and exports it in JSON Web Key (JWK) format.
 *
 * This function uses the AES-GCM (Advanced Encryption Standard - Galois/Counter Mode) algorithm,
 * which provides authenticated encryption. AES-GCM ensures both the confidentiality and integrity
 * of the data by combining AES encryption with Galois/Counter Mode for authentication.
 *
 * **Size Details:**
 * - **Key**: 256 bits (32 bytes) in this case, offering a high level of security.
 * @returns A promise that resolves to the generated key in JWK format.
 * @throws {CryptoError} Throws a CryptoError if key generation or export fails.
 */
export async function generateKey() {
  const key = await crypto.subtle
    .generateKey(
      ALGORITHM,
      true, // Indicates whether the key is extractable (can be exported)
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

/**
 * Encrypts the given data using the provided JsonWebKey.
 *
 * **Size Details:**
 * - **IV (Initialization Vector)**: 96 bits (12 bytes), standard for AES-GCM.
 * - **Key**: Must match the length specified during generation (here 256 bits).
 * - **Data**: Variable size depending on the data to be encrypted.
 * @param key - The key to use for encryption.
 * @param data - The data to encrypt.
 * @returns A promise that resolves to the encrypted data, including the initialization vector (iv) and the ciphertext.
 * @throws {CryptoError} Throws an error if encryption fails.
 */
export async function encrypt(
  key: JsonWebKey,
  data: string,
): Promise<EncryptedData> {
  const iv = crypto.getRandomValues(new Uint8Array(12)); // IV of 12 bytes (96 bits)

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

/**
 * Decrypts the given encrypted data using the provided key.
 *
 * **Size Details:**
 * - **IV (Initialization Vector)**: Must be 96 bits (12 bytes) for AES-GCM.
 * - **Key**: Must match the length specified during generation (here 256 bits).
 * - **Ciphertext**: Variable size depending on the encrypted data.
 * @param key - The JsonWebKey used for decryption.
 * @param data - The encrypted data containing the initialization vector (iv) and the ciphertext.
 * @returns A promise that resolves to the decrypted text.
 * @throws {CryptoError} If decryption fails.
 */
export async function decrypt(key: JsonWebKey, data: EncryptedData) {
  const { iv, cipher } = data;
  const decrypted = await crypto.subtle
    .decrypt(
      {
        ...ALGORITHM,
        // @ts-expect-error: Uint8Array.prototype.toHex is polyfilled by core-js

        iv: Uint8Array.fromHex(iv), // Converts the hexadecimal IV to Uint8Array
      },
      await importKey(key, ["decrypt"]),
      // @ts-expect-error: Uint8Array.prototype.toHex is polyfilled by core-js
      Uint8Array.fromHex(cipher), // Converts the hexadecimal ciphertext to Uint8Array
    )
    .catch((err: Error) => {
      throw new CryptoError(CryptoError.types.Decrypt, "decrypt.decrypt", err);
    });

  return new TextDecoder().decode(decrypted);
}

/**
 * Imports a JSON Web Key (JWK) into a CryptoKey object.
 *
 * **Size Details:**
 * - **Imported Key**: Must match the length specified in the algorithm parameters (here 256 bits).
 * @param key - The JSON Web Key to import.
 * @param usages - An array of key usages indicating what can be done with the key.
 * @returns A promise that resolves to the imported CryptoKey object.
 * @throws {CryptoError} Throws a CryptoError if the key import fails.
 * @private
 */
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

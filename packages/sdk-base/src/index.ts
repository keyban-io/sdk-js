export {
  EstimateERC20TransferParams,
  EstimateNftTransferParams,
  FeesEstimation,
  KeybanAccount,
  TransactionOptions,
  TransferERC20Params,
  TransferNftParams,
} from "~/account";
export { KeybanApiStatus } from "~/api";
export { FeesUnit, KeybanChain, NativeCurrency } from "~/chains";
export {
  ClientShareProvider,
  KeybanClient,
  KeybanClientConfig,
} from "~/client";
export { KeybanClientShareProvider } from "~/clientShareProvider";
export { KeybanBaseError, SdkError, SdkErrorTypes } from "~/errors";
export type {
  GqlwalletTokenBalancesQuery,
  GqlKeybanClient_AssetTransferFragment as KeybanAssetTransfer,
  GqlKeybanClient_NftBalanceFragment as KeybanNftBalance,
  GqlKeybanClient_TokenContractFragment as KeybanToken,
  GqlKeybanClient_TokenBalanceFragment as KeybanTokenBalance,
} from "~/graphql";
export * from "~/utils";

/**
 * Represents an Ethereum address in hexadecimal format.
 * @remarks
 * An Ethereum address is a 42-character string that uniquely identifies an account on the Ethereum blockchain.
 * It consists of the prefix `"0x"` followed by 40 hexadecimal characters (digits 0-9 and letters a-f).
 * Ethereum addresses are case-insensitive, but it is recommended to use the checksum address format
 * (mix of uppercase and lowercase letters) for better error detection.
 *
 * **Format:**
 * - **Prefix:** Must start with `"0x"`.
 * - **Length:** Total of 42 characters (including the `"0x"` prefix).
 * - **Characters:** The following 40 characters should be valid hexadecimal digits (`0-9`, `a-f`, `A-F`).
 * - **Example without checksum:** `"0x742d35cc6634c0532925a3b844bc454e4438f44e"`
 * - **Example with checksum:**  `"0x742d35Cc6634C0532925a3b844Bc454e4438f44e"`
 *
 * **Usage:**
 * This type alias enforces that any variable of type `Address` must be a string that adheres to the Ethereum address format.
 * It is used throughout the SDK to represent addresses in a type-safe manner, reducing errors related to address handling.
 */
export type Address = `0x${string}`;

/**
 * Represents a cryptographic hash value in hexadecimal format.
 * @remarks
 * A `Hash` is typically a 66-character hexadecimal string used to uniquely identify
 * transactions, blocks, or other data in the blockchain. It is the result of a hash
 * function (like SHA-256 or Keccak-256) applied to some data.
 *
 * **Format:**
 * - **Prefix:** Must start with `"0x"`.
 * - **Length:** Usually 66 characters (including the `"0x"` prefix), representing 32 bytes of data.
 * - **Characters:** The following characters should be valid hexadecimal digits (`0-9`, `a-f`, `A-F`).
 * - **Example:** `"0x5e1d3a76f95b1f9ed1e7f8e0e9a2b2e4b6d4c8d5e3a7b9f1c2d3e4f5a6b7c8d9"`
 *
 * **Usage:**
 * The `Hash` type alias ensures that any variable representing a hash value conforms to the expected format.
 * Hashes are used throughout blockchain operations to reference specific transactions, blocks, or data.
 *
 * **Common Use Cases:**
 * - **Transaction Hashes:** Identifying specific transactions on the blockchain.
 * - **Block Hashes:** Referencing specific blocks in the blockchain.
 * - **Data Integrity Checks:** Verifying that data has not been tampered with by comparing hash values.
 */
export type Hash = `0x${string}`;

/**
 * Represents a hexadecimal value in blockchain-related contexts.
 * @remarks
 * The `Hex` type is a string that starts with the `"0x"` prefix, followed by a sequence of hexadecimal characters.
 * It is commonly used to represent various types of data in hexadecimal format, such as public keys, signed messages,
 * transaction data, and more. The length of the hexadecimal string can vary depending on what it represents.
 *
 * **Format:**
 * - **Prefix:** Must start with `"0x"`.
 * - **Characters:** The characters following the prefix should be valid hexadecimal digits (`0-9`, `a-f`, `A-F`).
 * - **Length:** Variable length, depending on the data being represented.
 * - **Examples:**
 *   - **Public Key (uncompressed):** Typically 130 characters (representing 65 bytes).
 *     - Example: `"0x04bfcab42e267cde6bf56789237f24e63bb1b2c4a7a2938a1df47f8e0e3d1b45ae9ef1e3b5a72f2df9f3e6f7d8c1a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8"`
 *   - **Signed Message:** Length can vary depending on the signature algorithm.
 *     - Example: `"0x1b8e0a12f31f3b5c3c1b6e9f0d4a7f5e6b7d8c9a0e1f2a3b4c5d6e7f8e9f0a1b"`
 *
 * **Usage:**
 * The `Hex` type alias ensures that any variable representing a hexadecimal value conforms to the expected format.
 * It is used throughout the SDK to represent binary data in a human-readable hexadecimal string format.
 * This is especially important for serialization, storage, and transmission of data in blockchain applications.
 *
 * **Common Use Cases:**
 * - **Public Keys:** Representing public keys in hexadecimal format for cryptographic operations.
 * - **Signatures:** Storing and transmitting digital signatures.
 * - **Transaction Data:** Encoding transaction payloads or other binary data.
 * - **Hashes and Digests:** While specific types like `Hash` exist, `Hex` can be used for general-purpose hexadecimal data.
 */
export type Hex = `0x${string}`;

/**
 * Arguments for paginating a collection.
 * @property {number} first - The maximum number of items to retrieve in the current page.
 */
export type PaginationArgs = {
  /** The maximum number of items to retrieve in the current page. */
  first?: number;
  /** A cursor representing the starting point for the next page */
  after?: string;
};

/**
 * Represents the types of authentication connections available.
 * @type {("Username-Password-Authentication" | "google-oauth2")}
 * @property {"Username-Password-Authentication"} Username-Password-Authentication - Standard username and password authentication.
 * @property {"google-oauth2"} google-oauth2 - Google OAuth 2.0 authentication.
 */
export type AuthConnection =
  | "Username-Password-Authentication"
  | "google-oauth2";

export type KeybanUser = {
  sub: string;
};

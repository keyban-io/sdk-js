export {
  EstimateERC20TransferParams,
  EstimateNftTransferParams,
  FeesEstimation,
  KeybanAccount,
  TransactionOptions,
  TransferERC20Params,
  TransferNftParams,
} from "./account";
export { KeybanApiStatus } from "./api";
export { KeybanChain } from "./chains";
export { KeybanClient, KeybanClientConfig, PaginationArgs } from "./client";
export { IKeybanSigner, KeybanSigner } from "./signer";
export { SdkError, SdkErrorTypes } from "./errors";
export { IKeybanStorage } from "./storage";
export * from "./utils";
export type {
  GqlKeybanClient_AssetTransferFragment as KeybanAssetTransfer,
  GqlKeybanClient_NftBalanceFragment as KeybanNftBalance,
  GqlKeybanClient_TokenBalanceFragment as KeybanTokenBalance,
  GqlKeybanClient_TokenContractFragment as KeybanToken,
  GqlwalletTokenBalancesQuery,
} from "~/graphql";

/**
 * Alias for an Ethereum address. It must be a string that begins with "0x".
 */
export type Address = `0x${string}`;

/**
 * Alias for a hash value. It must be a string that begins with "0x".
 * Commonly used to represent transaction or block hashes.
 */
export type Hash = `0x${string}`;

/**
 * Alias for a hexadecimal value. It must be a string that begins with "0x".
 * Typically used to represent public keys or signed messages in blockchain-related contexts.
 */
export type Hex = `0x${string}`;

/**
 * @module Account
 */

import type { Address, Hash, Hex } from "~/index";

/**
 * Represents the estimation of fees for a transaction.
 * @see {@link KeybanAccount#estimateTransfer}
 */
export type FeesEstimation = {
  /**
   * The total maximum fees for the transaction.
   */
  maxFees: bigint;

  details: {
    /**
     * The maximum fee per unit of gas.
     */
    maxFeePerGas: bigint;

    /**
     * The maximum priority fee per unit of gas.
     */
    maxPriorityFeePerGas: bigint;

    /**
     * The estimated gas cost for the transaction.
     */
    gasCost: bigint;
  };
};

/**
 * Represents the options for a transaction.
 * see {@link KeybanAccount#transfer}
 */
export type TransactionOptions = {
  /** The maximum fee per unit of gas */
  maxFeePerGas?: bigint;
  /** The maximum priority fee per unit of gas */
  maxPriorityFeePerGas?: bigint;
};

/**
 * Represents the parameters for transferring ERC20 tokens.
 * @property {Address} contractAddress - The address of the ERC20 token contract
 * @property {Address} to - The recipient's address
 * @property {bigint} value - The transfer amount in the smallest token unit
 * @property {TransactionOptions} txOptions - The transaction options
 * @see {@link KeybanAccount#transferERC20}
 */
export type TransferERC20Params = {
  contractAddress: Address;
  to: Address;
  value: bigint;
  txOptions?: TransactionOptions;
};

/**
 * Represents the parameters for transferring ERC721 and ERC1155 tokens.
 * @property {Address} contractAddress - The address of the NFT contract
 * @property {bigint} tokenId - The ID of the token
 * @property {Address} to - The recipient's address
 * @property {bigint} value - The transfer amount (for ERC1155 tokens)
 * @property {TransactionOptions} txOptions - The transaction options
 * @property {string} standard - The token standard (ERC721 or ERC1155)
 * @see {@link KeybanAccount#transferNft}
 */
export type TransferNftParams = {
  contractAddress: Address;
  tokenId: bigint;
  to: Address;
  value?: bigint;
  standard: "ERC721" | "ERC1155";
  txOptions?: TransactionOptions;
};

/**
 * Represents the parameters required to estimate an ERC20 token transfer,
 * excluding the transaction options.
 *
 * This type is derived from `TransferERC20Params` by omitting the `txOptions` property.
 */
export type EstimateERC20TransferParams = Omit<
  TransferERC20Params,
  "txOptions"
>;

/**
 * Parameters required to estimate the transfer of an NFT, excluding transaction options.
 *
 * This type is derived from `TransferNftParams` by omitting the `txOptions` property.
 * @see {@link TransferNftParams}
 */
export type EstimateNftTransferParams = Omit<TransferNftParams, "txOptions">;

/**
 * A `KeybanAccount` represents a user's account in the Keyban system.
 * It provides methods to interact with the blockchain, including signing messages,
 * fetching balances, transferring tokens, and estimating transaction costs.
 */
export interface KeybanAccount {
  /**
   * The blockchain address associated with the account.
   */
  address: Address;

  /**
   * The public key associated with the account.
   */
  publicKey: Hex;

  /**
   * Signs an Ethereum message.
   * @param message - The message to be signed.
   * @returns - The signed message as a hex string.
   * @throws {Error} If the message is empty or there is an issue during signing.
   */
  signMessage(message: string): Promise<Hex>;

  /**
   * Transfers native tokens to another address.
   * @param to - The recipient's address.
   * @param value - The transfer amount in wei (must be greater than 0).
   * @param txOptions - Optional transaction options.
   * @returns - A promise that resolves to the transaction hash.
   * @throws {SdkError} If the recipient's address is invalid or the transfer amount is invalid.
   * @example
   * ```ts
   * const handleTransfer = async () => {
   *   // amount, account, recipient, setTransactionHash are state variables
   *   try {
   *     const valueInWei = BigInt(Number(amount) * 1e18);
   *     const txHash = await account.transfer(recipient as Address, valueInWei);
   *     setTransactionHash(txHash);
   *   } catch (err) {
   *     console.log(err);
   *   }
   * };
   * ```
   */
  transfer(
    to: Address,
    value: bigint,
    txOptions?: TransactionOptions,
  ): Promise<Hash>;

  /**
   * Estimates the cost of transferring native tokens to another address.
   * @param to - The recipient's address.
   * @returns - A promise that resolves to a `FeesEstimation` object containing the fee details.
   * @throws {Error} If there is an issue with estimating the gas or fees.
   */
  estimateTransfer(to: Address): Promise<FeesEstimation>;

  /**
   * Transfers ERC20 tokens to another address.
   * @param params - The parameters for the ERC20 transfer.
   * @returns - A promise that resolves to the transaction hash.
   * @throws {SdkError} If the recipient's address is invalid, the contract address is invalid, or the transfer amount is invalid.
   * @example
   * ```ts
   * const handleTransfer = async () => {
   *  // amount, account, recipient, contractAddress, setTransactionHash are state variables
   *  try {
   *   const valueInWei = BigInt(Number(amount) * 1e18);
   *   const txHash = await account.transferERC20({
   *   contractAddress: contractAddress as Address,
   *   to: recipient as Address,
   *   value: valueInWei,
   *   });
   *   setTransactionHash(txHash);
   *  } catch (err) {
   *   console.log(err);
   *  }
   * };
   * ```
   */
  transferERC20(params: TransferERC20Params): Promise<Hash>;

  /**
   * Estimates the cost of transferring ERC20 tokens to another address.
   * @param params - The parameters for estimating the ERC20 transfer.
   * @returns - A promise that resolves to a `FeesEstimation` object containing the fee details.
   * @throws {Error} If there is an issue with estimating the gas or fees.
   * @example
   * ```ts
   * const handleEstimate = async () => {
   *   // account, recipient, contractAddress, amount, setTransferCost are state variables
   *   try {
   *     const valueInWei = BigInt(Number(amount) * 1e18);
   *     const estimation = await account.estimateTransferERC20({
   *       contractAddress: contractAddress as Address,
   *       to: recipient as Address,
   *       value: valueInWei,
   *     });
   *     setTransferCost(estimation.maxFees.toString());
   *   } catch (err) {
   *     console.log(err);
   *   }
   * };
   * ```
   */
  estimateERC20Transfer(
    params: EstimateERC20TransferParams,
  ): Promise<FeesEstimation>;

  /**
   * Transfers ERC721 and ERC1155 tokens to another address.
   * @param params - The parameters for the NFT transfer.
   * @returns - A promise that resolves to the transaction hash.
   * @throws {SdkError} If the recipient's address is invalid, the contract address is invalid, the transfer amount is invalid, or the token standard is invalid.
   * @example
   * ```ts
   * const handleTransfer = async () => {
   *  // account, recipient, contractAddress, tokenId, amount, standard, setTransactionHash are state variables
   *  try {
   *    const value = BigInt(amount);
   *    const txHash = await account.transferNft({
   *      contractAddress: contractAddress as Address,
   *      tokenId: tokenId as bigint,
   *      to: recipient as Address,
   *      value: value,
   *      standard: standard as 'ERC721' | 'ERC1155',
   *    });
   *    setTransactionHash(txHash);
   *  } catch (err) {
   *    console.log(err);
   *  }
   * };
   * ```
   */
  transferNft(params: TransferNftParams): Promise<Hash>;

  /**
   * Estimates the cost of transferring ERC721 and ERC1155 tokens to another address.
   * @param params - The parameters for estimating the NFT transfer.
   * @returns - A promise that resolves to a `FeesEstimation` object containing the fee details.
   * @throws {Error} If there is an issue with estimating the gas or fees.
   * @example
   * ```ts
   * const handleEstimate = async () => {
   *  // account, recipient, contractAddress, tokenId, amount, standard, setTransferCost are state variables
   *  try {
   *  const value = BigInt(amount);
   *  const estimation = await account.estimateNftTransfer({
   *    contractAddress: contractAddress as Address,
   *    tokenId: tokenId as bigint,
   *    to: recipient as Address,
   *    value: value,
   *    standard: standard as 'ERC721' | 'ERC1155',
   *  });
   *  setTransferCost(estimation.maxFees.toString());
   *  } catch (err) {
   *    console.log(err);
   *  }
   * };
   * ```
   */
  estimateNftTransfer(
    params: EstimateNftTransferParams,
  ): Promise<FeesEstimation>;
}

/**
 * @module Account
 */
import {
  type Chain,
  type ContractFunctionExecutionErrorType,
  erc20Abi,
  erc721Abi,
  EstimateGasExecutionError,
  getContract,
  InsufficientFundsError,
  isAddress,
  type LocalAccount,
  type PublicClient,
  type Transport,
  type WalletClient,
} from "viem";

import { ERC1155_ABI_TRANSFER_FROM } from "~/const";
import { SdkError } from "~/errors";
import type { Address, Hash, Hex, KeybanClient } from "~/index";

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
 * The `KeybanAccount` class represents a user's account in the Keyban system.
 * It provides methods to interact with the blockchain, including signing messages,
 * fetching balances, transferring tokens, and estimating transaction costs.
 * @class
 * @property {string} sub - Represents the unique identifier of the client, extracted from the JWT (JSON Web Token).
 * @property {Address} address - The blockchain address associated with the account.
 * @property {Hex} publicKey - The public key associated with the account.
 * @property {KeybanClient} client - The Keyban client for making requests (private).
 * @property {PublicClient<Transport, Chain>} publicClient - The client for public interactions (e.g., fetching balances) (private).
 * @property {WalletClient<Transport, Chain, LocalAccount>} walletClient - The wallet client used for signing and sending transactions (private).
 */
export class KeybanAccount implements KeybanAccount {
  sub: string;
  address: Address;
  publicKey: Hex;
  #client: KeybanClient;
  #publicClient: PublicClient<Transport, Chain>;
  #walletClient: WalletClient<Transport, Chain, LocalAccount>;

  // eslint-disable-next-line jsdoc/require-description
  /**
   * @private
   * @param sub - The unique identifier for the Keyban account.
   * @param client - The Keyban client for making requests.
   * @param publicClient - The client for public interactions (e.g., fetching balances).
   * @param walletClient - The wallet client used for signing and sending transactions.
   */
  constructor(
    sub: string,
    client: KeybanClient,
    publicClient: PublicClient<Transport, Chain>,
    walletClient: WalletClient<Transport, Chain, LocalAccount>,
  ) {
    this.sub = sub;
    this.address = walletClient.account.address.toLowerCase() as Address;
    this.publicKey = walletClient.account.publicKey.toLowerCase() as Hex;

    this.#client = client;
    this.#publicClient = publicClient;
    this.#walletClient = walletClient;
  }

  /**
   * Signs an Ethereum message.
   * @param message - The message to be signed.
   * @returns - The signed message as a hex string.
   * @throws {Error} If the message is empty or there is an issue during signing.
   */
  async signMessage(message: string): Promise<Hex> {
    // For now, even EDDSA messages are prefixed with the Ethereum message prefix.
    // This may need to be updated when the eddsa signer is associated with a specific chain (e.g., Solana).
    return this.#walletClient.signMessage({ message });
  }

  /**
   * Retrieves the balance of the account associated with the current address.
   * @returns A promise that resolves to the balance of the account.
   */
  getBalance() {
    return this.#client.getBalance(this.address);
  }

  /**
   * Retrieves the token balances for the current account.
   * @returns A promise that resolves to the token balances of the account.
   */
  async getTokenBalances() {
    return this.#client.getTokenBalances(this.address);
  }

  /**
   * Retrieves the account ERC721 and ERC1155 tokens.
   * @returns A promise that resolves to the account's ERC721 and ERC1155 tokens.
   */
  async getNfts() {
    return this.#client.getNfts(this.address);
  }

  /**
   * Retrieves the account ERC721 and ERC1155 token balances.
   * @param tokenAddress - The address of the token contract.
   * @param tokenId - The ID of the token.
   * @returns A promise that resolves to the account's ERC721 and ERC1155 tokens.
   */
  async getNft(tokenAddress: Address, tokenId: string) {
    return this.#client.getNft(this.address, tokenAddress, tokenId);
  }

  /**
   *  Retrieves the account transaction history for native currency, tokens, and NFTs.
   *  @returns A promise that resolves to the account's transaction history.
   */
  async getTransferHistory() {
    return this.#client.getTransferHistory(this.address);
  }

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
  async transfer(
    to: Address,
    value: bigint,
    txOptions?: TransactionOptions,
  ): Promise<Hash> {
    if (!isAddress(to)) {
      throw new SdkError(
        SdkError.types.AddressInvalid,
        "KeybanAccount.transfer",
      );
    }

    if (value <= 0n) {
      throw new SdkError(
        SdkError.types.AmountInvalid,
        "KeybanAccount.transfer",
      );
    }

    return this.#walletClient
      .sendTransaction({
        to,
        value,
        type: "eip1559",
        maxFeePerGas: txOptions?.maxFeePerGas,
        maxPriorityFeePerGas: txOptions?.maxPriorityFeePerGas,
      })
      .catch((err) => {
        throw err.cause;
      });
  }

  /**
   * Estimates the cost of transferring native tokens to another address.
   * @param to - The recipient's address.
   * @returns - A promise that resolves to a `FeesEstimation` object containing the fee details.
   * @throws {Error} If there is an issue with estimating the gas or fees.
   */
  async estimateTransfer(to: Address): Promise<FeesEstimation> {
    const [{ maxFeePerGas, maxPriorityFeePerGas }, gasCost] = await Promise.all(
      [
        this.#publicClient.estimateFeesPerGas({ type: "eip1559" }),
        this.#publicClient.estimateGas({ to, account: this.address }),
      ],
    );

    return {
      maxFees: maxFeePerGas * gasCost,
      details: {
        maxFeePerGas,
        maxPriorityFeePerGas,
        gasCost,
      },
    };
  }

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
  async transferERC20(params: TransferERC20Params): Promise<Hash> {
    const { contractAddress, to, value, txOptions } = params;

    if (!isAddress(to)) {
      throw new SdkError(
        SdkError.types.AddressInvalid,
        "KeybanAccount.transferERC20",
      );
    }
    if (!isAddress(contractAddress)) {
      throw new SdkError(
        SdkError.types.AddressInvalid,
        "KeybanAccount.transferERC20",
      );
    }
    if (to === this.address) {
      throw new SdkError(
        SdkError.types.RecipientAddressEqualsSender,
        "KeybanAccount.transferERC20",
      );
    }

    if (value <= 0n) {
      throw new SdkError(
        SdkError.types.AmountInvalid,
        "KeybanAccount.transferERC20",
      );
    }

    const erc20Contract = getContract({
      address: contractAddress,
      abi: erc20Abi,
      client: {
        public: this.#publicClient,
        wallet: this.#walletClient,
      },
    });

    return erc20Contract.write
      .transfer([to, value], txOptions)
      .catch((err: ContractFunctionExecutionErrorType) => {
        switch (true) {
          case err.cause.cause instanceof InsufficientFundsError:
          case err.cause.cause instanceof EstimateGasExecutionError:
            throw new SdkError(
              SdkError.types.InsufficientFunds,
              "KeybanAccount.transferERC20",
            );

          default:
            throw err.cause;
        }
      });
  }

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
  async estimateERC20Transfer(
    params: EstimateERC20TransferParams,
  ): Promise<FeesEstimation> {
    const { contractAddress, to, value } = params;
    const [{ maxFeePerGas, maxPriorityFeePerGas }, gasCost] = await Promise.all(
      [
        this.#publicClient.estimateFeesPerGas({ type: "eip1559" }),
        this.#publicClient.estimateContractGas({
          address: contractAddress,
          abi: erc20Abi,
          functionName: "transfer",
          args: [to, value],
          account: this.address,
        }),
      ],
    );

    return {
      maxFees: maxFeePerGas * gasCost,
      details: {
        maxFeePerGas,
        maxPriorityFeePerGas,
        gasCost,
      },
    };
  }

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
  async transferNft(params: TransferNftParams): Promise<Hash> {
    const { contractAddress, tokenId, to, value, standard, txOptions } = params;

    if (!isAddress(to)) {
      throw new SdkError(
        SdkError.types.AddressInvalid,
        "KeybanAccount.transferNft",
      );
    }
    if (!isAddress(contractAddress)) {
      throw new SdkError(
        SdkError.types.AddressInvalid,
        "KeybanAccount.transferNft",
      );
    }
    if (to === this.address) {
      throw new SdkError(
        SdkError.types.RecipientAddressEqualsSender,
        "KeybanAccount.transferNft",
      );
    }

    if (standard === "ERC1155") {
      if (value === undefined) {
        throw new SdkError(
          SdkError.types.AmountRequired,
          "KeybanAccount.transferNft",
        );
      }
      if (value <= 0n) {
        throw new SdkError(
          SdkError.types.AmountInvalid,
          "KeybanAccount.transferNft",
        );
      }
      return this.#transferERC1155({
        contractAddress,
        tokenId,
        value,
        to,
        txOptions,
      });
    }

    if (standard === "ERC721") {
      if (value !== undefined && value !== 1n) {
        throw new SdkError(
          SdkError.types.AmountIrrelevant,
          "KeybanAccount.transferNft",
        );
      }
      return this.#transferERC721({ contractAddress, tokenId, to, txOptions });
    }

    throw new SdkError(
      SdkError.types.InvalidNftStandard,
      "KeybanAccount.transferNft",
    );
  }

  async #transferERC721({
    contractAddress,
    tokenId,
    to,
    txOptions,
  }: Omit<TransferNftParams, "value" | "standard">): Promise<Hash> {
    const erc721Contract = getContract({
      address: contractAddress,
      abi: erc721Abi,
      client: {
        public: this.#publicClient,
        wallet: this.#walletClient,
      },
    });

    const from = this.address;
    return erc721Contract.write
      .transferFrom([from, to, tokenId], txOptions)
      .catch((err: ContractFunctionExecutionErrorType) => {
        switch (true) {
          case err.cause.cause instanceof InsufficientFundsError:
          case err.cause.cause instanceof EstimateGasExecutionError:
            throw new SdkError(
              SdkError.types.InsufficientFunds,
              "KeybanAccount.transferNft",
            );

          default:
            throw err.cause;
        }
      });
  }

  async #transferERC1155({
    contractAddress,
    tokenId,
    value,
    to,
    txOptions,
  }: Omit<TransferNftParams, "standard">): Promise<Hash> {
    const erc1155Contract = getContract({
      address: contractAddress,
      abi: ERC1155_ABI_TRANSFER_FROM,
      client: {
        public: this.#publicClient,
        wallet: this.#walletClient,
      },
    });

    const from = this.address;
    return erc1155Contract.write
      .safeTransferFrom([from, to, tokenId, value, ""], txOptions)
      .catch((err: ContractFunctionExecutionErrorType) => {
        switch (true) {
          case err.cause.cause instanceof InsufficientFundsError:
          case err.cause.cause instanceof EstimateGasExecutionError:
            throw new SdkError(
              SdkError.types.InsufficientFunds,
              "KeybanAccount.transferNft",
            );

          default:
            throw err.cause;
        }
      });
  }

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
  async estimateNftTransfer(
    params: EstimateNftTransferParams,
  ): Promise<FeesEstimation> {
    const { standard, contractAddress, tokenId, to, value } = params;

    if (standard === "ERC1155") {
      return this.#estimateERC1155Transfer({
        contractAddress,
        tokenId,
        to,
        value,
      });
    }
    if (standard === "ERC721") {
      if (value !== undefined && value !== 1n) {
        throw new SdkError(
          SdkError.types.AmountIrrelevant,
          "KeybanAccount.transferNft",
        );
      }
      return this.#estimateERC721Transfer({ contractAddress, tokenId, to });
    }
    throw new SdkError(
      SdkError.types.InvalidNftStandard,
      "KeybanAccount.estimateNftTransfer",
    );
  }

  async #estimateERC721Transfer({
    contractAddress,
    tokenId,
    to,
  }: Omit<
    EstimateNftTransferParams,
    "standard" | "value"
  >): Promise<FeesEstimation> {
    const from = this.address;
    const [{ maxFeePerGas, maxPriorityFeePerGas }, gasCost] = await Promise.all(
      [
        this.#publicClient.estimateFeesPerGas({ type: "eip1559" }),
        this.#publicClient.estimateContractGas({
          address: contractAddress,
          abi: erc721Abi,
          functionName: "transferFrom",
          args: [from, to, tokenId],
          account: this.address,
        }),
      ],
    );

    return {
      maxFees: maxFeePerGas * gasCost,
      details: {
        maxFeePerGas,
        maxPriorityFeePerGas,
        gasCost,
      },
    };
  }

  async #estimateERC1155Transfer({
    contractAddress,
    tokenId,
    to,
    value,
  }: Omit<EstimateNftTransferParams, "standard">): Promise<FeesEstimation> {
    const from = this.address;
    const [{ maxFeePerGas, maxPriorityFeePerGas }, gasCost] = await Promise.all(
      [
        this.#publicClient.estimateFeesPerGas({ type: "eip1559" }),
        this.#publicClient.estimateContractGas({
          address: contractAddress,
          abi: ERC1155_ABI_TRANSFER_FROM,
          functionName: "safeTransferFrom",
          args: [from, to, tokenId, value, ""],
          account: this.address,
        }),
      ],
    );

    return {
      maxFees: maxFeePerGas * gasCost,
      details: {
        maxFeePerGas,
        maxPriorityFeePerGas,
        gasCost,
      },
    };
  }
}

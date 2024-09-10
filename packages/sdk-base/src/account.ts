import {
  type Chain,
  isAddress,
  type LocalAccount,
  type PublicClient,
  type Transport,
  type WalletClient,
} from 'viem';
import {
  SdkError,
  SdkErrorTypes,
} from '~/errors';
import type {
  Address,
  Hash,
  Hex,
  KeybanClient,
} from '~/index';

/**
 * Represents the estimation of the fees required for a token transfer.
 * @property {bigint} maxFees - The total maximum fees for the transaction, including gas cost and priority fees
 * @property {Object} details - The breakdown of gas-related fees
 * @property {bigint} details.maxFeePerGas - The maximum fee per unit of gas
 * @property {bigint} details.maxPriorityFeePerGas - The maximum priority fee per unit of gas
 * @property {bigint} details.gasCost - The estimated gas cost for the transaction
 * @see {@link KeybanAccount#estimateTransfer}
 */
export type TransferEstimation = {
  maxFees: bigint; // The total maximum fees for the transaction
  details: {
    maxFeePerGas: bigint; // The maximum fee per unit of gas
    maxPriorityFeePerGas: bigint; // The maximum priority fee per unit of gas
    gasCost: bigint; // The estimated gas cost for the transaction
  };
};

/**
 * The Keyban account is the entry class to access all features related to an account
 * such as balance, token balances, transfers, estimate fees, and sign messages.
 */
export class KeybanAccount implements KeybanAccount {
  keyId: string;
  address: Address;
  publicKey: Hex;

  #client: KeybanClient;
  #publicClient: PublicClient<Transport, Chain>;
  #walletClient: WalletClient<Transport, Chain, LocalAccount>;

  /**
   * @private
   * @param keyId - The unique identifier for the Keyban account.
   * @param client - The Keyban client for making requests.
   * @param publicClient - The client for public interactions (e.g., fetching balances).
   * @param walletClient - The wallet client used for signing and sending transactions.
   */
  constructor(
    keyId: string,
    client: KeybanClient,
    publicClient: PublicClient<Transport, Chain>,
    walletClient: WalletClient<Transport, Chain, LocalAccount>,
  ) {
    this.keyId = keyId;
    this.address = walletClient.account.address.toLowerCase() as Address;
    this.publicKey = walletClient.account.publicKey.toLowerCase() as Hex;

    this.#client = client;
    this.#publicClient = publicClient;
    this.#walletClient = walletClient;
  }

  /**
   * Signs an Ethereum message.
   *
   * @param message - The message to be signed.
   * @returns The signed message as a hex string.
   * @throws {Error} If the message is empty or there is an issue during signing.
   */
  async signMessage(message: string): Promise<Hex> {
    // For now, even EDDSA messages are prefixed with the Ethereum message prefix.
    // This may need to be updated when the eddsa signer is associated with a specific chain (e.g., Solana).
    return this.#walletClient.signMessage({ message });
  }

  /**
   * @returns The account balance in native tokens.
   * @see {@link useKeybanAccountBalance}
   */
  getBalance() {
    return this.#publicClient.getBalance({ address: this.address });
  }

  /**
   * @returns The account balance in ERC20 tokens.
   * @see {@link useKeybanAccountTokenBalances}
   */
  async getTokenBalances() {
    return this.#client.getTokenBalances(this.address);
  }

  /**
   * Transfers native tokens to another address.
   *
   * @param to - The recipient's address.
   * @param value - The transfer amount in wei (must be greater than 0).
   * @returns A promise that resolves to the transaction hash.
   * @throws {SdkError} If the recipient's address is invalid or the transfer amount is invalid.
   *
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
  async transfer(to: Address, value: bigint): Promise<Hash> {
    if (!isAddress(to)) {
      throw new SdkError(
        SdkErrorTypes.AddressInvalid,
        "KeybanAccount.transfer",
      );
    }

    if (value <= 0n) {
      throw new SdkError(SdkErrorTypes.AmountInvalid, "KeybanAccount.transfer");
    }

    return this.#walletClient
      .sendTransaction({ to, value, type: "eip1559" })
      .catch((err) => {
        throw err.cause;
      });
  }

  /**
   * Estimates the cost of transferring native tokens to another address.
   *
   * @param to - The recipient's address.
   * @param value - The transfer amount in wei.
   * @returns A promise that resolves to a `TransferEstimation` object containing the fee details.
   * @throws {Error} If there is an issue with estimating the gas or fees.
   */
  async estimateTransfer(
    to: Address,
    value?: bigint,
  ): Promise<TransferEstimation> {
    const [{ maxFeePerGas, maxPriorityFeePerGas }, gasCost] = await Promise.all(
      [
        this.#publicClient.estimateFeesPerGas({ type: "eip1559" }),
        this.#publicClient.estimateGas({ to, account: this.address, value }),
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

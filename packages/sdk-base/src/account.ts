import {
  type Chain,
  isAddress,
  type LocalAccount,
  type PublicClient,
  type Transport,
  type WalletClient,
} from "viem";
import { Address, Hash, Hex, KeybanClient } from "~/index";
import { SdkError, SdkErrorTypes } from "~/errors";
import {
  getSdk,
  GqlKeybanAccount_addressTokenBalancesQuery,
  Sdk,
} from "~/account.generated";

export type TransferEstimation = {
  maxFees: bigint;
  details: {
    maxFeePerGas: bigint;
    maxPriorityFeePerGas: bigint;
    gasCost: bigint;
  };
};

export type KeybanAccountTokenBalance =
  GqlKeybanAccount_addressTokenBalancesQuery["chain"]["addressTokenBalances"][0];

export class KeybanAccount implements KeybanAccount {
  keyId: string;
  address: Address;
  publicKey: Hex;

  #client: KeybanClient;
  #publicClient: PublicClient<Transport, Chain>;
  #walletClient: WalletClient<Transport, Chain, LocalAccount>;
  #graphql: Sdk;

  /**
   * @private
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
    this.#graphql = getSdk(this.#client.gqlRequester);
  }

  /**
   * Signs an Ethereum message.
   */
  async signMessage(message: string): Promise<Hex> {
    // For now even EDDSA messages are prefixed with Ethereum message prefix
    // To be updated when the eddsa signer is associated with a specific chain (e.g. Solana)
    // Account should be aware of the chain it is associated with not only the signer
    return this.#walletClient.signMessage({ message });
  }

  /**
   * @returns The account balance in native tokens.
   */
  getBalance() {
    return this.#publicClient.getBalance({ address: this.address });
  }

  /**
   * @returns The account balance in ERC20 tokens.
   */
  async getTokenBalances() {
    const { chain } = await this.#graphql.KeybanAccount_addressTokenBalances({
      chainType: this.#client.chain,
      address: this.address,
    });

    return chain.addressTokenBalances;
  }

  /**
   * Transfers native tokens to another address.
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
  };
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
   * @param to transfer recipient
   * @param value transfer amount in wei
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

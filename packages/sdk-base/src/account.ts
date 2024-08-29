import {
  type Chain,
  type Transport,
  type WalletClient,
  type PublicClient,
  type LocalAccount,
  isAddress,
} from "viem";
import { Address, Hash, Hex, KeybanClient } from "~/index";
import { SdkError, SdkErrorTypes } from "./errors";

export class KeybanAccount implements KeybanAccount {
  keyId: string;
  address: Address;
  publicKey: Hex;

  #client: KeybanClient;
  #publicClient: PublicClient<Transport, Chain>;
  #walletClient: WalletClient<Transport, Chain, LocalAccount>;

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

  getBalance() {
    return this.#publicClient.getBalance({ address: this.address });
  }

  async getTokenBalances(): Promise<KeybanAccountTokenBalance[]> {
    type ApiTokenInfo = {
      address: Address;
      name: string;
      symbol: string;
      decimals: number;
      icon_url: string | null;
    };

    type ApiTokenBalance = {
      token: ApiTokenInfo;
      value: string;
    };

    const url = `/addresses/${this.address}/token-balances`;
    const tokenBalances =
      await this.#client.blockscoutRequester<ApiTokenBalance[]>(url);

    return (tokenBalances ?? []).map(({ token, value }) => ({
      token: {
        address: token.address.toLowerCase() as Address,
        name: token.name,
        symbol: token.symbol,
        decimals: token.decimals,
        iconUrl: token.icon_url,
      },
      balance: BigInt(value),
    }));
  }

  /**
   * Transfers native tokens to another address.
   */
  transfer(to: Address, value: bigint): Promise<Hash> {
    if (!isAddress(to)) {
      throw new SdkError(
        SdkErrorTypes.AddressInvalid,
        "AddressInvalid",
      );
    }

    if (value <= 0n) {
      throw new SdkError(
        SdkErrorTypes.AmountInvalid,
        "AmountInvalid",
      );
    }

    return this.#walletClient.sendTransaction({ to, value, type: "eip1559" });
  }
}

export type KeybanAccountTokenBalance = {
  token: {
    address: Address;
    name: string;
    symbol: string;
    decimals: number;
    iconUrl: string | null;
  };
  balance: bigint;
};

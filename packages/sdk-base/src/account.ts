import type {
  Chain,
  Transport,
  Account,
  WalletClient,
  PublicClient,
} from "viem";
import { erc20Abi, getContract } from "viem";
import { Address, Hash, Hex } from "~/index";

export class KeybanAccount implements KeybanAccount {
  keyId: string;
  publicKey: string;

  #publicClient: PublicClient<Transport, Chain>;
  #walletClient: WalletClient<Transport, Chain, Account>;

  /**
   * @private
   */
  constructor(
    keyId: string,
    publicKey: string,
    publicClient: PublicClient<Transport, Chain>,
    walletClient: WalletClient<Transport, Chain, Account>,
  ) {
    this.keyId = keyId;
    this.publicKey = publicKey;

    this.#publicClient = publicClient;
    this.#walletClient = walletClient;
  }

  get address(): Address {
    this.#walletClient.account.publicKey;
    return this.#walletClient.account.address;
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

  getNonNativeBalance(contractAddress: Address) {
    const contract = getContract({
      address: contractAddress,
      abi: erc20Abi,
      client: {
        public: this.#publicClient,
        wallet: this.#walletClient,
      },
    });

    return contract.read.balanceOf([this.address]);
  }

  /**
   * Transfers native tokens to another address.
   */
  transfer(to: Address, value: bigint): Promise<Hash> {
    return this.#walletClient.sendTransaction({ to, value, type: "eip1559" });
  }
}

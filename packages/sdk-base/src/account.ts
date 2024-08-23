import type {
  Address,
  Chain,
  CustomSource,
  Hash,
  Hex,
  Transport,
  Account as ViemAccount,
  WalletClient,
} from "viem";
import {
  createWalletClient,
  hashMessage,
  hashTypedData,
  http,
  keccak256,
  parseSignature,
  serializeTransaction,
} from "viem";
import { toAccount } from "viem/accounts";
import { KeybanClient } from "~/client";
import { StorageError } from "~/errors";
import { getSdk, Sdk } from "./account.generated";

export class KeybanAccount implements KeybanAccount {
  keyId: string;
  address: Hex;
  publicKey: string;

  #client: KeybanClient;
  #walletClient: WalletClient<Transport, Chain, ViemAccount>;
  #graphql: Sdk;

  constructor(
    client: KeybanClient,
    keyId: string,
    address: Hex,
    publicKey: string,
  ) {
    this.keyId = keyId;
    this.address = address;
    this.publicKey = publicKey;

    this.#client = client;
    this.#walletClient = createWalletClient({
      chain: client.publicClient.chain,
      transport: http(client.chainUrl),
      account: toAccount({
        address: this.address,
        signMessage: this.#signMessage.bind(this),
        signTransaction: this.#signTransaction.bind(this),
        signTypedData: this.#signTypedData.bind(this),
      }),
    });
    this.#graphql = getSdk(this.#client.requester);
  }

  async #getClientShare() {
    const storageKey = `${this.#client.signer.storagePrefix}-${this.keyId}`;
    const clientShare = await this.#client.storage.get(storageKey);

    if (!clientShare)
      throw new StorageError(
        StorageError.types.RetrivalFailed,
        "Account.getClientShare",
      );

    return clientShare;
  }

  async getBalance() {
    return this.#client.publicClient.getBalance({ address: this.address });
  }

  /**
   * Signs an Ethereum message using the client's secret share.
   */
  async signMessage(message: string): Promise<Hex> {
    // For now even EDDSA messages are prefixed with Ethereum message prefix
    // To be updated when the eddsa signer is associated with a specific chain (e.g. Solana)
    // Account should be aware of the chain it is associated with not only the signer
    return this.#signMessage({ message });
  }

  #signMessage: CustomSource["signMessage"] = async ({ message }) => {
    const clientShare = await this.#getClientShare();
    const hash = hashMessage(message, "hex");
    return this.#client.signer.sign(
      this.keyId,
      clientShare,
      hash,
      this.#client.apiUrl,
    );
  };

  /**
   *  Signs a transaction using the client's secret share.
   */
  #signTransaction: CustomSource["signTransaction"] = async (
    transaction,
    args,
  ) => {
    const serializer = args?.serializer ?? serializeTransaction;

    // For EIP-4844 Transactions, we want to sign the transaction payload body (tx_payload_body) without the sidecars (ie. without the network wrapper).
    // See: https://github.com/ethereum/EIPs/blob/e00f4daa66bd56e2dbd5f1d36d09fd613811a48b/EIPS/eip-4844.md#networking
    const signableTransaction =
      transaction.type === "eip4844"
        ? { ...transaction, sidecars: false }
        : transaction;

    const hexSignature = await this.#client.signer.sign(
      this.keyId,
      await this.#getClientShare(),
      keccak256(serializer(signableTransaction)),
      this.#client.apiUrl,
    );
    const signature = parseSignature(hexSignature);

    return serializer(transaction, signature);
  };

  #signTypedData: CustomSource["signTypedData"] = async (
    typedDataDefinition,
  ) => {
    const clientShare = await this.#getClientShare();
    const hash = hashTypedData(typedDataDefinition);
    return this.#client.signer.sign(
      this.keyId,
      clientShare,
      hash,
      this.#client.apiUrl,
    );
  };

  /**
   * Transfers native tokens to another address.
   */
  transfer(to: Address, value: bigint): Promise<Hash> {
    return this.#walletClient.sendTransaction({ to, value, type: "eip1559" });
  }

  listTransactions() {
    return this.#graphql.KeybanAccount_listTransactions();
  }
}

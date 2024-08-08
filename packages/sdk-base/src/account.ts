import type { KeybanClientImpl } from '~/client';
import { KeybanBaseError, StorageError } from '~/errors';
import type { Address, CustomSource, Hash, Hex, WalletClient } from 'viem';
import {
  createWalletClient,
  hashMessage,
  hashTypedData,
  http,
  keccak256,
  parseSignature,
  serializeTransaction,
} from 'viem';
import { toAccount } from 'viem/accounts';

export interface KeybanAccount {
  keyId: string;
  address: Hex;
  publicKey: string;

  getBalance(): Promise<bigint>;
  transfer(to: Address, value: bigint): Promise<Hash>;
  sign(payload: string): Promise<string>;
  add(a: number, b: number): Promise<number>;
}

/**
 * @private
 */
export class Account<Share> implements KeybanAccount {
  keyId: string;
  address: Hex;
  publicKey: string;

  #client: KeybanClientImpl<Share>;
  #walletClient: WalletClient;

  constructor(
    client: KeybanClientImpl<Share>,
    keyId: string,
    address: Hex,
    publicKey: string
  ) {
    this.keyId = keyId;
    this.address = address;
    this.publicKey = publicKey;

    this.#client = client;
    this.#walletClient = createWalletClient({
      chain: client.chain,
      transport: http(),
      account: toAccount({
        address: this.address,
        signMessage: this.#signMessage.bind(this),
        signTransaction: this.#signTransaction.bind(this),
        signTypedData: this.#signTypedData.bind(this),
      }),
    });
  }

  async #getClientShare() {
    const storageKey = `${this.#client.signer.storagePrefix}-${this.keyId}`;
    const clientShare = await this.#client.storage.get(storageKey);

    if (!clientShare)
      throw new StorageError(
        StorageError.types.RetrivalFailed,
        'Account.getClientShare'
      );

    return clientShare;
  }

  async getBalance() {
    return this.#client.publicClient.getBalance({ address: this.address });
  }

  /**
   * Signs a payload using the client's secret share.
   */
  async sign(payload: string) {
    const clientShare = await this.#getClientShare();
    return this.#client.signer
      .sign(this.keyId, clientShare, payload)
      .catch((err) => {
        throw new KeybanBaseError(err);
      });
  }

  #signMessage: CustomSource['signMessage'] = async ({ message }) => {
    const clientShare = await this.#getClientShare();
    const hash = hashMessage(message, 'hex');
    return this.#client.signer.sign(this.keyId, clientShare, hash);
  };

  /**
   *  Signs a transaction using the client's secret share.
   */
  #signTransaction: CustomSource['signTransaction'] = async (
    transaction,
    args
  ) => {
    const serializer = args?.serializer ?? serializeTransaction;

    // For EIP-4844 Transactions, we want to sign the transaction payload body (tx_payload_body) without the sidecars (ie. without the network wrapper).
    // See: https://github.com/ethereum/EIPs/blob/e00f4daa66bd56e2dbd5f1d36d09fd613811a48b/EIPS/eip-4844.md#networking
    const signableTransaction =
      transaction.type === 'eip4844'
        ? { ...transaction, sidecars: false }
        : transaction;

    const hexSignature = await this.#client.signer.sign(
      this.keyId,
      await this.#getClientShare(),
      keccak256(serializer(signableTransaction))
    );
    const signature = parseSignature(hexSignature);

    return serializer(transaction, signature);
  };

  #signTypedData: CustomSource['signTypedData'] = async (
    typedDataDefinition
  ) => {
    const clientShare = await this.#getClientShare();
    const hash = hashTypedData(typedDataDefinition);
    return this.#client.signer.sign(this.keyId, clientShare, hash);
  };

  transfer(to: Address, value: bigint): Promise<Hash> {
    // @ts-expect-error: account is already setup in wallet client
    return this.#walletClient.sendTransaction({ to, value });
  }

  /**
   * Sums two numbers using the WebAssembly API. This method is for testing purposes only.
   */
  add(a: number, b: number) {
    return this.#client.signer.add(a, b);
  }
}

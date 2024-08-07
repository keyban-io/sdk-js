import type { KeybanClientImpl } from '~/client';
import { KeybanBaseError, StorageError } from '~/errors';
import type { Address, Chain, Hash, Hex, SerializeTransactionFn, SignableMessage, SignTransactionReturnType, TransactionSerializable, Transport, TypedData, TypedDataDefinition, WalletClient } from "viem";
import { createWalletClient, hashMessage, hashTypedData, http, keccak256, parseSignature, serializeTransaction, Account as ViemAccount } from "viem";
import { toAccount } from "viem/accounts";

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
 * */
export class Account<Share> implements KeybanAccount {
  client: KeybanClientImpl<Share>;

  keyId: string;
  address: Hex;
  publicKey: string;
  walletClient: WalletClient<Transport, Chain, ViemAccount>;

  constructor(
    client: KeybanClientImpl<Share>,
    keyId: string,
    address: Hex,
    publicKey: string,
  ) {
    this.client = client;

    this.keyId = keyId;
    this.address = address;
    this.publicKey = publicKey;
    this.walletClient = createWalletClient(
      {
        chain: client.chain,
        transport: http(),
        account: toAccount({
          address: this.address,
          signMessage: this.signMessage.bind(this),
          signTransaction: this.signTransaction.bind(this),
          signTypedData: this.signTypedData.bind(this),
        })
      }
    );
  }

  async #getClientShare() {
    const storageKey = `${this.client.signer.storagePrefix}-${this.keyId}`;
    const clientShare = await this.client.storage.get(storageKey);

    if (!clientShare)
      throw new StorageError(
        StorageError.types.RetrivalFailed,
        'Account.getClientShare',
      );

    return clientShare;
  }

  async getBalance() {
    return this.client.publicClient.getBalance({ address: this.address });
  }

  /**
   * Signs a payload using the client's secret share.
   */
  async sign(payload: string) {
    const clientShare = await this.#getClientShare();
    return this.client.signer
      .sign(this.keyId, clientShare, payload)
      .catch((err) => {
        throw new KeybanBaseError(err);
      });
  }

  /**
   * Signs an Ethereum formatted message using the client's secret share.
   */
  private async signMessage({ message }: { message: SignableMessage }): Promise<Hash> {
    const clientShare = await this.#getClientShare();
    const hash = hashMessage(message, "hex");
    return this.client.signer.sign(this.keyId, clientShare, hash) as Promise<Hash>;
  }

  /**
   *  Signs a transaction using the client's secret share.
   */
  private async signTransaction<
    Serializer extends
    SerializeTransactionFn<TransactionSerializable> = SerializeTransactionFn<TransactionSerializable>,
    Transaction extends Parameters<Serializer>[0] = Parameters<Serializer>[0],
  >(
    transaction: Transaction,
    args: { serializer?: Serializer | undefined; } | undefined
  ): Promise<SignTransactionReturnType> {
    const serializer = args?.serializer ?? serializeTransaction<Transaction>;
    const signableTransaction = (() => {
      // For EIP-4844 Transactions, we want to sign the transaction payload body (tx_payload_body) without the sidecars (ie. without the network wrapper).
      // See: https://github.com/ethereum/EIPs/blob/e00f4daa66bd56e2dbd5f1d36d09fd613811a48b/EIPS/eip-4844.md#networking
      if (transaction.type === 'eip4844')
        return {
          ...transaction,
          sidecars: false,
        }
      return transaction
    })();
    const hexSignature = await this.client.signer.sign(
      this.keyId,
      await this.#getClientShare(),
      keccak256(serializer(signableTransaction))
    );
    const signature = parseSignature(hexSignature as Hex);

    return serializer(transaction, signature) as SignTransactionReturnType;
  }

  private async signTypedData<
    const typedData extends TypedData | Record<string, unknown>,
    primaryType extends keyof typedData | 'EIP712Domain' = keyof typedData,
  >(
    typedDataDefinition: TypedDataDefinition<typedData, primaryType>,
  ): Promise<Hash> {
    const clientShare = await this.#getClientShare();
    const hash = hashTypedData(typedDataDefinition);
    return this.client.signer.sign(this.keyId, clientShare, hash) as Promise<Hash>;

  }

  transfer(to: Address, value: bigint): Promise<Hash> {
    return this.walletClient.sendTransaction({ to, value });
  }
  /** */

  /**
   * Sums two numbers using the WebAssembly API. This method is for testing purposes only.
   */
  add(a: number, b: number) {
    return this.client.signer.add(a, b);
  }
}

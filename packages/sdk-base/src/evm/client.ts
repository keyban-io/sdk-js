import type { Chain, PublicClient, Transport } from "viem";
import {
  createPublicClient,
  createWalletClient,
  hashMessage,
  hashTypedData,
  http,
  keccak256,
  parseSignature,
  serializeTransaction,
} from "viem";
import { publicKeyToAddress, toAccount } from "viem/accounts";
import * as chains from "viem/chains";

import { KeybanClientBase } from "~/client";
import { KeybanEvmAccount } from "~/evm/account";
import { KeybanChain, KeybanClientConfig } from "~/index";

export class KeybanEvmClient extends KeybanClientBase {
  #viem: {
    chain: Chain;
    transport: Promise<Transport>;
    publicClient: Promise<PublicClient<Transport, Chain>>;
  };

  #pendingAccounts: Map<string, Promise<KeybanEvmAccount>> = new Map();

  constructor(config: KeybanClientConfig) {
    super(config);

    const metadataUrl = new URL("/metadata", this.apiUrl);
    metadataUrl.searchParams.set("chain", this.chain);

    const chain = {
      [KeybanChain.KeybanTestnet]: chains.anvil,
      [KeybanChain.PolygonAmoy]: chains.polygonAmoy,
      [KeybanChain.Starknet]: null,
    }[this.chain]!;

    const transport = fetch(metadataUrl)
      .then((res) => res.json())
      .then((config) => http(config.chain.rpcUrl));

    const publicClient = transport.then((transport) =>
      createPublicClient({ chain, transport }),
    );

    this.#viem = { chain, transport, publicClient };
  }

  async initialize(): Promise<KeybanEvmAccount> {
    const sub = "WHATEVER";

    const pending = this.#pendingAccounts.get(sub);
    if (pending) return pending;

    const promise = (async () => {
      let clientShare = await this.clientShareProvider.get();
      if (!clientShare) {
        clientShare = await this.rpcClient.call("ecdsa", "dkg");
        await this.clientShareProvider.set(clientShare);
      }

      const publicKey = await this.rpcClient.call(
        "ecdsa",
        "publicKey",
        clientShare,
      );

      const account = toAccount({
        address: publicKeyToAddress(publicKey),
        signMessage: async ({ message }) => {
          const hash = hashMessage(message, "hex");
          return this.rpcClient.call("ecdsa", "sign", clientShare, hash);
        },
        signTransaction: async (transaction, options) => {
          const serializer = options?.serializer ?? serializeTransaction;

          // For EIP-4844 Transactions, we want to sign the transaction payload body (tx_payload_body) without the sidecars (i.e., without the network wrapper).
          // See: https://github.com/ethereum/EIPs/blob/e00f4daa66bd56e2dbd5f1d36d09fd613811a48b/EIPS/eip-4844.md#networking
          const signableTransaction =
            transaction.type === "eip4844"
              ? { ...transaction, sidecars: false }
              : transaction;

          const signature = await this.rpcClient
            .call(
              "ecdsa",
              "sign",
              clientShare,
              keccak256(serializer(signableTransaction)),
            )
            .then(parseSignature);

          return serializer(transaction, signature);
        },
        signTypedData: async (typedDataDefinition) => {
          const hash = hashTypedData(typedDataDefinition);
          return this.rpcClient.call("ecdsa", "sign", clientShare, hash);
        },
      });

      // Assign the public key to the account
      account.publicKey = publicKey;

      const publicClient = await this.#viem.publicClient;
      const walletClient = createWalletClient({
        chain: publicClient.chain,
        transport: await this.#viem.transport,
        account,
      });

      return new KeybanEvmAccount(publicClient, walletClient);
    })();

    this.#pendingAccounts.set(sub, promise);
    promise.catch(() => {}).finally(() => this.#pendingAccounts.delete(sub));

    return promise;
  }
}

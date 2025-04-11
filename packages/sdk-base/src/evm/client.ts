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

import { KeybanClientBase, KeybanClientConfig, MetadataConfig } from "~/client";
import { KeybanEvmAccount } from "~/evm/account";
import { KeybanNetwork } from "~/network";

export class KeybanEvmClient extends KeybanClientBase {
  #viem: {
    chain: Chain;
    transport: Promise<Transport>;
    publicClient: Promise<PublicClient<Transport, Chain>>;
  };

  constructor(
    config: KeybanClientConfig,
    metadataConfig?: Promise<MetadataConfig>,
  ) {
    super(config, metadataConfig);

    const transport = this.metadataConfig.then((config) =>
      http(config.network.rpcUrl),
    );

    const chain = {
      [KeybanNetwork.EthereumAnvil]: chains.anvil,
      [KeybanNetwork.PolygonAmoy]: chains.polygonAmoy,
      [KeybanNetwork.StarknetDevnet]: null,
      [KeybanNetwork.StarknetSepolia]: null,
      [KeybanNetwork.StarknetMainnet]: null,
      [KeybanNetwork.StellarQuickstart]: null,
      [KeybanNetwork.StellarTestnet]: null,
    }[this.network]!;

    const publicClient = transport.then((transport) =>
      createPublicClient({ chain, transport }),
    );

    this.#viem = { chain, transport, publicClient };
  }

  async initialize(): Promise<KeybanEvmAccount> {
    let clientShare = await this.clientShareProvider.get("ecdsa");
    if (!clientShare) {
      clientShare = await this.rpcClient.call("ecdsa", "dkg");
      await this.clientShareProvider.set("ecdsa", clientShare);
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

    return new KeybanEvmAccount(this.rpcClient, publicClient, walletClient);
  }
}

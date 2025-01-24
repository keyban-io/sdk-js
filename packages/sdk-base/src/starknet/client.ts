import { ETransactionVersion } from "@starknet-io/types-js";
import { Account, RpcProvider } from "starknet";

import { KeybanClientBase, KeybanClientConfig, MetadataConfig } from "~/client";
import { Hex } from "~/index";
import { KeybanStarknetAccount } from "~/starknet/account";
import { calculateAddress, StarknetSigner } from "~/starknet/signer";

export class KeybanStarknetClient extends KeybanClientBase {
  #starknetRpcProvider: Promise<RpcProvider>;

  constructor(
    config: KeybanClientConfig,
    metadataConfig?: Promise<MetadataConfig>,
  ) {
    super(config, metadataConfig);

    this.#starknetRpcProvider = this.metadataConfig.then(
      (config) => new RpcProvider({ nodeUrl: config.chain.rpcUrl }),
    );
  }

  async initialize(): Promise<KeybanStarknetAccount> {
    let clientShare = await this.clientShareProvider.get();
    if (!clientShare) {
      clientShare = await this.rpcClient.call("ecdsa", "dkg", this.chain);
      await this.clientShareProvider.set(clientShare);
    }

    const ethPublicKey = await this.rpcClient.call(
      "ecdsa",
      "publicKey",
      clientShare,
    );
    // remove the Ethereum prefix
    const publicKey: Hex = `0x${ethPublicKey.slice(4)}`;

    const signer = new StarknetSigner(this.rpcClient, clientShare, publicKey);

    const address = calculateAddress(publicKey);

    const account = new Account(
      await this.#starknetRpcProvider,
      address,
      signer,
      undefined,
      ETransactionVersion.V3,
    );

    return new KeybanStarknetAccount(account, publicKey);
  }
}

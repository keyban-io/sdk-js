import { ETransactionVersion } from "@starknet-io/types-js";
import { Account, RpcProvider } from "starknet";

import { KeybanClientBase, KeybanClientConfig, MetadataConfig } from "~/client";
import { Hex } from "~/index";
import { StarknetAccount } from "~/starknet/account";
import { StarknetSigner } from "~/starknet/signer";

export class StarknetClient extends KeybanClientBase {
  #rpcProvider: Promise<RpcProvider>;

  constructor(
    config: KeybanClientConfig,
    metadataConfig?: Promise<MetadataConfig>,
  ) {
    super(config, metadataConfig);

    this.#rpcProvider = this.metadataConfig.then(
      (config) => new RpcProvider({ nodeUrl: config.network.rpcUrl }),
    );
  }

  async initialize(): Promise<StarknetAccount> {
    let clientShare = await this.clientShareProvider.get("ecdsa");
    if (!clientShare) {
      clientShare = await this.rpcClient.call("ecdsa", "dkg");
      console.log("CLIENT SHARE", clientShare);
      await this.clientShareProvider.set("ecdsa", clientShare);
    }

    const [provider, publicKey, address] = await Promise.all([
      this.#rpcProvider,
      this.rpcClient
        .call("ecdsa", "publicKey", clientShare)
        // remove the 04 prefix from the public key (it's the ECDSA uncompressed key prefix)
        .then((ethPublicKey): Hex => `0x${ethPublicKey.slice(4)}`),
      this.rpcClient.call("account", "getAddress"),
    ]);

    const signer = new StarknetSigner(this.rpcClient, clientShare, publicKey);

    const account = new Account(
      provider,
      address,
      signer,
      undefined,
      ETransactionVersion.V3,
    );

    return new StarknetAccount(this.rpcClient, account, publicKey);
  }
}

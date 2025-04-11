import { rpc, StrKey } from "@stellar/stellar-sdk";
import { Buffer } from "buffer";

import { KeybanClientBase, KeybanClientConfig, MetadataConfig } from "~/client";

import { StellarAccount } from "./account";

export class StellarClient extends KeybanClientBase {
  #rpcProvider: Promise<rpc.Server>;

  constructor(
    config: KeybanClientConfig,
    metadataConfig?: Promise<MetadataConfig>,
  ) {
    super(config, metadataConfig);

    this.#rpcProvider = this.metadataConfig.then(
      (config) => new rpc.Server(config.network.rpcUrl),
    );
  }

  async initialize(): Promise<StellarAccount> {
    let clientShare = await this.clientShareProvider.get("eddsa");
    if (!clientShare) {
      clientShare = await this.rpcClient.call("eddsa", "dkg");
      await this.clientShareProvider.set("eddsa", clientShare);
    }

    const [provider, publicKey, address] = await Promise.all([
      this.#rpcProvider,
      this.rpcClient
        .call("eddsa", "publicKey", clientShare)
        .then((publicKey): string =>
          StrKey.encodeEd25519PublicKey(Buffer.from(publicKey, "hex")),
        ),
      this.rpcClient.call("account", "getAddress"),
    ]);

    console.log(provider, address);

    return new StellarAccount(this.rpcClient, publicKey);
  }
}

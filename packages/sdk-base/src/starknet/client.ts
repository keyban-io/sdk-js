import { Account, CallData, hash, RpcProvider } from "starknet";

import { KeybanClientBase, KeybanClientConfig, MetadataConfig } from "~/client";
import { Hex } from "~/index";
import { RpcClient } from "~/rpc";
import { KeybanStarknetAccount } from "~/starknet/account";
import { StarknetSigner } from "~/starknet/signer";

import { ETH_ACCOUNT_ABI } from "./abi";

export class KeybanStarknetClient extends KeybanClientBase {
  #starknetRpcProvider: Promise<RpcProvider>;

  constructor(
    config: KeybanClientConfig,
    rpcClient?: RpcClient,
    metadataConfig?: Promise<MetadataConfig>,
  ) {
    super(config, rpcClient, metadataConfig);

    this.#starknetRpcProvider = this.metadataConfig.then(
      (config) => new RpcProvider({ nodeUrl: config.chain.rpcUrl }),
    );
  }

  async initialize(): Promise<KeybanStarknetAccount> {
    let clientShare = await this.clientShareProvider.get();
    if (!clientShare) {
      clientShare = await this.rpcClient.call("ecdsa", "dkg");
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

    // Precalculate auto-deployed account address: Tobe replaced with a backend call
    const address = (() => {
      const accountEthClassHash =
        "0x0311737c7db7a2d377035b5907b4020f423722bef36f0643212248b78a206962"; // Result of pnpm run generate-class-hash.
      const myCallData = new CallData(ETH_ACCOUNT_ABI);
      const tssAccountconstructorCalldata = myCallData.compile("constructor", {
        public_key: publicKey,
      });
      return hash.calculateContractAddressFromHash(
        "0",
        accountEthClassHash,
        tssAccountconstructorCalldata,
        0,
      );
    })();

    const account = new Account(
      await this.#starknetRpcProvider,
      address,
      signer,
    );

    return new KeybanStarknetAccount(account, publicKey);
  }
}

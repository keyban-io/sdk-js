import { KeybanClientBase, KeybanClientConfig, MetadataConfig } from "~/client";

import { KeybanAccount } from "..";

export class StellarClient extends KeybanClientBase {
  constructor(
    config: KeybanClientConfig,
    metadataConfig?: Promise<MetadataConfig>,
  ) {
    super(config, metadataConfig);
  }

  initialize(): Promise<KeybanAccount> {
    throw new Error("Method not implemented.");
  }
}

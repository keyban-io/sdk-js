import { KeybanClientBase } from "~/client";
import { KeybanClientConfig } from "~/index";
import { KeybanStarknetAccount } from "~/starknet/account";

export class KeybanEvmClient extends KeybanClientBase {
  constructor(config: KeybanClientConfig) {
    super(config);
  }

  async initialize(): Promise<KeybanStarknetAccount> {
    throw new Error("Unimplemented");
  }
}

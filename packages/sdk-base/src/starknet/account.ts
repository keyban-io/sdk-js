/* eslint-disable @typescript-eslint/no-unused-vars */
import { Account } from "starknet";

import {
  type Address,
  EstimateERC20TransferParams,
  EstimateNftTransferParams,
  FeesEstimation,
  type Hash,
  type Hex,
  KeybanAccount,
  TransactionOptions,
  TransferERC20Params,
  TransferNftParams,
} from "~/index";

export class KeybanStarknetAccount implements KeybanAccount {
  #account: Account;

  address: Address;
  publicKey: Hex;

  constructor(account: Account, publicKey: Hex) {
    this.#account = account;

    this.address = account.address as Address;
    this.publicKey = publicKey;
  }

  async signMessage(message: string): Promise<string[]> {
    // From string message to typedData message
    const typedMessage = {
      types: {
        StarkNetDomain: [
          { name: "name", type: "felt" },
          { name: "version", type: "felt" },
          { name: "chainId", type: "felt" },
        ],
        Message: [{ name: "message", type: "felt" }],
      },
      primaryType: "Message",
      domain: {
        name: "StarkNet Message",
        version: "1",
        chainId: 1,
      },
      message: { message },
    };
    // Sign the typedData formatted message
    const signedMessage = (await this.#account.signMessage(
      typedMessage,
    )) as string[];
    return signedMessage;
  }

  async transfer(
    _to: Address,
    _value: bigint,
    _txOptions?: TransactionOptions,
  ): Promise<Hash> {
    throw new Error("Unimplemented");
  }

  async estimateTransfer(_to: Address): Promise<FeesEstimation> {
    throw new Error("Unimplemented");
  }

  async transferERC20(_params: TransferERC20Params): Promise<Hash> {
    throw new Error("Unimplemented");
  }

  async estimateERC20Transfer(
    _params: EstimateERC20TransferParams,
  ): Promise<FeesEstimation> {
    throw new Error("Unimplemented");
  }

  async transferNft(_params: TransferNftParams): Promise<Hash> {
    throw new Error("Unimplemented");
  }
  async estimateNftTransfer(
    _params: EstimateNftTransferParams,
  ): Promise<FeesEstimation> {
    throw new Error("Unimplemented");
  }
}

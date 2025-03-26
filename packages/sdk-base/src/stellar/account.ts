/* eslint-disable @typescript-eslint/no-unused-vars */
import { Account } from "@stellar/stellar-sdk";

import { RpcClient } from "~/rpc";

import {
  Address,
  EstimateERC20TransferParams,
  EstimateNftTransferParams,
  FeesEstimation,
  Hash,
  Hex,
  KeybanAccount,
  TransactionOptions,
  TransferERC20Params,
  TransferNftParams,
} from "..";

export class StellarAccount extends KeybanAccount {
  #account: Account;

  address: `0x${string}`;
  publicKey: `0x${string}`;

  constructor(rpcClient: RpcClient, account: Account, publicKey: Hex) {
    super(rpcClient);

    this.#account = account;
    console.log(this.#account);
    this.address = "0x"; // stellar addresses aren't hexa https://stellar.github.io/js-stellar-sdk/Address.html#Address
    this.publicKey = publicKey; // account.accountId == publicKey == address
  }

  async signMessage(_message: string): Promise<Hex | string[]> {
    throw new Error("Method not implemented.");
  }

  async transfer(
    _to: Address,
    _value: bigint,
    _txOptions?: TransactionOptions,
  ): Promise<Hash> {
    throw new Error("Method not implemented.");
  }

  estimateTransfer(_to: Address): Promise<FeesEstimation> {
    throw new Error("Method not implemented.");
  }

  transferERC20(_params: TransferERC20Params): Promise<Hash> {
    throw new Error("Method not implemented.");
  }

  estimateERC20Transfer(
    _params: EstimateERC20TransferParams,
  ): Promise<FeesEstimation> {
    throw new Error("Method not implemented.");
  }

  transferNft(_params: TransferNftParams): Promise<Hash> {
    throw new Error("Method not implemented.");
  }

  estimateNftTransfer(
    _params: EstimateNftTransferParams,
  ): Promise<FeesEstimation> {
    throw new Error("Method not implemented.");
  }
}

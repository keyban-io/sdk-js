/* eslint-disable @typescript-eslint/no-unused-vars */

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
  address: string;
  publicKey: string;

  constructor(rpcClient: RpcClient, publicKey: string) {
    super(rpcClient);

    this.address = publicKey; // stellar addresses aren't hexa https://stellar.github.io/js-stellar-sdk/Address.html#Address
    this.publicKey = publicKey; // account.accountId == publicKey == address
  }

  async signMessage(_message: string): Promise<Hex | string[]> {
    throw new Error("signMessage not implemented.");
  }

  async transfer(
    _to: Address,
    _value: bigint,
    _txOptions?: TransactionOptions,
  ): Promise<Hash> {
    throw new Error("transfer not implemented.");
  }

  estimateTransfer(_to: Address): Promise<FeesEstimation> {
    throw new Error("estimateTransfer not implemented.");
  }

  transferERC20(_params: TransferERC20Params): Promise<Hash> {
    throw new Error("transferERC20 not implemented.");
  }

  estimateERC20Transfer(
    _params: EstimateERC20TransferParams,
  ): Promise<FeesEstimation> {
    throw new Error("estimateERC20Transfer not implemented.");
  }

  transferNft(_params: TransferNftParams): Promise<Hash> {
    throw new Error("transferNft not implemented.");
  }

  estimateNftTransfer(
    _params: EstimateNftTransferParams,
  ): Promise<FeesEstimation> {
    throw new Error("estimateNftTransfer not implemented.");
  }
}

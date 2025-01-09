/* eslint-disable @typescript-eslint/no-unused-vars */
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
  constructor() {}

  get address(): Address {
    throw new Error("Unimplemented");
  }

  get publicKey(): Hex {
    throw new Error("Unimplemented");
  }

  async signMessage(_message: string): Promise<Hex> {
    throw new Error("Unimplemented");
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

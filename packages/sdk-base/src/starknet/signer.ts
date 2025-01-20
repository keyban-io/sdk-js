import {
  ETransactionVersion2,
  ETransactionVersion3,
} from "@starknet-io/types-js";
import {
  Call,
  CallData,
  DeclareSignerDetails,
  DeployAccountSignerDetails,
  encode,
  hash,
  InvocationsSignerDetails,
  num,
  Signature,
  SignerInterface,
  stark,
  transaction,
  TypedData,
  typedData as tData,
  Uint256,
  uint256,
  V2DeclareSignerDetails,
  V2DeployAccountSignerDetails,
  V2InvocationsSignerDetails,
  V3DeclareSignerDetails,
  V3DeployAccountSignerDetails,
  V3InvocationsSignerDetails,
} from "starknet";
import { parseSignature, type Signature as ECDSASignature } from "viem";

import { Hex } from "~/index";
import { RpcClient } from "~/rpc";

import { ETH_ACCOUNT_ABI, ETH_ACCOUNT_CLASS_HASH } from "./const";

export class StarknetSigner implements SignerInterface {
  #rpcClient: RpcClient;
  #clientShare: string;
  #publicKey: Hex;

  constructor(rpcClient: RpcClient, clientShare: string, publicKey: Hex) {
    this.#rpcClient = rpcClient;
    this.#clientShare = clientShare;
    this.#publicKey = publicKey;
  }

  async getPubKey(): Promise<string> {
    return this.#publicKey;
  }

  async #signHashedMessage(hashedMessage: string): Promise<Signature> {
    return this.#rpcClient
      .call(
        "ecdsa",
        "sign",
        this.#clientShare,
        encode.removeHexPrefix(encode.sanitizeHex(hashedMessage)),
      )
      .then(parseSignature)
      .then(formatSignature);
  }

  async signMessage(
    typedData: TypedData,
    accountAddress: string,
  ): Promise<Signature> {
    const msgHash = tData.getMessageHash(typedData, accountAddress);
    return this.#signHashedMessage(msgHash);
  }

  async signTransaction(
    transactions: Call[],
    details: InvocationsSignerDetails,
  ): Promise<Signature> {
    const compiledCalldata = transaction.getExecuteCalldata(
      transactions,
      details.cairoVersion,
    );
    let msgHash;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (Object.values(ETransactionVersion2).includes(details.version as any)) {
      const det = details as V2InvocationsSignerDetails;
      msgHash = hash.calculateInvokeTransactionHash({
        ...det,
        senderAddress: det.walletAddress,
        compiledCalldata,
        version: det.version,
      });
    } else if (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Object.values(ETransactionVersion3).includes(details.version as any)
    ) {
      const det = details as V3InvocationsSignerDetails;
      msgHash = hash.calculateInvokeTransactionHash({
        ...det,
        senderAddress: det.walletAddress,
        compiledCalldata,
        version: det.version,
        nonceDataAvailabilityMode: stark.intDAM(det.nonceDataAvailabilityMode),
        feeDataAvailabilityMode: stark.intDAM(det.feeDataAvailabilityMode),
      });
    } else {
      throw Error("unsupported signTransaction version");
    }
    return this.#signHashedMessage(msgHash);
  }

  async signDeployAccountTransaction(
    details: DeployAccountSignerDetails,
  ): Promise<Signature> {
    const compiledConstructorCalldata = CallData.compile(
      details.constructorCalldata,
    );
    let msgHash;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (Object.values(ETransactionVersion2).includes(details.version as any)) {
      const det = details as V2DeployAccountSignerDetails;
      msgHash = hash.calculateDeployAccountTransactionHash({
        ...det,
        salt: det.addressSalt,
        constructorCalldata: compiledConstructorCalldata,
        version: det.version,
      });
    } else if (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Object.values(ETransactionVersion3).includes(details.version as any)
    ) {
      const det = details as V3DeployAccountSignerDetails;
      msgHash = hash.calculateDeployAccountTransactionHash({
        ...det,
        salt: det.addressSalt,
        compiledConstructorCalldata,
        version: det.version,
        nonceDataAvailabilityMode: stark.intDAM(det.nonceDataAvailabilityMode),
        feeDataAvailabilityMode: stark.intDAM(det.feeDataAvailabilityMode),
      });
    } else {
      throw Error("unsupported signDeployAccountTransaction version");
    }

    return this.#signHashedMessage(msgHash);
  }

  async signDeclareTransaction(
    details: DeclareSignerDetails,
  ): Promise<Signature> {
    let msgHash;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (Object.values(ETransactionVersion2).includes(details.version as any)) {
      const det = details as V2DeclareSignerDetails;
      msgHash = hash.calculateDeclareTransactionHash({
        ...det,
        version: det.version,
      });
    } else if (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Object.values(ETransactionVersion3).includes(details.version as any)
    ) {
      const det = details as V3DeclareSignerDetails;
      msgHash = hash.calculateDeclareTransactionHash({
        ...det,
        version: det.version,
        nonceDataAvailabilityMode: stark.intDAM(det.nonceDataAvailabilityMode),
        feeDataAvailabilityMode: stark.intDAM(det.feeDataAvailabilityMode),
      });
    } else {
      throw Error("unsupported signDeclareTransaction version");
    }

    return this.#signHashedMessage(msgHash);
  }
}

/**
 * Formats the ECDSA signature to the StarkNet format based on the OZ EthAccount.
 * @param ethSignature - The ECDSA signature.
 * @returns - The StarkNet formatted signature.
 */
function formatSignature(ethSignature: ECDSASignature) {
  const r: Uint256 = uint256.bnToUint256(ethSignature.r);
  const s: Uint256 = uint256.bnToUint256(ethSignature.s);
  if (!ethSignature.yParity) throw Error("yParity is required");
  return [
    num.toHex(r.low),
    num.toHex(r.high),
    num.toHex(s.low),
    num.toHex(s.high),
    num.toHex(ethSignature.yParity),
  ];
}

/**
 * Calculates the StarkNet address based on the public key.
 * Note that it uses a salt of 0 and assumes an origin-independent account (not bound to a deployer).
 * @param publicKey - The public key.
 * @returns The StarkNet address.
 */
export function calculateAddress(publicKey: Hex): string {
  const myCallData = new CallData(ETH_ACCOUNT_ABI);
  const tssAccountconstructorCalldata = myCallData.compile("constructor", {
    public_key: publicKey,
  });
  return hash.calculateContractAddressFromHash(
    "0",
    ETH_ACCOUNT_CLASS_HASH,
    tssAccountconstructorCalldata,
    0,
  );
}

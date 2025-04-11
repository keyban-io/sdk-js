import {
  type Chain,
  type ContractFunctionExecutionErrorType,
  erc20Abi,
  erc721Abi,
  EstimateGasExecutionError,
  getContract,
  InsufficientFundsError,
  isAddress,
  type LocalAccount,
  type PublicClient,
  type Transport,
  type WalletClient,
} from "viem";

import { SdkError } from "~/errors";
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
import { RpcClient } from "~/rpc";

const ERC1155_ABI_TRANSFER_FROM = [
  {
    type: "function",
    name: "safeTransferFrom",
    inputs: [
      { name: "from", type: "address", internalType: "address" },
      { name: "to", type: "address", internalType: "address" },
      { name: "id", type: "uint256", internalType: "uint256" },
      { name: "value", type: "uint256", internalType: "uint256" },
      { name: "data", type: "bytes", internalType: "bytes" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
];

export class KeybanEvmAccount extends KeybanAccount {
  #publicClient: PublicClient<Transport, Chain>;
  #walletClient: WalletClient<Transport, Chain, LocalAccount>;

  constructor(
    rpcClient: RpcClient,
    publicClient: PublicClient<Transport, Chain>,
    walletClient: WalletClient<Transport, Chain, LocalAccount>,
  ) {
    super(rpcClient);

    this.#publicClient = publicClient;
    this.#walletClient = walletClient;
  }

  get address(): Address {
    return this.#walletClient.account.address.toLowerCase() as Address;
  }

  get publicKey(): Hex {
    return this.#walletClient.account.publicKey.toLowerCase() as Hex;
  }

  async signMessage(message: string): Promise<Hex> {
    // For now, even EDDSA messages are prefixed with the Ethereum message prefix.
    // This may need to be updated when the eddsa signer is associated with a specific chain (e.g., Solana).
    return this.#walletClient.signMessage({ message });
  }

  async transfer(
    to: Address,
    value: bigint,
    txOptions?: TransactionOptions,
  ): Promise<Hash> {
    if (!isAddress(to)) {
      throw new SdkError(
        SdkError.types.AddressInvalid,
        "KeybanAccount.transfer",
      );
    }

    if (value <= 0n) {
      throw new SdkError(
        SdkError.types.AmountInvalid,
        "KeybanAccount.transfer",
      );
    }

    return this.#walletClient
      .sendTransaction({
        to,
        value,
        type: "eip1559",
        maxFeePerGas: txOptions?.maxFeePerGas,
        maxPriorityFeePerGas: txOptions?.maxPriorityFeePerGas,
      })
      .catch((err) => {
        throw err.cause;
      });
  }

  async estimateTransfer(to: Address): Promise<FeesEstimation> {
    const [{ maxFeePerGas, maxPriorityFeePerGas }, gasCost] = await Promise.all(
      [
        this.#publicClient.estimateFeesPerGas({ type: "eip1559" }),
        this.#publicClient.estimateGas({
          to: to as `0x${string}`,
          account: this.address as `0x${string}`,
        }),
      ],
    );

    return {
      maxFees: maxFeePerGas * gasCost,
      details: {
        maxFeePerGas,
        maxPriorityFeePerGas,
        gasCost,
      },
    };
  }

  async transferERC20(params: TransferERC20Params): Promise<Hash> {
    const { contractAddress, to, value, txOptions } = params;

    if (!isAddress(to)) {
      throw new SdkError(
        SdkError.types.AddressInvalid,
        "KeybanAccount.transferERC20",
      );
    }
    if (!isAddress(contractAddress)) {
      throw new SdkError(
        SdkError.types.AddressInvalid,
        "KeybanAccount.transferERC20",
      );
    }
    if (to === this.address) {
      throw new SdkError(
        SdkError.types.RecipientAddressEqualsSender,
        "KeybanAccount.transferERC20",
      );
    }

    if (value <= 0n) {
      throw new SdkError(
        SdkError.types.AmountInvalid,
        "KeybanAccount.transferERC20",
      );
    }

    const erc20Contract = getContract({
      address: contractAddress,
      abi: erc20Abi,
      client: {
        public: this.#publicClient,
        wallet: this.#walletClient,
      },
    });

    return erc20Contract.write
      .transfer([to, value], txOptions)
      .catch((err: ContractFunctionExecutionErrorType) => {
        switch (true) {
          case err.cause.cause instanceof InsufficientFundsError:
          case err.cause.cause instanceof EstimateGasExecutionError:
            throw new SdkError(
              SdkError.types.InsufficientFunds,
              "KeybanAccount.transferERC20",
            );

          default:
            throw err.cause;
        }
      });
  }

  async estimateERC20Transfer(
    params: EstimateERC20TransferParams,
  ): Promise<FeesEstimation> {
    const { contractAddress, to, value } = params;
    const [{ maxFeePerGas, maxPriorityFeePerGas }, gasCost] = await Promise.all(
      [
        this.#publicClient.estimateFeesPerGas({ type: "eip1559" }),
        this.#publicClient.estimateContractGas({
          address: contractAddress as `0x${string}`,
          abi: erc20Abi,
          functionName: "transfer",
          args: [to as `0x${string}`, value],
          account: this.address as `0x${string}`,
        }),
      ],
    );

    return {
      maxFees: maxFeePerGas * gasCost,
      details: {
        maxFeePerGas,
        maxPriorityFeePerGas,
        gasCost,
      },
    };
  }

  async transferNft(params: TransferNftParams): Promise<Hash> {
    const { contractAddress, tokenId, to, value, standard, txOptions } = params;

    if (!isAddress(to)) {
      throw new SdkError(
        SdkError.types.AddressInvalid,
        "KeybanAccount.transferNft",
      );
    }
    if (!isAddress(contractAddress)) {
      throw new SdkError(
        SdkError.types.AddressInvalid,
        "KeybanAccount.transferNft",
      );
    }
    if (to === this.address) {
      throw new SdkError(
        SdkError.types.RecipientAddressEqualsSender,
        "KeybanAccount.transferNft",
      );
    }

    if (standard === "ERC1155") {
      if (value === undefined) {
        throw new SdkError(
          SdkError.types.AmountRequired,
          "KeybanAccount.transferNft",
        );
      }
      if (value <= 0n) {
        throw new SdkError(
          SdkError.types.AmountInvalid,
          "KeybanAccount.transferNft",
        );
      }
      return this.#transferERC1155({
        contractAddress,
        tokenId,
        value,
        to,
        txOptions,
      });
    }

    if (standard === "ERC721") {
      if (value !== undefined && value !== 1n) {
        throw new SdkError(
          SdkError.types.AmountIrrelevant,
          "KeybanAccount.transferNft",
        );
      }
      return this.#transferERC721({ contractAddress, tokenId, to, txOptions });
    }

    throw new SdkError(
      SdkError.types.InvalidNftStandard,
      "KeybanAccount.transferNft",
    );
  }

  async #transferERC721({
    contractAddress,
    tokenId,
    to,
    txOptions,
  }: Omit<TransferNftParams, "value" | "standard">): Promise<Hash> {
    const erc721Contract = getContract({
      address: contractAddress as `0x${string}`,
      abi: erc721Abi,
      client: {
        public: this.#publicClient,
        wallet: this.#walletClient,
      },
    });

    const from = this.address;
    return erc721Contract.write
      .transferFrom(
        [from as `0x${string}`, to as `0x${string}`, tokenId],
        txOptions,
      )
      .catch((err: ContractFunctionExecutionErrorType) => {
        switch (true) {
          case err.cause.cause instanceof InsufficientFundsError:
          case err.cause.cause instanceof EstimateGasExecutionError:
            throw new SdkError(
              SdkError.types.InsufficientFunds,
              "KeybanAccount.transferNft",
            );

          default:
            throw err.cause;
        }
      });
  }

  async #transferERC1155({
    contractAddress,
    tokenId,
    value,
    to,
    txOptions,
  }: Omit<TransferNftParams, "standard">): Promise<Hash> {
    const erc1155Contract = getContract({
      address: contractAddress as `0x${string}`,
      abi: ERC1155_ABI_TRANSFER_FROM,
      client: {
        public: this.#publicClient,
        wallet: this.#walletClient,
      },
    });

    const from = this.address;
    return erc1155Contract.write
      .safeTransferFrom([from, to, tokenId, value, ""], txOptions)
      .catch((err: ContractFunctionExecutionErrorType) => {
        switch (true) {
          case err.cause.cause instanceof InsufficientFundsError:
          case err.cause.cause instanceof EstimateGasExecutionError:
            throw new SdkError(
              SdkError.types.InsufficientFunds,
              "KeybanAccount.transferNft",
            );

          default:
            throw err.cause;
        }
      });
  }

  async estimateNftTransfer(
    params: EstimateNftTransferParams,
  ): Promise<FeesEstimation> {
    const { standard, contractAddress, tokenId, to, value } = params;

    if (standard === "ERC1155") {
      return this.#estimateERC1155Transfer({
        contractAddress,
        tokenId,
        to,
        value,
      });
    }
    if (standard === "ERC721") {
      if (value !== undefined && value !== 1n) {
        throw new SdkError(
          SdkError.types.AmountIrrelevant,
          "KeybanAccount.transferNft",
        );
      }
      return this.#estimateERC721Transfer({ contractAddress, tokenId, to });
    }
    throw new SdkError(
      SdkError.types.InvalidNftStandard,
      "KeybanAccount.estimateNftTransfer",
    );
  }

  async #estimateERC721Transfer({
    contractAddress,
    tokenId,
    to,
  }: Omit<
    EstimateNftTransferParams,
    "standard" | "value"
  >): Promise<FeesEstimation> {
    const from = this.address;
    const [{ maxFeePerGas, maxPriorityFeePerGas }, gasCost] = await Promise.all(
      [
        this.#publicClient.estimateFeesPerGas({ type: "eip1559" }),
        this.#publicClient.estimateContractGas({
          address: contractAddress as `0x${string}`,
          abi: erc721Abi,
          functionName: "transferFrom",
          args: [from as `0x${string}`, to as `0x${string}`, tokenId],
          account: this.address as `0x${string}`,
        }),
      ],
    );

    return {
      maxFees: maxFeePerGas * gasCost,
      details: {
        maxFeePerGas,
        maxPriorityFeePerGas,
        gasCost,
      },
    };
  }

  async #estimateERC1155Transfer({
    contractAddress,
    tokenId,
    to,
    value,
  }: Omit<EstimateNftTransferParams, "standard">): Promise<FeesEstimation> {
    const from = this.address;
    const [{ maxFeePerGas, maxPriorityFeePerGas }, gasCost] = await Promise.all(
      [
        this.#publicClient.estimateFeesPerGas({ type: "eip1559" }),
        this.#publicClient.estimateContractGas({
          address: contractAddress as `0x${string}`,
          abi: ERC1155_ABI_TRANSFER_FROM,
          functionName: "safeTransferFrom",
          args: [from, to, tokenId, value, ""],
          account: this.address as `0x${string}`,
        }),
      ],
    );

    return {
      maxFees: maxFeePerGas * gasCost,
      details: {
        maxFeePerGas,
        maxPriorityFeePerGas,
        gasCost,
      },
    };
  }
}

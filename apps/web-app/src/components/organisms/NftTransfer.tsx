import React from "react";

import { useErrorBoundary } from "react-error-boundary";
import { Address } from "viem";

import Row from "@/components/atoms/Row";
import SerializedValue from "@/components/atoms/SerializedValue";
import BigIntField from "@/components/molecules/BigIntField";
import TextField from "@/components/molecules/TextField";
import {
  FeesEstimation,
  FormattedBalance,
  useKeybanAccount,
} from "@keyban/sdk-react";

export default function NftTransfer() {
  const { showBoundary } = useErrorBoundary();

  const [account, accountError] = useKeybanAccount({ suspense: true });
  if (accountError) throw accountError;

  const [standard, setStandard] = React.useState<"ERC721" | "ERC1155">(
    "ERC721",
  );
  const [value, setValue] = React.useState(1n);
  const [contractAddress, setContractAddress] = React.useState("");
  const [tokenId, setTokenId] = React.useState(0n);
  const [recipient, setRecipient] = React.useState("");
  const [hash, setHash] = React.useState("");
  const [estimation, setEstimation] = React.useState<FeesEstimation>();

  return (
    <fieldset>
      <legend>NFT transfer</legend>
      <Row>
        <span>Standard:</span>
        <label key="ERC721">
          <input
            type="radio"
            name="standard"
            value="ERC721"
            checked={standard === "ERC721"}
            onChange={() => {
              setStandard("ERC721");
              setValue(1n);
            }}
            data-test-id={"NftTransfer:standard:ERC721"}
          />
          <span>ERC721</span>
        </label>

        <label key="ERC1155">
          <input
            type="radio"
            name="standard"
            value="ERC1155"
            checked={standard === "ERC1155"}
            onChange={() => setStandard("ERC1155")}
            data-test-id={"NftTransfer:standard:ERC1155"}
          />
          <span>ERC1155</span>
        </label>
      </Row>

      <TextField
        label="Contract Address"
        value={contractAddress}
        onChange={setContractAddress}
        data-test-id="NftTransfer:contractAddress"
      />

      <BigIntField
        label="TokenId"
        value={tokenId?.toString()}
        onChange={setTokenId}
        style={{ marginBlock: 0 }}
        data-test-id="NftTransfer:tokenId"
      />

      <Row>
        <BigIntField
          label="Value"
          value={value?.toString()}
          onChange={setValue}
          disabled={standard === "ERC721"}
          style={{ marginBlock: 0 }}
          data-test-id="NftTransfer:rawValue"
        />
      </Row>

      <TextField
        label="Recipient"
        value={recipient}
        onChange={setRecipient}
        data-test-id="NftTransfer:recipient"
      />

      <Row>
        <button
          type="button"
          onClick={() =>
            account
              .estimateNftTransfer({
                standard,
                contractAddress: contractAddress as Address,
                tokenId,
                to: recipient as Address,
                value: standard === "ERC1155" ? value : undefined,
              })
              .then(setEstimation)
              .catch(showBoundary)
          }
          data-test-id="NftTransfer:estimate:submit"
        >
          Estimate max tx fees
        </button>
      </Row>

      {estimation && (
        <Row>
          <span>Estimation:</span>
          <SerializedValue
            value={estimation.maxFees}
            style={{ flexGrow: 1 }}
            data-test-id="NftTransfer:estimate:rawValue"
          />
          <div data-test-id="NftTransfer:estimate:formattedValue">
            <FormattedBalance balance={estimation.maxFees} />
          </div>
        </Row>
      )}

      <Row>
        <button
          type="button"
          onClick={() =>
            account
              .transferNft({
                standard,
                contractAddress: contractAddress as Address,
                tokenId,
                to: recipient as Address,
                value: standard === "ERC1155" ? value : undefined,
                txOptions: {
                  maxFeePerGas: estimation?.details.maxFeePerGas,
                  maxPriorityFeePerGas:
                    estimation?.details.maxPriorityFeePerGas,
                },
              })
              .then(setHash)
              .catch(showBoundary)
          }
          data-test-id="NftTransfer:submit"
        >
          Transfer
        </button>
      </Row>

      <Row>
        <span>Hash:</span>
        <SerializedValue
          value={hash}
          style={{ flexGrow: 1 }}
          data-test-id="NftTransfer:hash"
        />
      </Row>
    </fieldset>
  );
}

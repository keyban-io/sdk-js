import React from "react";

import { useKeybanAccount } from "@keyban/sdk-react";

import Row from "../atoms/Row";
import TextField from "../molecules/TextField";
import NftContainer from "./NftContainer";

export default function NftFetch() {
  const [account, accountError] = useKeybanAccount({ suspense: true });
  if (accountError) throw accountError;

  const [tokenAddressInput, setTokenAddressInput] = React.useState("");
  const [tokenIdInput, setTokenIdInput] = React.useState("");
  const [tokenAddress, setTokenAddress] = React.useState("");
  const [tokenId, setTokenId] = React.useState("");
  const [hasClicked, setHasClicked] = React.useState(false);

  const fetchNft = () => {
    setTokenAddress(tokenAddressInput);
    setTokenId(tokenIdInput);
    setHasClicked(true);
  };

  return (
    <fieldset>
      <legend>
        NFT fetch
      </legend>

      <TextField
        label="Token Address"
        value={tokenAddressInput}
        onChange={setTokenAddressInput}
        data-test-id="NftFetch:tokenAddress"
      />

      <TextField
        label="Token ID"
        value={tokenIdInput}
        onChange={setTokenIdInput}
        data-test-id="NftFetch:tokenId"
      />

      <Row>
        <button
          type="button"
          onClick={fetchNft}
          data-test-id="NftFetch:fetch"
        >
          Fetch NFT
        </button>
      </Row>

      {hasClicked && (
        <NftContainer account={account} tokenAddress={tokenAddress} tokenId={tokenId} />
      )}
    </fieldset>
  );
}

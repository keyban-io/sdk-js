import React from "react";

import SerializedValue from "@/components/atoms/SerializedValue";
import TextField from "@/components/molecules/TextField";
import {
  Address,
  KeybanAccount,
  useKeybanAccount,
  useKeybanAccountNft,
} from "@keyban/sdk-react";

export default function NftFetch() {
  const [account, accountError] = useKeybanAccount();
  if (accountError) throw accountError;

  const [tokenAddress, setTokenAddress] = React.useState<Address>();
  const [tokenId, setTokenId] = React.useState<string>();

  return (
    <fieldset>
      <legend>NFT fetch</legend>

      <TextField
        label="Token Address"
        value={tokenAddress}
        onChange={(value) => setTokenAddress(value as Address)}
        data-test-id="NftFetch:tokenAddress:input"
      />

      <TextField
        label="Token ID"
        value={tokenId}
        onChange={setTokenId}
        data-test-id="NftFetch:tokenId:input"
      />

      {tokenAddress && tokenId && (
        <NftFetchResult
          account={account}
          tokenAddress={tokenAddress}
          tokenId={tokenId}
        />
      )}
    </fieldset>
  );
}

type NftFetchResultProps = {
  account: KeybanAccount;
  tokenAddress: Address;
  tokenId: string;
};

function NftFetchResult({
  account,
  tokenAddress,
  tokenId,
}: NftFetchResultProps) {
  const [nftBalance, nftError] = useKeybanAccountNft(account, tokenAddress, tokenId);
  if (nftError) throw nftError;

  return <SerializedValue value={nftBalance} data-test-id="NftFetch:result:raw" />;
}

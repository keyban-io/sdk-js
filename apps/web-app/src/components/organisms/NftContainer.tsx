import React from "react";

import { Address } from "viem";

import {
  KeybanAccount,
  useKeybanAccountNft,
} from "@keyban/sdk-react";

import RefreshButton from "../atoms/RefreshButton";
import SerializedValue from "../atoms/SerializedValue";

interface NftContainerProps {
  account: KeybanAccount;
  tokenAddress: string;
  tokenId: string;
}

const NftContainer: React.FC<NftContainerProps> = ({ account, tokenAddress, tokenId }) => {
  const [nft, nftError, { refresh }] = useKeybanAccountNft(account, tokenAddress as Address, tokenId);
  if (nftError) throw nftError;

  return (
      <fieldset
      data-test-id={`NftContainer`}
    >
      <legend>
        NFT
        <RefreshButton
          onClick={refresh}
          style={{ marginInlineStart: "0.5ch" }}
          data-test-id="NftContainer:refresh"
        />
      </legend>

      {nft && (
        <fieldset>
          <legend>Raw</legend>
          <SerializedValue value={nft} data-test-id="NftContainer:token:raw" />
        </fieldset>
      )}
    </fieldset>
  );
};

export default NftContainer;

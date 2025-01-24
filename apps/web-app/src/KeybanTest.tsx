import { KeybanChain, useKeybanClient } from "@keyban/sdk-react";
import React from "react";

import ApiStatus from "~/components/organisms/ApiStatus";
import Auth from "~/components/organisms/Auth";
import Balance from "~/components/organisms/Balance";
import ERC20Transfer from "~/components/organisms/ERC20Transfer";
import NativeCurrency from "~/components/organisms/NativeCurrency";
import NativeTransfer from "~/components/organisms/NativeTransfer";
import Nft from "~/components/organisms/Nft";
import NftFetch from "~/components/organisms/NftFetch";
import NftTransfer from "~/components/organisms/NftTransfer";
import Signature from "~/components/organisms/Signature";
import TokenBalances from "~/components/organisms/TokenBalances";
import TransferHistory from "~/components/organisms/TransferHistory";
import WalletInfo from "~/components/organisms/WalletInfo";

const wrapSuspense = (Comp: React.ComponentType) => (
  <React.Suspense fallback={<div>Loading...</div>}>
    <Comp />
  </React.Suspense>
);

export default function KeybanTest() {
  const client = useKeybanClient();
  const isStarknet =
    client.chain === KeybanChain.StarknetDevnet ||
    client.chain === KeybanChain.StarknetSepolia;

  const [init, setInit] = React.useState(false);

  return (
    <>
      <NativeCurrency />

      <Auth />

      <fieldset>
        <legend>Init</legend>
        <button onClick={() => setInit(true)} data-test-id="KeybanTest:init">
          Init
        </button>
      </fieldset>

      {wrapSuspense(ApiStatus)}

      {init && (
        <>
          {wrapSuspense(WalletInfo)}
          {wrapSuspense(Signature)}
          {!isStarknet && wrapSuspense(Balance)}
          {!isStarknet && wrapSuspense(NativeTransfer)}
          {!isStarknet && wrapSuspense(TokenBalances)}
          {!isStarknet && wrapSuspense(ERC20Transfer)}
          {!isStarknet && wrapSuspense(Nft)}
          {!isStarknet && wrapSuspense(NftFetch)}
          {!isStarknet && wrapSuspense(NftTransfer)}
          {!isStarknet && wrapSuspense(TransferHistory)}
        </>
      )}
    </>
  );
}

import React from "react";

import AccountInfo from "@/components/organisms/AccountInfo";
import ApiStatus from "@/components/organisms/ApiStatus";
import Balance from "@/components/organisms/Balance";
import ERC20Transfer from "@/components/organisms/ERC20Transfer";
import NativeCurrency from "@/components/organisms/NativeCurrency";
import NativeTransfer from "@/components/organisms/NativeTransfer";
import Nft from "@/components/organisms/Nft";
import NftFetch from "@/components/organisms/NftFetch";
import NftTransfer from "@/components/organisms/NftTransfer";
import Signature from "@/components/organisms/Signature";
import TokenBalances from "@/components/organisms/TokenBalances";
import TransferHistory from "@/components/organisms/TransferHistory";

const wrapSuspense = (Comp: React.ComponentType) => (
  <React.Suspense fallback={<div>Loading...</div>}>
    <Comp />
  </React.Suspense>
);

export default function KeybanTest() {
  const [init, setInit] = React.useState(false);

  return (
    <>
      <fieldset>
        <legend>Client</legend>

        {wrapSuspense(ApiStatus)}

        <NativeCurrency />
      </fieldset>

      <fieldset>
        <legend>Init</legend>
        <button onClick={() => setInit(true)} data-test-id="KeybanTest:init">
          Init
        </button>
      </fieldset>

      {init && (
        <>
          {wrapSuspense(AccountInfo)}
          {wrapSuspense(Signature)}
          {wrapSuspense(Balance)}
          {wrapSuspense(NativeTransfer)}
          {wrapSuspense(TokenBalances)}
          {wrapSuspense(ERC20Transfer)}
          {wrapSuspense(Nft)}
          {wrapSuspense(NftFetch)}
          {wrapSuspense(NftTransfer)}
          {wrapSuspense(TransferHistory)}
        </>
      )}
    </>
  );
}

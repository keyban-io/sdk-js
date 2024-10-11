import React from "react";

import SerializedValue from "@/components/atoms/SerializedValue";
import AccountInfo from "@/components/organisms/AccountInfo";
import ApiStatus from "@/components/organisms/ApiStatus";
import Balance from "@/components/organisms/Balance";
import NativeCurrency from "@/components/organisms/NativeCurrency";
import NativeTransfer from "@/components/organisms/NativeTransfer";
import Signature from "@/components/organisms/Signature";
import TokenBalances from "@/components/organisms/TokenBalances";
import { useKeybanClient } from "@keyban/sdk-react";

import ERC20Transfer from "./components/organisms/ERC20Transfer";
import Nft from "./components/organisms/Nft";
import NftFetch from "./components/organisms/NftFetch";
import NftTransfer from "./components/organisms/NftTransfer";

const wrapSuspense = (Comp: React.ComponentType) => (
  <React.Suspense fallback={<div>Loading...</div>}>
    <Comp />
  </React.Suspense>
);

export default function KeybanTest() {
  const client = useKeybanClient();

  const [init, setInit] = React.useState(false);

  return (
    <>
      <fieldset>
        <legend>Client</legend>
        <SerializedValue value={client} data-test-id="KeybanTest:client" />

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
        </>
      )}
    </>
  );
}

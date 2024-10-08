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
import NFTTransfer from "./components/organisms/NFTTransfer";

export default function KeybanTest() {
  const client = useKeybanClient();

  const [init, setInit] = React.useState(false);

  return (
    <>
      <fieldset>
        <legend>Client</legend>
        <SerializedValue value={client} data-test-id="KeybanTest:client" />

        <React.Suspense fallback={<div>Loading...</div>}>
          <ApiStatus />
        </React.Suspense>

        <NativeCurrency />
      </fieldset>

      <fieldset>
        <legend>Init</legend>
        <button onClick={() => setInit(true)} data-test-id="KeybanTest:init">
          Init
        </button>
      </fieldset>

      {init && (
        <React.Suspense fallback={<div>Loading...</div>}>
          <AccountInfo />
          <Signature />
          <Balance />
          <NativeTransfer />
          <TokenBalances />
          <ERC20Transfer />
          <Nft />
          <NftFetch />
          <NFTTransfer />
        </React.Suspense>
      )}
    </>
  );
}

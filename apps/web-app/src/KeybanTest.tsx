import React from "react";
import { useKeybanClient } from "@keyban/sdk-react";

import Row from "@/components/atoms/Row";
import SerializedValue from "@/components/atoms/SerializedValue";
import TextField from "@/components/molecules/TextField";
import AccountInfo from "@/components/organisms/AccountInfo";
import Signature from "@/components/organisms/Signature";
import Balance from "@/components/organisms/Balance";
import NativeCurrency from "@/components/organisms/NativeCurrency";
import ApiStatus from "@/components/organisms/ApiStatus";
import NativeTransfer from "@/components/organisms/NativeTransfer";
import TokenBalances from "@/components/organisms/TokenBalances";

export default function KeybanTest() {
  const client = useKeybanClient();

  const keyIdInputRef = React.useRef<HTMLInputElement | null>(null);
  const [keyId, setKeyId] = React.useState<string>();

  return (
    <>
      <fieldset>
        <legend>Client</legend>
        <SerializedValue value={client} data-test-id="client" />

        <React.Suspense fallback={<div>Loading...</div>}>
          <ApiStatus />
        </React.Suspense>

        <NativeCurrency />
      </fieldset>

      <fieldset>
        <legend>Account</legend>

        <Row>
          <TextField
            label="Key ID"
            defaultValue="dumb"
            ref={keyIdInputRef}
            data-test-id="keyId:input"
          />

          <button
            type="button"
            onClick={() => {
              const keyIdValue = keyIdInputRef.current?.value;
              if (keyIdValue) setKeyId(keyIdValue);
            }}
            data-test-id="keyId:submit"
          >
            Init dkg
          </button>
        </Row>
      </fieldset>

      <React.Suspense fallback={<div>Loading...</div>}>
        {keyId && <AccountInfo keyId={keyId} />}
      </React.Suspense>

      <React.Suspense fallback={<div>Loading...</div>}>
        {keyId && <Signature keyId={keyId} />}
      </React.Suspense>

      <React.Suspense fallback={<div>Loading...</div>}>
        {keyId && <Balance keyId={keyId} />}
      </React.Suspense>

      <React.Suspense fallback={<div>Loading...</div>}>
        {keyId && <NativeTransfer keyId={keyId} />}
      </React.Suspense>

      <React.Suspense fallback={<div>Loading...</div>}>
        {keyId && <TokenBalances keyId={keyId} />}
      </React.Suspense>
    </>
  );
}

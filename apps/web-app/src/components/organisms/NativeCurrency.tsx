import { useKeybanClient } from "@keyban/sdk-react";

import SerializedValue from "~/components/atoms/SerializedValue";

export default function NativeCurrency() {
  const { nativeCurrency } = useKeybanClient();

  return (
    <fieldset>
      <legend>Native currency</legend>

      <SerializedValue
        label="Name"
        value={nativeCurrency.name}
        style={{ flexGrow: 1 }}
        data-test-id="NativeCurrency:name"
      />

      <SerializedValue
        label="Decimals"
        value={nativeCurrency.decimals}
        style={{ flexGrow: 1 }}
        data-test-id="NativeCurrency:decimals"
      />
    </fieldset>
  );
}

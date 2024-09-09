import * as chains from "viem/chains";
import { KeybanChain, useKeybanClient } from "@keyban/sdk-react";

import Row from "@/components/atoms/Row";
import SerializedValue from "@/components/atoms/SerializedValue";

export default function NativeCurrency() {
  const client = useKeybanClient();

  const chain = {
    [KeybanChain.KeybanTestnet]: chains.anvil,
    [KeybanChain.PolygonAmoy]: chains.polygonAmoy,
  }[client.chain];
  const { nativeCurrency } = chain;

  return (
    <fieldset>
      <legend>Native currency</legend>

      <Row>
        <span>Name:</span>
        <SerializedValue
          value={nativeCurrency.name}
          style={{ flexGrow: 1 }}
          data-test-id="NativeCurrency:name"
        />
      </Row>

      <Row>
        <span>Decimals:</span>
        <SerializedValue
          value={nativeCurrency.decimals}
          style={{ flexGrow: 1 }}
          data-test-id="NativeCurrency:decimals"
        />
      </Row>
    </fieldset>
  );
}

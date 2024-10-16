import {
  useKeybanAccount,
  useKeybanAccountTokenBalances,
} from "@keyban/sdk-react";

import Row from "@/components/atoms/Row";
import SerializedValue from "@/components/atoms/SerializedValue";
import RefreshButton from "@/components/atoms/RefreshButton";

export default function TokenBalances() {
  const [account, accountError] = useKeybanAccount();
  if (accountError) throw accountError;

  const [tokenBalances, tokenBalancesError, { refresh }] =
    useKeybanAccountTokenBalances(account);
  if (tokenBalancesError) throw tokenBalancesError;

  return (
    <fieldset>
      <legend>
        Token balances
        <RefreshButton
          onClick={refresh}
          style={{ marginInlineStart: "0.5ch" }}
          data-test-id="TokenBalances:refresh"
        />
      </legend>

      {tokenBalances.map(({ token, balance }) => (
        <fieldset
          key={token.address}
          data-test-id={`TokenBalances:token:${token.address}`}
        >
          <legend>{token.name}</legend>

          <Row>
            <span>Address:</span>
            <SerializedValue
              value={token.address}
              style={{ flexGrow: 1 }}
              data-test-id="TokenBalances:address"
            />
          </Row>

          <Row>
            <span>Name:</span>
            <SerializedValue
              value={token.name}
              style={{ flexGrow: 1 }}
              data-test-id="TokenBalances:name"
            />
          </Row>

          <Row>
            <span>Decimals:</span>
            <SerializedValue
              value={token.decimals}
              style={{ flexGrow: 1 }}
              data-test-id="TokenBalances:decimals"
            />
          </Row>

          <Row style={{ marginBlockStart: "1em" }}>
            <span>Balance:</span>

            <SerializedValue
              value={balance}
              style={{ flexGrow: 1 }}
              data-test-id="TokenBalances:value"
            />

            <SerializedValue
              value={token.symbol}
              data-test-id="TokenBalances:symbol"
            />
          </Row>
        </fieldset>
      ))}
    </fieldset>
  );
}

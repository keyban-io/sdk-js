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

      {tokenBalances.map(
        (tokenBalance) =>
          tokenBalance && (
            <fieldset
              key={tokenBalance.token?.id}
              data-test-id={`TokenBalances:token:${tokenBalance.token?.id}`}
            >
              <legend>{tokenBalance.token?.name}</legend>

              <Row>
                <span>Address:</span>
                <SerializedValue
                  value={tokenBalance.token?.id}
                  style={{ flexGrow: 1 }}
                  data-test-id="TokenBalances:address"
                />
              </Row>

              <Row>
                <span>Name:</span>
                <SerializedValue
                  value={tokenBalance.token?.name}
                  style={{ flexGrow: 1 }}
                  data-test-id="TokenBalances:name"
                />
              </Row>

              <Row>
                <span>Decimals:</span>
                <SerializedValue
                  value={tokenBalance.token?.decimals}
                  style={{ flexGrow: 1 }}
                  data-test-id="TokenBalances:decimals"
                />
              </Row>

              <Row style={{ marginBlockStart: "1em" }}>
                <span>Balance:</span>

                <SerializedValue
                  value={tokenBalance.balance}
                  style={{ flexGrow: 1 }}
                  data-test-id="TokenBalances:value"
                />

                <SerializedValue
                  value={tokenBalance.token?.symbol}
                  data-test-id="TokenBalances:symbol"
                />
              </Row>
            </fieldset>
          ),
      )}
    </fieldset>
  );
}

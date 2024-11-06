import RefreshButton from "@/components/atoms/RefreshButton";
import Row from "@/components/atoms/Row";
import SerializedValue from "@/components/atoms/SerializedValue";
import {
  useKeybanAccount,
  useKeybanAccountTokenBalances,
} from "@keyban/sdk-react";

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

      {tokenBalances?.edges.map(
        ({ cursor, node }) =>
          node && (
            <fieldset
              key={cursor}
              data-test-id={`TokenBalances:token:${node.token?.id}`}
            >
              <legend>{node.token?.name}</legend>

              <Row>
                <span>Address:</span>
                <SerializedValue
                  value={node.token?.id}
                  style={{ flexGrow: 1 }}
                  data-test-id="TokenBalances:address"
                />
              </Row>

              <Row>
                <span>Name:</span>
                <SerializedValue
                  value={node.token?.name}
                  style={{ flexGrow: 1 }}
                  data-test-id="TokenBalances:name"
                />
              </Row>

              <Row>
                <span>Decimals:</span>
                <SerializedValue
                  value={node.token?.decimals}
                  style={{ flexGrow: 1 }}
                  data-test-id="TokenBalances:decimals"
                />
              </Row>

              <Row style={{ marginBlockStart: "1em" }}>
                <span>Balance:</span>

                <SerializedValue
                  value={node.balance}
                  style={{ flexGrow: 1 }}
                  data-test-id="TokenBalances:value"
                />

                <SerializedValue
                  value={node.token?.symbol}
                  data-test-id="TokenBalances:symbol"
                />
              </Row>
            </fieldset>
          ),
      )}
    </fieldset>
  );
}

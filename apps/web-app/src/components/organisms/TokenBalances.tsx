import React from "react";

import Row from "@/components/atoms/Row";
import SerializedValue from "@/components/atoms/SerializedValue";
import TextField from "@/components/molecules/TextField";
import {
  useKeybanAccount,
  useKeybanAccountTokenBalances,
} from "@keyban/sdk-react";

export default function TokenBalances() {
  const [account, accountError] = useKeybanAccount();
  if (accountError) throw accountError;

  const [pageSize, setPageSize] = React.useState("");

  const [tokenBalances, tokenBalancesError, { fetchMore }] =
    useKeybanAccountTokenBalances(account, {
      first: Number(pageSize) || undefined,
    });
  if (tokenBalancesError) throw tokenBalancesError;

  return (
    <fieldset>
      <legend>Token balances</legend>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Decimals</th>
            <th>Balance</th>
            <th>Symbol</th>
          </tr>
        </thead>
        <tbody>
          {tokenBalances?.edges.map(
            ({ cursor, node }) =>
              node && (
                <tr
                  key={cursor}
                  data-test-id={`TokenBalances:token:${node.token?.id}`}
                >
                  <th data-test-id="TokenBalances:name">{node.token?.name}</th>
                  <td data-test-id="TokenBalances:address">
                    <code>{node.token?.id}</code>
                  </td>
                  <td
                    data-test-id="TokenBalances:decimals"
                    style={{
                      fontVariantNumeric: "tabular-nums",
                      textAlign: "right",
                    }}
                  >
                    {node.token?.decimals}
                  </td>
                  <td
                    data-test-id="TokenBalances:balance"
                    style={{
                      fontVariantNumeric: "tabular-nums",
                      textAlign: "right",
                    }}
                  >
                    {node.balance}
                  </td>
                  <td data-test-id="TokenBalances:symbol">
                    {node.token?.symbol}
                  </td>
                </tr>
              ),
          )}
        </tbody>
      </table>

      <Row>
        <TextField
          label="Total"
          value={tokenBalances?.totalCount}
          disabled
          data-test-id="TokenBalances:totalCount"
        />

        <button
          onClick={fetchMore}
          disabled={!tokenBalances?.pageInfo.hasNextPage}
          data-test-id="TokenBalances:fetchMoreButton"
        >
          Fetch more
        </button>

        <div style={{ flexGrow: 1 }} />

        <TextField
          type="number"
          label="Items per page"
          value={pageSize}
          onChange={(value) => setPageSize(value)}
          data-test-id="TokenBalances:pageSizeInput"
        />
      </Row>

      <SerializedValue
        value={tokenBalances?.edges}
        data-test-id="TokenBalances:raw"
      />
    </fieldset>
  );
}

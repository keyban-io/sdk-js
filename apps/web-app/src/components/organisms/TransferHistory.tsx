import React from "react";

import RefreshButton from "@/components/atoms/RefreshButton";
import Row from "@/components/atoms/Row";
import TextField from "@/components/molecules/TextField";
import {
  useKeybanAccount,
  useKeybanAccountTransferHistory,
} from "@keyban/sdk-react";

import SerializedValue from "../atoms/SerializedValue";

export default function TransferHistory() {
  const [account, accountError] = useKeybanAccount();
  if (accountError) throw accountError;

  const [pageSize, setPageSize] = React.useState("");

  const [transactionHistory, transactionHistoryError, { refresh, fetchMore }] =
    useKeybanAccountTransferHistory(account, {
      first: Number(pageSize) || undefined,
    });
  if (transactionHistoryError) throw transactionHistoryError;

  return (
    <fieldset>
      <legend>
        Transfer history
        <RefreshButton
          onClick={refresh}
          style={{ marginInlineStart: "0.5ch" }}
          data-test-id="TransferHistory:refresh"
        />
      </legend>

      <table data-test-id="TransferHistory:table">
        <thead>
          <tr>
            <td>Block</td>
            <td>Date</td>
            <td>From</td>
            <td>To</td>
            <td>Value</td>
            <td>Type</td>
          </tr>
        </thead>
        <tbody>
          {transactionHistory?.edges.map(({ cursor, node }) => (
            <tr key={cursor}>
              <td>
                <code>{node?.transaction?.blockNumber}</code>
              </td>
              <td>
                <code>{node?.transaction?.date}</code>
              </td>
              <td>
                <code>{node?.from?.id}</code>
              </td>
              <td>
                <code>{node?.to?.id}</code>
              </td>
              <td>{node?.value}</td>
              <td>{node?.type}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Row>
        <span>Count:</span>
        <SerializedValue
          value={transactionHistory?.totalCount}
          data-test-id="TransferHistory:count"
        />
        <button
          onClick={fetchMore}
          disabled={!transactionHistory?.pageInfo.hasNextPage}
          data-test-id="TransferHistory:fetchMoreButton"
        >
          Fetch more
        </button>

        <div style={{ flexGrow: 1 }} />

        <TextField
          type="number"
          label="Items per page"
          value={pageSize}
          onChange={(value) => setPageSize(value)}
          data-test-id="TransferHistory:pageSizeInput"
        />
      </Row>

      <SerializedValue
        value={transactionHistory?.edges}
        data-test-id="TransferHistory:raw"
      />
    </fieldset>
  );
}

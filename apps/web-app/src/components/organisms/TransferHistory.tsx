import RefreshButton from "@/components/atoms/RefreshButton";
import Row from "@/components/atoms/Row";
import {
  useKeybanAccount,
  useKeybanAccountTransferHistory,
} from "@keyban/sdk-react";

import SerializedValue from "../atoms/SerializedValue";

export default function TransferHistory() {
  const [account, accountError] = useKeybanAccount();
  if (accountError) throw accountError;

  const [transactionHistory, transactionHistoryError, { refresh, fetchMore }] =
    useKeybanAccountTransferHistory(account);
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

      <table>
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
          <SerializedValue value={transactionHistory?.edges} data-test-id="TransferHistory:raw" />
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
          style={{ flexGrow: 1 }}
          data-test-id="TransferHistory:count"
        />
        <button
          onClick={fetchMore}
          disabled={!transactionHistory?.pageInfo.hasNextPage}
        >
          Fetch more
        </button>
      </Row>
    </fieldset>
  );
}

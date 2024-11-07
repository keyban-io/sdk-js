import RefreshButton from "@/components/atoms/RefreshButton";
import Row from "@/components/atoms/Row";
import {
  useKeybanAccount,
  useKeybanAccountTransactionHistory,
} from "@keyban/sdk-react";

import SerializedValue from "../atoms/SerializedValue";

export default function TransactionHistory() {
  const [account, accountError] = useKeybanAccount();
  if (accountError) throw accountError;

  const [transactionHistory, transactionHistoryError, { refresh, fetchMore }] =
    useKeybanAccountTransactionHistory(account);
  if (transactionHistoryError) throw transactionHistoryError;

  return (
    <fieldset>
      <legend>
        Transaction history
        <RefreshButton
          onClick={refresh}
          style={{ marginInlineStart: "0.5ch" }}
          data-test-id="TransactionHistory:refresh"
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
          data-test-id="TransactionHistory:count"
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

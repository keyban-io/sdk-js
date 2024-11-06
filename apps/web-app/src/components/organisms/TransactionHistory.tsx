import RefreshButton from "@/components/atoms/RefreshButton";
import Row from "@/components/atoms/Row";
import {
  useKeybanAccount,
  useKeybanAccountTransactionHistory,
} from "@keyban/sdk-react";

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
            <td>From</td>
            <td>To</td>
          </tr>
        </thead>
        <tbody>
          {transactionHistory?.edges.map(({ cursor, node }) => (
            <tr key={cursor}>
              <td>{node?.blockNumber}</td>
              <td>{node?.from?.id}</td>
              <td>{node?.to?.id}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Row>
        <div>Total: {transactionHistory?.totalCount}</div>
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

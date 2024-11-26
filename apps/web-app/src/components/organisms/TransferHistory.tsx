import {
  FormattedBalance,
  useKeybanAccount,
  useKeybanAccountTransferHistory,
} from "@keyban/sdk-react";

import Row from "~/components/atoms/Row";
import TextField from "~/components/molecules/TextField";
import { useSearchParam } from "~/lib/urlSearchParam";

import SerializedValue from "../atoms/SerializedValue";

export default function TransferHistory() {
  const [account, accountError] = useKeybanAccount();
  if (accountError) throw accountError;

  const [pageSize, setPageSize] = useSearchParam("TransferHistory:pageSize");

  const [transactionHistory, transactionHistoryError, { fetchMore }] =
    useKeybanAccountTransferHistory(account, {
      first: Number(pageSize) || undefined,
    });
  if (transactionHistoryError) throw transactionHistoryError;

  return (
    <fieldset>
      <legend>Transfer history</legend>

      <table data-test-id="TransferHistory:table">
        <thead>
          <tr>
            <th>Block</th>
            <th>Date</th>
            <th>From</th>
            <th>To</th>
            <th>Value</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {transactionHistory.nodes.map((node) => (
            <tr key={node.id}>
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
              <td
                style={{
                  fontVariantNumeric: "tabular-nums",
                  textAlign: "right",
                }}
              >
                <FormattedBalance
                  balance={{
                    raw: node?.value ?? "0",
                    decimals: node?.decimals ?? undefined,
                    isNative: node?.type === "native",
                  }}
                  token={
                    node?.type === "erc20"
                      ? (node?.token ?? undefined)
                      : undefined
                  }
                />
              </td>
              <td>
                <code>{node?.type}</code>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Row>
        <TextField
          label="Total"
          value={transactionHistory?.totalCount}
          disabled
          data-test-id="TransferHistory:totalCount"
        />

        <button
          onClick={fetchMore}
          disabled={!transactionHistory.hasNextPage}
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
        value={transactionHistory?.nodes}
        data-test-id="TransferHistory:raw"
      />
    </fieldset>
  );
}

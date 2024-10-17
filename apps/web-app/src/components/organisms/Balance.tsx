import RefreshButton from "@/components/atoms/RefreshButton";
import Row from "@/components/atoms/Row";
import SerializedValue from "@/components/atoms/SerializedValue";
import {
  FormattedBalance,
  useKeybanAccount,
  useKeybanAccountBalance,
} from "@keyban/sdk-react";

export default function Balance() {
  const [account, accountError] = useKeybanAccount();
  if (accountError) throw accountError;

  const [balance, balanceError, { refresh }] = useKeybanAccountBalance(account);
  if (balanceError) throw balanceError;

  return (
    <fieldset>
      <legend>
        Balance
        <RefreshButton
          onClick={refresh}
          style={{ marginInlineStart: "0.5ch" }}
          data-test-id="Balance:refresh"
        />
      </legend>

      <Row>
        <span>Formatted:</span>
        <div data-test-id="Balance:formattedValue">
          <FormattedBalance balance={balance} />
        </div>
      </Row>

      <Row>
        <span>Raw:</span>
        <SerializedValue
          value={balance}
          style={{ flexGrow: 1 }}
          data-test-id="Balance:rawValue"
        />
      </Row>
    </fieldset>
  );
}

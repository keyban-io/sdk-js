import {
  FormattedBalance,
  useKeybanAccount,
  useKeybanAccountBalance,
} from "@keyban/sdk-react";

import Row from "~/components/atoms/Row";
import SerializedValue from "~/components/atoms/SerializedValue";

export default function Balance() {
  const [account, accountError] = useKeybanAccount();
  if (accountError) throw accountError;

  const [balance, balanceError] = useKeybanAccountBalance(account);
  if (balanceError) throw balanceError;

  return (
    <fieldset>
      <legend>Balance</legend>

      <Row>
        <span>Formatted:</span>
        <div data-test-id="Balance:formattedValue">
          <FormattedBalance balance={{ raw: balance, isNative: true }} />
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

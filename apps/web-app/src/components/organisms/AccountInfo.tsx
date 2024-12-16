import { useKeybanAccount } from "@keyban/sdk-react";

import Row from "~/components/atoms/Row";
import SerializedValue from "~/components/atoms/SerializedValue";

export default function AccountInfo() {
  const [account, accountError] = useKeybanAccount();
  if (accountError) throw accountError;

  return (
    <fieldset>
      <legend>Account infos</legend>

      <Row>
        <span>Address:</span>
        <SerializedValue
          value={account.address}
          style={{ flexGrow: 1 }}
          data-test-id="AccountInfo:address"
        />
      </Row>

      <fieldset>
        <legend>Client public key:</legend>
        <SerializedValue
          value={account.publicKey}
          data-test-id="AccountInfo:publicKey"
        />
      </fieldset>

      <fieldset>
        <legend>Raw value:</legend>
        <SerializedValue value={account} data-test-id="AccountInfo:rawValue" />
      </fieldset>
    </fieldset>
  );
}

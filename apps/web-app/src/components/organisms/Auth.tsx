import { useKeybanClient } from "@keyban/sdk-react";
import React from "react";

import Row from "~/components/atoms/Row";
import SerializedValue from "~/components/atoms/SerializedValue";

export default function Auth() {
  const client = useKeybanClient();

  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>();
  React.useEffect(() => {
    client.isAuthenticated().then(setIsAuthenticated);
  }, [client]);

  return (
    <fieldset>
      <legend>Auth</legend>

      <Row>
        <button onClick={() => client.login()} data-test-id="Auth:login">
          Login
        </button>

        <button onClick={() => client.logout()} data-test-id="Auth:logout">
          Logout
        </button>
      </Row>

      <Row>
        <span>Authenticated:</span>
        <SerializedValue
          value={isAuthenticated}
          style={{ flexGrow: 1 }}
          data-test-id="Auth:isAuthenticated"
        />
      </Row>
    </fieldset>
  );
}

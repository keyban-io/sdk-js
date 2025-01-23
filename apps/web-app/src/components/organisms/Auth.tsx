import { useKeybanAuth } from "@keyban/sdk-react";

import Row from "~/components/atoms/Row";
import SerializedValue from "~/components/atoms/SerializedValue";

export default function Auth() {
  const { login, logout, user, isAuthenticated, isLoading } = useKeybanAuth();

  return (
    <fieldset>
      <legend>Auth</legend>

      <Row>
        <button onClick={login} data-test-id="Auth:login">
          Login
        </button>

        <button onClick={logout} data-test-id="Auth:logout">
          Logout
        </button>
      </Row>

      {!isLoading && (
        <>
          <Row>
            <span>Authenticated:</span>
            <SerializedValue
              value={isAuthenticated}
              style={{ flexGrow: 1 }}
              data-test-id="Auth:isAuthenticated"
            />
          </Row>

          <SerializedValue
            value={user}
            style={{ flexGrow: 1 }}
            data-test-id="Auth:user"
          />
        </>
      )}
    </fieldset>
  );
}

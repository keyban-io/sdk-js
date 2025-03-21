import { useKeybanAuth } from "@keyban/sdk-react";

import Row from "~/components/atoms/Row";
import SerializedValue from "~/components/atoms/SerializedValue";

export default function Auth() {
  const { login, logout, user, isAuthenticated, isLoading } = useKeybanAuth();

  return (
    <fieldset>
      <legend>Auth</legend>

      <Row>
        <button onClick={() => login()} data-test-id="Auth:login">
          Login
        </button>

        <button
          onClick={() => login("Username-Password-Authentication")}
          data-test-id="Auth:login:usernamePassword"
        >
          Login username/password
        </button>

        <button
          onClick={() => login("google-oauth2")}
          data-test-id="Auth:login:google"
        >
          Login Google
        </button>

        <button onClick={logout} data-test-id="Auth:logout">
          Logout
        </button>
      </Row>

      {!isLoading && (
        <>
          <SerializedValue
            label="Authenticated"
            value={isAuthenticated}
            style={{ flexGrow: 1 }}
            data-test-id="Auth:isAuthenticated"
          />

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

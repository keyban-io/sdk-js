import { useKeybanAuth } from "@keyban/sdk-react";
import React from "react";

import Row from "~/components/atoms/Row";
import SerializedValue from "~/components/atoms/SerializedValue";
import TextField from "~/components/molecules/TextField";

export default function Auth() {
  const {
    login,
    logout,
    passwordLogin,
    passwordlessStart,
    passwordlessLogin,
    user,
    isAuthenticated,
    isLoading,
  } = useKeybanAuth();

  const emailRef = React.useRef<HTMLInputElement | null>(null);
  const passwordRef = React.useRef<HTMLInputElement | null>(null);

  const otpEmailRef = React.useRef<HTMLInputElement | null>(null);
  const otpEmailCodeRef = React.useRef<HTMLInputElement | null>(null);

  const otpPhoneNumberRef = React.useRef<HTMLInputElement | null>(null);
  const otpSmsCodeRef = React.useRef<HTMLInputElement | null>(null);

  return (
    <fieldset>
      <legend>Auth</legend>

      <Row>
        <button onClick={() => login()} data-test-id="Auth:login">
          Login
        </button>

        <button
          onClick={() => login("username-password")}
          data-test-id="Auth:login:usernamePassword"
        >
          Login username/password
        </button>

        <button onClick={() => login("email")} data-test-id="Auth:login:email">
          Login email
        </button>

        <button onClick={() => login("sms")} data-test-id="Auth:login:sms">
          Login sms
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

      <fieldset data-test-id="Auth:password">
        <legend>Email/password (embeded)</legend>

        <TextField
          label="Email"
          ref={emailRef}
          data-test-id="email"
          defaultValue="shurel@keyban.io"
        />
        <Row>
          <TextField
            type="password"
            label="Password"
            ref={passwordRef}
            data-test-id="password"
            defaultValue="QidMNHybDdnS3cB"
          />
          <button
            onClick={() =>
              passwordLogin(emailRef.current!.value, passwordRef.current!.value)
            }
            data-test-id="submit"
          >
            Login
          </button>
        </Row>
      </fieldset>

      <fieldset data-test-id="Auth:otp:email">
        <legend>OTP Email (embeded)</legend>

        <Row>
          <TextField label="Email" ref={otpEmailRef} data-test-id="email" />
          <button
            onClick={() =>
              passwordlessStart("email", otpEmailRef.current!.value)
            }
            data-test-id="email:submit"
          >
            Send code
          </button>
        </Row>
        <Row>
          <TextField label="Code" ref={otpEmailCodeRef} data-test-id="code" />
          <button
            onClick={() =>
              passwordlessLogin(
                "email",
                otpEmailRef.current!.value,
                otpEmailCodeRef.current!.value,
              )
            }
            data-test-id="code:submit"
          >
            Login
          </button>
        </Row>
      </fieldset>

      <fieldset data-test-id="Auth:otp:sms">
        <legend>OTP SMS (embeded)</legend>

        <Row>
          <TextField
            label="Phone number"
            ref={otpPhoneNumberRef}
            data-test-id="phoneNumber"
            defaultValue="+33674860777"
          />
          <button
            onClick={() =>
              passwordlessStart("sms", otpPhoneNumberRef.current!.value)
            }
            data-test-id="phoneNumber:submit"
          >
            Send code
          </button>
        </Row>
        <Row>
          <TextField label="Code" ref={otpSmsCodeRef} data-test-id="code" />
          <button
            onClick={() =>
              passwordlessLogin(
                "sms",
                otpPhoneNumberRef.current!.value,
                otpSmsCodeRef.current!.value,
              )
            }
            data-test-id="code:submit"
          >
            Login
          </button>
        </Row>
      </fieldset>

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

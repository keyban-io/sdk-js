import { useKeybanApiStatus } from "@keyban/sdk-react";

import RefreshButton from "~/components/atoms/RefreshButton";
import SerializedValue from "~/components/atoms/SerializedValue";

export default function ApiStatus() {
  const [apiStatus, apiStatusError, { reset }] = useKeybanApiStatus();
  if (apiStatusError) throw apiStatusError;

  return (
    <fieldset>
      <legend>
        API status
        <RefreshButton
          onClick={reset}
          style={{ marginInlineStart: "0.5ch" }}
          data-test-id="ApiStatus:reset"
        />
      </legend>
      <SerializedValue value={apiStatus} data-test-id="ApiStatus:value" />
    </fieldset>
  );
}

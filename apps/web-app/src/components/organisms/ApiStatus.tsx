import RefreshButton from "@/components/atoms/RefreshButton";
import SerializedValue from "@/components/atoms/SerializedValue";
import { useKeybanApiStatus } from "@keyban/sdk-react";

export default function ApiStatus() {
  const [apiStatus, apiStatusError, { reset }] = useKeybanApiStatus({
    suspense: true,
  });
  if (apiStatusError) throw apiStatusError;

  return (
    <fieldset>
      <legend>
        API status
        <RefreshButton
          onClick={reset}
          style={{ marginInlineStart: "0.5ch" }}
          data-test-id="Balance:reset"
        />
      </legend>
      <SerializedValue value={apiStatus} data-test-id="ApiStatus:value" />
    </fieldset>
  );
}

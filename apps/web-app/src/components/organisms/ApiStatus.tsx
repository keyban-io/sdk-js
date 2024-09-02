import SerializedValue from "@/components/atoms/SerializedValue";
import { useKeybanApiStatus } from "@keyban/sdk-react";

export default function ApiStatus() {
  const [apiStatus, apiStatusError] = useKeybanApiStatus({ suspense: true });
  if (apiStatusError) throw apiStatusError;

  return (
    <fieldset>
      <legend>API status</legend>
      <SerializedValue value={apiStatus} data-test-id="ApiStatus:value" />
    </fieldset>
  );
}

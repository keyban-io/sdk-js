import { usePromise } from "~/promise";
import { useKeybanClient } from "~/provider";

/**
 * @private
 */
export function useKeybanApiStatus() {
  const client = useKeybanClient();
  return usePromise("api-status", () => client.apiStatus(), { suspense: true });
}

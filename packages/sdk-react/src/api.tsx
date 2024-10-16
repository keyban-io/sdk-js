import { useKeybanClient } from "~/provider";
import { usePromise } from "~/promise";

/**
 * @private
 */
export function useKeybanApiStatus() {
  const client = useKeybanClient();
  return usePromise("api-status", () => client.apiStatus(), { suspense: true });
}

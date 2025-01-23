/**
 * @module API
 */
import { usePromise } from "~/promise";
import { useKeybanClient } from "~/provider";

/**
 * This hook returns the status of the Keyban API.
 * @private
 * @returns - The promise resolving to the API status.
 */
export function useKeybanApiStatus() {
  const client = useKeybanClient();
  return usePromise("api-status", () => client.apiStatus(), { suspense: true });
}

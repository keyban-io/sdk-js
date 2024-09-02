import { useKeybanClient } from "./provider";
import { usePromise, UsePromiseOptions } from "~/promise";

/**
 * @private
 */
export function useKeybanApiStatus<B extends boolean>(
  options?: UsePromiseOptions<B>,
) {
  const client = useKeybanClient();
  return usePromise("api-status", () => client.apiStatus(), options);
}

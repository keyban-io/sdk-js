import { KeybanAccount } from "@keyban/sdk-base";

import { useKeybanClient } from "~/provider";
import { usePromise, UsePromiseOptions } from "~/promise";

/**
 * Fetches the account information for the given keyId.
 */
export function useKeybanAccount<B extends boolean>(
  keyId: string,
  options?: UsePromiseOptions<B>,
) {
  const client = useKeybanClient();
  return usePromise(
    `account:${keyId}`,
    () => client.initialize(keyId),
    options,
  );
}

/**
 * Return the native balance of an account.
 *
 * @example
 * ```tsx
 * const [account, accountError] = useKeybanAccount("keyId");
 * const [balance, balanceError] = useKeybanAccountBalance(account);
 * ```
 * @see {@link useFormattedBalance}
 */
export function useKeybanAccountBalance<B extends boolean>(
  account: KeybanAccount,
  options?: UsePromiseOptions<B>,
) {
  return usePromise(
    `account-balance:${account.keyId}`,
    () => account.getBalance(),
    options,
  );
}

/**
 * Return the native balance of an account.
 *
 * @example
 * ```tsx
 * const [account, accountError] = useKeybanAccount("keyId");
 * const [balance, balanceError] = useKeybanAccountTokenBalances(account);
 * ```
 * @see {@link useFormattedBalance}
 */
export function useKeybanAccountTokenBalances<B extends boolean>(
  account: KeybanAccount,
  options?: UsePromiseOptions<B>,
) {
  return usePromise(
    `account-token-balances:${account.keyId}`,
    () => account.getTokenBalances(),
    options,
  );
}

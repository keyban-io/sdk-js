import { KeybanAccount } from "@keyban/sdk-base";

import { useKeybanClient } from "~/provider";
import {
  useWrappedPromise,
  WrappedPromiseResult,
  WrappedPromiseResultExtra,
} from "~/promise";

/**
 * Fetches the account information for the given keyId.
 *
 */
export function useKeybanAccount(
  keyId: string,
  options: { suspense: true },
): WrappedPromiseResult<KeybanAccount>;
export function useKeybanAccount(
  keyId: string,
  options?: { suspense?: false },
):
  | WrappedPromiseResult<KeybanAccount>
  | [null, null, WrappedPromiseResultExtra];

export function useKeybanAccount(
  keyId: string,
  options?: { suspense?: boolean },
) {
  const client = useKeybanClient();

  try {
    return useWrappedPromise(`account:${keyId}`, () =>
      client.initialize(keyId),
    );
  } catch (suspended) {
    if (options?.suspense) throw suspended;
    return [null, null, { refresh: () => {}, isLoading: true }];
  }
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
export function useKeybanAccountBalance(
  account: KeybanAccount,
  options: { suspense: true },
): WrappedPromiseResult<bigint>;
export function useKeybanAccountBalance(
  account: KeybanAccount,
  options?: { suspense?: false },
): WrappedPromiseResult<bigint> | [null, null, WrappedPromiseResultExtra];

export function useKeybanAccountBalance(
  account: KeybanAccount,
  options?: { suspense?: boolean },
) {
  try {
    return useWrappedPromise(`account-balance:${account.keyId}`, () =>
      account.getBalance(),
    );
  } catch (suspended) {
    if (options?.suspense) throw suspended;
    return [null, null, { refresh: () => {}, isLoading: true }];
  }
}

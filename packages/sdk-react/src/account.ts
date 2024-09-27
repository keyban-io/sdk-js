import {
  usePromise,
  UsePromiseOptions,
} from "~/promise";
import { useKeybanClient } from "~/provider";

import { KeybanAccount } from "@keyban/sdk-base";

/**
 * Fetches the account information.
 */
export function useKeybanAccount<B extends boolean>(
  options?: UsePromiseOptions<B>,
) {
  const client = useKeybanClient();
  return usePromise(`account`, () => client.initialize(), options);
}

/**
 * Return the native balance of an account.
 *
 * @example
 * ```tsx
 * const [account, accountError] = useKeybanAccount();
 * const [balance, balanceError, { refresh: refreshBalance }] = useKeybanAccountBalance(account);
 * ```
 * @see {@link useFormattedBalance}
 */
export function useKeybanAccountBalance<B extends boolean>(
  account: KeybanAccount,
  options?: UsePromiseOptions<B>,
) {
  return usePromise(
    `account-balance:${account.sub}`,
    () => account.getBalance(),
    options,
  );
}

/**
 * Return the native balance of an account.
 *
 * @example
 * ```tsx
 * const [account, accountError] = useKeybanAccount();
 * const [balance, balanceError, { refresh: refreshBalance }] = useKeybanAccountTokenBalances(account);
 * ```
 * @see {@link useFormattedBalance}
 */
export function useKeybanAccountTokenBalances<B extends boolean>(
  account: KeybanAccount,
  options?: UsePromiseOptions<B>,
) {
  return usePromise(
    `account-token-balances:${account.sub}`,
    () => account.getTokenBalances(),
    options,
  );
}

/**
 * Return the ERC721 and ERC1155 tokens of an account.
 *
 * @example
 * ```tsx
 * const [account, accountError] = useKeybanAccount();
 * const [balance, balanceError, { refresh: refreshBalance }] = useKeybanAccountNft(account);
 * ```
 * @see {@link useFormattedBalance}
 */
export function useKeybanAccountNft<B extends boolean>(
  account: KeybanAccount,
  options?: UsePromiseOptions<B>,
) {
  return usePromise(
    `account-token-balances:${account.sub}`,
    () => account.getNft(),
    options,
  );
}

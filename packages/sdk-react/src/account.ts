import { KeybanAccount } from "@keyban/sdk-base";

import { useKeybanClient } from "~/provider";
import {
  useWrappedPromise,
  WrappedPromiseResult,
  WrappedPromiseResultExtra,
} from "~/promise";

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

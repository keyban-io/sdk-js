import { gql, useSubscription, useSuspenseQuery } from "@apollo/client";
import {
  Address,
  KeybanAccount,
  SdkError,
  SdkErrorTypes,
} from "@keyban/sdk-base";
import {
  KeybanClient_addressNftDocument,
  KeybanClient_addressNftsDocument,
  KeybanClient_addressTokenBalancesDocument,
  KeybanClient_nativeBalanceDocument,
  KeybanClient_nativeBalanceSubscriptionDocument,
} from "@keyban/sdk-base/graphql";

import { usePromise } from "~/promise";
import { useKeybanClient } from "~/provider";

/**
 * Fetches the account information.
 */
export function useKeybanAccount() {
  const client = useKeybanClient();
  return usePromise("account", () => client.initialize(), { suspense: true });
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
export function useKeybanAccountBalance(account: KeybanAccount) {
  const client = useKeybanClient();

  const { data, error, refetch } = useSuspenseQuery(
    KeybanClient_nativeBalanceDocument,
    {
      client: client.apolloClient,
      variables: {
        chainType: client.chain,
        address: account.address,
      },
    },
  );

  useSubscription(KeybanClient_nativeBalanceSubscriptionDocument, {
    client: client.apolloClient,
    variables: {
      chainType: client.chain,
      address: account.address,
    },
  });

  const extra = { refresh: () => refetch() };

  return error
    ? ([null, error, extra] as const)
    : ([data.chain.account.nativeBalance, null, extra] as const);
}

/**
 * Return the ERC20 tokens of an account.
 *
 * @example
 * ```tsx
 * const [account, accountError] = useKeybanAccount();
 * const [balances, balanceError, { refresh: refreshBalances }] = useKeybanAccountTokenBalances(account);
 * ```
 * @see {@link useFormattedBalance}
 */
export function useKeybanAccountTokenBalances(account: KeybanAccount) {
  const client = useKeybanClient();

  const { data, error, refetch } = useSuspenseQuery(
    KeybanClient_addressTokenBalancesDocument,
    {
      client: client.apolloClient,
      variables: {
        chainType: client.chain,
        address: account.address,
      },
    },
  );

  const extra = { refresh: () => refetch() };

  return error
    ? ([null, error, extra] as const)
    : ([data.chain.account.tokenBalances, null, extra] as const);
}

/**
 * Return the ERC721 and ERC1155 tokens of an account.
 *
 * @example
 * ```tsx
 * const [account, accountError] = useKeybanAccount();
 * const [balance, balanceError, { refresh: refreshBalance }] = useKeybanAccountNfts(account);
 * ```
 * @see {@link useFormattedBalance}
 */
export function useKeybanAccountNfts(account: KeybanAccount) {
  const client = useKeybanClient();

  const { data, error, refetch } = useSuspenseQuery(
    KeybanClient_addressNftsDocument,
    {
      client: client.apolloClient,
      variables: {
        chainType: client.chain,
        address: account.address,
      },
    },
  );

  const extra = { refresh: () => refetch() };

  return error
    ? ([null, error, extra] as const)
    : ([data.chain.account.nfts, null, extra] as const);
}

/**
 * Return one ERC721 or ERC1155 token of an account.
 *
 * @example
 * ```tsx
 * const [account, accountError] = useKeybanAccount();
 * const [balance, balanceError, { refresh: refreshBalance }] = useKeybanAccountNft(account, tokenAddress, tokenId);
 * ```
 * @see {@link useFormattedBalance}
 */
export function useKeybanAccountNft(
  account: KeybanAccount,
  tokenAddress: Address,
  tokenId: string,
) {
  const client = useKeybanClient();

  const { data, error, refetch } = useSuspenseQuery(
    KeybanClient_addressNftDocument,
    {
      client: client.apolloClient,
      variables: {
        chainType: client.chain,
        address: account.address,
        tokenAddress,
        tokenId,
      },
    },
  );

  const extra = { refresh: () => refetch() };

  if (error) return [null, error, extra] as const;
  if (!data.chain.account.nft)
    return [
      null,
      new SdkError(SdkErrorTypes.NftNotFound, "useKeybanAccountNft"),
      extra,
    ];

  return error
    ? ([null, error, extra] as const)
    : ([data.chain.account.nft, null, extra] as const);
}

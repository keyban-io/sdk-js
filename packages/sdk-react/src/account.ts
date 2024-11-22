import React from "react";

import { usePromise } from "~/promise";
import { useKeybanClient } from "~/provider";

import {
  useSubscription,
  useSuspenseQuery,
} from "@apollo/client";
import {
  type Address,
  type KeybanAccount,
  type KeybanBalance,
  type KeybanTokenBalances,
  type PaginationArgs,
  SdkError,
  SdkErrorTypes,
} from "@keyban/sdk-base";
import {
  assetTransfersSubscriptionDocument,
  GqlAssetTransfersOrderBy,
  GqlNftBalancesOrderBy,
  GqlTokenBalancesOrderBy,
  nftBalancesSubscriptionDocument,
  tokenBalancesSubscriptionDocument,
  walletAssetTransfersDocument,
  walletBalanceDocument,
  walletNftDocument,
  walletNftsDocument,
  walletSubscriptionDocument,
  walletTokenBalancesDocument,
} from "@keyban/sdk-base/graphql";

/**
 * Fetches the account information.
 */
export function useKeybanAccount() {
  const client = useKeybanClient();
  return usePromise("account", () => client.initialize(), { suspense: true });
}

export type KeybanSuspenceResult<T> = readonly [
  T | null,
  Error | null,
  {
    loading: boolean;
    refresh: () => void;
    fetchMore?: () => void;
  }
];
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
export function useKeybanAccountBalance({ address }: KeybanAccount): KeybanSuspenceResult<KeybanBalance> {
  const client = useKeybanClient();

  const [isPending, startTransition] = React.useTransition();

  const { data, error, refetch } = useSuspenseQuery(walletBalanceDocument, {
    client: client.apolloClient,
    variables: { walletId: address },
  });

  const debounceTimeoutRef = React.useRef<NodeJS.Timeout>();
  const refresh = React.useCallback(() => {
    clearTimeout(debounceTimeoutRef.current);
    debounceTimeoutRef.current = setTimeout(() => {
      startTransition(() => {
        refetch();
      });
    }, 100);
  }, [startTransition, refetch]);

  useSubscription(walletSubscriptionDocument, {
    client: client.apolloClient,
    onData() {
      refresh();
    },
  });

  const extra = {
    loading: isPending,
    refresh,
  };

  return error
    ? ([null, error, extra] as const)
    : ([data.wallet?.balance ?? "0", null, extra] as const);
}

/**
 * Return the ERC20 tokens of an account.
 *
 * @param {KeybanAccount} param0 - An object containing the address of the Keyban account.
 * @param {PaginationArgs} [options] - Optional pagination arguments for fetching the token balances.
 * @returns {readonly [TokenBalances | null, Error | null, Extra]} - A tuple containing:
 * - The token balances data or null if an error occurred.
 * - The error object or null if no error occurred.
 * - An extra object containing additional information and functions:
 *   - `loading`: A boolean indicating if the data is currently being fetched.
 *   - `refresh`: A function to manually refetch the data.
 *   - `fetchMore`: A function to fetch more data if there are more pages available.
 *
 * @example
 * ```tsx
 * const [account, accountError] = useKeybanAccount();
 * const [balances, balanceError, { loading, fetchMore: fetchMoreBalances }] = useKeybanAccountTokenBalances(account, { first: 5 });
 *
 * if (loading) {
 *   // Show loading state
 * }
 *
 * if (balanceError) {
 *   // Handle error
 * }
 *
 * // Use the token balances
 * console.log(balances);
 *
 * // To fetch more token balances
 * if (balances && balances.pageInfo.hasNextPage) {
 *   fetchMoreBalances();
 * }
 * ```
 * @see {@link useFormattedBalance}
 */
export function useKeybanAccountTokenBalances(
  { address }: KeybanAccount,
  options?: PaginationArgs,
): KeybanSuspenceResult<KeybanTokenBalances> {
  const client = useKeybanClient();

  const [isPending, startTransition] = React.useTransition();

  const { data, error, refetch, fetchMore } = useSuspenseQuery(
    walletTokenBalancesDocument,
    {
      client: client.apolloClient,
      variables: {
        walletId: address,
        orderBy: [GqlTokenBalancesOrderBy.TOKEN_SYMBOL_ASC],
        ...options,
      },
    },
  );

  const debounceTimeoutRef = React.useRef<NodeJS.Timeout>();
  const refresh = React.useCallback(() => {
    clearTimeout(debounceTimeoutRef.current);
    debounceTimeoutRef.current = setTimeout(() => {
      startTransition(() => {
        refetch();
      });
    }, 100);
  }, [startTransition, refetch]);

  useSubscription(tokenBalancesSubscriptionDocument, {
    client: client.apolloClient,
    onData() {
      // { data: { data } }
      // TODO: get the filter back when https://github.com/subquery/subql/issues/2590 get fixed
      // if (data?.tokenBalances?._entity.wallet_id !== address) return;

      refresh();
    },
  });

  const extra = {
    loading: isPending,
    refresh,
    fetchMore: () => {
      const pageInfo = data.tokenBalances?.pageInfo;
      if (!pageInfo?.hasNextPage) return;

      startTransition(() => {
        fetchMore({
          variables: { after: pageInfo.endCursor },
          updateQuery: (prevData, { fetchMoreResult }) => ({
            tokenBalances: {
              totalCount: fetchMoreResult.tokenBalances!.totalCount,
              pageInfo: {
                ...prevData.tokenBalances!.pageInfo,
                hasNextPage:
                  fetchMoreResult.tokenBalances!.pageInfo.hasNextPage,
                endCursor: fetchMoreResult.tokenBalances!.pageInfo.endCursor,
              },
              edges: [
                ...(prevData.tokenBalances?.edges ?? []),
                ...(fetchMoreResult.tokenBalances?.edges ?? []),
              ],
            },
          }),
        });
      });
    },
  };

  return error
    ? ([null, error, extra] as const)
    : ([data.tokenBalances, null, extra] as const);
}

/**
 * Return the NFTs of an account.
 *
 * @param {KeybanAccount} param0 - An object containing the address of the Keyban account.
 * @param {PaginationArgs} [options] - Optional pagination arguments for fetching the NFTs.
 * @returns {readonly [NftBalances | null, Error | null, Extra]} - A tuple containing:
 * - The NFT balances data or null if an error occurred.
 * - The error object or null if no error occurred.
 * - An extra object containing additional information and functions:
 *   - `loading`: A boolean indicating if the data is currently being fetched.
 *   - `refresh`: A function to manually refetch the data.
 *   - `fetchMore`: A function to fetch more data if there are more pages available.
 *
 * @example
 * ```tsx
 * const [account, accountError] = useKeybanAccount();
 * const [nfts, nftsError, { loading, fetchMore: fetchMoreNfts }] = useKeybanAccountNfts(account, { first: 5 });
 *
 * if (loading) {
 *   // Show loading state
 * }
 *
 * if (nftsError) {
 *   // Handle error
 * }
 *
 * // Use the NFT data
 * console.log(nfts);
 *
 * // To fetch more NFTs
 * if (nfts && nfts.pageInfo.hasNextPage) {
 *   fetchMoreNfts();
 * }
 * ```
 * @see {@link useFormattedBalance}
 */
export function useKeybanAccountNfts(
  { address }: KeybanAccount,
  options?: PaginationArgs,
) {
  const client = useKeybanClient();

  const [isPending, startTransition] = React.useTransition();

  const { data, error, refetch, fetchMore } = useSuspenseQuery(
    walletNftsDocument,
    {
      client: client.apolloClient,
      variables: {
        walletId: address,
        orderBy: GqlNftBalancesOrderBy.NFT_TOKEN_ID_ASC,
        ...options,
      },
    },
  );

  const debounceTimeoutRef = React.useRef<NodeJS.Timeout>();
  const refresh = React.useCallback(() => {
    clearTimeout(debounceTimeoutRef.current);
    debounceTimeoutRef.current = setTimeout(() => {
      startTransition(() => {
        refetch();
      });
    }, 100);
  }, [startTransition, refetch]);

  useSubscription(nftBalancesSubscriptionDocument, {
    client: client.apolloClient,
    onData() {
      // { data: { data } }
      // TODO: get the filter back when https://github.com/subquery/subql/issues/2590 get fixed
      // if (data?.nftBalances?._entity.wallet_id !== address) return;

      refresh();
    },
  });

  const extra = {
    loading: isPending,
    refresh,
    fetchMore: () => {
      const pageInfo = data.nftBalances?.pageInfo;
      if (!pageInfo?.hasNextPage) return;

      startTransition(() => {
        fetchMore({
          variables: { after: pageInfo.endCursor },
          updateQuery: (prevData, { fetchMoreResult }) => ({
            nftBalances: {
              totalCount: fetchMoreResult.nftBalances!.totalCount,
              pageInfo: {
                ...prevData.nftBalances!.pageInfo,
                hasNextPage: fetchMoreResult.nftBalances!.pageInfo.hasNextPage,
                endCursor: fetchMoreResult.nftBalances!.pageInfo.endCursor,
              },
              edges: [
                ...(prevData.nftBalances?.edges ?? []),
                ...(fetchMoreResult.nftBalances?.edges ?? []),
              ],
            },
          }),
        });
      });
    },
  };

  return error
    ? ([null, error, extra] as const)
    : ([data.nftBalances, null, extra] as const);
}

/**
 * Return one ERC721 or ERC1155 token of an account.
 *
 * @example
 * ```tsx
 * const [account, accountError] = useKeybanAccount();
 * const [balance, balanceError, { refresh: refreshNft }] = useKeybanAccountNft(account, tokenAddress, tokenId);
 * ```
 * @see {@link useFormattedBalance}
 */
export function useKeybanAccountNft(
  { address }: KeybanAccount,
  tokenAddress: Address,
  tokenId: string,
) {
  const client = useKeybanClient();

  const id = [address, tokenAddress, tokenId].join(":");
  const { data, error, refetch } = useSuspenseQuery(walletNftDocument, {
    client: client.apolloClient,
    variables: { nftBalanceId: id },
  });

  const extra = { refresh: () => refetch() };

  if (error) return [null, error, extra] as const;
  if (!data.nftBalance)
    return [
      null,
      new SdkError(SdkErrorTypes.NftNotFound, "useKeybanAccountNft"),
      extra,
    ];

  return error
    ? ([null, error, extra] as const)
    : ([data.nftBalance, null, extra] as const);
}

/**
 * Return the transfer history of an account.
 *
 * @param {KeybanAccount} param0 - An object containing the address of the Keyban account.
 * @param {PaginationArgs} [options] - Optional pagination arguments for fetching the transfer history.
 * @returns {readonly [AssetTransfers | null, Error | null, Extra]} - A tuple containing:
 * - The transfer history data or null if an error occurred.
 * - The error object or null if no error occurred.
 * - An extra object containing additional information and functions:
 *   - `loading`: A boolean indicating if the data is currently being fetched.
 *   - `refresh`: A function to manually refetch the data.
 *   - `fetchMore`: A function to fetch more data if there are more pages available.
 *
 * @example
 * ```tsx
 * const [account, accountError] = useKeybanAccount();
 * const [txHistory, txHistoryError, { loading, fetchMore: fetchMoreTransferHistory }] = useKeybanAccountTransferHistory(account, { first: 5 });

 * if (loading) {
 *   // Show loading state
 * }
 *
 * if (txHistoryError) {
 *   // Handle error
 * }
 *
 * // Use the transfer data
 * console.log(txHistory);
 *
 * // To fetch more transfer history
 * if (txHistory && txHistory.pageInfo.hasNextPage) {
 *   fetchMoreTransferHistory();
 * }
 * ```
 * @see {@link useFormattedBalance}
 */
export function useKeybanAccountTransferHistory(
  { address }: KeybanAccount,
  options?: PaginationArgs,
) {
  const client = useKeybanClient();

  const [isPending, startTransition] = React.useTransition();

  const { data, error, refetch, fetchMore } = useSuspenseQuery(
    walletAssetTransfersDocument,
    {
      client: client.apolloClient,
      variables: {
        walletId: address,
        orderBy: GqlAssetTransfersOrderBy.TRANSACTION_BLOCK_NUMBER_DESC,
        ...options,
      },
    },
  );

  const debounceTimeoutRef = React.useRef<NodeJS.Timeout>();
  const refresh = React.useCallback(() => {
    clearTimeout(debounceTimeoutRef.current);
    debounceTimeoutRef.current = setTimeout(() => {
      startTransition(() => {
        refetch();
      });
    }, 100);
  }, [startTransition, refetch]);

  useSubscription(assetTransfersSubscriptionDocument, {
    client: client.apolloClient,
    onData({ data: { data } }) {
      const match = [
        data?.assetTransfers?._entity.from_id,
        data?.assetTransfers?._entity.to_id,
      ].includes(address);
      if (!match) return;

      refresh();
    },
  });

  const extra = {
    loading: isPending,
    refresh,
    fetchMore: () => {
      const pageInfo = data.assetTransfers?.pageInfo;
      if (!pageInfo?.hasNextPage) return;

      startTransition(() => {
        fetchMore({
          variables: { after: pageInfo.endCursor },
          updateQuery: (prevData, { fetchMoreResult }) => ({
            assetTransfers: {
              totalCount: fetchMoreResult.assetTransfers!.totalCount,
              pageInfo: {
                ...prevData.assetTransfers!.pageInfo,
                hasNextPage:
                  fetchMoreResult.assetTransfers!.pageInfo.hasNextPage,
                endCursor: fetchMoreResult.assetTransfers!.pageInfo.endCursor,
              },
              edges: [
                ...(prevData.assetTransfers?.edges ?? []),
                ...(fetchMoreResult.assetTransfers?.edges ?? []),
              ],
            },
          }),
        });
      });
    },
  };

  return error
    ? ([null, error, extra] as const)
    : ([data.assetTransfers, null, extra] as const);
}

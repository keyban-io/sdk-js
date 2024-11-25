import React from "react";

import { usePromise } from "~/promise";
import { useKeybanClient } from "~/provider";

import { useSubscription, useSuspenseQuery } from "@apollo/client";
import {
  type Address,
  type KeybanAccount,
  type KeybanTokenBalance,
  type KeybanNftBalance,
  type PaginationArgs,
  type KeybanAssetTransfer,
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

// Generic types

/**
 * An object allowing extra interactions with the Keyban API.
 */
export type ApiResultExtra = {
  /** A boolean indicating if the data is currently being fetched. */
  loading: boolean;
  /** A function to manually refetch the data. */
  refresh: () => void;
  /** A function to fetch more data when the result is a paginated data type. */
  fetchMore?: () => void;
};

/**
 * A tuple representing the result to an API call to the Keyban servers.
 * Since all Keyban hooks uses the [React Suspense API](https://react.dev/reference/react/Suspense),
 * there is only two possible states for the tuple: success ad error.
 * The tuple contains teh following data:
 * - the data result of the API call in case of success, or null in case of error
 * - null in case of success, or teh error in case of error
 * - an {@link ApiResultExtra} object
 *
 * @typeParam T - The data eventually returned
 */
export type ApiResult<T> =
  | readonly [T, null, ApiResultExtra]
  | readonly [null, Error, ApiResultExtra];

/**
 * An object representing a paginated data API result.
 *
 * @typeParam T - The data type being paginated
 */
export type PaginatedData<T> = {
  /** A boolean indicating wether the paginated data has a previous page or not. */
  hasPrevPage: boolean;
  /** A boolean indicating wether the paginated data has a next page or not. */
  hasNextPage: boolean;
  /** The number of total results. */
  totalCount: number;
  /** An array of the data. */
  nodes: T[];
};

/**
 * Fetches the account information.
 */
export function useKeybanAccount(): ApiResult<KeybanAccount> {
  const client = useKeybanClient();
  return usePromise("account", () => client.initialize(), { suspense: true });
}

/**
 * Returns an {@link ApiResult} of the native balance of an account.
 *
 * @param account - A Keyban account object.
 *
 * @example
 * ```tsx
 * const [account, accountError] = useKeybanAccount();
 * if (accountError) throw accountError;
 *
 * const [balance, balanceError] = useKeybanAccountBalance(account);
 * if (balanceError) throw balanceError;
 * ```
 * @see {@link useFormattedBalance}
 */
export function useKeybanAccountBalance({
  address,
}: KeybanAccount): ApiResult<string> {
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
 * Returns an {@link ApiResult} of the ERC20 tokens of an account.
 *
 * @param account - A Keyban account object.
 * @param options - Optional pagination arguments for fetching the token balances.
 *
 * @example
 * ```tsx
 * const [account, accountError] = useKeybanAccount();
 * if (accountError) throw accountError;
 *
 * const [balances, balanceError, { fetchMore }] = useKeybanAccountTokenBalances(account, { first: 5 });
 * if (balanceError) throw balanceError;
 *
 * // Use the token balances
 * console.log(balances.nodes);
 *
 * // To fetch more token balances
 * <button onClick={fetchMore} disabled={!balances.hasNextPage}>
 *   Fetch next page
 * </button>
 * ```
 * @see {@link useFormattedBalance}
 */
export function useKeybanAccountTokenBalances(
  { address }: KeybanAccount,
  options?: PaginationArgs,
): ApiResult<PaginatedData<KeybanTokenBalance>> {
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
    : ([
        {
          hasPrevPage: data.tokenBalances!.pageInfo.hasPreviousPage,
          hasNextPage: data.tokenBalances!.pageInfo.hasNextPage,
          totalCount: data.tokenBalances!.totalCount,
          nodes: data
            .tokenBalances!.edges.map(({ node }) => node)
            .filter(Boolean as unknown as <T>(x?: T | null) => x is T),
        },
        null,
        extra,
      ] as const);
}

/**
 * Returns an {@link ApiResult} of the NFTs of an account.
 *
 * @param account - A Keyban account object.
 * @param options - Optional pagination arguments for fetching the NFTs.
 *
 * @example
 * ```tsx
 * const [account, accountError] = useKeybanAccount();
 * if (accountError) throw accountError;
 *
 * const [nfts, nftsError, { fetchMore }] = useKeybanAccountNfts(account, { first: 5 });
 * if (nftsError) throw nftsError;
 *
 * // Use the NFT data
 * console.log(nfts.nodes);
 *
 * // To fetch more NFTs
 * <button onClick={fetchMore} disabled={!nfts.hasNextPage}>
 *   Fetch next page
 * </button>
 * ```
 * @see {@link useFormattedBalance}
 */
export function useKeybanAccountNfts(
  { address }: KeybanAccount,
  options?: PaginationArgs,
): ApiResult<PaginatedData<KeybanNftBalance>> {
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
    : ([
        {
          hasPrevPage: data.nftBalances!.pageInfo.hasPreviousPage,
          hasNextPage: data.nftBalances!.pageInfo.hasNextPage,
          totalCount: data.nftBalances!.totalCount,
          nodes: data
            .nftBalances!.edges.map(({ node }) => node)
            .filter(Boolean as unknown as <T>(x?: T | null) => x is T),
        },
        null,
        extra,
      ] as const);
}

/**
 * Returns an {@link ApiResult} of one ERC721 or ERC1155 token of an account.
 *
 * @param account - A Keyban account object.
 *
 * @example
 * ```tsx
 * const [account, accountError] = useKeybanAccount();
 * if (accountError) throw accountError;
 *
 * const [balance, balanceError, { refresh }] = useKeybanAccountNft(account, tokenAddress, tokenId);
 * if (balanceError) throw balanceError;
 * ```
 * @see {@link useFormattedBalance}
 */
export function useKeybanAccountNft(
  { address }: KeybanAccount,
  tokenAddress: Address,
  tokenId: string,
): ApiResult<KeybanNftBalance> {
  const client = useKeybanClient();

  const [isPending, startTransition] = React.useTransition();

  const id = [address, tokenAddress, tokenId].join(":");
  const { data, error, refetch } = useSuspenseQuery(walletNftDocument, {
    client: client.apolloClient,
    variables: { nftBalanceId: id },
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

  const extra = {
    loading: isPending,
    refresh,
  };

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
 * Returns an {@link ApiResult} of the transfer history of an account.
 *
 * @param account - A Keyban account object.
 * @param options - Optional pagination arguments for fetching the transfer history.
 *
 * @example
 * ```tsx
 * const [account, accountError] = useKeybanAccount();
 * if (accountError) throw accountError;
 *
 * const [txHistory, txHistoryError, { fetchMore }] = useKeybanAccountTransferHistory(account, { first: 5 });
 * if (txHistoryError) throw txHistoryError;
 *
 * // Use the transfer data
 * console.log(txHistory.nodes);
 *
 * // To fetch more transfer history
 * <button onClick={fetchMore} disabled={!txHistory.hasNextPage}>
 *   Fetch next page
 * </button>
 * ```
 * @see {@link useFormattedBalance}
 */
export function useKeybanAccountTransferHistory(
  { address }: KeybanAccount,
  options?: PaginationArgs,
): ApiResult<PaginatedData<KeybanAssetTransfer>> {
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
    : ([
        {
          hasPrevPage: data.assetTransfers!.pageInfo.hasPreviousPage,
          hasNextPage: data.assetTransfers!.pageInfo.hasNextPage,
          totalCount: data.assetTransfers!.totalCount,
          nodes: data
            .assetTransfers!.edges.map(({ node }) => node)
            .filter(Boolean as unknown as <T>(x?: T | null) => x is T),
        },
        null,
        extra,
      ] as const);
}

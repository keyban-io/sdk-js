import React from "react";

import { usePromise } from "~/promise";
import { useKeybanClient } from "~/provider";

import { useSubscription, useSuspenseQuery } from "@apollo/client";
import {
  type Address,
  type KeybanAccount,
  type KeybanAssetTransfer,
  type KeybanNftBalance,
  type KeybanTokenBalance,
  type PaginationArgs,
  SdkError,
  SdkErrorTypes,
} from "@keyban/sdk-base";
import {
  assetTransfersSubscriptionDocument,
  GqlAssetTransfersOrderBy,
  GqlMutationType,
  GqlNftBalancesOrderBy,
  type GqlPageInfo,
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
 * A tuple representing the result to an API call to the Keyban servers.
 * Since all Keyban hooks uses the [React Suspense API](https://react.dev/reference/react/Suspense),
 * there is only two possible states for the tuple: success ad error.
 * The tuple contains teh following data:
 * - the data result of the API call in case of success, or null in case of error
 * - null in case of success, or teh error in case of error
 * - an optional extra object allowing for interactions with teh data
 *
 * @typeParam T - The data eventually returned
 * @typeParam Extra - The data eventually returned
 */
export type ApiResult<T, Extra = undefined> =
  | readonly [T, null, Extra]
  | readonly [null, Error, Extra];

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
 * An object allowing extra interactions with the Keyban API.
 */
export type PaginationExtra = {
  /** A boolean indicating if the data is currently being fetched. */
  loading: boolean;
  /** A function to fetch more data when the result is a paginated data type. */
  fetchMore?: () => void;
};

// Utils

function getPaginatedResults<T>(data: {
  pageInfo: GqlPageInfo;
  totalCount: number;
  edges: { node?: T | null }[];
}): PaginatedData<T> {
  return {
    hasPrevPage: data.pageInfo.hasPreviousPage,
    hasNextPage: data.pageInfo.hasNextPage,
    totalCount: data.totalCount,
    nodes: data.edges
      .map(({ node }) => node)
      .filter(Boolean as unknown as <T>(x?: T | null) => x is T),
  };
}

function usePaginationExtra(
  data: {
    res: { pageInfo: GqlPageInfo } | null;
  },
  fetchMore: (options: { variables: { after?: string | null } }) => unknown,
): PaginationExtra {
  const [isPending, startTransition] = React.useTransition();

  return {
    loading: isPending,
    fetchMore: () => {
      startTransition(() => {
        fetchMore({ variables: { after: data.res?.pageInfo.endCursor } });
      });
    },
  };
}

/**
 * Fetches the account information.
 */
export function useKeybanAccount(): ApiResult<KeybanAccount> {
  const client = useKeybanClient();
  const [data, error] = usePromise("account", () => client.initialize(), {
    suspense: true,
  });
  return [data, error, undefined] as ApiResult<KeybanAccount>;
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

  const { data, error } = useSuspenseQuery(walletBalanceDocument, {
    client: client.apolloClient,
    variables: { walletId: address },
  });

  useSubscription(walletSubscriptionDocument, {
    client: client.apolloClient,
    variables: {
      walletIds: [address],
    },
    onData({ client, data: { data } }) {
      // Setting up the subscription isn't enouth, in case of an insert, the
      // cache won't be updated.
      client.cache.updateQuery(
        {
          query: walletBalanceDocument,
          variables: { walletId: address },
        },
        () => ({ res: data!.sub!._entity }),
      );
    },
  });

  return error
    ? ([null, error, undefined] as const)
    : ([data.res?.balance ?? "0", null, undefined] as const);
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
): ApiResult<PaginatedData<KeybanTokenBalance>, PaginationExtra> {
  const client = useKeybanClient();

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

  const debounceRef = React.useRef<NodeJS.Timeout>();
  useSubscription(tokenBalancesSubscriptionDocument, {
    client: client.apolloClient,
    onData({ data: { data } }) {
      switch (data?.sub?.mutation_type) {
        case GqlMutationType.INSERT:
        case GqlMutationType.UPDATE:
        case GqlMutationType.DELETE:
          break;
      }

      // TODO: replace me
      clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        React.startTransition(() => {
          refetch();
        });
      }, 100);
    },
  });

  const extra = usePaginationExtra(data, fetchMore);

  return error
    ? ([null, error, extra] as const)
    : ([getPaginatedResults(data.res!), null, extra] as const);
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
): ApiResult<PaginatedData<KeybanNftBalance>, PaginationExtra> {
  const client = useKeybanClient();

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

  const debounceRef = React.useRef<NodeJS.Timeout>();
  useSubscription(nftBalancesSubscriptionDocument, {
    client: client.apolloClient,
    onData({ data: { data } }) {
      switch (data?.sub?.mutation_type) {
        case GqlMutationType.INSERT:
        case GqlMutationType.UPDATE:
        case GqlMutationType.DELETE:
          break;
      }

      // TODO: replace me
      clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        React.startTransition(() => {
          refetch();
        });
      }, 100);
    },
  });

  const extra = usePaginationExtra(data, fetchMore);

  return error
    ? ([null, error, extra] as const)
    : ([getPaginatedResults(data.res!), null, extra] as const);
}

/**
 * Returns an {@link ApiResult} containing a specific NFT (ERC721 or ERC1155) of an account.
 *
 * @param account - A `KeybanAccount` object representing the user account.
 * @param tokenAddress - The address of the NFT contract (ERC721 or ERC1155).
 * @param tokenId - The unique identifier of the NFT within the contract.
 *
 * @returns An `ApiResult` tuple containing the `KeybanNftBalance` if successful, or an error otherwise.
 *
 * @throws {SdkError} If the NFT is not found (`SdkErrorTypes.NftNotFound`).
 *
 * @example
 * ```tsx
 * const [account, accountError] = useKeybanAccount();
 * if (accountError) throw accountError;
 *
 * const [nftBalance, nftError] = useKeybanAccountNft(account, tokenAddress, tokenId);
 * if (nftError) {
 *   // Handle the error (e.g., NFT not found)
 *   console.error(nftError);
 * } else {
 *   // Use the NFT data
 *   console.log(nftBalance);
 * }
 * ```
 * @see {@link useFormattedBalance}
 */
export function useKeybanAccountNft(
  { address }: KeybanAccount,
  tokenAddress: Address,
  tokenId: string,
): ApiResult<KeybanNftBalance> {
  const client = useKeybanClient();

  const id = [address, tokenAddress, tokenId].join(":");
  const { data, error } = useSuspenseQuery(walletNftDocument, {
    client: client.apolloClient,
    variables: { nftBalanceId: id },
  });

  if (error) return [null, error, undefined] as const;
  if (!data.res)
    return [
      null,
      new SdkError(SdkErrorTypes.NftNotFound, "useKeybanAccountNft"),
      undefined,
    ];

  return [data.res, null, undefined] as const;
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
): ApiResult<PaginatedData<KeybanAssetTransfer>, PaginationExtra> {
  const client = useKeybanClient();

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

  const debounceRef = React.useRef<NodeJS.Timeout>();
  useSubscription(assetTransfersSubscriptionDocument, {
    client: client.apolloClient,
    onData({ data: { data } }) {
      // const match = [
      //   data?.sub?._entity?.fromId,
      //   data?.sub?._entity?.toId,
      // ].includes(address);
      // if (!match) return;

      switch (data?.sub?.mutation_type) {
        case GqlMutationType.INSERT:
        case GqlMutationType.UPDATE:
        case GqlMutationType.DELETE:
          break;
      }

      // TODO: replace me
      clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        React.startTransition(() => {
          refetch();
        });
      }, 100);
    },
  });

  const extra = usePaginationExtra(data, fetchMore);

  return error
    ? ([null, error, extra] as const)
    : ([getPaginatedResults(data.res!), null, extra] as const);
}

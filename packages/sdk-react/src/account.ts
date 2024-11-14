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
  PaginationArgs,
  SdkError,
  SdkErrorTypes,
} from "@keyban/sdk-base";
import {
  assetTransfersSubscriptionDocument,
  GqlAssetTransfersOrderBy,
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
export function useKeybanAccountBalance({ address }: KeybanAccount) {
  const client = useKeybanClient();

  const [isPending, startTransition] = React.useTransition();

  const { data, error, refetch } = useSuspenseQuery(walletBalanceDocument, {
    client: client.apolloClient,
    variables: { walletId: address },
  });

  useSubscription(walletSubscriptionDocument, {
    client: client.apolloClient,
    onData() {
      startTransition(() => {
        refetch();
      });
    },
  });

  const extra = {
    loading: isPending,
    refresh: () => {
      startTransition(() => {
        refetch();
      });
    },
  };

  return error
    ? ([null, error, extra] as const)
    : ([data.wallet?.balance ?? "0", null, extra] as const);
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
export function useKeybanAccountTokenBalances(
  { address }: KeybanAccount,
  options?: PaginationArgs,
) {
  const client = useKeybanClient();

  const [isPending, startTransition] = React.useTransition();

  const { data, error, refetch, fetchMore } = useSuspenseQuery(
    walletTokenBalancesDocument,
    {
      client: client.apolloClient,
      variables: { walletId: address, ...options },
    },
  );

  useSubscription(tokenBalancesSubscriptionDocument, {
    client: client.apolloClient,
    onData({ data: { data } }) {
      // TODO: get the filter back when https://github.com/subquery/subql/issues/2590 get fixed
      // if (data?.tokenBalances?._entity.wallet_id !== address) return;

      startTransition(() => {
        refetch();
      });
    },
  });

  const extra = {
    loading: isPending,
    refresh: () => {
      startTransition(() => {
        refetch();
      });
    },
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
 * Return the ERC721 and ERC1155 tokens of an account.
 *
 * @example
 * ```tsx
 * const [account, accountError] = useKeybanAccount();
 * const [balance, balanceError, { refresh: refreshNfts }] = useKeybanAccountNfts(account);
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
      variables: { walletId: address, ...options },
    },
  );

  useSubscription(nftBalancesSubscriptionDocument, {
    client: client.apolloClient,
    onData({ data: { data } }) {
      // TODO: get the filter back when https://github.com/subquery/subql/issues/2590 get fixed
      // if (data?.nftBalances?._entity.wallet_id !== address) return;

      startTransition(() => {
        refetch();
      });
    },
  });

  const extra = {
    loading: isPending,
    refresh: () => {
      startTransition(() => {
        refetch();
      });
    },
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
 * Return the ERC721 and ERC1155 tokens of an account.
 *
 * @example
 * ```tsx
 * const [account, accountError] = useKeybanAccount();
 * const [txHistory, txHistoryError, { refresh: refreshTransferHistory }] = useKeybanAccountTransferHistory(account);
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
        orderBy: GqlAssetTransfersOrderBy.BLOCK_NUMBER_DESC,
        ...options,
      },
    },
  );

  useSubscription(assetTransfersSubscriptionDocument, {
    client: client.apolloClient,
    onData({ data: { data } }) {
      const match = [
        data?.assetTransfers?._entity.from_id,
        data?.assetTransfers?._entity.to_id,
      ].includes(address);
      if (!match) return;

      startTransition(() => {
        refetch();
      });
    },
  });

  const extra = {
    loading: isPending,
    refresh: () => {
      startTransition(() => {
        refetch();
      });
    },
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

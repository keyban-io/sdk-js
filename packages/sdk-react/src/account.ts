import React from "react";

import { usePromise } from "~/promise";
import { useKeybanClient } from "~/provider";

import { useSuspenseQuery } from "@apollo/client";
import {
  type Address,
  type KeybanAccount,
  SdkError,
  SdkErrorTypes,
} from "@keyban/sdk-base";
import {
  assetTransfersSubscriptionDocument,
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

  const { data, error, refetch, subscribeToMore } = useSuspenseQuery(
    walletBalanceDocument,
    {
      client: client.apolloClient,
      variables: { walletId: address },
    },
  );

  React.useEffect(
    () =>
      subscribeToMore({
        document: walletSubscriptionDocument,
        variables: { walletIds: [address], mutation: null },
        updateQuery: (_prev, { subscriptionData }) => ({
          wallet: subscriptionData.data.wallets?._entity,
        }),
      }),
    [subscribeToMore, address],
  );

  const extra = { refresh: () => refetch() };

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
export function useKeybanAccountTokenBalances({ address }: KeybanAccount) {
  const client = useKeybanClient();

  const [isPending, startTransition] = React.useTransition();

  const { data, error, refetch, fetchMore, subscribeToMore } = useSuspenseQuery(
    walletTokenBalancesDocument,
    {
      client: client.apolloClient,
      variables: { walletId: address },
    },
  );

  React.useEffect(
    () =>
      subscribeToMore({
        document: tokenBalancesSubscriptionDocument,
        updateQuery: (prev, { subscriptionData }) => {
          const update = subscriptionData.data.tokenBalances;
          if (update?._entity.wallet_id === address) refetch();
          return prev;
        },
      }),
    [subscribeToMore, address],
  );

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
 * const [balance, balanceError, { refresh: refreshBalance }] = useKeybanAccountNfts(account);
 * ```
 * @see {@link useFormattedBalance}
 */
export function useKeybanAccountNfts({ address }: KeybanAccount) {
  const client = useKeybanClient();

  const [isPending, startTransition] = React.useTransition();

  const { data, error, refetch, fetchMore, subscribeToMore } = useSuspenseQuery(
    walletNftsDocument,
    {
      client: client.apolloClient,
      variables: { walletId: address },
    },
  );

  React.useEffect(
    () =>
      subscribeToMore({
        document: nftBalancesSubscriptionDocument,
        updateQuery: (prev, { subscriptionData }) => {
          const update = subscriptionData.data.nftBalances;
          if (update?._entity.wallet_id === address) refetch();
          return prev;
        },
      }),
    [subscribeToMore, address],
  );

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
 * const [balance, balanceError, { refresh: refreshBalance }] = useKeybanAccountNft(account, tokenAddress, tokenId);
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
 * const [txHistory, txHistoryError, { refresh: refreshBalance }] = useKeybanAccountTransactionHistory(account);
 * ```
 * @see {@link useFormattedBalance}
 */
export function useKeybanAccountTransactionHistory({ address }: KeybanAccount) {
  const client = useKeybanClient();

  const [isPending, startTransition] = React.useTransition();

  const { data, error, refetch, fetchMore, subscribeToMore } = useSuspenseQuery(
    walletAssetTransfersDocument,
    {
      client: client.apolloClient,
      variables: { walletId: address },
    },
  );

  React.useEffect(
    () =>
      subscribeToMore({
        document: assetTransfersSubscriptionDocument,
        updateQuery: (prev, { subscriptionData }) => {
          const update = subscriptionData.data.assetTransfers;

          const match = [
            update?._entity.from_id,
            update?._entity.to_id,
          ].includes(address);
          if (match) refetch();

          return prev;
        },
      }),
    [subscribeToMore, address],
  );

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
        });
      });
    },
  };

  return error
    ? ([null, error, extra] as const)
    : ([data.assetTransfers, null, extra] as const);
}

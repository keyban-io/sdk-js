import React from "react";

import { usePromise } from "~/promise";
import { useKeybanClient } from "~/provider";

import { useSuspenseQuery } from "@apollo/client";
import {
  Address,
  KeybanAccount,
  SdkError,
  SdkErrorTypes,
} from "@keyban/sdk-base";
import {
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

  const { data, error, refetch, subscribeToMore } = useSuspenseQuery(
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
        variables: {
          tokenBalancesIds: null,
          mutation: null,
        },
        updateQuery: (prev, { subscriptionData }) => {
          const update = subscriptionData.data.tokenBalances;
          if (update?._entity.wallet_id !== address) return prev;

          switch (subscriptionData.data.tokenBalances?.mutation_type) {
            case "UPDATE":
              // Chec if the update is actually an insert... subql kinda messed up :/
              const exists = prev.tokenBalances?.nodes.find(
                (node) => node?.id === update.id,
              );
              if (!exists) {
                // In case of an insert, we can't request nested data through the subscription
                // due to subql bad implementation... the only way is to refetch t whole data :/
                refetch();
                return prev;
              }

              return {
                ...prev,
                tokenBalances: {
                  ...prev.tokenBalances,
                  nodes: (prev.tokenBalances?.nodes ?? []).map((node) =>
                    node?.id === update?.id
                      ? { ...node, ...update?._entity }
                      : node,
                  ),
                },
              };

            case "DELETE":
              return {
                ...prev,
                tokenBalances: {
                  ...prev.tokenBalances,
                  nodes: (prev.tokenBalances?.nodes ?? []).filter(
                    (node) => node?.id !== update?.id,
                  ),
                },
              };
          }

          return prev;
        },
      }),
    [subscribeToMore, address],
  );

  const extra = { refresh: () => refetch() };

  return error
    ? ([null, error, extra] as const)
    : ([data.tokenBalances?.nodes ?? [], null, extra] as const);
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

  const { data, error, refetch } = useSuspenseQuery(walletNftsDocument, {
    client: client.apolloClient,
    variables: { walletId: address },
  });

  const extra = { refresh: () => refetch() };

  return error
    ? ([null, error, extra] as const)
    : ([data.nftBalances?.nodes ?? [], null, extra] as const);
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
 * const [txHistory, txHistoryError, { refresh: refreshBalance }] = useKeybanAccountTransactionHistory(account); // TODO??
 * ```
 * @see {@link useFormattedBalance}
 */
export function useKeybanAccountTransactionHistory(account: KeybanAccount) {
  const client = useKeybanClient();

  const { data, error, refetch } = useSuspenseQuery(
    walletAssetTransfersDocument,
    {
      client: client.apolloClient,
      variables: { walletId: account.address },
    },
  );

  const extra = { refresh: () => refetch() };

  return error
    ? ([null, error, extra] as const)
    : ([data.assetTransfers?.nodes ?? [], null, extra] as const);
}

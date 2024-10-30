import { useSubscription, useSuspenseQuery } from "@apollo/client";
import {
  Address,
  KeybanAccount,
  SdkError,
  SdkErrorTypes,
} from "@keyban/sdk-base";
import {
  KeybanClient_walletNftDocument,
  KeybanClient_walletNftsDocument,
  KeybanClient_walletTokenBalancesDocument,
  KeybanClient_walletBalanceDocument,
  KeybanClient_walletSubscriptionDocument,
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
export function useKeybanAccountBalance({ address }: KeybanAccount) {
  const client = useKeybanClient();

  const { data, error, refetch, subscribeToMore } = useSuspenseQuery(
    KeybanClient_walletBalanceDocument,
    {
      client: client.apolloClient,
      variables: { address },
    },
  );

  subscribeToMore;

  useSubscription(KeybanClient_walletSubscriptionDocument, {
    client: client.apolloClient,
    variables: { address },
    onData({ client, data: { data } }) {
      client.writeQuery({
        query: KeybanClient_walletBalanceDocument,
        variables: { address },
        data: {
          wallet: {
            id: data?.wallets?._entity.id,
            balance: data?.wallets?._entity.balance.toString(),
          },
        },
      });
    },
  });

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

  const { data, error, refetch } = useSuspenseQuery(
    KeybanClient_walletTokenBalancesDocument,
    {
      client: client.apolloClient,
      variables: { address },
    },
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

  const { data, error, refetch } = useSuspenseQuery(
    KeybanClient_walletNftsDocument,
    {
      client: client.apolloClient,
      variables: { address },
    },
  );

  const extra = { refresh: () => refetch() };

  return error
    ? ([null, error, extra] as const)
    : ([data.nfts?.nodes ?? [], null, extra] as const);
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
  const { data, error, refetch } = useSuspenseQuery(
    KeybanClient_walletNftDocument,
    {
      client: client.apolloClient,
      variables: { id },
    },
  );

  const extra = { refresh: () => refetch() };

  if (error) return [null, error, extra] as const;
  if (!data.nft)
    return [
      null,
      new SdkError(SdkErrorTypes.NftNotFound, "useKeybanAccountNft"),
      extra,
    ];

  return error
    ? ([null, error, extra] as const)
    : ([data.nft, null, extra] as const);
}

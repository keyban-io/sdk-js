/**
 * @module Account
 */
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
import React from "react";

import { usePromise } from "~/promise";
import { useKeybanClient } from "~/provider";

// Generic types

/**
 * A tuple representing the result of an API call to the Keyban servers.
 *
 * Since all Keyban hooks use the [React Suspense API](https://react.dev/reference/react/Suspense),
 * there are only two possible states for the tuple: success and error.
 *
 * The tuple contains the following data:
 * - On **success**:
 * - The data result of the API call (of type `T`).
 * - `null` for the error.
 * - An optional extra object (of type `Extra`) allowing for additional interactions.
 * - On **error**:
 * - `null` for the data.
 * - An `Error` object representing the error.
 * - An optional extra object (of type `Extra`) allowing for additional interactions.
 * @template T - The type of the data returned on success.
 * @template Extra - The type of the optional extra object for additional interactions.
 * @remarks
 * The `ApiResult` type is designed to simplify handling asynchronous API responses in Keyban hooks.
 * It adheres to the pattern `[data, error, extra]`, where:
 * - `data`: The result of the API call if successful, or `null` if there was an error.
 * - `error`: `null` if the call was successful, or an `Error` object if there was an error.
 * - `extra`: An optional object providing additional information or methods, defaulting to `undefined` if not used.
 *
 * **Example Usage:**
 * ```typescript
 * const [data, error, extra] = useKeybanSomeHook();
 * if (error) {
 *   // Handle the error
 *   console.error(error);
 * } else {
 *   // Use the data
 *   console.log(data);
 *   // Optionally use extra interactions
 *   extra?.someMethod();
 * }
 * ```
 */
export type ApiResult<T, Extra = undefined> =
  | readonly [T, null, Extra]
  | readonly [null, Error, Extra];

/**
 * An object representing a paginated data API result.
 * @template T - The data type being paginated
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

type GqlEdge<T extends { id: string }> = {
  cursor: string | null;
  node: T | null;
};
type GqlPaginatedData<T extends { id: string }> = {
  pageInfo: GqlPageInfo;
  totalCount: number;
  edges: GqlEdge<T>[];
};

/**
 * Extracts paginated results from the given data.
 * @param data - The data containing pagination information and edges.
 * @param data.pageInfo - Information about the pagination state.
 * @param data.totalCount - The total number of results.
 * @param data.edges - The edges containing the nodes.
 * @returns - The paginated data.
 * @template T - The type of the data being paginated.
 */
function getPaginatedResults<T extends { id: string }>(
  data: GqlPaginatedData<T>,
): PaginatedData<T> {
  return {
    hasPrevPage: data.pageInfo.hasPreviousPage,
    hasNextPage: data.pageInfo.hasNextPage,
    totalCount: data.totalCount,
    nodes: data.edges
      .map(({ node }) => node)
      .filter(Boolean as unknown as <T>(x?: T | null) => x is T),
  };
}

/**
 * Provides extra pagination controls for fetching more data.
 * @param data - The data containing pagination information.
 * @param fetchMore - A function to fetch more data.
 * @returns - An object containing loading state and fetchMore function.
 */
function usePaginationExtra<T extends { id: string }>(
  data: GqlPaginatedData<T>,
  fetchMore: (options: { variables: { after?: string | null } }) => unknown,
): PaginationExtra {
  const [isPending, startTransition] = React.useTransition();

  return {
    loading: isPending,
    fetchMore: () => {
      startTransition(() => {
        fetchMore({ variables: { after: data.pageInfo.endCursor } });
      });
    },
  };
}

/**
 * Update paginated data with subscription update.
 * @param prev -
 * @param mutationType -
 * @param edge -
 * @param isBefore -
 * @returns - The updated paginated data
 */
function updatePaginatedData<T extends { id: string }>(
  prev: GqlPaginatedData<T>,
  mutationType: GqlMutationType,
  edge: GqlEdge<T>,
  isBefore: (a: GqlEdge<T>) => boolean,
) {
  switch (mutationType) {
    // subql cannot differentiate between inserts and
    // updates when historical data are enabled
    case GqlMutationType.INSERT:
    case GqlMutationType.UPDATE: {
      if (prev.edges.find(({ node }) => node?.id === edge.node?.id))
        // This is an update for sure, apollo cache already updated
        // it with normalized cache, nothing more to do
        return prev;

      const insertIndex =
        prev.edges.findLastIndex((edge) => isBefore(edge)) + 1;

      const isFirst = insertIndex === 0;
      const isLast = insertIndex === prev.edges.length;
      const { hasPreviousPage, hasNextPage } = prev.pageInfo;

      if ((hasPreviousPage && isFirst) || (hasNextPage && isLast))
        // the entity is outside the range of known data, we cannot
        // update the totalCount since we cannot be not sure if
        // it's an update or an insert
        return {
          ...prev,
          totalCount:
            prev.totalCount + Number(mutationType === GqlMutationType.INSERT),
        };

      const edges = [...prev.edges]; // clone array
      edges.splice(insertIndex, 0, edge); // insert edge

      return {
        pageInfo: {
          ...prev.pageInfo,
          startCursor: edges[0].cursor,
          endCursor: edges[edges.length - 1].cursor,
        },
        totalCount: prev.totalCount + 1,
        edges,
      };
    }

    case GqlMutationType.DELETE: {
      const edges = prev.edges.filter(({ node }) => node?.id !== edge.node?.id);

      return {
        pageInfo: {
          ...prev.pageInfo,
          startCursor: edges[0]?.cursor ?? null,
          endCursor: edges[edges.length - 1]?.cursor ?? null,
        },
        totalCount: prev.totalCount - 1,
        edges,
      };
    }
  }
}

/**
 * Retrieves the current `KeybanAccount` associated with the Keyban client.
 *
 * This React hook allows you to access the user's Keyban account within a functional component.
 * It returns an `ApiResult` tuple containing the account data or an error if one occurred during retrieval.
 * @returns - An array containing the account data, error, and an undefined value.
 * @example
 * ```tsx
 * import { useKeybanAccount } from "@keyban/sdk-react";
 *
 * const MyComponent: React.FC = () => {
 *   const [account, accountError] = useKeybanAccount();
 *   if (accountError) throw accountError;
 *
 *   return (
 *     <div>
 *       <p>Your wallet address: {account.address}</p>
 *     </div>
 *   );
 * };
 * ```
 * @remarks
 * - Ensure that your component is wrapped within a `KeybanProvider` to have access to the Keyban client context.
 * - The hook internally uses React Suspense and may throw a promise if the data is not yet available.
 * - Handle errors appropriately to ensure a good user experience.
 * @see {@link KeybanAccount}
 */
export function useKeybanAccount(): ApiResult<KeybanAccount> {
  const client = useKeybanClient();
  const [data, error] = usePromise("account", () => client.initialize(), {
    suspense: true,
  });
  return [data, error, undefined] as ApiResult<KeybanAccount>;
}

/**
 * Hook to retrieve and subscribe to the balance of a Keyban account.
 *
 * This React hook allows you to fetch the native balance of a Keyban account and automatically updates when the balance changes.
 * It returns an `ApiResult` tuple containing the balance or an error if one occurred during retrieval.
 * @param account  - The `KeybanAccount` object representing the user account.
 * @returns - An `ApiResult<string>` tuple containing:
 * - **First element (`balance`)**: A `string` representing the account's native token balance in the smallest unit (e.g., wei for Ethereum). This value automatically updates when the balance changes.
 * - **Second element (`error`)**: An `Error` object if an error occurred during retrieval, or `null` if the balance was fetched successfully.
 *
 * **Return Structure:**
 * ```typescript
 * [balance: string, error: Error | null]
 * ```
 * - `balance`: The current balance of the Keyban account as a string.
 * - `error`: An `Error` object if there was an error fetching the balance, otherwise `null`.
 * @example
 * ```tsx
 * import { useKeybanAccount, useKeybanAccountBalance } from "@keyban/sdk-react";
 *
 * const AccountBalance: React.FC = () => {
 *   const [account, accountError] = useKeybanAccount();
 *   if (accountError) throw accountError;
 *
 *   const [balance, balanceError] = useKeybanAccountBalance(account);
 *   if (balanceError) throw balanceError;
 *
 *   return <div>Balance: {balance}</div>;
 * };
 * ```
 * @remarks
 * - **Balance Format:** The balance is returned as a string representing the amount in the smallest denomination (e.g., wei). You may need to format it to a human-readable format (e.g., Ether) using utility functions.
 * - **Real-Time Updates:** The hook subscribes to balance changes, so your component will re-render automatically when the balance updates.
 * - **Error Handling:** Always check the `error` element to handle any issues that might occur during balance retrieval.
 * - Ensure that your component is wrapped within a `KeybanProvider` to have access to the Keyban client context.
 * @throws Will throw an error if used outside of a `KeybanProvider` or if there's an issue retrieving the balance.
 * @see {@link useKeybanAccount}
 * @see {@link KeybanAccount}
 */
export function useKeybanAccountBalance(
  account: KeybanAccount,
): ApiResult<string> {
  const client = useKeybanClient();

  const { data, error } = useSuspenseQuery(walletBalanceDocument, {
    client: client.apolloClient,
    variables: { walletId: account.address },
  });

  useSubscription(walletSubscriptionDocument, {
    client: client.apolloClient,
    variables: {
      walletIds: [account.address],
    },
    onData({ client, data: { data } }) {
      // Setting up the subscription isn't enouth, in case of an insert, the
      // cache won't be updated.
      client.cache.updateQuery(
        {
          query: walletBalanceDocument,
          variables: { walletId: account.address },
        },
        () => ({ res: data!.sub!.entity }),
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
 * The `useKeybanAccountTokenBalances` React hook enables you to fetch and monitor the list of ERC20 token balances owned by a specific Keyban account. It supports pagination, allowing efficient handling of large token collections by fetching data in manageable segments. This hook returns an `ApiResult` tuple containing the paginated token balance data, any potential errors, and additional pagination controls.
 * @param account - The Keyban account object containing the address.
 * @param [options] - Optional pagination arguments for fetching the token balances.
 * @returns - The result containing paginated ERC20 token balances or an error, along with pagination controls.
 * @throws {SdkError} If the provided account has an invalid address (`SdkErrorTypes.AddressInvalid`).
 * @throws {SdkError} If no ERC20 token balances are found for the provided account (`SdkErrorTypes.TokenBalancesNotFound`).
 * @example
 * ```tsx
 * import React from 'react';
 * import { useKeybanAccount, useKeybanAccountTokenBalances } from "@keyban/sdk-react";
 *
 * const TokenBalancesList: React.FC = () => {
 *   const [account, accountError] = useKeybanAccount();
 *
 *   if (accountError) {
 *     return <div>Error fetching account: {accountError.message}</div>;
 *   }
 *
 *   const [balances, balancesError, { fetchMore, loading }] = useKeybanAccountTokenBalances(account, { first: 5 });
 *
 *   if (balancesError) {
 *     return <div>Error fetching token balances: {balancesError.message}</div>;
 *   }
 *
 *   if (!balances) {
 *     return <div>Loading token balances...</div>;
 *   }
 *
 *   return (
 *     <div>
 *       <h3>Your ERC20 Token Balances</h3>
 *       <ul>
 *         {balances.nodes.map((balance) => (
 *           <li key={balance.id}>
 *             <p>Token: {balance.token?.symbol || "Unknown"}</p>
 *             <p>Balance: {balance.balance}</p>
 *             {balance.token && (
 *               <>
 *                 <p>Name: {balance.token.name || "N/A"}</p>
 *                 <p>Decimals: {balance.token.decimals !== null ? balance.token.decimals : "N/A"}</p>
 *                 <img src={balance.token.iconUrl || ""} alt={`${balance.token.symbol} icon`} width={24} height={24} />
 *               </>
 *             )}
 *           </li>
 *         ))}
 *       </ul>
 *       {balances.hasNextPage && (
 *         <button onClick={fetchMore} disabled={loading}>
 *           {loading ? 'Loading...' : 'Load More'}
 *         </button>
 *       )}
 *     </div>
 *   );
 * };
 *
 * export default TokenBalancesList;
 * ```
 * @remarks
 * - **Pagination Support:** Utilize the {@link PaginationArgs} to control the number of ERC20 token balances fetched per request and to navigate through pages using cursors.
 * - **Real-Time Updates:** The hook subscribes to changes in the ERC20 token balances, ensuring that your UI reflects the latest data without manual refreshes.
 * - **Error Handling:** Always check for errors returned by the hook to provide informative feedback to the user and handle different error scenarios gracefully.
 * - **Context Requirement:** Ensure that your component is wrapped within a `KeybanProvider` to provide the necessary context for the hooks to function correctly.
 * @see {@link KeybanAccount}
 * @see {@link PaginationArgs}
 * @see {@link PaginationExtra}
 */
export function useKeybanAccountTokenBalances(
  account: KeybanAccount,
  options?: PaginationArgs,
): ApiResult<PaginatedData<KeybanTokenBalance>, PaginationExtra> {
  const client = useKeybanClient();

  const { data, error, fetchMore, subscribeToMore } = useSuspenseQuery(
    walletTokenBalancesDocument,
    {
      client: client.apolloClient,
      variables: {
        walletId: account.address,
        orderBy: [GqlTokenBalancesOrderBy.TOKEN_SYMBOL_ASC],
        ...options,
      },
    },
  );

  React.useEffect(
    () =>
      subscribeToMore({
        document: tokenBalancesSubscriptionDocument,
        updateQuery(prev, { subscriptionData }) {
          if (!prev.res) return prev;
          if (!subscriptionData.data.sub?.entity) return prev;

          const { mutationType, entity } = subscriptionData.data.sub;
          if (entity.walletId !== account.address) return prev;

          return {
            res: updatePaginatedData(
              prev.res,
              mutationType,
              {
                cursor: btoa(
                  JSON.stringify([
                    GqlTokenBalancesOrderBy.TOKEN_SYMBOL_ASC.toLowerCase(),
                    [
                      Number(entity.token?.symbol),
                      JSON.parse(atob(entity.nodeId))[0],
                    ],
                  ]),
                ),
                node: entity,
              },
              ({ node }) => node!.token!.symbol! < entity.token!.symbol!,
            ),
          };
        },
      }),
    [subscribeToMore, account.address],
  );

  const extra = usePaginationExtra(data.res!, fetchMore);

  return error
    ? ([null, error, extra] as const)
    : ([getPaginatedResults(data.res!), null, extra] as const);
}

/**
 * Returns an {@link ApiResult} of the NFTs of an account.
 *
 * The `useKeybanAccountNfts` React hook allows you to fetch and subscribe to the list of all NFTs (both ERC721 and ERC1155) owned by a specific Keyban account. It supports pagination, enabling efficient retrieval of large NFT collections by fetching data in manageable chunks. This hook returns an `ApiResult` tuple containing the paginated NFT data, any potential errors, and additional pagination controls.
 * @param account - A Keyban account object.
 * @param [options] - Optional pagination arguments for fetching the NFTs.
 * @returns - The result containing paginated NFT balances or an error, along with pagination controls.
 * @throws {SdkError} If the provided account has an invalid address (`SdkErrorTypes.AddressInvalid`).
 * @throws {SdkError} If no NFTs are found for the provided account (`SdkErrorTypes.NftNotFound`).
 * @example
 * ```tsx
 * import React from 'react';
 * import { useKeybanAccount, useKeybanAccountNfts } from "@keyban/sdk-react";
 *
 * const NftsList: React.FC = () => {
 *   const [account, accountError] = useKeybanAccount();
 *
 *   if (accountError) {
 *     return <div>Error fetching account: {accountError.message}</div>;
 *   }
 *
 *   const [nfts, nftsError, { fetchMore, loading }] = useKeybanAccountNfts(account, { first: 5 });
 *
 *   if (nftsError) {
 *     return <div>Error fetching NFTs: {nftsError.message}</div>;
 *   }
 *
 *   if (!nfts) {
 *     return <div>Loading NFTs...</div>;
 *   }
 *
 *   return (
 *     <div>
 *       <h3>Your NFTs</h3>
 *       <ul>
 *         {nfts.nodes.map((nft) => (
 *           <li key={nft.id}>
 *             <p>NFT ID: {nft.id}</p>
 *             {nft.nft && (
 *               <>
 *                 <p>Collection: {nft.nft.collection?.name || "Unknown"}</p>
 *                 <p>Symbol: {nft.nft.collection?.symbol || "N/A"}</p>
 *                 <p>Token ID: {nft.nft.tokenId}</p>
 *                 // Render additional metadata as needed
 *               </>
 *             )}
 *           </li>
 *         ))}
 *       </ul>
 *       {nfts.hasNextPage && (
 *         <button onClick={fetchMore} disabled={loading}>
 *           {loading ? 'Loading...' : 'Load More'}
 *         </button>
 *       )}
 *     </div>
 *   );
 * };
 *
 * export default NftsList;
 * ```
 * @remarks
 * - **Pagination Support:** Utilize the {@link PaginationArgs} to control the number of NFTs fetched per request and to navigate through pages using cursors.
 * - **Real-Time Updates:** The hook subscribes to changes in the NFT balances, ensuring that your UI reflects the latest data without manual refreshes.
 * - **Error Handling:** Always check for errors returned by the hook to provide informative feedback to the user and handle different error scenarios gracefully.
 * - **Context Requirement:** Ensure that your component is wrapped within a `KeybanProvider` to provide the necessary context for the hooks to function correctly.
 * @see {@link KeybanAccount}
 * @see {@link PaginationArgs}
 * @see {@link PaginationExtra}
 */
export function useKeybanAccountNfts(
  account: KeybanAccount,
  options?: PaginationArgs,
): ApiResult<PaginatedData<KeybanNftBalance>, PaginationExtra> {
  const client = useKeybanClient();

  const { data, error, fetchMore, subscribeToMore } = useSuspenseQuery(
    walletNftsDocument,
    {
      client: client.apolloClient,
      variables: {
        ...options,
        walletId: account.address,
        orderBy: GqlNftBalancesOrderBy.NFT_TOKEN_ID_ASC,
      },
    },
  );

  React.useEffect(
    () =>
      subscribeToMore({
        document: nftBalancesSubscriptionDocument,
        updateQuery(prev, { subscriptionData }) {
          if (!prev.res) return prev;
          if (!subscriptionData.data.sub?.entity) return prev;

          const { mutationType, entity } = subscriptionData.data.sub;
          if (entity.walletId !== account.address) return prev;

          return {
            res: updatePaginatedData(
              prev.res,
              mutationType,
              {
                cursor: btoa(
                  JSON.stringify([
                    GqlNftBalancesOrderBy.NFT_TOKEN_ID_ASC.toLowerCase(),
                    [
                      Number(entity.nft?.tokenId),
                      JSON.parse(atob(entity.nodeId))[0],
                    ],
                  ]),
                ),
                node: entity,
              },
              ({ node }) => node!.nft!.tokenId < entity.nft!.tokenId,
            ),
          };
        },
      }),
    [subscribeToMore, account.address],
  );

  const extra = usePaginationExtra(data.res!, fetchMore);

  return error
    ? ([null, error, extra] as const)
    : ([getPaginatedResults(data.res!), null, extra] as const);
}

/**
 * The `useKeybanAccountNft` React hook allows you to fetch the balance of a specific NFT (ERC721 or ERC1155) owned by a Keyban account. It provides detailed information about the NFT, including metadata and collection details, offering a reactive and easy-to-use interface within functional components.
 * @param account - The Keyban account object containing the address.
 * @param tokenAddress - The address of the token contract.
 * @param tokenId - The ID of the token.
 * @returns - The result containing the NFT balance or an error.
 * @throws {SdkError} If the NFT is not found (`SdkErrorTypes.NftNotFound`).
 * @example
 * ```tsx
 * import { useKeybanAccount, useKeybanAccountNft } from "@keyban/sdk-react";
 *
 * const NftDisplay: React.FC<{ tokenAddress: Address; tokenId: string }> = ({ tokenAddress, tokenId }) => {
 *   const [account, accountError] = useKeybanAccount();
 *
 *   if (accountError) {
 *     // Handle account retrieval error
 *     return <div>Error fetching account: {accountError.message}</div>;
 *   }
 *
 *   const [nftBalance, nftError] = useKeybanAccountNft(account, tokenAddress, tokenId);
 *
 *   if (nftError) {
 *     // Handle NFT retrieval error (e.g., NFT not found)
 *     return <div>Error fetching NFT: {nftError.message}</div>;
 *   }
 *
 *   if (!nftBalance) {
 *     // Display a loading indicator or an appropriate message
 *     return <div>Loading NFT...</div>;
 *   }
 *
 *   return (
 *     <div>
 *       <h3>NFT Details</h3>
 *       <p>NFT ID: {nftBalance.id}</p>
 *       {nftBalance.nft && (
 *         <>
 *           <p>Collection Name: {nftBalance.nft.collection?.name || "Unknown"}</p>
 *           <p>Symbol: {nftBalance.nft.collection?.symbol || "N/A"}</p>
 *           <p>Token ID: {nftBalance.nft.tokenId}</p>
 *           // Display additional metadata as needed
 *         </>
 *       )}
 *     </div>
 *   );
 * };
 *
 * export default NftDisplay;
 * ```
 */
export function useKeybanAccountNft(
  account: KeybanAccount,
  tokenAddress: Address,
  tokenId: string,
): ApiResult<KeybanNftBalance> {
  const client = useKeybanClient();

  const id = [account.address, tokenAddress, tokenId].join(":");
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
 * The `useKeybanAccountTransferHistory` React hook allows you to fetch and subscribe to the list of all asset transfers (both incoming and outgoing) associated with a specific Keyban account. It supports pagination, enabling efficient retrieval of extensive transfer histories by fetching data in manageable chunks. This hook returns an `ApiResult` tuple containing the paginated transfer data, any potential errors, and additional pagination controls.
 * @param account - The Keyban account object containing the address.
 * @param [options] - Optional pagination arguments.
 * @returns - The API result containing paginated data of Keyban asset transfers and pagination extra information.
 * @throws {SdkError} If the provided `KeybanAccount` has an invalid address (`SdkErrorTypes.AddressInvalid`).
 * @throws {SdkError} If no transfer history is found for the provided account (`SdkErrorTypes.TransferHistoryNotFound`).
 * @example
 * ```tsx
 * import React from 'react';
 * import { useKeybanAccount, useKeybanAccountTransferHistory } from "@keyban/sdk-react";
 *
 * const TransferHistoryList: React.FC = () => {
 *   const [account, accountError] = useKeybanAccount();
 *
 *   if (accountError) {
 *     return <div>Error fetching account: {accountError.message}</div>;
 *   }
 *
 *   const [txHistory, txHistoryError, { fetchMore, loading }] = useKeybanAccountTransferHistory(account, { first: 5 });
 *
 *   if (txHistoryError) {
 *     return <div>Error fetching transfer history: {txHistoryError.message}</div>;
 *   }
 *
 *   if (!txHistory) {
 *     return <div>Loading transfer history...</div>;
 *   }
 *
 *   return (
 *     <div>
 *       <h3>Your Transfer History</h3>
 *       <ul>
 *         {txHistory.nodes.map((transfer) => (
 *           <li key={transfer.id}>
 *             <p>Transaction ID: {transfer.transactionId}</p>
 *             <p>From: {transfer.fromAddress}</p>
 *             <p>To: {transfer.toAddress}</p>
 *             <p>Amount: {transfer.amount}</p>
 *             <p>Asset: {transfer.assetSymbol}</p>
 *             <p>Timestamp: {new Date(transfer.timestamp).toLocaleString()}</p>
 *             // Render additional transfer details as needed
 *           </li>
 *         ))}
 *       </ul>
 *       {txHistory.hasNextPage && (
 *         <button onClick={fetchMore} disabled={loading}>
 *           {loading ? 'Loading...' : 'Load More'}
 *         </button>
 *       )}
 *     </div>
 *   );
 * };
 *
 * export default TransferHistoryList;
 * ```
 * @remarks
 *
 * - **Pagination Support:** Utilize the {@link PaginationArgs} to control the number of transfer records fetched per request and to navigate through pages using cursors.
 * - **Real-Time Updates:** The hook subscribes to changes in the transfer history, ensuring that your UI reflects the latest data without manual refreshes.
 * - **Error Handling:** Always check for errors returned by the hook to provide informative feedback to the user and handle different error scenarios gracefully.
 * - **Context Requirement:** Ensure that your component is wrapped within a `KeybanProvider` to provide the necessary context for the hooks to function correctly.
 * @see {@link KeybanAccount}
 * @see {@link PaginationArgs}
 * @see {@link PaginationExtra}
 */
export function useKeybanAccountTransferHistory(
  account: KeybanAccount,
  options?: PaginationArgs,
): ApiResult<PaginatedData<KeybanAssetTransfer>, PaginationExtra> {
  const client = useKeybanClient();

  const { data, error, fetchMore, subscribeToMore } = useSuspenseQuery(
    walletAssetTransfersDocument,
    {
      client: client.apolloClient,
      variables: {
        walletId: account.address,
        orderBy: GqlAssetTransfersOrderBy.TRANSACTION_BLOCK_NUMBER_DESC,
        ...options,
      },
    },
  );

  React.useEffect(
    () =>
      subscribeToMore({
        document: assetTransfersSubscriptionDocument,
        updateQuery(prev, { subscriptionData }) {
          if (!prev.res) return prev;
          if (!subscriptionData.data.sub?.entity) return prev;

          const { mutationType, entity } = subscriptionData.data.sub;

          const match = [entity.fromId, entity.toId].includes(account.address);
          if (!match) return prev;

          return {
            res: updatePaginatedData(
              prev.res,
              mutationType,
              {
                cursor: btoa(
                  JSON.stringify([
                    GqlAssetTransfersOrderBy.TRANSACTION_BLOCK_NUMBER_DESC.toLowerCase(),
                    [
                      Number(entity.transaction?.blockNumber),
                      JSON.parse(atob(entity.nodeId))[0],
                    ],
                  ]),
                ),
                node: entity,
              },
              ({ node }) =>
                node!.transaction!.blockNumber >
                entity.transaction!.blockNumber,
            ),
          };
        },
      }),
    [subscribeToMore, account.address],
  );

  const extra = usePaginationExtra(data.res!, fetchMore);

  return error
    ? ([null, error, extra] as const)
    : ([getPaginatedResults(data.res!), null, extra] as const);
}

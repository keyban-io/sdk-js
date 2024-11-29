import { InMemoryCache } from "@apollo/client/cache";
import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  split,
} from "@apollo/client/core";
import { setContext } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import {
  getMainDefinition,
  relayStylePagination,
} from "@apollo/client/utilities";
import { createClient } from "graphql-ws";

/**
 * Creates an Apollo Client instance.
 * @param {URL} apiUrl - The API URL.
 * @param {() => string | Promise<string>} [accessTokenProvider] - Optional function to provide access token.
 * @returns {ApolloClient} The Apollo Client instance.
 * @private
 */
export function createApolloClient(
  apiUrl: URL,
  accessTokenProvider?: () => string | Promise<string>,
) {
  const authLink = setContext(async (_, { headers }) => {
    const token = await accessTokenProvider?.();

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const httpLink = createHttpLink({ uri: apiUrl.toString() });

  const wsUrl = new URL(apiUrl);
  wsUrl.protocol = "wss";
  const wsLink = new GraphQLWsLink(createClient({ url: wsUrl.toString() }));

  const transportLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink,
  );

  return new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            tokenBalances: relayStylePagination(),
            nftBalances: relayStylePagination(),
            assetTransfers: relayStylePagination(),
          },
        },
        Transaction: {
          fields: {
            date: {
              read(date) {
                return date ? date + "Z" : date;
              },
            },
          },
        },
      },
    }),
    link: ApolloLink.from([authLink, transportLink]),
  });
}

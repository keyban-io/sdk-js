import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  split,
} from "@apollo/client/core";
import { InMemoryCache } from "@apollo/client/cache";
import { setContext } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";
import { WebSocketLink } from "@apollo/client/link/ws";

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
  const wsLink = wsUrl.hostname.includes("subql")
    ? new WebSocketLink({ uri: wsUrl.toString(), options: { reconnect: true } })
    : new GraphQLWsLink(createClient({ url: wsUrl.toString() }));

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
    cache: new InMemoryCache(),
    link: ApolloLink.from([authLink, transportLink]),
  });
}

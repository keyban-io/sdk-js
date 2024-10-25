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

const BIG_INT_FIELD_READER = {
  read(data?: { __typename: "BigIntScalar"; value: string }) {
    return BigInt(data?.value ?? "0");
  },
};

export function createApolloClient(
  apiUrl: URL,
  accessTokenProvider?: () => string | Promise<string>,
) {
  const customScalarsLink = new ApolloLink((operation, forward) => {
    if (operation.variables) {
      operation.variables = JSON.parse(
        JSON.stringify(operation.variables, (_, value) => {
          if (typeof value === "bigint") return value.toString();
          return value;
        }),
      );
    }

    return forward(operation);
  });

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
    cache: new InMemoryCache({
      typePolicies: {
        Account: {
          fields: {
            nativeBalance: BIG_INT_FIELD_READER,
          },
        },
        TokenBalance: {
          fields: {
            balance: BIG_INT_FIELD_READER,
          },
        },
        Nft: {
          fields: {
            balance: BIG_INT_FIELD_READER,
          },
        },
      },
    }),
    link: ApolloLink.from([customScalarsLink, authLink, transportLink]),
  });
}

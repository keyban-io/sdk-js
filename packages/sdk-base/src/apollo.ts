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

const BIG_INT_FIELD_READER = {
  read({ value }: any) {
    return BigInt(value);
  },
};

export function createApolloClient(
  apiUrl: string,
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

  const httpUrl = new URL("/graphql", apiUrl);
  const httpLink = createHttpLink({ uri: httpUrl.toString() });

  const wsUrl = new URL(httpUrl);
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
    cache: new InMemoryCache({
      typePolicies: {
        Chain: {
          keyFields: ["type"],
        },
        Token: {
          keyFields: ["address"],
        },
        TokenBalance: {
          keyFields: ["token", ["address"]],
          fields: {
            balance: BIG_INT_FIELD_READER,
          },
        },
        Nft: {
          keyFields: ["token", ["address"], "id"],
          fields: {
            balance: BIG_INT_FIELD_READER,
          },
        },
      },
    }),
    link: ApolloLink.from([customScalarsLink, authLink, transportLink]),
  });
}

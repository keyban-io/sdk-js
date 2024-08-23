// @ts-nocheck
import * as Types from './gql-types';

export type GqlKeybanAccount_listTransactionsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GqlKeybanAccount_listTransactionsQuery = {
  __typename?: 'Root',
  allFilms?: {
    __typename?: 'FilmsConnection',
    edges?: Array<{
      __typename?: 'FilmsEdge',
      node?: {
        __typename?: 'Film',
        title?: string | null,
        director?: string | null
      } | null
    } | null> | null
  } | null
};


export const KeybanAccount_listTransactionsDocument = `
    query KeybanAccount_listTransactions {
  allFilms {
    edges {
      node {
        title
        director
      }
    }
  }
}
    `;
export type Requester<C = {}> = <R, V>(doc: string, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C>(requester: Requester<C>) {
  return {
    KeybanAccount_listTransactions(variables?: GqlKeybanAccount_listTransactionsQueryVariables, options?: C): Promise<GqlKeybanAccount_listTransactionsQuery> {
      return requester<GqlKeybanAccount_listTransactionsQuery, GqlKeybanAccount_listTransactionsQueryVariables>(KeybanAccount_listTransactionsDocument, variables, options) as Promise<GqlKeybanAccount_listTransactionsQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;
// @ts-nocheck
import * as Types from './gql-types';

export type GqlKeybanClient_chainQueryVariables = Types.Exact<{
  chain: Types.GqlChainType;
}>;


export type GqlKeybanClient_chainQuery = {
  chain: {
    rpcUrl: string
  }
};


export const KeybanClient_chainDocument = `
    query KeybanClient_chain($chain: ChainType!) {
  chain(type: $chain) {
    rpcUrl
  }
}
    `;
export type Requester<C = {}> = <R, V>(doc: string, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C>(requester: Requester<C>) {
  return {
    KeybanClient_chain(variables: GqlKeybanClient_chainQueryVariables, options?: C): Promise<GqlKeybanClient_chainQuery> {
      return requester<GqlKeybanClient_chainQuery, GqlKeybanClient_chainQueryVariables>(KeybanClient_chainDocument, variables, options) as Promise<GqlKeybanClient_chainQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;


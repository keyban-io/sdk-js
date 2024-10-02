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

export type GqlKeybanClient_addressTokenBalancesQueryVariables = Types.Exact<{
  chainType: Types.GqlChainType;
  address: Types.Scalars['Address']['input'];
}>;


export type GqlKeybanClient_addressTokenBalancesQuery = {
  chain: {
    addressTokenBalances: Array<{
      balance: Types.Scalars['BigInt']['output'],
      token: {
        address: Types.Scalars['Address']['output'],
        name: string,
        symbol: string,
        decimals?: number | null,
        iconUrl?: string | null
      }
    }>
  }
};

export type GqlKeybanClient_addressNftQueryVariables = Types.Exact<{
  chainType: Types.GqlChainType;
  address: Types.Scalars['Address']['input'];
}>;


export type GqlKeybanClient_addressNftQuery = {
  chain: {
    addressNft: Array<{
      id: string,
      imageUrl?: string | null,
      balance: Types.Scalars['BigInt']['output'],
      metadata?: Types.Scalars['JSON']['output'] | null,
      token: {
        address: Types.Scalars['Address']['output'],
        name: string,
        symbol: string,
        decimals?: number | null,
        iconUrl?: string | null
      }
    }>
  }
};


export const KeybanClient_chainDocument = `
    query KeybanClient_chain($chain: ChainType!) {
  chain(type: $chain) {
    rpcUrl
  }
}
    `;
export const KeybanClient_addressTokenBalancesDocument = `
    query KeybanClient_addressTokenBalances($chainType: ChainType!, $address: Address!) {
  chain(type: $chainType) {
    addressTokenBalances(address: $address) {
      token {
        address
        name
        symbol
        decimals
        iconUrl
      }
      balance
    }
  }
}
    `;
export const KeybanClient_addressNftDocument = `
    query KeybanClient_addressNft($chainType: ChainType!, $address: Address!) {
  chain(type: $chainType) {
    addressNft(address: $address) {
      token {
        address
        name
        symbol
        decimals
        iconUrl
      }
      id
      imageUrl
      balance
      metadata
    }
  }
}
    `;
export type Requester<C = {}> = <R, V>(doc: string, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C>(requester: Requester<C>) {
  return {
    KeybanClient_chain(variables: GqlKeybanClient_chainQueryVariables, options?: C): Promise<GqlKeybanClient_chainQuery> {
      return requester<GqlKeybanClient_chainQuery, GqlKeybanClient_chainQueryVariables>(KeybanClient_chainDocument, variables, options) as Promise<GqlKeybanClient_chainQuery>;
    },
    KeybanClient_addressTokenBalances(variables: GqlKeybanClient_addressTokenBalancesQueryVariables, options?: C): Promise<GqlKeybanClient_addressTokenBalancesQuery> {
      return requester<GqlKeybanClient_addressTokenBalancesQuery, GqlKeybanClient_addressTokenBalancesQueryVariables>(KeybanClient_addressTokenBalancesDocument, variables, options) as Promise<GqlKeybanClient_addressTokenBalancesQuery>;
    },
    KeybanClient_addressNft(variables: GqlKeybanClient_addressNftQueryVariables, options?: C): Promise<GqlKeybanClient_addressNftQuery> {
      return requester<GqlKeybanClient_addressNftQuery, GqlKeybanClient_addressNftQueryVariables>(KeybanClient_addressNftDocument, variables, options) as Promise<GqlKeybanClient_addressNftQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;


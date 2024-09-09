// @ts-nocheck
import * as Types from './gql-types';

export type GqlKeybanAccount_addressTokenBalancesQueryVariables = Types.Exact<{
  chainType: Types.GqlChainType;
  address: Types.Scalars['Address']['input'];
}>;


export type GqlKeybanAccount_addressTokenBalancesQuery = {
  chain: {
    addressTokenBalances: Array<{
      balance: Types.Scalars['BigInt']['output'],
      token: {
        address: Types.Scalars['Address']['output'],
        name: string,
        symbol: string,
        decimals: number,
        iconUrl?: string | null
      }
    }>
  }
};


export const KeybanAccount_addressTokenBalancesDocument = `
    query KeybanAccount_addressTokenBalances($chainType: ChainType!, $address: Address!) {
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
export type Requester<C = {}> = <R, V>(doc: string, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C>(requester: Requester<C>) {
  return {
    KeybanAccount_addressTokenBalances(variables: GqlKeybanAccount_addressTokenBalancesQueryVariables, options?: C): Promise<GqlKeybanAccount_addressTokenBalancesQuery> {
      return requester<GqlKeybanAccount_addressTokenBalancesQuery, GqlKeybanAccount_addressTokenBalancesQueryVariables>(KeybanAccount_addressTokenBalancesDocument, variables, options) as Promise<GqlKeybanAccount_addressTokenBalancesQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;


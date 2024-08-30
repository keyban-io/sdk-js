// @ts-nocheck
import * as Types from './gql-types';

export type GqlKeybanAccount_addressTokenBalancesQueryVariables = Types.Exact<{
  address: Types.Scalars['Address']['input'];
}>;


export type GqlKeybanAccount_addressTokenBalancesQuery = {
  __typename?: 'Query',
  addressTokenBalances: Array<{
    __typename?: 'TokenBalance',
    balance: bigint,
    token: {
      __typename?: 'Token',
      address: `0x${string}`,
      name: string,
      symbol: string,
      decimals: number,
      iconUrl?: string | null
    }
  }>
};


export const KeybanAccount_addressTokenBalancesDocument = `
    query KeybanAccount_addressTokenBalances($address: Address!) {
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


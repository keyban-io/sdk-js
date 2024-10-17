// @ts-ignore
import type { Address, Hash, Hex } from "~/index";
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Address: { input: Address; output: Address; }
  BigInt: { input: bigint; output: bigint; }
  JSON: { input: JSON; output: JSON; }
};

export type GqlAccount = {
  address: Scalars['Address']['output'];
  id: Scalars['ID']['output'];
  nativeBalance: Scalars['BigInt']['output'];
  nft: Maybe<GqlNft>;
  nfts: Array<GqlNft>;
  tokenBalances: Array<GqlTokenBalance>;
};


export type GqlAccountnftArgs = {
  tokenAddress: Scalars['Address']['input'];
  tokenId: Scalars['String']['input'];
};

export type GqlChain = {
  account: GqlAccount;
  id: Scalars['ID']['output'];
  rpcUrl: Scalars['String']['output'];
  type: GqlChainType;
};


export type GqlChainaccountArgs = {
  address: Scalars['Address']['input'];
};

export enum GqlChainType {
  KeybanTestnet = 'KeybanTestnet',
  OptimismSepolia = 'OptimismSepolia',
  Sepolia = 'Sepolia'
}

export type GqlNft = {
  balance: Scalars['BigInt']['output'];
  id: Scalars['ID']['output'];
  imageUrl: Maybe<Scalars['String']['output']>;
  metadata: Maybe<Scalars['JSON']['output']>;
  token: GqlToken;
  tokenId: Scalars['String']['output'];
};

export type GqlQuery = {
  chain: GqlChain;
};


export type GqlQuerychainArgs = {
  type: GqlChainType;
};

export type GqlSubscription = {
  interval: Scalars['Int']['output'];
};

export type GqlToken = {
  address: Scalars['Address']['output'];
  decimals: Maybe<Scalars['Int']['output']>;
  iconUrl: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Maybe<Scalars['String']['output']>;
  symbol: Maybe<Scalars['String']['output']>;
  type: Maybe<Scalars['String']['output']>;
};

export type GqlTokenBalance = {
  balance: Scalars['BigInt']['output'];
  id: Scalars['ID']['output'];
  token: GqlToken;
};

export type GqlKeybanClient_chainQueryVariables = Exact<{
  chain: GqlChainType;
}>;


export type GqlKeybanClient_chainQuery = {
  chain: {
    id: string,
    rpcUrl: string
  }
};

export type GqlKeybanClient_nativeBalanceQueryVariables = Exact<{
  chainType: GqlChainType;
  address: Scalars['Address']['input'];
}>;


export type GqlKeybanClient_nativeBalanceQuery = {
  chain: {
    id: string,
    account: {
      id: string,
      nativeBalance: bigint
    }
  }
};

export type GqlKeybanClient_TokenBalanceFragment = {
  id: string,
  balance: bigint,
  token: {
    id: string,
    address: Address,
    type: string | null,
    name: string | null,
    symbol: string | null,
    decimals: number | null,
    iconUrl: string | null
  }
};

export type GqlKeybanClient_addressTokenBalancesQueryVariables = Exact<{
  chainType: GqlChainType;
  address: Scalars['Address']['input'];
}>;


export type GqlKeybanClient_addressTokenBalancesQuery = {
  chain: {
    id: string,
    account: {
      id: string,
      tokenBalances: Array<{
        id: string,
        balance: bigint,
        token: {
          id: string,
          address: Address,
          type: string | null,
          name: string | null,
          symbol: string | null,
          decimals: number | null,
          iconUrl: string | null
        }
      }>
    }
  }
};

export type GqlKeybanClient_NftFragment = {
  id: string,
  tokenId: string,
  imageUrl: string | null,
  balance: bigint,
  metadata: JSON | null,
  token: {
    id: string,
    address: Address,
    type: string | null,
    name: string | null,
    symbol: string | null,
    decimals: number | null,
    iconUrl: string | null
  }
};

export type GqlKeybanClient_addressNftsQueryVariables = Exact<{
  chainType: GqlChainType;
  address: Scalars['Address']['input'];
}>;


export type GqlKeybanClient_addressNftsQuery = {
  chain: {
    id: string,
    account: {
      id: string,
      nfts: Array<{
        id: string,
        tokenId: string,
        imageUrl: string | null,
        balance: bigint,
        metadata: JSON | null,
        token: {
          id: string,
          address: Address,
          type: string | null,
          name: string | null,
          symbol: string | null,
          decimals: number | null,
          iconUrl: string | null
        }
      }>
    }
  }
};

export type GqlKeybanClient_addressNftQueryVariables = Exact<{
  chainType: GqlChainType;
  address: Scalars['Address']['input'];
  tokenAddress: Scalars['Address']['input'];
  tokenId: Scalars['String']['input'];
}>;


export type GqlKeybanClient_addressNftQuery = {
  chain: {
    id: string,
    account: {
      id: string,
      nft: {
        id: string,
        tokenId: string,
        imageUrl: string | null,
        balance: bigint,
        metadata: JSON | null,
        token: {
          id: string,
          address: Address,
          type: string | null,
          name: string | null,
          symbol: string | null,
          decimals: number | null,
          iconUrl: string | null
        }
      } | null
    }
  }
};

export const KeybanClient_TokenBalanceFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"KeybanClient_TokenBalance"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TokenBalance"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"iconUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"balance"}}]}}]} as unknown as DocumentNode<GqlKeybanClient_TokenBalanceFragment, unknown>;
export const KeybanClient_NftFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"KeybanClient_Nft"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Nft"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"iconUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tokenId"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"}}]}}]} as unknown as DocumentNode<GqlKeybanClient_NftFragment, unknown>;
export const KeybanClient_chainDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"KeybanClient_chain"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chain"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChainType"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chain"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chain"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rpcUrl"}}]}}]}}]} as unknown as DocumentNode<GqlKeybanClient_chainQuery, GqlKeybanClient_chainQueryVariables>;
export const KeybanClient_nativeBalanceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"KeybanClient_nativeBalance"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chainType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChainType"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Address"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chain"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chainType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"account"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nativeBalance"}}]}}]}}]}}]} as unknown as DocumentNode<GqlKeybanClient_nativeBalanceQuery, GqlKeybanClient_nativeBalanceQueryVariables>;
export const KeybanClient_addressTokenBalancesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"KeybanClient_addressTokenBalances"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chainType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChainType"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Address"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chain"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chainType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"account"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tokenBalances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"KeybanClient_TokenBalance"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"KeybanClient_TokenBalance"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TokenBalance"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"iconUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"balance"}}]}}]} as unknown as DocumentNode<GqlKeybanClient_addressTokenBalancesQuery, GqlKeybanClient_addressTokenBalancesQueryVariables>;
export const KeybanClient_addressNftsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"KeybanClient_addressNfts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chainType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChainType"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Address"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chain"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chainType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"account"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nfts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"KeybanClient_Nft"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"KeybanClient_Nft"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Nft"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"iconUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tokenId"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"}}]}}]} as unknown as DocumentNode<GqlKeybanClient_addressNftsQuery, GqlKeybanClient_addressNftsQueryVariables>;
export const KeybanClient_addressNftDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"KeybanClient_addressNft"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chainType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChainType"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Address"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tokenAddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Address"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tokenId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chain"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chainType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"account"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nft"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tokenAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tokenAddress"}}},{"kind":"Argument","name":{"kind":"Name","value":"tokenId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tokenId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"KeybanClient_Nft"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"KeybanClient_Nft"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Nft"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"iconUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tokenId"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"}}]}}]} as unknown as DocumentNode<GqlKeybanClient_addressNftQuery, GqlKeybanClient_addressNftQueryVariables>;


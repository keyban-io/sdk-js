// @ts-nocheck
import type { Address, Hash, Hex } from "~/index";
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
};

export type GqlAttribute = {
  __typename?: 'Attribute';
  traitType: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type GqlChain = {
  __typename?: 'Chain';
  addressNft: Array<GqlNft>;
  addressTokenBalances: Array<GqlTokenBalance>;
  rpcUrl: Scalars['String']['output'];
  type: GqlChainType;
};


export type GqlChainaddressNftArgs = {
  address: Scalars['Address']['input'];
};


export type GqlChainaddressTokenBalancesArgs = {
  address: Scalars['Address']['input'];
};

export enum GqlChainType {
  KeybanTestnet = 'KeybanTestnet',
  Sepolia = 'Sepolia'
}

export type GqlMetadata = {
  __typename?: 'Metadata';
  attributes?: Maybe<Array<GqlAttribute>>;
  description?: Maybe<Scalars['String']['output']>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type GqlNft = {
  __typename?: 'Nft';
  balance: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<GqlMetadata>;
  token: GqlToken;
};

export type GqlQuery = {
  __typename?: 'Query';
  chain: GqlChain;
};


export type GqlQuerychainArgs = {
  type: GqlChainType;
};

export type GqlToken = {
  __typename?: 'Token';
  address: Scalars['Address']['output'];
  decimals?: Maybe<Scalars['Int']['output']>;
  iconUrl?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  symbol: Scalars['String']['output'];
};

export type GqlTokenBalance = {
  __typename?: 'TokenBalance';
  balance: Scalars['BigInt']['output'];
  token: GqlToken;
};

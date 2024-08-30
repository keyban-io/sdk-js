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
  Address: { input: `0x${string}`; output: `0x${string}`; }
  BigInt: { input: bigint; output: bigint; }
};

export type GqlQuery = {
  __typename?: 'Query';
  addressTokenBalances: Array<GqlTokenBalance>;
};


export type GqlQueryaddressTokenBalancesArgs = {
  address: Scalars['Address']['input'];
};

export type GqlToken = {
  __typename?: 'Token';
  address: Scalars['Address']['output'];
  decimals: Scalars['Int']['output'];
  iconUrl?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  symbol: Scalars['String']['output'];
};

export type GqlTokenBalance = {
  __typename?: 'TokenBalance';
  balance: Scalars['BigInt']['output'];
  token: GqlToken;
};

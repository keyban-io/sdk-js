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
  BigFloat: { input: string; output: string; }
  BigInt: { input: string; output: string; }
  Cursor: { input: string; output: string; }
  Date: { input: string; output: string; }
  JSON: { input: any; output: any; }
};

/** A filter to be used against BigFloat fields. All fields are combined with a logical ‘and.’ */
export type GqlBigFloatFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom: InputMaybe<Scalars['BigFloat']['input']>;
  /** Equal to the specified value. */
  equalTo: InputMaybe<Scalars['BigFloat']['input']>;
  /** Greater than the specified value. */
  greaterThan: InputMaybe<Scalars['BigFloat']['input']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo: InputMaybe<Scalars['BigFloat']['input']>;
  /** Included in the specified list. */
  in: InputMaybe<Array<Scalars['BigFloat']['input']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan: InputMaybe<Scalars['BigFloat']['input']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo: InputMaybe<Scalars['BigFloat']['input']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom: InputMaybe<Scalars['BigFloat']['input']>;
  /** Not equal to the specified value. */
  notEqualTo: InputMaybe<Scalars['BigFloat']['input']>;
  /** Not included in the specified list. */
  notIn: InputMaybe<Array<Scalars['BigFloat']['input']>>;
};

/** A filter to be used against BigInt fields. All fields are combined with a logical ‘and.’ */
export type GqlBigIntFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom: InputMaybe<Scalars['BigInt']['input']>;
  /** Equal to the specified value. */
  equalTo: InputMaybe<Scalars['BigInt']['input']>;
  /** Greater than the specified value. */
  greaterThan: InputMaybe<Scalars['BigInt']['input']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo: InputMaybe<Scalars['BigInt']['input']>;
  /** Included in the specified list. */
  in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan: InputMaybe<Scalars['BigInt']['input']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo: InputMaybe<Scalars['BigInt']['input']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom: InputMaybe<Scalars['BigInt']['input']>;
  /** Not equal to the specified value. */
  notEqualTo: InputMaybe<Scalars['BigInt']['input']>;
  /** Not included in the specified list. */
  notIn: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export type GqlHavingBigfloatFilter = {
  equalTo: InputMaybe<Scalars['BigFloat']['input']>;
  greaterThan: InputMaybe<Scalars['BigFloat']['input']>;
  greaterThanOrEqualTo: InputMaybe<Scalars['BigFloat']['input']>;
  lessThan: InputMaybe<Scalars['BigFloat']['input']>;
  lessThanOrEqualTo: InputMaybe<Scalars['BigFloat']['input']>;
  notEqualTo: InputMaybe<Scalars['BigFloat']['input']>;
};

export type GqlHavingIntFilter = {
  equalTo: InputMaybe<Scalars['Int']['input']>;
  greaterThan: InputMaybe<Scalars['Int']['input']>;
  greaterThanOrEqualTo: InputMaybe<Scalars['Int']['input']>;
  lessThan: InputMaybe<Scalars['Int']['input']>;
  lessThanOrEqualTo: InputMaybe<Scalars['Int']['input']>;
  notEqualTo: InputMaybe<Scalars['Int']['input']>;
};

/** A filter to be used against Int fields. All fields are combined with a logical ‘and.’ */
export type GqlIntFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom: InputMaybe<Scalars['Int']['input']>;
  /** Equal to the specified value. */
  equalTo: InputMaybe<Scalars['Int']['input']>;
  /** Greater than the specified value. */
  greaterThan: InputMaybe<Scalars['Int']['input']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo: InputMaybe<Scalars['Int']['input']>;
  /** Included in the specified list. */
  in: InputMaybe<Array<Scalars['Int']['input']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan: InputMaybe<Scalars['Int']['input']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo: InputMaybe<Scalars['Int']['input']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom: InputMaybe<Scalars['Int']['input']>;
  /** Not equal to the specified value. */
  notEqualTo: InputMaybe<Scalars['Int']['input']>;
  /** Not included in the specified list. */
  notIn: InputMaybe<Array<Scalars['Int']['input']>>;
};

/** A filter to be used against JSON fields. All fields are combined with a logical ‘and.’ */
export type GqlJSONFilter = {
  /** Contained by the specified JSON. */
  containedBy: InputMaybe<Scalars['JSON']['input']>;
  /** Contains the specified JSON. */
  contains: InputMaybe<Scalars['JSON']['input']>;
  /** Contains all of the specified keys. */
  containsAllKeys: InputMaybe<Array<Scalars['String']['input']>>;
  /** Contains any of the specified keys. */
  containsAnyKeys: InputMaybe<Array<Scalars['String']['input']>>;
  /** Contains the specified key. */
  containsKey: InputMaybe<Scalars['String']['input']>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom: InputMaybe<Scalars['JSON']['input']>;
  /** Equal to the specified value. */
  equalTo: InputMaybe<Scalars['JSON']['input']>;
  /** Greater than the specified value. */
  greaterThan: InputMaybe<Scalars['JSON']['input']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo: InputMaybe<Scalars['JSON']['input']>;
  /** Included in the specified list. */
  in: InputMaybe<Array<Scalars['JSON']['input']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan: InputMaybe<Scalars['JSON']['input']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo: InputMaybe<Scalars['JSON']['input']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom: InputMaybe<Scalars['JSON']['input']>;
  /** Not equal to the specified value. */
  notEqualTo: InputMaybe<Scalars['JSON']['input']>;
  /** Not included in the specified list. */
  notIn: InputMaybe<Array<Scalars['JSON']['input']>>;
};

export enum GqlMutationType {
  DELETE = 'DELETE',
  INSERT = 'INSERT',
  UPDATE = 'UPDATE'
}

export type GqlNft = GqlNode & {
  balance: Scalars['BigFloat']['output'];
  id: Scalars['String']['output'];
  metadata: Scalars['JSON']['output'];
  nftId: Scalars['BigFloat']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads a single `Token` that is related to this `Nft`. */
  token: Maybe<GqlToken>;
  tokenId: Scalars['String']['output'];
  /** Reads a single `Wallet` that is related to this `Nft`. */
  wallet: Maybe<GqlWallet>;
  walletId: Scalars['String']['output'];
};

export type GqlNftAggregates = {
  /** Mean average aggregates across the matching connection (ignoring before/after/first/last/offset) */
  average: Maybe<GqlNftAverageAggregates>;
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount: Maybe<GqlNftDistinctCountAggregates>;
  keys: Maybe<Array<Scalars['String']['output']>>;
  /** Maximum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  max: Maybe<GqlNftMaxAggregates>;
  /** Minimum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  min: Maybe<GqlNftMinAggregates>;
  /** Population standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevPopulation: Maybe<GqlNftStddevPopulationAggregates>;
  /** Sample standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevSample: Maybe<GqlNftStddevSampleAggregates>;
  /** Sum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  sum: Maybe<GqlNftSumAggregates>;
  /** Population variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  variancePopulation: Maybe<GqlNftVariancePopulationAggregates>;
  /** Sample variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  varianceSample: Maybe<GqlNftVarianceSampleAggregates>;
};

/** A filter to be used against aggregates of `Nft` object types. */
export type GqlNftAggregatesFilter = {
  /** Mean average aggregate over matching `Nft` objects. */
  average: InputMaybe<GqlNftAverageAggregateFilter>;
  /** Distinct count aggregate over matching `Nft` objects. */
  distinctCount: InputMaybe<GqlNftDistinctCountAggregateFilter>;
  /** A filter that must pass for the relevant `Nft` object to be included within the aggregate. */
  filter: InputMaybe<GqlNftFilter>;
  /** Maximum aggregate over matching `Nft` objects. */
  max: InputMaybe<GqlNftMaxAggregateFilter>;
  /** Minimum aggregate over matching `Nft` objects. */
  min: InputMaybe<GqlNftMinAggregateFilter>;
  /** Population standard deviation aggregate over matching `Nft` objects. */
  stddevPopulation: InputMaybe<GqlNftStddevPopulationAggregateFilter>;
  /** Sample standard deviation aggregate over matching `Nft` objects. */
  stddevSample: InputMaybe<GqlNftStddevSampleAggregateFilter>;
  /** Sum aggregate over matching `Nft` objects. */
  sum: InputMaybe<GqlNftSumAggregateFilter>;
  /** Population variance aggregate over matching `Nft` objects. */
  variancePopulation: InputMaybe<GqlNftVariancePopulationAggregateFilter>;
  /** Sample variance aggregate over matching `Nft` objects. */
  varianceSample: InputMaybe<GqlNftVarianceSampleAggregateFilter>;
};

export type GqlNftAverageAggregateFilter = {
  balance: InputMaybe<GqlBigFloatFilter>;
  nftId: InputMaybe<GqlBigFloatFilter>;
};

export type GqlNftAverageAggregates = {
  /** Mean average of balance across the matching connection */
  balance: Maybe<Scalars['BigFloat']['output']>;
  /** Mean average of nftId across the matching connection */
  nftId: Maybe<Scalars['BigFloat']['output']>;
};

export type GqlNftDistinctCountAggregateFilter = {
  _blockRange: InputMaybe<GqlBigIntFilter>;
  _id: InputMaybe<GqlBigIntFilter>;
  balance: InputMaybe<GqlBigIntFilter>;
  id: InputMaybe<GqlBigIntFilter>;
  metadata: InputMaybe<GqlBigIntFilter>;
  nftId: InputMaybe<GqlBigIntFilter>;
  tokenId: InputMaybe<GqlBigIntFilter>;
  walletId: InputMaybe<GqlBigIntFilter>;
};

export type GqlNftDistinctCountAggregates = {
  /** Distinct count of _blockRange across the matching connection */
  _blockRange: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of _id across the matching connection */
  _id: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of balance across the matching connection */
  balance: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of id across the matching connection */
  id: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of metadata across the matching connection */
  metadata: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of nftId across the matching connection */
  nftId: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of tokenId across the matching connection */
  tokenId: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of walletId across the matching connection */
  walletId: Maybe<Scalars['BigInt']['output']>;
};

/** A filter to be used against `Nft` object types. All fields are combined with a logical ‘and.’ */
export type GqlNftFilter = {
  /** Checks for all expressions in this list. */
  and: InputMaybe<Array<GqlNftFilter>>;
  /** Filter by the object’s `balance` field. */
  balance: InputMaybe<GqlBigFloatFilter>;
  /** Filter by the object’s `id` field. */
  id: InputMaybe<GqlStringFilter>;
  /** Filter by the object’s `metadata` field. */
  metadata: InputMaybe<GqlJSONFilter>;
  /** Filter by the object’s `nftId` field. */
  nftId: InputMaybe<GqlBigFloatFilter>;
  /** Negates the expression. */
  not: InputMaybe<GqlNftFilter>;
  /** Checks for any expressions in this list. */
  or: InputMaybe<Array<GqlNftFilter>>;
  /** Filter by the object’s `token` relation. */
  token: InputMaybe<GqlTokenFilter>;
  /** Filter by the object’s `tokenId` field. */
  tokenId: InputMaybe<GqlStringFilter>;
  /** Filter by the object’s `wallet` relation. */
  wallet: InputMaybe<GqlWalletFilter>;
  /** Filter by the object’s `walletId` field. */
  walletId: InputMaybe<GqlStringFilter>;
};

export type GqlNftMaxAggregateFilter = {
  balance: InputMaybe<GqlBigFloatFilter>;
  nftId: InputMaybe<GqlBigFloatFilter>;
};

export type GqlNftMaxAggregates = {
  /** Maximum of balance across the matching connection */
  balance: Maybe<Scalars['BigFloat']['output']>;
  /** Maximum of nftId across the matching connection */
  nftId: Maybe<Scalars['BigFloat']['output']>;
};

export type GqlNftMinAggregateFilter = {
  balance: InputMaybe<GqlBigFloatFilter>;
  nftId: InputMaybe<GqlBigFloatFilter>;
};

export type GqlNftMinAggregates = {
  /** Minimum of balance across the matching connection */
  balance: Maybe<Scalars['BigFloat']['output']>;
  /** Minimum of nftId across the matching connection */
  nftId: Maybe<Scalars['BigFloat']['output']>;
};

export type GqlNftStddevPopulationAggregateFilter = {
  balance: InputMaybe<GqlBigFloatFilter>;
  nftId: InputMaybe<GqlBigFloatFilter>;
};

export type GqlNftStddevPopulationAggregates = {
  /** Population standard deviation of balance across the matching connection */
  balance: Maybe<Scalars['BigFloat']['output']>;
  /** Population standard deviation of nftId across the matching connection */
  nftId: Maybe<Scalars['BigFloat']['output']>;
};

export type GqlNftStddevSampleAggregateFilter = {
  balance: InputMaybe<GqlBigFloatFilter>;
  nftId: InputMaybe<GqlBigFloatFilter>;
};

export type GqlNftStddevSampleAggregates = {
  /** Sample standard deviation of balance across the matching connection */
  balance: Maybe<Scalars['BigFloat']['output']>;
  /** Sample standard deviation of nftId across the matching connection */
  nftId: Maybe<Scalars['BigFloat']['output']>;
};

export type GqlNftSumAggregateFilter = {
  balance: InputMaybe<GqlBigFloatFilter>;
  nftId: InputMaybe<GqlBigFloatFilter>;
};

export type GqlNftSumAggregates = {
  /** Sum of balance across the matching connection */
  balance: Scalars['BigFloat']['output'];
  /** Sum of nftId across the matching connection */
  nftId: Scalars['BigFloat']['output'];
};

export type GqlNftVariancePopulationAggregateFilter = {
  balance: InputMaybe<GqlBigFloatFilter>;
  nftId: InputMaybe<GqlBigFloatFilter>;
};

export type GqlNftVariancePopulationAggregates = {
  /** Population variance of balance across the matching connection */
  balance: Maybe<Scalars['BigFloat']['output']>;
  /** Population variance of nftId across the matching connection */
  nftId: Maybe<Scalars['BigFloat']['output']>;
};

export type GqlNftVarianceSampleAggregateFilter = {
  balance: InputMaybe<GqlBigFloatFilter>;
  nftId: InputMaybe<GqlBigFloatFilter>;
};

export type GqlNftVarianceSampleAggregates = {
  /** Sample variance of balance across the matching connection */
  balance: Maybe<Scalars['BigFloat']['output']>;
  /** Sample variance of nftId across the matching connection */
  nftId: Maybe<Scalars['BigFloat']['output']>;
};

/** A connection to a list of `Nft` values. */
export type GqlNftsConnection = {
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates: Maybe<GqlNftAggregates>;
  /** A list of edges which contains the `Nft` and cursor to aid in pagination. */
  edges: Array<GqlNftsEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates: Maybe<Array<GqlNftAggregates>>;
  /** A list of `Nft` objects. */
  nodes: Array<Maybe<GqlNft>>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
  /** The count of *all* `Nft` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `Nft` values. */
export type GqlNftsConnectiongroupedAggregatesArgs = {
  groupBy: Array<GqlNftsGroupBy>;
  having: InputMaybe<GqlNftsHavingInput>;
};

/** A `Nft` edge in the connection. */
export type GqlNftsEdge = {
  /** A cursor for use in pagination. */
  cursor: Maybe<Scalars['Cursor']['output']>;
  /** The `Nft` at the end of the edge. */
  node: Maybe<GqlNft>;
};

/** Grouping methods for `Nft` for usage during aggregation. */
export enum GqlNftsGroupBy {
  BALANCE = 'BALANCE',
  ID = 'ID',
  METADATA = 'METADATA',
  NFT_ID = 'NFT_ID',
  TOKEN_ID = 'TOKEN_ID',
  WALLET_ID = 'WALLET_ID'
}

export type GqlNftsHavingAverageInput = {
  balance: InputMaybe<GqlHavingBigfloatFilter>;
  nftId: InputMaybe<GqlHavingBigfloatFilter>;
};

export type GqlNftsHavingDistinctCountInput = {
  balance: InputMaybe<GqlHavingBigfloatFilter>;
  nftId: InputMaybe<GqlHavingBigfloatFilter>;
};

/** Conditions for `Nft` aggregates. */
export type GqlNftsHavingInput = {
  AND: InputMaybe<Array<GqlNftsHavingInput>>;
  OR: InputMaybe<Array<GqlNftsHavingInput>>;
  average: InputMaybe<GqlNftsHavingAverageInput>;
  distinctCount: InputMaybe<GqlNftsHavingDistinctCountInput>;
  max: InputMaybe<GqlNftsHavingMaxInput>;
  min: InputMaybe<GqlNftsHavingMinInput>;
  stddevPopulation: InputMaybe<GqlNftsHavingStddevPopulationInput>;
  stddevSample: InputMaybe<GqlNftsHavingStddevSampleInput>;
  sum: InputMaybe<GqlNftsHavingSumInput>;
  variancePopulation: InputMaybe<GqlNftsHavingVariancePopulationInput>;
  varianceSample: InputMaybe<GqlNftsHavingVarianceSampleInput>;
};

export type GqlNftsHavingMaxInput = {
  balance: InputMaybe<GqlHavingBigfloatFilter>;
  nftId: InputMaybe<GqlHavingBigfloatFilter>;
};

export type GqlNftsHavingMinInput = {
  balance: InputMaybe<GqlHavingBigfloatFilter>;
  nftId: InputMaybe<GqlHavingBigfloatFilter>;
};

export type GqlNftsHavingStddevPopulationInput = {
  balance: InputMaybe<GqlHavingBigfloatFilter>;
  nftId: InputMaybe<GqlHavingBigfloatFilter>;
};

export type GqlNftsHavingStddevSampleInput = {
  balance: InputMaybe<GqlHavingBigfloatFilter>;
  nftId: InputMaybe<GqlHavingBigfloatFilter>;
};

export type GqlNftsHavingSumInput = {
  balance: InputMaybe<GqlHavingBigfloatFilter>;
  nftId: InputMaybe<GqlHavingBigfloatFilter>;
};

export type GqlNftsHavingVariancePopulationInput = {
  balance: InputMaybe<GqlHavingBigfloatFilter>;
  nftId: InputMaybe<GqlHavingBigfloatFilter>;
};

export type GqlNftsHavingVarianceSampleInput = {
  balance: InputMaybe<GqlHavingBigfloatFilter>;
  nftId: InputMaybe<GqlHavingBigfloatFilter>;
};

/** Methods to use when ordering `Nft`. */
export enum GqlNftsOrderBy {
  BALANCE_ASC = 'BALANCE_ASC',
  BALANCE_DESC = 'BALANCE_DESC',
  ID_ASC = 'ID_ASC',
  ID_DESC = 'ID_DESC',
  METADATA_ASC = 'METADATA_ASC',
  METADATA_DESC = 'METADATA_DESC',
  NATURAL = 'NATURAL',
  NFT_ID_ASC = 'NFT_ID_ASC',
  NFT_ID_DESC = 'NFT_ID_DESC',
  PRIMARY_KEY_ASC = 'PRIMARY_KEY_ASC',
  PRIMARY_KEY_DESC = 'PRIMARY_KEY_DESC',
  TOKEN_ID_ASC = 'TOKEN_ID_ASC',
  TOKEN_ID_DESC = 'TOKEN_ID_DESC',
  WALLET_ID_ASC = 'WALLET_ID_ASC',
  WALLET_ID_DESC = 'WALLET_ID_DESC'
}

/** An object with a globally unique `ID`. */
export type GqlNode = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
};

/** Options for ordering null values in a specific direction. */
export enum GqlNullOrder {
  /** Order null values first. */
  NULLS_FIRST = 'NULLS_FIRST',
  /** Order null values last. */
  NULLS_LAST = 'NULLS_LAST'
}

/** Information about pagination in a connection. */
export type GqlPageInfo = {
  /** When paginating forwards, the cursor to continue. */
  endCursor: Maybe<Scalars['Cursor']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor: Maybe<Scalars['Cursor']['output']>;
};

/** The root query type which gives access points into the data universe. */
export type GqlQuery = GqlNode & {
  _metadata: Maybe<Gql_Metadata>;
  _metadatas: Maybe<Gql_Metadatas>;
  nft: Maybe<GqlNft>;
  /** Reads a single `Nft` using its globally unique `ID`. */
  nftByNodeId: Maybe<GqlNft>;
  /** Reads and enables pagination through a set of `Nft`. */
  nfts: Maybe<GqlNftsConnection>;
  /** Fetches an object given its globally unique `ID`. */
  node: Maybe<GqlNode>;
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  nodeId: Scalars['ID']['output'];
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
   */
  query: GqlQuery;
  token: Maybe<GqlToken>;
  tokenBalance: Maybe<GqlTokenBalance>;
  /** Reads a single `TokenBalance` using its globally unique `ID`. */
  tokenBalanceByNodeId: Maybe<GqlTokenBalance>;
  /** Reads and enables pagination through a set of `TokenBalance`. */
  tokenBalances: Maybe<GqlTokenBalancesConnection>;
  /** Reads a single `Token` using its globally unique `ID`. */
  tokenByNodeId: Maybe<GqlToken>;
  /** Reads and enables pagination through a set of `Token`. */
  tokens: Maybe<GqlTokensConnection>;
  wallet: Maybe<GqlWallet>;
  /** Reads a single `Wallet` using its globally unique `ID`. */
  walletByNodeId: Maybe<GqlWallet>;
  /** Reads and enables pagination through a set of `Wallet`. */
  wallets: Maybe<GqlWalletsConnection>;
};


/** The root query type which gives access points into the data universe. */
export type GqlQuery_metadataArgs = {
  chainId: InputMaybe<Scalars['String']['input']>;
};


/** The root query type which gives access points into the data universe. */
export type GqlQuery_metadatasArgs = {
  after: InputMaybe<Scalars['Cursor']['input']>;
  before: InputMaybe<Scalars['Cursor']['input']>;
};


/** The root query type which gives access points into the data universe. */
export type GqlQuerynftArgs = {
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type GqlQuerynftByNodeIdArgs = {
  distinct?: InputMaybe<Array<InputMaybe<Gqlnfts_distinct_enum>>>;
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type GqlQuerynftsArgs = {
  after: InputMaybe<Scalars['Cursor']['input']>;
  before: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqlnfts_distinct_enum>>>;
  filter: InputMaybe<GqlNftFilter>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<GqlNftsOrderBy>>;
  orderByNull: InputMaybe<GqlNullOrder>;
};


/** The root query type which gives access points into the data universe. */
export type GqlQuerynodeArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type GqlQuerytokenArgs = {
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type GqlQuerytokenBalanceArgs = {
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type GqlQuerytokenBalanceByNodeIdArgs = {
  distinct?: InputMaybe<Array<InputMaybe<Gqltoken_balances_distinct_enum>>>;
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type GqlQuerytokenBalancesArgs = {
  after: InputMaybe<Scalars['Cursor']['input']>;
  before: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqltoken_balances_distinct_enum>>>;
  filter: InputMaybe<GqlTokenBalanceFilter>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<GqlTokenBalancesOrderBy>>;
  orderByNull: InputMaybe<GqlNullOrder>;
};


/** The root query type which gives access points into the data universe. */
export type GqlQuerytokenByNodeIdArgs = {
  distinct?: InputMaybe<Array<InputMaybe<Gqltokens_distinct_enum>>>;
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type GqlQuerytokensArgs = {
  after: InputMaybe<Scalars['Cursor']['input']>;
  before: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqltokens_distinct_enum>>>;
  filter: InputMaybe<GqlTokenFilter>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<GqlTokensOrderBy>>;
  orderByNull: InputMaybe<GqlNullOrder>;
};


/** The root query type which gives access points into the data universe. */
export type GqlQuerywalletArgs = {
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type GqlQuerywalletByNodeIdArgs = {
  distinct?: InputMaybe<Array<InputMaybe<Gqlwallets_distinct_enum>>>;
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type GqlQuerywalletsArgs = {
  after: InputMaybe<Scalars['Cursor']['input']>;
  before: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqlwallets_distinct_enum>>>;
  filter: InputMaybe<GqlWalletFilter>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<GqlWalletsOrderBy>>;
  orderByNull: InputMaybe<GqlNullOrder>;
};

/** A filter to be used against String fields. All fields are combined with a logical ‘and.’ */
export type GqlStringFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom: InputMaybe<Scalars['String']['input']>;
  /** Not equal to the specified value, treating null like an ordinary value (case-insensitive). */
  distinctFromInsensitive: InputMaybe<Scalars['String']['input']>;
  /** Ends with the specified string (case-sensitive). */
  endsWith: InputMaybe<Scalars['String']['input']>;
  /** Ends with the specified string (case-insensitive). */
  endsWithInsensitive: InputMaybe<Scalars['String']['input']>;
  /** Equal to the specified value. */
  equalTo: InputMaybe<Scalars['String']['input']>;
  /** Equal to the specified value (case-insensitive). */
  equalToInsensitive: InputMaybe<Scalars['String']['input']>;
  /** Greater than the specified value. */
  greaterThan: InputMaybe<Scalars['String']['input']>;
  /** Greater than the specified value (case-insensitive). */
  greaterThanInsensitive: InputMaybe<Scalars['String']['input']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo: InputMaybe<Scalars['String']['input']>;
  /** Greater than or equal to the specified value (case-insensitive). */
  greaterThanOrEqualToInsensitive: InputMaybe<Scalars['String']['input']>;
  /** Included in the specified list. */
  in: InputMaybe<Array<Scalars['String']['input']>>;
  /** Included in the specified list (case-insensitive). */
  inInsensitive: InputMaybe<Array<Scalars['String']['input']>>;
  /** Contains the specified string (case-sensitive). */
  includes: InputMaybe<Scalars['String']['input']>;
  /** Contains the specified string (case-insensitive). */
  includesInsensitive: InputMaybe<Scalars['String']['input']>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan: InputMaybe<Scalars['String']['input']>;
  /** Less than the specified value (case-insensitive). */
  lessThanInsensitive: InputMaybe<Scalars['String']['input']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo: InputMaybe<Scalars['String']['input']>;
  /** Less than or equal to the specified value (case-insensitive). */
  lessThanOrEqualToInsensitive: InputMaybe<Scalars['String']['input']>;
  /** Matches the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  like: InputMaybe<Scalars['String']['input']>;
  /** Matches the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  likeInsensitive: InputMaybe<Scalars['String']['input']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom: InputMaybe<Scalars['String']['input']>;
  /** Equal to the specified value, treating null like an ordinary value (case-insensitive). */
  notDistinctFromInsensitive: InputMaybe<Scalars['String']['input']>;
  /** Does not end with the specified string (case-sensitive). */
  notEndsWith: InputMaybe<Scalars['String']['input']>;
  /** Does not end with the specified string (case-insensitive). */
  notEndsWithInsensitive: InputMaybe<Scalars['String']['input']>;
  /** Not equal to the specified value. */
  notEqualTo: InputMaybe<Scalars['String']['input']>;
  /** Not equal to the specified value (case-insensitive). */
  notEqualToInsensitive: InputMaybe<Scalars['String']['input']>;
  /** Not included in the specified list. */
  notIn: InputMaybe<Array<Scalars['String']['input']>>;
  /** Not included in the specified list (case-insensitive). */
  notInInsensitive: InputMaybe<Array<Scalars['String']['input']>>;
  /** Does not contain the specified string (case-sensitive). */
  notIncludes: InputMaybe<Scalars['String']['input']>;
  /** Does not contain the specified string (case-insensitive). */
  notIncludesInsensitive: InputMaybe<Scalars['String']['input']>;
  /** Does not match the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLike: InputMaybe<Scalars['String']['input']>;
  /** Does not match the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLikeInsensitive: InputMaybe<Scalars['String']['input']>;
  /** Does not start with the specified string (case-sensitive). */
  notStartsWith: InputMaybe<Scalars['String']['input']>;
  /** Does not start with the specified string (case-insensitive). */
  notStartsWithInsensitive: InputMaybe<Scalars['String']['input']>;
  /** Starts with the specified string (case-sensitive). */
  startsWith: InputMaybe<Scalars['String']['input']>;
  /** Starts with the specified string (case-insensitive). */
  startsWithInsensitive: InputMaybe<Scalars['String']['input']>;
};

/** The root subscription type: contains realtime events you can subscribe to with the `subscription` operation. */
export type GqlSubscription = {
  nfts: Maybe<GqlSubscriptionPayload>;
  tokenBalances: Maybe<GqlSubscriptionPayload>;
  tokens: Maybe<GqlSubscriptionPayload>;
  wallets: Maybe<GqlSubscriptionPayload>;
};


/** The root subscription type: contains realtime events you can subscribe to with the `subscription` operation. */
export type GqlSubscriptionnftsArgs = {
  id: InputMaybe<Array<Scalars['ID']['input']>>;
  mutation: InputMaybe<Array<GqlMutationType>>;
};


/** The root subscription type: contains realtime events you can subscribe to with the `subscription` operation. */
export type GqlSubscriptiontokenBalancesArgs = {
  id: InputMaybe<Array<Scalars['ID']['input']>>;
  mutation: InputMaybe<Array<GqlMutationType>>;
};


/** The root subscription type: contains realtime events you can subscribe to with the `subscription` operation. */
export type GqlSubscriptiontokensArgs = {
  id: InputMaybe<Array<Scalars['ID']['input']>>;
  mutation: InputMaybe<Array<GqlMutationType>>;
};


/** The root subscription type: contains realtime events you can subscribe to with the `subscription` operation. */
export type GqlSubscriptionwalletsArgs = {
  id: InputMaybe<Array<Scalars['ID']['input']>>;
  mutation: InputMaybe<Array<GqlMutationType>>;
};

export type GqlSubscriptionPayload = {
  _entity: Maybe<Scalars['JSON']['output']>;
  id: Scalars['ID']['output'];
  mutation_type: GqlMutationType;
};

export type GqlTableEstimate = {
  estimate: Maybe<Scalars['Int']['output']>;
  table: Maybe<Scalars['String']['output']>;
};

export type GqlToken = GqlNode & {
  decimals: Maybe<Scalars['Int']['output']>;
  iconUrl: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `Nft`. */
  nfts: GqlNftsConnection;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  symbol: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `TokenBalance`. */
  tokenBalances: GqlTokenBalancesConnection;
  type: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `Wallet`. */
  walletsByNftTokenIdAndWalletId: GqlTokenWalletsByNftTokenIdAndWalletIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Wallet`. */
  walletsByTokenBalanceTokenIdAndWalletId: GqlTokenWalletsByTokenBalanceTokenIdAndWalletIdManyToManyConnection;
};


export type GqlTokennftsArgs = {
  after: InputMaybe<Scalars['Cursor']['input']>;
  before: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqlnfts_distinct_enum>>>;
  filter: InputMaybe<GqlNftFilter>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<GqlNftsOrderBy>>;
  orderByNull: InputMaybe<GqlNullOrder>;
};


export type GqlTokentokenBalancesArgs = {
  after: InputMaybe<Scalars['Cursor']['input']>;
  before: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqltoken_balances_distinct_enum>>>;
  filter: InputMaybe<GqlTokenBalanceFilter>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<GqlTokenBalancesOrderBy>>;
  orderByNull: InputMaybe<GqlNullOrder>;
};


export type GqlTokenwalletsByNftTokenIdAndWalletIdArgs = {
  after: InputMaybe<Scalars['Cursor']['input']>;
  before: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqlwallets_distinct_enum>>>;
  filter: InputMaybe<GqlWalletFilter>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<GqlWalletsOrderBy>>;
  orderByNull: InputMaybe<GqlNullOrder>;
};


export type GqlTokenwalletsByTokenBalanceTokenIdAndWalletIdArgs = {
  after: InputMaybe<Scalars['Cursor']['input']>;
  before: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqlwallets_distinct_enum>>>;
  filter: InputMaybe<GqlWalletFilter>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<GqlWalletsOrderBy>>;
  orderByNull: InputMaybe<GqlNullOrder>;
};

export type GqlTokenAggregates = {
  /** Mean average aggregates across the matching connection (ignoring before/after/first/last/offset) */
  average: Maybe<GqlTokenAverageAggregates>;
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount: Maybe<GqlTokenDistinctCountAggregates>;
  keys: Maybe<Array<Scalars['String']['output']>>;
  /** Maximum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  max: Maybe<GqlTokenMaxAggregates>;
  /** Minimum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  min: Maybe<GqlTokenMinAggregates>;
  /** Population standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevPopulation: Maybe<GqlTokenStddevPopulationAggregates>;
  /** Sample standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevSample: Maybe<GqlTokenStddevSampleAggregates>;
  /** Sum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  sum: Maybe<GqlTokenSumAggregates>;
  /** Population variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  variancePopulation: Maybe<GqlTokenVariancePopulationAggregates>;
  /** Sample variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  varianceSample: Maybe<GqlTokenVarianceSampleAggregates>;
};

export type GqlTokenAverageAggregates = {
  /** Mean average of decimals across the matching connection */
  decimals: Maybe<Scalars['BigFloat']['output']>;
};

export type GqlTokenBalance = GqlNode & {
  balance: Scalars['BigFloat']['output'];
  id: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads a single `Token` that is related to this `TokenBalance`. */
  token: Maybe<GqlToken>;
  tokenId: Scalars['String']['output'];
  /** Reads a single `Wallet` that is related to this `TokenBalance`. */
  wallet: Maybe<GqlWallet>;
  walletId: Scalars['String']['output'];
};

export type GqlTokenBalanceAggregates = {
  /** Mean average aggregates across the matching connection (ignoring before/after/first/last/offset) */
  average: Maybe<GqlTokenBalanceAverageAggregates>;
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount: Maybe<GqlTokenBalanceDistinctCountAggregates>;
  keys: Maybe<Array<Scalars['String']['output']>>;
  /** Maximum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  max: Maybe<GqlTokenBalanceMaxAggregates>;
  /** Minimum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  min: Maybe<GqlTokenBalanceMinAggregates>;
  /** Population standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevPopulation: Maybe<GqlTokenBalanceStddevPopulationAggregates>;
  /** Sample standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevSample: Maybe<GqlTokenBalanceStddevSampleAggregates>;
  /** Sum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  sum: Maybe<GqlTokenBalanceSumAggregates>;
  /** Population variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  variancePopulation: Maybe<GqlTokenBalanceVariancePopulationAggregates>;
  /** Sample variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  varianceSample: Maybe<GqlTokenBalanceVarianceSampleAggregates>;
};

/** A filter to be used against aggregates of `TokenBalance` object types. */
export type GqlTokenBalanceAggregatesFilter = {
  /** Mean average aggregate over matching `TokenBalance` objects. */
  average: InputMaybe<GqlTokenBalanceAverageAggregateFilter>;
  /** Distinct count aggregate over matching `TokenBalance` objects. */
  distinctCount: InputMaybe<GqlTokenBalanceDistinctCountAggregateFilter>;
  /** A filter that must pass for the relevant `TokenBalance` object to be included within the aggregate. */
  filter: InputMaybe<GqlTokenBalanceFilter>;
  /** Maximum aggregate over matching `TokenBalance` objects. */
  max: InputMaybe<GqlTokenBalanceMaxAggregateFilter>;
  /** Minimum aggregate over matching `TokenBalance` objects. */
  min: InputMaybe<GqlTokenBalanceMinAggregateFilter>;
  /** Population standard deviation aggregate over matching `TokenBalance` objects. */
  stddevPopulation: InputMaybe<GqlTokenBalanceStddevPopulationAggregateFilter>;
  /** Sample standard deviation aggregate over matching `TokenBalance` objects. */
  stddevSample: InputMaybe<GqlTokenBalanceStddevSampleAggregateFilter>;
  /** Sum aggregate over matching `TokenBalance` objects. */
  sum: InputMaybe<GqlTokenBalanceSumAggregateFilter>;
  /** Population variance aggregate over matching `TokenBalance` objects. */
  variancePopulation: InputMaybe<GqlTokenBalanceVariancePopulationAggregateFilter>;
  /** Sample variance aggregate over matching `TokenBalance` objects. */
  varianceSample: InputMaybe<GqlTokenBalanceVarianceSampleAggregateFilter>;
};

export type GqlTokenBalanceAverageAggregateFilter = {
  balance: InputMaybe<GqlBigFloatFilter>;
};

export type GqlTokenBalanceAverageAggregates = {
  /** Mean average of balance across the matching connection */
  balance: Maybe<Scalars['BigFloat']['output']>;
};

export type GqlTokenBalanceDistinctCountAggregateFilter = {
  _blockRange: InputMaybe<GqlBigIntFilter>;
  _id: InputMaybe<GqlBigIntFilter>;
  balance: InputMaybe<GqlBigIntFilter>;
  id: InputMaybe<GqlBigIntFilter>;
  tokenId: InputMaybe<GqlBigIntFilter>;
  walletId: InputMaybe<GqlBigIntFilter>;
};

export type GqlTokenBalanceDistinctCountAggregates = {
  /** Distinct count of _blockRange across the matching connection */
  _blockRange: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of _id across the matching connection */
  _id: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of balance across the matching connection */
  balance: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of id across the matching connection */
  id: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of tokenId across the matching connection */
  tokenId: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of walletId across the matching connection */
  walletId: Maybe<Scalars['BigInt']['output']>;
};

/** A filter to be used against `TokenBalance` object types. All fields are combined with a logical ‘and.’ */
export type GqlTokenBalanceFilter = {
  /** Checks for all expressions in this list. */
  and: InputMaybe<Array<GqlTokenBalanceFilter>>;
  /** Filter by the object’s `balance` field. */
  balance: InputMaybe<GqlBigFloatFilter>;
  /** Filter by the object’s `id` field. */
  id: InputMaybe<GqlStringFilter>;
  /** Negates the expression. */
  not: InputMaybe<GqlTokenBalanceFilter>;
  /** Checks for any expressions in this list. */
  or: InputMaybe<Array<GqlTokenBalanceFilter>>;
  /** Filter by the object’s `token` relation. */
  token: InputMaybe<GqlTokenFilter>;
  /** Filter by the object’s `tokenId` field. */
  tokenId: InputMaybe<GqlStringFilter>;
  /** Filter by the object’s `wallet` relation. */
  wallet: InputMaybe<GqlWalletFilter>;
  /** Filter by the object’s `walletId` field. */
  walletId: InputMaybe<GqlStringFilter>;
};

export type GqlTokenBalanceMaxAggregateFilter = {
  balance: InputMaybe<GqlBigFloatFilter>;
};

export type GqlTokenBalanceMaxAggregates = {
  /** Maximum of balance across the matching connection */
  balance: Maybe<Scalars['BigFloat']['output']>;
};

export type GqlTokenBalanceMinAggregateFilter = {
  balance: InputMaybe<GqlBigFloatFilter>;
};

export type GqlTokenBalanceMinAggregates = {
  /** Minimum of balance across the matching connection */
  balance: Maybe<Scalars['BigFloat']['output']>;
};

export type GqlTokenBalanceStddevPopulationAggregateFilter = {
  balance: InputMaybe<GqlBigFloatFilter>;
};

export type GqlTokenBalanceStddevPopulationAggregates = {
  /** Population standard deviation of balance across the matching connection */
  balance: Maybe<Scalars['BigFloat']['output']>;
};

export type GqlTokenBalanceStddevSampleAggregateFilter = {
  balance: InputMaybe<GqlBigFloatFilter>;
};

export type GqlTokenBalanceStddevSampleAggregates = {
  /** Sample standard deviation of balance across the matching connection */
  balance: Maybe<Scalars['BigFloat']['output']>;
};

export type GqlTokenBalanceSumAggregateFilter = {
  balance: InputMaybe<GqlBigFloatFilter>;
};

export type GqlTokenBalanceSumAggregates = {
  /** Sum of balance across the matching connection */
  balance: Scalars['BigFloat']['output'];
};

export type GqlTokenBalanceVariancePopulationAggregateFilter = {
  balance: InputMaybe<GqlBigFloatFilter>;
};

export type GqlTokenBalanceVariancePopulationAggregates = {
  /** Population variance of balance across the matching connection */
  balance: Maybe<Scalars['BigFloat']['output']>;
};

export type GqlTokenBalanceVarianceSampleAggregateFilter = {
  balance: InputMaybe<GqlBigFloatFilter>;
};

export type GqlTokenBalanceVarianceSampleAggregates = {
  /** Sample variance of balance across the matching connection */
  balance: Maybe<Scalars['BigFloat']['output']>;
};

/** A connection to a list of `TokenBalance` values. */
export type GqlTokenBalancesConnection = {
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates: Maybe<GqlTokenBalanceAggregates>;
  /** A list of edges which contains the `TokenBalance` and cursor to aid in pagination. */
  edges: Array<GqlTokenBalancesEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates: Maybe<Array<GqlTokenBalanceAggregates>>;
  /** A list of `TokenBalance` objects. */
  nodes: Array<Maybe<GqlTokenBalance>>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
  /** The count of *all* `TokenBalance` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `TokenBalance` values. */
export type GqlTokenBalancesConnectiongroupedAggregatesArgs = {
  groupBy: Array<GqlTokenBalancesGroupBy>;
  having: InputMaybe<GqlTokenBalancesHavingInput>;
};

/** A `TokenBalance` edge in the connection. */
export type GqlTokenBalancesEdge = {
  /** A cursor for use in pagination. */
  cursor: Maybe<Scalars['Cursor']['output']>;
  /** The `TokenBalance` at the end of the edge. */
  node: Maybe<GqlTokenBalance>;
};

/** Grouping methods for `TokenBalance` for usage during aggregation. */
export enum GqlTokenBalancesGroupBy {
  BALANCE = 'BALANCE',
  ID = 'ID',
  TOKEN_ID = 'TOKEN_ID',
  WALLET_ID = 'WALLET_ID'
}

export type GqlTokenBalancesHavingAverageInput = {
  balance: InputMaybe<GqlHavingBigfloatFilter>;
};

export type GqlTokenBalancesHavingDistinctCountInput = {
  balance: InputMaybe<GqlHavingBigfloatFilter>;
};

/** Conditions for `TokenBalance` aggregates. */
export type GqlTokenBalancesHavingInput = {
  AND: InputMaybe<Array<GqlTokenBalancesHavingInput>>;
  OR: InputMaybe<Array<GqlTokenBalancesHavingInput>>;
  average: InputMaybe<GqlTokenBalancesHavingAverageInput>;
  distinctCount: InputMaybe<GqlTokenBalancesHavingDistinctCountInput>;
  max: InputMaybe<GqlTokenBalancesHavingMaxInput>;
  min: InputMaybe<GqlTokenBalancesHavingMinInput>;
  stddevPopulation: InputMaybe<GqlTokenBalancesHavingStddevPopulationInput>;
  stddevSample: InputMaybe<GqlTokenBalancesHavingStddevSampleInput>;
  sum: InputMaybe<GqlTokenBalancesHavingSumInput>;
  variancePopulation: InputMaybe<GqlTokenBalancesHavingVariancePopulationInput>;
  varianceSample: InputMaybe<GqlTokenBalancesHavingVarianceSampleInput>;
};

export type GqlTokenBalancesHavingMaxInput = {
  balance: InputMaybe<GqlHavingBigfloatFilter>;
};

export type GqlTokenBalancesHavingMinInput = {
  balance: InputMaybe<GqlHavingBigfloatFilter>;
};

export type GqlTokenBalancesHavingStddevPopulationInput = {
  balance: InputMaybe<GqlHavingBigfloatFilter>;
};

export type GqlTokenBalancesHavingStddevSampleInput = {
  balance: InputMaybe<GqlHavingBigfloatFilter>;
};

export type GqlTokenBalancesHavingSumInput = {
  balance: InputMaybe<GqlHavingBigfloatFilter>;
};

export type GqlTokenBalancesHavingVariancePopulationInput = {
  balance: InputMaybe<GqlHavingBigfloatFilter>;
};

export type GqlTokenBalancesHavingVarianceSampleInput = {
  balance: InputMaybe<GqlHavingBigfloatFilter>;
};

/** Methods to use when ordering `TokenBalance`. */
export enum GqlTokenBalancesOrderBy {
  BALANCE_ASC = 'BALANCE_ASC',
  BALANCE_DESC = 'BALANCE_DESC',
  ID_ASC = 'ID_ASC',
  ID_DESC = 'ID_DESC',
  NATURAL = 'NATURAL',
  PRIMARY_KEY_ASC = 'PRIMARY_KEY_ASC',
  PRIMARY_KEY_DESC = 'PRIMARY_KEY_DESC',
  TOKEN_ID_ASC = 'TOKEN_ID_ASC',
  TOKEN_ID_DESC = 'TOKEN_ID_DESC',
  WALLET_ID_ASC = 'WALLET_ID_ASC',
  WALLET_ID_DESC = 'WALLET_ID_DESC'
}

export type GqlTokenDistinctCountAggregates = {
  /** Distinct count of _blockRange across the matching connection */
  _blockRange: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of _id across the matching connection */
  _id: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of decimals across the matching connection */
  decimals: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of iconUrl across the matching connection */
  iconUrl: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of id across the matching connection */
  id: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of name across the matching connection */
  name: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of symbol across the matching connection */
  symbol: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of type across the matching connection */
  type: Maybe<Scalars['BigInt']['output']>;
};

/** A filter to be used against `Token` object types. All fields are combined with a logical ‘and.’ */
export type GqlTokenFilter = {
  /** Checks for all expressions in this list. */
  and: InputMaybe<Array<GqlTokenFilter>>;
  /** Filter by the object’s `decimals` field. */
  decimals: InputMaybe<GqlIntFilter>;
  /** Filter by the object’s `iconUrl` field. */
  iconUrl: InputMaybe<GqlStringFilter>;
  /** Filter by the object’s `id` field. */
  id: InputMaybe<GqlStringFilter>;
  /** Filter by the object’s `name` field. */
  name: InputMaybe<GqlStringFilter>;
  /** Filter by the object’s `nfts` relation. */
  nfts: InputMaybe<GqlTokenToManyNftFilter>;
  /** Some related `nfts` exist. */
  nftsExist: InputMaybe<Scalars['Boolean']['input']>;
  /** Negates the expression. */
  not: InputMaybe<GqlTokenFilter>;
  /** Checks for any expressions in this list. */
  or: InputMaybe<Array<GqlTokenFilter>>;
  /** Filter by the object’s `symbol` field. */
  symbol: InputMaybe<GqlStringFilter>;
  /** Filter by the object’s `tokenBalances` relation. */
  tokenBalances: InputMaybe<GqlTokenToManyTokenBalanceFilter>;
  /** Some related `tokenBalances` exist. */
  tokenBalancesExist: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `type` field. */
  type: InputMaybe<GqlStringFilter>;
};

export type GqlTokenMaxAggregates = {
  /** Maximum of decimals across the matching connection */
  decimals: Maybe<Scalars['Int']['output']>;
};

export type GqlTokenMinAggregates = {
  /** Minimum of decimals across the matching connection */
  decimals: Maybe<Scalars['Int']['output']>;
};

export type GqlTokenStddevPopulationAggregates = {
  /** Population standard deviation of decimals across the matching connection */
  decimals: Maybe<Scalars['BigFloat']['output']>;
};

export type GqlTokenStddevSampleAggregates = {
  /** Sample standard deviation of decimals across the matching connection */
  decimals: Maybe<Scalars['BigFloat']['output']>;
};

export type GqlTokenSumAggregates = {
  /** Sum of decimals across the matching connection */
  decimals: Scalars['BigInt']['output'];
};

/** A filter to be used against many `Nft` object types. All fields are combined with a logical ‘and.’ */
export type GqlTokenToManyNftFilter = {
  /** Aggregates across related `Nft` match the filter criteria. */
  aggregates: InputMaybe<GqlNftAggregatesFilter>;
  /** Every related `Nft` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every: InputMaybe<GqlNftFilter>;
  /** No related `Nft` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none: InputMaybe<GqlNftFilter>;
  /** Some related `Nft` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some: InputMaybe<GqlNftFilter>;
};

/** A filter to be used against many `TokenBalance` object types. All fields are combined with a logical ‘and.’ */
export type GqlTokenToManyTokenBalanceFilter = {
  /** Aggregates across related `TokenBalance` match the filter criteria. */
  aggregates: InputMaybe<GqlTokenBalanceAggregatesFilter>;
  /** Every related `TokenBalance` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every: InputMaybe<GqlTokenBalanceFilter>;
  /** No related `TokenBalance` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none: InputMaybe<GqlTokenBalanceFilter>;
  /** Some related `TokenBalance` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some: InputMaybe<GqlTokenBalanceFilter>;
};

export type GqlTokenVariancePopulationAggregates = {
  /** Population variance of decimals across the matching connection */
  decimals: Maybe<Scalars['BigFloat']['output']>;
};

export type GqlTokenVarianceSampleAggregates = {
  /** Sample variance of decimals across the matching connection */
  decimals: Maybe<Scalars['BigFloat']['output']>;
};

/** A connection to a list of `Wallet` values, with data from `Nft`. */
export type GqlTokenWalletsByNftTokenIdAndWalletIdManyToManyConnection = {
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates: Maybe<GqlWalletAggregates>;
  /** A list of edges which contains the `Wallet`, info from the `Nft`, and the cursor to aid in pagination. */
  edges: Array<GqlTokenWalletsByNftTokenIdAndWalletIdManyToManyEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates: Maybe<Array<GqlWalletAggregates>>;
  /** A list of `Wallet` objects. */
  nodes: Array<Maybe<GqlWallet>>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
  /** The count of *all* `Wallet` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `Wallet` values, with data from `Nft`. */
export type GqlTokenWalletsByNftTokenIdAndWalletIdManyToManyConnectiongroupedAggregatesArgs = {
  groupBy: Array<GqlWalletsGroupBy>;
  having: InputMaybe<GqlWalletsHavingInput>;
};

/** A `Wallet` edge in the connection, with data from `Nft`. */
export type GqlTokenWalletsByNftTokenIdAndWalletIdManyToManyEdge = {
  /** A cursor for use in pagination. */
  cursor: Maybe<Scalars['Cursor']['output']>;
  /** Reads and enables pagination through a set of `Nft`. */
  nfts: GqlNftsConnection;
  /** The `Wallet` at the end of the edge. */
  node: Maybe<GqlWallet>;
};


/** A `Wallet` edge in the connection, with data from `Nft`. */
export type GqlTokenWalletsByNftTokenIdAndWalletIdManyToManyEdgenftsArgs = {
  after: InputMaybe<Scalars['Cursor']['input']>;
  before: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqlnfts_distinct_enum>>>;
  filter: InputMaybe<GqlNftFilter>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<GqlNftsOrderBy>>;
  orderByNull: InputMaybe<GqlNullOrder>;
};

/** A connection to a list of `Wallet` values, with data from `TokenBalance`. */
export type GqlTokenWalletsByTokenBalanceTokenIdAndWalletIdManyToManyConnection = {
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates: Maybe<GqlWalletAggregates>;
  /** A list of edges which contains the `Wallet`, info from the `TokenBalance`, and the cursor to aid in pagination. */
  edges: Array<GqlTokenWalletsByTokenBalanceTokenIdAndWalletIdManyToManyEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates: Maybe<Array<GqlWalletAggregates>>;
  /** A list of `Wallet` objects. */
  nodes: Array<Maybe<GqlWallet>>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
  /** The count of *all* `Wallet` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `Wallet` values, with data from `TokenBalance`. */
export type GqlTokenWalletsByTokenBalanceTokenIdAndWalletIdManyToManyConnectiongroupedAggregatesArgs = {
  groupBy: Array<GqlWalletsGroupBy>;
  having: InputMaybe<GqlWalletsHavingInput>;
};

/** A `Wallet` edge in the connection, with data from `TokenBalance`. */
export type GqlTokenWalletsByTokenBalanceTokenIdAndWalletIdManyToManyEdge = {
  /** A cursor for use in pagination. */
  cursor: Maybe<Scalars['Cursor']['output']>;
  /** The `Wallet` at the end of the edge. */
  node: Maybe<GqlWallet>;
  /** Reads and enables pagination through a set of `TokenBalance`. */
  tokenBalances: GqlTokenBalancesConnection;
};


/** A `Wallet` edge in the connection, with data from `TokenBalance`. */
export type GqlTokenWalletsByTokenBalanceTokenIdAndWalletIdManyToManyEdgetokenBalancesArgs = {
  after: InputMaybe<Scalars['Cursor']['input']>;
  before: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqltoken_balances_distinct_enum>>>;
  filter: InputMaybe<GqlTokenBalanceFilter>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<GqlTokenBalancesOrderBy>>;
  orderByNull: InputMaybe<GqlNullOrder>;
};

/** A connection to a list of `Token` values. */
export type GqlTokensConnection = {
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates: Maybe<GqlTokenAggregates>;
  /** A list of edges which contains the `Token` and cursor to aid in pagination. */
  edges: Array<GqlTokensEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates: Maybe<Array<GqlTokenAggregates>>;
  /** A list of `Token` objects. */
  nodes: Array<Maybe<GqlToken>>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
  /** The count of *all* `Token` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `Token` values. */
export type GqlTokensConnectiongroupedAggregatesArgs = {
  groupBy: Array<GqlTokensGroupBy>;
  having: InputMaybe<GqlTokensHavingInput>;
};

/** A `Token` edge in the connection. */
export type GqlTokensEdge = {
  /** A cursor for use in pagination. */
  cursor: Maybe<Scalars['Cursor']['output']>;
  /** The `Token` at the end of the edge. */
  node: Maybe<GqlToken>;
};

/** Grouping methods for `Token` for usage during aggregation. */
export enum GqlTokensGroupBy {
  DECIMALS = 'DECIMALS',
  ICON_URL = 'ICON_URL',
  ID = 'ID',
  NAME = 'NAME',
  SYMBOL = 'SYMBOL',
  TYPE = 'TYPE'
}

export type GqlTokensHavingAverageInput = {
  decimals: InputMaybe<GqlHavingIntFilter>;
};

export type GqlTokensHavingDistinctCountInput = {
  decimals: InputMaybe<GqlHavingIntFilter>;
};

/** Conditions for `Token` aggregates. */
export type GqlTokensHavingInput = {
  AND: InputMaybe<Array<GqlTokensHavingInput>>;
  OR: InputMaybe<Array<GqlTokensHavingInput>>;
  average: InputMaybe<GqlTokensHavingAverageInput>;
  distinctCount: InputMaybe<GqlTokensHavingDistinctCountInput>;
  max: InputMaybe<GqlTokensHavingMaxInput>;
  min: InputMaybe<GqlTokensHavingMinInput>;
  stddevPopulation: InputMaybe<GqlTokensHavingStddevPopulationInput>;
  stddevSample: InputMaybe<GqlTokensHavingStddevSampleInput>;
  sum: InputMaybe<GqlTokensHavingSumInput>;
  variancePopulation: InputMaybe<GqlTokensHavingVariancePopulationInput>;
  varianceSample: InputMaybe<GqlTokensHavingVarianceSampleInput>;
};

export type GqlTokensHavingMaxInput = {
  decimals: InputMaybe<GqlHavingIntFilter>;
};

export type GqlTokensHavingMinInput = {
  decimals: InputMaybe<GqlHavingIntFilter>;
};

export type GqlTokensHavingStddevPopulationInput = {
  decimals: InputMaybe<GqlHavingIntFilter>;
};

export type GqlTokensHavingStddevSampleInput = {
  decimals: InputMaybe<GqlHavingIntFilter>;
};

export type GqlTokensHavingSumInput = {
  decimals: InputMaybe<GqlHavingIntFilter>;
};

export type GqlTokensHavingVariancePopulationInput = {
  decimals: InputMaybe<GqlHavingIntFilter>;
};

export type GqlTokensHavingVarianceSampleInput = {
  decimals: InputMaybe<GqlHavingIntFilter>;
};

/** Methods to use when ordering `Token`. */
export enum GqlTokensOrderBy {
  DECIMALS_ASC = 'DECIMALS_ASC',
  DECIMALS_DESC = 'DECIMALS_DESC',
  ICON_URL_ASC = 'ICON_URL_ASC',
  ICON_URL_DESC = 'ICON_URL_DESC',
  ID_ASC = 'ID_ASC',
  ID_DESC = 'ID_DESC',
  NAME_ASC = 'NAME_ASC',
  NAME_DESC = 'NAME_DESC',
  NATURAL = 'NATURAL',
  NFTS_AVERAGE_BALANCE_ASC = 'NFTS_AVERAGE_BALANCE_ASC',
  NFTS_AVERAGE_BALANCE_DESC = 'NFTS_AVERAGE_BALANCE_DESC',
  NFTS_AVERAGE_BLOCK_RANGE_ASC = 'NFTS_AVERAGE_BLOCK_RANGE_ASC',
  NFTS_AVERAGE_BLOCK_RANGE_DESC = 'NFTS_AVERAGE_BLOCK_RANGE_DESC',
  NFTS_AVERAGE_ID_ASC = 'NFTS_AVERAGE_ID_ASC',
  NFTS_AVERAGE_ID_DESC = 'NFTS_AVERAGE_ID_DESC',
  NFTS_AVERAGE_METADATA_ASC = 'NFTS_AVERAGE_METADATA_ASC',
  NFTS_AVERAGE_METADATA_DESC = 'NFTS_AVERAGE_METADATA_DESC',
  NFTS_AVERAGE_NFT_ID_ASC = 'NFTS_AVERAGE_NFT_ID_ASC',
  NFTS_AVERAGE_NFT_ID_DESC = 'NFTS_AVERAGE_NFT_ID_DESC',
  NFTS_AVERAGE_TOKEN_ID_ASC = 'NFTS_AVERAGE_TOKEN_ID_ASC',
  NFTS_AVERAGE_TOKEN_ID_DESC = 'NFTS_AVERAGE_TOKEN_ID_DESC',
  NFTS_AVERAGE_WALLET_ID_ASC = 'NFTS_AVERAGE_WALLET_ID_ASC',
  NFTS_AVERAGE_WALLET_ID_DESC = 'NFTS_AVERAGE_WALLET_ID_DESC',
  NFTS_COUNT_ASC = 'NFTS_COUNT_ASC',
  NFTS_COUNT_DESC = 'NFTS_COUNT_DESC',
  NFTS_DISTINCT_COUNT_BALANCE_ASC = 'NFTS_DISTINCT_COUNT_BALANCE_ASC',
  NFTS_DISTINCT_COUNT_BALANCE_DESC = 'NFTS_DISTINCT_COUNT_BALANCE_DESC',
  NFTS_DISTINCT_COUNT_BLOCK_RANGE_ASC = 'NFTS_DISTINCT_COUNT_BLOCK_RANGE_ASC',
  NFTS_DISTINCT_COUNT_BLOCK_RANGE_DESC = 'NFTS_DISTINCT_COUNT_BLOCK_RANGE_DESC',
  NFTS_DISTINCT_COUNT_ID_ASC = 'NFTS_DISTINCT_COUNT_ID_ASC',
  NFTS_DISTINCT_COUNT_ID_DESC = 'NFTS_DISTINCT_COUNT_ID_DESC',
  NFTS_DISTINCT_COUNT_METADATA_ASC = 'NFTS_DISTINCT_COUNT_METADATA_ASC',
  NFTS_DISTINCT_COUNT_METADATA_DESC = 'NFTS_DISTINCT_COUNT_METADATA_DESC',
  NFTS_DISTINCT_COUNT_NFT_ID_ASC = 'NFTS_DISTINCT_COUNT_NFT_ID_ASC',
  NFTS_DISTINCT_COUNT_NFT_ID_DESC = 'NFTS_DISTINCT_COUNT_NFT_ID_DESC',
  NFTS_DISTINCT_COUNT_TOKEN_ID_ASC = 'NFTS_DISTINCT_COUNT_TOKEN_ID_ASC',
  NFTS_DISTINCT_COUNT_TOKEN_ID_DESC = 'NFTS_DISTINCT_COUNT_TOKEN_ID_DESC',
  NFTS_DISTINCT_COUNT_WALLET_ID_ASC = 'NFTS_DISTINCT_COUNT_WALLET_ID_ASC',
  NFTS_DISTINCT_COUNT_WALLET_ID_DESC = 'NFTS_DISTINCT_COUNT_WALLET_ID_DESC',
  NFTS_MAX_BALANCE_ASC = 'NFTS_MAX_BALANCE_ASC',
  NFTS_MAX_BALANCE_DESC = 'NFTS_MAX_BALANCE_DESC',
  NFTS_MAX_BLOCK_RANGE_ASC = 'NFTS_MAX_BLOCK_RANGE_ASC',
  NFTS_MAX_BLOCK_RANGE_DESC = 'NFTS_MAX_BLOCK_RANGE_DESC',
  NFTS_MAX_ID_ASC = 'NFTS_MAX_ID_ASC',
  NFTS_MAX_ID_DESC = 'NFTS_MAX_ID_DESC',
  NFTS_MAX_METADATA_ASC = 'NFTS_MAX_METADATA_ASC',
  NFTS_MAX_METADATA_DESC = 'NFTS_MAX_METADATA_DESC',
  NFTS_MAX_NFT_ID_ASC = 'NFTS_MAX_NFT_ID_ASC',
  NFTS_MAX_NFT_ID_DESC = 'NFTS_MAX_NFT_ID_DESC',
  NFTS_MAX_TOKEN_ID_ASC = 'NFTS_MAX_TOKEN_ID_ASC',
  NFTS_MAX_TOKEN_ID_DESC = 'NFTS_MAX_TOKEN_ID_DESC',
  NFTS_MAX_WALLET_ID_ASC = 'NFTS_MAX_WALLET_ID_ASC',
  NFTS_MAX_WALLET_ID_DESC = 'NFTS_MAX_WALLET_ID_DESC',
  NFTS_MIN_BALANCE_ASC = 'NFTS_MIN_BALANCE_ASC',
  NFTS_MIN_BALANCE_DESC = 'NFTS_MIN_BALANCE_DESC',
  NFTS_MIN_BLOCK_RANGE_ASC = 'NFTS_MIN_BLOCK_RANGE_ASC',
  NFTS_MIN_BLOCK_RANGE_DESC = 'NFTS_MIN_BLOCK_RANGE_DESC',
  NFTS_MIN_ID_ASC = 'NFTS_MIN_ID_ASC',
  NFTS_MIN_ID_DESC = 'NFTS_MIN_ID_DESC',
  NFTS_MIN_METADATA_ASC = 'NFTS_MIN_METADATA_ASC',
  NFTS_MIN_METADATA_DESC = 'NFTS_MIN_METADATA_DESC',
  NFTS_MIN_NFT_ID_ASC = 'NFTS_MIN_NFT_ID_ASC',
  NFTS_MIN_NFT_ID_DESC = 'NFTS_MIN_NFT_ID_DESC',
  NFTS_MIN_TOKEN_ID_ASC = 'NFTS_MIN_TOKEN_ID_ASC',
  NFTS_MIN_TOKEN_ID_DESC = 'NFTS_MIN_TOKEN_ID_DESC',
  NFTS_MIN_WALLET_ID_ASC = 'NFTS_MIN_WALLET_ID_ASC',
  NFTS_MIN_WALLET_ID_DESC = 'NFTS_MIN_WALLET_ID_DESC',
  NFTS_STDDEV_POPULATION_BALANCE_ASC = 'NFTS_STDDEV_POPULATION_BALANCE_ASC',
  NFTS_STDDEV_POPULATION_BALANCE_DESC = 'NFTS_STDDEV_POPULATION_BALANCE_DESC',
  NFTS_STDDEV_POPULATION_BLOCK_RANGE_ASC = 'NFTS_STDDEV_POPULATION_BLOCK_RANGE_ASC',
  NFTS_STDDEV_POPULATION_BLOCK_RANGE_DESC = 'NFTS_STDDEV_POPULATION_BLOCK_RANGE_DESC',
  NFTS_STDDEV_POPULATION_ID_ASC = 'NFTS_STDDEV_POPULATION_ID_ASC',
  NFTS_STDDEV_POPULATION_ID_DESC = 'NFTS_STDDEV_POPULATION_ID_DESC',
  NFTS_STDDEV_POPULATION_METADATA_ASC = 'NFTS_STDDEV_POPULATION_METADATA_ASC',
  NFTS_STDDEV_POPULATION_METADATA_DESC = 'NFTS_STDDEV_POPULATION_METADATA_DESC',
  NFTS_STDDEV_POPULATION_NFT_ID_ASC = 'NFTS_STDDEV_POPULATION_NFT_ID_ASC',
  NFTS_STDDEV_POPULATION_NFT_ID_DESC = 'NFTS_STDDEV_POPULATION_NFT_ID_DESC',
  NFTS_STDDEV_POPULATION_TOKEN_ID_ASC = 'NFTS_STDDEV_POPULATION_TOKEN_ID_ASC',
  NFTS_STDDEV_POPULATION_TOKEN_ID_DESC = 'NFTS_STDDEV_POPULATION_TOKEN_ID_DESC',
  NFTS_STDDEV_POPULATION_WALLET_ID_ASC = 'NFTS_STDDEV_POPULATION_WALLET_ID_ASC',
  NFTS_STDDEV_POPULATION_WALLET_ID_DESC = 'NFTS_STDDEV_POPULATION_WALLET_ID_DESC',
  NFTS_STDDEV_SAMPLE_BALANCE_ASC = 'NFTS_STDDEV_SAMPLE_BALANCE_ASC',
  NFTS_STDDEV_SAMPLE_BALANCE_DESC = 'NFTS_STDDEV_SAMPLE_BALANCE_DESC',
  NFTS_STDDEV_SAMPLE_BLOCK_RANGE_ASC = 'NFTS_STDDEV_SAMPLE_BLOCK_RANGE_ASC',
  NFTS_STDDEV_SAMPLE_BLOCK_RANGE_DESC = 'NFTS_STDDEV_SAMPLE_BLOCK_RANGE_DESC',
  NFTS_STDDEV_SAMPLE_ID_ASC = 'NFTS_STDDEV_SAMPLE_ID_ASC',
  NFTS_STDDEV_SAMPLE_ID_DESC = 'NFTS_STDDEV_SAMPLE_ID_DESC',
  NFTS_STDDEV_SAMPLE_METADATA_ASC = 'NFTS_STDDEV_SAMPLE_METADATA_ASC',
  NFTS_STDDEV_SAMPLE_METADATA_DESC = 'NFTS_STDDEV_SAMPLE_METADATA_DESC',
  NFTS_STDDEV_SAMPLE_NFT_ID_ASC = 'NFTS_STDDEV_SAMPLE_NFT_ID_ASC',
  NFTS_STDDEV_SAMPLE_NFT_ID_DESC = 'NFTS_STDDEV_SAMPLE_NFT_ID_DESC',
  NFTS_STDDEV_SAMPLE_TOKEN_ID_ASC = 'NFTS_STDDEV_SAMPLE_TOKEN_ID_ASC',
  NFTS_STDDEV_SAMPLE_TOKEN_ID_DESC = 'NFTS_STDDEV_SAMPLE_TOKEN_ID_DESC',
  NFTS_STDDEV_SAMPLE_WALLET_ID_ASC = 'NFTS_STDDEV_SAMPLE_WALLET_ID_ASC',
  NFTS_STDDEV_SAMPLE_WALLET_ID_DESC = 'NFTS_STDDEV_SAMPLE_WALLET_ID_DESC',
  NFTS_SUM_BALANCE_ASC = 'NFTS_SUM_BALANCE_ASC',
  NFTS_SUM_BALANCE_DESC = 'NFTS_SUM_BALANCE_DESC',
  NFTS_SUM_BLOCK_RANGE_ASC = 'NFTS_SUM_BLOCK_RANGE_ASC',
  NFTS_SUM_BLOCK_RANGE_DESC = 'NFTS_SUM_BLOCK_RANGE_DESC',
  NFTS_SUM_ID_ASC = 'NFTS_SUM_ID_ASC',
  NFTS_SUM_ID_DESC = 'NFTS_SUM_ID_DESC',
  NFTS_SUM_METADATA_ASC = 'NFTS_SUM_METADATA_ASC',
  NFTS_SUM_METADATA_DESC = 'NFTS_SUM_METADATA_DESC',
  NFTS_SUM_NFT_ID_ASC = 'NFTS_SUM_NFT_ID_ASC',
  NFTS_SUM_NFT_ID_DESC = 'NFTS_SUM_NFT_ID_DESC',
  NFTS_SUM_TOKEN_ID_ASC = 'NFTS_SUM_TOKEN_ID_ASC',
  NFTS_SUM_TOKEN_ID_DESC = 'NFTS_SUM_TOKEN_ID_DESC',
  NFTS_SUM_WALLET_ID_ASC = 'NFTS_SUM_WALLET_ID_ASC',
  NFTS_SUM_WALLET_ID_DESC = 'NFTS_SUM_WALLET_ID_DESC',
  NFTS_VARIANCE_POPULATION_BALANCE_ASC = 'NFTS_VARIANCE_POPULATION_BALANCE_ASC',
  NFTS_VARIANCE_POPULATION_BALANCE_DESC = 'NFTS_VARIANCE_POPULATION_BALANCE_DESC',
  NFTS_VARIANCE_POPULATION_BLOCK_RANGE_ASC = 'NFTS_VARIANCE_POPULATION_BLOCK_RANGE_ASC',
  NFTS_VARIANCE_POPULATION_BLOCK_RANGE_DESC = 'NFTS_VARIANCE_POPULATION_BLOCK_RANGE_DESC',
  NFTS_VARIANCE_POPULATION_ID_ASC = 'NFTS_VARIANCE_POPULATION_ID_ASC',
  NFTS_VARIANCE_POPULATION_ID_DESC = 'NFTS_VARIANCE_POPULATION_ID_DESC',
  NFTS_VARIANCE_POPULATION_METADATA_ASC = 'NFTS_VARIANCE_POPULATION_METADATA_ASC',
  NFTS_VARIANCE_POPULATION_METADATA_DESC = 'NFTS_VARIANCE_POPULATION_METADATA_DESC',
  NFTS_VARIANCE_POPULATION_NFT_ID_ASC = 'NFTS_VARIANCE_POPULATION_NFT_ID_ASC',
  NFTS_VARIANCE_POPULATION_NFT_ID_DESC = 'NFTS_VARIANCE_POPULATION_NFT_ID_DESC',
  NFTS_VARIANCE_POPULATION_TOKEN_ID_ASC = 'NFTS_VARIANCE_POPULATION_TOKEN_ID_ASC',
  NFTS_VARIANCE_POPULATION_TOKEN_ID_DESC = 'NFTS_VARIANCE_POPULATION_TOKEN_ID_DESC',
  NFTS_VARIANCE_POPULATION_WALLET_ID_ASC = 'NFTS_VARIANCE_POPULATION_WALLET_ID_ASC',
  NFTS_VARIANCE_POPULATION_WALLET_ID_DESC = 'NFTS_VARIANCE_POPULATION_WALLET_ID_DESC',
  NFTS_VARIANCE_SAMPLE_BALANCE_ASC = 'NFTS_VARIANCE_SAMPLE_BALANCE_ASC',
  NFTS_VARIANCE_SAMPLE_BALANCE_DESC = 'NFTS_VARIANCE_SAMPLE_BALANCE_DESC',
  NFTS_VARIANCE_SAMPLE_BLOCK_RANGE_ASC = 'NFTS_VARIANCE_SAMPLE_BLOCK_RANGE_ASC',
  NFTS_VARIANCE_SAMPLE_BLOCK_RANGE_DESC = 'NFTS_VARIANCE_SAMPLE_BLOCK_RANGE_DESC',
  NFTS_VARIANCE_SAMPLE_ID_ASC = 'NFTS_VARIANCE_SAMPLE_ID_ASC',
  NFTS_VARIANCE_SAMPLE_ID_DESC = 'NFTS_VARIANCE_SAMPLE_ID_DESC',
  NFTS_VARIANCE_SAMPLE_METADATA_ASC = 'NFTS_VARIANCE_SAMPLE_METADATA_ASC',
  NFTS_VARIANCE_SAMPLE_METADATA_DESC = 'NFTS_VARIANCE_SAMPLE_METADATA_DESC',
  NFTS_VARIANCE_SAMPLE_NFT_ID_ASC = 'NFTS_VARIANCE_SAMPLE_NFT_ID_ASC',
  NFTS_VARIANCE_SAMPLE_NFT_ID_DESC = 'NFTS_VARIANCE_SAMPLE_NFT_ID_DESC',
  NFTS_VARIANCE_SAMPLE_TOKEN_ID_ASC = 'NFTS_VARIANCE_SAMPLE_TOKEN_ID_ASC',
  NFTS_VARIANCE_SAMPLE_TOKEN_ID_DESC = 'NFTS_VARIANCE_SAMPLE_TOKEN_ID_DESC',
  NFTS_VARIANCE_SAMPLE_WALLET_ID_ASC = 'NFTS_VARIANCE_SAMPLE_WALLET_ID_ASC',
  NFTS_VARIANCE_SAMPLE_WALLET_ID_DESC = 'NFTS_VARIANCE_SAMPLE_WALLET_ID_DESC',
  PRIMARY_KEY_ASC = 'PRIMARY_KEY_ASC',
  PRIMARY_KEY_DESC = 'PRIMARY_KEY_DESC',
  SYMBOL_ASC = 'SYMBOL_ASC',
  SYMBOL_DESC = 'SYMBOL_DESC',
  TOKEN_BALANCES_AVERAGE_BALANCE_ASC = 'TOKEN_BALANCES_AVERAGE_BALANCE_ASC',
  TOKEN_BALANCES_AVERAGE_BALANCE_DESC = 'TOKEN_BALANCES_AVERAGE_BALANCE_DESC',
  TOKEN_BALANCES_AVERAGE_BLOCK_RANGE_ASC = 'TOKEN_BALANCES_AVERAGE_BLOCK_RANGE_ASC',
  TOKEN_BALANCES_AVERAGE_BLOCK_RANGE_DESC = 'TOKEN_BALANCES_AVERAGE_BLOCK_RANGE_DESC',
  TOKEN_BALANCES_AVERAGE_ID_ASC = 'TOKEN_BALANCES_AVERAGE_ID_ASC',
  TOKEN_BALANCES_AVERAGE_ID_DESC = 'TOKEN_BALANCES_AVERAGE_ID_DESC',
  TOKEN_BALANCES_AVERAGE_TOKEN_ID_ASC = 'TOKEN_BALANCES_AVERAGE_TOKEN_ID_ASC',
  TOKEN_BALANCES_AVERAGE_TOKEN_ID_DESC = 'TOKEN_BALANCES_AVERAGE_TOKEN_ID_DESC',
  TOKEN_BALANCES_AVERAGE_WALLET_ID_ASC = 'TOKEN_BALANCES_AVERAGE_WALLET_ID_ASC',
  TOKEN_BALANCES_AVERAGE_WALLET_ID_DESC = 'TOKEN_BALANCES_AVERAGE_WALLET_ID_DESC',
  TOKEN_BALANCES_COUNT_ASC = 'TOKEN_BALANCES_COUNT_ASC',
  TOKEN_BALANCES_COUNT_DESC = 'TOKEN_BALANCES_COUNT_DESC',
  TOKEN_BALANCES_DISTINCT_COUNT_BALANCE_ASC = 'TOKEN_BALANCES_DISTINCT_COUNT_BALANCE_ASC',
  TOKEN_BALANCES_DISTINCT_COUNT_BALANCE_DESC = 'TOKEN_BALANCES_DISTINCT_COUNT_BALANCE_DESC',
  TOKEN_BALANCES_DISTINCT_COUNT_BLOCK_RANGE_ASC = 'TOKEN_BALANCES_DISTINCT_COUNT_BLOCK_RANGE_ASC',
  TOKEN_BALANCES_DISTINCT_COUNT_BLOCK_RANGE_DESC = 'TOKEN_BALANCES_DISTINCT_COUNT_BLOCK_RANGE_DESC',
  TOKEN_BALANCES_DISTINCT_COUNT_ID_ASC = 'TOKEN_BALANCES_DISTINCT_COUNT_ID_ASC',
  TOKEN_BALANCES_DISTINCT_COUNT_ID_DESC = 'TOKEN_BALANCES_DISTINCT_COUNT_ID_DESC',
  TOKEN_BALANCES_DISTINCT_COUNT_TOKEN_ID_ASC = 'TOKEN_BALANCES_DISTINCT_COUNT_TOKEN_ID_ASC',
  TOKEN_BALANCES_DISTINCT_COUNT_TOKEN_ID_DESC = 'TOKEN_BALANCES_DISTINCT_COUNT_TOKEN_ID_DESC',
  TOKEN_BALANCES_DISTINCT_COUNT_WALLET_ID_ASC = 'TOKEN_BALANCES_DISTINCT_COUNT_WALLET_ID_ASC',
  TOKEN_BALANCES_DISTINCT_COUNT_WALLET_ID_DESC = 'TOKEN_BALANCES_DISTINCT_COUNT_WALLET_ID_DESC',
  TOKEN_BALANCES_MAX_BALANCE_ASC = 'TOKEN_BALANCES_MAX_BALANCE_ASC',
  TOKEN_BALANCES_MAX_BALANCE_DESC = 'TOKEN_BALANCES_MAX_BALANCE_DESC',
  TOKEN_BALANCES_MAX_BLOCK_RANGE_ASC = 'TOKEN_BALANCES_MAX_BLOCK_RANGE_ASC',
  TOKEN_BALANCES_MAX_BLOCK_RANGE_DESC = 'TOKEN_BALANCES_MAX_BLOCK_RANGE_DESC',
  TOKEN_BALANCES_MAX_ID_ASC = 'TOKEN_BALANCES_MAX_ID_ASC',
  TOKEN_BALANCES_MAX_ID_DESC = 'TOKEN_BALANCES_MAX_ID_DESC',
  TOKEN_BALANCES_MAX_TOKEN_ID_ASC = 'TOKEN_BALANCES_MAX_TOKEN_ID_ASC',
  TOKEN_BALANCES_MAX_TOKEN_ID_DESC = 'TOKEN_BALANCES_MAX_TOKEN_ID_DESC',
  TOKEN_BALANCES_MAX_WALLET_ID_ASC = 'TOKEN_BALANCES_MAX_WALLET_ID_ASC',
  TOKEN_BALANCES_MAX_WALLET_ID_DESC = 'TOKEN_BALANCES_MAX_WALLET_ID_DESC',
  TOKEN_BALANCES_MIN_BALANCE_ASC = 'TOKEN_BALANCES_MIN_BALANCE_ASC',
  TOKEN_BALANCES_MIN_BALANCE_DESC = 'TOKEN_BALANCES_MIN_BALANCE_DESC',
  TOKEN_BALANCES_MIN_BLOCK_RANGE_ASC = 'TOKEN_BALANCES_MIN_BLOCK_RANGE_ASC',
  TOKEN_BALANCES_MIN_BLOCK_RANGE_DESC = 'TOKEN_BALANCES_MIN_BLOCK_RANGE_DESC',
  TOKEN_BALANCES_MIN_ID_ASC = 'TOKEN_BALANCES_MIN_ID_ASC',
  TOKEN_BALANCES_MIN_ID_DESC = 'TOKEN_BALANCES_MIN_ID_DESC',
  TOKEN_BALANCES_MIN_TOKEN_ID_ASC = 'TOKEN_BALANCES_MIN_TOKEN_ID_ASC',
  TOKEN_BALANCES_MIN_TOKEN_ID_DESC = 'TOKEN_BALANCES_MIN_TOKEN_ID_DESC',
  TOKEN_BALANCES_MIN_WALLET_ID_ASC = 'TOKEN_BALANCES_MIN_WALLET_ID_ASC',
  TOKEN_BALANCES_MIN_WALLET_ID_DESC = 'TOKEN_BALANCES_MIN_WALLET_ID_DESC',
  TOKEN_BALANCES_STDDEV_POPULATION_BALANCE_ASC = 'TOKEN_BALANCES_STDDEV_POPULATION_BALANCE_ASC',
  TOKEN_BALANCES_STDDEV_POPULATION_BALANCE_DESC = 'TOKEN_BALANCES_STDDEV_POPULATION_BALANCE_DESC',
  TOKEN_BALANCES_STDDEV_POPULATION_BLOCK_RANGE_ASC = 'TOKEN_BALANCES_STDDEV_POPULATION_BLOCK_RANGE_ASC',
  TOKEN_BALANCES_STDDEV_POPULATION_BLOCK_RANGE_DESC = 'TOKEN_BALANCES_STDDEV_POPULATION_BLOCK_RANGE_DESC',
  TOKEN_BALANCES_STDDEV_POPULATION_ID_ASC = 'TOKEN_BALANCES_STDDEV_POPULATION_ID_ASC',
  TOKEN_BALANCES_STDDEV_POPULATION_ID_DESC = 'TOKEN_BALANCES_STDDEV_POPULATION_ID_DESC',
  TOKEN_BALANCES_STDDEV_POPULATION_TOKEN_ID_ASC = 'TOKEN_BALANCES_STDDEV_POPULATION_TOKEN_ID_ASC',
  TOKEN_BALANCES_STDDEV_POPULATION_TOKEN_ID_DESC = 'TOKEN_BALANCES_STDDEV_POPULATION_TOKEN_ID_DESC',
  TOKEN_BALANCES_STDDEV_POPULATION_WALLET_ID_ASC = 'TOKEN_BALANCES_STDDEV_POPULATION_WALLET_ID_ASC',
  TOKEN_BALANCES_STDDEV_POPULATION_WALLET_ID_DESC = 'TOKEN_BALANCES_STDDEV_POPULATION_WALLET_ID_DESC',
  TOKEN_BALANCES_STDDEV_SAMPLE_BALANCE_ASC = 'TOKEN_BALANCES_STDDEV_SAMPLE_BALANCE_ASC',
  TOKEN_BALANCES_STDDEV_SAMPLE_BALANCE_DESC = 'TOKEN_BALANCES_STDDEV_SAMPLE_BALANCE_DESC',
  TOKEN_BALANCES_STDDEV_SAMPLE_BLOCK_RANGE_ASC = 'TOKEN_BALANCES_STDDEV_SAMPLE_BLOCK_RANGE_ASC',
  TOKEN_BALANCES_STDDEV_SAMPLE_BLOCK_RANGE_DESC = 'TOKEN_BALANCES_STDDEV_SAMPLE_BLOCK_RANGE_DESC',
  TOKEN_BALANCES_STDDEV_SAMPLE_ID_ASC = 'TOKEN_BALANCES_STDDEV_SAMPLE_ID_ASC',
  TOKEN_BALANCES_STDDEV_SAMPLE_ID_DESC = 'TOKEN_BALANCES_STDDEV_SAMPLE_ID_DESC',
  TOKEN_BALANCES_STDDEV_SAMPLE_TOKEN_ID_ASC = 'TOKEN_BALANCES_STDDEV_SAMPLE_TOKEN_ID_ASC',
  TOKEN_BALANCES_STDDEV_SAMPLE_TOKEN_ID_DESC = 'TOKEN_BALANCES_STDDEV_SAMPLE_TOKEN_ID_DESC',
  TOKEN_BALANCES_STDDEV_SAMPLE_WALLET_ID_ASC = 'TOKEN_BALANCES_STDDEV_SAMPLE_WALLET_ID_ASC',
  TOKEN_BALANCES_STDDEV_SAMPLE_WALLET_ID_DESC = 'TOKEN_BALANCES_STDDEV_SAMPLE_WALLET_ID_DESC',
  TOKEN_BALANCES_SUM_BALANCE_ASC = 'TOKEN_BALANCES_SUM_BALANCE_ASC',
  TOKEN_BALANCES_SUM_BALANCE_DESC = 'TOKEN_BALANCES_SUM_BALANCE_DESC',
  TOKEN_BALANCES_SUM_BLOCK_RANGE_ASC = 'TOKEN_BALANCES_SUM_BLOCK_RANGE_ASC',
  TOKEN_BALANCES_SUM_BLOCK_RANGE_DESC = 'TOKEN_BALANCES_SUM_BLOCK_RANGE_DESC',
  TOKEN_BALANCES_SUM_ID_ASC = 'TOKEN_BALANCES_SUM_ID_ASC',
  TOKEN_BALANCES_SUM_ID_DESC = 'TOKEN_BALANCES_SUM_ID_DESC',
  TOKEN_BALANCES_SUM_TOKEN_ID_ASC = 'TOKEN_BALANCES_SUM_TOKEN_ID_ASC',
  TOKEN_BALANCES_SUM_TOKEN_ID_DESC = 'TOKEN_BALANCES_SUM_TOKEN_ID_DESC',
  TOKEN_BALANCES_SUM_WALLET_ID_ASC = 'TOKEN_BALANCES_SUM_WALLET_ID_ASC',
  TOKEN_BALANCES_SUM_WALLET_ID_DESC = 'TOKEN_BALANCES_SUM_WALLET_ID_DESC',
  TOKEN_BALANCES_VARIANCE_POPULATION_BALANCE_ASC = 'TOKEN_BALANCES_VARIANCE_POPULATION_BALANCE_ASC',
  TOKEN_BALANCES_VARIANCE_POPULATION_BALANCE_DESC = 'TOKEN_BALANCES_VARIANCE_POPULATION_BALANCE_DESC',
  TOKEN_BALANCES_VARIANCE_POPULATION_BLOCK_RANGE_ASC = 'TOKEN_BALANCES_VARIANCE_POPULATION_BLOCK_RANGE_ASC',
  TOKEN_BALANCES_VARIANCE_POPULATION_BLOCK_RANGE_DESC = 'TOKEN_BALANCES_VARIANCE_POPULATION_BLOCK_RANGE_DESC',
  TOKEN_BALANCES_VARIANCE_POPULATION_ID_ASC = 'TOKEN_BALANCES_VARIANCE_POPULATION_ID_ASC',
  TOKEN_BALANCES_VARIANCE_POPULATION_ID_DESC = 'TOKEN_BALANCES_VARIANCE_POPULATION_ID_DESC',
  TOKEN_BALANCES_VARIANCE_POPULATION_TOKEN_ID_ASC = 'TOKEN_BALANCES_VARIANCE_POPULATION_TOKEN_ID_ASC',
  TOKEN_BALANCES_VARIANCE_POPULATION_TOKEN_ID_DESC = 'TOKEN_BALANCES_VARIANCE_POPULATION_TOKEN_ID_DESC',
  TOKEN_BALANCES_VARIANCE_POPULATION_WALLET_ID_ASC = 'TOKEN_BALANCES_VARIANCE_POPULATION_WALLET_ID_ASC',
  TOKEN_BALANCES_VARIANCE_POPULATION_WALLET_ID_DESC = 'TOKEN_BALANCES_VARIANCE_POPULATION_WALLET_ID_DESC',
  TOKEN_BALANCES_VARIANCE_SAMPLE_BALANCE_ASC = 'TOKEN_BALANCES_VARIANCE_SAMPLE_BALANCE_ASC',
  TOKEN_BALANCES_VARIANCE_SAMPLE_BALANCE_DESC = 'TOKEN_BALANCES_VARIANCE_SAMPLE_BALANCE_DESC',
  TOKEN_BALANCES_VARIANCE_SAMPLE_BLOCK_RANGE_ASC = 'TOKEN_BALANCES_VARIANCE_SAMPLE_BLOCK_RANGE_ASC',
  TOKEN_BALANCES_VARIANCE_SAMPLE_BLOCK_RANGE_DESC = 'TOKEN_BALANCES_VARIANCE_SAMPLE_BLOCK_RANGE_DESC',
  TOKEN_BALANCES_VARIANCE_SAMPLE_ID_ASC = 'TOKEN_BALANCES_VARIANCE_SAMPLE_ID_ASC',
  TOKEN_BALANCES_VARIANCE_SAMPLE_ID_DESC = 'TOKEN_BALANCES_VARIANCE_SAMPLE_ID_DESC',
  TOKEN_BALANCES_VARIANCE_SAMPLE_TOKEN_ID_ASC = 'TOKEN_BALANCES_VARIANCE_SAMPLE_TOKEN_ID_ASC',
  TOKEN_BALANCES_VARIANCE_SAMPLE_TOKEN_ID_DESC = 'TOKEN_BALANCES_VARIANCE_SAMPLE_TOKEN_ID_DESC',
  TOKEN_BALANCES_VARIANCE_SAMPLE_WALLET_ID_ASC = 'TOKEN_BALANCES_VARIANCE_SAMPLE_WALLET_ID_ASC',
  TOKEN_BALANCES_VARIANCE_SAMPLE_WALLET_ID_DESC = 'TOKEN_BALANCES_VARIANCE_SAMPLE_WALLET_ID_DESC',
  TYPE_ASC = 'TYPE_ASC',
  TYPE_DESC = 'TYPE_DESC'
}

export type GqlWallet = GqlNode & {
  balance: Scalars['BigFloat']['output'];
  id: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `Nft`. */
  nfts: GqlNftsConnection;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads and enables pagination through a set of `TokenBalance`. */
  tokenBalances: GqlTokenBalancesConnection;
  /** Reads and enables pagination through a set of `Token`. */
  tokensByNftWalletIdAndTokenId: GqlWalletTokensByNftWalletIdAndTokenIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Token`. */
  tokensByTokenBalanceWalletIdAndTokenId: GqlWalletTokensByTokenBalanceWalletIdAndTokenIdManyToManyConnection;
};


export type GqlWalletnftsArgs = {
  after: InputMaybe<Scalars['Cursor']['input']>;
  before: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqlnfts_distinct_enum>>>;
  filter: InputMaybe<GqlNftFilter>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<GqlNftsOrderBy>>;
  orderByNull: InputMaybe<GqlNullOrder>;
};


export type GqlWallettokenBalancesArgs = {
  after: InputMaybe<Scalars['Cursor']['input']>;
  before: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqltoken_balances_distinct_enum>>>;
  filter: InputMaybe<GqlTokenBalanceFilter>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<GqlTokenBalancesOrderBy>>;
  orderByNull: InputMaybe<GqlNullOrder>;
};


export type GqlWallettokensByNftWalletIdAndTokenIdArgs = {
  after: InputMaybe<Scalars['Cursor']['input']>;
  before: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqltokens_distinct_enum>>>;
  filter: InputMaybe<GqlTokenFilter>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<GqlTokensOrderBy>>;
  orderByNull: InputMaybe<GqlNullOrder>;
};


export type GqlWallettokensByTokenBalanceWalletIdAndTokenIdArgs = {
  after: InputMaybe<Scalars['Cursor']['input']>;
  before: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqltokens_distinct_enum>>>;
  filter: InputMaybe<GqlTokenFilter>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<GqlTokensOrderBy>>;
  orderByNull: InputMaybe<GqlNullOrder>;
};

export type GqlWalletAggregates = {
  /** Mean average aggregates across the matching connection (ignoring before/after/first/last/offset) */
  average: Maybe<GqlWalletAverageAggregates>;
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount: Maybe<GqlWalletDistinctCountAggregates>;
  keys: Maybe<Array<Scalars['String']['output']>>;
  /** Maximum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  max: Maybe<GqlWalletMaxAggregates>;
  /** Minimum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  min: Maybe<GqlWalletMinAggregates>;
  /** Population standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevPopulation: Maybe<GqlWalletStddevPopulationAggregates>;
  /** Sample standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevSample: Maybe<GqlWalletStddevSampleAggregates>;
  /** Sum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  sum: Maybe<GqlWalletSumAggregates>;
  /** Population variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  variancePopulation: Maybe<GqlWalletVariancePopulationAggregates>;
  /** Sample variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  varianceSample: Maybe<GqlWalletVarianceSampleAggregates>;
};

export type GqlWalletAverageAggregates = {
  /** Mean average of balance across the matching connection */
  balance: Maybe<Scalars['BigFloat']['output']>;
};

export type GqlWalletDistinctCountAggregates = {
  /** Distinct count of _blockRange across the matching connection */
  _blockRange: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of _id across the matching connection */
  _id: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of balance across the matching connection */
  balance: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of id across the matching connection */
  id: Maybe<Scalars['BigInt']['output']>;
};

/** A filter to be used against `Wallet` object types. All fields are combined with a logical ‘and.’ */
export type GqlWalletFilter = {
  /** Checks for all expressions in this list. */
  and: InputMaybe<Array<GqlWalletFilter>>;
  /** Filter by the object’s `balance` field. */
  balance: InputMaybe<GqlBigFloatFilter>;
  /** Filter by the object’s `id` field. */
  id: InputMaybe<GqlStringFilter>;
  /** Filter by the object’s `nfts` relation. */
  nfts: InputMaybe<GqlWalletToManyNftFilter>;
  /** Some related `nfts` exist. */
  nftsExist: InputMaybe<Scalars['Boolean']['input']>;
  /** Negates the expression. */
  not: InputMaybe<GqlWalletFilter>;
  /** Checks for any expressions in this list. */
  or: InputMaybe<Array<GqlWalletFilter>>;
  /** Filter by the object’s `tokenBalances` relation. */
  tokenBalances: InputMaybe<GqlWalletToManyTokenBalanceFilter>;
  /** Some related `tokenBalances` exist. */
  tokenBalancesExist: InputMaybe<Scalars['Boolean']['input']>;
};

export type GqlWalletMaxAggregates = {
  /** Maximum of balance across the matching connection */
  balance: Maybe<Scalars['BigFloat']['output']>;
};

export type GqlWalletMinAggregates = {
  /** Minimum of balance across the matching connection */
  balance: Maybe<Scalars['BigFloat']['output']>;
};

export type GqlWalletStddevPopulationAggregates = {
  /** Population standard deviation of balance across the matching connection */
  balance: Maybe<Scalars['BigFloat']['output']>;
};

export type GqlWalletStddevSampleAggregates = {
  /** Sample standard deviation of balance across the matching connection */
  balance: Maybe<Scalars['BigFloat']['output']>;
};

export type GqlWalletSumAggregates = {
  /** Sum of balance across the matching connection */
  balance: Scalars['BigFloat']['output'];
};

/** A filter to be used against many `Nft` object types. All fields are combined with a logical ‘and.’ */
export type GqlWalletToManyNftFilter = {
  /** Aggregates across related `Nft` match the filter criteria. */
  aggregates: InputMaybe<GqlNftAggregatesFilter>;
  /** Every related `Nft` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every: InputMaybe<GqlNftFilter>;
  /** No related `Nft` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none: InputMaybe<GqlNftFilter>;
  /** Some related `Nft` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some: InputMaybe<GqlNftFilter>;
};

/** A filter to be used against many `TokenBalance` object types. All fields are combined with a logical ‘and.’ */
export type GqlWalletToManyTokenBalanceFilter = {
  /** Aggregates across related `TokenBalance` match the filter criteria. */
  aggregates: InputMaybe<GqlTokenBalanceAggregatesFilter>;
  /** Every related `TokenBalance` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every: InputMaybe<GqlTokenBalanceFilter>;
  /** No related `TokenBalance` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none: InputMaybe<GqlTokenBalanceFilter>;
  /** Some related `TokenBalance` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some: InputMaybe<GqlTokenBalanceFilter>;
};

/** A connection to a list of `Token` values, with data from `Nft`. */
export type GqlWalletTokensByNftWalletIdAndTokenIdManyToManyConnection = {
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates: Maybe<GqlTokenAggregates>;
  /** A list of edges which contains the `Token`, info from the `Nft`, and the cursor to aid in pagination. */
  edges: Array<GqlWalletTokensByNftWalletIdAndTokenIdManyToManyEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates: Maybe<Array<GqlTokenAggregates>>;
  /** A list of `Token` objects. */
  nodes: Array<Maybe<GqlToken>>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
  /** The count of *all* `Token` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `Token` values, with data from `Nft`. */
export type GqlWalletTokensByNftWalletIdAndTokenIdManyToManyConnectiongroupedAggregatesArgs = {
  groupBy: Array<GqlTokensGroupBy>;
  having: InputMaybe<GqlTokensHavingInput>;
};

/** A `Token` edge in the connection, with data from `Nft`. */
export type GqlWalletTokensByNftWalletIdAndTokenIdManyToManyEdge = {
  /** A cursor for use in pagination. */
  cursor: Maybe<Scalars['Cursor']['output']>;
  /** Reads and enables pagination through a set of `Nft`. */
  nfts: GqlNftsConnection;
  /** The `Token` at the end of the edge. */
  node: Maybe<GqlToken>;
};


/** A `Token` edge in the connection, with data from `Nft`. */
export type GqlWalletTokensByNftWalletIdAndTokenIdManyToManyEdgenftsArgs = {
  after: InputMaybe<Scalars['Cursor']['input']>;
  before: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqlnfts_distinct_enum>>>;
  filter: InputMaybe<GqlNftFilter>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<GqlNftsOrderBy>>;
  orderByNull: InputMaybe<GqlNullOrder>;
};

/** A connection to a list of `Token` values, with data from `TokenBalance`. */
export type GqlWalletTokensByTokenBalanceWalletIdAndTokenIdManyToManyConnection = {
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates: Maybe<GqlTokenAggregates>;
  /** A list of edges which contains the `Token`, info from the `TokenBalance`, and the cursor to aid in pagination. */
  edges: Array<GqlWalletTokensByTokenBalanceWalletIdAndTokenIdManyToManyEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates: Maybe<Array<GqlTokenAggregates>>;
  /** A list of `Token` objects. */
  nodes: Array<Maybe<GqlToken>>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
  /** The count of *all* `Token` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `Token` values, with data from `TokenBalance`. */
export type GqlWalletTokensByTokenBalanceWalletIdAndTokenIdManyToManyConnectiongroupedAggregatesArgs = {
  groupBy: Array<GqlTokensGroupBy>;
  having: InputMaybe<GqlTokensHavingInput>;
};

/** A `Token` edge in the connection, with data from `TokenBalance`. */
export type GqlWalletTokensByTokenBalanceWalletIdAndTokenIdManyToManyEdge = {
  /** A cursor for use in pagination. */
  cursor: Maybe<Scalars['Cursor']['output']>;
  /** The `Token` at the end of the edge. */
  node: Maybe<GqlToken>;
  /** Reads and enables pagination through a set of `TokenBalance`. */
  tokenBalances: GqlTokenBalancesConnection;
};


/** A `Token` edge in the connection, with data from `TokenBalance`. */
export type GqlWalletTokensByTokenBalanceWalletIdAndTokenIdManyToManyEdgetokenBalancesArgs = {
  after: InputMaybe<Scalars['Cursor']['input']>;
  before: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqltoken_balances_distinct_enum>>>;
  filter: InputMaybe<GqlTokenBalanceFilter>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<GqlTokenBalancesOrderBy>>;
  orderByNull: InputMaybe<GqlNullOrder>;
};

export type GqlWalletVariancePopulationAggregates = {
  /** Population variance of balance across the matching connection */
  balance: Maybe<Scalars['BigFloat']['output']>;
};

export type GqlWalletVarianceSampleAggregates = {
  /** Sample variance of balance across the matching connection */
  balance: Maybe<Scalars['BigFloat']['output']>;
};

/** A connection to a list of `Wallet` values. */
export type GqlWalletsConnection = {
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates: Maybe<GqlWalletAggregates>;
  /** A list of edges which contains the `Wallet` and cursor to aid in pagination. */
  edges: Array<GqlWalletsEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates: Maybe<Array<GqlWalletAggregates>>;
  /** A list of `Wallet` objects. */
  nodes: Array<Maybe<GqlWallet>>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
  /** The count of *all* `Wallet` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `Wallet` values. */
export type GqlWalletsConnectiongroupedAggregatesArgs = {
  groupBy: Array<GqlWalletsGroupBy>;
  having: InputMaybe<GqlWalletsHavingInput>;
};

/** A `Wallet` edge in the connection. */
export type GqlWalletsEdge = {
  /** A cursor for use in pagination. */
  cursor: Maybe<Scalars['Cursor']['output']>;
  /** The `Wallet` at the end of the edge. */
  node: Maybe<GqlWallet>;
};

/** Grouping methods for `Wallet` for usage during aggregation. */
export enum GqlWalletsGroupBy {
  BALANCE = 'BALANCE',
  ID = 'ID'
}

export type GqlWalletsHavingAverageInput = {
  balance: InputMaybe<GqlHavingBigfloatFilter>;
};

export type GqlWalletsHavingDistinctCountInput = {
  balance: InputMaybe<GqlHavingBigfloatFilter>;
};

/** Conditions for `Wallet` aggregates. */
export type GqlWalletsHavingInput = {
  AND: InputMaybe<Array<GqlWalletsHavingInput>>;
  OR: InputMaybe<Array<GqlWalletsHavingInput>>;
  average: InputMaybe<GqlWalletsHavingAverageInput>;
  distinctCount: InputMaybe<GqlWalletsHavingDistinctCountInput>;
  max: InputMaybe<GqlWalletsHavingMaxInput>;
  min: InputMaybe<GqlWalletsHavingMinInput>;
  stddevPopulation: InputMaybe<GqlWalletsHavingStddevPopulationInput>;
  stddevSample: InputMaybe<GqlWalletsHavingStddevSampleInput>;
  sum: InputMaybe<GqlWalletsHavingSumInput>;
  variancePopulation: InputMaybe<GqlWalletsHavingVariancePopulationInput>;
  varianceSample: InputMaybe<GqlWalletsHavingVarianceSampleInput>;
};

export type GqlWalletsHavingMaxInput = {
  balance: InputMaybe<GqlHavingBigfloatFilter>;
};

export type GqlWalletsHavingMinInput = {
  balance: InputMaybe<GqlHavingBigfloatFilter>;
};

export type GqlWalletsHavingStddevPopulationInput = {
  balance: InputMaybe<GqlHavingBigfloatFilter>;
};

export type GqlWalletsHavingStddevSampleInput = {
  balance: InputMaybe<GqlHavingBigfloatFilter>;
};

export type GqlWalletsHavingSumInput = {
  balance: InputMaybe<GqlHavingBigfloatFilter>;
};

export type GqlWalletsHavingVariancePopulationInput = {
  balance: InputMaybe<GqlHavingBigfloatFilter>;
};

export type GqlWalletsHavingVarianceSampleInput = {
  balance: InputMaybe<GqlHavingBigfloatFilter>;
};

/** Methods to use when ordering `Wallet`. */
export enum GqlWalletsOrderBy {
  BALANCE_ASC = 'BALANCE_ASC',
  BALANCE_DESC = 'BALANCE_DESC',
  ID_ASC = 'ID_ASC',
  ID_DESC = 'ID_DESC',
  NATURAL = 'NATURAL',
  NFTS_AVERAGE_BALANCE_ASC = 'NFTS_AVERAGE_BALANCE_ASC',
  NFTS_AVERAGE_BALANCE_DESC = 'NFTS_AVERAGE_BALANCE_DESC',
  NFTS_AVERAGE_BLOCK_RANGE_ASC = 'NFTS_AVERAGE_BLOCK_RANGE_ASC',
  NFTS_AVERAGE_BLOCK_RANGE_DESC = 'NFTS_AVERAGE_BLOCK_RANGE_DESC',
  NFTS_AVERAGE_ID_ASC = 'NFTS_AVERAGE_ID_ASC',
  NFTS_AVERAGE_ID_DESC = 'NFTS_AVERAGE_ID_DESC',
  NFTS_AVERAGE_METADATA_ASC = 'NFTS_AVERAGE_METADATA_ASC',
  NFTS_AVERAGE_METADATA_DESC = 'NFTS_AVERAGE_METADATA_DESC',
  NFTS_AVERAGE_NFT_ID_ASC = 'NFTS_AVERAGE_NFT_ID_ASC',
  NFTS_AVERAGE_NFT_ID_DESC = 'NFTS_AVERAGE_NFT_ID_DESC',
  NFTS_AVERAGE_TOKEN_ID_ASC = 'NFTS_AVERAGE_TOKEN_ID_ASC',
  NFTS_AVERAGE_TOKEN_ID_DESC = 'NFTS_AVERAGE_TOKEN_ID_DESC',
  NFTS_AVERAGE_WALLET_ID_ASC = 'NFTS_AVERAGE_WALLET_ID_ASC',
  NFTS_AVERAGE_WALLET_ID_DESC = 'NFTS_AVERAGE_WALLET_ID_DESC',
  NFTS_COUNT_ASC = 'NFTS_COUNT_ASC',
  NFTS_COUNT_DESC = 'NFTS_COUNT_DESC',
  NFTS_DISTINCT_COUNT_BALANCE_ASC = 'NFTS_DISTINCT_COUNT_BALANCE_ASC',
  NFTS_DISTINCT_COUNT_BALANCE_DESC = 'NFTS_DISTINCT_COUNT_BALANCE_DESC',
  NFTS_DISTINCT_COUNT_BLOCK_RANGE_ASC = 'NFTS_DISTINCT_COUNT_BLOCK_RANGE_ASC',
  NFTS_DISTINCT_COUNT_BLOCK_RANGE_DESC = 'NFTS_DISTINCT_COUNT_BLOCK_RANGE_DESC',
  NFTS_DISTINCT_COUNT_ID_ASC = 'NFTS_DISTINCT_COUNT_ID_ASC',
  NFTS_DISTINCT_COUNT_ID_DESC = 'NFTS_DISTINCT_COUNT_ID_DESC',
  NFTS_DISTINCT_COUNT_METADATA_ASC = 'NFTS_DISTINCT_COUNT_METADATA_ASC',
  NFTS_DISTINCT_COUNT_METADATA_DESC = 'NFTS_DISTINCT_COUNT_METADATA_DESC',
  NFTS_DISTINCT_COUNT_NFT_ID_ASC = 'NFTS_DISTINCT_COUNT_NFT_ID_ASC',
  NFTS_DISTINCT_COUNT_NFT_ID_DESC = 'NFTS_DISTINCT_COUNT_NFT_ID_DESC',
  NFTS_DISTINCT_COUNT_TOKEN_ID_ASC = 'NFTS_DISTINCT_COUNT_TOKEN_ID_ASC',
  NFTS_DISTINCT_COUNT_TOKEN_ID_DESC = 'NFTS_DISTINCT_COUNT_TOKEN_ID_DESC',
  NFTS_DISTINCT_COUNT_WALLET_ID_ASC = 'NFTS_DISTINCT_COUNT_WALLET_ID_ASC',
  NFTS_DISTINCT_COUNT_WALLET_ID_DESC = 'NFTS_DISTINCT_COUNT_WALLET_ID_DESC',
  NFTS_MAX_BALANCE_ASC = 'NFTS_MAX_BALANCE_ASC',
  NFTS_MAX_BALANCE_DESC = 'NFTS_MAX_BALANCE_DESC',
  NFTS_MAX_BLOCK_RANGE_ASC = 'NFTS_MAX_BLOCK_RANGE_ASC',
  NFTS_MAX_BLOCK_RANGE_DESC = 'NFTS_MAX_BLOCK_RANGE_DESC',
  NFTS_MAX_ID_ASC = 'NFTS_MAX_ID_ASC',
  NFTS_MAX_ID_DESC = 'NFTS_MAX_ID_DESC',
  NFTS_MAX_METADATA_ASC = 'NFTS_MAX_METADATA_ASC',
  NFTS_MAX_METADATA_DESC = 'NFTS_MAX_METADATA_DESC',
  NFTS_MAX_NFT_ID_ASC = 'NFTS_MAX_NFT_ID_ASC',
  NFTS_MAX_NFT_ID_DESC = 'NFTS_MAX_NFT_ID_DESC',
  NFTS_MAX_TOKEN_ID_ASC = 'NFTS_MAX_TOKEN_ID_ASC',
  NFTS_MAX_TOKEN_ID_DESC = 'NFTS_MAX_TOKEN_ID_DESC',
  NFTS_MAX_WALLET_ID_ASC = 'NFTS_MAX_WALLET_ID_ASC',
  NFTS_MAX_WALLET_ID_DESC = 'NFTS_MAX_WALLET_ID_DESC',
  NFTS_MIN_BALANCE_ASC = 'NFTS_MIN_BALANCE_ASC',
  NFTS_MIN_BALANCE_DESC = 'NFTS_MIN_BALANCE_DESC',
  NFTS_MIN_BLOCK_RANGE_ASC = 'NFTS_MIN_BLOCK_RANGE_ASC',
  NFTS_MIN_BLOCK_RANGE_DESC = 'NFTS_MIN_BLOCK_RANGE_DESC',
  NFTS_MIN_ID_ASC = 'NFTS_MIN_ID_ASC',
  NFTS_MIN_ID_DESC = 'NFTS_MIN_ID_DESC',
  NFTS_MIN_METADATA_ASC = 'NFTS_MIN_METADATA_ASC',
  NFTS_MIN_METADATA_DESC = 'NFTS_MIN_METADATA_DESC',
  NFTS_MIN_NFT_ID_ASC = 'NFTS_MIN_NFT_ID_ASC',
  NFTS_MIN_NFT_ID_DESC = 'NFTS_MIN_NFT_ID_DESC',
  NFTS_MIN_TOKEN_ID_ASC = 'NFTS_MIN_TOKEN_ID_ASC',
  NFTS_MIN_TOKEN_ID_DESC = 'NFTS_MIN_TOKEN_ID_DESC',
  NFTS_MIN_WALLET_ID_ASC = 'NFTS_MIN_WALLET_ID_ASC',
  NFTS_MIN_WALLET_ID_DESC = 'NFTS_MIN_WALLET_ID_DESC',
  NFTS_STDDEV_POPULATION_BALANCE_ASC = 'NFTS_STDDEV_POPULATION_BALANCE_ASC',
  NFTS_STDDEV_POPULATION_BALANCE_DESC = 'NFTS_STDDEV_POPULATION_BALANCE_DESC',
  NFTS_STDDEV_POPULATION_BLOCK_RANGE_ASC = 'NFTS_STDDEV_POPULATION_BLOCK_RANGE_ASC',
  NFTS_STDDEV_POPULATION_BLOCK_RANGE_DESC = 'NFTS_STDDEV_POPULATION_BLOCK_RANGE_DESC',
  NFTS_STDDEV_POPULATION_ID_ASC = 'NFTS_STDDEV_POPULATION_ID_ASC',
  NFTS_STDDEV_POPULATION_ID_DESC = 'NFTS_STDDEV_POPULATION_ID_DESC',
  NFTS_STDDEV_POPULATION_METADATA_ASC = 'NFTS_STDDEV_POPULATION_METADATA_ASC',
  NFTS_STDDEV_POPULATION_METADATA_DESC = 'NFTS_STDDEV_POPULATION_METADATA_DESC',
  NFTS_STDDEV_POPULATION_NFT_ID_ASC = 'NFTS_STDDEV_POPULATION_NFT_ID_ASC',
  NFTS_STDDEV_POPULATION_NFT_ID_DESC = 'NFTS_STDDEV_POPULATION_NFT_ID_DESC',
  NFTS_STDDEV_POPULATION_TOKEN_ID_ASC = 'NFTS_STDDEV_POPULATION_TOKEN_ID_ASC',
  NFTS_STDDEV_POPULATION_TOKEN_ID_DESC = 'NFTS_STDDEV_POPULATION_TOKEN_ID_DESC',
  NFTS_STDDEV_POPULATION_WALLET_ID_ASC = 'NFTS_STDDEV_POPULATION_WALLET_ID_ASC',
  NFTS_STDDEV_POPULATION_WALLET_ID_DESC = 'NFTS_STDDEV_POPULATION_WALLET_ID_DESC',
  NFTS_STDDEV_SAMPLE_BALANCE_ASC = 'NFTS_STDDEV_SAMPLE_BALANCE_ASC',
  NFTS_STDDEV_SAMPLE_BALANCE_DESC = 'NFTS_STDDEV_SAMPLE_BALANCE_DESC',
  NFTS_STDDEV_SAMPLE_BLOCK_RANGE_ASC = 'NFTS_STDDEV_SAMPLE_BLOCK_RANGE_ASC',
  NFTS_STDDEV_SAMPLE_BLOCK_RANGE_DESC = 'NFTS_STDDEV_SAMPLE_BLOCK_RANGE_DESC',
  NFTS_STDDEV_SAMPLE_ID_ASC = 'NFTS_STDDEV_SAMPLE_ID_ASC',
  NFTS_STDDEV_SAMPLE_ID_DESC = 'NFTS_STDDEV_SAMPLE_ID_DESC',
  NFTS_STDDEV_SAMPLE_METADATA_ASC = 'NFTS_STDDEV_SAMPLE_METADATA_ASC',
  NFTS_STDDEV_SAMPLE_METADATA_DESC = 'NFTS_STDDEV_SAMPLE_METADATA_DESC',
  NFTS_STDDEV_SAMPLE_NFT_ID_ASC = 'NFTS_STDDEV_SAMPLE_NFT_ID_ASC',
  NFTS_STDDEV_SAMPLE_NFT_ID_DESC = 'NFTS_STDDEV_SAMPLE_NFT_ID_DESC',
  NFTS_STDDEV_SAMPLE_TOKEN_ID_ASC = 'NFTS_STDDEV_SAMPLE_TOKEN_ID_ASC',
  NFTS_STDDEV_SAMPLE_TOKEN_ID_DESC = 'NFTS_STDDEV_SAMPLE_TOKEN_ID_DESC',
  NFTS_STDDEV_SAMPLE_WALLET_ID_ASC = 'NFTS_STDDEV_SAMPLE_WALLET_ID_ASC',
  NFTS_STDDEV_SAMPLE_WALLET_ID_DESC = 'NFTS_STDDEV_SAMPLE_WALLET_ID_DESC',
  NFTS_SUM_BALANCE_ASC = 'NFTS_SUM_BALANCE_ASC',
  NFTS_SUM_BALANCE_DESC = 'NFTS_SUM_BALANCE_DESC',
  NFTS_SUM_BLOCK_RANGE_ASC = 'NFTS_SUM_BLOCK_RANGE_ASC',
  NFTS_SUM_BLOCK_RANGE_DESC = 'NFTS_SUM_BLOCK_RANGE_DESC',
  NFTS_SUM_ID_ASC = 'NFTS_SUM_ID_ASC',
  NFTS_SUM_ID_DESC = 'NFTS_SUM_ID_DESC',
  NFTS_SUM_METADATA_ASC = 'NFTS_SUM_METADATA_ASC',
  NFTS_SUM_METADATA_DESC = 'NFTS_SUM_METADATA_DESC',
  NFTS_SUM_NFT_ID_ASC = 'NFTS_SUM_NFT_ID_ASC',
  NFTS_SUM_NFT_ID_DESC = 'NFTS_SUM_NFT_ID_DESC',
  NFTS_SUM_TOKEN_ID_ASC = 'NFTS_SUM_TOKEN_ID_ASC',
  NFTS_SUM_TOKEN_ID_DESC = 'NFTS_SUM_TOKEN_ID_DESC',
  NFTS_SUM_WALLET_ID_ASC = 'NFTS_SUM_WALLET_ID_ASC',
  NFTS_SUM_WALLET_ID_DESC = 'NFTS_SUM_WALLET_ID_DESC',
  NFTS_VARIANCE_POPULATION_BALANCE_ASC = 'NFTS_VARIANCE_POPULATION_BALANCE_ASC',
  NFTS_VARIANCE_POPULATION_BALANCE_DESC = 'NFTS_VARIANCE_POPULATION_BALANCE_DESC',
  NFTS_VARIANCE_POPULATION_BLOCK_RANGE_ASC = 'NFTS_VARIANCE_POPULATION_BLOCK_RANGE_ASC',
  NFTS_VARIANCE_POPULATION_BLOCK_RANGE_DESC = 'NFTS_VARIANCE_POPULATION_BLOCK_RANGE_DESC',
  NFTS_VARIANCE_POPULATION_ID_ASC = 'NFTS_VARIANCE_POPULATION_ID_ASC',
  NFTS_VARIANCE_POPULATION_ID_DESC = 'NFTS_VARIANCE_POPULATION_ID_DESC',
  NFTS_VARIANCE_POPULATION_METADATA_ASC = 'NFTS_VARIANCE_POPULATION_METADATA_ASC',
  NFTS_VARIANCE_POPULATION_METADATA_DESC = 'NFTS_VARIANCE_POPULATION_METADATA_DESC',
  NFTS_VARIANCE_POPULATION_NFT_ID_ASC = 'NFTS_VARIANCE_POPULATION_NFT_ID_ASC',
  NFTS_VARIANCE_POPULATION_NFT_ID_DESC = 'NFTS_VARIANCE_POPULATION_NFT_ID_DESC',
  NFTS_VARIANCE_POPULATION_TOKEN_ID_ASC = 'NFTS_VARIANCE_POPULATION_TOKEN_ID_ASC',
  NFTS_VARIANCE_POPULATION_TOKEN_ID_DESC = 'NFTS_VARIANCE_POPULATION_TOKEN_ID_DESC',
  NFTS_VARIANCE_POPULATION_WALLET_ID_ASC = 'NFTS_VARIANCE_POPULATION_WALLET_ID_ASC',
  NFTS_VARIANCE_POPULATION_WALLET_ID_DESC = 'NFTS_VARIANCE_POPULATION_WALLET_ID_DESC',
  NFTS_VARIANCE_SAMPLE_BALANCE_ASC = 'NFTS_VARIANCE_SAMPLE_BALANCE_ASC',
  NFTS_VARIANCE_SAMPLE_BALANCE_DESC = 'NFTS_VARIANCE_SAMPLE_BALANCE_DESC',
  NFTS_VARIANCE_SAMPLE_BLOCK_RANGE_ASC = 'NFTS_VARIANCE_SAMPLE_BLOCK_RANGE_ASC',
  NFTS_VARIANCE_SAMPLE_BLOCK_RANGE_DESC = 'NFTS_VARIANCE_SAMPLE_BLOCK_RANGE_DESC',
  NFTS_VARIANCE_SAMPLE_ID_ASC = 'NFTS_VARIANCE_SAMPLE_ID_ASC',
  NFTS_VARIANCE_SAMPLE_ID_DESC = 'NFTS_VARIANCE_SAMPLE_ID_DESC',
  NFTS_VARIANCE_SAMPLE_METADATA_ASC = 'NFTS_VARIANCE_SAMPLE_METADATA_ASC',
  NFTS_VARIANCE_SAMPLE_METADATA_DESC = 'NFTS_VARIANCE_SAMPLE_METADATA_DESC',
  NFTS_VARIANCE_SAMPLE_NFT_ID_ASC = 'NFTS_VARIANCE_SAMPLE_NFT_ID_ASC',
  NFTS_VARIANCE_SAMPLE_NFT_ID_DESC = 'NFTS_VARIANCE_SAMPLE_NFT_ID_DESC',
  NFTS_VARIANCE_SAMPLE_TOKEN_ID_ASC = 'NFTS_VARIANCE_SAMPLE_TOKEN_ID_ASC',
  NFTS_VARIANCE_SAMPLE_TOKEN_ID_DESC = 'NFTS_VARIANCE_SAMPLE_TOKEN_ID_DESC',
  NFTS_VARIANCE_SAMPLE_WALLET_ID_ASC = 'NFTS_VARIANCE_SAMPLE_WALLET_ID_ASC',
  NFTS_VARIANCE_SAMPLE_WALLET_ID_DESC = 'NFTS_VARIANCE_SAMPLE_WALLET_ID_DESC',
  PRIMARY_KEY_ASC = 'PRIMARY_KEY_ASC',
  PRIMARY_KEY_DESC = 'PRIMARY_KEY_DESC',
  TOKEN_BALANCES_AVERAGE_BALANCE_ASC = 'TOKEN_BALANCES_AVERAGE_BALANCE_ASC',
  TOKEN_BALANCES_AVERAGE_BALANCE_DESC = 'TOKEN_BALANCES_AVERAGE_BALANCE_DESC',
  TOKEN_BALANCES_AVERAGE_BLOCK_RANGE_ASC = 'TOKEN_BALANCES_AVERAGE_BLOCK_RANGE_ASC',
  TOKEN_BALANCES_AVERAGE_BLOCK_RANGE_DESC = 'TOKEN_BALANCES_AVERAGE_BLOCK_RANGE_DESC',
  TOKEN_BALANCES_AVERAGE_ID_ASC = 'TOKEN_BALANCES_AVERAGE_ID_ASC',
  TOKEN_BALANCES_AVERAGE_ID_DESC = 'TOKEN_BALANCES_AVERAGE_ID_DESC',
  TOKEN_BALANCES_AVERAGE_TOKEN_ID_ASC = 'TOKEN_BALANCES_AVERAGE_TOKEN_ID_ASC',
  TOKEN_BALANCES_AVERAGE_TOKEN_ID_DESC = 'TOKEN_BALANCES_AVERAGE_TOKEN_ID_DESC',
  TOKEN_BALANCES_AVERAGE_WALLET_ID_ASC = 'TOKEN_BALANCES_AVERAGE_WALLET_ID_ASC',
  TOKEN_BALANCES_AVERAGE_WALLET_ID_DESC = 'TOKEN_BALANCES_AVERAGE_WALLET_ID_DESC',
  TOKEN_BALANCES_COUNT_ASC = 'TOKEN_BALANCES_COUNT_ASC',
  TOKEN_BALANCES_COUNT_DESC = 'TOKEN_BALANCES_COUNT_DESC',
  TOKEN_BALANCES_DISTINCT_COUNT_BALANCE_ASC = 'TOKEN_BALANCES_DISTINCT_COUNT_BALANCE_ASC',
  TOKEN_BALANCES_DISTINCT_COUNT_BALANCE_DESC = 'TOKEN_BALANCES_DISTINCT_COUNT_BALANCE_DESC',
  TOKEN_BALANCES_DISTINCT_COUNT_BLOCK_RANGE_ASC = 'TOKEN_BALANCES_DISTINCT_COUNT_BLOCK_RANGE_ASC',
  TOKEN_BALANCES_DISTINCT_COUNT_BLOCK_RANGE_DESC = 'TOKEN_BALANCES_DISTINCT_COUNT_BLOCK_RANGE_DESC',
  TOKEN_BALANCES_DISTINCT_COUNT_ID_ASC = 'TOKEN_BALANCES_DISTINCT_COUNT_ID_ASC',
  TOKEN_BALANCES_DISTINCT_COUNT_ID_DESC = 'TOKEN_BALANCES_DISTINCT_COUNT_ID_DESC',
  TOKEN_BALANCES_DISTINCT_COUNT_TOKEN_ID_ASC = 'TOKEN_BALANCES_DISTINCT_COUNT_TOKEN_ID_ASC',
  TOKEN_BALANCES_DISTINCT_COUNT_TOKEN_ID_DESC = 'TOKEN_BALANCES_DISTINCT_COUNT_TOKEN_ID_DESC',
  TOKEN_BALANCES_DISTINCT_COUNT_WALLET_ID_ASC = 'TOKEN_BALANCES_DISTINCT_COUNT_WALLET_ID_ASC',
  TOKEN_BALANCES_DISTINCT_COUNT_WALLET_ID_DESC = 'TOKEN_BALANCES_DISTINCT_COUNT_WALLET_ID_DESC',
  TOKEN_BALANCES_MAX_BALANCE_ASC = 'TOKEN_BALANCES_MAX_BALANCE_ASC',
  TOKEN_BALANCES_MAX_BALANCE_DESC = 'TOKEN_BALANCES_MAX_BALANCE_DESC',
  TOKEN_BALANCES_MAX_BLOCK_RANGE_ASC = 'TOKEN_BALANCES_MAX_BLOCK_RANGE_ASC',
  TOKEN_BALANCES_MAX_BLOCK_RANGE_DESC = 'TOKEN_BALANCES_MAX_BLOCK_RANGE_DESC',
  TOKEN_BALANCES_MAX_ID_ASC = 'TOKEN_BALANCES_MAX_ID_ASC',
  TOKEN_BALANCES_MAX_ID_DESC = 'TOKEN_BALANCES_MAX_ID_DESC',
  TOKEN_BALANCES_MAX_TOKEN_ID_ASC = 'TOKEN_BALANCES_MAX_TOKEN_ID_ASC',
  TOKEN_BALANCES_MAX_TOKEN_ID_DESC = 'TOKEN_BALANCES_MAX_TOKEN_ID_DESC',
  TOKEN_BALANCES_MAX_WALLET_ID_ASC = 'TOKEN_BALANCES_MAX_WALLET_ID_ASC',
  TOKEN_BALANCES_MAX_WALLET_ID_DESC = 'TOKEN_BALANCES_MAX_WALLET_ID_DESC',
  TOKEN_BALANCES_MIN_BALANCE_ASC = 'TOKEN_BALANCES_MIN_BALANCE_ASC',
  TOKEN_BALANCES_MIN_BALANCE_DESC = 'TOKEN_BALANCES_MIN_BALANCE_DESC',
  TOKEN_BALANCES_MIN_BLOCK_RANGE_ASC = 'TOKEN_BALANCES_MIN_BLOCK_RANGE_ASC',
  TOKEN_BALANCES_MIN_BLOCK_RANGE_DESC = 'TOKEN_BALANCES_MIN_BLOCK_RANGE_DESC',
  TOKEN_BALANCES_MIN_ID_ASC = 'TOKEN_BALANCES_MIN_ID_ASC',
  TOKEN_BALANCES_MIN_ID_DESC = 'TOKEN_BALANCES_MIN_ID_DESC',
  TOKEN_BALANCES_MIN_TOKEN_ID_ASC = 'TOKEN_BALANCES_MIN_TOKEN_ID_ASC',
  TOKEN_BALANCES_MIN_TOKEN_ID_DESC = 'TOKEN_BALANCES_MIN_TOKEN_ID_DESC',
  TOKEN_BALANCES_MIN_WALLET_ID_ASC = 'TOKEN_BALANCES_MIN_WALLET_ID_ASC',
  TOKEN_BALANCES_MIN_WALLET_ID_DESC = 'TOKEN_BALANCES_MIN_WALLET_ID_DESC',
  TOKEN_BALANCES_STDDEV_POPULATION_BALANCE_ASC = 'TOKEN_BALANCES_STDDEV_POPULATION_BALANCE_ASC',
  TOKEN_BALANCES_STDDEV_POPULATION_BALANCE_DESC = 'TOKEN_BALANCES_STDDEV_POPULATION_BALANCE_DESC',
  TOKEN_BALANCES_STDDEV_POPULATION_BLOCK_RANGE_ASC = 'TOKEN_BALANCES_STDDEV_POPULATION_BLOCK_RANGE_ASC',
  TOKEN_BALANCES_STDDEV_POPULATION_BLOCK_RANGE_DESC = 'TOKEN_BALANCES_STDDEV_POPULATION_BLOCK_RANGE_DESC',
  TOKEN_BALANCES_STDDEV_POPULATION_ID_ASC = 'TOKEN_BALANCES_STDDEV_POPULATION_ID_ASC',
  TOKEN_BALANCES_STDDEV_POPULATION_ID_DESC = 'TOKEN_BALANCES_STDDEV_POPULATION_ID_DESC',
  TOKEN_BALANCES_STDDEV_POPULATION_TOKEN_ID_ASC = 'TOKEN_BALANCES_STDDEV_POPULATION_TOKEN_ID_ASC',
  TOKEN_BALANCES_STDDEV_POPULATION_TOKEN_ID_DESC = 'TOKEN_BALANCES_STDDEV_POPULATION_TOKEN_ID_DESC',
  TOKEN_BALANCES_STDDEV_POPULATION_WALLET_ID_ASC = 'TOKEN_BALANCES_STDDEV_POPULATION_WALLET_ID_ASC',
  TOKEN_BALANCES_STDDEV_POPULATION_WALLET_ID_DESC = 'TOKEN_BALANCES_STDDEV_POPULATION_WALLET_ID_DESC',
  TOKEN_BALANCES_STDDEV_SAMPLE_BALANCE_ASC = 'TOKEN_BALANCES_STDDEV_SAMPLE_BALANCE_ASC',
  TOKEN_BALANCES_STDDEV_SAMPLE_BALANCE_DESC = 'TOKEN_BALANCES_STDDEV_SAMPLE_BALANCE_DESC',
  TOKEN_BALANCES_STDDEV_SAMPLE_BLOCK_RANGE_ASC = 'TOKEN_BALANCES_STDDEV_SAMPLE_BLOCK_RANGE_ASC',
  TOKEN_BALANCES_STDDEV_SAMPLE_BLOCK_RANGE_DESC = 'TOKEN_BALANCES_STDDEV_SAMPLE_BLOCK_RANGE_DESC',
  TOKEN_BALANCES_STDDEV_SAMPLE_ID_ASC = 'TOKEN_BALANCES_STDDEV_SAMPLE_ID_ASC',
  TOKEN_BALANCES_STDDEV_SAMPLE_ID_DESC = 'TOKEN_BALANCES_STDDEV_SAMPLE_ID_DESC',
  TOKEN_BALANCES_STDDEV_SAMPLE_TOKEN_ID_ASC = 'TOKEN_BALANCES_STDDEV_SAMPLE_TOKEN_ID_ASC',
  TOKEN_BALANCES_STDDEV_SAMPLE_TOKEN_ID_DESC = 'TOKEN_BALANCES_STDDEV_SAMPLE_TOKEN_ID_DESC',
  TOKEN_BALANCES_STDDEV_SAMPLE_WALLET_ID_ASC = 'TOKEN_BALANCES_STDDEV_SAMPLE_WALLET_ID_ASC',
  TOKEN_BALANCES_STDDEV_SAMPLE_WALLET_ID_DESC = 'TOKEN_BALANCES_STDDEV_SAMPLE_WALLET_ID_DESC',
  TOKEN_BALANCES_SUM_BALANCE_ASC = 'TOKEN_BALANCES_SUM_BALANCE_ASC',
  TOKEN_BALANCES_SUM_BALANCE_DESC = 'TOKEN_BALANCES_SUM_BALANCE_DESC',
  TOKEN_BALANCES_SUM_BLOCK_RANGE_ASC = 'TOKEN_BALANCES_SUM_BLOCK_RANGE_ASC',
  TOKEN_BALANCES_SUM_BLOCK_RANGE_DESC = 'TOKEN_BALANCES_SUM_BLOCK_RANGE_DESC',
  TOKEN_BALANCES_SUM_ID_ASC = 'TOKEN_BALANCES_SUM_ID_ASC',
  TOKEN_BALANCES_SUM_ID_DESC = 'TOKEN_BALANCES_SUM_ID_DESC',
  TOKEN_BALANCES_SUM_TOKEN_ID_ASC = 'TOKEN_BALANCES_SUM_TOKEN_ID_ASC',
  TOKEN_BALANCES_SUM_TOKEN_ID_DESC = 'TOKEN_BALANCES_SUM_TOKEN_ID_DESC',
  TOKEN_BALANCES_SUM_WALLET_ID_ASC = 'TOKEN_BALANCES_SUM_WALLET_ID_ASC',
  TOKEN_BALANCES_SUM_WALLET_ID_DESC = 'TOKEN_BALANCES_SUM_WALLET_ID_DESC',
  TOKEN_BALANCES_VARIANCE_POPULATION_BALANCE_ASC = 'TOKEN_BALANCES_VARIANCE_POPULATION_BALANCE_ASC',
  TOKEN_BALANCES_VARIANCE_POPULATION_BALANCE_DESC = 'TOKEN_BALANCES_VARIANCE_POPULATION_BALANCE_DESC',
  TOKEN_BALANCES_VARIANCE_POPULATION_BLOCK_RANGE_ASC = 'TOKEN_BALANCES_VARIANCE_POPULATION_BLOCK_RANGE_ASC',
  TOKEN_BALANCES_VARIANCE_POPULATION_BLOCK_RANGE_DESC = 'TOKEN_BALANCES_VARIANCE_POPULATION_BLOCK_RANGE_DESC',
  TOKEN_BALANCES_VARIANCE_POPULATION_ID_ASC = 'TOKEN_BALANCES_VARIANCE_POPULATION_ID_ASC',
  TOKEN_BALANCES_VARIANCE_POPULATION_ID_DESC = 'TOKEN_BALANCES_VARIANCE_POPULATION_ID_DESC',
  TOKEN_BALANCES_VARIANCE_POPULATION_TOKEN_ID_ASC = 'TOKEN_BALANCES_VARIANCE_POPULATION_TOKEN_ID_ASC',
  TOKEN_BALANCES_VARIANCE_POPULATION_TOKEN_ID_DESC = 'TOKEN_BALANCES_VARIANCE_POPULATION_TOKEN_ID_DESC',
  TOKEN_BALANCES_VARIANCE_POPULATION_WALLET_ID_ASC = 'TOKEN_BALANCES_VARIANCE_POPULATION_WALLET_ID_ASC',
  TOKEN_BALANCES_VARIANCE_POPULATION_WALLET_ID_DESC = 'TOKEN_BALANCES_VARIANCE_POPULATION_WALLET_ID_DESC',
  TOKEN_BALANCES_VARIANCE_SAMPLE_BALANCE_ASC = 'TOKEN_BALANCES_VARIANCE_SAMPLE_BALANCE_ASC',
  TOKEN_BALANCES_VARIANCE_SAMPLE_BALANCE_DESC = 'TOKEN_BALANCES_VARIANCE_SAMPLE_BALANCE_DESC',
  TOKEN_BALANCES_VARIANCE_SAMPLE_BLOCK_RANGE_ASC = 'TOKEN_BALANCES_VARIANCE_SAMPLE_BLOCK_RANGE_ASC',
  TOKEN_BALANCES_VARIANCE_SAMPLE_BLOCK_RANGE_DESC = 'TOKEN_BALANCES_VARIANCE_SAMPLE_BLOCK_RANGE_DESC',
  TOKEN_BALANCES_VARIANCE_SAMPLE_ID_ASC = 'TOKEN_BALANCES_VARIANCE_SAMPLE_ID_ASC',
  TOKEN_BALANCES_VARIANCE_SAMPLE_ID_DESC = 'TOKEN_BALANCES_VARIANCE_SAMPLE_ID_DESC',
  TOKEN_BALANCES_VARIANCE_SAMPLE_TOKEN_ID_ASC = 'TOKEN_BALANCES_VARIANCE_SAMPLE_TOKEN_ID_ASC',
  TOKEN_BALANCES_VARIANCE_SAMPLE_TOKEN_ID_DESC = 'TOKEN_BALANCES_VARIANCE_SAMPLE_TOKEN_ID_DESC',
  TOKEN_BALANCES_VARIANCE_SAMPLE_WALLET_ID_ASC = 'TOKEN_BALANCES_VARIANCE_SAMPLE_WALLET_ID_ASC',
  TOKEN_BALANCES_VARIANCE_SAMPLE_WALLET_ID_DESC = 'TOKEN_BALANCES_VARIANCE_SAMPLE_WALLET_ID_DESC'
}

export type Gql_Metadata = {
  chain: Maybe<Scalars['String']['output']>;
  dbSize: Maybe<Scalars['BigInt']['output']>;
  deployments: Maybe<Scalars['JSON']['output']>;
  dynamicDatasources: Maybe<Array<Maybe<Scalars['JSON']['output']>>>;
  evmChainId: Maybe<Scalars['String']['output']>;
  genesisHash: Maybe<Scalars['String']['output']>;
  indexerHealthy: Maybe<Scalars['Boolean']['output']>;
  indexerNodeVersion: Maybe<Scalars['String']['output']>;
  lastCreatedPoiHeight: Maybe<Scalars['Int']['output']>;
  lastFinalizedVerifiedHeight: Maybe<Scalars['Int']['output']>;
  lastProcessedHeight: Maybe<Scalars['Int']['output']>;
  lastProcessedTimestamp: Maybe<Scalars['Date']['output']>;
  latestSyncedPoiHeight: Maybe<Scalars['Int']['output']>;
  queryNodeVersion: Maybe<Scalars['String']['output']>;
  rowCountEstimate: Maybe<Array<Maybe<GqlTableEstimate>>>;
  specName: Maybe<Scalars['String']['output']>;
  startHeight: Maybe<Scalars['Int']['output']>;
  targetHeight: Maybe<Scalars['Int']['output']>;
  unfinalizedBlocks: Maybe<Scalars['String']['output']>;
};

export type Gql_Metadatas = {
  nodes: Array<Maybe<Gql_Metadata>>;
  totalCount: Scalars['Int']['output'];
};

export enum Gqlnfts_distinct_enum {
  BALANCE = 'BALANCE',
  ID = 'ID',
  METADATA = 'METADATA',
  NFT_ID = 'NFT_ID',
  TOKEN_ID = 'TOKEN_ID',
  WALLET_ID = 'WALLET_ID'
}

export enum Gqltoken_balances_distinct_enum {
  BALANCE = 'BALANCE',
  ID = 'ID',
  TOKEN_ID = 'TOKEN_ID',
  WALLET_ID = 'WALLET_ID'
}

export enum Gqltokens_distinct_enum {
  DECIMALS = 'DECIMALS',
  ICON_URL = 'ICON_URL',
  ID = 'ID',
  NAME = 'NAME',
  SYMBOL = 'SYMBOL',
  TYPE = 'TYPE'
}

export enum Gqlwallets_distinct_enum {
  BALANCE = 'BALANCE',
  ID = 'ID'
}

export type GqlKeybanClient_walletBalanceQueryVariables = Exact<{
  address: Scalars['String']['input'];
}>;


export type GqlKeybanClient_walletBalanceQuery = {
  wallet: {
    id: string,
    balance: string
  } | null
};

export type GqlKeybanClient_walletSubscriptionSubscriptionVariables = Exact<{
  address: Scalars['ID']['input'];
}>;


export type GqlKeybanClient_walletSubscriptionSubscription = {
  wallets: {
    id: string,
    _entity: any | null
  } | null
};

export type GqlKeybanClient_TokenFragment = {
  id: string,
  type: string | null,
  name: string | null,
  symbol: string | null,
  decimals: number | null,
  iconUrl: string | null
};

export type GqlKeybanClient_TokenBalanceFragment = {
  id: string,
  balance: string,
  token: {
    id: string,
    type: string | null,
    name: string | null,
    symbol: string | null,
    decimals: number | null,
    iconUrl: string | null
  } | null
};

export type GqlKeybanClient_walletTokenBalancesQueryVariables = Exact<{
  address: Scalars['String']['input'];
}>;


export type GqlKeybanClient_walletTokenBalancesQuery = {
  tokenBalances: {
    nodes: Array<{
      id: string,
      balance: string,
      token: {
        id: string,
        type: string | null,
        name: string | null,
        symbol: string | null,
        decimals: number | null,
        iconUrl: string | null
      } | null
    } | null>
  } | null
};

export type GqlKeybanClient_NftFragment = {
  id: string,
  nftId: string,
  balance: string,
  metadata: any,
  token: {
    id: string,
    type: string | null,
    name: string | null,
    symbol: string | null,
    decimals: number | null,
    iconUrl: string | null
  } | null
};

export type GqlKeybanClient_walletNftsQueryVariables = Exact<{
  address: Scalars['String']['input'];
}>;


export type GqlKeybanClient_walletNftsQuery = {
  nfts: {
    nodes: Array<{
      id: string,
      nftId: string,
      balance: string,
      metadata: any,
      token: {
        id: string,
        type: string | null,
        name: string | null,
        symbol: string | null,
        decimals: number | null,
        iconUrl: string | null
      } | null
    } | null>
  } | null
};

export type GqlKeybanClient_walletNftQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GqlKeybanClient_walletNftQuery = {
  nft: {
    id: string,
    nftId: string,
    balance: string,
    metadata: any,
    token: {
      id: string,
      type: string | null,
      name: string | null,
      symbol: string | null,
      decimals: number | null,
      iconUrl: string | null
    } | null
  } | null
};

export const KeybanClient_TokenFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"KeybanClient_Token"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Token"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"iconUrl"}}]}}]} as unknown as DocumentNode<GqlKeybanClient_TokenFragment, unknown>;
export const KeybanClient_TokenBalanceFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"KeybanClient_TokenBalance"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TokenBalance"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"KeybanClient_Token"}}]}},{"kind":"Field","name":{"kind":"Name","value":"balance"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"KeybanClient_Token"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Token"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"iconUrl"}}]}}]} as unknown as DocumentNode<GqlKeybanClient_TokenBalanceFragment, unknown>;
export const KeybanClient_NftFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"KeybanClient_Nft"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Nft"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"KeybanClient_Token"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nftId"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"KeybanClient_Token"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Token"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"iconUrl"}}]}}]} as unknown as DocumentNode<GqlKeybanClient_NftFragment, unknown>;
export const KeybanClient_walletBalanceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"KeybanClient_walletBalance"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"wallet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}}]}}]}}]} as unknown as DocumentNode<GqlKeybanClient_walletBalanceQuery, GqlKeybanClient_walletBalanceQueryVariables>;
export const KeybanClient_walletSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"KeybanClient_walletSubscription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"wallets"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"ListValue","values":[{"kind":"Variable","name":{"kind":"Name","value":"address"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"_entity"}}]}}]}}]} as unknown as DocumentNode<GqlKeybanClient_walletSubscriptionSubscription, GqlKeybanClient_walletSubscriptionSubscriptionVariables>;
export const KeybanClient_walletTokenBalancesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"KeybanClient_walletTokenBalances"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tokenBalances"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"wallet"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"equalTo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"KeybanClient_TokenBalance"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"KeybanClient_Token"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Token"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"iconUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"KeybanClient_TokenBalance"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TokenBalance"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"KeybanClient_Token"}}]}},{"kind":"Field","name":{"kind":"Name","value":"balance"}}]}}]} as unknown as DocumentNode<GqlKeybanClient_walletTokenBalancesQuery, GqlKeybanClient_walletTokenBalancesQueryVariables>;
export const KeybanClient_walletNftsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"KeybanClient_walletNfts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nfts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"wallet"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"equalTo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"KeybanClient_Nft"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"KeybanClient_Token"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Token"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"iconUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"KeybanClient_Nft"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Nft"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"KeybanClient_Token"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nftId"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"}}]}}]} as unknown as DocumentNode<GqlKeybanClient_walletNftsQuery, GqlKeybanClient_walletNftsQueryVariables>;
export const KeybanClient_walletNftDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"KeybanClient_walletNft"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nft"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"KeybanClient_Nft"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"KeybanClient_Token"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Token"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"iconUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"KeybanClient_Nft"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Nft"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"KeybanClient_Token"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nftId"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"}}]}}]} as unknown as DocumentNode<GqlKeybanClient_walletNftQuery, GqlKeybanClient_walletNftQueryVariables>;


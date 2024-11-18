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
  Datetime: { input: string; output: string; }
  JSON: { input: any; output: any; }
};

export type GqlAssetTransfer = GqlNode & {
  /** Reads a single `Wallet` that is related to this `AssetTransfer`. */
  from: Maybe<GqlWallet>;
  fromId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  /** Reads a single `Nft` that is related to this `AssetTransfer`. */
  nft: Maybe<GqlNft>;
  nftId: Maybe<Scalars['String']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads a single `Wallet` that is related to this `AssetTransfer`. */
  to: Maybe<GqlWallet>;
  toId: Maybe<Scalars['String']['output']>;
  /** Reads a single `TokenContract` that is related to this `AssetTransfer`. */
  token: Maybe<GqlTokenContract>;
  tokenId: Maybe<Scalars['String']['output']>;
  /** Reads a single `Transaction` that is related to this `AssetTransfer`. */
  transaction: Maybe<GqlTransaction>;
  transactionBlockNumber: Scalars['BigFloat']['output'];
  transactionId: Scalars['String']['output'];
  type: Scalars['String']['output'];
  value: Scalars['BigFloat']['output'];
};

export type GqlAssetTransferAggregates = {
  /** Mean average aggregates across the matching connection (ignoring before/after/first/last/offset) */
  average: Maybe<GqlAssetTransferAverageAggregates>;
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount: Maybe<GqlAssetTransferDistinctCountAggregates>;
  keys: Maybe<Array<Scalars['String']['output']>>;
  /** Maximum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  max: Maybe<GqlAssetTransferMaxAggregates>;
  /** Minimum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  min: Maybe<GqlAssetTransferMinAggregates>;
  /** Population standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevPopulation: Maybe<GqlAssetTransferStddevPopulationAggregates>;
  /** Sample standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevSample: Maybe<GqlAssetTransferStddevSampleAggregates>;
  /** Sum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  sum: Maybe<GqlAssetTransferSumAggregates>;
  /** Population variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  variancePopulation: Maybe<GqlAssetTransferVariancePopulationAggregates>;
  /** Sample variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  varianceSample: Maybe<GqlAssetTransferVarianceSampleAggregates>;
};

/** A filter to be used against aggregates of `AssetTransfer` object types. */
export type GqlAssetTransferAggregatesFilter = {
  /** Mean average aggregate over matching `AssetTransfer` objects. */
  average?: InputMaybe<GqlAssetTransferAverageAggregateFilter>;
  /** Distinct count aggregate over matching `AssetTransfer` objects. */
  distinctCount?: InputMaybe<GqlAssetTransferDistinctCountAggregateFilter>;
  /** A filter that must pass for the relevant `AssetTransfer` object to be included within the aggregate. */
  filter?: InputMaybe<GqlAssetTransferFilter>;
  /** Maximum aggregate over matching `AssetTransfer` objects. */
  max?: InputMaybe<GqlAssetTransferMaxAggregateFilter>;
  /** Minimum aggregate over matching `AssetTransfer` objects. */
  min?: InputMaybe<GqlAssetTransferMinAggregateFilter>;
  /** Population standard deviation aggregate over matching `AssetTransfer` objects. */
  stddevPopulation?: InputMaybe<GqlAssetTransferStddevPopulationAggregateFilter>;
  /** Sample standard deviation aggregate over matching `AssetTransfer` objects. */
  stddevSample?: InputMaybe<GqlAssetTransferStddevSampleAggregateFilter>;
  /** Sum aggregate over matching `AssetTransfer` objects. */
  sum?: InputMaybe<GqlAssetTransferSumAggregateFilter>;
  /** Population variance aggregate over matching `AssetTransfer` objects. */
  variancePopulation?: InputMaybe<GqlAssetTransferVariancePopulationAggregateFilter>;
  /** Sample variance aggregate over matching `AssetTransfer` objects. */
  varianceSample?: InputMaybe<GqlAssetTransferVarianceSampleAggregateFilter>;
};

export type GqlAssetTransferAverageAggregateFilter = {
  transactionBlockNumber?: InputMaybe<GqlBigFloatFilter>;
  value?: InputMaybe<GqlBigFloatFilter>;
};

export type GqlAssetTransferAverageAggregates = {
  /** Mean average of transactionBlockNumber across the matching connection */
  transactionBlockNumber: Maybe<Scalars['BigFloat']['output']>;
  /** Mean average of value across the matching connection */
  value: Maybe<Scalars['BigFloat']['output']>;
};

export type GqlAssetTransferDistinctCountAggregateFilter = {
  _blockRange?: InputMaybe<GqlBigIntFilter>;
  _id?: InputMaybe<GqlBigIntFilter>;
  fromId?: InputMaybe<GqlBigIntFilter>;
  id?: InputMaybe<GqlBigIntFilter>;
  nftId?: InputMaybe<GqlBigIntFilter>;
  toId?: InputMaybe<GqlBigIntFilter>;
  tokenId?: InputMaybe<GqlBigIntFilter>;
  transactionBlockNumber?: InputMaybe<GqlBigIntFilter>;
  transactionId?: InputMaybe<GqlBigIntFilter>;
  type?: InputMaybe<GqlBigIntFilter>;
  value?: InputMaybe<GqlBigIntFilter>;
};

export type GqlAssetTransferDistinctCountAggregates = {
  /** Distinct count of _blockRange across the matching connection */
  _blockRange: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of _id across the matching connection */
  _id: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of fromId across the matching connection */
  fromId: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of id across the matching connection */
  id: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of nftId across the matching connection */
  nftId: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of toId across the matching connection */
  toId: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of tokenId across the matching connection */
  tokenId: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of transactionBlockNumber across the matching connection */
  transactionBlockNumber: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of transactionId across the matching connection */
  transactionId: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of type across the matching connection */
  type: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of value across the matching connection */
  value: Maybe<Scalars['BigInt']['output']>;
};

/** A filter to be used against `AssetTransfer` object types. All fields are combined with a logical ‘and.’ */
export type GqlAssetTransferFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<GqlAssetTransferFilter>>;
  /** Filter by the object’s `from` relation. */
  from?: InputMaybe<GqlWalletFilter>;
  /** Filter by the object’s `fromId` field. */
  fromId?: InputMaybe<GqlStringFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<GqlStringFilter>;
  /** Filter by the object’s `nft` relation. */
  nft?: InputMaybe<GqlNftFilter>;
  /** A related `nft` exists. */
  nftExists?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `nftId` field. */
  nftId?: InputMaybe<GqlStringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<GqlAssetTransferFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<GqlAssetTransferFilter>>;
  /** Filter by the object’s `to` relation. */
  to?: InputMaybe<GqlWalletFilter>;
  /** A related `to` exists. */
  toExists?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `toId` field. */
  toId?: InputMaybe<GqlStringFilter>;
  /** Filter by the object’s `token` relation. */
  token?: InputMaybe<GqlTokenContractFilter>;
  /** A related `token` exists. */
  tokenExists?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `tokenId` field. */
  tokenId?: InputMaybe<GqlStringFilter>;
  /** Filter by the object’s `transaction` relation. */
  transaction?: InputMaybe<GqlTransactionFilter>;
  /** Filter by the object’s `transactionBlockNumber` field. */
  transactionBlockNumber?: InputMaybe<GqlBigFloatFilter>;
  /** Filter by the object’s `transactionId` field. */
  transactionId?: InputMaybe<GqlStringFilter>;
  /** Filter by the object’s `type` field. */
  type?: InputMaybe<GqlStringFilter>;
  /** Filter by the object’s `value` field. */
  value?: InputMaybe<GqlBigFloatFilter>;
};

export type GqlAssetTransferMaxAggregateFilter = {
  transactionBlockNumber?: InputMaybe<GqlBigFloatFilter>;
  value?: InputMaybe<GqlBigFloatFilter>;
};

export type GqlAssetTransferMaxAggregates = {
  /** Maximum of transactionBlockNumber across the matching connection */
  transactionBlockNumber: Maybe<Scalars['BigFloat']['output']>;
  /** Maximum of value across the matching connection */
  value: Maybe<Scalars['BigFloat']['output']>;
};

export type GqlAssetTransferMinAggregateFilter = {
  transactionBlockNumber?: InputMaybe<GqlBigFloatFilter>;
  value?: InputMaybe<GqlBigFloatFilter>;
};

export type GqlAssetTransferMinAggregates = {
  /** Minimum of transactionBlockNumber across the matching connection */
  transactionBlockNumber: Maybe<Scalars['BigFloat']['output']>;
  /** Minimum of value across the matching connection */
  value: Maybe<Scalars['BigFloat']['output']>;
};

export type GqlAssetTransferStddevPopulationAggregateFilter = {
  transactionBlockNumber?: InputMaybe<GqlBigFloatFilter>;
  value?: InputMaybe<GqlBigFloatFilter>;
};

export type GqlAssetTransferStddevPopulationAggregates = {
  /** Population standard deviation of transactionBlockNumber across the matching connection */
  transactionBlockNumber: Maybe<Scalars['BigFloat']['output']>;
  /** Population standard deviation of value across the matching connection */
  value: Maybe<Scalars['BigFloat']['output']>;
};

export type GqlAssetTransferStddevSampleAggregateFilter = {
  transactionBlockNumber?: InputMaybe<GqlBigFloatFilter>;
  value?: InputMaybe<GqlBigFloatFilter>;
};

export type GqlAssetTransferStddevSampleAggregates = {
  /** Sample standard deviation of transactionBlockNumber across the matching connection */
  transactionBlockNumber: Maybe<Scalars['BigFloat']['output']>;
  /** Sample standard deviation of value across the matching connection */
  value: Maybe<Scalars['BigFloat']['output']>;
};

export type GqlAssetTransferSumAggregateFilter = {
  transactionBlockNumber?: InputMaybe<GqlBigFloatFilter>;
  value?: InputMaybe<GqlBigFloatFilter>;
};

export type GqlAssetTransferSumAggregates = {
  /** Sum of transactionBlockNumber across the matching connection */
  transactionBlockNumber: Scalars['BigFloat']['output'];
  /** Sum of value across the matching connection */
  value: Scalars['BigFloat']['output'];
};

export type GqlAssetTransferVariancePopulationAggregateFilter = {
  transactionBlockNumber?: InputMaybe<GqlBigFloatFilter>;
  value?: InputMaybe<GqlBigFloatFilter>;
};

export type GqlAssetTransferVariancePopulationAggregates = {
  /** Population variance of transactionBlockNumber across the matching connection */
  transactionBlockNumber: Maybe<Scalars['BigFloat']['output']>;
  /** Population variance of value across the matching connection */
  value: Maybe<Scalars['BigFloat']['output']>;
};

export type GqlAssetTransferVarianceSampleAggregateFilter = {
  transactionBlockNumber?: InputMaybe<GqlBigFloatFilter>;
  value?: InputMaybe<GqlBigFloatFilter>;
};

export type GqlAssetTransferVarianceSampleAggregates = {
  /** Sample variance of transactionBlockNumber across the matching connection */
  transactionBlockNumber: Maybe<Scalars['BigFloat']['output']>;
  /** Sample variance of value across the matching connection */
  value: Maybe<Scalars['BigFloat']['output']>;
};

/** A connection to a list of `AssetTransfer` values. */
export type GqlAssetTransfersConnection = {
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates: Maybe<GqlAssetTransferAggregates>;
  /** A list of edges which contains the `AssetTransfer` and cursor to aid in pagination. */
  edges: Array<GqlAssetTransfersEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates: Maybe<Array<GqlAssetTransferAggregates>>;
  /** A list of `AssetTransfer` objects. */
  nodes: Array<Maybe<GqlAssetTransfer>>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
  /** The count of *all* `AssetTransfer` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `AssetTransfer` values. */
export type GqlAssetTransfersConnectiongroupedAggregatesArgs = {
  groupBy: Array<GqlAssetTransfersGroupBy>;
  having?: InputMaybe<GqlAssetTransfersHavingInput>;
};

/** A `AssetTransfer` edge in the connection. */
export type GqlAssetTransfersEdge = {
  /** A cursor for use in pagination. */
  cursor: Maybe<Scalars['Cursor']['output']>;
  /** The `AssetTransfer` at the end of the edge. */
  node: Maybe<GqlAssetTransfer>;
};

/** Grouping methods for `AssetTransfer` for usage during aggregation. */
export enum GqlAssetTransfersGroupBy {
  FROM_ID = 'FROM_ID',
  ID = 'ID',
  NFT_ID = 'NFT_ID',
  TOKEN_ID = 'TOKEN_ID',
  TO_ID = 'TO_ID',
  TRANSACTION_BLOCK_NUMBER = 'TRANSACTION_BLOCK_NUMBER',
  TRANSACTION_ID = 'TRANSACTION_ID',
  TYPE = 'TYPE',
  VALUE = 'VALUE'
}

export type GqlAssetTransfersHavingAverageInput = {
  transactionBlockNumber?: InputMaybe<GqlHavingBigfloatFilter>;
  value?: InputMaybe<GqlHavingBigfloatFilter>;
};

export type GqlAssetTransfersHavingDistinctCountInput = {
  transactionBlockNumber?: InputMaybe<GqlHavingBigfloatFilter>;
  value?: InputMaybe<GqlHavingBigfloatFilter>;
};

/** Conditions for `AssetTransfer` aggregates. */
export type GqlAssetTransfersHavingInput = {
  AND?: InputMaybe<Array<GqlAssetTransfersHavingInput>>;
  OR?: InputMaybe<Array<GqlAssetTransfersHavingInput>>;
  average?: InputMaybe<GqlAssetTransfersHavingAverageInput>;
  distinctCount?: InputMaybe<GqlAssetTransfersHavingDistinctCountInput>;
  max?: InputMaybe<GqlAssetTransfersHavingMaxInput>;
  min?: InputMaybe<GqlAssetTransfersHavingMinInput>;
  stddevPopulation?: InputMaybe<GqlAssetTransfersHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<GqlAssetTransfersHavingStddevSampleInput>;
  sum?: InputMaybe<GqlAssetTransfersHavingSumInput>;
  variancePopulation?: InputMaybe<GqlAssetTransfersHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<GqlAssetTransfersHavingVarianceSampleInput>;
};

export type GqlAssetTransfersHavingMaxInput = {
  transactionBlockNumber?: InputMaybe<GqlHavingBigfloatFilter>;
  value?: InputMaybe<GqlHavingBigfloatFilter>;
};

export type GqlAssetTransfersHavingMinInput = {
  transactionBlockNumber?: InputMaybe<GqlHavingBigfloatFilter>;
  value?: InputMaybe<GqlHavingBigfloatFilter>;
};

export type GqlAssetTransfersHavingStddevPopulationInput = {
  transactionBlockNumber?: InputMaybe<GqlHavingBigfloatFilter>;
  value?: InputMaybe<GqlHavingBigfloatFilter>;
};

export type GqlAssetTransfersHavingStddevSampleInput = {
  transactionBlockNumber?: InputMaybe<GqlHavingBigfloatFilter>;
  value?: InputMaybe<GqlHavingBigfloatFilter>;
};

export type GqlAssetTransfersHavingSumInput = {
  transactionBlockNumber?: InputMaybe<GqlHavingBigfloatFilter>;
  value?: InputMaybe<GqlHavingBigfloatFilter>;
};

export type GqlAssetTransfersHavingVariancePopulationInput = {
  transactionBlockNumber?: InputMaybe<GqlHavingBigfloatFilter>;
  value?: InputMaybe<GqlHavingBigfloatFilter>;
};

export type GqlAssetTransfersHavingVarianceSampleInput = {
  transactionBlockNumber?: InputMaybe<GqlHavingBigfloatFilter>;
  value?: InputMaybe<GqlHavingBigfloatFilter>;
};

/** Methods to use when ordering `AssetTransfer`. */
export enum GqlAssetTransfersOrderBy {
  FROM_ID_ASC = 'FROM_ID_ASC',
  FROM_ID_DESC = 'FROM_ID_DESC',
  ID_ASC = 'ID_ASC',
  ID_DESC = 'ID_DESC',
  NATURAL = 'NATURAL',
  NFT_ID_ASC = 'NFT_ID_ASC',
  NFT_ID_DESC = 'NFT_ID_DESC',
  PRIMARY_KEY_ASC = 'PRIMARY_KEY_ASC',
  PRIMARY_KEY_DESC = 'PRIMARY_KEY_DESC',
  TOKEN_ID_ASC = 'TOKEN_ID_ASC',
  TOKEN_ID_DESC = 'TOKEN_ID_DESC',
  TO_ID_ASC = 'TO_ID_ASC',
  TO_ID_DESC = 'TO_ID_DESC',
  TRANSACTION_BLOCK_NUMBER_ASC = 'TRANSACTION_BLOCK_NUMBER_ASC',
  TRANSACTION_BLOCK_NUMBER_DESC = 'TRANSACTION_BLOCK_NUMBER_DESC',
  TRANSACTION_ID_ASC = 'TRANSACTION_ID_ASC',
  TRANSACTION_ID_DESC = 'TRANSACTION_ID_DESC',
  TYPE_ASC = 'TYPE_ASC',
  TYPE_DESC = 'TYPE_DESC',
  VALUE_ASC = 'VALUE_ASC',
  VALUE_DESC = 'VALUE_DESC'
}

/** A filter to be used against BigFloat fields. All fields are combined with a logical ‘and.’ */
export type GqlBigFloatFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
};

/** A filter to be used against BigInt fields. All fields are combined with a logical ‘and.’ */
export type GqlBigIntFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['BigInt']['input']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['BigInt']['input']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['BigInt']['input']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['BigInt']['input']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['BigInt']['input']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['BigInt']['input']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['BigInt']['input']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['BigInt']['input']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

/** A filter to be used against Boolean fields. All fields are combined with a logical ‘and.’ */
export type GqlBooleanFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['Boolean']['input']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['Boolean']['input']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['Boolean']['input']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Boolean']['input']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Boolean']['input']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['Boolean']['input']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['Boolean']['input']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

/** A filter to be used against Datetime fields. All fields are combined with a logical ‘and.’ */
export type GqlDatetimeFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['Datetime']['input']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['Datetime']['input']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['Datetime']['input']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Datetime']['input']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['Datetime']['input']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['Datetime']['input']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Datetime']['input']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['Datetime']['input']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['Datetime']['input']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['Datetime']['input']>>;
};

export type GqlHavingBigfloatFilter = {
  equalTo?: InputMaybe<Scalars['BigFloat']['input']>;
  greaterThan?: InputMaybe<Scalars['BigFloat']['input']>;
  greaterThanOrEqualTo?: InputMaybe<Scalars['BigFloat']['input']>;
  lessThan?: InputMaybe<Scalars['BigFloat']['input']>;
  lessThanOrEqualTo?: InputMaybe<Scalars['BigFloat']['input']>;
  notEqualTo?: InputMaybe<Scalars['BigFloat']['input']>;
};

export type GqlHavingDatetimeFilter = {
  equalTo?: InputMaybe<Scalars['Datetime']['input']>;
  greaterThan?: InputMaybe<Scalars['Datetime']['input']>;
  greaterThanOrEqualTo?: InputMaybe<Scalars['Datetime']['input']>;
  lessThan?: InputMaybe<Scalars['Datetime']['input']>;
  lessThanOrEqualTo?: InputMaybe<Scalars['Datetime']['input']>;
  notEqualTo?: InputMaybe<Scalars['Datetime']['input']>;
};

export type GqlHavingIntFilter = {
  equalTo?: InputMaybe<Scalars['Int']['input']>;
  greaterThan?: InputMaybe<Scalars['Int']['input']>;
  greaterThanOrEqualTo?: InputMaybe<Scalars['Int']['input']>;
  lessThan?: InputMaybe<Scalars['Int']['input']>;
  lessThanOrEqualTo?: InputMaybe<Scalars['Int']['input']>;
  notEqualTo?: InputMaybe<Scalars['Int']['input']>;
};

/** A filter to be used against Int fields. All fields are combined with a logical ‘and.’ */
export type GqlIntFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['Int']['input']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['Int']['input']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['Int']['input']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Int']['input']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['Int']['input']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Int']['input']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['Int']['input']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['Int']['input']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

/** A filter to be used against JSON fields. All fields are combined with a logical ‘and.’ */
export type GqlJSONFilter = {
  /** Contained by the specified JSON. */
  containedBy?: InputMaybe<Scalars['JSON']['input']>;
  /** Contains the specified JSON. */
  contains?: InputMaybe<Scalars['JSON']['input']>;
  /** Contains all of the specified keys. */
  containsAllKeys?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Contains any of the specified keys. */
  containsAnyKeys?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Contains the specified key. */
  containsKey?: InputMaybe<Scalars['String']['input']>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['JSON']['input']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['JSON']['input']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['JSON']['input']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['JSON']['input']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['JSON']['input']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['JSON']['input']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['JSON']['input']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['JSON']['input']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['JSON']['input']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['JSON']['input']>>;
};

export enum GqlMutationType {
  DELETE = 'DELETE',
  INSERT = 'INSERT',
  UPDATE = 'UPDATE'
}

export type GqlNft = GqlNode & {
  /** Reads and enables pagination through a set of `AssetTransfer`. */
  assetTransfers: GqlAssetTransfersConnection;
  /** Reads a single `TokenContract` that is related to this `Nft`. */
  collection: Maybe<GqlTokenContract>;
  collectionId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  metadata: Scalars['JSON']['output'];
  /** Reads and enables pagination through a set of `NftBalance`. */
  nftBalances: GqlNftBalancesConnection;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads and enables pagination through a set of `TokenContract`. */
  tokenContractsByAssetTransferNftIdAndTokenId: GqlNftTokenContractsByAssetTransferNftIdAndTokenIdManyToManyConnection;
  tokenId: Scalars['BigFloat']['output'];
  /** Reads and enables pagination through a set of `Transaction`. */
  transactionsByAssetTransferNftIdAndTransactionId: GqlNftTransactionsByAssetTransferNftIdAndTransactionIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Wallet`. */
  walletsByAssetTransferNftIdAndFromId: GqlNftWalletsByAssetTransferNftIdAndFromIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Wallet`. */
  walletsByAssetTransferNftIdAndToId: GqlNftWalletsByAssetTransferNftIdAndToIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Wallet`. */
  walletsByNftBalanceNftIdAndWalletId: GqlNftWalletsByNftBalanceNftIdAndWalletIdManyToManyConnection;
};


export type GqlNftassetTransfersArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqlasset_transfers_distinct_enum>>>;
  filter?: InputMaybe<GqlAssetTransferFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlAssetTransfersOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
};


export type GqlNftnftBalancesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqlnft_balances_distinct_enum>>>;
  filter?: InputMaybe<GqlNftBalanceFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlNftBalancesOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
};


export type GqlNfttokenContractsByAssetTransferNftIdAndTokenIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqltoken_contracts_distinct_enum>>>;
  filter?: InputMaybe<GqlTokenContractFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlTokenContractsOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
};


export type GqlNfttransactionsByAssetTransferNftIdAndTransactionIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqltransactions_distinct_enum>>>;
  filter?: InputMaybe<GqlTransactionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlTransactionsOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
};


export type GqlNftwalletsByAssetTransferNftIdAndFromIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqlwallets_distinct_enum>>>;
  filter?: InputMaybe<GqlWalletFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlWalletsOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
};


export type GqlNftwalletsByAssetTransferNftIdAndToIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqlwallets_distinct_enum>>>;
  filter?: InputMaybe<GqlWalletFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlWalletsOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
};


export type GqlNftwalletsByNftBalanceNftIdAndWalletIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqlwallets_distinct_enum>>>;
  filter?: InputMaybe<GqlWalletFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlWalletsOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
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
  average?: InputMaybe<GqlNftAverageAggregateFilter>;
  /** Distinct count aggregate over matching `Nft` objects. */
  distinctCount?: InputMaybe<GqlNftDistinctCountAggregateFilter>;
  /** A filter that must pass for the relevant `Nft` object to be included within the aggregate. */
  filter?: InputMaybe<GqlNftFilter>;
  /** Maximum aggregate over matching `Nft` objects. */
  max?: InputMaybe<GqlNftMaxAggregateFilter>;
  /** Minimum aggregate over matching `Nft` objects. */
  min?: InputMaybe<GqlNftMinAggregateFilter>;
  /** Population standard deviation aggregate over matching `Nft` objects. */
  stddevPopulation?: InputMaybe<GqlNftStddevPopulationAggregateFilter>;
  /** Sample standard deviation aggregate over matching `Nft` objects. */
  stddevSample?: InputMaybe<GqlNftStddevSampleAggregateFilter>;
  /** Sum aggregate over matching `Nft` objects. */
  sum?: InputMaybe<GqlNftSumAggregateFilter>;
  /** Population variance aggregate over matching `Nft` objects. */
  variancePopulation?: InputMaybe<GqlNftVariancePopulationAggregateFilter>;
  /** Sample variance aggregate over matching `Nft` objects. */
  varianceSample?: InputMaybe<GqlNftVarianceSampleAggregateFilter>;
};

export type GqlNftAverageAggregateFilter = {
  tokenId?: InputMaybe<GqlBigFloatFilter>;
};

export type GqlNftAverageAggregates = {
  /** Mean average of tokenId across the matching connection */
  tokenId: Maybe<Scalars['BigFloat']['output']>;
};

export type GqlNftBalance = GqlNode & {
  balance: Scalars['BigFloat']['output'];
  id: Scalars['String']['output'];
  /** Reads a single `Nft` that is related to this `NftBalance`. */
  nft: Maybe<GqlNft>;
  nftId: Scalars['String']['output'];
  nftTokenId: Scalars['BigFloat']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads a single `Wallet` that is related to this `NftBalance`. */
  wallet: Maybe<GqlWallet>;
  walletId: Scalars['String']['output'];
};

export type GqlNftBalanceAggregates = {
  /** Mean average aggregates across the matching connection (ignoring before/after/first/last/offset) */
  average: Maybe<GqlNftBalanceAverageAggregates>;
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount: Maybe<GqlNftBalanceDistinctCountAggregates>;
  keys: Maybe<Array<Scalars['String']['output']>>;
  /** Maximum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  max: Maybe<GqlNftBalanceMaxAggregates>;
  /** Minimum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  min: Maybe<GqlNftBalanceMinAggregates>;
  /** Population standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevPopulation: Maybe<GqlNftBalanceStddevPopulationAggregates>;
  /** Sample standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevSample: Maybe<GqlNftBalanceStddevSampleAggregates>;
  /** Sum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  sum: Maybe<GqlNftBalanceSumAggregates>;
  /** Population variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  variancePopulation: Maybe<GqlNftBalanceVariancePopulationAggregates>;
  /** Sample variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  varianceSample: Maybe<GqlNftBalanceVarianceSampleAggregates>;
};

/** A filter to be used against aggregates of `NftBalance` object types. */
export type GqlNftBalanceAggregatesFilter = {
  /** Mean average aggregate over matching `NftBalance` objects. */
  average?: InputMaybe<GqlNftBalanceAverageAggregateFilter>;
  /** Distinct count aggregate over matching `NftBalance` objects. */
  distinctCount?: InputMaybe<GqlNftBalanceDistinctCountAggregateFilter>;
  /** A filter that must pass for the relevant `NftBalance` object to be included within the aggregate. */
  filter?: InputMaybe<GqlNftBalanceFilter>;
  /** Maximum aggregate over matching `NftBalance` objects. */
  max?: InputMaybe<GqlNftBalanceMaxAggregateFilter>;
  /** Minimum aggregate over matching `NftBalance` objects. */
  min?: InputMaybe<GqlNftBalanceMinAggregateFilter>;
  /** Population standard deviation aggregate over matching `NftBalance` objects. */
  stddevPopulation?: InputMaybe<GqlNftBalanceStddevPopulationAggregateFilter>;
  /** Sample standard deviation aggregate over matching `NftBalance` objects. */
  stddevSample?: InputMaybe<GqlNftBalanceStddevSampleAggregateFilter>;
  /** Sum aggregate over matching `NftBalance` objects. */
  sum?: InputMaybe<GqlNftBalanceSumAggregateFilter>;
  /** Population variance aggregate over matching `NftBalance` objects. */
  variancePopulation?: InputMaybe<GqlNftBalanceVariancePopulationAggregateFilter>;
  /** Sample variance aggregate over matching `NftBalance` objects. */
  varianceSample?: InputMaybe<GqlNftBalanceVarianceSampleAggregateFilter>;
};

export type GqlNftBalanceAverageAggregateFilter = {
  balance?: InputMaybe<GqlBigFloatFilter>;
  nftTokenId?: InputMaybe<GqlBigFloatFilter>;
};

export type GqlNftBalanceAverageAggregates = {
  /** Mean average of balance across the matching connection */
  balance: Maybe<Scalars['BigFloat']['output']>;
  /** Mean average of nftTokenId across the matching connection */
  nftTokenId: Maybe<Scalars['BigFloat']['output']>;
};

export type GqlNftBalanceDistinctCountAggregateFilter = {
  _blockRange?: InputMaybe<GqlBigIntFilter>;
  _id?: InputMaybe<GqlBigIntFilter>;
  balance?: InputMaybe<GqlBigIntFilter>;
  id?: InputMaybe<GqlBigIntFilter>;
  nftId?: InputMaybe<GqlBigIntFilter>;
  nftTokenId?: InputMaybe<GqlBigIntFilter>;
  walletId?: InputMaybe<GqlBigIntFilter>;
};

export type GqlNftBalanceDistinctCountAggregates = {
  /** Distinct count of _blockRange across the matching connection */
  _blockRange: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of _id across the matching connection */
  _id: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of balance across the matching connection */
  balance: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of id across the matching connection */
  id: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of nftId across the matching connection */
  nftId: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of nftTokenId across the matching connection */
  nftTokenId: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of walletId across the matching connection */
  walletId: Maybe<Scalars['BigInt']['output']>;
};

/** A filter to be used against `NftBalance` object types. All fields are combined with a logical ‘and.’ */
export type GqlNftBalanceFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<GqlNftBalanceFilter>>;
  /** Filter by the object’s `balance` field. */
  balance?: InputMaybe<GqlBigFloatFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<GqlStringFilter>;
  /** Filter by the object’s `nft` relation. */
  nft?: InputMaybe<GqlNftFilter>;
  /** Filter by the object’s `nftId` field. */
  nftId?: InputMaybe<GqlStringFilter>;
  /** Filter by the object’s `nftTokenId` field. */
  nftTokenId?: InputMaybe<GqlBigFloatFilter>;
  /** Negates the expression. */
  not?: InputMaybe<GqlNftBalanceFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<GqlNftBalanceFilter>>;
  /** Filter by the object’s `wallet` relation. */
  wallet?: InputMaybe<GqlWalletFilter>;
  /** Filter by the object’s `walletId` field. */
  walletId?: InputMaybe<GqlStringFilter>;
};

export type GqlNftBalanceMaxAggregateFilter = {
  balance?: InputMaybe<GqlBigFloatFilter>;
  nftTokenId?: InputMaybe<GqlBigFloatFilter>;
};

export type GqlNftBalanceMaxAggregates = {
  /** Maximum of balance across the matching connection */
  balance: Maybe<Scalars['BigFloat']['output']>;
  /** Maximum of nftTokenId across the matching connection */
  nftTokenId: Maybe<Scalars['BigFloat']['output']>;
};

export type GqlNftBalanceMinAggregateFilter = {
  balance?: InputMaybe<GqlBigFloatFilter>;
  nftTokenId?: InputMaybe<GqlBigFloatFilter>;
};

export type GqlNftBalanceMinAggregates = {
  /** Minimum of balance across the matching connection */
  balance: Maybe<Scalars['BigFloat']['output']>;
  /** Minimum of nftTokenId across the matching connection */
  nftTokenId: Maybe<Scalars['BigFloat']['output']>;
};

export type GqlNftBalanceStddevPopulationAggregateFilter = {
  balance?: InputMaybe<GqlBigFloatFilter>;
  nftTokenId?: InputMaybe<GqlBigFloatFilter>;
};

export type GqlNftBalanceStddevPopulationAggregates = {
  /** Population standard deviation of balance across the matching connection */
  balance: Maybe<Scalars['BigFloat']['output']>;
  /** Population standard deviation of nftTokenId across the matching connection */
  nftTokenId: Maybe<Scalars['BigFloat']['output']>;
};

export type GqlNftBalanceStddevSampleAggregateFilter = {
  balance?: InputMaybe<GqlBigFloatFilter>;
  nftTokenId?: InputMaybe<GqlBigFloatFilter>;
};

export type GqlNftBalanceStddevSampleAggregates = {
  /** Sample standard deviation of balance across the matching connection */
  balance: Maybe<Scalars['BigFloat']['output']>;
  /** Sample standard deviation of nftTokenId across the matching connection */
  nftTokenId: Maybe<Scalars['BigFloat']['output']>;
};

export type GqlNftBalanceSumAggregateFilter = {
  balance?: InputMaybe<GqlBigFloatFilter>;
  nftTokenId?: InputMaybe<GqlBigFloatFilter>;
};

export type GqlNftBalanceSumAggregates = {
  /** Sum of balance across the matching connection */
  balance: Scalars['BigFloat']['output'];
  /** Sum of nftTokenId across the matching connection */
  nftTokenId: Scalars['BigFloat']['output'];
};

export type GqlNftBalanceVariancePopulationAggregateFilter = {
  balance?: InputMaybe<GqlBigFloatFilter>;
  nftTokenId?: InputMaybe<GqlBigFloatFilter>;
};

export type GqlNftBalanceVariancePopulationAggregates = {
  /** Population variance of balance across the matching connection */
  balance: Maybe<Scalars['BigFloat']['output']>;
  /** Population variance of nftTokenId across the matching connection */
  nftTokenId: Maybe<Scalars['BigFloat']['output']>;
};

export type GqlNftBalanceVarianceSampleAggregateFilter = {
  balance?: InputMaybe<GqlBigFloatFilter>;
  nftTokenId?: InputMaybe<GqlBigFloatFilter>;
};

export type GqlNftBalanceVarianceSampleAggregates = {
  /** Sample variance of balance across the matching connection */
  balance: Maybe<Scalars['BigFloat']['output']>;
  /** Sample variance of nftTokenId across the matching connection */
  nftTokenId: Maybe<Scalars['BigFloat']['output']>;
};

/** A connection to a list of `NftBalance` values. */
export type GqlNftBalancesConnection = {
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates: Maybe<GqlNftBalanceAggregates>;
  /** A list of edges which contains the `NftBalance` and cursor to aid in pagination. */
  edges: Array<GqlNftBalancesEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates: Maybe<Array<GqlNftBalanceAggregates>>;
  /** A list of `NftBalance` objects. */
  nodes: Array<Maybe<GqlNftBalance>>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
  /** The count of *all* `NftBalance` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `NftBalance` values. */
export type GqlNftBalancesConnectiongroupedAggregatesArgs = {
  groupBy: Array<GqlNftBalancesGroupBy>;
  having?: InputMaybe<GqlNftBalancesHavingInput>;
};

/** A `NftBalance` edge in the connection. */
export type GqlNftBalancesEdge = {
  /** A cursor for use in pagination. */
  cursor: Maybe<Scalars['Cursor']['output']>;
  /** The `NftBalance` at the end of the edge. */
  node: Maybe<GqlNftBalance>;
};

/** Grouping methods for `NftBalance` for usage during aggregation. */
export enum GqlNftBalancesGroupBy {
  BALANCE = 'BALANCE',
  ID = 'ID',
  NFT_ID = 'NFT_ID',
  NFT_TOKEN_ID = 'NFT_TOKEN_ID',
  WALLET_ID = 'WALLET_ID'
}

export type GqlNftBalancesHavingAverageInput = {
  balance?: InputMaybe<GqlHavingBigfloatFilter>;
  nftTokenId?: InputMaybe<GqlHavingBigfloatFilter>;
};

export type GqlNftBalancesHavingDistinctCountInput = {
  balance?: InputMaybe<GqlHavingBigfloatFilter>;
  nftTokenId?: InputMaybe<GqlHavingBigfloatFilter>;
};

/** Conditions for `NftBalance` aggregates. */
export type GqlNftBalancesHavingInput = {
  AND?: InputMaybe<Array<GqlNftBalancesHavingInput>>;
  OR?: InputMaybe<Array<GqlNftBalancesHavingInput>>;
  average?: InputMaybe<GqlNftBalancesHavingAverageInput>;
  distinctCount?: InputMaybe<GqlNftBalancesHavingDistinctCountInput>;
  max?: InputMaybe<GqlNftBalancesHavingMaxInput>;
  min?: InputMaybe<GqlNftBalancesHavingMinInput>;
  stddevPopulation?: InputMaybe<GqlNftBalancesHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<GqlNftBalancesHavingStddevSampleInput>;
  sum?: InputMaybe<GqlNftBalancesHavingSumInput>;
  variancePopulation?: InputMaybe<GqlNftBalancesHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<GqlNftBalancesHavingVarianceSampleInput>;
};

export type GqlNftBalancesHavingMaxInput = {
  balance?: InputMaybe<GqlHavingBigfloatFilter>;
  nftTokenId?: InputMaybe<GqlHavingBigfloatFilter>;
};

export type GqlNftBalancesHavingMinInput = {
  balance?: InputMaybe<GqlHavingBigfloatFilter>;
  nftTokenId?: InputMaybe<GqlHavingBigfloatFilter>;
};

export type GqlNftBalancesHavingStddevPopulationInput = {
  balance?: InputMaybe<GqlHavingBigfloatFilter>;
  nftTokenId?: InputMaybe<GqlHavingBigfloatFilter>;
};

export type GqlNftBalancesHavingStddevSampleInput = {
  balance?: InputMaybe<GqlHavingBigfloatFilter>;
  nftTokenId?: InputMaybe<GqlHavingBigfloatFilter>;
};

export type GqlNftBalancesHavingSumInput = {
  balance?: InputMaybe<GqlHavingBigfloatFilter>;
  nftTokenId?: InputMaybe<GqlHavingBigfloatFilter>;
};

export type GqlNftBalancesHavingVariancePopulationInput = {
  balance?: InputMaybe<GqlHavingBigfloatFilter>;
  nftTokenId?: InputMaybe<GqlHavingBigfloatFilter>;
};

export type GqlNftBalancesHavingVarianceSampleInput = {
  balance?: InputMaybe<GqlHavingBigfloatFilter>;
  nftTokenId?: InputMaybe<GqlHavingBigfloatFilter>;
};

/** Methods to use when ordering `NftBalance`. */
export enum GqlNftBalancesOrderBy {
  BALANCE_ASC = 'BALANCE_ASC',
  BALANCE_DESC = 'BALANCE_DESC',
  ID_ASC = 'ID_ASC',
  ID_DESC = 'ID_DESC',
  NATURAL = 'NATURAL',
  NFT_ID_ASC = 'NFT_ID_ASC',
  NFT_ID_DESC = 'NFT_ID_DESC',
  NFT_TOKEN_ID_ASC = 'NFT_TOKEN_ID_ASC',
  NFT_TOKEN_ID_DESC = 'NFT_TOKEN_ID_DESC',
  PRIMARY_KEY_ASC = 'PRIMARY_KEY_ASC',
  PRIMARY_KEY_DESC = 'PRIMARY_KEY_DESC',
  WALLET_ID_ASC = 'WALLET_ID_ASC',
  WALLET_ID_DESC = 'WALLET_ID_DESC'
}

export type GqlNftDistinctCountAggregateFilter = {
  _blockRange?: InputMaybe<GqlBigIntFilter>;
  _id?: InputMaybe<GqlBigIntFilter>;
  collectionId?: InputMaybe<GqlBigIntFilter>;
  id?: InputMaybe<GqlBigIntFilter>;
  metadata?: InputMaybe<GqlBigIntFilter>;
  tokenId?: InputMaybe<GqlBigIntFilter>;
};

export type GqlNftDistinctCountAggregates = {
  /** Distinct count of _blockRange across the matching connection */
  _blockRange: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of _id across the matching connection */
  _id: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of collectionId across the matching connection */
  collectionId: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of id across the matching connection */
  id: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of metadata across the matching connection */
  metadata: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of tokenId across the matching connection */
  tokenId: Maybe<Scalars['BigInt']['output']>;
};

/** A filter to be used against `Nft` object types. All fields are combined with a logical ‘and.’ */
export type GqlNftFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<GqlNftFilter>>;
  /** Filter by the object’s `assetTransfers` relation. */
  assetTransfers?: InputMaybe<GqlNftToManyAssetTransferFilter>;
  /** Some related `assetTransfers` exist. */
  assetTransfersExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `collection` relation. */
  collection?: InputMaybe<GqlTokenContractFilter>;
  /** Filter by the object’s `collectionId` field. */
  collectionId?: InputMaybe<GqlStringFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<GqlStringFilter>;
  /** Filter by the object’s `metadata` field. */
  metadata?: InputMaybe<GqlJSONFilter>;
  /** Filter by the object’s `nftBalances` relation. */
  nftBalances?: InputMaybe<GqlNftToManyNftBalanceFilter>;
  /** Some related `nftBalances` exist. */
  nftBalancesExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Negates the expression. */
  not?: InputMaybe<GqlNftFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<GqlNftFilter>>;
  /** Filter by the object’s `tokenId` field. */
  tokenId?: InputMaybe<GqlBigFloatFilter>;
};

export type GqlNftMaxAggregateFilter = {
  tokenId?: InputMaybe<GqlBigFloatFilter>;
};

export type GqlNftMaxAggregates = {
  /** Maximum of tokenId across the matching connection */
  tokenId: Maybe<Scalars['BigFloat']['output']>;
};

export type GqlNftMinAggregateFilter = {
  tokenId?: InputMaybe<GqlBigFloatFilter>;
};

export type GqlNftMinAggregates = {
  /** Minimum of tokenId across the matching connection */
  tokenId: Maybe<Scalars['BigFloat']['output']>;
};

export type GqlNftStddevPopulationAggregateFilter = {
  tokenId?: InputMaybe<GqlBigFloatFilter>;
};

export type GqlNftStddevPopulationAggregates = {
  /** Population standard deviation of tokenId across the matching connection */
  tokenId: Maybe<Scalars['BigFloat']['output']>;
};

export type GqlNftStddevSampleAggregateFilter = {
  tokenId?: InputMaybe<GqlBigFloatFilter>;
};

export type GqlNftStddevSampleAggregates = {
  /** Sample standard deviation of tokenId across the matching connection */
  tokenId: Maybe<Scalars['BigFloat']['output']>;
};

export type GqlNftSumAggregateFilter = {
  tokenId?: InputMaybe<GqlBigFloatFilter>;
};

export type GqlNftSumAggregates = {
  /** Sum of tokenId across the matching connection */
  tokenId: Scalars['BigFloat']['output'];
};

/** A filter to be used against many `AssetTransfer` object types. All fields are combined with a logical ‘and.’ */
export type GqlNftToManyAssetTransferFilter = {
  /** Aggregates across related `AssetTransfer` match the filter criteria. */
  aggregates?: InputMaybe<GqlAssetTransferAggregatesFilter>;
  /** Every related `AssetTransfer` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<GqlAssetTransferFilter>;
  /** No related `AssetTransfer` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<GqlAssetTransferFilter>;
  /** Some related `AssetTransfer` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<GqlAssetTransferFilter>;
};

/** A filter to be used against many `NftBalance` object types. All fields are combined with a logical ‘and.’ */
export type GqlNftToManyNftBalanceFilter = {
  /** Aggregates across related `NftBalance` match the filter criteria. */
  aggregates?: InputMaybe<GqlNftBalanceAggregatesFilter>;
  /** Every related `NftBalance` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<GqlNftBalanceFilter>;
  /** No related `NftBalance` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<GqlNftBalanceFilter>;
  /** Some related `NftBalance` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<GqlNftBalanceFilter>;
};

/** A connection to a list of `TokenContract` values, with data from `AssetTransfer`. */
export type GqlNftTokenContractsByAssetTransferNftIdAndTokenIdManyToManyConnection = {
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates: Maybe<GqlTokenContractAggregates>;
  /** A list of edges which contains the `TokenContract`, info from the `AssetTransfer`, and the cursor to aid in pagination. */
  edges: Array<GqlNftTokenContractsByAssetTransferNftIdAndTokenIdManyToManyEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates: Maybe<Array<GqlTokenContractAggregates>>;
  /** A list of `TokenContract` objects. */
  nodes: Array<Maybe<GqlTokenContract>>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
  /** The count of *all* `TokenContract` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `TokenContract` values, with data from `AssetTransfer`. */
export type GqlNftTokenContractsByAssetTransferNftIdAndTokenIdManyToManyConnectiongroupedAggregatesArgs = {
  groupBy: Array<GqlTokenContractsGroupBy>;
  having?: InputMaybe<GqlTokenContractsHavingInput>;
};

/** A `TokenContract` edge in the connection, with data from `AssetTransfer`. */
export type GqlNftTokenContractsByAssetTransferNftIdAndTokenIdManyToManyEdge = {
  /** Reads and enables pagination through a set of `AssetTransfer`. */
  assetTransfersByTokenId: GqlAssetTransfersConnection;
  /** A cursor for use in pagination. */
  cursor: Maybe<Scalars['Cursor']['output']>;
  /** The `TokenContract` at the end of the edge. */
  node: Maybe<GqlTokenContract>;
};


/** A `TokenContract` edge in the connection, with data from `AssetTransfer`. */
export type GqlNftTokenContractsByAssetTransferNftIdAndTokenIdManyToManyEdgeassetTransfersByTokenIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqlasset_transfers_distinct_enum>>>;
  filter?: InputMaybe<GqlAssetTransferFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlAssetTransfersOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
};

/** A connection to a list of `Transaction` values, with data from `AssetTransfer`. */
export type GqlNftTransactionsByAssetTransferNftIdAndTransactionIdManyToManyConnection = {
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates: Maybe<GqlTransactionAggregates>;
  /** A list of edges which contains the `Transaction`, info from the `AssetTransfer`, and the cursor to aid in pagination. */
  edges: Array<GqlNftTransactionsByAssetTransferNftIdAndTransactionIdManyToManyEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates: Maybe<Array<GqlTransactionAggregates>>;
  /** A list of `Transaction` objects. */
  nodes: Array<Maybe<GqlTransaction>>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
  /** The count of *all* `Transaction` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `Transaction` values, with data from `AssetTransfer`. */
export type GqlNftTransactionsByAssetTransferNftIdAndTransactionIdManyToManyConnectiongroupedAggregatesArgs = {
  groupBy: Array<GqlTransactionsGroupBy>;
  having?: InputMaybe<GqlTransactionsHavingInput>;
};

/** A `Transaction` edge in the connection, with data from `AssetTransfer`. */
export type GqlNftTransactionsByAssetTransferNftIdAndTransactionIdManyToManyEdge = {
  /** Reads and enables pagination through a set of `AssetTransfer`. */
  assetTransfers: GqlAssetTransfersConnection;
  /** A cursor for use in pagination. */
  cursor: Maybe<Scalars['Cursor']['output']>;
  /** The `Transaction` at the end of the edge. */
  node: Maybe<GqlTransaction>;
};


/** A `Transaction` edge in the connection, with data from `AssetTransfer`. */
export type GqlNftTransactionsByAssetTransferNftIdAndTransactionIdManyToManyEdgeassetTransfersArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqlasset_transfers_distinct_enum>>>;
  filter?: InputMaybe<GqlAssetTransferFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlAssetTransfersOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
};

export type GqlNftVariancePopulationAggregateFilter = {
  tokenId?: InputMaybe<GqlBigFloatFilter>;
};

export type GqlNftVariancePopulationAggregates = {
  /** Population variance of tokenId across the matching connection */
  tokenId: Maybe<Scalars['BigFloat']['output']>;
};

export type GqlNftVarianceSampleAggregateFilter = {
  tokenId?: InputMaybe<GqlBigFloatFilter>;
};

export type GqlNftVarianceSampleAggregates = {
  /** Sample variance of tokenId across the matching connection */
  tokenId: Maybe<Scalars['BigFloat']['output']>;
};

/** A connection to a list of `Wallet` values, with data from `AssetTransfer`. */
export type GqlNftWalletsByAssetTransferNftIdAndFromIdManyToManyConnection = {
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates: Maybe<GqlWalletAggregates>;
  /** A list of edges which contains the `Wallet`, info from the `AssetTransfer`, and the cursor to aid in pagination. */
  edges: Array<GqlNftWalletsByAssetTransferNftIdAndFromIdManyToManyEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates: Maybe<Array<GqlWalletAggregates>>;
  /** A list of `Wallet` objects. */
  nodes: Array<Maybe<GqlWallet>>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
  /** The count of *all* `Wallet` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `Wallet` values, with data from `AssetTransfer`. */
export type GqlNftWalletsByAssetTransferNftIdAndFromIdManyToManyConnectiongroupedAggregatesArgs = {
  groupBy: Array<GqlWalletsGroupBy>;
  having?: InputMaybe<GqlWalletsHavingInput>;
};

/** A `Wallet` edge in the connection, with data from `AssetTransfer`. */
export type GqlNftWalletsByAssetTransferNftIdAndFromIdManyToManyEdge = {
  /** Reads and enables pagination through a set of `AssetTransfer`. */
  assetTransfersByFromId: GqlAssetTransfersConnection;
  /** A cursor for use in pagination. */
  cursor: Maybe<Scalars['Cursor']['output']>;
  /** The `Wallet` at the end of the edge. */
  node: Maybe<GqlWallet>;
};


/** A `Wallet` edge in the connection, with data from `AssetTransfer`. */
export type GqlNftWalletsByAssetTransferNftIdAndFromIdManyToManyEdgeassetTransfersByFromIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqlasset_transfers_distinct_enum>>>;
  filter?: InputMaybe<GqlAssetTransferFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlAssetTransfersOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
};

/** A connection to a list of `Wallet` values, with data from `AssetTransfer`. */
export type GqlNftWalletsByAssetTransferNftIdAndToIdManyToManyConnection = {
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates: Maybe<GqlWalletAggregates>;
  /** A list of edges which contains the `Wallet`, info from the `AssetTransfer`, and the cursor to aid in pagination. */
  edges: Array<GqlNftWalletsByAssetTransferNftIdAndToIdManyToManyEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates: Maybe<Array<GqlWalletAggregates>>;
  /** A list of `Wallet` objects. */
  nodes: Array<Maybe<GqlWallet>>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
  /** The count of *all* `Wallet` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `Wallet` values, with data from `AssetTransfer`. */
export type GqlNftWalletsByAssetTransferNftIdAndToIdManyToManyConnectiongroupedAggregatesArgs = {
  groupBy: Array<GqlWalletsGroupBy>;
  having?: InputMaybe<GqlWalletsHavingInput>;
};

/** A `Wallet` edge in the connection, with data from `AssetTransfer`. */
export type GqlNftWalletsByAssetTransferNftIdAndToIdManyToManyEdge = {
  /** Reads and enables pagination through a set of `AssetTransfer`. */
  assetTransfersByToId: GqlAssetTransfersConnection;
  /** A cursor for use in pagination. */
  cursor: Maybe<Scalars['Cursor']['output']>;
  /** The `Wallet` at the end of the edge. */
  node: Maybe<GqlWallet>;
};


/** A `Wallet` edge in the connection, with data from `AssetTransfer`. */
export type GqlNftWalletsByAssetTransferNftIdAndToIdManyToManyEdgeassetTransfersByToIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqlasset_transfers_distinct_enum>>>;
  filter?: InputMaybe<GqlAssetTransferFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlAssetTransfersOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
};

/** A connection to a list of `Wallet` values, with data from `NftBalance`. */
export type GqlNftWalletsByNftBalanceNftIdAndWalletIdManyToManyConnection = {
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates: Maybe<GqlWalletAggregates>;
  /** A list of edges which contains the `Wallet`, info from the `NftBalance`, and the cursor to aid in pagination. */
  edges: Array<GqlNftWalletsByNftBalanceNftIdAndWalletIdManyToManyEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates: Maybe<Array<GqlWalletAggregates>>;
  /** A list of `Wallet` objects. */
  nodes: Array<Maybe<GqlWallet>>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
  /** The count of *all* `Wallet` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `Wallet` values, with data from `NftBalance`. */
export type GqlNftWalletsByNftBalanceNftIdAndWalletIdManyToManyConnectiongroupedAggregatesArgs = {
  groupBy: Array<GqlWalletsGroupBy>;
  having?: InputMaybe<GqlWalletsHavingInput>;
};

/** A `Wallet` edge in the connection, with data from `NftBalance`. */
export type GqlNftWalletsByNftBalanceNftIdAndWalletIdManyToManyEdge = {
  /** A cursor for use in pagination. */
  cursor: Maybe<Scalars['Cursor']['output']>;
  /** Reads and enables pagination through a set of `NftBalance`. */
  nfts: GqlNftBalancesConnection;
  /** The `Wallet` at the end of the edge. */
  node: Maybe<GqlWallet>;
};


/** A `Wallet` edge in the connection, with data from `NftBalance`. */
export type GqlNftWalletsByNftBalanceNftIdAndWalletIdManyToManyEdgenftsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqlnft_balances_distinct_enum>>>;
  filter?: InputMaybe<GqlNftBalanceFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlNftBalancesOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
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
  having?: InputMaybe<GqlNftsHavingInput>;
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
  COLLECTION_ID = 'COLLECTION_ID',
  ID = 'ID',
  METADATA = 'METADATA',
  TOKEN_ID = 'TOKEN_ID'
}

export type GqlNftsHavingAverageInput = {
  tokenId?: InputMaybe<GqlHavingBigfloatFilter>;
};

export type GqlNftsHavingDistinctCountInput = {
  tokenId?: InputMaybe<GqlHavingBigfloatFilter>;
};

/** Conditions for `Nft` aggregates. */
export type GqlNftsHavingInput = {
  AND?: InputMaybe<Array<GqlNftsHavingInput>>;
  OR?: InputMaybe<Array<GqlNftsHavingInput>>;
  average?: InputMaybe<GqlNftsHavingAverageInput>;
  distinctCount?: InputMaybe<GqlNftsHavingDistinctCountInput>;
  max?: InputMaybe<GqlNftsHavingMaxInput>;
  min?: InputMaybe<GqlNftsHavingMinInput>;
  stddevPopulation?: InputMaybe<GqlNftsHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<GqlNftsHavingStddevSampleInput>;
  sum?: InputMaybe<GqlNftsHavingSumInput>;
  variancePopulation?: InputMaybe<GqlNftsHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<GqlNftsHavingVarianceSampleInput>;
};

export type GqlNftsHavingMaxInput = {
  tokenId?: InputMaybe<GqlHavingBigfloatFilter>;
};

export type GqlNftsHavingMinInput = {
  tokenId?: InputMaybe<GqlHavingBigfloatFilter>;
};

export type GqlNftsHavingStddevPopulationInput = {
  tokenId?: InputMaybe<GqlHavingBigfloatFilter>;
};

export type GqlNftsHavingStddevSampleInput = {
  tokenId?: InputMaybe<GqlHavingBigfloatFilter>;
};

export type GqlNftsHavingSumInput = {
  tokenId?: InputMaybe<GqlHavingBigfloatFilter>;
};

export type GqlNftsHavingVariancePopulationInput = {
  tokenId?: InputMaybe<GqlHavingBigfloatFilter>;
};

export type GqlNftsHavingVarianceSampleInput = {
  tokenId?: InputMaybe<GqlHavingBigfloatFilter>;
};

/** Methods to use when ordering `Nft`. */
export enum GqlNftsOrderBy {
  ASSET_TRANSFERS_AVERAGE_BLOCK_RANGE_ASC = 'ASSET_TRANSFERS_AVERAGE_BLOCK_RANGE_ASC',
  ASSET_TRANSFERS_AVERAGE_BLOCK_RANGE_DESC = 'ASSET_TRANSFERS_AVERAGE_BLOCK_RANGE_DESC',
  ASSET_TRANSFERS_AVERAGE_FROM_ID_ASC = 'ASSET_TRANSFERS_AVERAGE_FROM_ID_ASC',
  ASSET_TRANSFERS_AVERAGE_FROM_ID_DESC = 'ASSET_TRANSFERS_AVERAGE_FROM_ID_DESC',
  ASSET_TRANSFERS_AVERAGE_ID_ASC = 'ASSET_TRANSFERS_AVERAGE_ID_ASC',
  ASSET_TRANSFERS_AVERAGE_ID_DESC = 'ASSET_TRANSFERS_AVERAGE_ID_DESC',
  ASSET_TRANSFERS_AVERAGE_NFT_ID_ASC = 'ASSET_TRANSFERS_AVERAGE_NFT_ID_ASC',
  ASSET_TRANSFERS_AVERAGE_NFT_ID_DESC = 'ASSET_TRANSFERS_AVERAGE_NFT_ID_DESC',
  ASSET_TRANSFERS_AVERAGE_TOKEN_ID_ASC = 'ASSET_TRANSFERS_AVERAGE_TOKEN_ID_ASC',
  ASSET_TRANSFERS_AVERAGE_TOKEN_ID_DESC = 'ASSET_TRANSFERS_AVERAGE_TOKEN_ID_DESC',
  ASSET_TRANSFERS_AVERAGE_TO_ID_ASC = 'ASSET_TRANSFERS_AVERAGE_TO_ID_ASC',
  ASSET_TRANSFERS_AVERAGE_TO_ID_DESC = 'ASSET_TRANSFERS_AVERAGE_TO_ID_DESC',
  ASSET_TRANSFERS_AVERAGE_TRANSACTION_BLOCK_NUMBER_ASC = 'ASSET_TRANSFERS_AVERAGE_TRANSACTION_BLOCK_NUMBER_ASC',
  ASSET_TRANSFERS_AVERAGE_TRANSACTION_BLOCK_NUMBER_DESC = 'ASSET_TRANSFERS_AVERAGE_TRANSACTION_BLOCK_NUMBER_DESC',
  ASSET_TRANSFERS_AVERAGE_TRANSACTION_ID_ASC = 'ASSET_TRANSFERS_AVERAGE_TRANSACTION_ID_ASC',
  ASSET_TRANSFERS_AVERAGE_TRANSACTION_ID_DESC = 'ASSET_TRANSFERS_AVERAGE_TRANSACTION_ID_DESC',
  ASSET_TRANSFERS_AVERAGE_TYPE_ASC = 'ASSET_TRANSFERS_AVERAGE_TYPE_ASC',
  ASSET_TRANSFERS_AVERAGE_TYPE_DESC = 'ASSET_TRANSFERS_AVERAGE_TYPE_DESC',
  ASSET_TRANSFERS_AVERAGE_VALUE_ASC = 'ASSET_TRANSFERS_AVERAGE_VALUE_ASC',
  ASSET_TRANSFERS_AVERAGE_VALUE_DESC = 'ASSET_TRANSFERS_AVERAGE_VALUE_DESC',
  ASSET_TRANSFERS_COUNT_ASC = 'ASSET_TRANSFERS_COUNT_ASC',
  ASSET_TRANSFERS_COUNT_DESC = 'ASSET_TRANSFERS_COUNT_DESC',
  ASSET_TRANSFERS_DISTINCT_COUNT_BLOCK_RANGE_ASC = 'ASSET_TRANSFERS_DISTINCT_COUNT_BLOCK_RANGE_ASC',
  ASSET_TRANSFERS_DISTINCT_COUNT_BLOCK_RANGE_DESC = 'ASSET_TRANSFERS_DISTINCT_COUNT_BLOCK_RANGE_DESC',
  ASSET_TRANSFERS_DISTINCT_COUNT_FROM_ID_ASC = 'ASSET_TRANSFERS_DISTINCT_COUNT_FROM_ID_ASC',
  ASSET_TRANSFERS_DISTINCT_COUNT_FROM_ID_DESC = 'ASSET_TRANSFERS_DISTINCT_COUNT_FROM_ID_DESC',
  ASSET_TRANSFERS_DISTINCT_COUNT_ID_ASC = 'ASSET_TRANSFERS_DISTINCT_COUNT_ID_ASC',
  ASSET_TRANSFERS_DISTINCT_COUNT_ID_DESC = 'ASSET_TRANSFERS_DISTINCT_COUNT_ID_DESC',
  ASSET_TRANSFERS_DISTINCT_COUNT_NFT_ID_ASC = 'ASSET_TRANSFERS_DISTINCT_COUNT_NFT_ID_ASC',
  ASSET_TRANSFERS_DISTINCT_COUNT_NFT_ID_DESC = 'ASSET_TRANSFERS_DISTINCT_COUNT_NFT_ID_DESC',
  ASSET_TRANSFERS_DISTINCT_COUNT_TOKEN_ID_ASC = 'ASSET_TRANSFERS_DISTINCT_COUNT_TOKEN_ID_ASC',
  ASSET_TRANSFERS_DISTINCT_COUNT_TOKEN_ID_DESC = 'ASSET_TRANSFERS_DISTINCT_COUNT_TOKEN_ID_DESC',
  ASSET_TRANSFERS_DISTINCT_COUNT_TO_ID_ASC = 'ASSET_TRANSFERS_DISTINCT_COUNT_TO_ID_ASC',
  ASSET_TRANSFERS_DISTINCT_COUNT_TO_ID_DESC = 'ASSET_TRANSFERS_DISTINCT_COUNT_TO_ID_DESC',
  ASSET_TRANSFERS_DISTINCT_COUNT_TRANSACTION_BLOCK_NUMBER_ASC = 'ASSET_TRANSFERS_DISTINCT_COUNT_TRANSACTION_BLOCK_NUMBER_ASC',
  ASSET_TRANSFERS_DISTINCT_COUNT_TRANSACTION_BLOCK_NUMBER_DESC = 'ASSET_TRANSFERS_DISTINCT_COUNT_TRANSACTION_BLOCK_NUMBER_DESC',
  ASSET_TRANSFERS_DISTINCT_COUNT_TRANSACTION_ID_ASC = 'ASSET_TRANSFERS_DISTINCT_COUNT_TRANSACTION_ID_ASC',
  ASSET_TRANSFERS_DISTINCT_COUNT_TRANSACTION_ID_DESC = 'ASSET_TRANSFERS_DISTINCT_COUNT_TRANSACTION_ID_DESC',
  ASSET_TRANSFERS_DISTINCT_COUNT_TYPE_ASC = 'ASSET_TRANSFERS_DISTINCT_COUNT_TYPE_ASC',
  ASSET_TRANSFERS_DISTINCT_COUNT_TYPE_DESC = 'ASSET_TRANSFERS_DISTINCT_COUNT_TYPE_DESC',
  ASSET_TRANSFERS_DISTINCT_COUNT_VALUE_ASC = 'ASSET_TRANSFERS_DISTINCT_COUNT_VALUE_ASC',
  ASSET_TRANSFERS_DISTINCT_COUNT_VALUE_DESC = 'ASSET_TRANSFERS_DISTINCT_COUNT_VALUE_DESC',
  ASSET_TRANSFERS_MAX_BLOCK_RANGE_ASC = 'ASSET_TRANSFERS_MAX_BLOCK_RANGE_ASC',
  ASSET_TRANSFERS_MAX_BLOCK_RANGE_DESC = 'ASSET_TRANSFERS_MAX_BLOCK_RANGE_DESC',
  ASSET_TRANSFERS_MAX_FROM_ID_ASC = 'ASSET_TRANSFERS_MAX_FROM_ID_ASC',
  ASSET_TRANSFERS_MAX_FROM_ID_DESC = 'ASSET_TRANSFERS_MAX_FROM_ID_DESC',
  ASSET_TRANSFERS_MAX_ID_ASC = 'ASSET_TRANSFERS_MAX_ID_ASC',
  ASSET_TRANSFERS_MAX_ID_DESC = 'ASSET_TRANSFERS_MAX_ID_DESC',
  ASSET_TRANSFERS_MAX_NFT_ID_ASC = 'ASSET_TRANSFERS_MAX_NFT_ID_ASC',
  ASSET_TRANSFERS_MAX_NFT_ID_DESC = 'ASSET_TRANSFERS_MAX_NFT_ID_DESC',
  ASSET_TRANSFERS_MAX_TOKEN_ID_ASC = 'ASSET_TRANSFERS_MAX_TOKEN_ID_ASC',
  ASSET_TRANSFERS_MAX_TOKEN_ID_DESC = 'ASSET_TRANSFERS_MAX_TOKEN_ID_DESC',
  ASSET_TRANSFERS_MAX_TO_ID_ASC = 'ASSET_TRANSFERS_MAX_TO_ID_ASC',
  ASSET_TRANSFERS_MAX_TO_ID_DESC = 'ASSET_TRANSFERS_MAX_TO_ID_DESC',
  ASSET_TRANSFERS_MAX_TRANSACTION_BLOCK_NUMBER_ASC = 'ASSET_TRANSFERS_MAX_TRANSACTION_BLOCK_NUMBER_ASC',
  ASSET_TRANSFERS_MAX_TRANSACTION_BLOCK_NUMBER_DESC = 'ASSET_TRANSFERS_MAX_TRANSACTION_BLOCK_NUMBER_DESC',
  ASSET_TRANSFERS_MAX_TRANSACTION_ID_ASC = 'ASSET_TRANSFERS_MAX_TRANSACTION_ID_ASC',
  ASSET_TRANSFERS_MAX_TRANSACTION_ID_DESC = 'ASSET_TRANSFERS_MAX_TRANSACTION_ID_DESC',
  ASSET_TRANSFERS_MAX_TYPE_ASC = 'ASSET_TRANSFERS_MAX_TYPE_ASC',
  ASSET_TRANSFERS_MAX_TYPE_DESC = 'ASSET_TRANSFERS_MAX_TYPE_DESC',
  ASSET_TRANSFERS_MAX_VALUE_ASC = 'ASSET_TRANSFERS_MAX_VALUE_ASC',
  ASSET_TRANSFERS_MAX_VALUE_DESC = 'ASSET_TRANSFERS_MAX_VALUE_DESC',
  ASSET_TRANSFERS_MIN_BLOCK_RANGE_ASC = 'ASSET_TRANSFERS_MIN_BLOCK_RANGE_ASC',
  ASSET_TRANSFERS_MIN_BLOCK_RANGE_DESC = 'ASSET_TRANSFERS_MIN_BLOCK_RANGE_DESC',
  ASSET_TRANSFERS_MIN_FROM_ID_ASC = 'ASSET_TRANSFERS_MIN_FROM_ID_ASC',
  ASSET_TRANSFERS_MIN_FROM_ID_DESC = 'ASSET_TRANSFERS_MIN_FROM_ID_DESC',
  ASSET_TRANSFERS_MIN_ID_ASC = 'ASSET_TRANSFERS_MIN_ID_ASC',
  ASSET_TRANSFERS_MIN_ID_DESC = 'ASSET_TRANSFERS_MIN_ID_DESC',
  ASSET_TRANSFERS_MIN_NFT_ID_ASC = 'ASSET_TRANSFERS_MIN_NFT_ID_ASC',
  ASSET_TRANSFERS_MIN_NFT_ID_DESC = 'ASSET_TRANSFERS_MIN_NFT_ID_DESC',
  ASSET_TRANSFERS_MIN_TOKEN_ID_ASC = 'ASSET_TRANSFERS_MIN_TOKEN_ID_ASC',
  ASSET_TRANSFERS_MIN_TOKEN_ID_DESC = 'ASSET_TRANSFERS_MIN_TOKEN_ID_DESC',
  ASSET_TRANSFERS_MIN_TO_ID_ASC = 'ASSET_TRANSFERS_MIN_TO_ID_ASC',
  ASSET_TRANSFERS_MIN_TO_ID_DESC = 'ASSET_TRANSFERS_MIN_TO_ID_DESC',
  ASSET_TRANSFERS_MIN_TRANSACTION_BLOCK_NUMBER_ASC = 'ASSET_TRANSFERS_MIN_TRANSACTION_BLOCK_NUMBER_ASC',
  ASSET_TRANSFERS_MIN_TRANSACTION_BLOCK_NUMBER_DESC = 'ASSET_TRANSFERS_MIN_TRANSACTION_BLOCK_NUMBER_DESC',
  ASSET_TRANSFERS_MIN_TRANSACTION_ID_ASC = 'ASSET_TRANSFERS_MIN_TRANSACTION_ID_ASC',
  ASSET_TRANSFERS_MIN_TRANSACTION_ID_DESC = 'ASSET_TRANSFERS_MIN_TRANSACTION_ID_DESC',
  ASSET_TRANSFERS_MIN_TYPE_ASC = 'ASSET_TRANSFERS_MIN_TYPE_ASC',
  ASSET_TRANSFERS_MIN_TYPE_DESC = 'ASSET_TRANSFERS_MIN_TYPE_DESC',
  ASSET_TRANSFERS_MIN_VALUE_ASC = 'ASSET_TRANSFERS_MIN_VALUE_ASC',
  ASSET_TRANSFERS_MIN_VALUE_DESC = 'ASSET_TRANSFERS_MIN_VALUE_DESC',
  ASSET_TRANSFERS_STDDEV_POPULATION_BLOCK_RANGE_ASC = 'ASSET_TRANSFERS_STDDEV_POPULATION_BLOCK_RANGE_ASC',
  ASSET_TRANSFERS_STDDEV_POPULATION_BLOCK_RANGE_DESC = 'ASSET_TRANSFERS_STDDEV_POPULATION_BLOCK_RANGE_DESC',
  ASSET_TRANSFERS_STDDEV_POPULATION_FROM_ID_ASC = 'ASSET_TRANSFERS_STDDEV_POPULATION_FROM_ID_ASC',
  ASSET_TRANSFERS_STDDEV_POPULATION_FROM_ID_DESC = 'ASSET_TRANSFERS_STDDEV_POPULATION_FROM_ID_DESC',
  ASSET_TRANSFERS_STDDEV_POPULATION_ID_ASC = 'ASSET_TRANSFERS_STDDEV_POPULATION_ID_ASC',
  ASSET_TRANSFERS_STDDEV_POPULATION_ID_DESC = 'ASSET_TRANSFERS_STDDEV_POPULATION_ID_DESC',
  ASSET_TRANSFERS_STDDEV_POPULATION_NFT_ID_ASC = 'ASSET_TRANSFERS_STDDEV_POPULATION_NFT_ID_ASC',
  ASSET_TRANSFERS_STDDEV_POPULATION_NFT_ID_DESC = 'ASSET_TRANSFERS_STDDEV_POPULATION_NFT_ID_DESC',
  ASSET_TRANSFERS_STDDEV_POPULATION_TOKEN_ID_ASC = 'ASSET_TRANSFERS_STDDEV_POPULATION_TOKEN_ID_ASC',
  ASSET_TRANSFERS_STDDEV_POPULATION_TOKEN_ID_DESC = 'ASSET_TRANSFERS_STDDEV_POPULATION_TOKEN_ID_DESC',
  ASSET_TRANSFERS_STDDEV_POPULATION_TO_ID_ASC = 'ASSET_TRANSFERS_STDDEV_POPULATION_TO_ID_ASC',
  ASSET_TRANSFERS_STDDEV_POPULATION_TO_ID_DESC = 'ASSET_TRANSFERS_STDDEV_POPULATION_TO_ID_DESC',
  ASSET_TRANSFERS_STDDEV_POPULATION_TRANSACTION_BLOCK_NUMBER_ASC = 'ASSET_TRANSFERS_STDDEV_POPULATION_TRANSACTION_BLOCK_NUMBER_ASC',
  ASSET_TRANSFERS_STDDEV_POPULATION_TRANSACTION_BLOCK_NUMBER_DESC = 'ASSET_TRANSFERS_STDDEV_POPULATION_TRANSACTION_BLOCK_NUMBER_DESC',
  ASSET_TRANSFERS_STDDEV_POPULATION_TRANSACTION_ID_ASC = 'ASSET_TRANSFERS_STDDEV_POPULATION_TRANSACTION_ID_ASC',
  ASSET_TRANSFERS_STDDEV_POPULATION_TRANSACTION_ID_DESC = 'ASSET_TRANSFERS_STDDEV_POPULATION_TRANSACTION_ID_DESC',
  ASSET_TRANSFERS_STDDEV_POPULATION_TYPE_ASC = 'ASSET_TRANSFERS_STDDEV_POPULATION_TYPE_ASC',
  ASSET_TRANSFERS_STDDEV_POPULATION_TYPE_DESC = 'ASSET_TRANSFERS_STDDEV_POPULATION_TYPE_DESC',
  ASSET_TRANSFERS_STDDEV_POPULATION_VALUE_ASC = 'ASSET_TRANSFERS_STDDEV_POPULATION_VALUE_ASC',
  ASSET_TRANSFERS_STDDEV_POPULATION_VALUE_DESC = 'ASSET_TRANSFERS_STDDEV_POPULATION_VALUE_DESC',
  ASSET_TRANSFERS_STDDEV_SAMPLE_BLOCK_RANGE_ASC = 'ASSET_TRANSFERS_STDDEV_SAMPLE_BLOCK_RANGE_ASC',
  ASSET_TRANSFERS_STDDEV_SAMPLE_BLOCK_RANGE_DESC = 'ASSET_TRANSFERS_STDDEV_SAMPLE_BLOCK_RANGE_DESC',
  ASSET_TRANSFERS_STDDEV_SAMPLE_FROM_ID_ASC = 'ASSET_TRANSFERS_STDDEV_SAMPLE_FROM_ID_ASC',
  ASSET_TRANSFERS_STDDEV_SAMPLE_FROM_ID_DESC = 'ASSET_TRANSFERS_STDDEV_SAMPLE_FROM_ID_DESC',
  ASSET_TRANSFERS_STDDEV_SAMPLE_ID_ASC = 'ASSET_TRANSFERS_STDDEV_SAMPLE_ID_ASC',
  ASSET_TRANSFERS_STDDEV_SAMPLE_ID_DESC = 'ASSET_TRANSFERS_STDDEV_SAMPLE_ID_DESC',
  ASSET_TRANSFERS_STDDEV_SAMPLE_NFT_ID_ASC = 'ASSET_TRANSFERS_STDDEV_SAMPLE_NFT_ID_ASC',
  ASSET_TRANSFERS_STDDEV_SAMPLE_NFT_ID_DESC = 'ASSET_TRANSFERS_STDDEV_SAMPLE_NFT_ID_DESC',
  ASSET_TRANSFERS_STDDEV_SAMPLE_TOKEN_ID_ASC = 'ASSET_TRANSFERS_STDDEV_SAMPLE_TOKEN_ID_ASC',
  ASSET_TRANSFERS_STDDEV_SAMPLE_TOKEN_ID_DESC = 'ASSET_TRANSFERS_STDDEV_SAMPLE_TOKEN_ID_DESC',
  ASSET_TRANSFERS_STDDEV_SAMPLE_TO_ID_ASC = 'ASSET_TRANSFERS_STDDEV_SAMPLE_TO_ID_ASC',
  ASSET_TRANSFERS_STDDEV_SAMPLE_TO_ID_DESC = 'ASSET_TRANSFERS_STDDEV_SAMPLE_TO_ID_DESC',
  ASSET_TRANSFERS_STDDEV_SAMPLE_TRANSACTION_BLOCK_NUMBER_ASC = 'ASSET_TRANSFERS_STDDEV_SAMPLE_TRANSACTION_BLOCK_NUMBER_ASC',
  ASSET_TRANSFERS_STDDEV_SAMPLE_TRANSACTION_BLOCK_NUMBER_DESC = 'ASSET_TRANSFERS_STDDEV_SAMPLE_TRANSACTION_BLOCK_NUMBER_DESC',
  ASSET_TRANSFERS_STDDEV_SAMPLE_TRANSACTION_ID_ASC = 'ASSET_TRANSFERS_STDDEV_SAMPLE_TRANSACTION_ID_ASC',
  ASSET_TRANSFERS_STDDEV_SAMPLE_TRANSACTION_ID_DESC = 'ASSET_TRANSFERS_STDDEV_SAMPLE_TRANSACTION_ID_DESC',
  ASSET_TRANSFERS_STDDEV_SAMPLE_TYPE_ASC = 'ASSET_TRANSFERS_STDDEV_SAMPLE_TYPE_ASC',
  ASSET_TRANSFERS_STDDEV_SAMPLE_TYPE_DESC = 'ASSET_TRANSFERS_STDDEV_SAMPLE_TYPE_DESC',
  ASSET_TRANSFERS_STDDEV_SAMPLE_VALUE_ASC = 'ASSET_TRANSFERS_STDDEV_SAMPLE_VALUE_ASC',
  ASSET_TRANSFERS_STDDEV_SAMPLE_VALUE_DESC = 'ASSET_TRANSFERS_STDDEV_SAMPLE_VALUE_DESC',
  ASSET_TRANSFERS_SUM_BLOCK_RANGE_ASC = 'ASSET_TRANSFERS_SUM_BLOCK_RANGE_ASC',
  ASSET_TRANSFERS_SUM_BLOCK_RANGE_DESC = 'ASSET_TRANSFERS_SUM_BLOCK_RANGE_DESC',
  ASSET_TRANSFERS_SUM_FROM_ID_ASC = 'ASSET_TRANSFERS_SUM_FROM_ID_ASC',
  ASSET_TRANSFERS_SUM_FROM_ID_DESC = 'ASSET_TRANSFERS_SUM_FROM_ID_DESC',
  ASSET_TRANSFERS_SUM_ID_ASC = 'ASSET_TRANSFERS_SUM_ID_ASC',
  ASSET_TRANSFERS_SUM_ID_DESC = 'ASSET_TRANSFERS_SUM_ID_DESC',
  ASSET_TRANSFERS_SUM_NFT_ID_ASC = 'ASSET_TRANSFERS_SUM_NFT_ID_ASC',
  ASSET_TRANSFERS_SUM_NFT_ID_DESC = 'ASSET_TRANSFERS_SUM_NFT_ID_DESC',
  ASSET_TRANSFERS_SUM_TOKEN_ID_ASC = 'ASSET_TRANSFERS_SUM_TOKEN_ID_ASC',
  ASSET_TRANSFERS_SUM_TOKEN_ID_DESC = 'ASSET_TRANSFERS_SUM_TOKEN_ID_DESC',
  ASSET_TRANSFERS_SUM_TO_ID_ASC = 'ASSET_TRANSFERS_SUM_TO_ID_ASC',
  ASSET_TRANSFERS_SUM_TO_ID_DESC = 'ASSET_TRANSFERS_SUM_TO_ID_DESC',
  ASSET_TRANSFERS_SUM_TRANSACTION_BLOCK_NUMBER_ASC = 'ASSET_TRANSFERS_SUM_TRANSACTION_BLOCK_NUMBER_ASC',
  ASSET_TRANSFERS_SUM_TRANSACTION_BLOCK_NUMBER_DESC = 'ASSET_TRANSFERS_SUM_TRANSACTION_BLOCK_NUMBER_DESC',
  ASSET_TRANSFERS_SUM_TRANSACTION_ID_ASC = 'ASSET_TRANSFERS_SUM_TRANSACTION_ID_ASC',
  ASSET_TRANSFERS_SUM_TRANSACTION_ID_DESC = 'ASSET_TRANSFERS_SUM_TRANSACTION_ID_DESC',
  ASSET_TRANSFERS_SUM_TYPE_ASC = 'ASSET_TRANSFERS_SUM_TYPE_ASC',
  ASSET_TRANSFERS_SUM_TYPE_DESC = 'ASSET_TRANSFERS_SUM_TYPE_DESC',
  ASSET_TRANSFERS_SUM_VALUE_ASC = 'ASSET_TRANSFERS_SUM_VALUE_ASC',
  ASSET_TRANSFERS_SUM_VALUE_DESC = 'ASSET_TRANSFERS_SUM_VALUE_DESC',
  ASSET_TRANSFERS_VARIANCE_POPULATION_BLOCK_RANGE_ASC = 'ASSET_TRANSFERS_VARIANCE_POPULATION_BLOCK_RANGE_ASC',
  ASSET_TRANSFERS_VARIANCE_POPULATION_BLOCK_RANGE_DESC = 'ASSET_TRANSFERS_VARIANCE_POPULATION_BLOCK_RANGE_DESC',
  ASSET_TRANSFERS_VARIANCE_POPULATION_FROM_ID_ASC = 'ASSET_TRANSFERS_VARIANCE_POPULATION_FROM_ID_ASC',
  ASSET_TRANSFERS_VARIANCE_POPULATION_FROM_ID_DESC = 'ASSET_TRANSFERS_VARIANCE_POPULATION_FROM_ID_DESC',
  ASSET_TRANSFERS_VARIANCE_POPULATION_ID_ASC = 'ASSET_TRANSFERS_VARIANCE_POPULATION_ID_ASC',
  ASSET_TRANSFERS_VARIANCE_POPULATION_ID_DESC = 'ASSET_TRANSFERS_VARIANCE_POPULATION_ID_DESC',
  ASSET_TRANSFERS_VARIANCE_POPULATION_NFT_ID_ASC = 'ASSET_TRANSFERS_VARIANCE_POPULATION_NFT_ID_ASC',
  ASSET_TRANSFERS_VARIANCE_POPULATION_NFT_ID_DESC = 'ASSET_TRANSFERS_VARIANCE_POPULATION_NFT_ID_DESC',
  ASSET_TRANSFERS_VARIANCE_POPULATION_TOKEN_ID_ASC = 'ASSET_TRANSFERS_VARIANCE_POPULATION_TOKEN_ID_ASC',
  ASSET_TRANSFERS_VARIANCE_POPULATION_TOKEN_ID_DESC = 'ASSET_TRANSFERS_VARIANCE_POPULATION_TOKEN_ID_DESC',
  ASSET_TRANSFERS_VARIANCE_POPULATION_TO_ID_ASC = 'ASSET_TRANSFERS_VARIANCE_POPULATION_TO_ID_ASC',
  ASSET_TRANSFERS_VARIANCE_POPULATION_TO_ID_DESC = 'ASSET_TRANSFERS_VARIANCE_POPULATION_TO_ID_DESC',
  ASSET_TRANSFERS_VARIANCE_POPULATION_TRANSACTION_BLOCK_NUMBER_ASC = 'ASSET_TRANSFERS_VARIANCE_POPULATION_TRANSACTION_BLOCK_NUMBER_ASC',
  ASSET_TRANSFERS_VARIANCE_POPULATION_TRANSACTION_BLOCK_NUMBER_DESC = 'ASSET_TRANSFERS_VARIANCE_POPULATION_TRANSACTION_BLOCK_NUMBER_DESC',
  ASSET_TRANSFERS_VARIANCE_POPULATION_TRANSACTION_ID_ASC = 'ASSET_TRANSFERS_VARIANCE_POPULATION_TRANSACTION_ID_ASC',
  ASSET_TRANSFERS_VARIANCE_POPULATION_TRANSACTION_ID_DESC = 'ASSET_TRANSFERS_VARIANCE_POPULATION_TRANSACTION_ID_DESC',
  ASSET_TRANSFERS_VARIANCE_POPULATION_TYPE_ASC = 'ASSET_TRANSFERS_VARIANCE_POPULATION_TYPE_ASC',
  ASSET_TRANSFERS_VARIANCE_POPULATION_TYPE_DESC = 'ASSET_TRANSFERS_VARIANCE_POPULATION_TYPE_DESC',
  ASSET_TRANSFERS_VARIANCE_POPULATION_VALUE_ASC = 'ASSET_TRANSFERS_VARIANCE_POPULATION_VALUE_ASC',
  ASSET_TRANSFERS_VARIANCE_POPULATION_VALUE_DESC = 'ASSET_TRANSFERS_VARIANCE_POPULATION_VALUE_DESC',
  ASSET_TRANSFERS_VARIANCE_SAMPLE_BLOCK_RANGE_ASC = 'ASSET_TRANSFERS_VARIANCE_SAMPLE_BLOCK_RANGE_ASC',
  ASSET_TRANSFERS_VARIANCE_SAMPLE_BLOCK_RANGE_DESC = 'ASSET_TRANSFERS_VARIANCE_SAMPLE_BLOCK_RANGE_DESC',
  ASSET_TRANSFERS_VARIANCE_SAMPLE_FROM_ID_ASC = 'ASSET_TRANSFERS_VARIANCE_SAMPLE_FROM_ID_ASC',
  ASSET_TRANSFERS_VARIANCE_SAMPLE_FROM_ID_DESC = 'ASSET_TRANSFERS_VARIANCE_SAMPLE_FROM_ID_DESC',
  ASSET_TRANSFERS_VARIANCE_SAMPLE_ID_ASC = 'ASSET_TRANSFERS_VARIANCE_SAMPLE_ID_ASC',
  ASSET_TRANSFERS_VARIANCE_SAMPLE_ID_DESC = 'ASSET_TRANSFERS_VARIANCE_SAMPLE_ID_DESC',
  ASSET_TRANSFERS_VARIANCE_SAMPLE_NFT_ID_ASC = 'ASSET_TRANSFERS_VARIANCE_SAMPLE_NFT_ID_ASC',
  ASSET_TRANSFERS_VARIANCE_SAMPLE_NFT_ID_DESC = 'ASSET_TRANSFERS_VARIANCE_SAMPLE_NFT_ID_DESC',
  ASSET_TRANSFERS_VARIANCE_SAMPLE_TOKEN_ID_ASC = 'ASSET_TRANSFERS_VARIANCE_SAMPLE_TOKEN_ID_ASC',
  ASSET_TRANSFERS_VARIANCE_SAMPLE_TOKEN_ID_DESC = 'ASSET_TRANSFERS_VARIANCE_SAMPLE_TOKEN_ID_DESC',
  ASSET_TRANSFERS_VARIANCE_SAMPLE_TO_ID_ASC = 'ASSET_TRANSFERS_VARIANCE_SAMPLE_TO_ID_ASC',
  ASSET_TRANSFERS_VARIANCE_SAMPLE_TO_ID_DESC = 'ASSET_TRANSFERS_VARIANCE_SAMPLE_TO_ID_DESC',
  ASSET_TRANSFERS_VARIANCE_SAMPLE_TRANSACTION_BLOCK_NUMBER_ASC = 'ASSET_TRANSFERS_VARIANCE_SAMPLE_TRANSACTION_BLOCK_NUMBER_ASC',
  ASSET_TRANSFERS_VARIANCE_SAMPLE_TRANSACTION_BLOCK_NUMBER_DESC = 'ASSET_TRANSFERS_VARIANCE_SAMPLE_TRANSACTION_BLOCK_NUMBER_DESC',
  ASSET_TRANSFERS_VARIANCE_SAMPLE_TRANSACTION_ID_ASC = 'ASSET_TRANSFERS_VARIANCE_SAMPLE_TRANSACTION_ID_ASC',
  ASSET_TRANSFERS_VARIANCE_SAMPLE_TRANSACTION_ID_DESC = 'ASSET_TRANSFERS_VARIANCE_SAMPLE_TRANSACTION_ID_DESC',
  ASSET_TRANSFERS_VARIANCE_SAMPLE_TYPE_ASC = 'ASSET_TRANSFERS_VARIANCE_SAMPLE_TYPE_ASC',
  ASSET_TRANSFERS_VARIANCE_SAMPLE_TYPE_DESC = 'ASSET_TRANSFERS_VARIANCE_SAMPLE_TYPE_DESC',
  ASSET_TRANSFERS_VARIANCE_SAMPLE_VALUE_ASC = 'ASSET_TRANSFERS_VARIANCE_SAMPLE_VALUE_ASC',
  ASSET_TRANSFERS_VARIANCE_SAMPLE_VALUE_DESC = 'ASSET_TRANSFERS_VARIANCE_SAMPLE_VALUE_DESC',
  COLLECTION_ID_ASC = 'COLLECTION_ID_ASC',
  COLLECTION_ID_DESC = 'COLLECTION_ID_DESC',
  ID_ASC = 'ID_ASC',
  ID_DESC = 'ID_DESC',
  METADATA_ASC = 'METADATA_ASC',
  METADATA_DESC = 'METADATA_DESC',
  NATURAL = 'NATURAL',
  NFT_BALANCES_AVERAGE_BALANCE_ASC = 'NFT_BALANCES_AVERAGE_BALANCE_ASC',
  NFT_BALANCES_AVERAGE_BALANCE_DESC = 'NFT_BALANCES_AVERAGE_BALANCE_DESC',
  NFT_BALANCES_AVERAGE_BLOCK_RANGE_ASC = 'NFT_BALANCES_AVERAGE_BLOCK_RANGE_ASC',
  NFT_BALANCES_AVERAGE_BLOCK_RANGE_DESC = 'NFT_BALANCES_AVERAGE_BLOCK_RANGE_DESC',
  NFT_BALANCES_AVERAGE_ID_ASC = 'NFT_BALANCES_AVERAGE_ID_ASC',
  NFT_BALANCES_AVERAGE_ID_DESC = 'NFT_BALANCES_AVERAGE_ID_DESC',
  NFT_BALANCES_AVERAGE_NFT_ID_ASC = 'NFT_BALANCES_AVERAGE_NFT_ID_ASC',
  NFT_BALANCES_AVERAGE_NFT_ID_DESC = 'NFT_BALANCES_AVERAGE_NFT_ID_DESC',
  NFT_BALANCES_AVERAGE_NFT_TOKEN_ID_ASC = 'NFT_BALANCES_AVERAGE_NFT_TOKEN_ID_ASC',
  NFT_BALANCES_AVERAGE_NFT_TOKEN_ID_DESC = 'NFT_BALANCES_AVERAGE_NFT_TOKEN_ID_DESC',
  NFT_BALANCES_AVERAGE_WALLET_ID_ASC = 'NFT_BALANCES_AVERAGE_WALLET_ID_ASC',
  NFT_BALANCES_AVERAGE_WALLET_ID_DESC = 'NFT_BALANCES_AVERAGE_WALLET_ID_DESC',
  NFT_BALANCES_COUNT_ASC = 'NFT_BALANCES_COUNT_ASC',
  NFT_BALANCES_COUNT_DESC = 'NFT_BALANCES_COUNT_DESC',
  NFT_BALANCES_DISTINCT_COUNT_BALANCE_ASC = 'NFT_BALANCES_DISTINCT_COUNT_BALANCE_ASC',
  NFT_BALANCES_DISTINCT_COUNT_BALANCE_DESC = 'NFT_BALANCES_DISTINCT_COUNT_BALANCE_DESC',
  NFT_BALANCES_DISTINCT_COUNT_BLOCK_RANGE_ASC = 'NFT_BALANCES_DISTINCT_COUNT_BLOCK_RANGE_ASC',
  NFT_BALANCES_DISTINCT_COUNT_BLOCK_RANGE_DESC = 'NFT_BALANCES_DISTINCT_COUNT_BLOCK_RANGE_DESC',
  NFT_BALANCES_DISTINCT_COUNT_ID_ASC = 'NFT_BALANCES_DISTINCT_COUNT_ID_ASC',
  NFT_BALANCES_DISTINCT_COUNT_ID_DESC = 'NFT_BALANCES_DISTINCT_COUNT_ID_DESC',
  NFT_BALANCES_DISTINCT_COUNT_NFT_ID_ASC = 'NFT_BALANCES_DISTINCT_COUNT_NFT_ID_ASC',
  NFT_BALANCES_DISTINCT_COUNT_NFT_ID_DESC = 'NFT_BALANCES_DISTINCT_COUNT_NFT_ID_DESC',
  NFT_BALANCES_DISTINCT_COUNT_NFT_TOKEN_ID_ASC = 'NFT_BALANCES_DISTINCT_COUNT_NFT_TOKEN_ID_ASC',
  NFT_BALANCES_DISTINCT_COUNT_NFT_TOKEN_ID_DESC = 'NFT_BALANCES_DISTINCT_COUNT_NFT_TOKEN_ID_DESC',
  NFT_BALANCES_DISTINCT_COUNT_WALLET_ID_ASC = 'NFT_BALANCES_DISTINCT_COUNT_WALLET_ID_ASC',
  NFT_BALANCES_DISTINCT_COUNT_WALLET_ID_DESC = 'NFT_BALANCES_DISTINCT_COUNT_WALLET_ID_DESC',
  NFT_BALANCES_MAX_BALANCE_ASC = 'NFT_BALANCES_MAX_BALANCE_ASC',
  NFT_BALANCES_MAX_BALANCE_DESC = 'NFT_BALANCES_MAX_BALANCE_DESC',
  NFT_BALANCES_MAX_BLOCK_RANGE_ASC = 'NFT_BALANCES_MAX_BLOCK_RANGE_ASC',
  NFT_BALANCES_MAX_BLOCK_RANGE_DESC = 'NFT_BALANCES_MAX_BLOCK_RANGE_DESC',
  NFT_BALANCES_MAX_ID_ASC = 'NFT_BALANCES_MAX_ID_ASC',
  NFT_BALANCES_MAX_ID_DESC = 'NFT_BALANCES_MAX_ID_DESC',
  NFT_BALANCES_MAX_NFT_ID_ASC = 'NFT_BALANCES_MAX_NFT_ID_ASC',
  NFT_BALANCES_MAX_NFT_ID_DESC = 'NFT_BALANCES_MAX_NFT_ID_DESC',
  NFT_BALANCES_MAX_NFT_TOKEN_ID_ASC = 'NFT_BALANCES_MAX_NFT_TOKEN_ID_ASC',
  NFT_BALANCES_MAX_NFT_TOKEN_ID_DESC = 'NFT_BALANCES_MAX_NFT_TOKEN_ID_DESC',
  NFT_BALANCES_MAX_WALLET_ID_ASC = 'NFT_BALANCES_MAX_WALLET_ID_ASC',
  NFT_BALANCES_MAX_WALLET_ID_DESC = 'NFT_BALANCES_MAX_WALLET_ID_DESC',
  NFT_BALANCES_MIN_BALANCE_ASC = 'NFT_BALANCES_MIN_BALANCE_ASC',
  NFT_BALANCES_MIN_BALANCE_DESC = 'NFT_BALANCES_MIN_BALANCE_DESC',
  NFT_BALANCES_MIN_BLOCK_RANGE_ASC = 'NFT_BALANCES_MIN_BLOCK_RANGE_ASC',
  NFT_BALANCES_MIN_BLOCK_RANGE_DESC = 'NFT_BALANCES_MIN_BLOCK_RANGE_DESC',
  NFT_BALANCES_MIN_ID_ASC = 'NFT_BALANCES_MIN_ID_ASC',
  NFT_BALANCES_MIN_ID_DESC = 'NFT_BALANCES_MIN_ID_DESC',
  NFT_BALANCES_MIN_NFT_ID_ASC = 'NFT_BALANCES_MIN_NFT_ID_ASC',
  NFT_BALANCES_MIN_NFT_ID_DESC = 'NFT_BALANCES_MIN_NFT_ID_DESC',
  NFT_BALANCES_MIN_NFT_TOKEN_ID_ASC = 'NFT_BALANCES_MIN_NFT_TOKEN_ID_ASC',
  NFT_BALANCES_MIN_NFT_TOKEN_ID_DESC = 'NFT_BALANCES_MIN_NFT_TOKEN_ID_DESC',
  NFT_BALANCES_MIN_WALLET_ID_ASC = 'NFT_BALANCES_MIN_WALLET_ID_ASC',
  NFT_BALANCES_MIN_WALLET_ID_DESC = 'NFT_BALANCES_MIN_WALLET_ID_DESC',
  NFT_BALANCES_STDDEV_POPULATION_BALANCE_ASC = 'NFT_BALANCES_STDDEV_POPULATION_BALANCE_ASC',
  NFT_BALANCES_STDDEV_POPULATION_BALANCE_DESC = 'NFT_BALANCES_STDDEV_POPULATION_BALANCE_DESC',
  NFT_BALANCES_STDDEV_POPULATION_BLOCK_RANGE_ASC = 'NFT_BALANCES_STDDEV_POPULATION_BLOCK_RANGE_ASC',
  NFT_BALANCES_STDDEV_POPULATION_BLOCK_RANGE_DESC = 'NFT_BALANCES_STDDEV_POPULATION_BLOCK_RANGE_DESC',
  NFT_BALANCES_STDDEV_POPULATION_ID_ASC = 'NFT_BALANCES_STDDEV_POPULATION_ID_ASC',
  NFT_BALANCES_STDDEV_POPULATION_ID_DESC = 'NFT_BALANCES_STDDEV_POPULATION_ID_DESC',
  NFT_BALANCES_STDDEV_POPULATION_NFT_ID_ASC = 'NFT_BALANCES_STDDEV_POPULATION_NFT_ID_ASC',
  NFT_BALANCES_STDDEV_POPULATION_NFT_ID_DESC = 'NFT_BALANCES_STDDEV_POPULATION_NFT_ID_DESC',
  NFT_BALANCES_STDDEV_POPULATION_NFT_TOKEN_ID_ASC = 'NFT_BALANCES_STDDEV_POPULATION_NFT_TOKEN_ID_ASC',
  NFT_BALANCES_STDDEV_POPULATION_NFT_TOKEN_ID_DESC = 'NFT_BALANCES_STDDEV_POPULATION_NFT_TOKEN_ID_DESC',
  NFT_BALANCES_STDDEV_POPULATION_WALLET_ID_ASC = 'NFT_BALANCES_STDDEV_POPULATION_WALLET_ID_ASC',
  NFT_BALANCES_STDDEV_POPULATION_WALLET_ID_DESC = 'NFT_BALANCES_STDDEV_POPULATION_WALLET_ID_DESC',
  NFT_BALANCES_STDDEV_SAMPLE_BALANCE_ASC = 'NFT_BALANCES_STDDEV_SAMPLE_BALANCE_ASC',
  NFT_BALANCES_STDDEV_SAMPLE_BALANCE_DESC = 'NFT_BALANCES_STDDEV_SAMPLE_BALANCE_DESC',
  NFT_BALANCES_STDDEV_SAMPLE_BLOCK_RANGE_ASC = 'NFT_BALANCES_STDDEV_SAMPLE_BLOCK_RANGE_ASC',
  NFT_BALANCES_STDDEV_SAMPLE_BLOCK_RANGE_DESC = 'NFT_BALANCES_STDDEV_SAMPLE_BLOCK_RANGE_DESC',
  NFT_BALANCES_STDDEV_SAMPLE_ID_ASC = 'NFT_BALANCES_STDDEV_SAMPLE_ID_ASC',
  NFT_BALANCES_STDDEV_SAMPLE_ID_DESC = 'NFT_BALANCES_STDDEV_SAMPLE_ID_DESC',
  NFT_BALANCES_STDDEV_SAMPLE_NFT_ID_ASC = 'NFT_BALANCES_STDDEV_SAMPLE_NFT_ID_ASC',
  NFT_BALANCES_STDDEV_SAMPLE_NFT_ID_DESC = 'NFT_BALANCES_STDDEV_SAMPLE_NFT_ID_DESC',
  NFT_BALANCES_STDDEV_SAMPLE_NFT_TOKEN_ID_ASC = 'NFT_BALANCES_STDDEV_SAMPLE_NFT_TOKEN_ID_ASC',
  NFT_BALANCES_STDDEV_SAMPLE_NFT_TOKEN_ID_DESC = 'NFT_BALANCES_STDDEV_SAMPLE_NFT_TOKEN_ID_DESC',
  NFT_BALANCES_STDDEV_SAMPLE_WALLET_ID_ASC = 'NFT_BALANCES_STDDEV_SAMPLE_WALLET_ID_ASC',
  NFT_BALANCES_STDDEV_SAMPLE_WALLET_ID_DESC = 'NFT_BALANCES_STDDEV_SAMPLE_WALLET_ID_DESC',
  NFT_BALANCES_SUM_BALANCE_ASC = 'NFT_BALANCES_SUM_BALANCE_ASC',
  NFT_BALANCES_SUM_BALANCE_DESC = 'NFT_BALANCES_SUM_BALANCE_DESC',
  NFT_BALANCES_SUM_BLOCK_RANGE_ASC = 'NFT_BALANCES_SUM_BLOCK_RANGE_ASC',
  NFT_BALANCES_SUM_BLOCK_RANGE_DESC = 'NFT_BALANCES_SUM_BLOCK_RANGE_DESC',
  NFT_BALANCES_SUM_ID_ASC = 'NFT_BALANCES_SUM_ID_ASC',
  NFT_BALANCES_SUM_ID_DESC = 'NFT_BALANCES_SUM_ID_DESC',
  NFT_BALANCES_SUM_NFT_ID_ASC = 'NFT_BALANCES_SUM_NFT_ID_ASC',
  NFT_BALANCES_SUM_NFT_ID_DESC = 'NFT_BALANCES_SUM_NFT_ID_DESC',
  NFT_BALANCES_SUM_NFT_TOKEN_ID_ASC = 'NFT_BALANCES_SUM_NFT_TOKEN_ID_ASC',
  NFT_BALANCES_SUM_NFT_TOKEN_ID_DESC = 'NFT_BALANCES_SUM_NFT_TOKEN_ID_DESC',
  NFT_BALANCES_SUM_WALLET_ID_ASC = 'NFT_BALANCES_SUM_WALLET_ID_ASC',
  NFT_BALANCES_SUM_WALLET_ID_DESC = 'NFT_BALANCES_SUM_WALLET_ID_DESC',
  NFT_BALANCES_VARIANCE_POPULATION_BALANCE_ASC = 'NFT_BALANCES_VARIANCE_POPULATION_BALANCE_ASC',
  NFT_BALANCES_VARIANCE_POPULATION_BALANCE_DESC = 'NFT_BALANCES_VARIANCE_POPULATION_BALANCE_DESC',
  NFT_BALANCES_VARIANCE_POPULATION_BLOCK_RANGE_ASC = 'NFT_BALANCES_VARIANCE_POPULATION_BLOCK_RANGE_ASC',
  NFT_BALANCES_VARIANCE_POPULATION_BLOCK_RANGE_DESC = 'NFT_BALANCES_VARIANCE_POPULATION_BLOCK_RANGE_DESC',
  NFT_BALANCES_VARIANCE_POPULATION_ID_ASC = 'NFT_BALANCES_VARIANCE_POPULATION_ID_ASC',
  NFT_BALANCES_VARIANCE_POPULATION_ID_DESC = 'NFT_BALANCES_VARIANCE_POPULATION_ID_DESC',
  NFT_BALANCES_VARIANCE_POPULATION_NFT_ID_ASC = 'NFT_BALANCES_VARIANCE_POPULATION_NFT_ID_ASC',
  NFT_BALANCES_VARIANCE_POPULATION_NFT_ID_DESC = 'NFT_BALANCES_VARIANCE_POPULATION_NFT_ID_DESC',
  NFT_BALANCES_VARIANCE_POPULATION_NFT_TOKEN_ID_ASC = 'NFT_BALANCES_VARIANCE_POPULATION_NFT_TOKEN_ID_ASC',
  NFT_BALANCES_VARIANCE_POPULATION_NFT_TOKEN_ID_DESC = 'NFT_BALANCES_VARIANCE_POPULATION_NFT_TOKEN_ID_DESC',
  NFT_BALANCES_VARIANCE_POPULATION_WALLET_ID_ASC = 'NFT_BALANCES_VARIANCE_POPULATION_WALLET_ID_ASC',
  NFT_BALANCES_VARIANCE_POPULATION_WALLET_ID_DESC = 'NFT_BALANCES_VARIANCE_POPULATION_WALLET_ID_DESC',
  NFT_BALANCES_VARIANCE_SAMPLE_BALANCE_ASC = 'NFT_BALANCES_VARIANCE_SAMPLE_BALANCE_ASC',
  NFT_BALANCES_VARIANCE_SAMPLE_BALANCE_DESC = 'NFT_BALANCES_VARIANCE_SAMPLE_BALANCE_DESC',
  NFT_BALANCES_VARIANCE_SAMPLE_BLOCK_RANGE_ASC = 'NFT_BALANCES_VARIANCE_SAMPLE_BLOCK_RANGE_ASC',
  NFT_BALANCES_VARIANCE_SAMPLE_BLOCK_RANGE_DESC = 'NFT_BALANCES_VARIANCE_SAMPLE_BLOCK_RANGE_DESC',
  NFT_BALANCES_VARIANCE_SAMPLE_ID_ASC = 'NFT_BALANCES_VARIANCE_SAMPLE_ID_ASC',
  NFT_BALANCES_VARIANCE_SAMPLE_ID_DESC = 'NFT_BALANCES_VARIANCE_SAMPLE_ID_DESC',
  NFT_BALANCES_VARIANCE_SAMPLE_NFT_ID_ASC = 'NFT_BALANCES_VARIANCE_SAMPLE_NFT_ID_ASC',
  NFT_BALANCES_VARIANCE_SAMPLE_NFT_ID_DESC = 'NFT_BALANCES_VARIANCE_SAMPLE_NFT_ID_DESC',
  NFT_BALANCES_VARIANCE_SAMPLE_NFT_TOKEN_ID_ASC = 'NFT_BALANCES_VARIANCE_SAMPLE_NFT_TOKEN_ID_ASC',
  NFT_BALANCES_VARIANCE_SAMPLE_NFT_TOKEN_ID_DESC = 'NFT_BALANCES_VARIANCE_SAMPLE_NFT_TOKEN_ID_DESC',
  NFT_BALANCES_VARIANCE_SAMPLE_WALLET_ID_ASC = 'NFT_BALANCES_VARIANCE_SAMPLE_WALLET_ID_ASC',
  NFT_BALANCES_VARIANCE_SAMPLE_WALLET_ID_DESC = 'NFT_BALANCES_VARIANCE_SAMPLE_WALLET_ID_DESC',
  PRIMARY_KEY_ASC = 'PRIMARY_KEY_ASC',
  PRIMARY_KEY_DESC = 'PRIMARY_KEY_DESC',
  TOKEN_ID_ASC = 'TOKEN_ID_ASC',
  TOKEN_ID_DESC = 'TOKEN_ID_DESC'
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
  assetTransfer: Maybe<GqlAssetTransfer>;
  /** Reads a single `AssetTransfer` using its globally unique `ID`. */
  assetTransferByNodeId: Maybe<GqlAssetTransfer>;
  /** Reads and enables pagination through a set of `AssetTransfer`. */
  assetTransfers: Maybe<GqlAssetTransfersConnection>;
  nft: Maybe<GqlNft>;
  nftBalance: Maybe<GqlNftBalance>;
  /** Reads a single `NftBalance` using its globally unique `ID`. */
  nftBalanceByNodeId: Maybe<GqlNftBalance>;
  /** Reads and enables pagination through a set of `NftBalance`. */
  nftBalances: Maybe<GqlNftBalancesConnection>;
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
  tokenBalance: Maybe<GqlTokenBalance>;
  /** Reads a single `TokenBalance` using its globally unique `ID`. */
  tokenBalanceByNodeId: Maybe<GqlTokenBalance>;
  /** Reads and enables pagination through a set of `TokenBalance`. */
  tokenBalances: Maybe<GqlTokenBalancesConnection>;
  tokenContract: Maybe<GqlTokenContract>;
  /** Reads a single `TokenContract` using its globally unique `ID`. */
  tokenContractByNodeId: Maybe<GqlTokenContract>;
  /** Reads and enables pagination through a set of `TokenContract`. */
  tokenContracts: Maybe<GqlTokenContractsConnection>;
  transaction: Maybe<GqlTransaction>;
  /** Reads a single `Transaction` using its globally unique `ID`. */
  transactionByNodeId: Maybe<GqlTransaction>;
  /** Reads and enables pagination through a set of `Transaction`. */
  transactions: Maybe<GqlTransactionsConnection>;
  wallet: Maybe<GqlWallet>;
  /** Reads a single `Wallet` using its globally unique `ID`. */
  walletByNodeId: Maybe<GqlWallet>;
  /** Reads and enables pagination through a set of `Wallet`. */
  wallets: Maybe<GqlWalletsConnection>;
};


/** The root query type which gives access points into the data universe. */
export type GqlQuery_metadataArgs = {
  chainId?: InputMaybe<Scalars['String']['input']>;
};


/** The root query type which gives access points into the data universe. */
export type GqlQuery_metadatasArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
};


/** The root query type which gives access points into the data universe. */
export type GqlQueryassetTransferArgs = {
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type GqlQueryassetTransferByNodeIdArgs = {
  distinct?: InputMaybe<Array<InputMaybe<Gqlasset_transfers_distinct_enum>>>;
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type GqlQueryassetTransfersArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqlasset_transfers_distinct_enum>>>;
  filter?: InputMaybe<GqlAssetTransferFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlAssetTransfersOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
};


/** The root query type which gives access points into the data universe. */
export type GqlQuerynftArgs = {
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type GqlQuerynftBalanceArgs = {
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type GqlQuerynftBalanceByNodeIdArgs = {
  distinct?: InputMaybe<Array<InputMaybe<Gqlnft_balances_distinct_enum>>>;
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type GqlQuerynftBalancesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqlnft_balances_distinct_enum>>>;
  filter?: InputMaybe<GqlNftBalanceFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlNftBalancesOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
};


/** The root query type which gives access points into the data universe. */
export type GqlQuerynftByNodeIdArgs = {
  distinct?: InputMaybe<Array<InputMaybe<Gqlnfts_distinct_enum>>>;
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type GqlQuerynftsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqlnfts_distinct_enum>>>;
  filter?: InputMaybe<GqlNftFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlNftsOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
};


/** The root query type which gives access points into the data universe. */
export type GqlQuerynodeArgs = {
  nodeId: Scalars['ID']['input'];
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
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqltoken_balances_distinct_enum>>>;
  filter?: InputMaybe<GqlTokenBalanceFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlTokenBalancesOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
};


/** The root query type which gives access points into the data universe. */
export type GqlQuerytokenContractArgs = {
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type GqlQuerytokenContractByNodeIdArgs = {
  distinct?: InputMaybe<Array<InputMaybe<Gqltoken_contracts_distinct_enum>>>;
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type GqlQuerytokenContractsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqltoken_contracts_distinct_enum>>>;
  filter?: InputMaybe<GqlTokenContractFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlTokenContractsOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
};


/** The root query type which gives access points into the data universe. */
export type GqlQuerytransactionArgs = {
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type GqlQuerytransactionByNodeIdArgs = {
  distinct?: InputMaybe<Array<InputMaybe<Gqltransactions_distinct_enum>>>;
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type GqlQuerytransactionsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqltransactions_distinct_enum>>>;
  filter?: InputMaybe<GqlTransactionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlTransactionsOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
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
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqlwallets_distinct_enum>>>;
  filter?: InputMaybe<GqlWalletFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlWalletsOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
};

/** A filter to be used against String fields. All fields are combined with a logical ‘and.’ */
export type GqlStringFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['String']['input']>;
  /** Not equal to the specified value, treating null like an ordinary value (case-insensitive). */
  distinctFromInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Ends with the specified string (case-sensitive). */
  endsWith?: InputMaybe<Scalars['String']['input']>;
  /** Ends with the specified string (case-insensitive). */
  endsWithInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['String']['input']>;
  /** Equal to the specified value (case-insensitive). */
  equalToInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['String']['input']>;
  /** Greater than the specified value (case-insensitive). */
  greaterThanInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['String']['input']>;
  /** Greater than or equal to the specified value (case-insensitive). */
  greaterThanOrEqualToInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Included in the specified list (case-insensitive). */
  inInsensitive?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Contains the specified string (case-sensitive). */
  includes?: InputMaybe<Scalars['String']['input']>;
  /** Contains the specified string (case-insensitive). */
  includesInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['String']['input']>;
  /** Less than the specified value (case-insensitive). */
  lessThanInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['String']['input']>;
  /** Less than or equal to the specified value (case-insensitive). */
  lessThanOrEqualToInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Matches the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  like?: InputMaybe<Scalars['String']['input']>;
  /** Matches the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  likeInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['String']['input']>;
  /** Equal to the specified value, treating null like an ordinary value (case-insensitive). */
  notDistinctFromInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Does not end with the specified string (case-sensitive). */
  notEndsWith?: InputMaybe<Scalars['String']['input']>;
  /** Does not end with the specified string (case-insensitive). */
  notEndsWithInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['String']['input']>;
  /** Not equal to the specified value (case-insensitive). */
  notEqualToInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Not included in the specified list (case-insensitive). */
  notInInsensitive?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Does not contain the specified string (case-sensitive). */
  notIncludes?: InputMaybe<Scalars['String']['input']>;
  /** Does not contain the specified string (case-insensitive). */
  notIncludesInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Does not match the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLike?: InputMaybe<Scalars['String']['input']>;
  /** Does not match the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLikeInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Does not start with the specified string (case-sensitive). */
  notStartsWith?: InputMaybe<Scalars['String']['input']>;
  /** Does not start with the specified string (case-insensitive). */
  notStartsWithInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Starts with the specified string (case-sensitive). */
  startsWith?: InputMaybe<Scalars['String']['input']>;
  /** Starts with the specified string (case-insensitive). */
  startsWithInsensitive?: InputMaybe<Scalars['String']['input']>;
};

/** The root subscription type: contains realtime events you can subscribe to with the `subscription` operation. */
export type GqlSubscription = {
  assetTransfers: Maybe<GqlSubscriptionPayload>;
  nftBalances: Maybe<GqlSubscriptionPayload>;
  nfts: Maybe<GqlSubscriptionPayload>;
  tokenBalances: Maybe<GqlSubscriptionPayload>;
  tokenContracts: Maybe<GqlSubscriptionPayload>;
  transactions: Maybe<GqlSubscriptionPayload>;
  wallets: Maybe<GqlSubscriptionPayload>;
};


/** The root subscription type: contains realtime events you can subscribe to with the `subscription` operation. */
export type GqlSubscriptionassetTransfersArgs = {
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
  mutation?: InputMaybe<Array<GqlMutationType>>;
};


/** The root subscription type: contains realtime events you can subscribe to with the `subscription` operation. */
export type GqlSubscriptionnftBalancesArgs = {
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
  mutation?: InputMaybe<Array<GqlMutationType>>;
};


/** The root subscription type: contains realtime events you can subscribe to with the `subscription` operation. */
export type GqlSubscriptionnftsArgs = {
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
  mutation?: InputMaybe<Array<GqlMutationType>>;
};


/** The root subscription type: contains realtime events you can subscribe to with the `subscription` operation. */
export type GqlSubscriptiontokenBalancesArgs = {
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
  mutation?: InputMaybe<Array<GqlMutationType>>;
};


/** The root subscription type: contains realtime events you can subscribe to with the `subscription` operation. */
export type GqlSubscriptiontokenContractsArgs = {
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
  mutation?: InputMaybe<Array<GqlMutationType>>;
};


/** The root subscription type: contains realtime events you can subscribe to with the `subscription` operation. */
export type GqlSubscriptiontransactionsArgs = {
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
  mutation?: InputMaybe<Array<GqlMutationType>>;
};


/** The root subscription type: contains realtime events you can subscribe to with the `subscription` operation. */
export type GqlSubscriptionwalletsArgs = {
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
  mutation?: InputMaybe<Array<GqlMutationType>>;
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

export type GqlTokenBalance = GqlNode & {
  balance: Scalars['BigFloat']['output'];
  id: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads a single `TokenContract` that is related to this `TokenBalance`. */
  token: Maybe<GqlTokenContract>;
  tokenId: Scalars['String']['output'];
  tokenName: Maybe<Scalars['String']['output']>;
  tokenSymbol: Maybe<Scalars['String']['output']>;
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
  average?: InputMaybe<GqlTokenBalanceAverageAggregateFilter>;
  /** Distinct count aggregate over matching `TokenBalance` objects. */
  distinctCount?: InputMaybe<GqlTokenBalanceDistinctCountAggregateFilter>;
  /** A filter that must pass for the relevant `TokenBalance` object to be included within the aggregate. */
  filter?: InputMaybe<GqlTokenBalanceFilter>;
  /** Maximum aggregate over matching `TokenBalance` objects. */
  max?: InputMaybe<GqlTokenBalanceMaxAggregateFilter>;
  /** Minimum aggregate over matching `TokenBalance` objects. */
  min?: InputMaybe<GqlTokenBalanceMinAggregateFilter>;
  /** Population standard deviation aggregate over matching `TokenBalance` objects. */
  stddevPopulation?: InputMaybe<GqlTokenBalanceStddevPopulationAggregateFilter>;
  /** Sample standard deviation aggregate over matching `TokenBalance` objects. */
  stddevSample?: InputMaybe<GqlTokenBalanceStddevSampleAggregateFilter>;
  /** Sum aggregate over matching `TokenBalance` objects. */
  sum?: InputMaybe<GqlTokenBalanceSumAggregateFilter>;
  /** Population variance aggregate over matching `TokenBalance` objects. */
  variancePopulation?: InputMaybe<GqlTokenBalanceVariancePopulationAggregateFilter>;
  /** Sample variance aggregate over matching `TokenBalance` objects. */
  varianceSample?: InputMaybe<GqlTokenBalanceVarianceSampleAggregateFilter>;
};

export type GqlTokenBalanceAverageAggregateFilter = {
  balance?: InputMaybe<GqlBigFloatFilter>;
};

export type GqlTokenBalanceAverageAggregates = {
  /** Mean average of balance across the matching connection */
  balance: Maybe<Scalars['BigFloat']['output']>;
};

export type GqlTokenBalanceDistinctCountAggregateFilter = {
  _blockRange?: InputMaybe<GqlBigIntFilter>;
  _id?: InputMaybe<GqlBigIntFilter>;
  balance?: InputMaybe<GqlBigIntFilter>;
  id?: InputMaybe<GqlBigIntFilter>;
  tokenId?: InputMaybe<GqlBigIntFilter>;
  tokenName?: InputMaybe<GqlBigIntFilter>;
  tokenSymbol?: InputMaybe<GqlBigIntFilter>;
  walletId?: InputMaybe<GqlBigIntFilter>;
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
  /** Distinct count of tokenName across the matching connection */
  tokenName: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of tokenSymbol across the matching connection */
  tokenSymbol: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of walletId across the matching connection */
  walletId: Maybe<Scalars['BigInt']['output']>;
};

/** A filter to be used against `TokenBalance` object types. All fields are combined with a logical ‘and.’ */
export type GqlTokenBalanceFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<GqlTokenBalanceFilter>>;
  /** Filter by the object’s `balance` field. */
  balance?: InputMaybe<GqlBigFloatFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<GqlStringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<GqlTokenBalanceFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<GqlTokenBalanceFilter>>;
  /** Filter by the object’s `token` relation. */
  token?: InputMaybe<GqlTokenContractFilter>;
  /** Filter by the object’s `tokenId` field. */
  tokenId?: InputMaybe<GqlStringFilter>;
  /** Filter by the object’s `tokenName` field. */
  tokenName?: InputMaybe<GqlStringFilter>;
  /** Filter by the object’s `tokenSymbol` field. */
  tokenSymbol?: InputMaybe<GqlStringFilter>;
  /** Filter by the object’s `wallet` relation. */
  wallet?: InputMaybe<GqlWalletFilter>;
  /** Filter by the object’s `walletId` field. */
  walletId?: InputMaybe<GqlStringFilter>;
};

export type GqlTokenBalanceMaxAggregateFilter = {
  balance?: InputMaybe<GqlBigFloatFilter>;
};

export type GqlTokenBalanceMaxAggregates = {
  /** Maximum of balance across the matching connection */
  balance: Maybe<Scalars['BigFloat']['output']>;
};

export type GqlTokenBalanceMinAggregateFilter = {
  balance?: InputMaybe<GqlBigFloatFilter>;
};

export type GqlTokenBalanceMinAggregates = {
  /** Minimum of balance across the matching connection */
  balance: Maybe<Scalars['BigFloat']['output']>;
};

export type GqlTokenBalanceStddevPopulationAggregateFilter = {
  balance?: InputMaybe<GqlBigFloatFilter>;
};

export type GqlTokenBalanceStddevPopulationAggregates = {
  /** Population standard deviation of balance across the matching connection */
  balance: Maybe<Scalars['BigFloat']['output']>;
};

export type GqlTokenBalanceStddevSampleAggregateFilter = {
  balance?: InputMaybe<GqlBigFloatFilter>;
};

export type GqlTokenBalanceStddevSampleAggregates = {
  /** Sample standard deviation of balance across the matching connection */
  balance: Maybe<Scalars['BigFloat']['output']>;
};

export type GqlTokenBalanceSumAggregateFilter = {
  balance?: InputMaybe<GqlBigFloatFilter>;
};

export type GqlTokenBalanceSumAggregates = {
  /** Sum of balance across the matching connection */
  balance: Scalars['BigFloat']['output'];
};

export type GqlTokenBalanceVariancePopulationAggregateFilter = {
  balance?: InputMaybe<GqlBigFloatFilter>;
};

export type GqlTokenBalanceVariancePopulationAggregates = {
  /** Population variance of balance across the matching connection */
  balance: Maybe<Scalars['BigFloat']['output']>;
};

export type GqlTokenBalanceVarianceSampleAggregateFilter = {
  balance?: InputMaybe<GqlBigFloatFilter>;
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
  having?: InputMaybe<GqlTokenBalancesHavingInput>;
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
  TOKEN_NAME = 'TOKEN_NAME',
  TOKEN_SYMBOL = 'TOKEN_SYMBOL',
  WALLET_ID = 'WALLET_ID'
}

export type GqlTokenBalancesHavingAverageInput = {
  balance?: InputMaybe<GqlHavingBigfloatFilter>;
};

export type GqlTokenBalancesHavingDistinctCountInput = {
  balance?: InputMaybe<GqlHavingBigfloatFilter>;
};

/** Conditions for `TokenBalance` aggregates. */
export type GqlTokenBalancesHavingInput = {
  AND?: InputMaybe<Array<GqlTokenBalancesHavingInput>>;
  OR?: InputMaybe<Array<GqlTokenBalancesHavingInput>>;
  average?: InputMaybe<GqlTokenBalancesHavingAverageInput>;
  distinctCount?: InputMaybe<GqlTokenBalancesHavingDistinctCountInput>;
  max?: InputMaybe<GqlTokenBalancesHavingMaxInput>;
  min?: InputMaybe<GqlTokenBalancesHavingMinInput>;
  stddevPopulation?: InputMaybe<GqlTokenBalancesHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<GqlTokenBalancesHavingStddevSampleInput>;
  sum?: InputMaybe<GqlTokenBalancesHavingSumInput>;
  variancePopulation?: InputMaybe<GqlTokenBalancesHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<GqlTokenBalancesHavingVarianceSampleInput>;
};

export type GqlTokenBalancesHavingMaxInput = {
  balance?: InputMaybe<GqlHavingBigfloatFilter>;
};

export type GqlTokenBalancesHavingMinInput = {
  balance?: InputMaybe<GqlHavingBigfloatFilter>;
};

export type GqlTokenBalancesHavingStddevPopulationInput = {
  balance?: InputMaybe<GqlHavingBigfloatFilter>;
};

export type GqlTokenBalancesHavingStddevSampleInput = {
  balance?: InputMaybe<GqlHavingBigfloatFilter>;
};

export type GqlTokenBalancesHavingSumInput = {
  balance?: InputMaybe<GqlHavingBigfloatFilter>;
};

export type GqlTokenBalancesHavingVariancePopulationInput = {
  balance?: InputMaybe<GqlHavingBigfloatFilter>;
};

export type GqlTokenBalancesHavingVarianceSampleInput = {
  balance?: InputMaybe<GqlHavingBigfloatFilter>;
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
  TOKEN_NAME_ASC = 'TOKEN_NAME_ASC',
  TOKEN_NAME_DESC = 'TOKEN_NAME_DESC',
  TOKEN_SYMBOL_ASC = 'TOKEN_SYMBOL_ASC',
  TOKEN_SYMBOL_DESC = 'TOKEN_SYMBOL_DESC',
  WALLET_ID_ASC = 'WALLET_ID_ASC',
  WALLET_ID_DESC = 'WALLET_ID_DESC'
}

export type GqlTokenContract = GqlNode & {
  /** Reads and enables pagination through a set of `AssetTransfer`. */
  assetTransfersByTokenId: GqlAssetTransfersConnection;
  decimals: Maybe<Scalars['Int']['output']>;
  iconUrl: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `Nft`. */
  nftsByAssetTransferTokenIdAndNftId: GqlTokenContractNftsByAssetTransferTokenIdAndNftIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Nft`. */
  nftsByCollectionId: GqlNftsConnection;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  symbol: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `TokenBalance`. */
  tokenBalancesByTokenId: GqlTokenBalancesConnection;
  /** Reads and enables pagination through a set of `Transaction`. */
  transactionsByAssetTransferTokenIdAndTransactionId: GqlTokenContractTransactionsByAssetTransferTokenIdAndTransactionIdManyToManyConnection;
  type: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `Wallet`. */
  walletsByAssetTransferTokenIdAndFromId: GqlTokenContractWalletsByAssetTransferTokenIdAndFromIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Wallet`. */
  walletsByAssetTransferTokenIdAndToId: GqlTokenContractWalletsByAssetTransferTokenIdAndToIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Wallet`. */
  walletsByTokenBalanceTokenIdAndWalletId: GqlTokenContractWalletsByTokenBalanceTokenIdAndWalletIdManyToManyConnection;
};


export type GqlTokenContractassetTransfersByTokenIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqlasset_transfers_distinct_enum>>>;
  filter?: InputMaybe<GqlAssetTransferFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlAssetTransfersOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
};


export type GqlTokenContractnftsByAssetTransferTokenIdAndNftIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqlnfts_distinct_enum>>>;
  filter?: InputMaybe<GqlNftFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlNftsOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
};


export type GqlTokenContractnftsByCollectionIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqlnfts_distinct_enum>>>;
  filter?: InputMaybe<GqlNftFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlNftsOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
};


export type GqlTokenContracttokenBalancesByTokenIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqltoken_balances_distinct_enum>>>;
  filter?: InputMaybe<GqlTokenBalanceFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlTokenBalancesOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
};


export type GqlTokenContracttransactionsByAssetTransferTokenIdAndTransactionIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqltransactions_distinct_enum>>>;
  filter?: InputMaybe<GqlTransactionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlTransactionsOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
};


export type GqlTokenContractwalletsByAssetTransferTokenIdAndFromIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqlwallets_distinct_enum>>>;
  filter?: InputMaybe<GqlWalletFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlWalletsOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
};


export type GqlTokenContractwalletsByAssetTransferTokenIdAndToIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqlwallets_distinct_enum>>>;
  filter?: InputMaybe<GqlWalletFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlWalletsOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
};


export type GqlTokenContractwalletsByTokenBalanceTokenIdAndWalletIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqlwallets_distinct_enum>>>;
  filter?: InputMaybe<GqlWalletFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlWalletsOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
};

export type GqlTokenContractAggregates = {
  /** Mean average aggregates across the matching connection (ignoring before/after/first/last/offset) */
  average: Maybe<GqlTokenContractAverageAggregates>;
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount: Maybe<GqlTokenContractDistinctCountAggregates>;
  keys: Maybe<Array<Scalars['String']['output']>>;
  /** Maximum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  max: Maybe<GqlTokenContractMaxAggregates>;
  /** Minimum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  min: Maybe<GqlTokenContractMinAggregates>;
  /** Population standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevPopulation: Maybe<GqlTokenContractStddevPopulationAggregates>;
  /** Sample standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevSample: Maybe<GqlTokenContractStddevSampleAggregates>;
  /** Sum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  sum: Maybe<GqlTokenContractSumAggregates>;
  /** Population variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  variancePopulation: Maybe<GqlTokenContractVariancePopulationAggregates>;
  /** Sample variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  varianceSample: Maybe<GqlTokenContractVarianceSampleAggregates>;
};

export type GqlTokenContractAverageAggregates = {
  /** Mean average of decimals across the matching connection */
  decimals: Maybe<Scalars['BigFloat']['output']>;
};

export type GqlTokenContractDistinctCountAggregates = {
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

/** A filter to be used against `TokenContract` object types. All fields are combined with a logical ‘and.’ */
export type GqlTokenContractFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<GqlTokenContractFilter>>;
  /** Filter by the object’s `assetTransfersByTokenId` relation. */
  assetTransfersByTokenId?: InputMaybe<GqlTokenContractToManyAssetTransferFilter>;
  /** Some related `assetTransfersByTokenId` exist. */
  assetTransfersByTokenIdExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `decimals` field. */
  decimals?: InputMaybe<GqlIntFilter>;
  /** Filter by the object’s `iconUrl` field. */
  iconUrl?: InputMaybe<GqlStringFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<GqlStringFilter>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<GqlStringFilter>;
  /** Filter by the object’s `nftsByCollectionId` relation. */
  nftsByCollectionId?: InputMaybe<GqlTokenContractToManyNftFilter>;
  /** Some related `nftsByCollectionId` exist. */
  nftsByCollectionIdExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Negates the expression. */
  not?: InputMaybe<GqlTokenContractFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<GqlTokenContractFilter>>;
  /** Filter by the object’s `symbol` field. */
  symbol?: InputMaybe<GqlStringFilter>;
  /** Filter by the object’s `tokenBalancesByTokenId` relation. */
  tokenBalancesByTokenId?: InputMaybe<GqlTokenContractToManyTokenBalanceFilter>;
  /** Some related `tokenBalancesByTokenId` exist. */
  tokenBalancesByTokenIdExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `type` field. */
  type?: InputMaybe<GqlStringFilter>;
};

export type GqlTokenContractMaxAggregates = {
  /** Maximum of decimals across the matching connection */
  decimals: Maybe<Scalars['Int']['output']>;
};

export type GqlTokenContractMinAggregates = {
  /** Minimum of decimals across the matching connection */
  decimals: Maybe<Scalars['Int']['output']>;
};

/** A connection to a list of `Nft` values, with data from `AssetTransfer`. */
export type GqlTokenContractNftsByAssetTransferTokenIdAndNftIdManyToManyConnection = {
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates: Maybe<GqlNftAggregates>;
  /** A list of edges which contains the `Nft`, info from the `AssetTransfer`, and the cursor to aid in pagination. */
  edges: Array<GqlTokenContractNftsByAssetTransferTokenIdAndNftIdManyToManyEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates: Maybe<Array<GqlNftAggregates>>;
  /** A list of `Nft` objects. */
  nodes: Array<Maybe<GqlNft>>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
  /** The count of *all* `Nft` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `Nft` values, with data from `AssetTransfer`. */
export type GqlTokenContractNftsByAssetTransferTokenIdAndNftIdManyToManyConnectiongroupedAggregatesArgs = {
  groupBy: Array<GqlNftsGroupBy>;
  having?: InputMaybe<GqlNftsHavingInput>;
};

/** A `Nft` edge in the connection, with data from `AssetTransfer`. */
export type GqlTokenContractNftsByAssetTransferTokenIdAndNftIdManyToManyEdge = {
  /** Reads and enables pagination through a set of `AssetTransfer`. */
  assetTransfers: GqlAssetTransfersConnection;
  /** A cursor for use in pagination. */
  cursor: Maybe<Scalars['Cursor']['output']>;
  /** The `Nft` at the end of the edge. */
  node: Maybe<GqlNft>;
};


/** A `Nft` edge in the connection, with data from `AssetTransfer`. */
export type GqlTokenContractNftsByAssetTransferTokenIdAndNftIdManyToManyEdgeassetTransfersArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqlasset_transfers_distinct_enum>>>;
  filter?: InputMaybe<GqlAssetTransferFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlAssetTransfersOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
};

export type GqlTokenContractStddevPopulationAggregates = {
  /** Population standard deviation of decimals across the matching connection */
  decimals: Maybe<Scalars['BigFloat']['output']>;
};

export type GqlTokenContractStddevSampleAggregates = {
  /** Sample standard deviation of decimals across the matching connection */
  decimals: Maybe<Scalars['BigFloat']['output']>;
};

export type GqlTokenContractSumAggregates = {
  /** Sum of decimals across the matching connection */
  decimals: Scalars['BigInt']['output'];
};

/** A filter to be used against many `AssetTransfer` object types. All fields are combined with a logical ‘and.’ */
export type GqlTokenContractToManyAssetTransferFilter = {
  /** Aggregates across related `AssetTransfer` match the filter criteria. */
  aggregates?: InputMaybe<GqlAssetTransferAggregatesFilter>;
  /** Every related `AssetTransfer` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<GqlAssetTransferFilter>;
  /** No related `AssetTransfer` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<GqlAssetTransferFilter>;
  /** Some related `AssetTransfer` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<GqlAssetTransferFilter>;
};

/** A filter to be used against many `Nft` object types. All fields are combined with a logical ‘and.’ */
export type GqlTokenContractToManyNftFilter = {
  /** Aggregates across related `Nft` match the filter criteria. */
  aggregates?: InputMaybe<GqlNftAggregatesFilter>;
  /** Every related `Nft` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<GqlNftFilter>;
  /** No related `Nft` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<GqlNftFilter>;
  /** Some related `Nft` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<GqlNftFilter>;
};

/** A filter to be used against many `TokenBalance` object types. All fields are combined with a logical ‘and.’ */
export type GqlTokenContractToManyTokenBalanceFilter = {
  /** Aggregates across related `TokenBalance` match the filter criteria. */
  aggregates?: InputMaybe<GqlTokenBalanceAggregatesFilter>;
  /** Every related `TokenBalance` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<GqlTokenBalanceFilter>;
  /** No related `TokenBalance` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<GqlTokenBalanceFilter>;
  /** Some related `TokenBalance` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<GqlTokenBalanceFilter>;
};

/** A connection to a list of `Transaction` values, with data from `AssetTransfer`. */
export type GqlTokenContractTransactionsByAssetTransferTokenIdAndTransactionIdManyToManyConnection = {
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates: Maybe<GqlTransactionAggregates>;
  /** A list of edges which contains the `Transaction`, info from the `AssetTransfer`, and the cursor to aid in pagination. */
  edges: Array<GqlTokenContractTransactionsByAssetTransferTokenIdAndTransactionIdManyToManyEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates: Maybe<Array<GqlTransactionAggregates>>;
  /** A list of `Transaction` objects. */
  nodes: Array<Maybe<GqlTransaction>>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
  /** The count of *all* `Transaction` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `Transaction` values, with data from `AssetTransfer`. */
export type GqlTokenContractTransactionsByAssetTransferTokenIdAndTransactionIdManyToManyConnectiongroupedAggregatesArgs = {
  groupBy: Array<GqlTransactionsGroupBy>;
  having?: InputMaybe<GqlTransactionsHavingInput>;
};

/** A `Transaction` edge in the connection, with data from `AssetTransfer`. */
export type GqlTokenContractTransactionsByAssetTransferTokenIdAndTransactionIdManyToManyEdge = {
  /** Reads and enables pagination through a set of `AssetTransfer`. */
  assetTransfers: GqlAssetTransfersConnection;
  /** A cursor for use in pagination. */
  cursor: Maybe<Scalars['Cursor']['output']>;
  /** The `Transaction` at the end of the edge. */
  node: Maybe<GqlTransaction>;
};


/** A `Transaction` edge in the connection, with data from `AssetTransfer`. */
export type GqlTokenContractTransactionsByAssetTransferTokenIdAndTransactionIdManyToManyEdgeassetTransfersArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqlasset_transfers_distinct_enum>>>;
  filter?: InputMaybe<GqlAssetTransferFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlAssetTransfersOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
};

export type GqlTokenContractVariancePopulationAggregates = {
  /** Population variance of decimals across the matching connection */
  decimals: Maybe<Scalars['BigFloat']['output']>;
};

export type GqlTokenContractVarianceSampleAggregates = {
  /** Sample variance of decimals across the matching connection */
  decimals: Maybe<Scalars['BigFloat']['output']>;
};

/** A connection to a list of `Wallet` values, with data from `AssetTransfer`. */
export type GqlTokenContractWalletsByAssetTransferTokenIdAndFromIdManyToManyConnection = {
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates: Maybe<GqlWalletAggregates>;
  /** A list of edges which contains the `Wallet`, info from the `AssetTransfer`, and the cursor to aid in pagination. */
  edges: Array<GqlTokenContractWalletsByAssetTransferTokenIdAndFromIdManyToManyEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates: Maybe<Array<GqlWalletAggregates>>;
  /** A list of `Wallet` objects. */
  nodes: Array<Maybe<GqlWallet>>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
  /** The count of *all* `Wallet` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `Wallet` values, with data from `AssetTransfer`. */
export type GqlTokenContractWalletsByAssetTransferTokenIdAndFromIdManyToManyConnectiongroupedAggregatesArgs = {
  groupBy: Array<GqlWalletsGroupBy>;
  having?: InputMaybe<GqlWalletsHavingInput>;
};

/** A `Wallet` edge in the connection, with data from `AssetTransfer`. */
export type GqlTokenContractWalletsByAssetTransferTokenIdAndFromIdManyToManyEdge = {
  /** Reads and enables pagination through a set of `AssetTransfer`. */
  assetTransfersByFromId: GqlAssetTransfersConnection;
  /** A cursor for use in pagination. */
  cursor: Maybe<Scalars['Cursor']['output']>;
  /** The `Wallet` at the end of the edge. */
  node: Maybe<GqlWallet>;
};


/** A `Wallet` edge in the connection, with data from `AssetTransfer`. */
export type GqlTokenContractWalletsByAssetTransferTokenIdAndFromIdManyToManyEdgeassetTransfersByFromIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqlasset_transfers_distinct_enum>>>;
  filter?: InputMaybe<GqlAssetTransferFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlAssetTransfersOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
};

/** A connection to a list of `Wallet` values, with data from `AssetTransfer`. */
export type GqlTokenContractWalletsByAssetTransferTokenIdAndToIdManyToManyConnection = {
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates: Maybe<GqlWalletAggregates>;
  /** A list of edges which contains the `Wallet`, info from the `AssetTransfer`, and the cursor to aid in pagination. */
  edges: Array<GqlTokenContractWalletsByAssetTransferTokenIdAndToIdManyToManyEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates: Maybe<Array<GqlWalletAggregates>>;
  /** A list of `Wallet` objects. */
  nodes: Array<Maybe<GqlWallet>>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
  /** The count of *all* `Wallet` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `Wallet` values, with data from `AssetTransfer`. */
export type GqlTokenContractWalletsByAssetTransferTokenIdAndToIdManyToManyConnectiongroupedAggregatesArgs = {
  groupBy: Array<GqlWalletsGroupBy>;
  having?: InputMaybe<GqlWalletsHavingInput>;
};

/** A `Wallet` edge in the connection, with data from `AssetTransfer`. */
export type GqlTokenContractWalletsByAssetTransferTokenIdAndToIdManyToManyEdge = {
  /** Reads and enables pagination through a set of `AssetTransfer`. */
  assetTransfersByToId: GqlAssetTransfersConnection;
  /** A cursor for use in pagination. */
  cursor: Maybe<Scalars['Cursor']['output']>;
  /** The `Wallet` at the end of the edge. */
  node: Maybe<GqlWallet>;
};


/** A `Wallet` edge in the connection, with data from `AssetTransfer`. */
export type GqlTokenContractWalletsByAssetTransferTokenIdAndToIdManyToManyEdgeassetTransfersByToIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqlasset_transfers_distinct_enum>>>;
  filter?: InputMaybe<GqlAssetTransferFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlAssetTransfersOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
};

/** A connection to a list of `Wallet` values, with data from `TokenBalance`. */
export type GqlTokenContractWalletsByTokenBalanceTokenIdAndWalletIdManyToManyConnection = {
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates: Maybe<GqlWalletAggregates>;
  /** A list of edges which contains the `Wallet`, info from the `TokenBalance`, and the cursor to aid in pagination. */
  edges: Array<GqlTokenContractWalletsByTokenBalanceTokenIdAndWalletIdManyToManyEdge>;
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
export type GqlTokenContractWalletsByTokenBalanceTokenIdAndWalletIdManyToManyConnectiongroupedAggregatesArgs = {
  groupBy: Array<GqlWalletsGroupBy>;
  having?: InputMaybe<GqlWalletsHavingInput>;
};

/** A `Wallet` edge in the connection, with data from `TokenBalance`. */
export type GqlTokenContractWalletsByTokenBalanceTokenIdAndWalletIdManyToManyEdge = {
  /** A cursor for use in pagination. */
  cursor: Maybe<Scalars['Cursor']['output']>;
  /** The `Wallet` at the end of the edge. */
  node: Maybe<GqlWallet>;
  /** Reads and enables pagination through a set of `TokenBalance`. */
  tokens: GqlTokenBalancesConnection;
};


/** A `Wallet` edge in the connection, with data from `TokenBalance`. */
export type GqlTokenContractWalletsByTokenBalanceTokenIdAndWalletIdManyToManyEdgetokensArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqltoken_balances_distinct_enum>>>;
  filter?: InputMaybe<GqlTokenBalanceFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlTokenBalancesOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
};

/** A connection to a list of `TokenContract` values. */
export type GqlTokenContractsConnection = {
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates: Maybe<GqlTokenContractAggregates>;
  /** A list of edges which contains the `TokenContract` and cursor to aid in pagination. */
  edges: Array<GqlTokenContractsEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates: Maybe<Array<GqlTokenContractAggregates>>;
  /** A list of `TokenContract` objects. */
  nodes: Array<Maybe<GqlTokenContract>>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
  /** The count of *all* `TokenContract` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `TokenContract` values. */
export type GqlTokenContractsConnectiongroupedAggregatesArgs = {
  groupBy: Array<GqlTokenContractsGroupBy>;
  having?: InputMaybe<GqlTokenContractsHavingInput>;
};

/** A `TokenContract` edge in the connection. */
export type GqlTokenContractsEdge = {
  /** A cursor for use in pagination. */
  cursor: Maybe<Scalars['Cursor']['output']>;
  /** The `TokenContract` at the end of the edge. */
  node: Maybe<GqlTokenContract>;
};

/** Grouping methods for `TokenContract` for usage during aggregation. */
export enum GqlTokenContractsGroupBy {
  DECIMALS = 'DECIMALS',
  ICON_URL = 'ICON_URL',
  ID = 'ID',
  NAME = 'NAME',
  SYMBOL = 'SYMBOL',
  TYPE = 'TYPE'
}

export type GqlTokenContractsHavingAverageInput = {
  decimals?: InputMaybe<GqlHavingIntFilter>;
};

export type GqlTokenContractsHavingDistinctCountInput = {
  decimals?: InputMaybe<GqlHavingIntFilter>;
};

/** Conditions for `TokenContract` aggregates. */
export type GqlTokenContractsHavingInput = {
  AND?: InputMaybe<Array<GqlTokenContractsHavingInput>>;
  OR?: InputMaybe<Array<GqlTokenContractsHavingInput>>;
  average?: InputMaybe<GqlTokenContractsHavingAverageInput>;
  distinctCount?: InputMaybe<GqlTokenContractsHavingDistinctCountInput>;
  max?: InputMaybe<GqlTokenContractsHavingMaxInput>;
  min?: InputMaybe<GqlTokenContractsHavingMinInput>;
  stddevPopulation?: InputMaybe<GqlTokenContractsHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<GqlTokenContractsHavingStddevSampleInput>;
  sum?: InputMaybe<GqlTokenContractsHavingSumInput>;
  variancePopulation?: InputMaybe<GqlTokenContractsHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<GqlTokenContractsHavingVarianceSampleInput>;
};

export type GqlTokenContractsHavingMaxInput = {
  decimals?: InputMaybe<GqlHavingIntFilter>;
};

export type GqlTokenContractsHavingMinInput = {
  decimals?: InputMaybe<GqlHavingIntFilter>;
};

export type GqlTokenContractsHavingStddevPopulationInput = {
  decimals?: InputMaybe<GqlHavingIntFilter>;
};

export type GqlTokenContractsHavingStddevSampleInput = {
  decimals?: InputMaybe<GqlHavingIntFilter>;
};

export type GqlTokenContractsHavingSumInput = {
  decimals?: InputMaybe<GqlHavingIntFilter>;
};

export type GqlTokenContractsHavingVariancePopulationInput = {
  decimals?: InputMaybe<GqlHavingIntFilter>;
};

export type GqlTokenContractsHavingVarianceSampleInput = {
  decimals?: InputMaybe<GqlHavingIntFilter>;
};

/** Methods to use when ordering `TokenContract`. */
export enum GqlTokenContractsOrderBy {
  ASSET_TRANSFERS_BY_TOKEN_ID_AVERAGE_BLOCK_RANGE_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_AVERAGE_BLOCK_RANGE_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_AVERAGE_BLOCK_RANGE_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_AVERAGE_BLOCK_RANGE_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_AVERAGE_FROM_ID_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_AVERAGE_FROM_ID_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_AVERAGE_FROM_ID_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_AVERAGE_FROM_ID_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_AVERAGE_ID_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_AVERAGE_ID_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_AVERAGE_ID_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_AVERAGE_ID_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_AVERAGE_NFT_ID_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_AVERAGE_NFT_ID_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_AVERAGE_NFT_ID_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_AVERAGE_NFT_ID_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_AVERAGE_TOKEN_ID_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_AVERAGE_TOKEN_ID_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_AVERAGE_TOKEN_ID_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_AVERAGE_TOKEN_ID_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_AVERAGE_TO_ID_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_AVERAGE_TO_ID_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_AVERAGE_TO_ID_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_AVERAGE_TO_ID_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_AVERAGE_TRANSACTION_BLOCK_NUMBER_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_AVERAGE_TRANSACTION_BLOCK_NUMBER_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_AVERAGE_TRANSACTION_BLOCK_NUMBER_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_AVERAGE_TRANSACTION_BLOCK_NUMBER_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_AVERAGE_TRANSACTION_ID_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_AVERAGE_TRANSACTION_ID_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_AVERAGE_TRANSACTION_ID_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_AVERAGE_TRANSACTION_ID_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_AVERAGE_TYPE_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_AVERAGE_TYPE_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_AVERAGE_TYPE_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_AVERAGE_TYPE_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_AVERAGE_VALUE_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_AVERAGE_VALUE_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_AVERAGE_VALUE_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_AVERAGE_VALUE_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_COUNT_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_COUNT_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_COUNT_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_COUNT_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_DISTINCT_COUNT_BLOCK_RANGE_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_DISTINCT_COUNT_BLOCK_RANGE_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_DISTINCT_COUNT_BLOCK_RANGE_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_DISTINCT_COUNT_BLOCK_RANGE_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_DISTINCT_COUNT_FROM_ID_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_DISTINCT_COUNT_FROM_ID_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_DISTINCT_COUNT_FROM_ID_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_DISTINCT_COUNT_FROM_ID_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_DISTINCT_COUNT_ID_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_DISTINCT_COUNT_ID_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_DISTINCT_COUNT_ID_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_DISTINCT_COUNT_ID_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_DISTINCT_COUNT_NFT_ID_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_DISTINCT_COUNT_NFT_ID_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_DISTINCT_COUNT_NFT_ID_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_DISTINCT_COUNT_NFT_ID_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_DISTINCT_COUNT_TOKEN_ID_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_DISTINCT_COUNT_TOKEN_ID_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_DISTINCT_COUNT_TOKEN_ID_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_DISTINCT_COUNT_TOKEN_ID_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_DISTINCT_COUNT_TO_ID_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_DISTINCT_COUNT_TO_ID_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_DISTINCT_COUNT_TO_ID_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_DISTINCT_COUNT_TO_ID_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_DISTINCT_COUNT_TRANSACTION_BLOCK_NUMBER_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_DISTINCT_COUNT_TRANSACTION_BLOCK_NUMBER_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_DISTINCT_COUNT_TRANSACTION_BLOCK_NUMBER_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_DISTINCT_COUNT_TRANSACTION_BLOCK_NUMBER_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_DISTINCT_COUNT_TRANSACTION_ID_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_DISTINCT_COUNT_TRANSACTION_ID_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_DISTINCT_COUNT_TRANSACTION_ID_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_DISTINCT_COUNT_TRANSACTION_ID_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_DISTINCT_COUNT_TYPE_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_DISTINCT_COUNT_TYPE_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_DISTINCT_COUNT_TYPE_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_DISTINCT_COUNT_TYPE_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_DISTINCT_COUNT_VALUE_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_DISTINCT_COUNT_VALUE_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_DISTINCT_COUNT_VALUE_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_DISTINCT_COUNT_VALUE_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_MAX_BLOCK_RANGE_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_MAX_BLOCK_RANGE_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_MAX_BLOCK_RANGE_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_MAX_BLOCK_RANGE_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_MAX_FROM_ID_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_MAX_FROM_ID_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_MAX_FROM_ID_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_MAX_FROM_ID_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_MAX_ID_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_MAX_ID_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_MAX_ID_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_MAX_ID_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_MAX_NFT_ID_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_MAX_NFT_ID_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_MAX_NFT_ID_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_MAX_NFT_ID_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_MAX_TOKEN_ID_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_MAX_TOKEN_ID_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_MAX_TOKEN_ID_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_MAX_TOKEN_ID_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_MAX_TO_ID_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_MAX_TO_ID_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_MAX_TO_ID_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_MAX_TO_ID_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_MAX_TRANSACTION_BLOCK_NUMBER_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_MAX_TRANSACTION_BLOCK_NUMBER_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_MAX_TRANSACTION_BLOCK_NUMBER_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_MAX_TRANSACTION_BLOCK_NUMBER_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_MAX_TRANSACTION_ID_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_MAX_TRANSACTION_ID_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_MAX_TRANSACTION_ID_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_MAX_TRANSACTION_ID_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_MAX_TYPE_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_MAX_TYPE_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_MAX_TYPE_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_MAX_TYPE_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_MAX_VALUE_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_MAX_VALUE_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_MAX_VALUE_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_MAX_VALUE_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_MIN_BLOCK_RANGE_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_MIN_BLOCK_RANGE_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_MIN_BLOCK_RANGE_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_MIN_BLOCK_RANGE_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_MIN_FROM_ID_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_MIN_FROM_ID_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_MIN_FROM_ID_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_MIN_FROM_ID_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_MIN_ID_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_MIN_ID_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_MIN_ID_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_MIN_ID_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_MIN_NFT_ID_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_MIN_NFT_ID_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_MIN_NFT_ID_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_MIN_NFT_ID_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_MIN_TOKEN_ID_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_MIN_TOKEN_ID_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_MIN_TOKEN_ID_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_MIN_TOKEN_ID_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_MIN_TO_ID_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_MIN_TO_ID_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_MIN_TO_ID_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_MIN_TO_ID_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_MIN_TRANSACTION_BLOCK_NUMBER_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_MIN_TRANSACTION_BLOCK_NUMBER_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_MIN_TRANSACTION_BLOCK_NUMBER_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_MIN_TRANSACTION_BLOCK_NUMBER_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_MIN_TRANSACTION_ID_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_MIN_TRANSACTION_ID_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_MIN_TRANSACTION_ID_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_MIN_TRANSACTION_ID_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_MIN_TYPE_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_MIN_TYPE_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_MIN_TYPE_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_MIN_TYPE_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_MIN_VALUE_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_MIN_VALUE_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_MIN_VALUE_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_MIN_VALUE_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_POPULATION_BLOCK_RANGE_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_POPULATION_BLOCK_RANGE_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_POPULATION_BLOCK_RANGE_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_POPULATION_BLOCK_RANGE_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_POPULATION_FROM_ID_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_POPULATION_FROM_ID_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_POPULATION_FROM_ID_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_POPULATION_FROM_ID_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_POPULATION_ID_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_POPULATION_ID_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_POPULATION_ID_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_POPULATION_ID_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_POPULATION_NFT_ID_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_POPULATION_NFT_ID_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_POPULATION_NFT_ID_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_POPULATION_NFT_ID_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_POPULATION_TOKEN_ID_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_POPULATION_TOKEN_ID_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_POPULATION_TOKEN_ID_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_POPULATION_TOKEN_ID_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_POPULATION_TO_ID_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_POPULATION_TO_ID_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_POPULATION_TO_ID_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_POPULATION_TO_ID_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_POPULATION_TRANSACTION_BLOCK_NUMBER_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_POPULATION_TRANSACTION_BLOCK_NUMBER_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_POPULATION_TRANSACTION_BLOCK_NUMBER_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_POPULATION_TRANSACTION_BLOCK_NUMBER_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_POPULATION_TRANSACTION_ID_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_POPULATION_TRANSACTION_ID_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_POPULATION_TRANSACTION_ID_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_POPULATION_TRANSACTION_ID_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_POPULATION_TYPE_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_POPULATION_TYPE_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_POPULATION_TYPE_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_POPULATION_TYPE_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_POPULATION_VALUE_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_POPULATION_VALUE_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_POPULATION_VALUE_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_POPULATION_VALUE_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_SAMPLE_BLOCK_RANGE_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_SAMPLE_BLOCK_RANGE_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_SAMPLE_BLOCK_RANGE_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_SAMPLE_BLOCK_RANGE_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_SAMPLE_FROM_ID_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_SAMPLE_FROM_ID_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_SAMPLE_FROM_ID_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_SAMPLE_FROM_ID_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_SAMPLE_ID_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_SAMPLE_ID_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_SAMPLE_ID_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_SAMPLE_ID_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_SAMPLE_NFT_ID_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_SAMPLE_NFT_ID_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_SAMPLE_NFT_ID_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_SAMPLE_NFT_ID_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_SAMPLE_TOKEN_ID_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_SAMPLE_TOKEN_ID_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_SAMPLE_TOKEN_ID_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_SAMPLE_TOKEN_ID_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_SAMPLE_TO_ID_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_SAMPLE_TO_ID_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_SAMPLE_TO_ID_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_SAMPLE_TO_ID_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_SAMPLE_TRANSACTION_BLOCK_NUMBER_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_SAMPLE_TRANSACTION_BLOCK_NUMBER_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_SAMPLE_TRANSACTION_BLOCK_NUMBER_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_SAMPLE_TRANSACTION_BLOCK_NUMBER_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_SAMPLE_TRANSACTION_ID_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_SAMPLE_TRANSACTION_ID_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_SAMPLE_TRANSACTION_ID_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_SAMPLE_TRANSACTION_ID_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_SAMPLE_TYPE_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_SAMPLE_TYPE_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_SAMPLE_TYPE_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_SAMPLE_TYPE_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_SAMPLE_VALUE_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_SAMPLE_VALUE_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_SAMPLE_VALUE_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_STDDEV_SAMPLE_VALUE_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_SUM_BLOCK_RANGE_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_SUM_BLOCK_RANGE_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_SUM_BLOCK_RANGE_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_SUM_BLOCK_RANGE_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_SUM_FROM_ID_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_SUM_FROM_ID_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_SUM_FROM_ID_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_SUM_FROM_ID_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_SUM_ID_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_SUM_ID_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_SUM_ID_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_SUM_ID_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_SUM_NFT_ID_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_SUM_NFT_ID_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_SUM_NFT_ID_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_SUM_NFT_ID_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_SUM_TOKEN_ID_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_SUM_TOKEN_ID_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_SUM_TOKEN_ID_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_SUM_TOKEN_ID_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_SUM_TO_ID_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_SUM_TO_ID_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_SUM_TO_ID_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_SUM_TO_ID_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_SUM_TRANSACTION_BLOCK_NUMBER_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_SUM_TRANSACTION_BLOCK_NUMBER_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_SUM_TRANSACTION_BLOCK_NUMBER_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_SUM_TRANSACTION_BLOCK_NUMBER_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_SUM_TRANSACTION_ID_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_SUM_TRANSACTION_ID_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_SUM_TRANSACTION_ID_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_SUM_TRANSACTION_ID_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_SUM_TYPE_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_SUM_TYPE_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_SUM_TYPE_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_SUM_TYPE_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_SUM_VALUE_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_SUM_VALUE_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_SUM_VALUE_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_SUM_VALUE_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_POPULATION_BLOCK_RANGE_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_POPULATION_BLOCK_RANGE_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_POPULATION_BLOCK_RANGE_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_POPULATION_BLOCK_RANGE_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_POPULATION_FROM_ID_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_POPULATION_FROM_ID_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_POPULATION_FROM_ID_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_POPULATION_FROM_ID_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_POPULATION_ID_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_POPULATION_ID_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_POPULATION_ID_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_POPULATION_ID_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_POPULATION_NFT_ID_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_POPULATION_NFT_ID_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_POPULATION_NFT_ID_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_POPULATION_NFT_ID_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_POPULATION_TOKEN_ID_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_POPULATION_TOKEN_ID_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_POPULATION_TOKEN_ID_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_POPULATION_TOKEN_ID_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_POPULATION_TO_ID_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_POPULATION_TO_ID_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_POPULATION_TO_ID_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_POPULATION_TO_ID_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_POPULATION_TRANSACTION_BLOCK_NUMBER_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_POPULATION_TRANSACTION_BLOCK_NUMBER_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_POPULATION_TRANSACTION_BLOCK_NUMBER_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_POPULATION_TRANSACTION_BLOCK_NUMBER_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_POPULATION_TRANSACTION_ID_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_POPULATION_TRANSACTION_ID_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_POPULATION_TRANSACTION_ID_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_POPULATION_TRANSACTION_ID_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_POPULATION_TYPE_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_POPULATION_TYPE_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_POPULATION_TYPE_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_POPULATION_TYPE_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_POPULATION_VALUE_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_POPULATION_VALUE_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_POPULATION_VALUE_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_POPULATION_VALUE_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_SAMPLE_BLOCK_RANGE_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_SAMPLE_BLOCK_RANGE_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_SAMPLE_BLOCK_RANGE_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_SAMPLE_BLOCK_RANGE_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_SAMPLE_FROM_ID_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_SAMPLE_FROM_ID_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_SAMPLE_FROM_ID_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_SAMPLE_FROM_ID_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_SAMPLE_ID_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_SAMPLE_ID_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_SAMPLE_ID_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_SAMPLE_ID_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_SAMPLE_NFT_ID_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_SAMPLE_NFT_ID_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_SAMPLE_NFT_ID_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_SAMPLE_NFT_ID_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_SAMPLE_TOKEN_ID_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_SAMPLE_TOKEN_ID_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_SAMPLE_TOKEN_ID_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_SAMPLE_TOKEN_ID_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_SAMPLE_TO_ID_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_SAMPLE_TO_ID_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_SAMPLE_TO_ID_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_SAMPLE_TO_ID_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_SAMPLE_TRANSACTION_BLOCK_NUMBER_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_SAMPLE_TRANSACTION_BLOCK_NUMBER_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_SAMPLE_TRANSACTION_BLOCK_NUMBER_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_SAMPLE_TRANSACTION_BLOCK_NUMBER_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_SAMPLE_TRANSACTION_ID_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_SAMPLE_TRANSACTION_ID_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_SAMPLE_TRANSACTION_ID_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_SAMPLE_TRANSACTION_ID_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_SAMPLE_TYPE_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_SAMPLE_TYPE_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_SAMPLE_TYPE_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_SAMPLE_TYPE_DESC',
  ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_SAMPLE_VALUE_ASC = 'ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_SAMPLE_VALUE_ASC',
  ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_SAMPLE_VALUE_DESC = 'ASSET_TRANSFERS_BY_TOKEN_ID_VARIANCE_SAMPLE_VALUE_DESC',
  DECIMALS_ASC = 'DECIMALS_ASC',
  DECIMALS_DESC = 'DECIMALS_DESC',
  ICON_URL_ASC = 'ICON_URL_ASC',
  ICON_URL_DESC = 'ICON_URL_DESC',
  ID_ASC = 'ID_ASC',
  ID_DESC = 'ID_DESC',
  NAME_ASC = 'NAME_ASC',
  NAME_DESC = 'NAME_DESC',
  NATURAL = 'NATURAL',
  NFTS_BY_COLLECTION_ID_AVERAGE_BLOCK_RANGE_ASC = 'NFTS_BY_COLLECTION_ID_AVERAGE_BLOCK_RANGE_ASC',
  NFTS_BY_COLLECTION_ID_AVERAGE_BLOCK_RANGE_DESC = 'NFTS_BY_COLLECTION_ID_AVERAGE_BLOCK_RANGE_DESC',
  NFTS_BY_COLLECTION_ID_AVERAGE_COLLECTION_ID_ASC = 'NFTS_BY_COLLECTION_ID_AVERAGE_COLLECTION_ID_ASC',
  NFTS_BY_COLLECTION_ID_AVERAGE_COLLECTION_ID_DESC = 'NFTS_BY_COLLECTION_ID_AVERAGE_COLLECTION_ID_DESC',
  NFTS_BY_COLLECTION_ID_AVERAGE_ID_ASC = 'NFTS_BY_COLLECTION_ID_AVERAGE_ID_ASC',
  NFTS_BY_COLLECTION_ID_AVERAGE_ID_DESC = 'NFTS_BY_COLLECTION_ID_AVERAGE_ID_DESC',
  NFTS_BY_COLLECTION_ID_AVERAGE_METADATA_ASC = 'NFTS_BY_COLLECTION_ID_AVERAGE_METADATA_ASC',
  NFTS_BY_COLLECTION_ID_AVERAGE_METADATA_DESC = 'NFTS_BY_COLLECTION_ID_AVERAGE_METADATA_DESC',
  NFTS_BY_COLLECTION_ID_AVERAGE_TOKEN_ID_ASC = 'NFTS_BY_COLLECTION_ID_AVERAGE_TOKEN_ID_ASC',
  NFTS_BY_COLLECTION_ID_AVERAGE_TOKEN_ID_DESC = 'NFTS_BY_COLLECTION_ID_AVERAGE_TOKEN_ID_DESC',
  NFTS_BY_COLLECTION_ID_COUNT_ASC = 'NFTS_BY_COLLECTION_ID_COUNT_ASC',
  NFTS_BY_COLLECTION_ID_COUNT_DESC = 'NFTS_BY_COLLECTION_ID_COUNT_DESC',
  NFTS_BY_COLLECTION_ID_DISTINCT_COUNT_BLOCK_RANGE_ASC = 'NFTS_BY_COLLECTION_ID_DISTINCT_COUNT_BLOCK_RANGE_ASC',
  NFTS_BY_COLLECTION_ID_DISTINCT_COUNT_BLOCK_RANGE_DESC = 'NFTS_BY_COLLECTION_ID_DISTINCT_COUNT_BLOCK_RANGE_DESC',
  NFTS_BY_COLLECTION_ID_DISTINCT_COUNT_COLLECTION_ID_ASC = 'NFTS_BY_COLLECTION_ID_DISTINCT_COUNT_COLLECTION_ID_ASC',
  NFTS_BY_COLLECTION_ID_DISTINCT_COUNT_COLLECTION_ID_DESC = 'NFTS_BY_COLLECTION_ID_DISTINCT_COUNT_COLLECTION_ID_DESC',
  NFTS_BY_COLLECTION_ID_DISTINCT_COUNT_ID_ASC = 'NFTS_BY_COLLECTION_ID_DISTINCT_COUNT_ID_ASC',
  NFTS_BY_COLLECTION_ID_DISTINCT_COUNT_ID_DESC = 'NFTS_BY_COLLECTION_ID_DISTINCT_COUNT_ID_DESC',
  NFTS_BY_COLLECTION_ID_DISTINCT_COUNT_METADATA_ASC = 'NFTS_BY_COLLECTION_ID_DISTINCT_COUNT_METADATA_ASC',
  NFTS_BY_COLLECTION_ID_DISTINCT_COUNT_METADATA_DESC = 'NFTS_BY_COLLECTION_ID_DISTINCT_COUNT_METADATA_DESC',
  NFTS_BY_COLLECTION_ID_DISTINCT_COUNT_TOKEN_ID_ASC = 'NFTS_BY_COLLECTION_ID_DISTINCT_COUNT_TOKEN_ID_ASC',
  NFTS_BY_COLLECTION_ID_DISTINCT_COUNT_TOKEN_ID_DESC = 'NFTS_BY_COLLECTION_ID_DISTINCT_COUNT_TOKEN_ID_DESC',
  NFTS_BY_COLLECTION_ID_MAX_BLOCK_RANGE_ASC = 'NFTS_BY_COLLECTION_ID_MAX_BLOCK_RANGE_ASC',
  NFTS_BY_COLLECTION_ID_MAX_BLOCK_RANGE_DESC = 'NFTS_BY_COLLECTION_ID_MAX_BLOCK_RANGE_DESC',
  NFTS_BY_COLLECTION_ID_MAX_COLLECTION_ID_ASC = 'NFTS_BY_COLLECTION_ID_MAX_COLLECTION_ID_ASC',
  NFTS_BY_COLLECTION_ID_MAX_COLLECTION_ID_DESC = 'NFTS_BY_COLLECTION_ID_MAX_COLLECTION_ID_DESC',
  NFTS_BY_COLLECTION_ID_MAX_ID_ASC = 'NFTS_BY_COLLECTION_ID_MAX_ID_ASC',
  NFTS_BY_COLLECTION_ID_MAX_ID_DESC = 'NFTS_BY_COLLECTION_ID_MAX_ID_DESC',
  NFTS_BY_COLLECTION_ID_MAX_METADATA_ASC = 'NFTS_BY_COLLECTION_ID_MAX_METADATA_ASC',
  NFTS_BY_COLLECTION_ID_MAX_METADATA_DESC = 'NFTS_BY_COLLECTION_ID_MAX_METADATA_DESC',
  NFTS_BY_COLLECTION_ID_MAX_TOKEN_ID_ASC = 'NFTS_BY_COLLECTION_ID_MAX_TOKEN_ID_ASC',
  NFTS_BY_COLLECTION_ID_MAX_TOKEN_ID_DESC = 'NFTS_BY_COLLECTION_ID_MAX_TOKEN_ID_DESC',
  NFTS_BY_COLLECTION_ID_MIN_BLOCK_RANGE_ASC = 'NFTS_BY_COLLECTION_ID_MIN_BLOCK_RANGE_ASC',
  NFTS_BY_COLLECTION_ID_MIN_BLOCK_RANGE_DESC = 'NFTS_BY_COLLECTION_ID_MIN_BLOCK_RANGE_DESC',
  NFTS_BY_COLLECTION_ID_MIN_COLLECTION_ID_ASC = 'NFTS_BY_COLLECTION_ID_MIN_COLLECTION_ID_ASC',
  NFTS_BY_COLLECTION_ID_MIN_COLLECTION_ID_DESC = 'NFTS_BY_COLLECTION_ID_MIN_COLLECTION_ID_DESC',
  NFTS_BY_COLLECTION_ID_MIN_ID_ASC = 'NFTS_BY_COLLECTION_ID_MIN_ID_ASC',
  NFTS_BY_COLLECTION_ID_MIN_ID_DESC = 'NFTS_BY_COLLECTION_ID_MIN_ID_DESC',
  NFTS_BY_COLLECTION_ID_MIN_METADATA_ASC = 'NFTS_BY_COLLECTION_ID_MIN_METADATA_ASC',
  NFTS_BY_COLLECTION_ID_MIN_METADATA_DESC = 'NFTS_BY_COLLECTION_ID_MIN_METADATA_DESC',
  NFTS_BY_COLLECTION_ID_MIN_TOKEN_ID_ASC = 'NFTS_BY_COLLECTION_ID_MIN_TOKEN_ID_ASC',
  NFTS_BY_COLLECTION_ID_MIN_TOKEN_ID_DESC = 'NFTS_BY_COLLECTION_ID_MIN_TOKEN_ID_DESC',
  NFTS_BY_COLLECTION_ID_STDDEV_POPULATION_BLOCK_RANGE_ASC = 'NFTS_BY_COLLECTION_ID_STDDEV_POPULATION_BLOCK_RANGE_ASC',
  NFTS_BY_COLLECTION_ID_STDDEV_POPULATION_BLOCK_RANGE_DESC = 'NFTS_BY_COLLECTION_ID_STDDEV_POPULATION_BLOCK_RANGE_DESC',
  NFTS_BY_COLLECTION_ID_STDDEV_POPULATION_COLLECTION_ID_ASC = 'NFTS_BY_COLLECTION_ID_STDDEV_POPULATION_COLLECTION_ID_ASC',
  NFTS_BY_COLLECTION_ID_STDDEV_POPULATION_COLLECTION_ID_DESC = 'NFTS_BY_COLLECTION_ID_STDDEV_POPULATION_COLLECTION_ID_DESC',
  NFTS_BY_COLLECTION_ID_STDDEV_POPULATION_ID_ASC = 'NFTS_BY_COLLECTION_ID_STDDEV_POPULATION_ID_ASC',
  NFTS_BY_COLLECTION_ID_STDDEV_POPULATION_ID_DESC = 'NFTS_BY_COLLECTION_ID_STDDEV_POPULATION_ID_DESC',
  NFTS_BY_COLLECTION_ID_STDDEV_POPULATION_METADATA_ASC = 'NFTS_BY_COLLECTION_ID_STDDEV_POPULATION_METADATA_ASC',
  NFTS_BY_COLLECTION_ID_STDDEV_POPULATION_METADATA_DESC = 'NFTS_BY_COLLECTION_ID_STDDEV_POPULATION_METADATA_DESC',
  NFTS_BY_COLLECTION_ID_STDDEV_POPULATION_TOKEN_ID_ASC = 'NFTS_BY_COLLECTION_ID_STDDEV_POPULATION_TOKEN_ID_ASC',
  NFTS_BY_COLLECTION_ID_STDDEV_POPULATION_TOKEN_ID_DESC = 'NFTS_BY_COLLECTION_ID_STDDEV_POPULATION_TOKEN_ID_DESC',
  NFTS_BY_COLLECTION_ID_STDDEV_SAMPLE_BLOCK_RANGE_ASC = 'NFTS_BY_COLLECTION_ID_STDDEV_SAMPLE_BLOCK_RANGE_ASC',
  NFTS_BY_COLLECTION_ID_STDDEV_SAMPLE_BLOCK_RANGE_DESC = 'NFTS_BY_COLLECTION_ID_STDDEV_SAMPLE_BLOCK_RANGE_DESC',
  NFTS_BY_COLLECTION_ID_STDDEV_SAMPLE_COLLECTION_ID_ASC = 'NFTS_BY_COLLECTION_ID_STDDEV_SAMPLE_COLLECTION_ID_ASC',
  NFTS_BY_COLLECTION_ID_STDDEV_SAMPLE_COLLECTION_ID_DESC = 'NFTS_BY_COLLECTION_ID_STDDEV_SAMPLE_COLLECTION_ID_DESC',
  NFTS_BY_COLLECTION_ID_STDDEV_SAMPLE_ID_ASC = 'NFTS_BY_COLLECTION_ID_STDDEV_SAMPLE_ID_ASC',
  NFTS_BY_COLLECTION_ID_STDDEV_SAMPLE_ID_DESC = 'NFTS_BY_COLLECTION_ID_STDDEV_SAMPLE_ID_DESC',
  NFTS_BY_COLLECTION_ID_STDDEV_SAMPLE_METADATA_ASC = 'NFTS_BY_COLLECTION_ID_STDDEV_SAMPLE_METADATA_ASC',
  NFTS_BY_COLLECTION_ID_STDDEV_SAMPLE_METADATA_DESC = 'NFTS_BY_COLLECTION_ID_STDDEV_SAMPLE_METADATA_DESC',
  NFTS_BY_COLLECTION_ID_STDDEV_SAMPLE_TOKEN_ID_ASC = 'NFTS_BY_COLLECTION_ID_STDDEV_SAMPLE_TOKEN_ID_ASC',
  NFTS_BY_COLLECTION_ID_STDDEV_SAMPLE_TOKEN_ID_DESC = 'NFTS_BY_COLLECTION_ID_STDDEV_SAMPLE_TOKEN_ID_DESC',
  NFTS_BY_COLLECTION_ID_SUM_BLOCK_RANGE_ASC = 'NFTS_BY_COLLECTION_ID_SUM_BLOCK_RANGE_ASC',
  NFTS_BY_COLLECTION_ID_SUM_BLOCK_RANGE_DESC = 'NFTS_BY_COLLECTION_ID_SUM_BLOCK_RANGE_DESC',
  NFTS_BY_COLLECTION_ID_SUM_COLLECTION_ID_ASC = 'NFTS_BY_COLLECTION_ID_SUM_COLLECTION_ID_ASC',
  NFTS_BY_COLLECTION_ID_SUM_COLLECTION_ID_DESC = 'NFTS_BY_COLLECTION_ID_SUM_COLLECTION_ID_DESC',
  NFTS_BY_COLLECTION_ID_SUM_ID_ASC = 'NFTS_BY_COLLECTION_ID_SUM_ID_ASC',
  NFTS_BY_COLLECTION_ID_SUM_ID_DESC = 'NFTS_BY_COLLECTION_ID_SUM_ID_DESC',
  NFTS_BY_COLLECTION_ID_SUM_METADATA_ASC = 'NFTS_BY_COLLECTION_ID_SUM_METADATA_ASC',
  NFTS_BY_COLLECTION_ID_SUM_METADATA_DESC = 'NFTS_BY_COLLECTION_ID_SUM_METADATA_DESC',
  NFTS_BY_COLLECTION_ID_SUM_TOKEN_ID_ASC = 'NFTS_BY_COLLECTION_ID_SUM_TOKEN_ID_ASC',
  NFTS_BY_COLLECTION_ID_SUM_TOKEN_ID_DESC = 'NFTS_BY_COLLECTION_ID_SUM_TOKEN_ID_DESC',
  NFTS_BY_COLLECTION_ID_VARIANCE_POPULATION_BLOCK_RANGE_ASC = 'NFTS_BY_COLLECTION_ID_VARIANCE_POPULATION_BLOCK_RANGE_ASC',
  NFTS_BY_COLLECTION_ID_VARIANCE_POPULATION_BLOCK_RANGE_DESC = 'NFTS_BY_COLLECTION_ID_VARIANCE_POPULATION_BLOCK_RANGE_DESC',
  NFTS_BY_COLLECTION_ID_VARIANCE_POPULATION_COLLECTION_ID_ASC = 'NFTS_BY_COLLECTION_ID_VARIANCE_POPULATION_COLLECTION_ID_ASC',
  NFTS_BY_COLLECTION_ID_VARIANCE_POPULATION_COLLECTION_ID_DESC = 'NFTS_BY_COLLECTION_ID_VARIANCE_POPULATION_COLLECTION_ID_DESC',
  NFTS_BY_COLLECTION_ID_VARIANCE_POPULATION_ID_ASC = 'NFTS_BY_COLLECTION_ID_VARIANCE_POPULATION_ID_ASC',
  NFTS_BY_COLLECTION_ID_VARIANCE_POPULATION_ID_DESC = 'NFTS_BY_COLLECTION_ID_VARIANCE_POPULATION_ID_DESC',
  NFTS_BY_COLLECTION_ID_VARIANCE_POPULATION_METADATA_ASC = 'NFTS_BY_COLLECTION_ID_VARIANCE_POPULATION_METADATA_ASC',
  NFTS_BY_COLLECTION_ID_VARIANCE_POPULATION_METADATA_DESC = 'NFTS_BY_COLLECTION_ID_VARIANCE_POPULATION_METADATA_DESC',
  NFTS_BY_COLLECTION_ID_VARIANCE_POPULATION_TOKEN_ID_ASC = 'NFTS_BY_COLLECTION_ID_VARIANCE_POPULATION_TOKEN_ID_ASC',
  NFTS_BY_COLLECTION_ID_VARIANCE_POPULATION_TOKEN_ID_DESC = 'NFTS_BY_COLLECTION_ID_VARIANCE_POPULATION_TOKEN_ID_DESC',
  NFTS_BY_COLLECTION_ID_VARIANCE_SAMPLE_BLOCK_RANGE_ASC = 'NFTS_BY_COLLECTION_ID_VARIANCE_SAMPLE_BLOCK_RANGE_ASC',
  NFTS_BY_COLLECTION_ID_VARIANCE_SAMPLE_BLOCK_RANGE_DESC = 'NFTS_BY_COLLECTION_ID_VARIANCE_SAMPLE_BLOCK_RANGE_DESC',
  NFTS_BY_COLLECTION_ID_VARIANCE_SAMPLE_COLLECTION_ID_ASC = 'NFTS_BY_COLLECTION_ID_VARIANCE_SAMPLE_COLLECTION_ID_ASC',
  NFTS_BY_COLLECTION_ID_VARIANCE_SAMPLE_COLLECTION_ID_DESC = 'NFTS_BY_COLLECTION_ID_VARIANCE_SAMPLE_COLLECTION_ID_DESC',
  NFTS_BY_COLLECTION_ID_VARIANCE_SAMPLE_ID_ASC = 'NFTS_BY_COLLECTION_ID_VARIANCE_SAMPLE_ID_ASC',
  NFTS_BY_COLLECTION_ID_VARIANCE_SAMPLE_ID_DESC = 'NFTS_BY_COLLECTION_ID_VARIANCE_SAMPLE_ID_DESC',
  NFTS_BY_COLLECTION_ID_VARIANCE_SAMPLE_METADATA_ASC = 'NFTS_BY_COLLECTION_ID_VARIANCE_SAMPLE_METADATA_ASC',
  NFTS_BY_COLLECTION_ID_VARIANCE_SAMPLE_METADATA_DESC = 'NFTS_BY_COLLECTION_ID_VARIANCE_SAMPLE_METADATA_DESC',
  NFTS_BY_COLLECTION_ID_VARIANCE_SAMPLE_TOKEN_ID_ASC = 'NFTS_BY_COLLECTION_ID_VARIANCE_SAMPLE_TOKEN_ID_ASC',
  NFTS_BY_COLLECTION_ID_VARIANCE_SAMPLE_TOKEN_ID_DESC = 'NFTS_BY_COLLECTION_ID_VARIANCE_SAMPLE_TOKEN_ID_DESC',
  PRIMARY_KEY_ASC = 'PRIMARY_KEY_ASC',
  PRIMARY_KEY_DESC = 'PRIMARY_KEY_DESC',
  SYMBOL_ASC = 'SYMBOL_ASC',
  SYMBOL_DESC = 'SYMBOL_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_AVERAGE_BALANCE_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_AVERAGE_BALANCE_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_AVERAGE_BALANCE_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_AVERAGE_BALANCE_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_AVERAGE_BLOCK_RANGE_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_AVERAGE_BLOCK_RANGE_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_AVERAGE_BLOCK_RANGE_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_AVERAGE_BLOCK_RANGE_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_AVERAGE_ID_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_AVERAGE_ID_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_AVERAGE_ID_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_AVERAGE_ID_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_AVERAGE_TOKEN_ID_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_AVERAGE_TOKEN_ID_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_AVERAGE_TOKEN_ID_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_AVERAGE_TOKEN_ID_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_AVERAGE_TOKEN_NAME_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_AVERAGE_TOKEN_NAME_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_AVERAGE_TOKEN_NAME_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_AVERAGE_TOKEN_NAME_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_AVERAGE_TOKEN_SYMBOL_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_AVERAGE_TOKEN_SYMBOL_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_AVERAGE_TOKEN_SYMBOL_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_AVERAGE_TOKEN_SYMBOL_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_AVERAGE_WALLET_ID_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_AVERAGE_WALLET_ID_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_AVERAGE_WALLET_ID_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_AVERAGE_WALLET_ID_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_COUNT_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_COUNT_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_COUNT_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_COUNT_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_DISTINCT_COUNT_BALANCE_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_DISTINCT_COUNT_BALANCE_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_DISTINCT_COUNT_BALANCE_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_DISTINCT_COUNT_BALANCE_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_DISTINCT_COUNT_BLOCK_RANGE_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_DISTINCT_COUNT_BLOCK_RANGE_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_DISTINCT_COUNT_BLOCK_RANGE_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_DISTINCT_COUNT_BLOCK_RANGE_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_DISTINCT_COUNT_ID_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_DISTINCT_COUNT_ID_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_DISTINCT_COUNT_ID_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_DISTINCT_COUNT_ID_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_DISTINCT_COUNT_TOKEN_ID_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_DISTINCT_COUNT_TOKEN_ID_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_DISTINCT_COUNT_TOKEN_ID_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_DISTINCT_COUNT_TOKEN_ID_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_DISTINCT_COUNT_TOKEN_NAME_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_DISTINCT_COUNT_TOKEN_NAME_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_DISTINCT_COUNT_TOKEN_NAME_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_DISTINCT_COUNT_TOKEN_NAME_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_DISTINCT_COUNT_TOKEN_SYMBOL_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_DISTINCT_COUNT_TOKEN_SYMBOL_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_DISTINCT_COUNT_TOKEN_SYMBOL_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_DISTINCT_COUNT_TOKEN_SYMBOL_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_DISTINCT_COUNT_WALLET_ID_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_DISTINCT_COUNT_WALLET_ID_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_DISTINCT_COUNT_WALLET_ID_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_DISTINCT_COUNT_WALLET_ID_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_MAX_BALANCE_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_MAX_BALANCE_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_MAX_BALANCE_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_MAX_BALANCE_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_MAX_BLOCK_RANGE_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_MAX_BLOCK_RANGE_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_MAX_BLOCK_RANGE_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_MAX_BLOCK_RANGE_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_MAX_ID_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_MAX_ID_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_MAX_ID_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_MAX_ID_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_MAX_TOKEN_ID_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_MAX_TOKEN_ID_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_MAX_TOKEN_ID_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_MAX_TOKEN_ID_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_MAX_TOKEN_NAME_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_MAX_TOKEN_NAME_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_MAX_TOKEN_NAME_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_MAX_TOKEN_NAME_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_MAX_TOKEN_SYMBOL_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_MAX_TOKEN_SYMBOL_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_MAX_TOKEN_SYMBOL_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_MAX_TOKEN_SYMBOL_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_MAX_WALLET_ID_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_MAX_WALLET_ID_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_MAX_WALLET_ID_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_MAX_WALLET_ID_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_MIN_BALANCE_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_MIN_BALANCE_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_MIN_BALANCE_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_MIN_BALANCE_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_MIN_BLOCK_RANGE_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_MIN_BLOCK_RANGE_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_MIN_BLOCK_RANGE_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_MIN_BLOCK_RANGE_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_MIN_ID_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_MIN_ID_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_MIN_ID_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_MIN_ID_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_MIN_TOKEN_ID_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_MIN_TOKEN_ID_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_MIN_TOKEN_ID_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_MIN_TOKEN_ID_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_MIN_TOKEN_NAME_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_MIN_TOKEN_NAME_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_MIN_TOKEN_NAME_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_MIN_TOKEN_NAME_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_MIN_TOKEN_SYMBOL_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_MIN_TOKEN_SYMBOL_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_MIN_TOKEN_SYMBOL_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_MIN_TOKEN_SYMBOL_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_MIN_WALLET_ID_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_MIN_WALLET_ID_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_MIN_WALLET_ID_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_MIN_WALLET_ID_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_STDDEV_POPULATION_BALANCE_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_STDDEV_POPULATION_BALANCE_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_STDDEV_POPULATION_BALANCE_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_STDDEV_POPULATION_BALANCE_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_STDDEV_POPULATION_BLOCK_RANGE_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_STDDEV_POPULATION_BLOCK_RANGE_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_STDDEV_POPULATION_BLOCK_RANGE_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_STDDEV_POPULATION_BLOCK_RANGE_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_STDDEV_POPULATION_ID_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_STDDEV_POPULATION_ID_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_STDDEV_POPULATION_ID_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_STDDEV_POPULATION_ID_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_STDDEV_POPULATION_TOKEN_ID_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_STDDEV_POPULATION_TOKEN_ID_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_STDDEV_POPULATION_TOKEN_ID_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_STDDEV_POPULATION_TOKEN_ID_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_STDDEV_POPULATION_TOKEN_NAME_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_STDDEV_POPULATION_TOKEN_NAME_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_STDDEV_POPULATION_TOKEN_NAME_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_STDDEV_POPULATION_TOKEN_NAME_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_STDDEV_POPULATION_TOKEN_SYMBOL_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_STDDEV_POPULATION_TOKEN_SYMBOL_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_STDDEV_POPULATION_TOKEN_SYMBOL_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_STDDEV_POPULATION_TOKEN_SYMBOL_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_STDDEV_POPULATION_WALLET_ID_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_STDDEV_POPULATION_WALLET_ID_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_STDDEV_POPULATION_WALLET_ID_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_STDDEV_POPULATION_WALLET_ID_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_STDDEV_SAMPLE_BALANCE_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_STDDEV_SAMPLE_BALANCE_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_STDDEV_SAMPLE_BALANCE_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_STDDEV_SAMPLE_BALANCE_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_STDDEV_SAMPLE_BLOCK_RANGE_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_STDDEV_SAMPLE_BLOCK_RANGE_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_STDDEV_SAMPLE_BLOCK_RANGE_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_STDDEV_SAMPLE_BLOCK_RANGE_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_STDDEV_SAMPLE_ID_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_STDDEV_SAMPLE_ID_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_STDDEV_SAMPLE_ID_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_STDDEV_SAMPLE_ID_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_STDDEV_SAMPLE_TOKEN_ID_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_STDDEV_SAMPLE_TOKEN_ID_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_STDDEV_SAMPLE_TOKEN_ID_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_STDDEV_SAMPLE_TOKEN_ID_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_STDDEV_SAMPLE_TOKEN_NAME_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_STDDEV_SAMPLE_TOKEN_NAME_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_STDDEV_SAMPLE_TOKEN_NAME_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_STDDEV_SAMPLE_TOKEN_NAME_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_STDDEV_SAMPLE_TOKEN_SYMBOL_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_STDDEV_SAMPLE_TOKEN_SYMBOL_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_STDDEV_SAMPLE_TOKEN_SYMBOL_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_STDDEV_SAMPLE_TOKEN_SYMBOL_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_STDDEV_SAMPLE_WALLET_ID_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_STDDEV_SAMPLE_WALLET_ID_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_STDDEV_SAMPLE_WALLET_ID_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_STDDEV_SAMPLE_WALLET_ID_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_SUM_BALANCE_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_SUM_BALANCE_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_SUM_BALANCE_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_SUM_BALANCE_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_SUM_BLOCK_RANGE_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_SUM_BLOCK_RANGE_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_SUM_BLOCK_RANGE_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_SUM_BLOCK_RANGE_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_SUM_ID_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_SUM_ID_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_SUM_ID_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_SUM_ID_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_SUM_TOKEN_ID_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_SUM_TOKEN_ID_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_SUM_TOKEN_ID_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_SUM_TOKEN_ID_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_SUM_TOKEN_NAME_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_SUM_TOKEN_NAME_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_SUM_TOKEN_NAME_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_SUM_TOKEN_NAME_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_SUM_TOKEN_SYMBOL_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_SUM_TOKEN_SYMBOL_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_SUM_TOKEN_SYMBOL_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_SUM_TOKEN_SYMBOL_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_SUM_WALLET_ID_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_SUM_WALLET_ID_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_SUM_WALLET_ID_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_SUM_WALLET_ID_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_VARIANCE_POPULATION_BALANCE_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_VARIANCE_POPULATION_BALANCE_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_VARIANCE_POPULATION_BALANCE_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_VARIANCE_POPULATION_BALANCE_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_VARIANCE_POPULATION_BLOCK_RANGE_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_VARIANCE_POPULATION_BLOCK_RANGE_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_VARIANCE_POPULATION_BLOCK_RANGE_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_VARIANCE_POPULATION_BLOCK_RANGE_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_VARIANCE_POPULATION_ID_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_VARIANCE_POPULATION_ID_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_VARIANCE_POPULATION_ID_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_VARIANCE_POPULATION_ID_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_VARIANCE_POPULATION_TOKEN_ID_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_VARIANCE_POPULATION_TOKEN_ID_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_VARIANCE_POPULATION_TOKEN_ID_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_VARIANCE_POPULATION_TOKEN_ID_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_VARIANCE_POPULATION_TOKEN_NAME_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_VARIANCE_POPULATION_TOKEN_NAME_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_VARIANCE_POPULATION_TOKEN_NAME_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_VARIANCE_POPULATION_TOKEN_NAME_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_VARIANCE_POPULATION_TOKEN_SYMBOL_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_VARIANCE_POPULATION_TOKEN_SYMBOL_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_VARIANCE_POPULATION_TOKEN_SYMBOL_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_VARIANCE_POPULATION_TOKEN_SYMBOL_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_VARIANCE_POPULATION_WALLET_ID_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_VARIANCE_POPULATION_WALLET_ID_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_VARIANCE_POPULATION_WALLET_ID_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_VARIANCE_POPULATION_WALLET_ID_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_VARIANCE_SAMPLE_BALANCE_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_VARIANCE_SAMPLE_BALANCE_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_VARIANCE_SAMPLE_BALANCE_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_VARIANCE_SAMPLE_BALANCE_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_VARIANCE_SAMPLE_BLOCK_RANGE_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_VARIANCE_SAMPLE_BLOCK_RANGE_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_VARIANCE_SAMPLE_BLOCK_RANGE_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_VARIANCE_SAMPLE_BLOCK_RANGE_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_VARIANCE_SAMPLE_ID_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_VARIANCE_SAMPLE_ID_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_VARIANCE_SAMPLE_ID_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_VARIANCE_SAMPLE_ID_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_VARIANCE_SAMPLE_TOKEN_ID_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_VARIANCE_SAMPLE_TOKEN_ID_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_VARIANCE_SAMPLE_TOKEN_ID_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_VARIANCE_SAMPLE_TOKEN_ID_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_VARIANCE_SAMPLE_TOKEN_NAME_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_VARIANCE_SAMPLE_TOKEN_NAME_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_VARIANCE_SAMPLE_TOKEN_NAME_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_VARIANCE_SAMPLE_TOKEN_NAME_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_VARIANCE_SAMPLE_TOKEN_SYMBOL_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_VARIANCE_SAMPLE_TOKEN_SYMBOL_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_VARIANCE_SAMPLE_TOKEN_SYMBOL_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_VARIANCE_SAMPLE_TOKEN_SYMBOL_DESC',
  TOKEN_BALANCES_BY_TOKEN_ID_VARIANCE_SAMPLE_WALLET_ID_ASC = 'TOKEN_BALANCES_BY_TOKEN_ID_VARIANCE_SAMPLE_WALLET_ID_ASC',
  TOKEN_BALANCES_BY_TOKEN_ID_VARIANCE_SAMPLE_WALLET_ID_DESC = 'TOKEN_BALANCES_BY_TOKEN_ID_VARIANCE_SAMPLE_WALLET_ID_DESC',
  TYPE_ASC = 'TYPE_ASC',
  TYPE_DESC = 'TYPE_DESC'
}

export type GqlTransaction = GqlNode & {
  /** Reads and enables pagination through a set of `AssetTransfer`. */
  assetTransfers: GqlAssetTransfersConnection;
  blockHash: Scalars['String']['output'];
  blockNumber: Scalars['BigFloat']['output'];
  date: Scalars['Datetime']['output'];
  fees: Scalars['BigFloat']['output'];
  gasPrice: Scalars['BigFloat']['output'];
  gasUsed: Scalars['BigFloat']['output'];
  id: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `Nft`. */
  nftsByAssetTransferTransactionIdAndNftId: GqlTransactionNftsByAssetTransferTransactionIdAndNftIdManyToManyConnection;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  success: Scalars['Boolean']['output'];
  /** Reads and enables pagination through a set of `TokenContract`. */
  tokenContractsByAssetTransferTransactionIdAndTokenId: GqlTransactionTokenContractsByAssetTransferTransactionIdAndTokenIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Wallet`. */
  walletsByAssetTransferTransactionIdAndFromId: GqlTransactionWalletsByAssetTransferTransactionIdAndFromIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Wallet`. */
  walletsByAssetTransferTransactionIdAndToId: GqlTransactionWalletsByAssetTransferTransactionIdAndToIdManyToManyConnection;
};


export type GqlTransactionassetTransfersArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqlasset_transfers_distinct_enum>>>;
  filter?: InputMaybe<GqlAssetTransferFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlAssetTransfersOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
};


export type GqlTransactionnftsByAssetTransferTransactionIdAndNftIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqlnfts_distinct_enum>>>;
  filter?: InputMaybe<GqlNftFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlNftsOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
};


export type GqlTransactiontokenContractsByAssetTransferTransactionIdAndTokenIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqltoken_contracts_distinct_enum>>>;
  filter?: InputMaybe<GqlTokenContractFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlTokenContractsOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
};


export type GqlTransactionwalletsByAssetTransferTransactionIdAndFromIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqlwallets_distinct_enum>>>;
  filter?: InputMaybe<GqlWalletFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlWalletsOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
};


export type GqlTransactionwalletsByAssetTransferTransactionIdAndToIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqlwallets_distinct_enum>>>;
  filter?: InputMaybe<GqlWalletFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlWalletsOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
};

export type GqlTransactionAggregates = {
  /** Mean average aggregates across the matching connection (ignoring before/after/first/last/offset) */
  average: Maybe<GqlTransactionAverageAggregates>;
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount: Maybe<GqlTransactionDistinctCountAggregates>;
  keys: Maybe<Array<Scalars['String']['output']>>;
  /** Maximum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  max: Maybe<GqlTransactionMaxAggregates>;
  /** Minimum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  min: Maybe<GqlTransactionMinAggregates>;
  /** Population standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevPopulation: Maybe<GqlTransactionStddevPopulationAggregates>;
  /** Sample standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevSample: Maybe<GqlTransactionStddevSampleAggregates>;
  /** Sum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  sum: Maybe<GqlTransactionSumAggregates>;
  /** Population variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  variancePopulation: Maybe<GqlTransactionVariancePopulationAggregates>;
  /** Sample variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  varianceSample: Maybe<GqlTransactionVarianceSampleAggregates>;
};

export type GqlTransactionAverageAggregates = {
  /** Mean average of blockNumber across the matching connection */
  blockNumber: Maybe<Scalars['BigFloat']['output']>;
  /** Mean average of fees across the matching connection */
  fees: Maybe<Scalars['BigFloat']['output']>;
  /** Mean average of gasPrice across the matching connection */
  gasPrice: Maybe<Scalars['BigFloat']['output']>;
  /** Mean average of gasUsed across the matching connection */
  gasUsed: Maybe<Scalars['BigFloat']['output']>;
};

export type GqlTransactionDistinctCountAggregates = {
  /** Distinct count of _blockRange across the matching connection */
  _blockRange: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of _id across the matching connection */
  _id: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of blockHash across the matching connection */
  blockHash: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of blockNumber across the matching connection */
  blockNumber: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of date across the matching connection */
  date: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of fees across the matching connection */
  fees: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of gasPrice across the matching connection */
  gasPrice: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of gasUsed across the matching connection */
  gasUsed: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of id across the matching connection */
  id: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of success across the matching connection */
  success: Maybe<Scalars['BigInt']['output']>;
};

/** A filter to be used against `Transaction` object types. All fields are combined with a logical ‘and.’ */
export type GqlTransactionFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<GqlTransactionFilter>>;
  /** Filter by the object’s `assetTransfers` relation. */
  assetTransfers?: InputMaybe<GqlTransactionToManyAssetTransferFilter>;
  /** Some related `assetTransfers` exist. */
  assetTransfersExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `blockHash` field. */
  blockHash?: InputMaybe<GqlStringFilter>;
  /** Filter by the object’s `blockNumber` field. */
  blockNumber?: InputMaybe<GqlBigFloatFilter>;
  /** Filter by the object’s `date` field. */
  date?: InputMaybe<GqlDatetimeFilter>;
  /** Filter by the object’s `fees` field. */
  fees?: InputMaybe<GqlBigFloatFilter>;
  /** Filter by the object’s `gasPrice` field. */
  gasPrice?: InputMaybe<GqlBigFloatFilter>;
  /** Filter by the object’s `gasUsed` field. */
  gasUsed?: InputMaybe<GqlBigFloatFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<GqlStringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<GqlTransactionFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<GqlTransactionFilter>>;
  /** Filter by the object’s `success` field. */
  success?: InputMaybe<GqlBooleanFilter>;
};

export type GqlTransactionMaxAggregates = {
  /** Maximum of blockNumber across the matching connection */
  blockNumber: Maybe<Scalars['BigFloat']['output']>;
  /** Maximum of fees across the matching connection */
  fees: Maybe<Scalars['BigFloat']['output']>;
  /** Maximum of gasPrice across the matching connection */
  gasPrice: Maybe<Scalars['BigFloat']['output']>;
  /** Maximum of gasUsed across the matching connection */
  gasUsed: Maybe<Scalars['BigFloat']['output']>;
};

export type GqlTransactionMinAggregates = {
  /** Minimum of blockNumber across the matching connection */
  blockNumber: Maybe<Scalars['BigFloat']['output']>;
  /** Minimum of fees across the matching connection */
  fees: Maybe<Scalars['BigFloat']['output']>;
  /** Minimum of gasPrice across the matching connection */
  gasPrice: Maybe<Scalars['BigFloat']['output']>;
  /** Minimum of gasUsed across the matching connection */
  gasUsed: Maybe<Scalars['BigFloat']['output']>;
};

/** A connection to a list of `Nft` values, with data from `AssetTransfer`. */
export type GqlTransactionNftsByAssetTransferTransactionIdAndNftIdManyToManyConnection = {
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates: Maybe<GqlNftAggregates>;
  /** A list of edges which contains the `Nft`, info from the `AssetTransfer`, and the cursor to aid in pagination. */
  edges: Array<GqlTransactionNftsByAssetTransferTransactionIdAndNftIdManyToManyEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates: Maybe<Array<GqlNftAggregates>>;
  /** A list of `Nft` objects. */
  nodes: Array<Maybe<GqlNft>>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
  /** The count of *all* `Nft` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `Nft` values, with data from `AssetTransfer`. */
export type GqlTransactionNftsByAssetTransferTransactionIdAndNftIdManyToManyConnectiongroupedAggregatesArgs = {
  groupBy: Array<GqlNftsGroupBy>;
  having?: InputMaybe<GqlNftsHavingInput>;
};

/** A `Nft` edge in the connection, with data from `AssetTransfer`. */
export type GqlTransactionNftsByAssetTransferTransactionIdAndNftIdManyToManyEdge = {
  /** Reads and enables pagination through a set of `AssetTransfer`. */
  assetTransfers: GqlAssetTransfersConnection;
  /** A cursor for use in pagination. */
  cursor: Maybe<Scalars['Cursor']['output']>;
  /** The `Nft` at the end of the edge. */
  node: Maybe<GqlNft>;
};


/** A `Nft` edge in the connection, with data from `AssetTransfer`. */
export type GqlTransactionNftsByAssetTransferTransactionIdAndNftIdManyToManyEdgeassetTransfersArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqlasset_transfers_distinct_enum>>>;
  filter?: InputMaybe<GqlAssetTransferFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlAssetTransfersOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
};

export type GqlTransactionStddevPopulationAggregates = {
  /** Population standard deviation of blockNumber across the matching connection */
  blockNumber: Maybe<Scalars['BigFloat']['output']>;
  /** Population standard deviation of fees across the matching connection */
  fees: Maybe<Scalars['BigFloat']['output']>;
  /** Population standard deviation of gasPrice across the matching connection */
  gasPrice: Maybe<Scalars['BigFloat']['output']>;
  /** Population standard deviation of gasUsed across the matching connection */
  gasUsed: Maybe<Scalars['BigFloat']['output']>;
};

export type GqlTransactionStddevSampleAggregates = {
  /** Sample standard deviation of blockNumber across the matching connection */
  blockNumber: Maybe<Scalars['BigFloat']['output']>;
  /** Sample standard deviation of fees across the matching connection */
  fees: Maybe<Scalars['BigFloat']['output']>;
  /** Sample standard deviation of gasPrice across the matching connection */
  gasPrice: Maybe<Scalars['BigFloat']['output']>;
  /** Sample standard deviation of gasUsed across the matching connection */
  gasUsed: Maybe<Scalars['BigFloat']['output']>;
};

export type GqlTransactionSumAggregates = {
  /** Sum of blockNumber across the matching connection */
  blockNumber: Scalars['BigFloat']['output'];
  /** Sum of fees across the matching connection */
  fees: Scalars['BigFloat']['output'];
  /** Sum of gasPrice across the matching connection */
  gasPrice: Scalars['BigFloat']['output'];
  /** Sum of gasUsed across the matching connection */
  gasUsed: Scalars['BigFloat']['output'];
};

/** A filter to be used against many `AssetTransfer` object types. All fields are combined with a logical ‘and.’ */
export type GqlTransactionToManyAssetTransferFilter = {
  /** Aggregates across related `AssetTransfer` match the filter criteria. */
  aggregates?: InputMaybe<GqlAssetTransferAggregatesFilter>;
  /** Every related `AssetTransfer` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<GqlAssetTransferFilter>;
  /** No related `AssetTransfer` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<GqlAssetTransferFilter>;
  /** Some related `AssetTransfer` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<GqlAssetTransferFilter>;
};

/** A connection to a list of `TokenContract` values, with data from `AssetTransfer`. */
export type GqlTransactionTokenContractsByAssetTransferTransactionIdAndTokenIdManyToManyConnection = {
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates: Maybe<GqlTokenContractAggregates>;
  /** A list of edges which contains the `TokenContract`, info from the `AssetTransfer`, and the cursor to aid in pagination. */
  edges: Array<GqlTransactionTokenContractsByAssetTransferTransactionIdAndTokenIdManyToManyEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates: Maybe<Array<GqlTokenContractAggregates>>;
  /** A list of `TokenContract` objects. */
  nodes: Array<Maybe<GqlTokenContract>>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
  /** The count of *all* `TokenContract` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `TokenContract` values, with data from `AssetTransfer`. */
export type GqlTransactionTokenContractsByAssetTransferTransactionIdAndTokenIdManyToManyConnectiongroupedAggregatesArgs = {
  groupBy: Array<GqlTokenContractsGroupBy>;
  having?: InputMaybe<GqlTokenContractsHavingInput>;
};

/** A `TokenContract` edge in the connection, with data from `AssetTransfer`. */
export type GqlTransactionTokenContractsByAssetTransferTransactionIdAndTokenIdManyToManyEdge = {
  /** Reads and enables pagination through a set of `AssetTransfer`. */
  assetTransfersByTokenId: GqlAssetTransfersConnection;
  /** A cursor for use in pagination. */
  cursor: Maybe<Scalars['Cursor']['output']>;
  /** The `TokenContract` at the end of the edge. */
  node: Maybe<GqlTokenContract>;
};


/** A `TokenContract` edge in the connection, with data from `AssetTransfer`. */
export type GqlTransactionTokenContractsByAssetTransferTransactionIdAndTokenIdManyToManyEdgeassetTransfersByTokenIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqlasset_transfers_distinct_enum>>>;
  filter?: InputMaybe<GqlAssetTransferFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlAssetTransfersOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
};

export type GqlTransactionVariancePopulationAggregates = {
  /** Population variance of blockNumber across the matching connection */
  blockNumber: Maybe<Scalars['BigFloat']['output']>;
  /** Population variance of fees across the matching connection */
  fees: Maybe<Scalars['BigFloat']['output']>;
  /** Population variance of gasPrice across the matching connection */
  gasPrice: Maybe<Scalars['BigFloat']['output']>;
  /** Population variance of gasUsed across the matching connection */
  gasUsed: Maybe<Scalars['BigFloat']['output']>;
};

export type GqlTransactionVarianceSampleAggregates = {
  /** Sample variance of blockNumber across the matching connection */
  blockNumber: Maybe<Scalars['BigFloat']['output']>;
  /** Sample variance of fees across the matching connection */
  fees: Maybe<Scalars['BigFloat']['output']>;
  /** Sample variance of gasPrice across the matching connection */
  gasPrice: Maybe<Scalars['BigFloat']['output']>;
  /** Sample variance of gasUsed across the matching connection */
  gasUsed: Maybe<Scalars['BigFloat']['output']>;
};

/** A connection to a list of `Wallet` values, with data from `AssetTransfer`. */
export type GqlTransactionWalletsByAssetTransferTransactionIdAndFromIdManyToManyConnection = {
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates: Maybe<GqlWalletAggregates>;
  /** A list of edges which contains the `Wallet`, info from the `AssetTransfer`, and the cursor to aid in pagination. */
  edges: Array<GqlTransactionWalletsByAssetTransferTransactionIdAndFromIdManyToManyEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates: Maybe<Array<GqlWalletAggregates>>;
  /** A list of `Wallet` objects. */
  nodes: Array<Maybe<GqlWallet>>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
  /** The count of *all* `Wallet` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `Wallet` values, with data from `AssetTransfer`. */
export type GqlTransactionWalletsByAssetTransferTransactionIdAndFromIdManyToManyConnectiongroupedAggregatesArgs = {
  groupBy: Array<GqlWalletsGroupBy>;
  having?: InputMaybe<GqlWalletsHavingInput>;
};

/** A `Wallet` edge in the connection, with data from `AssetTransfer`. */
export type GqlTransactionWalletsByAssetTransferTransactionIdAndFromIdManyToManyEdge = {
  /** Reads and enables pagination through a set of `AssetTransfer`. */
  assetTransfersByFromId: GqlAssetTransfersConnection;
  /** A cursor for use in pagination. */
  cursor: Maybe<Scalars['Cursor']['output']>;
  /** The `Wallet` at the end of the edge. */
  node: Maybe<GqlWallet>;
};


/** A `Wallet` edge in the connection, with data from `AssetTransfer`. */
export type GqlTransactionWalletsByAssetTransferTransactionIdAndFromIdManyToManyEdgeassetTransfersByFromIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqlasset_transfers_distinct_enum>>>;
  filter?: InputMaybe<GqlAssetTransferFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlAssetTransfersOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
};

/** A connection to a list of `Wallet` values, with data from `AssetTransfer`. */
export type GqlTransactionWalletsByAssetTransferTransactionIdAndToIdManyToManyConnection = {
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates: Maybe<GqlWalletAggregates>;
  /** A list of edges which contains the `Wallet`, info from the `AssetTransfer`, and the cursor to aid in pagination. */
  edges: Array<GqlTransactionWalletsByAssetTransferTransactionIdAndToIdManyToManyEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates: Maybe<Array<GqlWalletAggregates>>;
  /** A list of `Wallet` objects. */
  nodes: Array<Maybe<GqlWallet>>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
  /** The count of *all* `Wallet` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `Wallet` values, with data from `AssetTransfer`. */
export type GqlTransactionWalletsByAssetTransferTransactionIdAndToIdManyToManyConnectiongroupedAggregatesArgs = {
  groupBy: Array<GqlWalletsGroupBy>;
  having?: InputMaybe<GqlWalletsHavingInput>;
};

/** A `Wallet` edge in the connection, with data from `AssetTransfer`. */
export type GqlTransactionWalletsByAssetTransferTransactionIdAndToIdManyToManyEdge = {
  /** Reads and enables pagination through a set of `AssetTransfer`. */
  assetTransfersByToId: GqlAssetTransfersConnection;
  /** A cursor for use in pagination. */
  cursor: Maybe<Scalars['Cursor']['output']>;
  /** The `Wallet` at the end of the edge. */
  node: Maybe<GqlWallet>;
};


/** A `Wallet` edge in the connection, with data from `AssetTransfer`. */
export type GqlTransactionWalletsByAssetTransferTransactionIdAndToIdManyToManyEdgeassetTransfersByToIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqlasset_transfers_distinct_enum>>>;
  filter?: InputMaybe<GqlAssetTransferFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlAssetTransfersOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
};

/** A connection to a list of `Transaction` values. */
export type GqlTransactionsConnection = {
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates: Maybe<GqlTransactionAggregates>;
  /** A list of edges which contains the `Transaction` and cursor to aid in pagination. */
  edges: Array<GqlTransactionsEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates: Maybe<Array<GqlTransactionAggregates>>;
  /** A list of `Transaction` objects. */
  nodes: Array<Maybe<GqlTransaction>>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
  /** The count of *all* `Transaction` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `Transaction` values. */
export type GqlTransactionsConnectiongroupedAggregatesArgs = {
  groupBy: Array<GqlTransactionsGroupBy>;
  having?: InputMaybe<GqlTransactionsHavingInput>;
};

/** A `Transaction` edge in the connection. */
export type GqlTransactionsEdge = {
  /** A cursor for use in pagination. */
  cursor: Maybe<Scalars['Cursor']['output']>;
  /** The `Transaction` at the end of the edge. */
  node: Maybe<GqlTransaction>;
};

/** Grouping methods for `Transaction` for usage during aggregation. */
export enum GqlTransactionsGroupBy {
  BLOCK_HASH = 'BLOCK_HASH',
  BLOCK_NUMBER = 'BLOCK_NUMBER',
  DATE = 'DATE',
  DATE_TRUNCATED_TO_DAY = 'DATE_TRUNCATED_TO_DAY',
  DATE_TRUNCATED_TO_HOUR = 'DATE_TRUNCATED_TO_HOUR',
  FEES = 'FEES',
  GAS_PRICE = 'GAS_PRICE',
  GAS_USED = 'GAS_USED',
  ID = 'ID',
  SUCCESS = 'SUCCESS'
}

export type GqlTransactionsHavingAverageInput = {
  blockNumber?: InputMaybe<GqlHavingBigfloatFilter>;
  date?: InputMaybe<GqlHavingDatetimeFilter>;
  fees?: InputMaybe<GqlHavingBigfloatFilter>;
  gasPrice?: InputMaybe<GqlHavingBigfloatFilter>;
  gasUsed?: InputMaybe<GqlHavingBigfloatFilter>;
};

export type GqlTransactionsHavingDistinctCountInput = {
  blockNumber?: InputMaybe<GqlHavingBigfloatFilter>;
  date?: InputMaybe<GqlHavingDatetimeFilter>;
  fees?: InputMaybe<GqlHavingBigfloatFilter>;
  gasPrice?: InputMaybe<GqlHavingBigfloatFilter>;
  gasUsed?: InputMaybe<GqlHavingBigfloatFilter>;
};

/** Conditions for `Transaction` aggregates. */
export type GqlTransactionsHavingInput = {
  AND?: InputMaybe<Array<GqlTransactionsHavingInput>>;
  OR?: InputMaybe<Array<GqlTransactionsHavingInput>>;
  average?: InputMaybe<GqlTransactionsHavingAverageInput>;
  distinctCount?: InputMaybe<GqlTransactionsHavingDistinctCountInput>;
  max?: InputMaybe<GqlTransactionsHavingMaxInput>;
  min?: InputMaybe<GqlTransactionsHavingMinInput>;
  stddevPopulation?: InputMaybe<GqlTransactionsHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<GqlTransactionsHavingStddevSampleInput>;
  sum?: InputMaybe<GqlTransactionsHavingSumInput>;
  variancePopulation?: InputMaybe<GqlTransactionsHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<GqlTransactionsHavingVarianceSampleInput>;
};

export type GqlTransactionsHavingMaxInput = {
  blockNumber?: InputMaybe<GqlHavingBigfloatFilter>;
  date?: InputMaybe<GqlHavingDatetimeFilter>;
  fees?: InputMaybe<GqlHavingBigfloatFilter>;
  gasPrice?: InputMaybe<GqlHavingBigfloatFilter>;
  gasUsed?: InputMaybe<GqlHavingBigfloatFilter>;
};

export type GqlTransactionsHavingMinInput = {
  blockNumber?: InputMaybe<GqlHavingBigfloatFilter>;
  date?: InputMaybe<GqlHavingDatetimeFilter>;
  fees?: InputMaybe<GqlHavingBigfloatFilter>;
  gasPrice?: InputMaybe<GqlHavingBigfloatFilter>;
  gasUsed?: InputMaybe<GqlHavingBigfloatFilter>;
};

export type GqlTransactionsHavingStddevPopulationInput = {
  blockNumber?: InputMaybe<GqlHavingBigfloatFilter>;
  date?: InputMaybe<GqlHavingDatetimeFilter>;
  fees?: InputMaybe<GqlHavingBigfloatFilter>;
  gasPrice?: InputMaybe<GqlHavingBigfloatFilter>;
  gasUsed?: InputMaybe<GqlHavingBigfloatFilter>;
};

export type GqlTransactionsHavingStddevSampleInput = {
  blockNumber?: InputMaybe<GqlHavingBigfloatFilter>;
  date?: InputMaybe<GqlHavingDatetimeFilter>;
  fees?: InputMaybe<GqlHavingBigfloatFilter>;
  gasPrice?: InputMaybe<GqlHavingBigfloatFilter>;
  gasUsed?: InputMaybe<GqlHavingBigfloatFilter>;
};

export type GqlTransactionsHavingSumInput = {
  blockNumber?: InputMaybe<GqlHavingBigfloatFilter>;
  date?: InputMaybe<GqlHavingDatetimeFilter>;
  fees?: InputMaybe<GqlHavingBigfloatFilter>;
  gasPrice?: InputMaybe<GqlHavingBigfloatFilter>;
  gasUsed?: InputMaybe<GqlHavingBigfloatFilter>;
};

export type GqlTransactionsHavingVariancePopulationInput = {
  blockNumber?: InputMaybe<GqlHavingBigfloatFilter>;
  date?: InputMaybe<GqlHavingDatetimeFilter>;
  fees?: InputMaybe<GqlHavingBigfloatFilter>;
  gasPrice?: InputMaybe<GqlHavingBigfloatFilter>;
  gasUsed?: InputMaybe<GqlHavingBigfloatFilter>;
};

export type GqlTransactionsHavingVarianceSampleInput = {
  blockNumber?: InputMaybe<GqlHavingBigfloatFilter>;
  date?: InputMaybe<GqlHavingDatetimeFilter>;
  fees?: InputMaybe<GqlHavingBigfloatFilter>;
  gasPrice?: InputMaybe<GqlHavingBigfloatFilter>;
  gasUsed?: InputMaybe<GqlHavingBigfloatFilter>;
};

/** Methods to use when ordering `Transaction`. */
export enum GqlTransactionsOrderBy {
  ASSET_TRANSFERS_AVERAGE_BLOCK_RANGE_ASC = 'ASSET_TRANSFERS_AVERAGE_BLOCK_RANGE_ASC',
  ASSET_TRANSFERS_AVERAGE_BLOCK_RANGE_DESC = 'ASSET_TRANSFERS_AVERAGE_BLOCK_RANGE_DESC',
  ASSET_TRANSFERS_AVERAGE_FROM_ID_ASC = 'ASSET_TRANSFERS_AVERAGE_FROM_ID_ASC',
  ASSET_TRANSFERS_AVERAGE_FROM_ID_DESC = 'ASSET_TRANSFERS_AVERAGE_FROM_ID_DESC',
  ASSET_TRANSFERS_AVERAGE_ID_ASC = 'ASSET_TRANSFERS_AVERAGE_ID_ASC',
  ASSET_TRANSFERS_AVERAGE_ID_DESC = 'ASSET_TRANSFERS_AVERAGE_ID_DESC',
  ASSET_TRANSFERS_AVERAGE_NFT_ID_ASC = 'ASSET_TRANSFERS_AVERAGE_NFT_ID_ASC',
  ASSET_TRANSFERS_AVERAGE_NFT_ID_DESC = 'ASSET_TRANSFERS_AVERAGE_NFT_ID_DESC',
  ASSET_TRANSFERS_AVERAGE_TOKEN_ID_ASC = 'ASSET_TRANSFERS_AVERAGE_TOKEN_ID_ASC',
  ASSET_TRANSFERS_AVERAGE_TOKEN_ID_DESC = 'ASSET_TRANSFERS_AVERAGE_TOKEN_ID_DESC',
  ASSET_TRANSFERS_AVERAGE_TO_ID_ASC = 'ASSET_TRANSFERS_AVERAGE_TO_ID_ASC',
  ASSET_TRANSFERS_AVERAGE_TO_ID_DESC = 'ASSET_TRANSFERS_AVERAGE_TO_ID_DESC',
  ASSET_TRANSFERS_AVERAGE_TRANSACTION_BLOCK_NUMBER_ASC = 'ASSET_TRANSFERS_AVERAGE_TRANSACTION_BLOCK_NUMBER_ASC',
  ASSET_TRANSFERS_AVERAGE_TRANSACTION_BLOCK_NUMBER_DESC = 'ASSET_TRANSFERS_AVERAGE_TRANSACTION_BLOCK_NUMBER_DESC',
  ASSET_TRANSFERS_AVERAGE_TRANSACTION_ID_ASC = 'ASSET_TRANSFERS_AVERAGE_TRANSACTION_ID_ASC',
  ASSET_TRANSFERS_AVERAGE_TRANSACTION_ID_DESC = 'ASSET_TRANSFERS_AVERAGE_TRANSACTION_ID_DESC',
  ASSET_TRANSFERS_AVERAGE_TYPE_ASC = 'ASSET_TRANSFERS_AVERAGE_TYPE_ASC',
  ASSET_TRANSFERS_AVERAGE_TYPE_DESC = 'ASSET_TRANSFERS_AVERAGE_TYPE_DESC',
  ASSET_TRANSFERS_AVERAGE_VALUE_ASC = 'ASSET_TRANSFERS_AVERAGE_VALUE_ASC',
  ASSET_TRANSFERS_AVERAGE_VALUE_DESC = 'ASSET_TRANSFERS_AVERAGE_VALUE_DESC',
  ASSET_TRANSFERS_COUNT_ASC = 'ASSET_TRANSFERS_COUNT_ASC',
  ASSET_TRANSFERS_COUNT_DESC = 'ASSET_TRANSFERS_COUNT_DESC',
  ASSET_TRANSFERS_DISTINCT_COUNT_BLOCK_RANGE_ASC = 'ASSET_TRANSFERS_DISTINCT_COUNT_BLOCK_RANGE_ASC',
  ASSET_TRANSFERS_DISTINCT_COUNT_BLOCK_RANGE_DESC = 'ASSET_TRANSFERS_DISTINCT_COUNT_BLOCK_RANGE_DESC',
  ASSET_TRANSFERS_DISTINCT_COUNT_FROM_ID_ASC = 'ASSET_TRANSFERS_DISTINCT_COUNT_FROM_ID_ASC',
  ASSET_TRANSFERS_DISTINCT_COUNT_FROM_ID_DESC = 'ASSET_TRANSFERS_DISTINCT_COUNT_FROM_ID_DESC',
  ASSET_TRANSFERS_DISTINCT_COUNT_ID_ASC = 'ASSET_TRANSFERS_DISTINCT_COUNT_ID_ASC',
  ASSET_TRANSFERS_DISTINCT_COUNT_ID_DESC = 'ASSET_TRANSFERS_DISTINCT_COUNT_ID_DESC',
  ASSET_TRANSFERS_DISTINCT_COUNT_NFT_ID_ASC = 'ASSET_TRANSFERS_DISTINCT_COUNT_NFT_ID_ASC',
  ASSET_TRANSFERS_DISTINCT_COUNT_NFT_ID_DESC = 'ASSET_TRANSFERS_DISTINCT_COUNT_NFT_ID_DESC',
  ASSET_TRANSFERS_DISTINCT_COUNT_TOKEN_ID_ASC = 'ASSET_TRANSFERS_DISTINCT_COUNT_TOKEN_ID_ASC',
  ASSET_TRANSFERS_DISTINCT_COUNT_TOKEN_ID_DESC = 'ASSET_TRANSFERS_DISTINCT_COUNT_TOKEN_ID_DESC',
  ASSET_TRANSFERS_DISTINCT_COUNT_TO_ID_ASC = 'ASSET_TRANSFERS_DISTINCT_COUNT_TO_ID_ASC',
  ASSET_TRANSFERS_DISTINCT_COUNT_TO_ID_DESC = 'ASSET_TRANSFERS_DISTINCT_COUNT_TO_ID_DESC',
  ASSET_TRANSFERS_DISTINCT_COUNT_TRANSACTION_BLOCK_NUMBER_ASC = 'ASSET_TRANSFERS_DISTINCT_COUNT_TRANSACTION_BLOCK_NUMBER_ASC',
  ASSET_TRANSFERS_DISTINCT_COUNT_TRANSACTION_BLOCK_NUMBER_DESC = 'ASSET_TRANSFERS_DISTINCT_COUNT_TRANSACTION_BLOCK_NUMBER_DESC',
  ASSET_TRANSFERS_DISTINCT_COUNT_TRANSACTION_ID_ASC = 'ASSET_TRANSFERS_DISTINCT_COUNT_TRANSACTION_ID_ASC',
  ASSET_TRANSFERS_DISTINCT_COUNT_TRANSACTION_ID_DESC = 'ASSET_TRANSFERS_DISTINCT_COUNT_TRANSACTION_ID_DESC',
  ASSET_TRANSFERS_DISTINCT_COUNT_TYPE_ASC = 'ASSET_TRANSFERS_DISTINCT_COUNT_TYPE_ASC',
  ASSET_TRANSFERS_DISTINCT_COUNT_TYPE_DESC = 'ASSET_TRANSFERS_DISTINCT_COUNT_TYPE_DESC',
  ASSET_TRANSFERS_DISTINCT_COUNT_VALUE_ASC = 'ASSET_TRANSFERS_DISTINCT_COUNT_VALUE_ASC',
  ASSET_TRANSFERS_DISTINCT_COUNT_VALUE_DESC = 'ASSET_TRANSFERS_DISTINCT_COUNT_VALUE_DESC',
  ASSET_TRANSFERS_MAX_BLOCK_RANGE_ASC = 'ASSET_TRANSFERS_MAX_BLOCK_RANGE_ASC',
  ASSET_TRANSFERS_MAX_BLOCK_RANGE_DESC = 'ASSET_TRANSFERS_MAX_BLOCK_RANGE_DESC',
  ASSET_TRANSFERS_MAX_FROM_ID_ASC = 'ASSET_TRANSFERS_MAX_FROM_ID_ASC',
  ASSET_TRANSFERS_MAX_FROM_ID_DESC = 'ASSET_TRANSFERS_MAX_FROM_ID_DESC',
  ASSET_TRANSFERS_MAX_ID_ASC = 'ASSET_TRANSFERS_MAX_ID_ASC',
  ASSET_TRANSFERS_MAX_ID_DESC = 'ASSET_TRANSFERS_MAX_ID_DESC',
  ASSET_TRANSFERS_MAX_NFT_ID_ASC = 'ASSET_TRANSFERS_MAX_NFT_ID_ASC',
  ASSET_TRANSFERS_MAX_NFT_ID_DESC = 'ASSET_TRANSFERS_MAX_NFT_ID_DESC',
  ASSET_TRANSFERS_MAX_TOKEN_ID_ASC = 'ASSET_TRANSFERS_MAX_TOKEN_ID_ASC',
  ASSET_TRANSFERS_MAX_TOKEN_ID_DESC = 'ASSET_TRANSFERS_MAX_TOKEN_ID_DESC',
  ASSET_TRANSFERS_MAX_TO_ID_ASC = 'ASSET_TRANSFERS_MAX_TO_ID_ASC',
  ASSET_TRANSFERS_MAX_TO_ID_DESC = 'ASSET_TRANSFERS_MAX_TO_ID_DESC',
  ASSET_TRANSFERS_MAX_TRANSACTION_BLOCK_NUMBER_ASC = 'ASSET_TRANSFERS_MAX_TRANSACTION_BLOCK_NUMBER_ASC',
  ASSET_TRANSFERS_MAX_TRANSACTION_BLOCK_NUMBER_DESC = 'ASSET_TRANSFERS_MAX_TRANSACTION_BLOCK_NUMBER_DESC',
  ASSET_TRANSFERS_MAX_TRANSACTION_ID_ASC = 'ASSET_TRANSFERS_MAX_TRANSACTION_ID_ASC',
  ASSET_TRANSFERS_MAX_TRANSACTION_ID_DESC = 'ASSET_TRANSFERS_MAX_TRANSACTION_ID_DESC',
  ASSET_TRANSFERS_MAX_TYPE_ASC = 'ASSET_TRANSFERS_MAX_TYPE_ASC',
  ASSET_TRANSFERS_MAX_TYPE_DESC = 'ASSET_TRANSFERS_MAX_TYPE_DESC',
  ASSET_TRANSFERS_MAX_VALUE_ASC = 'ASSET_TRANSFERS_MAX_VALUE_ASC',
  ASSET_TRANSFERS_MAX_VALUE_DESC = 'ASSET_TRANSFERS_MAX_VALUE_DESC',
  ASSET_TRANSFERS_MIN_BLOCK_RANGE_ASC = 'ASSET_TRANSFERS_MIN_BLOCK_RANGE_ASC',
  ASSET_TRANSFERS_MIN_BLOCK_RANGE_DESC = 'ASSET_TRANSFERS_MIN_BLOCK_RANGE_DESC',
  ASSET_TRANSFERS_MIN_FROM_ID_ASC = 'ASSET_TRANSFERS_MIN_FROM_ID_ASC',
  ASSET_TRANSFERS_MIN_FROM_ID_DESC = 'ASSET_TRANSFERS_MIN_FROM_ID_DESC',
  ASSET_TRANSFERS_MIN_ID_ASC = 'ASSET_TRANSFERS_MIN_ID_ASC',
  ASSET_TRANSFERS_MIN_ID_DESC = 'ASSET_TRANSFERS_MIN_ID_DESC',
  ASSET_TRANSFERS_MIN_NFT_ID_ASC = 'ASSET_TRANSFERS_MIN_NFT_ID_ASC',
  ASSET_TRANSFERS_MIN_NFT_ID_DESC = 'ASSET_TRANSFERS_MIN_NFT_ID_DESC',
  ASSET_TRANSFERS_MIN_TOKEN_ID_ASC = 'ASSET_TRANSFERS_MIN_TOKEN_ID_ASC',
  ASSET_TRANSFERS_MIN_TOKEN_ID_DESC = 'ASSET_TRANSFERS_MIN_TOKEN_ID_DESC',
  ASSET_TRANSFERS_MIN_TO_ID_ASC = 'ASSET_TRANSFERS_MIN_TO_ID_ASC',
  ASSET_TRANSFERS_MIN_TO_ID_DESC = 'ASSET_TRANSFERS_MIN_TO_ID_DESC',
  ASSET_TRANSFERS_MIN_TRANSACTION_BLOCK_NUMBER_ASC = 'ASSET_TRANSFERS_MIN_TRANSACTION_BLOCK_NUMBER_ASC',
  ASSET_TRANSFERS_MIN_TRANSACTION_BLOCK_NUMBER_DESC = 'ASSET_TRANSFERS_MIN_TRANSACTION_BLOCK_NUMBER_DESC',
  ASSET_TRANSFERS_MIN_TRANSACTION_ID_ASC = 'ASSET_TRANSFERS_MIN_TRANSACTION_ID_ASC',
  ASSET_TRANSFERS_MIN_TRANSACTION_ID_DESC = 'ASSET_TRANSFERS_MIN_TRANSACTION_ID_DESC',
  ASSET_TRANSFERS_MIN_TYPE_ASC = 'ASSET_TRANSFERS_MIN_TYPE_ASC',
  ASSET_TRANSFERS_MIN_TYPE_DESC = 'ASSET_TRANSFERS_MIN_TYPE_DESC',
  ASSET_TRANSFERS_MIN_VALUE_ASC = 'ASSET_TRANSFERS_MIN_VALUE_ASC',
  ASSET_TRANSFERS_MIN_VALUE_DESC = 'ASSET_TRANSFERS_MIN_VALUE_DESC',
  ASSET_TRANSFERS_STDDEV_POPULATION_BLOCK_RANGE_ASC = 'ASSET_TRANSFERS_STDDEV_POPULATION_BLOCK_RANGE_ASC',
  ASSET_TRANSFERS_STDDEV_POPULATION_BLOCK_RANGE_DESC = 'ASSET_TRANSFERS_STDDEV_POPULATION_BLOCK_RANGE_DESC',
  ASSET_TRANSFERS_STDDEV_POPULATION_FROM_ID_ASC = 'ASSET_TRANSFERS_STDDEV_POPULATION_FROM_ID_ASC',
  ASSET_TRANSFERS_STDDEV_POPULATION_FROM_ID_DESC = 'ASSET_TRANSFERS_STDDEV_POPULATION_FROM_ID_DESC',
  ASSET_TRANSFERS_STDDEV_POPULATION_ID_ASC = 'ASSET_TRANSFERS_STDDEV_POPULATION_ID_ASC',
  ASSET_TRANSFERS_STDDEV_POPULATION_ID_DESC = 'ASSET_TRANSFERS_STDDEV_POPULATION_ID_DESC',
  ASSET_TRANSFERS_STDDEV_POPULATION_NFT_ID_ASC = 'ASSET_TRANSFERS_STDDEV_POPULATION_NFT_ID_ASC',
  ASSET_TRANSFERS_STDDEV_POPULATION_NFT_ID_DESC = 'ASSET_TRANSFERS_STDDEV_POPULATION_NFT_ID_DESC',
  ASSET_TRANSFERS_STDDEV_POPULATION_TOKEN_ID_ASC = 'ASSET_TRANSFERS_STDDEV_POPULATION_TOKEN_ID_ASC',
  ASSET_TRANSFERS_STDDEV_POPULATION_TOKEN_ID_DESC = 'ASSET_TRANSFERS_STDDEV_POPULATION_TOKEN_ID_DESC',
  ASSET_TRANSFERS_STDDEV_POPULATION_TO_ID_ASC = 'ASSET_TRANSFERS_STDDEV_POPULATION_TO_ID_ASC',
  ASSET_TRANSFERS_STDDEV_POPULATION_TO_ID_DESC = 'ASSET_TRANSFERS_STDDEV_POPULATION_TO_ID_DESC',
  ASSET_TRANSFERS_STDDEV_POPULATION_TRANSACTION_BLOCK_NUMBER_ASC = 'ASSET_TRANSFERS_STDDEV_POPULATION_TRANSACTION_BLOCK_NUMBER_ASC',
  ASSET_TRANSFERS_STDDEV_POPULATION_TRANSACTION_BLOCK_NUMBER_DESC = 'ASSET_TRANSFERS_STDDEV_POPULATION_TRANSACTION_BLOCK_NUMBER_DESC',
  ASSET_TRANSFERS_STDDEV_POPULATION_TRANSACTION_ID_ASC = 'ASSET_TRANSFERS_STDDEV_POPULATION_TRANSACTION_ID_ASC',
  ASSET_TRANSFERS_STDDEV_POPULATION_TRANSACTION_ID_DESC = 'ASSET_TRANSFERS_STDDEV_POPULATION_TRANSACTION_ID_DESC',
  ASSET_TRANSFERS_STDDEV_POPULATION_TYPE_ASC = 'ASSET_TRANSFERS_STDDEV_POPULATION_TYPE_ASC',
  ASSET_TRANSFERS_STDDEV_POPULATION_TYPE_DESC = 'ASSET_TRANSFERS_STDDEV_POPULATION_TYPE_DESC',
  ASSET_TRANSFERS_STDDEV_POPULATION_VALUE_ASC = 'ASSET_TRANSFERS_STDDEV_POPULATION_VALUE_ASC',
  ASSET_TRANSFERS_STDDEV_POPULATION_VALUE_DESC = 'ASSET_TRANSFERS_STDDEV_POPULATION_VALUE_DESC',
  ASSET_TRANSFERS_STDDEV_SAMPLE_BLOCK_RANGE_ASC = 'ASSET_TRANSFERS_STDDEV_SAMPLE_BLOCK_RANGE_ASC',
  ASSET_TRANSFERS_STDDEV_SAMPLE_BLOCK_RANGE_DESC = 'ASSET_TRANSFERS_STDDEV_SAMPLE_BLOCK_RANGE_DESC',
  ASSET_TRANSFERS_STDDEV_SAMPLE_FROM_ID_ASC = 'ASSET_TRANSFERS_STDDEV_SAMPLE_FROM_ID_ASC',
  ASSET_TRANSFERS_STDDEV_SAMPLE_FROM_ID_DESC = 'ASSET_TRANSFERS_STDDEV_SAMPLE_FROM_ID_DESC',
  ASSET_TRANSFERS_STDDEV_SAMPLE_ID_ASC = 'ASSET_TRANSFERS_STDDEV_SAMPLE_ID_ASC',
  ASSET_TRANSFERS_STDDEV_SAMPLE_ID_DESC = 'ASSET_TRANSFERS_STDDEV_SAMPLE_ID_DESC',
  ASSET_TRANSFERS_STDDEV_SAMPLE_NFT_ID_ASC = 'ASSET_TRANSFERS_STDDEV_SAMPLE_NFT_ID_ASC',
  ASSET_TRANSFERS_STDDEV_SAMPLE_NFT_ID_DESC = 'ASSET_TRANSFERS_STDDEV_SAMPLE_NFT_ID_DESC',
  ASSET_TRANSFERS_STDDEV_SAMPLE_TOKEN_ID_ASC = 'ASSET_TRANSFERS_STDDEV_SAMPLE_TOKEN_ID_ASC',
  ASSET_TRANSFERS_STDDEV_SAMPLE_TOKEN_ID_DESC = 'ASSET_TRANSFERS_STDDEV_SAMPLE_TOKEN_ID_DESC',
  ASSET_TRANSFERS_STDDEV_SAMPLE_TO_ID_ASC = 'ASSET_TRANSFERS_STDDEV_SAMPLE_TO_ID_ASC',
  ASSET_TRANSFERS_STDDEV_SAMPLE_TO_ID_DESC = 'ASSET_TRANSFERS_STDDEV_SAMPLE_TO_ID_DESC',
  ASSET_TRANSFERS_STDDEV_SAMPLE_TRANSACTION_BLOCK_NUMBER_ASC = 'ASSET_TRANSFERS_STDDEV_SAMPLE_TRANSACTION_BLOCK_NUMBER_ASC',
  ASSET_TRANSFERS_STDDEV_SAMPLE_TRANSACTION_BLOCK_NUMBER_DESC = 'ASSET_TRANSFERS_STDDEV_SAMPLE_TRANSACTION_BLOCK_NUMBER_DESC',
  ASSET_TRANSFERS_STDDEV_SAMPLE_TRANSACTION_ID_ASC = 'ASSET_TRANSFERS_STDDEV_SAMPLE_TRANSACTION_ID_ASC',
  ASSET_TRANSFERS_STDDEV_SAMPLE_TRANSACTION_ID_DESC = 'ASSET_TRANSFERS_STDDEV_SAMPLE_TRANSACTION_ID_DESC',
  ASSET_TRANSFERS_STDDEV_SAMPLE_TYPE_ASC = 'ASSET_TRANSFERS_STDDEV_SAMPLE_TYPE_ASC',
  ASSET_TRANSFERS_STDDEV_SAMPLE_TYPE_DESC = 'ASSET_TRANSFERS_STDDEV_SAMPLE_TYPE_DESC',
  ASSET_TRANSFERS_STDDEV_SAMPLE_VALUE_ASC = 'ASSET_TRANSFERS_STDDEV_SAMPLE_VALUE_ASC',
  ASSET_TRANSFERS_STDDEV_SAMPLE_VALUE_DESC = 'ASSET_TRANSFERS_STDDEV_SAMPLE_VALUE_DESC',
  ASSET_TRANSFERS_SUM_BLOCK_RANGE_ASC = 'ASSET_TRANSFERS_SUM_BLOCK_RANGE_ASC',
  ASSET_TRANSFERS_SUM_BLOCK_RANGE_DESC = 'ASSET_TRANSFERS_SUM_BLOCK_RANGE_DESC',
  ASSET_TRANSFERS_SUM_FROM_ID_ASC = 'ASSET_TRANSFERS_SUM_FROM_ID_ASC',
  ASSET_TRANSFERS_SUM_FROM_ID_DESC = 'ASSET_TRANSFERS_SUM_FROM_ID_DESC',
  ASSET_TRANSFERS_SUM_ID_ASC = 'ASSET_TRANSFERS_SUM_ID_ASC',
  ASSET_TRANSFERS_SUM_ID_DESC = 'ASSET_TRANSFERS_SUM_ID_DESC',
  ASSET_TRANSFERS_SUM_NFT_ID_ASC = 'ASSET_TRANSFERS_SUM_NFT_ID_ASC',
  ASSET_TRANSFERS_SUM_NFT_ID_DESC = 'ASSET_TRANSFERS_SUM_NFT_ID_DESC',
  ASSET_TRANSFERS_SUM_TOKEN_ID_ASC = 'ASSET_TRANSFERS_SUM_TOKEN_ID_ASC',
  ASSET_TRANSFERS_SUM_TOKEN_ID_DESC = 'ASSET_TRANSFERS_SUM_TOKEN_ID_DESC',
  ASSET_TRANSFERS_SUM_TO_ID_ASC = 'ASSET_TRANSFERS_SUM_TO_ID_ASC',
  ASSET_TRANSFERS_SUM_TO_ID_DESC = 'ASSET_TRANSFERS_SUM_TO_ID_DESC',
  ASSET_TRANSFERS_SUM_TRANSACTION_BLOCK_NUMBER_ASC = 'ASSET_TRANSFERS_SUM_TRANSACTION_BLOCK_NUMBER_ASC',
  ASSET_TRANSFERS_SUM_TRANSACTION_BLOCK_NUMBER_DESC = 'ASSET_TRANSFERS_SUM_TRANSACTION_BLOCK_NUMBER_DESC',
  ASSET_TRANSFERS_SUM_TRANSACTION_ID_ASC = 'ASSET_TRANSFERS_SUM_TRANSACTION_ID_ASC',
  ASSET_TRANSFERS_SUM_TRANSACTION_ID_DESC = 'ASSET_TRANSFERS_SUM_TRANSACTION_ID_DESC',
  ASSET_TRANSFERS_SUM_TYPE_ASC = 'ASSET_TRANSFERS_SUM_TYPE_ASC',
  ASSET_TRANSFERS_SUM_TYPE_DESC = 'ASSET_TRANSFERS_SUM_TYPE_DESC',
  ASSET_TRANSFERS_SUM_VALUE_ASC = 'ASSET_TRANSFERS_SUM_VALUE_ASC',
  ASSET_TRANSFERS_SUM_VALUE_DESC = 'ASSET_TRANSFERS_SUM_VALUE_DESC',
  ASSET_TRANSFERS_VARIANCE_POPULATION_BLOCK_RANGE_ASC = 'ASSET_TRANSFERS_VARIANCE_POPULATION_BLOCK_RANGE_ASC',
  ASSET_TRANSFERS_VARIANCE_POPULATION_BLOCK_RANGE_DESC = 'ASSET_TRANSFERS_VARIANCE_POPULATION_BLOCK_RANGE_DESC',
  ASSET_TRANSFERS_VARIANCE_POPULATION_FROM_ID_ASC = 'ASSET_TRANSFERS_VARIANCE_POPULATION_FROM_ID_ASC',
  ASSET_TRANSFERS_VARIANCE_POPULATION_FROM_ID_DESC = 'ASSET_TRANSFERS_VARIANCE_POPULATION_FROM_ID_DESC',
  ASSET_TRANSFERS_VARIANCE_POPULATION_ID_ASC = 'ASSET_TRANSFERS_VARIANCE_POPULATION_ID_ASC',
  ASSET_TRANSFERS_VARIANCE_POPULATION_ID_DESC = 'ASSET_TRANSFERS_VARIANCE_POPULATION_ID_DESC',
  ASSET_TRANSFERS_VARIANCE_POPULATION_NFT_ID_ASC = 'ASSET_TRANSFERS_VARIANCE_POPULATION_NFT_ID_ASC',
  ASSET_TRANSFERS_VARIANCE_POPULATION_NFT_ID_DESC = 'ASSET_TRANSFERS_VARIANCE_POPULATION_NFT_ID_DESC',
  ASSET_TRANSFERS_VARIANCE_POPULATION_TOKEN_ID_ASC = 'ASSET_TRANSFERS_VARIANCE_POPULATION_TOKEN_ID_ASC',
  ASSET_TRANSFERS_VARIANCE_POPULATION_TOKEN_ID_DESC = 'ASSET_TRANSFERS_VARIANCE_POPULATION_TOKEN_ID_DESC',
  ASSET_TRANSFERS_VARIANCE_POPULATION_TO_ID_ASC = 'ASSET_TRANSFERS_VARIANCE_POPULATION_TO_ID_ASC',
  ASSET_TRANSFERS_VARIANCE_POPULATION_TO_ID_DESC = 'ASSET_TRANSFERS_VARIANCE_POPULATION_TO_ID_DESC',
  ASSET_TRANSFERS_VARIANCE_POPULATION_TRANSACTION_BLOCK_NUMBER_ASC = 'ASSET_TRANSFERS_VARIANCE_POPULATION_TRANSACTION_BLOCK_NUMBER_ASC',
  ASSET_TRANSFERS_VARIANCE_POPULATION_TRANSACTION_BLOCK_NUMBER_DESC = 'ASSET_TRANSFERS_VARIANCE_POPULATION_TRANSACTION_BLOCK_NUMBER_DESC',
  ASSET_TRANSFERS_VARIANCE_POPULATION_TRANSACTION_ID_ASC = 'ASSET_TRANSFERS_VARIANCE_POPULATION_TRANSACTION_ID_ASC',
  ASSET_TRANSFERS_VARIANCE_POPULATION_TRANSACTION_ID_DESC = 'ASSET_TRANSFERS_VARIANCE_POPULATION_TRANSACTION_ID_DESC',
  ASSET_TRANSFERS_VARIANCE_POPULATION_TYPE_ASC = 'ASSET_TRANSFERS_VARIANCE_POPULATION_TYPE_ASC',
  ASSET_TRANSFERS_VARIANCE_POPULATION_TYPE_DESC = 'ASSET_TRANSFERS_VARIANCE_POPULATION_TYPE_DESC',
  ASSET_TRANSFERS_VARIANCE_POPULATION_VALUE_ASC = 'ASSET_TRANSFERS_VARIANCE_POPULATION_VALUE_ASC',
  ASSET_TRANSFERS_VARIANCE_POPULATION_VALUE_DESC = 'ASSET_TRANSFERS_VARIANCE_POPULATION_VALUE_DESC',
  ASSET_TRANSFERS_VARIANCE_SAMPLE_BLOCK_RANGE_ASC = 'ASSET_TRANSFERS_VARIANCE_SAMPLE_BLOCK_RANGE_ASC',
  ASSET_TRANSFERS_VARIANCE_SAMPLE_BLOCK_RANGE_DESC = 'ASSET_TRANSFERS_VARIANCE_SAMPLE_BLOCK_RANGE_DESC',
  ASSET_TRANSFERS_VARIANCE_SAMPLE_FROM_ID_ASC = 'ASSET_TRANSFERS_VARIANCE_SAMPLE_FROM_ID_ASC',
  ASSET_TRANSFERS_VARIANCE_SAMPLE_FROM_ID_DESC = 'ASSET_TRANSFERS_VARIANCE_SAMPLE_FROM_ID_DESC',
  ASSET_TRANSFERS_VARIANCE_SAMPLE_ID_ASC = 'ASSET_TRANSFERS_VARIANCE_SAMPLE_ID_ASC',
  ASSET_TRANSFERS_VARIANCE_SAMPLE_ID_DESC = 'ASSET_TRANSFERS_VARIANCE_SAMPLE_ID_DESC',
  ASSET_TRANSFERS_VARIANCE_SAMPLE_NFT_ID_ASC = 'ASSET_TRANSFERS_VARIANCE_SAMPLE_NFT_ID_ASC',
  ASSET_TRANSFERS_VARIANCE_SAMPLE_NFT_ID_DESC = 'ASSET_TRANSFERS_VARIANCE_SAMPLE_NFT_ID_DESC',
  ASSET_TRANSFERS_VARIANCE_SAMPLE_TOKEN_ID_ASC = 'ASSET_TRANSFERS_VARIANCE_SAMPLE_TOKEN_ID_ASC',
  ASSET_TRANSFERS_VARIANCE_SAMPLE_TOKEN_ID_DESC = 'ASSET_TRANSFERS_VARIANCE_SAMPLE_TOKEN_ID_DESC',
  ASSET_TRANSFERS_VARIANCE_SAMPLE_TO_ID_ASC = 'ASSET_TRANSFERS_VARIANCE_SAMPLE_TO_ID_ASC',
  ASSET_TRANSFERS_VARIANCE_SAMPLE_TO_ID_DESC = 'ASSET_TRANSFERS_VARIANCE_SAMPLE_TO_ID_DESC',
  ASSET_TRANSFERS_VARIANCE_SAMPLE_TRANSACTION_BLOCK_NUMBER_ASC = 'ASSET_TRANSFERS_VARIANCE_SAMPLE_TRANSACTION_BLOCK_NUMBER_ASC',
  ASSET_TRANSFERS_VARIANCE_SAMPLE_TRANSACTION_BLOCK_NUMBER_DESC = 'ASSET_TRANSFERS_VARIANCE_SAMPLE_TRANSACTION_BLOCK_NUMBER_DESC',
  ASSET_TRANSFERS_VARIANCE_SAMPLE_TRANSACTION_ID_ASC = 'ASSET_TRANSFERS_VARIANCE_SAMPLE_TRANSACTION_ID_ASC',
  ASSET_TRANSFERS_VARIANCE_SAMPLE_TRANSACTION_ID_DESC = 'ASSET_TRANSFERS_VARIANCE_SAMPLE_TRANSACTION_ID_DESC',
  ASSET_TRANSFERS_VARIANCE_SAMPLE_TYPE_ASC = 'ASSET_TRANSFERS_VARIANCE_SAMPLE_TYPE_ASC',
  ASSET_TRANSFERS_VARIANCE_SAMPLE_TYPE_DESC = 'ASSET_TRANSFERS_VARIANCE_SAMPLE_TYPE_DESC',
  ASSET_TRANSFERS_VARIANCE_SAMPLE_VALUE_ASC = 'ASSET_TRANSFERS_VARIANCE_SAMPLE_VALUE_ASC',
  ASSET_TRANSFERS_VARIANCE_SAMPLE_VALUE_DESC = 'ASSET_TRANSFERS_VARIANCE_SAMPLE_VALUE_DESC',
  BLOCK_HASH_ASC = 'BLOCK_HASH_ASC',
  BLOCK_HASH_DESC = 'BLOCK_HASH_DESC',
  BLOCK_NUMBER_ASC = 'BLOCK_NUMBER_ASC',
  BLOCK_NUMBER_DESC = 'BLOCK_NUMBER_DESC',
  DATE_ASC = 'DATE_ASC',
  DATE_DESC = 'DATE_DESC',
  FEES_ASC = 'FEES_ASC',
  FEES_DESC = 'FEES_DESC',
  GAS_PRICE_ASC = 'GAS_PRICE_ASC',
  GAS_PRICE_DESC = 'GAS_PRICE_DESC',
  GAS_USED_ASC = 'GAS_USED_ASC',
  GAS_USED_DESC = 'GAS_USED_DESC',
  ID_ASC = 'ID_ASC',
  ID_DESC = 'ID_DESC',
  NATURAL = 'NATURAL',
  PRIMARY_KEY_ASC = 'PRIMARY_KEY_ASC',
  PRIMARY_KEY_DESC = 'PRIMARY_KEY_DESC',
  SUCCESS_ASC = 'SUCCESS_ASC',
  SUCCESS_DESC = 'SUCCESS_DESC'
}

export type GqlWallet = GqlNode & {
  /** Reads and enables pagination through a set of `AssetTransfer`. */
  assetTransfersByFromId: GqlAssetTransfersConnection;
  /** Reads and enables pagination through a set of `AssetTransfer`. */
  assetTransfersByToId: GqlAssetTransfersConnection;
  balance: Scalars['BigFloat']['output'];
  id: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `NftBalance`. */
  nfts: GqlNftBalancesConnection;
  /** Reads and enables pagination through a set of `Nft`. */
  nftsByAssetTransferFromIdAndNftId: GqlWalletNftsByAssetTransferFromIdAndNftIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Nft`. */
  nftsByAssetTransferToIdAndNftId: GqlWalletNftsByAssetTransferToIdAndNftIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Nft`. */
  nftsByNftBalanceWalletIdAndNftId: GqlWalletNftsByNftBalanceWalletIdAndNftIdManyToManyConnection;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads and enables pagination through a set of `TokenContract`. */
  tokenContractsByAssetTransferFromIdAndTokenId: GqlWalletTokenContractsByAssetTransferFromIdAndTokenIdManyToManyConnection;
  /** Reads and enables pagination through a set of `TokenContract`. */
  tokenContractsByAssetTransferToIdAndTokenId: GqlWalletTokenContractsByAssetTransferToIdAndTokenIdManyToManyConnection;
  /** Reads and enables pagination through a set of `TokenContract`. */
  tokenContractsByTokenBalanceWalletIdAndTokenId: GqlWalletTokenContractsByTokenBalanceWalletIdAndTokenIdManyToManyConnection;
  /** Reads and enables pagination through a set of `TokenBalance`. */
  tokens: GqlTokenBalancesConnection;
  /** Reads and enables pagination through a set of `Transaction`. */
  transactionsByAssetTransferFromIdAndTransactionId: GqlWalletTransactionsByAssetTransferFromIdAndTransactionIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Transaction`. */
  transactionsByAssetTransferToIdAndTransactionId: GqlWalletTransactionsByAssetTransferToIdAndTransactionIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Wallet`. */
  walletsByAssetTransferFromIdAndToId: GqlWalletWalletsByAssetTransferFromIdAndToIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Wallet`. */
  walletsByAssetTransferToIdAndFromId: GqlWalletWalletsByAssetTransferToIdAndFromIdManyToManyConnection;
};


export type GqlWalletassetTransfersByFromIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqlasset_transfers_distinct_enum>>>;
  filter?: InputMaybe<GqlAssetTransferFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlAssetTransfersOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
};


export type GqlWalletassetTransfersByToIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqlasset_transfers_distinct_enum>>>;
  filter?: InputMaybe<GqlAssetTransferFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlAssetTransfersOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
};


export type GqlWalletnftsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqlnft_balances_distinct_enum>>>;
  filter?: InputMaybe<GqlNftBalanceFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlNftBalancesOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
};


export type GqlWalletnftsByAssetTransferFromIdAndNftIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqlnfts_distinct_enum>>>;
  filter?: InputMaybe<GqlNftFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlNftsOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
};


export type GqlWalletnftsByAssetTransferToIdAndNftIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqlnfts_distinct_enum>>>;
  filter?: InputMaybe<GqlNftFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlNftsOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
};


export type GqlWalletnftsByNftBalanceWalletIdAndNftIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqlnfts_distinct_enum>>>;
  filter?: InputMaybe<GqlNftFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlNftsOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
};


export type GqlWallettokenContractsByAssetTransferFromIdAndTokenIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqltoken_contracts_distinct_enum>>>;
  filter?: InputMaybe<GqlTokenContractFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlTokenContractsOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
};


export type GqlWallettokenContractsByAssetTransferToIdAndTokenIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqltoken_contracts_distinct_enum>>>;
  filter?: InputMaybe<GqlTokenContractFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlTokenContractsOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
};


export type GqlWallettokenContractsByTokenBalanceWalletIdAndTokenIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqltoken_contracts_distinct_enum>>>;
  filter?: InputMaybe<GqlTokenContractFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlTokenContractsOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
};


export type GqlWallettokensArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqltoken_balances_distinct_enum>>>;
  filter?: InputMaybe<GqlTokenBalanceFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlTokenBalancesOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
};


export type GqlWallettransactionsByAssetTransferFromIdAndTransactionIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqltransactions_distinct_enum>>>;
  filter?: InputMaybe<GqlTransactionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlTransactionsOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
};


export type GqlWallettransactionsByAssetTransferToIdAndTransactionIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqltransactions_distinct_enum>>>;
  filter?: InputMaybe<GqlTransactionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlTransactionsOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
};


export type GqlWalletwalletsByAssetTransferFromIdAndToIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqlwallets_distinct_enum>>>;
  filter?: InputMaybe<GqlWalletFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlWalletsOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
};


export type GqlWalletwalletsByAssetTransferToIdAndFromIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqlwallets_distinct_enum>>>;
  filter?: InputMaybe<GqlWalletFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlWalletsOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
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
  and?: InputMaybe<Array<GqlWalletFilter>>;
  /** Filter by the object’s `assetTransfersByFromId` relation. */
  assetTransfersByFromId?: InputMaybe<GqlWalletToManyAssetTransferFilter>;
  /** Some related `assetTransfersByFromId` exist. */
  assetTransfersByFromIdExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `assetTransfersByToId` relation. */
  assetTransfersByToId?: InputMaybe<GqlWalletToManyAssetTransferFilter>;
  /** Some related `assetTransfersByToId` exist. */
  assetTransfersByToIdExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `balance` field. */
  balance?: InputMaybe<GqlBigFloatFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<GqlStringFilter>;
  /** Filter by the object’s `nfts` relation. */
  nfts?: InputMaybe<GqlWalletToManyNftBalanceFilter>;
  /** Some related `nfts` exist. */
  nftsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Negates the expression. */
  not?: InputMaybe<GqlWalletFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<GqlWalletFilter>>;
  /** Filter by the object’s `tokens` relation. */
  tokens?: InputMaybe<GqlWalletToManyTokenBalanceFilter>;
  /** Some related `tokens` exist. */
  tokensExist?: InputMaybe<Scalars['Boolean']['input']>;
};

export type GqlWalletMaxAggregates = {
  /** Maximum of balance across the matching connection */
  balance: Maybe<Scalars['BigFloat']['output']>;
};

export type GqlWalletMinAggregates = {
  /** Minimum of balance across the matching connection */
  balance: Maybe<Scalars['BigFloat']['output']>;
};

/** A connection to a list of `Nft` values, with data from `AssetTransfer`. */
export type GqlWalletNftsByAssetTransferFromIdAndNftIdManyToManyConnection = {
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates: Maybe<GqlNftAggregates>;
  /** A list of edges which contains the `Nft`, info from the `AssetTransfer`, and the cursor to aid in pagination. */
  edges: Array<GqlWalletNftsByAssetTransferFromIdAndNftIdManyToManyEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates: Maybe<Array<GqlNftAggregates>>;
  /** A list of `Nft` objects. */
  nodes: Array<Maybe<GqlNft>>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
  /** The count of *all* `Nft` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `Nft` values, with data from `AssetTransfer`. */
export type GqlWalletNftsByAssetTransferFromIdAndNftIdManyToManyConnectiongroupedAggregatesArgs = {
  groupBy: Array<GqlNftsGroupBy>;
  having?: InputMaybe<GqlNftsHavingInput>;
};

/** A `Nft` edge in the connection, with data from `AssetTransfer`. */
export type GqlWalletNftsByAssetTransferFromIdAndNftIdManyToManyEdge = {
  /** Reads and enables pagination through a set of `AssetTransfer`. */
  assetTransfers: GqlAssetTransfersConnection;
  /** A cursor for use in pagination. */
  cursor: Maybe<Scalars['Cursor']['output']>;
  /** The `Nft` at the end of the edge. */
  node: Maybe<GqlNft>;
};


/** A `Nft` edge in the connection, with data from `AssetTransfer`. */
export type GqlWalletNftsByAssetTransferFromIdAndNftIdManyToManyEdgeassetTransfersArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqlasset_transfers_distinct_enum>>>;
  filter?: InputMaybe<GqlAssetTransferFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlAssetTransfersOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
};

/** A connection to a list of `Nft` values, with data from `AssetTransfer`. */
export type GqlWalletNftsByAssetTransferToIdAndNftIdManyToManyConnection = {
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates: Maybe<GqlNftAggregates>;
  /** A list of edges which contains the `Nft`, info from the `AssetTransfer`, and the cursor to aid in pagination. */
  edges: Array<GqlWalletNftsByAssetTransferToIdAndNftIdManyToManyEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates: Maybe<Array<GqlNftAggregates>>;
  /** A list of `Nft` objects. */
  nodes: Array<Maybe<GqlNft>>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
  /** The count of *all* `Nft` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `Nft` values, with data from `AssetTransfer`. */
export type GqlWalletNftsByAssetTransferToIdAndNftIdManyToManyConnectiongroupedAggregatesArgs = {
  groupBy: Array<GqlNftsGroupBy>;
  having?: InputMaybe<GqlNftsHavingInput>;
};

/** A `Nft` edge in the connection, with data from `AssetTransfer`. */
export type GqlWalletNftsByAssetTransferToIdAndNftIdManyToManyEdge = {
  /** Reads and enables pagination through a set of `AssetTransfer`. */
  assetTransfers: GqlAssetTransfersConnection;
  /** A cursor for use in pagination. */
  cursor: Maybe<Scalars['Cursor']['output']>;
  /** The `Nft` at the end of the edge. */
  node: Maybe<GqlNft>;
};


/** A `Nft` edge in the connection, with data from `AssetTransfer`. */
export type GqlWalletNftsByAssetTransferToIdAndNftIdManyToManyEdgeassetTransfersArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqlasset_transfers_distinct_enum>>>;
  filter?: InputMaybe<GqlAssetTransferFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlAssetTransfersOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
};

/** A connection to a list of `Nft` values, with data from `NftBalance`. */
export type GqlWalletNftsByNftBalanceWalletIdAndNftIdManyToManyConnection = {
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates: Maybe<GqlNftAggregates>;
  /** A list of edges which contains the `Nft`, info from the `NftBalance`, and the cursor to aid in pagination. */
  edges: Array<GqlWalletNftsByNftBalanceWalletIdAndNftIdManyToManyEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates: Maybe<Array<GqlNftAggregates>>;
  /** A list of `Nft` objects. */
  nodes: Array<Maybe<GqlNft>>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
  /** The count of *all* `Nft` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `Nft` values, with data from `NftBalance`. */
export type GqlWalletNftsByNftBalanceWalletIdAndNftIdManyToManyConnectiongroupedAggregatesArgs = {
  groupBy: Array<GqlNftsGroupBy>;
  having?: InputMaybe<GqlNftsHavingInput>;
};

/** A `Nft` edge in the connection, with data from `NftBalance`. */
export type GqlWalletNftsByNftBalanceWalletIdAndNftIdManyToManyEdge = {
  /** A cursor for use in pagination. */
  cursor: Maybe<Scalars['Cursor']['output']>;
  /** Reads and enables pagination through a set of `NftBalance`. */
  nftBalances: GqlNftBalancesConnection;
  /** The `Nft` at the end of the edge. */
  node: Maybe<GqlNft>;
};


/** A `Nft` edge in the connection, with data from `NftBalance`. */
export type GqlWalletNftsByNftBalanceWalletIdAndNftIdManyToManyEdgenftBalancesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqlnft_balances_distinct_enum>>>;
  filter?: InputMaybe<GqlNftBalanceFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlNftBalancesOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
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

/** A filter to be used against many `AssetTransfer` object types. All fields are combined with a logical ‘and.’ */
export type GqlWalletToManyAssetTransferFilter = {
  /** Aggregates across related `AssetTransfer` match the filter criteria. */
  aggregates?: InputMaybe<GqlAssetTransferAggregatesFilter>;
  /** Every related `AssetTransfer` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<GqlAssetTransferFilter>;
  /** No related `AssetTransfer` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<GqlAssetTransferFilter>;
  /** Some related `AssetTransfer` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<GqlAssetTransferFilter>;
};

/** A filter to be used against many `NftBalance` object types. All fields are combined with a logical ‘and.’ */
export type GqlWalletToManyNftBalanceFilter = {
  /** Aggregates across related `NftBalance` match the filter criteria. */
  aggregates?: InputMaybe<GqlNftBalanceAggregatesFilter>;
  /** Every related `NftBalance` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<GqlNftBalanceFilter>;
  /** No related `NftBalance` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<GqlNftBalanceFilter>;
  /** Some related `NftBalance` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<GqlNftBalanceFilter>;
};

/** A filter to be used against many `TokenBalance` object types. All fields are combined with a logical ‘and.’ */
export type GqlWalletToManyTokenBalanceFilter = {
  /** Aggregates across related `TokenBalance` match the filter criteria. */
  aggregates?: InputMaybe<GqlTokenBalanceAggregatesFilter>;
  /** Every related `TokenBalance` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<GqlTokenBalanceFilter>;
  /** No related `TokenBalance` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<GqlTokenBalanceFilter>;
  /** Some related `TokenBalance` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<GqlTokenBalanceFilter>;
};

/** A connection to a list of `TokenContract` values, with data from `AssetTransfer`. */
export type GqlWalletTokenContractsByAssetTransferFromIdAndTokenIdManyToManyConnection = {
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates: Maybe<GqlTokenContractAggregates>;
  /** A list of edges which contains the `TokenContract`, info from the `AssetTransfer`, and the cursor to aid in pagination. */
  edges: Array<GqlWalletTokenContractsByAssetTransferFromIdAndTokenIdManyToManyEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates: Maybe<Array<GqlTokenContractAggregates>>;
  /** A list of `TokenContract` objects. */
  nodes: Array<Maybe<GqlTokenContract>>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
  /** The count of *all* `TokenContract` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `TokenContract` values, with data from `AssetTransfer`. */
export type GqlWalletTokenContractsByAssetTransferFromIdAndTokenIdManyToManyConnectiongroupedAggregatesArgs = {
  groupBy: Array<GqlTokenContractsGroupBy>;
  having?: InputMaybe<GqlTokenContractsHavingInput>;
};

/** A `TokenContract` edge in the connection, with data from `AssetTransfer`. */
export type GqlWalletTokenContractsByAssetTransferFromIdAndTokenIdManyToManyEdge = {
  /** Reads and enables pagination through a set of `AssetTransfer`. */
  assetTransfersByTokenId: GqlAssetTransfersConnection;
  /** A cursor for use in pagination. */
  cursor: Maybe<Scalars['Cursor']['output']>;
  /** The `TokenContract` at the end of the edge. */
  node: Maybe<GqlTokenContract>;
};


/** A `TokenContract` edge in the connection, with data from `AssetTransfer`. */
export type GqlWalletTokenContractsByAssetTransferFromIdAndTokenIdManyToManyEdgeassetTransfersByTokenIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqlasset_transfers_distinct_enum>>>;
  filter?: InputMaybe<GqlAssetTransferFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlAssetTransfersOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
};

/** A connection to a list of `TokenContract` values, with data from `AssetTransfer`. */
export type GqlWalletTokenContractsByAssetTransferToIdAndTokenIdManyToManyConnection = {
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates: Maybe<GqlTokenContractAggregates>;
  /** A list of edges which contains the `TokenContract`, info from the `AssetTransfer`, and the cursor to aid in pagination. */
  edges: Array<GqlWalletTokenContractsByAssetTransferToIdAndTokenIdManyToManyEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates: Maybe<Array<GqlTokenContractAggregates>>;
  /** A list of `TokenContract` objects. */
  nodes: Array<Maybe<GqlTokenContract>>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
  /** The count of *all* `TokenContract` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `TokenContract` values, with data from `AssetTransfer`. */
export type GqlWalletTokenContractsByAssetTransferToIdAndTokenIdManyToManyConnectiongroupedAggregatesArgs = {
  groupBy: Array<GqlTokenContractsGroupBy>;
  having?: InputMaybe<GqlTokenContractsHavingInput>;
};

/** A `TokenContract` edge in the connection, with data from `AssetTransfer`. */
export type GqlWalletTokenContractsByAssetTransferToIdAndTokenIdManyToManyEdge = {
  /** Reads and enables pagination through a set of `AssetTransfer`. */
  assetTransfersByTokenId: GqlAssetTransfersConnection;
  /** A cursor for use in pagination. */
  cursor: Maybe<Scalars['Cursor']['output']>;
  /** The `TokenContract` at the end of the edge. */
  node: Maybe<GqlTokenContract>;
};


/** A `TokenContract` edge in the connection, with data from `AssetTransfer`. */
export type GqlWalletTokenContractsByAssetTransferToIdAndTokenIdManyToManyEdgeassetTransfersByTokenIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqlasset_transfers_distinct_enum>>>;
  filter?: InputMaybe<GqlAssetTransferFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlAssetTransfersOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
};

/** A connection to a list of `TokenContract` values, with data from `TokenBalance`. */
export type GqlWalletTokenContractsByTokenBalanceWalletIdAndTokenIdManyToManyConnection = {
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates: Maybe<GqlTokenContractAggregates>;
  /** A list of edges which contains the `TokenContract`, info from the `TokenBalance`, and the cursor to aid in pagination. */
  edges: Array<GqlWalletTokenContractsByTokenBalanceWalletIdAndTokenIdManyToManyEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates: Maybe<Array<GqlTokenContractAggregates>>;
  /** A list of `TokenContract` objects. */
  nodes: Array<Maybe<GqlTokenContract>>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
  /** The count of *all* `TokenContract` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `TokenContract` values, with data from `TokenBalance`. */
export type GqlWalletTokenContractsByTokenBalanceWalletIdAndTokenIdManyToManyConnectiongroupedAggregatesArgs = {
  groupBy: Array<GqlTokenContractsGroupBy>;
  having?: InputMaybe<GqlTokenContractsHavingInput>;
};

/** A `TokenContract` edge in the connection, with data from `TokenBalance`. */
export type GqlWalletTokenContractsByTokenBalanceWalletIdAndTokenIdManyToManyEdge = {
  /** A cursor for use in pagination. */
  cursor: Maybe<Scalars['Cursor']['output']>;
  /** The `TokenContract` at the end of the edge. */
  node: Maybe<GqlTokenContract>;
  /** Reads and enables pagination through a set of `TokenBalance`. */
  tokenBalancesByTokenId: GqlTokenBalancesConnection;
};


/** A `TokenContract` edge in the connection, with data from `TokenBalance`. */
export type GqlWalletTokenContractsByTokenBalanceWalletIdAndTokenIdManyToManyEdgetokenBalancesByTokenIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqltoken_balances_distinct_enum>>>;
  filter?: InputMaybe<GqlTokenBalanceFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlTokenBalancesOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
};

/** A connection to a list of `Transaction` values, with data from `AssetTransfer`. */
export type GqlWalletTransactionsByAssetTransferFromIdAndTransactionIdManyToManyConnection = {
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates: Maybe<GqlTransactionAggregates>;
  /** A list of edges which contains the `Transaction`, info from the `AssetTransfer`, and the cursor to aid in pagination. */
  edges: Array<GqlWalletTransactionsByAssetTransferFromIdAndTransactionIdManyToManyEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates: Maybe<Array<GqlTransactionAggregates>>;
  /** A list of `Transaction` objects. */
  nodes: Array<Maybe<GqlTransaction>>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
  /** The count of *all* `Transaction` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `Transaction` values, with data from `AssetTransfer`. */
export type GqlWalletTransactionsByAssetTransferFromIdAndTransactionIdManyToManyConnectiongroupedAggregatesArgs = {
  groupBy: Array<GqlTransactionsGroupBy>;
  having?: InputMaybe<GqlTransactionsHavingInput>;
};

/** A `Transaction` edge in the connection, with data from `AssetTransfer`. */
export type GqlWalletTransactionsByAssetTransferFromIdAndTransactionIdManyToManyEdge = {
  /** Reads and enables pagination through a set of `AssetTransfer`. */
  assetTransfers: GqlAssetTransfersConnection;
  /** A cursor for use in pagination. */
  cursor: Maybe<Scalars['Cursor']['output']>;
  /** The `Transaction` at the end of the edge. */
  node: Maybe<GqlTransaction>;
};


/** A `Transaction` edge in the connection, with data from `AssetTransfer`. */
export type GqlWalletTransactionsByAssetTransferFromIdAndTransactionIdManyToManyEdgeassetTransfersArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqlasset_transfers_distinct_enum>>>;
  filter?: InputMaybe<GqlAssetTransferFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlAssetTransfersOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
};

/** A connection to a list of `Transaction` values, with data from `AssetTransfer`. */
export type GqlWalletTransactionsByAssetTransferToIdAndTransactionIdManyToManyConnection = {
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates: Maybe<GqlTransactionAggregates>;
  /** A list of edges which contains the `Transaction`, info from the `AssetTransfer`, and the cursor to aid in pagination. */
  edges: Array<GqlWalletTransactionsByAssetTransferToIdAndTransactionIdManyToManyEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates: Maybe<Array<GqlTransactionAggregates>>;
  /** A list of `Transaction` objects. */
  nodes: Array<Maybe<GqlTransaction>>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
  /** The count of *all* `Transaction` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `Transaction` values, with data from `AssetTransfer`. */
export type GqlWalletTransactionsByAssetTransferToIdAndTransactionIdManyToManyConnectiongroupedAggregatesArgs = {
  groupBy: Array<GqlTransactionsGroupBy>;
  having?: InputMaybe<GqlTransactionsHavingInput>;
};

/** A `Transaction` edge in the connection, with data from `AssetTransfer`. */
export type GqlWalletTransactionsByAssetTransferToIdAndTransactionIdManyToManyEdge = {
  /** Reads and enables pagination through a set of `AssetTransfer`. */
  assetTransfers: GqlAssetTransfersConnection;
  /** A cursor for use in pagination. */
  cursor: Maybe<Scalars['Cursor']['output']>;
  /** The `Transaction` at the end of the edge. */
  node: Maybe<GqlTransaction>;
};


/** A `Transaction` edge in the connection, with data from `AssetTransfer`. */
export type GqlWalletTransactionsByAssetTransferToIdAndTransactionIdManyToManyEdgeassetTransfersArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqlasset_transfers_distinct_enum>>>;
  filter?: InputMaybe<GqlAssetTransferFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlAssetTransfersOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
};

export type GqlWalletVariancePopulationAggregates = {
  /** Population variance of balance across the matching connection */
  balance: Maybe<Scalars['BigFloat']['output']>;
};

export type GqlWalletVarianceSampleAggregates = {
  /** Sample variance of balance across the matching connection */
  balance: Maybe<Scalars['BigFloat']['output']>;
};

/** A connection to a list of `Wallet` values, with data from `AssetTransfer`. */
export type GqlWalletWalletsByAssetTransferFromIdAndToIdManyToManyConnection = {
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates: Maybe<GqlWalletAggregates>;
  /** A list of edges which contains the `Wallet`, info from the `AssetTransfer`, and the cursor to aid in pagination. */
  edges: Array<GqlWalletWalletsByAssetTransferFromIdAndToIdManyToManyEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates: Maybe<Array<GqlWalletAggregates>>;
  /** A list of `Wallet` objects. */
  nodes: Array<Maybe<GqlWallet>>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
  /** The count of *all* `Wallet` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `Wallet` values, with data from `AssetTransfer`. */
export type GqlWalletWalletsByAssetTransferFromIdAndToIdManyToManyConnectiongroupedAggregatesArgs = {
  groupBy: Array<GqlWalletsGroupBy>;
  having?: InputMaybe<GqlWalletsHavingInput>;
};

/** A `Wallet` edge in the connection, with data from `AssetTransfer`. */
export type GqlWalletWalletsByAssetTransferFromIdAndToIdManyToManyEdge = {
  /** Reads and enables pagination through a set of `AssetTransfer`. */
  assetTransfersByToId: GqlAssetTransfersConnection;
  /** A cursor for use in pagination. */
  cursor: Maybe<Scalars['Cursor']['output']>;
  /** The `Wallet` at the end of the edge. */
  node: Maybe<GqlWallet>;
};


/** A `Wallet` edge in the connection, with data from `AssetTransfer`. */
export type GqlWalletWalletsByAssetTransferFromIdAndToIdManyToManyEdgeassetTransfersByToIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqlasset_transfers_distinct_enum>>>;
  filter?: InputMaybe<GqlAssetTransferFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlAssetTransfersOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
};

/** A connection to a list of `Wallet` values, with data from `AssetTransfer`. */
export type GqlWalletWalletsByAssetTransferToIdAndFromIdManyToManyConnection = {
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates: Maybe<GqlWalletAggregates>;
  /** A list of edges which contains the `Wallet`, info from the `AssetTransfer`, and the cursor to aid in pagination. */
  edges: Array<GqlWalletWalletsByAssetTransferToIdAndFromIdManyToManyEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates: Maybe<Array<GqlWalletAggregates>>;
  /** A list of `Wallet` objects. */
  nodes: Array<Maybe<GqlWallet>>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
  /** The count of *all* `Wallet` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `Wallet` values, with data from `AssetTransfer`. */
export type GqlWalletWalletsByAssetTransferToIdAndFromIdManyToManyConnectiongroupedAggregatesArgs = {
  groupBy: Array<GqlWalletsGroupBy>;
  having?: InputMaybe<GqlWalletsHavingInput>;
};

/** A `Wallet` edge in the connection, with data from `AssetTransfer`. */
export type GqlWalletWalletsByAssetTransferToIdAndFromIdManyToManyEdge = {
  /** Reads and enables pagination through a set of `AssetTransfer`. */
  assetTransfersByFromId: GqlAssetTransfersConnection;
  /** A cursor for use in pagination. */
  cursor: Maybe<Scalars['Cursor']['output']>;
  /** The `Wallet` at the end of the edge. */
  node: Maybe<GqlWallet>;
};


/** A `Wallet` edge in the connection, with data from `AssetTransfer`. */
export type GqlWalletWalletsByAssetTransferToIdAndFromIdManyToManyEdgeassetTransfersByFromIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  blockHeight?: InputMaybe<Scalars['String']['input']>;
  distinct?: InputMaybe<Array<InputMaybe<Gqlasset_transfers_distinct_enum>>>;
  filter?: InputMaybe<GqlAssetTransferFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GqlAssetTransfersOrderBy>>;
  orderByNull?: InputMaybe<GqlNullOrder>;
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
  having?: InputMaybe<GqlWalletsHavingInput>;
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
  balance?: InputMaybe<GqlHavingBigfloatFilter>;
};

export type GqlWalletsHavingDistinctCountInput = {
  balance?: InputMaybe<GqlHavingBigfloatFilter>;
};

/** Conditions for `Wallet` aggregates. */
export type GqlWalletsHavingInput = {
  AND?: InputMaybe<Array<GqlWalletsHavingInput>>;
  OR?: InputMaybe<Array<GqlWalletsHavingInput>>;
  average?: InputMaybe<GqlWalletsHavingAverageInput>;
  distinctCount?: InputMaybe<GqlWalletsHavingDistinctCountInput>;
  max?: InputMaybe<GqlWalletsHavingMaxInput>;
  min?: InputMaybe<GqlWalletsHavingMinInput>;
  stddevPopulation?: InputMaybe<GqlWalletsHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<GqlWalletsHavingStddevSampleInput>;
  sum?: InputMaybe<GqlWalletsHavingSumInput>;
  variancePopulation?: InputMaybe<GqlWalletsHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<GqlWalletsHavingVarianceSampleInput>;
};

export type GqlWalletsHavingMaxInput = {
  balance?: InputMaybe<GqlHavingBigfloatFilter>;
};

export type GqlWalletsHavingMinInput = {
  balance?: InputMaybe<GqlHavingBigfloatFilter>;
};

export type GqlWalletsHavingStddevPopulationInput = {
  balance?: InputMaybe<GqlHavingBigfloatFilter>;
};

export type GqlWalletsHavingStddevSampleInput = {
  balance?: InputMaybe<GqlHavingBigfloatFilter>;
};

export type GqlWalletsHavingSumInput = {
  balance?: InputMaybe<GqlHavingBigfloatFilter>;
};

export type GqlWalletsHavingVariancePopulationInput = {
  balance?: InputMaybe<GqlHavingBigfloatFilter>;
};

export type GqlWalletsHavingVarianceSampleInput = {
  balance?: InputMaybe<GqlHavingBigfloatFilter>;
};

/** Methods to use when ordering `Wallet`. */
export enum GqlWalletsOrderBy {
  ASSET_TRANSFERS_BY_FROM_ID_AVERAGE_BLOCK_RANGE_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_AVERAGE_BLOCK_RANGE_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_AVERAGE_BLOCK_RANGE_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_AVERAGE_BLOCK_RANGE_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_AVERAGE_FROM_ID_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_AVERAGE_FROM_ID_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_AVERAGE_FROM_ID_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_AVERAGE_FROM_ID_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_AVERAGE_ID_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_AVERAGE_ID_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_AVERAGE_ID_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_AVERAGE_ID_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_AVERAGE_NFT_ID_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_AVERAGE_NFT_ID_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_AVERAGE_NFT_ID_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_AVERAGE_NFT_ID_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_AVERAGE_TOKEN_ID_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_AVERAGE_TOKEN_ID_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_AVERAGE_TOKEN_ID_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_AVERAGE_TOKEN_ID_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_AVERAGE_TO_ID_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_AVERAGE_TO_ID_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_AVERAGE_TO_ID_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_AVERAGE_TO_ID_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_AVERAGE_TRANSACTION_BLOCK_NUMBER_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_AVERAGE_TRANSACTION_BLOCK_NUMBER_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_AVERAGE_TRANSACTION_BLOCK_NUMBER_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_AVERAGE_TRANSACTION_BLOCK_NUMBER_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_AVERAGE_TRANSACTION_ID_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_AVERAGE_TRANSACTION_ID_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_AVERAGE_TRANSACTION_ID_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_AVERAGE_TRANSACTION_ID_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_AVERAGE_TYPE_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_AVERAGE_TYPE_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_AVERAGE_TYPE_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_AVERAGE_TYPE_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_AVERAGE_VALUE_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_AVERAGE_VALUE_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_AVERAGE_VALUE_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_AVERAGE_VALUE_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_COUNT_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_COUNT_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_COUNT_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_COUNT_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_DISTINCT_COUNT_BLOCK_RANGE_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_DISTINCT_COUNT_BLOCK_RANGE_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_DISTINCT_COUNT_BLOCK_RANGE_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_DISTINCT_COUNT_BLOCK_RANGE_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_DISTINCT_COUNT_FROM_ID_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_DISTINCT_COUNT_FROM_ID_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_DISTINCT_COUNT_FROM_ID_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_DISTINCT_COUNT_FROM_ID_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_DISTINCT_COUNT_ID_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_DISTINCT_COUNT_ID_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_DISTINCT_COUNT_ID_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_DISTINCT_COUNT_ID_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_DISTINCT_COUNT_NFT_ID_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_DISTINCT_COUNT_NFT_ID_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_DISTINCT_COUNT_NFT_ID_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_DISTINCT_COUNT_NFT_ID_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_DISTINCT_COUNT_TOKEN_ID_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_DISTINCT_COUNT_TOKEN_ID_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_DISTINCT_COUNT_TOKEN_ID_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_DISTINCT_COUNT_TOKEN_ID_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_DISTINCT_COUNT_TO_ID_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_DISTINCT_COUNT_TO_ID_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_DISTINCT_COUNT_TO_ID_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_DISTINCT_COUNT_TO_ID_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_DISTINCT_COUNT_TRANSACTION_BLOCK_NUMBER_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_DISTINCT_COUNT_TRANSACTION_BLOCK_NUMBER_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_DISTINCT_COUNT_TRANSACTION_BLOCK_NUMBER_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_DISTINCT_COUNT_TRANSACTION_BLOCK_NUMBER_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_DISTINCT_COUNT_TRANSACTION_ID_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_DISTINCT_COUNT_TRANSACTION_ID_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_DISTINCT_COUNT_TRANSACTION_ID_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_DISTINCT_COUNT_TRANSACTION_ID_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_DISTINCT_COUNT_TYPE_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_DISTINCT_COUNT_TYPE_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_DISTINCT_COUNT_TYPE_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_DISTINCT_COUNT_TYPE_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_DISTINCT_COUNT_VALUE_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_DISTINCT_COUNT_VALUE_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_DISTINCT_COUNT_VALUE_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_DISTINCT_COUNT_VALUE_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_MAX_BLOCK_RANGE_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_MAX_BLOCK_RANGE_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_MAX_BLOCK_RANGE_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_MAX_BLOCK_RANGE_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_MAX_FROM_ID_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_MAX_FROM_ID_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_MAX_FROM_ID_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_MAX_FROM_ID_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_MAX_ID_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_MAX_ID_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_MAX_ID_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_MAX_ID_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_MAX_NFT_ID_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_MAX_NFT_ID_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_MAX_NFT_ID_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_MAX_NFT_ID_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_MAX_TOKEN_ID_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_MAX_TOKEN_ID_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_MAX_TOKEN_ID_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_MAX_TOKEN_ID_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_MAX_TO_ID_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_MAX_TO_ID_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_MAX_TO_ID_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_MAX_TO_ID_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_MAX_TRANSACTION_BLOCK_NUMBER_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_MAX_TRANSACTION_BLOCK_NUMBER_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_MAX_TRANSACTION_BLOCK_NUMBER_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_MAX_TRANSACTION_BLOCK_NUMBER_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_MAX_TRANSACTION_ID_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_MAX_TRANSACTION_ID_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_MAX_TRANSACTION_ID_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_MAX_TRANSACTION_ID_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_MAX_TYPE_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_MAX_TYPE_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_MAX_TYPE_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_MAX_TYPE_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_MAX_VALUE_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_MAX_VALUE_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_MAX_VALUE_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_MAX_VALUE_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_MIN_BLOCK_RANGE_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_MIN_BLOCK_RANGE_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_MIN_BLOCK_RANGE_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_MIN_BLOCK_RANGE_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_MIN_FROM_ID_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_MIN_FROM_ID_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_MIN_FROM_ID_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_MIN_FROM_ID_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_MIN_ID_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_MIN_ID_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_MIN_ID_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_MIN_ID_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_MIN_NFT_ID_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_MIN_NFT_ID_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_MIN_NFT_ID_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_MIN_NFT_ID_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_MIN_TOKEN_ID_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_MIN_TOKEN_ID_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_MIN_TOKEN_ID_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_MIN_TOKEN_ID_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_MIN_TO_ID_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_MIN_TO_ID_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_MIN_TO_ID_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_MIN_TO_ID_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_MIN_TRANSACTION_BLOCK_NUMBER_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_MIN_TRANSACTION_BLOCK_NUMBER_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_MIN_TRANSACTION_BLOCK_NUMBER_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_MIN_TRANSACTION_BLOCK_NUMBER_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_MIN_TRANSACTION_ID_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_MIN_TRANSACTION_ID_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_MIN_TRANSACTION_ID_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_MIN_TRANSACTION_ID_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_MIN_TYPE_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_MIN_TYPE_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_MIN_TYPE_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_MIN_TYPE_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_MIN_VALUE_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_MIN_VALUE_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_MIN_VALUE_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_MIN_VALUE_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_STDDEV_POPULATION_BLOCK_RANGE_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_STDDEV_POPULATION_BLOCK_RANGE_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_STDDEV_POPULATION_BLOCK_RANGE_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_STDDEV_POPULATION_BLOCK_RANGE_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_STDDEV_POPULATION_FROM_ID_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_STDDEV_POPULATION_FROM_ID_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_STDDEV_POPULATION_FROM_ID_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_STDDEV_POPULATION_FROM_ID_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_STDDEV_POPULATION_ID_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_STDDEV_POPULATION_ID_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_STDDEV_POPULATION_ID_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_STDDEV_POPULATION_ID_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_STDDEV_POPULATION_NFT_ID_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_STDDEV_POPULATION_NFT_ID_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_STDDEV_POPULATION_NFT_ID_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_STDDEV_POPULATION_NFT_ID_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_STDDEV_POPULATION_TOKEN_ID_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_STDDEV_POPULATION_TOKEN_ID_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_STDDEV_POPULATION_TOKEN_ID_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_STDDEV_POPULATION_TOKEN_ID_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_STDDEV_POPULATION_TO_ID_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_STDDEV_POPULATION_TO_ID_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_STDDEV_POPULATION_TO_ID_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_STDDEV_POPULATION_TO_ID_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_STDDEV_POPULATION_TRANSACTION_BLOCK_NUMBER_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_STDDEV_POPULATION_TRANSACTION_BLOCK_NUMBER_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_STDDEV_POPULATION_TRANSACTION_BLOCK_NUMBER_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_STDDEV_POPULATION_TRANSACTION_BLOCK_NUMBER_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_STDDEV_POPULATION_TRANSACTION_ID_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_STDDEV_POPULATION_TRANSACTION_ID_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_STDDEV_POPULATION_TRANSACTION_ID_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_STDDEV_POPULATION_TRANSACTION_ID_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_STDDEV_POPULATION_TYPE_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_STDDEV_POPULATION_TYPE_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_STDDEV_POPULATION_TYPE_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_STDDEV_POPULATION_TYPE_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_STDDEV_POPULATION_VALUE_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_STDDEV_POPULATION_VALUE_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_STDDEV_POPULATION_VALUE_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_STDDEV_POPULATION_VALUE_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_STDDEV_SAMPLE_BLOCK_RANGE_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_STDDEV_SAMPLE_BLOCK_RANGE_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_STDDEV_SAMPLE_BLOCK_RANGE_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_STDDEV_SAMPLE_BLOCK_RANGE_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_STDDEV_SAMPLE_FROM_ID_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_STDDEV_SAMPLE_FROM_ID_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_STDDEV_SAMPLE_FROM_ID_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_STDDEV_SAMPLE_FROM_ID_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_STDDEV_SAMPLE_ID_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_STDDEV_SAMPLE_ID_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_STDDEV_SAMPLE_ID_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_STDDEV_SAMPLE_ID_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_STDDEV_SAMPLE_NFT_ID_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_STDDEV_SAMPLE_NFT_ID_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_STDDEV_SAMPLE_NFT_ID_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_STDDEV_SAMPLE_NFT_ID_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_STDDEV_SAMPLE_TOKEN_ID_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_STDDEV_SAMPLE_TOKEN_ID_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_STDDEV_SAMPLE_TOKEN_ID_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_STDDEV_SAMPLE_TOKEN_ID_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_STDDEV_SAMPLE_TO_ID_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_STDDEV_SAMPLE_TO_ID_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_STDDEV_SAMPLE_TO_ID_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_STDDEV_SAMPLE_TO_ID_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_STDDEV_SAMPLE_TRANSACTION_BLOCK_NUMBER_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_STDDEV_SAMPLE_TRANSACTION_BLOCK_NUMBER_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_STDDEV_SAMPLE_TRANSACTION_BLOCK_NUMBER_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_STDDEV_SAMPLE_TRANSACTION_BLOCK_NUMBER_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_STDDEV_SAMPLE_TRANSACTION_ID_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_STDDEV_SAMPLE_TRANSACTION_ID_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_STDDEV_SAMPLE_TRANSACTION_ID_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_STDDEV_SAMPLE_TRANSACTION_ID_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_STDDEV_SAMPLE_TYPE_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_STDDEV_SAMPLE_TYPE_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_STDDEV_SAMPLE_TYPE_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_STDDEV_SAMPLE_TYPE_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_STDDEV_SAMPLE_VALUE_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_STDDEV_SAMPLE_VALUE_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_STDDEV_SAMPLE_VALUE_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_STDDEV_SAMPLE_VALUE_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_SUM_BLOCK_RANGE_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_SUM_BLOCK_RANGE_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_SUM_BLOCK_RANGE_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_SUM_BLOCK_RANGE_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_SUM_FROM_ID_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_SUM_FROM_ID_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_SUM_FROM_ID_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_SUM_FROM_ID_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_SUM_ID_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_SUM_ID_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_SUM_ID_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_SUM_ID_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_SUM_NFT_ID_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_SUM_NFT_ID_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_SUM_NFT_ID_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_SUM_NFT_ID_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_SUM_TOKEN_ID_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_SUM_TOKEN_ID_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_SUM_TOKEN_ID_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_SUM_TOKEN_ID_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_SUM_TO_ID_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_SUM_TO_ID_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_SUM_TO_ID_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_SUM_TO_ID_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_SUM_TRANSACTION_BLOCK_NUMBER_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_SUM_TRANSACTION_BLOCK_NUMBER_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_SUM_TRANSACTION_BLOCK_NUMBER_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_SUM_TRANSACTION_BLOCK_NUMBER_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_SUM_TRANSACTION_ID_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_SUM_TRANSACTION_ID_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_SUM_TRANSACTION_ID_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_SUM_TRANSACTION_ID_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_SUM_TYPE_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_SUM_TYPE_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_SUM_TYPE_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_SUM_TYPE_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_SUM_VALUE_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_SUM_VALUE_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_SUM_VALUE_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_SUM_VALUE_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_POPULATION_BLOCK_RANGE_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_POPULATION_BLOCK_RANGE_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_POPULATION_BLOCK_RANGE_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_POPULATION_BLOCK_RANGE_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_POPULATION_FROM_ID_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_POPULATION_FROM_ID_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_POPULATION_FROM_ID_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_POPULATION_FROM_ID_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_POPULATION_ID_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_POPULATION_ID_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_POPULATION_ID_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_POPULATION_ID_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_POPULATION_NFT_ID_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_POPULATION_NFT_ID_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_POPULATION_NFT_ID_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_POPULATION_NFT_ID_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_POPULATION_TOKEN_ID_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_POPULATION_TOKEN_ID_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_POPULATION_TOKEN_ID_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_POPULATION_TOKEN_ID_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_POPULATION_TO_ID_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_POPULATION_TO_ID_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_POPULATION_TO_ID_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_POPULATION_TO_ID_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_POPULATION_TRANSACTION_BLOCK_NUMBER_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_POPULATION_TRANSACTION_BLOCK_NUMBER_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_POPULATION_TRANSACTION_BLOCK_NUMBER_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_POPULATION_TRANSACTION_BLOCK_NUMBER_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_POPULATION_TRANSACTION_ID_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_POPULATION_TRANSACTION_ID_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_POPULATION_TRANSACTION_ID_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_POPULATION_TRANSACTION_ID_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_POPULATION_TYPE_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_POPULATION_TYPE_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_POPULATION_TYPE_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_POPULATION_TYPE_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_POPULATION_VALUE_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_POPULATION_VALUE_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_POPULATION_VALUE_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_POPULATION_VALUE_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_SAMPLE_BLOCK_RANGE_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_SAMPLE_BLOCK_RANGE_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_SAMPLE_BLOCK_RANGE_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_SAMPLE_BLOCK_RANGE_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_SAMPLE_FROM_ID_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_SAMPLE_FROM_ID_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_SAMPLE_FROM_ID_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_SAMPLE_FROM_ID_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_SAMPLE_ID_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_SAMPLE_ID_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_SAMPLE_ID_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_SAMPLE_ID_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_SAMPLE_NFT_ID_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_SAMPLE_NFT_ID_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_SAMPLE_NFT_ID_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_SAMPLE_NFT_ID_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_SAMPLE_TOKEN_ID_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_SAMPLE_TOKEN_ID_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_SAMPLE_TOKEN_ID_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_SAMPLE_TOKEN_ID_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_SAMPLE_TO_ID_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_SAMPLE_TO_ID_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_SAMPLE_TO_ID_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_SAMPLE_TO_ID_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_SAMPLE_TRANSACTION_BLOCK_NUMBER_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_SAMPLE_TRANSACTION_BLOCK_NUMBER_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_SAMPLE_TRANSACTION_BLOCK_NUMBER_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_SAMPLE_TRANSACTION_BLOCK_NUMBER_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_SAMPLE_TRANSACTION_ID_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_SAMPLE_TRANSACTION_ID_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_SAMPLE_TRANSACTION_ID_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_SAMPLE_TRANSACTION_ID_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_SAMPLE_TYPE_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_SAMPLE_TYPE_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_SAMPLE_TYPE_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_SAMPLE_TYPE_DESC',
  ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_SAMPLE_VALUE_ASC = 'ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_SAMPLE_VALUE_ASC',
  ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_SAMPLE_VALUE_DESC = 'ASSET_TRANSFERS_BY_FROM_ID_VARIANCE_SAMPLE_VALUE_DESC',
  ASSET_TRANSFERS_BY_TO_ID_AVERAGE_BLOCK_RANGE_ASC = 'ASSET_TRANSFERS_BY_TO_ID_AVERAGE_BLOCK_RANGE_ASC',
  ASSET_TRANSFERS_BY_TO_ID_AVERAGE_BLOCK_RANGE_DESC = 'ASSET_TRANSFERS_BY_TO_ID_AVERAGE_BLOCK_RANGE_DESC',
  ASSET_TRANSFERS_BY_TO_ID_AVERAGE_FROM_ID_ASC = 'ASSET_TRANSFERS_BY_TO_ID_AVERAGE_FROM_ID_ASC',
  ASSET_TRANSFERS_BY_TO_ID_AVERAGE_FROM_ID_DESC = 'ASSET_TRANSFERS_BY_TO_ID_AVERAGE_FROM_ID_DESC',
  ASSET_TRANSFERS_BY_TO_ID_AVERAGE_ID_ASC = 'ASSET_TRANSFERS_BY_TO_ID_AVERAGE_ID_ASC',
  ASSET_TRANSFERS_BY_TO_ID_AVERAGE_ID_DESC = 'ASSET_TRANSFERS_BY_TO_ID_AVERAGE_ID_DESC',
  ASSET_TRANSFERS_BY_TO_ID_AVERAGE_NFT_ID_ASC = 'ASSET_TRANSFERS_BY_TO_ID_AVERAGE_NFT_ID_ASC',
  ASSET_TRANSFERS_BY_TO_ID_AVERAGE_NFT_ID_DESC = 'ASSET_TRANSFERS_BY_TO_ID_AVERAGE_NFT_ID_DESC',
  ASSET_TRANSFERS_BY_TO_ID_AVERAGE_TOKEN_ID_ASC = 'ASSET_TRANSFERS_BY_TO_ID_AVERAGE_TOKEN_ID_ASC',
  ASSET_TRANSFERS_BY_TO_ID_AVERAGE_TOKEN_ID_DESC = 'ASSET_TRANSFERS_BY_TO_ID_AVERAGE_TOKEN_ID_DESC',
  ASSET_TRANSFERS_BY_TO_ID_AVERAGE_TO_ID_ASC = 'ASSET_TRANSFERS_BY_TO_ID_AVERAGE_TO_ID_ASC',
  ASSET_TRANSFERS_BY_TO_ID_AVERAGE_TO_ID_DESC = 'ASSET_TRANSFERS_BY_TO_ID_AVERAGE_TO_ID_DESC',
  ASSET_TRANSFERS_BY_TO_ID_AVERAGE_TRANSACTION_BLOCK_NUMBER_ASC = 'ASSET_TRANSFERS_BY_TO_ID_AVERAGE_TRANSACTION_BLOCK_NUMBER_ASC',
  ASSET_TRANSFERS_BY_TO_ID_AVERAGE_TRANSACTION_BLOCK_NUMBER_DESC = 'ASSET_TRANSFERS_BY_TO_ID_AVERAGE_TRANSACTION_BLOCK_NUMBER_DESC',
  ASSET_TRANSFERS_BY_TO_ID_AVERAGE_TRANSACTION_ID_ASC = 'ASSET_TRANSFERS_BY_TO_ID_AVERAGE_TRANSACTION_ID_ASC',
  ASSET_TRANSFERS_BY_TO_ID_AVERAGE_TRANSACTION_ID_DESC = 'ASSET_TRANSFERS_BY_TO_ID_AVERAGE_TRANSACTION_ID_DESC',
  ASSET_TRANSFERS_BY_TO_ID_AVERAGE_TYPE_ASC = 'ASSET_TRANSFERS_BY_TO_ID_AVERAGE_TYPE_ASC',
  ASSET_TRANSFERS_BY_TO_ID_AVERAGE_TYPE_DESC = 'ASSET_TRANSFERS_BY_TO_ID_AVERAGE_TYPE_DESC',
  ASSET_TRANSFERS_BY_TO_ID_AVERAGE_VALUE_ASC = 'ASSET_TRANSFERS_BY_TO_ID_AVERAGE_VALUE_ASC',
  ASSET_TRANSFERS_BY_TO_ID_AVERAGE_VALUE_DESC = 'ASSET_TRANSFERS_BY_TO_ID_AVERAGE_VALUE_DESC',
  ASSET_TRANSFERS_BY_TO_ID_COUNT_ASC = 'ASSET_TRANSFERS_BY_TO_ID_COUNT_ASC',
  ASSET_TRANSFERS_BY_TO_ID_COUNT_DESC = 'ASSET_TRANSFERS_BY_TO_ID_COUNT_DESC',
  ASSET_TRANSFERS_BY_TO_ID_DISTINCT_COUNT_BLOCK_RANGE_ASC = 'ASSET_TRANSFERS_BY_TO_ID_DISTINCT_COUNT_BLOCK_RANGE_ASC',
  ASSET_TRANSFERS_BY_TO_ID_DISTINCT_COUNT_BLOCK_RANGE_DESC = 'ASSET_TRANSFERS_BY_TO_ID_DISTINCT_COUNT_BLOCK_RANGE_DESC',
  ASSET_TRANSFERS_BY_TO_ID_DISTINCT_COUNT_FROM_ID_ASC = 'ASSET_TRANSFERS_BY_TO_ID_DISTINCT_COUNT_FROM_ID_ASC',
  ASSET_TRANSFERS_BY_TO_ID_DISTINCT_COUNT_FROM_ID_DESC = 'ASSET_TRANSFERS_BY_TO_ID_DISTINCT_COUNT_FROM_ID_DESC',
  ASSET_TRANSFERS_BY_TO_ID_DISTINCT_COUNT_ID_ASC = 'ASSET_TRANSFERS_BY_TO_ID_DISTINCT_COUNT_ID_ASC',
  ASSET_TRANSFERS_BY_TO_ID_DISTINCT_COUNT_ID_DESC = 'ASSET_TRANSFERS_BY_TO_ID_DISTINCT_COUNT_ID_DESC',
  ASSET_TRANSFERS_BY_TO_ID_DISTINCT_COUNT_NFT_ID_ASC = 'ASSET_TRANSFERS_BY_TO_ID_DISTINCT_COUNT_NFT_ID_ASC',
  ASSET_TRANSFERS_BY_TO_ID_DISTINCT_COUNT_NFT_ID_DESC = 'ASSET_TRANSFERS_BY_TO_ID_DISTINCT_COUNT_NFT_ID_DESC',
  ASSET_TRANSFERS_BY_TO_ID_DISTINCT_COUNT_TOKEN_ID_ASC = 'ASSET_TRANSFERS_BY_TO_ID_DISTINCT_COUNT_TOKEN_ID_ASC',
  ASSET_TRANSFERS_BY_TO_ID_DISTINCT_COUNT_TOKEN_ID_DESC = 'ASSET_TRANSFERS_BY_TO_ID_DISTINCT_COUNT_TOKEN_ID_DESC',
  ASSET_TRANSFERS_BY_TO_ID_DISTINCT_COUNT_TO_ID_ASC = 'ASSET_TRANSFERS_BY_TO_ID_DISTINCT_COUNT_TO_ID_ASC',
  ASSET_TRANSFERS_BY_TO_ID_DISTINCT_COUNT_TO_ID_DESC = 'ASSET_TRANSFERS_BY_TO_ID_DISTINCT_COUNT_TO_ID_DESC',
  ASSET_TRANSFERS_BY_TO_ID_DISTINCT_COUNT_TRANSACTION_BLOCK_NUMBER_ASC = 'ASSET_TRANSFERS_BY_TO_ID_DISTINCT_COUNT_TRANSACTION_BLOCK_NUMBER_ASC',
  ASSET_TRANSFERS_BY_TO_ID_DISTINCT_COUNT_TRANSACTION_BLOCK_NUMBER_DESC = 'ASSET_TRANSFERS_BY_TO_ID_DISTINCT_COUNT_TRANSACTION_BLOCK_NUMBER_DESC',
  ASSET_TRANSFERS_BY_TO_ID_DISTINCT_COUNT_TRANSACTION_ID_ASC = 'ASSET_TRANSFERS_BY_TO_ID_DISTINCT_COUNT_TRANSACTION_ID_ASC',
  ASSET_TRANSFERS_BY_TO_ID_DISTINCT_COUNT_TRANSACTION_ID_DESC = 'ASSET_TRANSFERS_BY_TO_ID_DISTINCT_COUNT_TRANSACTION_ID_DESC',
  ASSET_TRANSFERS_BY_TO_ID_DISTINCT_COUNT_TYPE_ASC = 'ASSET_TRANSFERS_BY_TO_ID_DISTINCT_COUNT_TYPE_ASC',
  ASSET_TRANSFERS_BY_TO_ID_DISTINCT_COUNT_TYPE_DESC = 'ASSET_TRANSFERS_BY_TO_ID_DISTINCT_COUNT_TYPE_DESC',
  ASSET_TRANSFERS_BY_TO_ID_DISTINCT_COUNT_VALUE_ASC = 'ASSET_TRANSFERS_BY_TO_ID_DISTINCT_COUNT_VALUE_ASC',
  ASSET_TRANSFERS_BY_TO_ID_DISTINCT_COUNT_VALUE_DESC = 'ASSET_TRANSFERS_BY_TO_ID_DISTINCT_COUNT_VALUE_DESC',
  ASSET_TRANSFERS_BY_TO_ID_MAX_BLOCK_RANGE_ASC = 'ASSET_TRANSFERS_BY_TO_ID_MAX_BLOCK_RANGE_ASC',
  ASSET_TRANSFERS_BY_TO_ID_MAX_BLOCK_RANGE_DESC = 'ASSET_TRANSFERS_BY_TO_ID_MAX_BLOCK_RANGE_DESC',
  ASSET_TRANSFERS_BY_TO_ID_MAX_FROM_ID_ASC = 'ASSET_TRANSFERS_BY_TO_ID_MAX_FROM_ID_ASC',
  ASSET_TRANSFERS_BY_TO_ID_MAX_FROM_ID_DESC = 'ASSET_TRANSFERS_BY_TO_ID_MAX_FROM_ID_DESC',
  ASSET_TRANSFERS_BY_TO_ID_MAX_ID_ASC = 'ASSET_TRANSFERS_BY_TO_ID_MAX_ID_ASC',
  ASSET_TRANSFERS_BY_TO_ID_MAX_ID_DESC = 'ASSET_TRANSFERS_BY_TO_ID_MAX_ID_DESC',
  ASSET_TRANSFERS_BY_TO_ID_MAX_NFT_ID_ASC = 'ASSET_TRANSFERS_BY_TO_ID_MAX_NFT_ID_ASC',
  ASSET_TRANSFERS_BY_TO_ID_MAX_NFT_ID_DESC = 'ASSET_TRANSFERS_BY_TO_ID_MAX_NFT_ID_DESC',
  ASSET_TRANSFERS_BY_TO_ID_MAX_TOKEN_ID_ASC = 'ASSET_TRANSFERS_BY_TO_ID_MAX_TOKEN_ID_ASC',
  ASSET_TRANSFERS_BY_TO_ID_MAX_TOKEN_ID_DESC = 'ASSET_TRANSFERS_BY_TO_ID_MAX_TOKEN_ID_DESC',
  ASSET_TRANSFERS_BY_TO_ID_MAX_TO_ID_ASC = 'ASSET_TRANSFERS_BY_TO_ID_MAX_TO_ID_ASC',
  ASSET_TRANSFERS_BY_TO_ID_MAX_TO_ID_DESC = 'ASSET_TRANSFERS_BY_TO_ID_MAX_TO_ID_DESC',
  ASSET_TRANSFERS_BY_TO_ID_MAX_TRANSACTION_BLOCK_NUMBER_ASC = 'ASSET_TRANSFERS_BY_TO_ID_MAX_TRANSACTION_BLOCK_NUMBER_ASC',
  ASSET_TRANSFERS_BY_TO_ID_MAX_TRANSACTION_BLOCK_NUMBER_DESC = 'ASSET_TRANSFERS_BY_TO_ID_MAX_TRANSACTION_BLOCK_NUMBER_DESC',
  ASSET_TRANSFERS_BY_TO_ID_MAX_TRANSACTION_ID_ASC = 'ASSET_TRANSFERS_BY_TO_ID_MAX_TRANSACTION_ID_ASC',
  ASSET_TRANSFERS_BY_TO_ID_MAX_TRANSACTION_ID_DESC = 'ASSET_TRANSFERS_BY_TO_ID_MAX_TRANSACTION_ID_DESC',
  ASSET_TRANSFERS_BY_TO_ID_MAX_TYPE_ASC = 'ASSET_TRANSFERS_BY_TO_ID_MAX_TYPE_ASC',
  ASSET_TRANSFERS_BY_TO_ID_MAX_TYPE_DESC = 'ASSET_TRANSFERS_BY_TO_ID_MAX_TYPE_DESC',
  ASSET_TRANSFERS_BY_TO_ID_MAX_VALUE_ASC = 'ASSET_TRANSFERS_BY_TO_ID_MAX_VALUE_ASC',
  ASSET_TRANSFERS_BY_TO_ID_MAX_VALUE_DESC = 'ASSET_TRANSFERS_BY_TO_ID_MAX_VALUE_DESC',
  ASSET_TRANSFERS_BY_TO_ID_MIN_BLOCK_RANGE_ASC = 'ASSET_TRANSFERS_BY_TO_ID_MIN_BLOCK_RANGE_ASC',
  ASSET_TRANSFERS_BY_TO_ID_MIN_BLOCK_RANGE_DESC = 'ASSET_TRANSFERS_BY_TO_ID_MIN_BLOCK_RANGE_DESC',
  ASSET_TRANSFERS_BY_TO_ID_MIN_FROM_ID_ASC = 'ASSET_TRANSFERS_BY_TO_ID_MIN_FROM_ID_ASC',
  ASSET_TRANSFERS_BY_TO_ID_MIN_FROM_ID_DESC = 'ASSET_TRANSFERS_BY_TO_ID_MIN_FROM_ID_DESC',
  ASSET_TRANSFERS_BY_TO_ID_MIN_ID_ASC = 'ASSET_TRANSFERS_BY_TO_ID_MIN_ID_ASC',
  ASSET_TRANSFERS_BY_TO_ID_MIN_ID_DESC = 'ASSET_TRANSFERS_BY_TO_ID_MIN_ID_DESC',
  ASSET_TRANSFERS_BY_TO_ID_MIN_NFT_ID_ASC = 'ASSET_TRANSFERS_BY_TO_ID_MIN_NFT_ID_ASC',
  ASSET_TRANSFERS_BY_TO_ID_MIN_NFT_ID_DESC = 'ASSET_TRANSFERS_BY_TO_ID_MIN_NFT_ID_DESC',
  ASSET_TRANSFERS_BY_TO_ID_MIN_TOKEN_ID_ASC = 'ASSET_TRANSFERS_BY_TO_ID_MIN_TOKEN_ID_ASC',
  ASSET_TRANSFERS_BY_TO_ID_MIN_TOKEN_ID_DESC = 'ASSET_TRANSFERS_BY_TO_ID_MIN_TOKEN_ID_DESC',
  ASSET_TRANSFERS_BY_TO_ID_MIN_TO_ID_ASC = 'ASSET_TRANSFERS_BY_TO_ID_MIN_TO_ID_ASC',
  ASSET_TRANSFERS_BY_TO_ID_MIN_TO_ID_DESC = 'ASSET_TRANSFERS_BY_TO_ID_MIN_TO_ID_DESC',
  ASSET_TRANSFERS_BY_TO_ID_MIN_TRANSACTION_BLOCK_NUMBER_ASC = 'ASSET_TRANSFERS_BY_TO_ID_MIN_TRANSACTION_BLOCK_NUMBER_ASC',
  ASSET_TRANSFERS_BY_TO_ID_MIN_TRANSACTION_BLOCK_NUMBER_DESC = 'ASSET_TRANSFERS_BY_TO_ID_MIN_TRANSACTION_BLOCK_NUMBER_DESC',
  ASSET_TRANSFERS_BY_TO_ID_MIN_TRANSACTION_ID_ASC = 'ASSET_TRANSFERS_BY_TO_ID_MIN_TRANSACTION_ID_ASC',
  ASSET_TRANSFERS_BY_TO_ID_MIN_TRANSACTION_ID_DESC = 'ASSET_TRANSFERS_BY_TO_ID_MIN_TRANSACTION_ID_DESC',
  ASSET_TRANSFERS_BY_TO_ID_MIN_TYPE_ASC = 'ASSET_TRANSFERS_BY_TO_ID_MIN_TYPE_ASC',
  ASSET_TRANSFERS_BY_TO_ID_MIN_TYPE_DESC = 'ASSET_TRANSFERS_BY_TO_ID_MIN_TYPE_DESC',
  ASSET_TRANSFERS_BY_TO_ID_MIN_VALUE_ASC = 'ASSET_TRANSFERS_BY_TO_ID_MIN_VALUE_ASC',
  ASSET_TRANSFERS_BY_TO_ID_MIN_VALUE_DESC = 'ASSET_TRANSFERS_BY_TO_ID_MIN_VALUE_DESC',
  ASSET_TRANSFERS_BY_TO_ID_STDDEV_POPULATION_BLOCK_RANGE_ASC = 'ASSET_TRANSFERS_BY_TO_ID_STDDEV_POPULATION_BLOCK_RANGE_ASC',
  ASSET_TRANSFERS_BY_TO_ID_STDDEV_POPULATION_BLOCK_RANGE_DESC = 'ASSET_TRANSFERS_BY_TO_ID_STDDEV_POPULATION_BLOCK_RANGE_DESC',
  ASSET_TRANSFERS_BY_TO_ID_STDDEV_POPULATION_FROM_ID_ASC = 'ASSET_TRANSFERS_BY_TO_ID_STDDEV_POPULATION_FROM_ID_ASC',
  ASSET_TRANSFERS_BY_TO_ID_STDDEV_POPULATION_FROM_ID_DESC = 'ASSET_TRANSFERS_BY_TO_ID_STDDEV_POPULATION_FROM_ID_DESC',
  ASSET_TRANSFERS_BY_TO_ID_STDDEV_POPULATION_ID_ASC = 'ASSET_TRANSFERS_BY_TO_ID_STDDEV_POPULATION_ID_ASC',
  ASSET_TRANSFERS_BY_TO_ID_STDDEV_POPULATION_ID_DESC = 'ASSET_TRANSFERS_BY_TO_ID_STDDEV_POPULATION_ID_DESC',
  ASSET_TRANSFERS_BY_TO_ID_STDDEV_POPULATION_NFT_ID_ASC = 'ASSET_TRANSFERS_BY_TO_ID_STDDEV_POPULATION_NFT_ID_ASC',
  ASSET_TRANSFERS_BY_TO_ID_STDDEV_POPULATION_NFT_ID_DESC = 'ASSET_TRANSFERS_BY_TO_ID_STDDEV_POPULATION_NFT_ID_DESC',
  ASSET_TRANSFERS_BY_TO_ID_STDDEV_POPULATION_TOKEN_ID_ASC = 'ASSET_TRANSFERS_BY_TO_ID_STDDEV_POPULATION_TOKEN_ID_ASC',
  ASSET_TRANSFERS_BY_TO_ID_STDDEV_POPULATION_TOKEN_ID_DESC = 'ASSET_TRANSFERS_BY_TO_ID_STDDEV_POPULATION_TOKEN_ID_DESC',
  ASSET_TRANSFERS_BY_TO_ID_STDDEV_POPULATION_TO_ID_ASC = 'ASSET_TRANSFERS_BY_TO_ID_STDDEV_POPULATION_TO_ID_ASC',
  ASSET_TRANSFERS_BY_TO_ID_STDDEV_POPULATION_TO_ID_DESC = 'ASSET_TRANSFERS_BY_TO_ID_STDDEV_POPULATION_TO_ID_DESC',
  ASSET_TRANSFERS_BY_TO_ID_STDDEV_POPULATION_TRANSACTION_BLOCK_NUMBER_ASC = 'ASSET_TRANSFERS_BY_TO_ID_STDDEV_POPULATION_TRANSACTION_BLOCK_NUMBER_ASC',
  ASSET_TRANSFERS_BY_TO_ID_STDDEV_POPULATION_TRANSACTION_BLOCK_NUMBER_DESC = 'ASSET_TRANSFERS_BY_TO_ID_STDDEV_POPULATION_TRANSACTION_BLOCK_NUMBER_DESC',
  ASSET_TRANSFERS_BY_TO_ID_STDDEV_POPULATION_TRANSACTION_ID_ASC = 'ASSET_TRANSFERS_BY_TO_ID_STDDEV_POPULATION_TRANSACTION_ID_ASC',
  ASSET_TRANSFERS_BY_TO_ID_STDDEV_POPULATION_TRANSACTION_ID_DESC = 'ASSET_TRANSFERS_BY_TO_ID_STDDEV_POPULATION_TRANSACTION_ID_DESC',
  ASSET_TRANSFERS_BY_TO_ID_STDDEV_POPULATION_TYPE_ASC = 'ASSET_TRANSFERS_BY_TO_ID_STDDEV_POPULATION_TYPE_ASC',
  ASSET_TRANSFERS_BY_TO_ID_STDDEV_POPULATION_TYPE_DESC = 'ASSET_TRANSFERS_BY_TO_ID_STDDEV_POPULATION_TYPE_DESC',
  ASSET_TRANSFERS_BY_TO_ID_STDDEV_POPULATION_VALUE_ASC = 'ASSET_TRANSFERS_BY_TO_ID_STDDEV_POPULATION_VALUE_ASC',
  ASSET_TRANSFERS_BY_TO_ID_STDDEV_POPULATION_VALUE_DESC = 'ASSET_TRANSFERS_BY_TO_ID_STDDEV_POPULATION_VALUE_DESC',
  ASSET_TRANSFERS_BY_TO_ID_STDDEV_SAMPLE_BLOCK_RANGE_ASC = 'ASSET_TRANSFERS_BY_TO_ID_STDDEV_SAMPLE_BLOCK_RANGE_ASC',
  ASSET_TRANSFERS_BY_TO_ID_STDDEV_SAMPLE_BLOCK_RANGE_DESC = 'ASSET_TRANSFERS_BY_TO_ID_STDDEV_SAMPLE_BLOCK_RANGE_DESC',
  ASSET_TRANSFERS_BY_TO_ID_STDDEV_SAMPLE_FROM_ID_ASC = 'ASSET_TRANSFERS_BY_TO_ID_STDDEV_SAMPLE_FROM_ID_ASC',
  ASSET_TRANSFERS_BY_TO_ID_STDDEV_SAMPLE_FROM_ID_DESC = 'ASSET_TRANSFERS_BY_TO_ID_STDDEV_SAMPLE_FROM_ID_DESC',
  ASSET_TRANSFERS_BY_TO_ID_STDDEV_SAMPLE_ID_ASC = 'ASSET_TRANSFERS_BY_TO_ID_STDDEV_SAMPLE_ID_ASC',
  ASSET_TRANSFERS_BY_TO_ID_STDDEV_SAMPLE_ID_DESC = 'ASSET_TRANSFERS_BY_TO_ID_STDDEV_SAMPLE_ID_DESC',
  ASSET_TRANSFERS_BY_TO_ID_STDDEV_SAMPLE_NFT_ID_ASC = 'ASSET_TRANSFERS_BY_TO_ID_STDDEV_SAMPLE_NFT_ID_ASC',
  ASSET_TRANSFERS_BY_TO_ID_STDDEV_SAMPLE_NFT_ID_DESC = 'ASSET_TRANSFERS_BY_TO_ID_STDDEV_SAMPLE_NFT_ID_DESC',
  ASSET_TRANSFERS_BY_TO_ID_STDDEV_SAMPLE_TOKEN_ID_ASC = 'ASSET_TRANSFERS_BY_TO_ID_STDDEV_SAMPLE_TOKEN_ID_ASC',
  ASSET_TRANSFERS_BY_TO_ID_STDDEV_SAMPLE_TOKEN_ID_DESC = 'ASSET_TRANSFERS_BY_TO_ID_STDDEV_SAMPLE_TOKEN_ID_DESC',
  ASSET_TRANSFERS_BY_TO_ID_STDDEV_SAMPLE_TO_ID_ASC = 'ASSET_TRANSFERS_BY_TO_ID_STDDEV_SAMPLE_TO_ID_ASC',
  ASSET_TRANSFERS_BY_TO_ID_STDDEV_SAMPLE_TO_ID_DESC = 'ASSET_TRANSFERS_BY_TO_ID_STDDEV_SAMPLE_TO_ID_DESC',
  ASSET_TRANSFERS_BY_TO_ID_STDDEV_SAMPLE_TRANSACTION_BLOCK_NUMBER_ASC = 'ASSET_TRANSFERS_BY_TO_ID_STDDEV_SAMPLE_TRANSACTION_BLOCK_NUMBER_ASC',
  ASSET_TRANSFERS_BY_TO_ID_STDDEV_SAMPLE_TRANSACTION_BLOCK_NUMBER_DESC = 'ASSET_TRANSFERS_BY_TO_ID_STDDEV_SAMPLE_TRANSACTION_BLOCK_NUMBER_DESC',
  ASSET_TRANSFERS_BY_TO_ID_STDDEV_SAMPLE_TRANSACTION_ID_ASC = 'ASSET_TRANSFERS_BY_TO_ID_STDDEV_SAMPLE_TRANSACTION_ID_ASC',
  ASSET_TRANSFERS_BY_TO_ID_STDDEV_SAMPLE_TRANSACTION_ID_DESC = 'ASSET_TRANSFERS_BY_TO_ID_STDDEV_SAMPLE_TRANSACTION_ID_DESC',
  ASSET_TRANSFERS_BY_TO_ID_STDDEV_SAMPLE_TYPE_ASC = 'ASSET_TRANSFERS_BY_TO_ID_STDDEV_SAMPLE_TYPE_ASC',
  ASSET_TRANSFERS_BY_TO_ID_STDDEV_SAMPLE_TYPE_DESC = 'ASSET_TRANSFERS_BY_TO_ID_STDDEV_SAMPLE_TYPE_DESC',
  ASSET_TRANSFERS_BY_TO_ID_STDDEV_SAMPLE_VALUE_ASC = 'ASSET_TRANSFERS_BY_TO_ID_STDDEV_SAMPLE_VALUE_ASC',
  ASSET_TRANSFERS_BY_TO_ID_STDDEV_SAMPLE_VALUE_DESC = 'ASSET_TRANSFERS_BY_TO_ID_STDDEV_SAMPLE_VALUE_DESC',
  ASSET_TRANSFERS_BY_TO_ID_SUM_BLOCK_RANGE_ASC = 'ASSET_TRANSFERS_BY_TO_ID_SUM_BLOCK_RANGE_ASC',
  ASSET_TRANSFERS_BY_TO_ID_SUM_BLOCK_RANGE_DESC = 'ASSET_TRANSFERS_BY_TO_ID_SUM_BLOCK_RANGE_DESC',
  ASSET_TRANSFERS_BY_TO_ID_SUM_FROM_ID_ASC = 'ASSET_TRANSFERS_BY_TO_ID_SUM_FROM_ID_ASC',
  ASSET_TRANSFERS_BY_TO_ID_SUM_FROM_ID_DESC = 'ASSET_TRANSFERS_BY_TO_ID_SUM_FROM_ID_DESC',
  ASSET_TRANSFERS_BY_TO_ID_SUM_ID_ASC = 'ASSET_TRANSFERS_BY_TO_ID_SUM_ID_ASC',
  ASSET_TRANSFERS_BY_TO_ID_SUM_ID_DESC = 'ASSET_TRANSFERS_BY_TO_ID_SUM_ID_DESC',
  ASSET_TRANSFERS_BY_TO_ID_SUM_NFT_ID_ASC = 'ASSET_TRANSFERS_BY_TO_ID_SUM_NFT_ID_ASC',
  ASSET_TRANSFERS_BY_TO_ID_SUM_NFT_ID_DESC = 'ASSET_TRANSFERS_BY_TO_ID_SUM_NFT_ID_DESC',
  ASSET_TRANSFERS_BY_TO_ID_SUM_TOKEN_ID_ASC = 'ASSET_TRANSFERS_BY_TO_ID_SUM_TOKEN_ID_ASC',
  ASSET_TRANSFERS_BY_TO_ID_SUM_TOKEN_ID_DESC = 'ASSET_TRANSFERS_BY_TO_ID_SUM_TOKEN_ID_DESC',
  ASSET_TRANSFERS_BY_TO_ID_SUM_TO_ID_ASC = 'ASSET_TRANSFERS_BY_TO_ID_SUM_TO_ID_ASC',
  ASSET_TRANSFERS_BY_TO_ID_SUM_TO_ID_DESC = 'ASSET_TRANSFERS_BY_TO_ID_SUM_TO_ID_DESC',
  ASSET_TRANSFERS_BY_TO_ID_SUM_TRANSACTION_BLOCK_NUMBER_ASC = 'ASSET_TRANSFERS_BY_TO_ID_SUM_TRANSACTION_BLOCK_NUMBER_ASC',
  ASSET_TRANSFERS_BY_TO_ID_SUM_TRANSACTION_BLOCK_NUMBER_DESC = 'ASSET_TRANSFERS_BY_TO_ID_SUM_TRANSACTION_BLOCK_NUMBER_DESC',
  ASSET_TRANSFERS_BY_TO_ID_SUM_TRANSACTION_ID_ASC = 'ASSET_TRANSFERS_BY_TO_ID_SUM_TRANSACTION_ID_ASC',
  ASSET_TRANSFERS_BY_TO_ID_SUM_TRANSACTION_ID_DESC = 'ASSET_TRANSFERS_BY_TO_ID_SUM_TRANSACTION_ID_DESC',
  ASSET_TRANSFERS_BY_TO_ID_SUM_TYPE_ASC = 'ASSET_TRANSFERS_BY_TO_ID_SUM_TYPE_ASC',
  ASSET_TRANSFERS_BY_TO_ID_SUM_TYPE_DESC = 'ASSET_TRANSFERS_BY_TO_ID_SUM_TYPE_DESC',
  ASSET_TRANSFERS_BY_TO_ID_SUM_VALUE_ASC = 'ASSET_TRANSFERS_BY_TO_ID_SUM_VALUE_ASC',
  ASSET_TRANSFERS_BY_TO_ID_SUM_VALUE_DESC = 'ASSET_TRANSFERS_BY_TO_ID_SUM_VALUE_DESC',
  ASSET_TRANSFERS_BY_TO_ID_VARIANCE_POPULATION_BLOCK_RANGE_ASC = 'ASSET_TRANSFERS_BY_TO_ID_VARIANCE_POPULATION_BLOCK_RANGE_ASC',
  ASSET_TRANSFERS_BY_TO_ID_VARIANCE_POPULATION_BLOCK_RANGE_DESC = 'ASSET_TRANSFERS_BY_TO_ID_VARIANCE_POPULATION_BLOCK_RANGE_DESC',
  ASSET_TRANSFERS_BY_TO_ID_VARIANCE_POPULATION_FROM_ID_ASC = 'ASSET_TRANSFERS_BY_TO_ID_VARIANCE_POPULATION_FROM_ID_ASC',
  ASSET_TRANSFERS_BY_TO_ID_VARIANCE_POPULATION_FROM_ID_DESC = 'ASSET_TRANSFERS_BY_TO_ID_VARIANCE_POPULATION_FROM_ID_DESC',
  ASSET_TRANSFERS_BY_TO_ID_VARIANCE_POPULATION_ID_ASC = 'ASSET_TRANSFERS_BY_TO_ID_VARIANCE_POPULATION_ID_ASC',
  ASSET_TRANSFERS_BY_TO_ID_VARIANCE_POPULATION_ID_DESC = 'ASSET_TRANSFERS_BY_TO_ID_VARIANCE_POPULATION_ID_DESC',
  ASSET_TRANSFERS_BY_TO_ID_VARIANCE_POPULATION_NFT_ID_ASC = 'ASSET_TRANSFERS_BY_TO_ID_VARIANCE_POPULATION_NFT_ID_ASC',
  ASSET_TRANSFERS_BY_TO_ID_VARIANCE_POPULATION_NFT_ID_DESC = 'ASSET_TRANSFERS_BY_TO_ID_VARIANCE_POPULATION_NFT_ID_DESC',
  ASSET_TRANSFERS_BY_TO_ID_VARIANCE_POPULATION_TOKEN_ID_ASC = 'ASSET_TRANSFERS_BY_TO_ID_VARIANCE_POPULATION_TOKEN_ID_ASC',
  ASSET_TRANSFERS_BY_TO_ID_VARIANCE_POPULATION_TOKEN_ID_DESC = 'ASSET_TRANSFERS_BY_TO_ID_VARIANCE_POPULATION_TOKEN_ID_DESC',
  ASSET_TRANSFERS_BY_TO_ID_VARIANCE_POPULATION_TO_ID_ASC = 'ASSET_TRANSFERS_BY_TO_ID_VARIANCE_POPULATION_TO_ID_ASC',
  ASSET_TRANSFERS_BY_TO_ID_VARIANCE_POPULATION_TO_ID_DESC = 'ASSET_TRANSFERS_BY_TO_ID_VARIANCE_POPULATION_TO_ID_DESC',
  ASSET_TRANSFERS_BY_TO_ID_VARIANCE_POPULATION_TRANSACTION_BLOCK_NUMBER_ASC = 'ASSET_TRANSFERS_BY_TO_ID_VARIANCE_POPULATION_TRANSACTION_BLOCK_NUMBER_ASC',
  ASSET_TRANSFERS_BY_TO_ID_VARIANCE_POPULATION_TRANSACTION_BLOCK_NUMBER_DESC = 'ASSET_TRANSFERS_BY_TO_ID_VARIANCE_POPULATION_TRANSACTION_BLOCK_NUMBER_DESC',
  ASSET_TRANSFERS_BY_TO_ID_VARIANCE_POPULATION_TRANSACTION_ID_ASC = 'ASSET_TRANSFERS_BY_TO_ID_VARIANCE_POPULATION_TRANSACTION_ID_ASC',
  ASSET_TRANSFERS_BY_TO_ID_VARIANCE_POPULATION_TRANSACTION_ID_DESC = 'ASSET_TRANSFERS_BY_TO_ID_VARIANCE_POPULATION_TRANSACTION_ID_DESC',
  ASSET_TRANSFERS_BY_TO_ID_VARIANCE_POPULATION_TYPE_ASC = 'ASSET_TRANSFERS_BY_TO_ID_VARIANCE_POPULATION_TYPE_ASC',
  ASSET_TRANSFERS_BY_TO_ID_VARIANCE_POPULATION_TYPE_DESC = 'ASSET_TRANSFERS_BY_TO_ID_VARIANCE_POPULATION_TYPE_DESC',
  ASSET_TRANSFERS_BY_TO_ID_VARIANCE_POPULATION_VALUE_ASC = 'ASSET_TRANSFERS_BY_TO_ID_VARIANCE_POPULATION_VALUE_ASC',
  ASSET_TRANSFERS_BY_TO_ID_VARIANCE_POPULATION_VALUE_DESC = 'ASSET_TRANSFERS_BY_TO_ID_VARIANCE_POPULATION_VALUE_DESC',
  ASSET_TRANSFERS_BY_TO_ID_VARIANCE_SAMPLE_BLOCK_RANGE_ASC = 'ASSET_TRANSFERS_BY_TO_ID_VARIANCE_SAMPLE_BLOCK_RANGE_ASC',
  ASSET_TRANSFERS_BY_TO_ID_VARIANCE_SAMPLE_BLOCK_RANGE_DESC = 'ASSET_TRANSFERS_BY_TO_ID_VARIANCE_SAMPLE_BLOCK_RANGE_DESC',
  ASSET_TRANSFERS_BY_TO_ID_VARIANCE_SAMPLE_FROM_ID_ASC = 'ASSET_TRANSFERS_BY_TO_ID_VARIANCE_SAMPLE_FROM_ID_ASC',
  ASSET_TRANSFERS_BY_TO_ID_VARIANCE_SAMPLE_FROM_ID_DESC = 'ASSET_TRANSFERS_BY_TO_ID_VARIANCE_SAMPLE_FROM_ID_DESC',
  ASSET_TRANSFERS_BY_TO_ID_VARIANCE_SAMPLE_ID_ASC = 'ASSET_TRANSFERS_BY_TO_ID_VARIANCE_SAMPLE_ID_ASC',
  ASSET_TRANSFERS_BY_TO_ID_VARIANCE_SAMPLE_ID_DESC = 'ASSET_TRANSFERS_BY_TO_ID_VARIANCE_SAMPLE_ID_DESC',
  ASSET_TRANSFERS_BY_TO_ID_VARIANCE_SAMPLE_NFT_ID_ASC = 'ASSET_TRANSFERS_BY_TO_ID_VARIANCE_SAMPLE_NFT_ID_ASC',
  ASSET_TRANSFERS_BY_TO_ID_VARIANCE_SAMPLE_NFT_ID_DESC = 'ASSET_TRANSFERS_BY_TO_ID_VARIANCE_SAMPLE_NFT_ID_DESC',
  ASSET_TRANSFERS_BY_TO_ID_VARIANCE_SAMPLE_TOKEN_ID_ASC = 'ASSET_TRANSFERS_BY_TO_ID_VARIANCE_SAMPLE_TOKEN_ID_ASC',
  ASSET_TRANSFERS_BY_TO_ID_VARIANCE_SAMPLE_TOKEN_ID_DESC = 'ASSET_TRANSFERS_BY_TO_ID_VARIANCE_SAMPLE_TOKEN_ID_DESC',
  ASSET_TRANSFERS_BY_TO_ID_VARIANCE_SAMPLE_TO_ID_ASC = 'ASSET_TRANSFERS_BY_TO_ID_VARIANCE_SAMPLE_TO_ID_ASC',
  ASSET_TRANSFERS_BY_TO_ID_VARIANCE_SAMPLE_TO_ID_DESC = 'ASSET_TRANSFERS_BY_TO_ID_VARIANCE_SAMPLE_TO_ID_DESC',
  ASSET_TRANSFERS_BY_TO_ID_VARIANCE_SAMPLE_TRANSACTION_BLOCK_NUMBER_ASC = 'ASSET_TRANSFERS_BY_TO_ID_VARIANCE_SAMPLE_TRANSACTION_BLOCK_NUMBER_ASC',
  ASSET_TRANSFERS_BY_TO_ID_VARIANCE_SAMPLE_TRANSACTION_BLOCK_NUMBER_DESC = 'ASSET_TRANSFERS_BY_TO_ID_VARIANCE_SAMPLE_TRANSACTION_BLOCK_NUMBER_DESC',
  ASSET_TRANSFERS_BY_TO_ID_VARIANCE_SAMPLE_TRANSACTION_ID_ASC = 'ASSET_TRANSFERS_BY_TO_ID_VARIANCE_SAMPLE_TRANSACTION_ID_ASC',
  ASSET_TRANSFERS_BY_TO_ID_VARIANCE_SAMPLE_TRANSACTION_ID_DESC = 'ASSET_TRANSFERS_BY_TO_ID_VARIANCE_SAMPLE_TRANSACTION_ID_DESC',
  ASSET_TRANSFERS_BY_TO_ID_VARIANCE_SAMPLE_TYPE_ASC = 'ASSET_TRANSFERS_BY_TO_ID_VARIANCE_SAMPLE_TYPE_ASC',
  ASSET_TRANSFERS_BY_TO_ID_VARIANCE_SAMPLE_TYPE_DESC = 'ASSET_TRANSFERS_BY_TO_ID_VARIANCE_SAMPLE_TYPE_DESC',
  ASSET_TRANSFERS_BY_TO_ID_VARIANCE_SAMPLE_VALUE_ASC = 'ASSET_TRANSFERS_BY_TO_ID_VARIANCE_SAMPLE_VALUE_ASC',
  ASSET_TRANSFERS_BY_TO_ID_VARIANCE_SAMPLE_VALUE_DESC = 'ASSET_TRANSFERS_BY_TO_ID_VARIANCE_SAMPLE_VALUE_DESC',
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
  NFTS_AVERAGE_NFT_ID_ASC = 'NFTS_AVERAGE_NFT_ID_ASC',
  NFTS_AVERAGE_NFT_ID_DESC = 'NFTS_AVERAGE_NFT_ID_DESC',
  NFTS_AVERAGE_NFT_TOKEN_ID_ASC = 'NFTS_AVERAGE_NFT_TOKEN_ID_ASC',
  NFTS_AVERAGE_NFT_TOKEN_ID_DESC = 'NFTS_AVERAGE_NFT_TOKEN_ID_DESC',
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
  NFTS_DISTINCT_COUNT_NFT_ID_ASC = 'NFTS_DISTINCT_COUNT_NFT_ID_ASC',
  NFTS_DISTINCT_COUNT_NFT_ID_DESC = 'NFTS_DISTINCT_COUNT_NFT_ID_DESC',
  NFTS_DISTINCT_COUNT_NFT_TOKEN_ID_ASC = 'NFTS_DISTINCT_COUNT_NFT_TOKEN_ID_ASC',
  NFTS_DISTINCT_COUNT_NFT_TOKEN_ID_DESC = 'NFTS_DISTINCT_COUNT_NFT_TOKEN_ID_DESC',
  NFTS_DISTINCT_COUNT_WALLET_ID_ASC = 'NFTS_DISTINCT_COUNT_WALLET_ID_ASC',
  NFTS_DISTINCT_COUNT_WALLET_ID_DESC = 'NFTS_DISTINCT_COUNT_WALLET_ID_DESC',
  NFTS_MAX_BALANCE_ASC = 'NFTS_MAX_BALANCE_ASC',
  NFTS_MAX_BALANCE_DESC = 'NFTS_MAX_BALANCE_DESC',
  NFTS_MAX_BLOCK_RANGE_ASC = 'NFTS_MAX_BLOCK_RANGE_ASC',
  NFTS_MAX_BLOCK_RANGE_DESC = 'NFTS_MAX_BLOCK_RANGE_DESC',
  NFTS_MAX_ID_ASC = 'NFTS_MAX_ID_ASC',
  NFTS_MAX_ID_DESC = 'NFTS_MAX_ID_DESC',
  NFTS_MAX_NFT_ID_ASC = 'NFTS_MAX_NFT_ID_ASC',
  NFTS_MAX_NFT_ID_DESC = 'NFTS_MAX_NFT_ID_DESC',
  NFTS_MAX_NFT_TOKEN_ID_ASC = 'NFTS_MAX_NFT_TOKEN_ID_ASC',
  NFTS_MAX_NFT_TOKEN_ID_DESC = 'NFTS_MAX_NFT_TOKEN_ID_DESC',
  NFTS_MAX_WALLET_ID_ASC = 'NFTS_MAX_WALLET_ID_ASC',
  NFTS_MAX_WALLET_ID_DESC = 'NFTS_MAX_WALLET_ID_DESC',
  NFTS_MIN_BALANCE_ASC = 'NFTS_MIN_BALANCE_ASC',
  NFTS_MIN_BALANCE_DESC = 'NFTS_MIN_BALANCE_DESC',
  NFTS_MIN_BLOCK_RANGE_ASC = 'NFTS_MIN_BLOCK_RANGE_ASC',
  NFTS_MIN_BLOCK_RANGE_DESC = 'NFTS_MIN_BLOCK_RANGE_DESC',
  NFTS_MIN_ID_ASC = 'NFTS_MIN_ID_ASC',
  NFTS_MIN_ID_DESC = 'NFTS_MIN_ID_DESC',
  NFTS_MIN_NFT_ID_ASC = 'NFTS_MIN_NFT_ID_ASC',
  NFTS_MIN_NFT_ID_DESC = 'NFTS_MIN_NFT_ID_DESC',
  NFTS_MIN_NFT_TOKEN_ID_ASC = 'NFTS_MIN_NFT_TOKEN_ID_ASC',
  NFTS_MIN_NFT_TOKEN_ID_DESC = 'NFTS_MIN_NFT_TOKEN_ID_DESC',
  NFTS_MIN_WALLET_ID_ASC = 'NFTS_MIN_WALLET_ID_ASC',
  NFTS_MIN_WALLET_ID_DESC = 'NFTS_MIN_WALLET_ID_DESC',
  NFTS_STDDEV_POPULATION_BALANCE_ASC = 'NFTS_STDDEV_POPULATION_BALANCE_ASC',
  NFTS_STDDEV_POPULATION_BALANCE_DESC = 'NFTS_STDDEV_POPULATION_BALANCE_DESC',
  NFTS_STDDEV_POPULATION_BLOCK_RANGE_ASC = 'NFTS_STDDEV_POPULATION_BLOCK_RANGE_ASC',
  NFTS_STDDEV_POPULATION_BLOCK_RANGE_DESC = 'NFTS_STDDEV_POPULATION_BLOCK_RANGE_DESC',
  NFTS_STDDEV_POPULATION_ID_ASC = 'NFTS_STDDEV_POPULATION_ID_ASC',
  NFTS_STDDEV_POPULATION_ID_DESC = 'NFTS_STDDEV_POPULATION_ID_DESC',
  NFTS_STDDEV_POPULATION_NFT_ID_ASC = 'NFTS_STDDEV_POPULATION_NFT_ID_ASC',
  NFTS_STDDEV_POPULATION_NFT_ID_DESC = 'NFTS_STDDEV_POPULATION_NFT_ID_DESC',
  NFTS_STDDEV_POPULATION_NFT_TOKEN_ID_ASC = 'NFTS_STDDEV_POPULATION_NFT_TOKEN_ID_ASC',
  NFTS_STDDEV_POPULATION_NFT_TOKEN_ID_DESC = 'NFTS_STDDEV_POPULATION_NFT_TOKEN_ID_DESC',
  NFTS_STDDEV_POPULATION_WALLET_ID_ASC = 'NFTS_STDDEV_POPULATION_WALLET_ID_ASC',
  NFTS_STDDEV_POPULATION_WALLET_ID_DESC = 'NFTS_STDDEV_POPULATION_WALLET_ID_DESC',
  NFTS_STDDEV_SAMPLE_BALANCE_ASC = 'NFTS_STDDEV_SAMPLE_BALANCE_ASC',
  NFTS_STDDEV_SAMPLE_BALANCE_DESC = 'NFTS_STDDEV_SAMPLE_BALANCE_DESC',
  NFTS_STDDEV_SAMPLE_BLOCK_RANGE_ASC = 'NFTS_STDDEV_SAMPLE_BLOCK_RANGE_ASC',
  NFTS_STDDEV_SAMPLE_BLOCK_RANGE_DESC = 'NFTS_STDDEV_SAMPLE_BLOCK_RANGE_DESC',
  NFTS_STDDEV_SAMPLE_ID_ASC = 'NFTS_STDDEV_SAMPLE_ID_ASC',
  NFTS_STDDEV_SAMPLE_ID_DESC = 'NFTS_STDDEV_SAMPLE_ID_DESC',
  NFTS_STDDEV_SAMPLE_NFT_ID_ASC = 'NFTS_STDDEV_SAMPLE_NFT_ID_ASC',
  NFTS_STDDEV_SAMPLE_NFT_ID_DESC = 'NFTS_STDDEV_SAMPLE_NFT_ID_DESC',
  NFTS_STDDEV_SAMPLE_NFT_TOKEN_ID_ASC = 'NFTS_STDDEV_SAMPLE_NFT_TOKEN_ID_ASC',
  NFTS_STDDEV_SAMPLE_NFT_TOKEN_ID_DESC = 'NFTS_STDDEV_SAMPLE_NFT_TOKEN_ID_DESC',
  NFTS_STDDEV_SAMPLE_WALLET_ID_ASC = 'NFTS_STDDEV_SAMPLE_WALLET_ID_ASC',
  NFTS_STDDEV_SAMPLE_WALLET_ID_DESC = 'NFTS_STDDEV_SAMPLE_WALLET_ID_DESC',
  NFTS_SUM_BALANCE_ASC = 'NFTS_SUM_BALANCE_ASC',
  NFTS_SUM_BALANCE_DESC = 'NFTS_SUM_BALANCE_DESC',
  NFTS_SUM_BLOCK_RANGE_ASC = 'NFTS_SUM_BLOCK_RANGE_ASC',
  NFTS_SUM_BLOCK_RANGE_DESC = 'NFTS_SUM_BLOCK_RANGE_DESC',
  NFTS_SUM_ID_ASC = 'NFTS_SUM_ID_ASC',
  NFTS_SUM_ID_DESC = 'NFTS_SUM_ID_DESC',
  NFTS_SUM_NFT_ID_ASC = 'NFTS_SUM_NFT_ID_ASC',
  NFTS_SUM_NFT_ID_DESC = 'NFTS_SUM_NFT_ID_DESC',
  NFTS_SUM_NFT_TOKEN_ID_ASC = 'NFTS_SUM_NFT_TOKEN_ID_ASC',
  NFTS_SUM_NFT_TOKEN_ID_DESC = 'NFTS_SUM_NFT_TOKEN_ID_DESC',
  NFTS_SUM_WALLET_ID_ASC = 'NFTS_SUM_WALLET_ID_ASC',
  NFTS_SUM_WALLET_ID_DESC = 'NFTS_SUM_WALLET_ID_DESC',
  NFTS_VARIANCE_POPULATION_BALANCE_ASC = 'NFTS_VARIANCE_POPULATION_BALANCE_ASC',
  NFTS_VARIANCE_POPULATION_BALANCE_DESC = 'NFTS_VARIANCE_POPULATION_BALANCE_DESC',
  NFTS_VARIANCE_POPULATION_BLOCK_RANGE_ASC = 'NFTS_VARIANCE_POPULATION_BLOCK_RANGE_ASC',
  NFTS_VARIANCE_POPULATION_BLOCK_RANGE_DESC = 'NFTS_VARIANCE_POPULATION_BLOCK_RANGE_DESC',
  NFTS_VARIANCE_POPULATION_ID_ASC = 'NFTS_VARIANCE_POPULATION_ID_ASC',
  NFTS_VARIANCE_POPULATION_ID_DESC = 'NFTS_VARIANCE_POPULATION_ID_DESC',
  NFTS_VARIANCE_POPULATION_NFT_ID_ASC = 'NFTS_VARIANCE_POPULATION_NFT_ID_ASC',
  NFTS_VARIANCE_POPULATION_NFT_ID_DESC = 'NFTS_VARIANCE_POPULATION_NFT_ID_DESC',
  NFTS_VARIANCE_POPULATION_NFT_TOKEN_ID_ASC = 'NFTS_VARIANCE_POPULATION_NFT_TOKEN_ID_ASC',
  NFTS_VARIANCE_POPULATION_NFT_TOKEN_ID_DESC = 'NFTS_VARIANCE_POPULATION_NFT_TOKEN_ID_DESC',
  NFTS_VARIANCE_POPULATION_WALLET_ID_ASC = 'NFTS_VARIANCE_POPULATION_WALLET_ID_ASC',
  NFTS_VARIANCE_POPULATION_WALLET_ID_DESC = 'NFTS_VARIANCE_POPULATION_WALLET_ID_DESC',
  NFTS_VARIANCE_SAMPLE_BALANCE_ASC = 'NFTS_VARIANCE_SAMPLE_BALANCE_ASC',
  NFTS_VARIANCE_SAMPLE_BALANCE_DESC = 'NFTS_VARIANCE_SAMPLE_BALANCE_DESC',
  NFTS_VARIANCE_SAMPLE_BLOCK_RANGE_ASC = 'NFTS_VARIANCE_SAMPLE_BLOCK_RANGE_ASC',
  NFTS_VARIANCE_SAMPLE_BLOCK_RANGE_DESC = 'NFTS_VARIANCE_SAMPLE_BLOCK_RANGE_DESC',
  NFTS_VARIANCE_SAMPLE_ID_ASC = 'NFTS_VARIANCE_SAMPLE_ID_ASC',
  NFTS_VARIANCE_SAMPLE_ID_DESC = 'NFTS_VARIANCE_SAMPLE_ID_DESC',
  NFTS_VARIANCE_SAMPLE_NFT_ID_ASC = 'NFTS_VARIANCE_SAMPLE_NFT_ID_ASC',
  NFTS_VARIANCE_SAMPLE_NFT_ID_DESC = 'NFTS_VARIANCE_SAMPLE_NFT_ID_DESC',
  NFTS_VARIANCE_SAMPLE_NFT_TOKEN_ID_ASC = 'NFTS_VARIANCE_SAMPLE_NFT_TOKEN_ID_ASC',
  NFTS_VARIANCE_SAMPLE_NFT_TOKEN_ID_DESC = 'NFTS_VARIANCE_SAMPLE_NFT_TOKEN_ID_DESC',
  NFTS_VARIANCE_SAMPLE_WALLET_ID_ASC = 'NFTS_VARIANCE_SAMPLE_WALLET_ID_ASC',
  NFTS_VARIANCE_SAMPLE_WALLET_ID_DESC = 'NFTS_VARIANCE_SAMPLE_WALLET_ID_DESC',
  PRIMARY_KEY_ASC = 'PRIMARY_KEY_ASC',
  PRIMARY_KEY_DESC = 'PRIMARY_KEY_DESC',
  TOKENS_AVERAGE_BALANCE_ASC = 'TOKENS_AVERAGE_BALANCE_ASC',
  TOKENS_AVERAGE_BALANCE_DESC = 'TOKENS_AVERAGE_BALANCE_DESC',
  TOKENS_AVERAGE_BLOCK_RANGE_ASC = 'TOKENS_AVERAGE_BLOCK_RANGE_ASC',
  TOKENS_AVERAGE_BLOCK_RANGE_DESC = 'TOKENS_AVERAGE_BLOCK_RANGE_DESC',
  TOKENS_AVERAGE_ID_ASC = 'TOKENS_AVERAGE_ID_ASC',
  TOKENS_AVERAGE_ID_DESC = 'TOKENS_AVERAGE_ID_DESC',
  TOKENS_AVERAGE_TOKEN_ID_ASC = 'TOKENS_AVERAGE_TOKEN_ID_ASC',
  TOKENS_AVERAGE_TOKEN_ID_DESC = 'TOKENS_AVERAGE_TOKEN_ID_DESC',
  TOKENS_AVERAGE_TOKEN_NAME_ASC = 'TOKENS_AVERAGE_TOKEN_NAME_ASC',
  TOKENS_AVERAGE_TOKEN_NAME_DESC = 'TOKENS_AVERAGE_TOKEN_NAME_DESC',
  TOKENS_AVERAGE_TOKEN_SYMBOL_ASC = 'TOKENS_AVERAGE_TOKEN_SYMBOL_ASC',
  TOKENS_AVERAGE_TOKEN_SYMBOL_DESC = 'TOKENS_AVERAGE_TOKEN_SYMBOL_DESC',
  TOKENS_AVERAGE_WALLET_ID_ASC = 'TOKENS_AVERAGE_WALLET_ID_ASC',
  TOKENS_AVERAGE_WALLET_ID_DESC = 'TOKENS_AVERAGE_WALLET_ID_DESC',
  TOKENS_COUNT_ASC = 'TOKENS_COUNT_ASC',
  TOKENS_COUNT_DESC = 'TOKENS_COUNT_DESC',
  TOKENS_DISTINCT_COUNT_BALANCE_ASC = 'TOKENS_DISTINCT_COUNT_BALANCE_ASC',
  TOKENS_DISTINCT_COUNT_BALANCE_DESC = 'TOKENS_DISTINCT_COUNT_BALANCE_DESC',
  TOKENS_DISTINCT_COUNT_BLOCK_RANGE_ASC = 'TOKENS_DISTINCT_COUNT_BLOCK_RANGE_ASC',
  TOKENS_DISTINCT_COUNT_BLOCK_RANGE_DESC = 'TOKENS_DISTINCT_COUNT_BLOCK_RANGE_DESC',
  TOKENS_DISTINCT_COUNT_ID_ASC = 'TOKENS_DISTINCT_COUNT_ID_ASC',
  TOKENS_DISTINCT_COUNT_ID_DESC = 'TOKENS_DISTINCT_COUNT_ID_DESC',
  TOKENS_DISTINCT_COUNT_TOKEN_ID_ASC = 'TOKENS_DISTINCT_COUNT_TOKEN_ID_ASC',
  TOKENS_DISTINCT_COUNT_TOKEN_ID_DESC = 'TOKENS_DISTINCT_COUNT_TOKEN_ID_DESC',
  TOKENS_DISTINCT_COUNT_TOKEN_NAME_ASC = 'TOKENS_DISTINCT_COUNT_TOKEN_NAME_ASC',
  TOKENS_DISTINCT_COUNT_TOKEN_NAME_DESC = 'TOKENS_DISTINCT_COUNT_TOKEN_NAME_DESC',
  TOKENS_DISTINCT_COUNT_TOKEN_SYMBOL_ASC = 'TOKENS_DISTINCT_COUNT_TOKEN_SYMBOL_ASC',
  TOKENS_DISTINCT_COUNT_TOKEN_SYMBOL_DESC = 'TOKENS_DISTINCT_COUNT_TOKEN_SYMBOL_DESC',
  TOKENS_DISTINCT_COUNT_WALLET_ID_ASC = 'TOKENS_DISTINCT_COUNT_WALLET_ID_ASC',
  TOKENS_DISTINCT_COUNT_WALLET_ID_DESC = 'TOKENS_DISTINCT_COUNT_WALLET_ID_DESC',
  TOKENS_MAX_BALANCE_ASC = 'TOKENS_MAX_BALANCE_ASC',
  TOKENS_MAX_BALANCE_DESC = 'TOKENS_MAX_BALANCE_DESC',
  TOKENS_MAX_BLOCK_RANGE_ASC = 'TOKENS_MAX_BLOCK_RANGE_ASC',
  TOKENS_MAX_BLOCK_RANGE_DESC = 'TOKENS_MAX_BLOCK_RANGE_DESC',
  TOKENS_MAX_ID_ASC = 'TOKENS_MAX_ID_ASC',
  TOKENS_MAX_ID_DESC = 'TOKENS_MAX_ID_DESC',
  TOKENS_MAX_TOKEN_ID_ASC = 'TOKENS_MAX_TOKEN_ID_ASC',
  TOKENS_MAX_TOKEN_ID_DESC = 'TOKENS_MAX_TOKEN_ID_DESC',
  TOKENS_MAX_TOKEN_NAME_ASC = 'TOKENS_MAX_TOKEN_NAME_ASC',
  TOKENS_MAX_TOKEN_NAME_DESC = 'TOKENS_MAX_TOKEN_NAME_DESC',
  TOKENS_MAX_TOKEN_SYMBOL_ASC = 'TOKENS_MAX_TOKEN_SYMBOL_ASC',
  TOKENS_MAX_TOKEN_SYMBOL_DESC = 'TOKENS_MAX_TOKEN_SYMBOL_DESC',
  TOKENS_MAX_WALLET_ID_ASC = 'TOKENS_MAX_WALLET_ID_ASC',
  TOKENS_MAX_WALLET_ID_DESC = 'TOKENS_MAX_WALLET_ID_DESC',
  TOKENS_MIN_BALANCE_ASC = 'TOKENS_MIN_BALANCE_ASC',
  TOKENS_MIN_BALANCE_DESC = 'TOKENS_MIN_BALANCE_DESC',
  TOKENS_MIN_BLOCK_RANGE_ASC = 'TOKENS_MIN_BLOCK_RANGE_ASC',
  TOKENS_MIN_BLOCK_RANGE_DESC = 'TOKENS_MIN_BLOCK_RANGE_DESC',
  TOKENS_MIN_ID_ASC = 'TOKENS_MIN_ID_ASC',
  TOKENS_MIN_ID_DESC = 'TOKENS_MIN_ID_DESC',
  TOKENS_MIN_TOKEN_ID_ASC = 'TOKENS_MIN_TOKEN_ID_ASC',
  TOKENS_MIN_TOKEN_ID_DESC = 'TOKENS_MIN_TOKEN_ID_DESC',
  TOKENS_MIN_TOKEN_NAME_ASC = 'TOKENS_MIN_TOKEN_NAME_ASC',
  TOKENS_MIN_TOKEN_NAME_DESC = 'TOKENS_MIN_TOKEN_NAME_DESC',
  TOKENS_MIN_TOKEN_SYMBOL_ASC = 'TOKENS_MIN_TOKEN_SYMBOL_ASC',
  TOKENS_MIN_TOKEN_SYMBOL_DESC = 'TOKENS_MIN_TOKEN_SYMBOL_DESC',
  TOKENS_MIN_WALLET_ID_ASC = 'TOKENS_MIN_WALLET_ID_ASC',
  TOKENS_MIN_WALLET_ID_DESC = 'TOKENS_MIN_WALLET_ID_DESC',
  TOKENS_STDDEV_POPULATION_BALANCE_ASC = 'TOKENS_STDDEV_POPULATION_BALANCE_ASC',
  TOKENS_STDDEV_POPULATION_BALANCE_DESC = 'TOKENS_STDDEV_POPULATION_BALANCE_DESC',
  TOKENS_STDDEV_POPULATION_BLOCK_RANGE_ASC = 'TOKENS_STDDEV_POPULATION_BLOCK_RANGE_ASC',
  TOKENS_STDDEV_POPULATION_BLOCK_RANGE_DESC = 'TOKENS_STDDEV_POPULATION_BLOCK_RANGE_DESC',
  TOKENS_STDDEV_POPULATION_ID_ASC = 'TOKENS_STDDEV_POPULATION_ID_ASC',
  TOKENS_STDDEV_POPULATION_ID_DESC = 'TOKENS_STDDEV_POPULATION_ID_DESC',
  TOKENS_STDDEV_POPULATION_TOKEN_ID_ASC = 'TOKENS_STDDEV_POPULATION_TOKEN_ID_ASC',
  TOKENS_STDDEV_POPULATION_TOKEN_ID_DESC = 'TOKENS_STDDEV_POPULATION_TOKEN_ID_DESC',
  TOKENS_STDDEV_POPULATION_TOKEN_NAME_ASC = 'TOKENS_STDDEV_POPULATION_TOKEN_NAME_ASC',
  TOKENS_STDDEV_POPULATION_TOKEN_NAME_DESC = 'TOKENS_STDDEV_POPULATION_TOKEN_NAME_DESC',
  TOKENS_STDDEV_POPULATION_TOKEN_SYMBOL_ASC = 'TOKENS_STDDEV_POPULATION_TOKEN_SYMBOL_ASC',
  TOKENS_STDDEV_POPULATION_TOKEN_SYMBOL_DESC = 'TOKENS_STDDEV_POPULATION_TOKEN_SYMBOL_DESC',
  TOKENS_STDDEV_POPULATION_WALLET_ID_ASC = 'TOKENS_STDDEV_POPULATION_WALLET_ID_ASC',
  TOKENS_STDDEV_POPULATION_WALLET_ID_DESC = 'TOKENS_STDDEV_POPULATION_WALLET_ID_DESC',
  TOKENS_STDDEV_SAMPLE_BALANCE_ASC = 'TOKENS_STDDEV_SAMPLE_BALANCE_ASC',
  TOKENS_STDDEV_SAMPLE_BALANCE_DESC = 'TOKENS_STDDEV_SAMPLE_BALANCE_DESC',
  TOKENS_STDDEV_SAMPLE_BLOCK_RANGE_ASC = 'TOKENS_STDDEV_SAMPLE_BLOCK_RANGE_ASC',
  TOKENS_STDDEV_SAMPLE_BLOCK_RANGE_DESC = 'TOKENS_STDDEV_SAMPLE_BLOCK_RANGE_DESC',
  TOKENS_STDDEV_SAMPLE_ID_ASC = 'TOKENS_STDDEV_SAMPLE_ID_ASC',
  TOKENS_STDDEV_SAMPLE_ID_DESC = 'TOKENS_STDDEV_SAMPLE_ID_DESC',
  TOKENS_STDDEV_SAMPLE_TOKEN_ID_ASC = 'TOKENS_STDDEV_SAMPLE_TOKEN_ID_ASC',
  TOKENS_STDDEV_SAMPLE_TOKEN_ID_DESC = 'TOKENS_STDDEV_SAMPLE_TOKEN_ID_DESC',
  TOKENS_STDDEV_SAMPLE_TOKEN_NAME_ASC = 'TOKENS_STDDEV_SAMPLE_TOKEN_NAME_ASC',
  TOKENS_STDDEV_SAMPLE_TOKEN_NAME_DESC = 'TOKENS_STDDEV_SAMPLE_TOKEN_NAME_DESC',
  TOKENS_STDDEV_SAMPLE_TOKEN_SYMBOL_ASC = 'TOKENS_STDDEV_SAMPLE_TOKEN_SYMBOL_ASC',
  TOKENS_STDDEV_SAMPLE_TOKEN_SYMBOL_DESC = 'TOKENS_STDDEV_SAMPLE_TOKEN_SYMBOL_DESC',
  TOKENS_STDDEV_SAMPLE_WALLET_ID_ASC = 'TOKENS_STDDEV_SAMPLE_WALLET_ID_ASC',
  TOKENS_STDDEV_SAMPLE_WALLET_ID_DESC = 'TOKENS_STDDEV_SAMPLE_WALLET_ID_DESC',
  TOKENS_SUM_BALANCE_ASC = 'TOKENS_SUM_BALANCE_ASC',
  TOKENS_SUM_BALANCE_DESC = 'TOKENS_SUM_BALANCE_DESC',
  TOKENS_SUM_BLOCK_RANGE_ASC = 'TOKENS_SUM_BLOCK_RANGE_ASC',
  TOKENS_SUM_BLOCK_RANGE_DESC = 'TOKENS_SUM_BLOCK_RANGE_DESC',
  TOKENS_SUM_ID_ASC = 'TOKENS_SUM_ID_ASC',
  TOKENS_SUM_ID_DESC = 'TOKENS_SUM_ID_DESC',
  TOKENS_SUM_TOKEN_ID_ASC = 'TOKENS_SUM_TOKEN_ID_ASC',
  TOKENS_SUM_TOKEN_ID_DESC = 'TOKENS_SUM_TOKEN_ID_DESC',
  TOKENS_SUM_TOKEN_NAME_ASC = 'TOKENS_SUM_TOKEN_NAME_ASC',
  TOKENS_SUM_TOKEN_NAME_DESC = 'TOKENS_SUM_TOKEN_NAME_DESC',
  TOKENS_SUM_TOKEN_SYMBOL_ASC = 'TOKENS_SUM_TOKEN_SYMBOL_ASC',
  TOKENS_SUM_TOKEN_SYMBOL_DESC = 'TOKENS_SUM_TOKEN_SYMBOL_DESC',
  TOKENS_SUM_WALLET_ID_ASC = 'TOKENS_SUM_WALLET_ID_ASC',
  TOKENS_SUM_WALLET_ID_DESC = 'TOKENS_SUM_WALLET_ID_DESC',
  TOKENS_VARIANCE_POPULATION_BALANCE_ASC = 'TOKENS_VARIANCE_POPULATION_BALANCE_ASC',
  TOKENS_VARIANCE_POPULATION_BALANCE_DESC = 'TOKENS_VARIANCE_POPULATION_BALANCE_DESC',
  TOKENS_VARIANCE_POPULATION_BLOCK_RANGE_ASC = 'TOKENS_VARIANCE_POPULATION_BLOCK_RANGE_ASC',
  TOKENS_VARIANCE_POPULATION_BLOCK_RANGE_DESC = 'TOKENS_VARIANCE_POPULATION_BLOCK_RANGE_DESC',
  TOKENS_VARIANCE_POPULATION_ID_ASC = 'TOKENS_VARIANCE_POPULATION_ID_ASC',
  TOKENS_VARIANCE_POPULATION_ID_DESC = 'TOKENS_VARIANCE_POPULATION_ID_DESC',
  TOKENS_VARIANCE_POPULATION_TOKEN_ID_ASC = 'TOKENS_VARIANCE_POPULATION_TOKEN_ID_ASC',
  TOKENS_VARIANCE_POPULATION_TOKEN_ID_DESC = 'TOKENS_VARIANCE_POPULATION_TOKEN_ID_DESC',
  TOKENS_VARIANCE_POPULATION_TOKEN_NAME_ASC = 'TOKENS_VARIANCE_POPULATION_TOKEN_NAME_ASC',
  TOKENS_VARIANCE_POPULATION_TOKEN_NAME_DESC = 'TOKENS_VARIANCE_POPULATION_TOKEN_NAME_DESC',
  TOKENS_VARIANCE_POPULATION_TOKEN_SYMBOL_ASC = 'TOKENS_VARIANCE_POPULATION_TOKEN_SYMBOL_ASC',
  TOKENS_VARIANCE_POPULATION_TOKEN_SYMBOL_DESC = 'TOKENS_VARIANCE_POPULATION_TOKEN_SYMBOL_DESC',
  TOKENS_VARIANCE_POPULATION_WALLET_ID_ASC = 'TOKENS_VARIANCE_POPULATION_WALLET_ID_ASC',
  TOKENS_VARIANCE_POPULATION_WALLET_ID_DESC = 'TOKENS_VARIANCE_POPULATION_WALLET_ID_DESC',
  TOKENS_VARIANCE_SAMPLE_BALANCE_ASC = 'TOKENS_VARIANCE_SAMPLE_BALANCE_ASC',
  TOKENS_VARIANCE_SAMPLE_BALANCE_DESC = 'TOKENS_VARIANCE_SAMPLE_BALANCE_DESC',
  TOKENS_VARIANCE_SAMPLE_BLOCK_RANGE_ASC = 'TOKENS_VARIANCE_SAMPLE_BLOCK_RANGE_ASC',
  TOKENS_VARIANCE_SAMPLE_BLOCK_RANGE_DESC = 'TOKENS_VARIANCE_SAMPLE_BLOCK_RANGE_DESC',
  TOKENS_VARIANCE_SAMPLE_ID_ASC = 'TOKENS_VARIANCE_SAMPLE_ID_ASC',
  TOKENS_VARIANCE_SAMPLE_ID_DESC = 'TOKENS_VARIANCE_SAMPLE_ID_DESC',
  TOKENS_VARIANCE_SAMPLE_TOKEN_ID_ASC = 'TOKENS_VARIANCE_SAMPLE_TOKEN_ID_ASC',
  TOKENS_VARIANCE_SAMPLE_TOKEN_ID_DESC = 'TOKENS_VARIANCE_SAMPLE_TOKEN_ID_DESC',
  TOKENS_VARIANCE_SAMPLE_TOKEN_NAME_ASC = 'TOKENS_VARIANCE_SAMPLE_TOKEN_NAME_ASC',
  TOKENS_VARIANCE_SAMPLE_TOKEN_NAME_DESC = 'TOKENS_VARIANCE_SAMPLE_TOKEN_NAME_DESC',
  TOKENS_VARIANCE_SAMPLE_TOKEN_SYMBOL_ASC = 'TOKENS_VARIANCE_SAMPLE_TOKEN_SYMBOL_ASC',
  TOKENS_VARIANCE_SAMPLE_TOKEN_SYMBOL_DESC = 'TOKENS_VARIANCE_SAMPLE_TOKEN_SYMBOL_DESC',
  TOKENS_VARIANCE_SAMPLE_WALLET_ID_ASC = 'TOKENS_VARIANCE_SAMPLE_WALLET_ID_ASC',
  TOKENS_VARIANCE_SAMPLE_WALLET_ID_DESC = 'TOKENS_VARIANCE_SAMPLE_WALLET_ID_DESC'
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

export enum Gqlasset_transfers_distinct_enum {
  FROM_ID = 'FROM_ID',
  ID = 'ID',
  NFT_ID = 'NFT_ID',
  TOKEN_ID = 'TOKEN_ID',
  TO_ID = 'TO_ID',
  TRANSACTION_BLOCK_NUMBER = 'TRANSACTION_BLOCK_NUMBER',
  TRANSACTION_ID = 'TRANSACTION_ID',
  TYPE = 'TYPE',
  VALUE = 'VALUE'
}

export enum Gqlnft_balances_distinct_enum {
  BALANCE = 'BALANCE',
  ID = 'ID',
  NFT_ID = 'NFT_ID',
  NFT_TOKEN_ID = 'NFT_TOKEN_ID',
  WALLET_ID = 'WALLET_ID'
}

export enum Gqlnfts_distinct_enum {
  COLLECTION_ID = 'COLLECTION_ID',
  ID = 'ID',
  METADATA = 'METADATA',
  TOKEN_ID = 'TOKEN_ID'
}

export enum Gqltoken_balances_distinct_enum {
  BALANCE = 'BALANCE',
  ID = 'ID',
  TOKEN_ID = 'TOKEN_ID',
  TOKEN_NAME = 'TOKEN_NAME',
  TOKEN_SYMBOL = 'TOKEN_SYMBOL',
  WALLET_ID = 'WALLET_ID'
}

export enum Gqltoken_contracts_distinct_enum {
  DECIMALS = 'DECIMALS',
  ICON_URL = 'ICON_URL',
  ID = 'ID',
  NAME = 'NAME',
  SYMBOL = 'SYMBOL',
  TYPE = 'TYPE'
}

export enum Gqltransactions_distinct_enum {
  BLOCK_HASH = 'BLOCK_HASH',
  BLOCK_NUMBER = 'BLOCK_NUMBER',
  DATE = 'DATE',
  FEES = 'FEES',
  GAS_PRICE = 'GAS_PRICE',
  GAS_USED = 'GAS_USED',
  ID = 'ID',
  SUCCESS = 'SUCCESS'
}

export enum Gqlwallets_distinct_enum {
  BALANCE = 'BALANCE',
  ID = 'ID'
}

export type GqlwalletBalanceQueryVariables = Exact<{
  walletId: Scalars['String']['input'];
}>;


export type GqlwalletBalanceQuery = {
  wallet: {
    id: string,
    balance: string
  } | null
};

export type GqlwalletSubscriptionSubscriptionVariables = Exact<{
  walletIds?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
  mutation?: InputMaybe<Array<GqlMutationType> | GqlMutationType>;
}>;


export type GqlwalletSubscriptionSubscription = {
  wallets: {
    id: string,
    _entity: any | null
  } | null
};

export type GqlwalletTokenBalancesQueryVariables = Exact<{
  walletId: Scalars['String']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['Cursor']['input']>;
  orderBy?: InputMaybe<Array<GqlTokenBalancesOrderBy> | GqlTokenBalancesOrderBy>;
}>;


export type GqlwalletTokenBalancesQuery = {
  tokenBalances: {
    totalCount: number,
    pageInfo: {
      endCursor: string | null,
      startCursor: string | null,
      hasNextPage: boolean,
      hasPreviousPage: boolean
    },
    edges: Array<{
      cursor: string | null,
      node: {
        id: string,
        balance: string,
        token: {
          id: string,
          type: string,
          name: string | null,
          symbol: string | null,
          decimals: number | null,
          iconUrl: string | null
        } | null
      } | null
    }>
  } | null
};

export type GqltokenBalancesSubscriptionSubscriptionVariables = Exact<{
  tokenBalancesIds?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
  mutation?: InputMaybe<Array<GqlMutationType> | GqlMutationType>;
}>;


export type GqltokenBalancesSubscriptionSubscription = {
  tokenBalances: {
    id: string,
    mutation_type: GqlMutationType,
    _entity: any | null
  } | null
};

export type GqlwalletNftsQueryVariables = Exact<{
  walletId: Scalars['String']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['Cursor']['input']>;
  orderBy?: InputMaybe<Array<GqlNftBalancesOrderBy> | GqlNftBalancesOrderBy>;
}>;


export type GqlwalletNftsQuery = {
  nftBalances: {
    totalCount: number,
    pageInfo: {
      endCursor: string | null,
      startCursor: string | null,
      hasNextPage: boolean,
      hasPreviousPage: boolean
    },
    edges: Array<{
      cursor: string | null,
      node: {
        id: string,
        balance: string,
        nft: {
          id: string,
          tokenId: string,
          metadata: any,
          collection: {
            id: string,
            type: string,
            name: string | null,
            symbol: string | null,
            decimals: number | null,
            iconUrl: string | null
          } | null
        } | null
      } | null
    }>
  } | null
};

export type GqlnftBalancesSubscriptionSubscriptionVariables = Exact<{
  nftBalanceIds?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
  mutation?: InputMaybe<Array<GqlMutationType> | GqlMutationType>;
}>;


export type GqlnftBalancesSubscriptionSubscription = {
  nftBalances: {
    id: string,
    mutation_type: GqlMutationType,
    _entity: any | null
  } | null
};

export type GqlwalletNftQueryVariables = Exact<{
  nftBalanceId: Scalars['String']['input'];
}>;


export type GqlwalletNftQuery = {
  nftBalance: {
    id: string,
    balance: string,
    nft: {
      id: string,
      tokenId: string,
      metadata: any,
      collection: {
        id: string,
        type: string,
        name: string | null,
        symbol: string | null,
        decimals: number | null,
        iconUrl: string | null
      } | null
    } | null
  } | null
};

export type GqlwalletAssetTransfersQueryVariables = Exact<{
  walletId: Scalars['String']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['Cursor']['input']>;
  orderBy?: InputMaybe<Array<GqlAssetTransfersOrderBy> | GqlAssetTransfersOrderBy>;
}>;


export type GqlwalletAssetTransfersQuery = {
  assetTransfers: {
    totalCount: number,
    pageInfo: {
      endCursor: string | null,
      startCursor: string | null,
      hasNextPage: boolean,
      hasPreviousPage: boolean
    },
    edges: Array<{
      cursor: string | null,
      node: {
        id: string,
        type: string,
        value: string,
        from: {
          id: string
        } | null,
        to: {
          id: string
        } | null,
        transaction: {
          id: string,
          blockNumber: string,
          blockHash: string,
          date: string,
          gasUsed: string,
          gasPrice: string,
          fees: string,
          success: boolean
        } | null,
        token: {
          id: string,
          type: string,
          name: string | null,
          symbol: string | null,
          decimals: number | null,
          iconUrl: string | null
        } | null,
        nft: {
          id: string,
          tokenId: string,
          metadata: any,
          collection: {
            id: string,
            type: string,
            name: string | null,
            symbol: string | null,
            decimals: number | null,
            iconUrl: string | null
          } | null
        } | null
      } | null
    }>
  } | null
};

export type GqlassetTransfersSubscriptionSubscriptionVariables = Exact<{
  assetTransferIds?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
  mutation?: InputMaybe<Array<GqlMutationType> | GqlMutationType>;
}>;


export type GqlassetTransfersSubscriptionSubscription = {
  assetTransfers: {
    id: string,
    mutation_type: GqlMutationType,
    _entity: any | null
  } | null
};

export type GqlKeybanClient_PageInfoFragment = {
  endCursor: string | null,
  startCursor: string | null,
  hasNextPage: boolean,
  hasPreviousPage: boolean
};

export type GqlKeybanClient_TokenContractFragment = {
  id: string,
  type: string,
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
    type: string,
    name: string | null,
    symbol: string | null,
    decimals: number | null,
    iconUrl: string | null
  } | null
};

export type GqlKeybanClient_NftFragment = {
  id: string,
  tokenId: string,
  metadata: any,
  collection: {
    id: string,
    type: string,
    name: string | null,
    symbol: string | null,
    decimals: number | null,
    iconUrl: string | null
  } | null
};

export type GqlKeybanClient_NftBalanceFragment = {
  id: string,
  balance: string,
  nft: {
    id: string,
    tokenId: string,
    metadata: any,
    collection: {
      id: string,
      type: string,
      name: string | null,
      symbol: string | null,
      decimals: number | null,
      iconUrl: string | null
    } | null
  } | null
};

export type GqlKeybanClient_TransactionFragment = {
  id: string,
  blockNumber: string,
  blockHash: string,
  date: string,
  gasUsed: string,
  gasPrice: string,
  fees: string,
  success: boolean
};

export type GqlKeybanClient_AssetTransferFragment = {
  id: string,
  type: string,
  value: string,
  from: {
    id: string
  } | null,
  to: {
    id: string
  } | null,
  transaction: {
    id: string,
    blockNumber: string,
    blockHash: string,
    date: string,
    gasUsed: string,
    gasPrice: string,
    fees: string,
    success: boolean
  } | null,
  token: {
    id: string,
    type: string,
    name: string | null,
    symbol: string | null,
    decimals: number | null,
    iconUrl: string | null
  } | null,
  nft: {
    id: string,
    tokenId: string,
    metadata: any,
    collection: {
      id: string,
      type: string,
      name: string | null,
      symbol: string | null,
      decimals: number | null,
      iconUrl: string | null
    } | null
  } | null
};

export const KeybanClient_PageInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"KeybanClient_PageInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PageInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}}]}}]} as unknown as DocumentNode<GqlKeybanClient_PageInfoFragment, unknown>;
export const KeybanClient_TokenContractFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"KeybanClient_TokenContract"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TokenContract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"iconUrl"}}]}}]} as unknown as DocumentNode<GqlKeybanClient_TokenContractFragment, unknown>;
export const KeybanClient_TokenBalanceFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"KeybanClient_TokenBalance"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TokenBalance"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"KeybanClient_TokenContract"}}]}},{"kind":"Field","name":{"kind":"Name","value":"balance"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"KeybanClient_TokenContract"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TokenContract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"iconUrl"}}]}}]} as unknown as DocumentNode<GqlKeybanClient_TokenBalanceFragment, unknown>;
export const KeybanClient_NftFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"KeybanClient_Nft"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Nft"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"collection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"KeybanClient_TokenContract"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tokenId"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"KeybanClient_TokenContract"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TokenContract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"iconUrl"}}]}}]} as unknown as DocumentNode<GqlKeybanClient_NftFragment, unknown>;
export const KeybanClient_NftBalanceFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"KeybanClient_NftBalance"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NftBalance"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nft"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"KeybanClient_Nft"}}]}},{"kind":"Field","name":{"kind":"Name","value":"balance"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"KeybanClient_TokenContract"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TokenContract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"iconUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"KeybanClient_Nft"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Nft"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"collection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"KeybanClient_TokenContract"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tokenId"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"}}]}}]} as unknown as DocumentNode<GqlKeybanClient_NftBalanceFragment, unknown>;
export const KeybanClient_TransactionFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"KeybanClient_Transaction"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Transaction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"blockHash"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"gasUsed"}},{"kind":"Field","name":{"kind":"Name","value":"gasPrice"}},{"kind":"Field","name":{"kind":"Name","value":"fees"}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]} as unknown as DocumentNode<GqlKeybanClient_TransactionFragment, unknown>;
export const KeybanClient_AssetTransferFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"KeybanClient_AssetTransfer"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AssetTransfer"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"from"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"to"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"transaction"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"KeybanClient_Transaction"}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"KeybanClient_TokenContract"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nft"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"KeybanClient_Nft"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"KeybanClient_TokenContract"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TokenContract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"iconUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"KeybanClient_Nft"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Nft"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"collection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"KeybanClient_TokenContract"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tokenId"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"KeybanClient_Transaction"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Transaction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"blockHash"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"gasUsed"}},{"kind":"Field","name":{"kind":"Name","value":"gasPrice"}},{"kind":"Field","name":{"kind":"Name","value":"fees"}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]} as unknown as DocumentNode<GqlKeybanClient_AssetTransferFragment, unknown>;
export const walletBalanceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"walletBalance"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"walletId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"wallet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"walletId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}}]}}]}}]} as unknown as DocumentNode<GqlwalletBalanceQuery, GqlwalletBalanceQueryVariables>;
export const walletSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"walletSubscription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"walletIds"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mutation"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MutationType"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"wallets"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"walletIds"}}},{"kind":"Argument","name":{"kind":"Name","value":"mutation"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mutation"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"_entity"}}]}}]}}]} as unknown as DocumentNode<GqlwalletSubscriptionSubscription, GqlwalletSubscriptionSubscriptionVariables>;
export const walletTokenBalancesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"walletTokenBalances"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"walletId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Cursor"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TokenBalancesOrderBy"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tokenBalances"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"walletId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"equalTo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"walletId"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"KeybanClient_PageInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"KeybanClient_TokenBalance"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"KeybanClient_PageInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PageInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"KeybanClient_TokenContract"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TokenContract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"iconUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"KeybanClient_TokenBalance"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TokenBalance"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"KeybanClient_TokenContract"}}]}},{"kind":"Field","name":{"kind":"Name","value":"balance"}}]}}]} as unknown as DocumentNode<GqlwalletTokenBalancesQuery, GqlwalletTokenBalancesQueryVariables>;
export const tokenBalancesSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"tokenBalancesSubscription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tokenBalancesIds"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mutation"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MutationType"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tokenBalances"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tokenBalancesIds"}}},{"kind":"Argument","name":{"kind":"Name","value":"mutation"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mutation"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mutation_type"}},{"kind":"Field","name":{"kind":"Name","value":"_entity"}}]}}]}}]} as unknown as DocumentNode<GqltokenBalancesSubscriptionSubscription, GqltokenBalancesSubscriptionSubscriptionVariables>;
export const walletNftsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"walletNfts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"walletId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Cursor"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NftBalancesOrderBy"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nftBalances"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"walletId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"equalTo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"walletId"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"KeybanClient_PageInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"KeybanClient_NftBalance"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"KeybanClient_PageInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PageInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"KeybanClient_TokenContract"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TokenContract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"iconUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"KeybanClient_Nft"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Nft"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"collection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"KeybanClient_TokenContract"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tokenId"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"KeybanClient_NftBalance"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NftBalance"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nft"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"KeybanClient_Nft"}}]}},{"kind":"Field","name":{"kind":"Name","value":"balance"}}]}}]} as unknown as DocumentNode<GqlwalletNftsQuery, GqlwalletNftsQueryVariables>;
export const nftBalancesSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"nftBalancesSubscription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"nftBalanceIds"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mutation"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MutationType"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nftBalances"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"nftBalanceIds"}}},{"kind":"Argument","name":{"kind":"Name","value":"mutation"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mutation"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mutation_type"}},{"kind":"Field","name":{"kind":"Name","value":"_entity"}}]}}]}}]} as unknown as DocumentNode<GqlnftBalancesSubscriptionSubscription, GqlnftBalancesSubscriptionSubscriptionVariables>;
export const walletNftDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"walletNft"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"nftBalanceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nftBalance"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"nftBalanceId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"KeybanClient_NftBalance"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"KeybanClient_TokenContract"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TokenContract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"iconUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"KeybanClient_Nft"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Nft"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"collection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"KeybanClient_TokenContract"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tokenId"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"KeybanClient_NftBalance"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NftBalance"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nft"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"KeybanClient_Nft"}}]}},{"kind":"Field","name":{"kind":"Name","value":"balance"}}]}}]} as unknown as DocumentNode<GqlwalletNftQuery, GqlwalletNftQueryVariables>;
export const walletAssetTransfersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"walletAssetTransfers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"walletId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Cursor"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AssetTransfersOrderBy"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assetTransfers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"or"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"fromId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"equalTo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"walletId"}}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"toId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"equalTo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"walletId"}}}]}}]}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"KeybanClient_PageInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"KeybanClient_AssetTransfer"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"KeybanClient_PageInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PageInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"KeybanClient_TokenContract"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TokenContract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"iconUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"KeybanClient_Nft"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Nft"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"collection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"KeybanClient_TokenContract"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tokenId"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"KeybanClient_Transaction"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Transaction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"blockHash"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"gasUsed"}},{"kind":"Field","name":{"kind":"Name","value":"gasPrice"}},{"kind":"Field","name":{"kind":"Name","value":"fees"}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"KeybanClient_AssetTransfer"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AssetTransfer"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"from"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"to"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"transaction"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"KeybanClient_Transaction"}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"KeybanClient_TokenContract"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nft"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"KeybanClient_Nft"}}]}}]}}]} as unknown as DocumentNode<GqlwalletAssetTransfersQuery, GqlwalletAssetTransfersQueryVariables>;
export const assetTransfersSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"assetTransfersSubscription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"assetTransferIds"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mutation"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MutationType"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assetTransfers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"assetTransferIds"}}},{"kind":"Argument","name":{"kind":"Name","value":"mutation"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mutation"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mutation_type"}},{"kind":"Field","name":{"kind":"Name","value":"_entity"}}]}}]}}]} as unknown as DocumentNode<GqlassetTransfersSubscriptionSubscription, GqlassetTransfersSubscriptionSubscriptionVariables>;


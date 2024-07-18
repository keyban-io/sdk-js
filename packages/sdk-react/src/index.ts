import type {
  EcdsaClientShare as _EcdsaClientShare,
  EddsaClientShare as _EddsaClientShare,
} from '@keyban/sdk-base';

export * from './eddsa';
export * from './ecdsa';
export * from './storages';

type EddsaClientShare = _EddsaClientShare;
type EcdsaClientShare = _EcdsaClientShare;
export type { EddsaClientShare, EcdsaClientShare };

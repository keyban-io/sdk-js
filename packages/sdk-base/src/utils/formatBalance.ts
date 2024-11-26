import { formatUnits } from "viem";

import type { KeybanClient, KeybanToken } from "~/index";

/**
 * Represents a balance with optional metadata.
 *
 * @example
 * // Example of a balance in native currency with fees
 * const balance: Balance = {
 *   raw: '1000000000000000000',
 *   decimals: 18,
 *   symbol: 'ETH',
 *   isNative: true,
 *   isFees: true
 * };
 *
 * @example
 * // Example of a balance in a token
 * const tokenBalance: Balance = {
 *   raw: BigInt('500000000000000000'),
 *   decimals: 18,
 *   symbol: 'DAI'
 * };
 */
export type Balance = {
  /**  The raw balance value. */
  raw: string | bigint;
  /** The number of decimal places for the balance. */
  decimals?: number;
  /** The symbol of the currency. */
  symbol?: string;
  /** Indicates if the balance is in the native currency. */
  isNative?: boolean;
  /** Indicates if the balance is used for fees. */
  isFees?: boolean;
};

/**
 * Formats the balance into a human-readable string with the appropriate decimals and symbol.
 *
 * @param client - The KeybanClient instance which provides information about fees and native currency.
 * @param balance - The balance object containing raw balance, decimals, symbol, and flags indicating if it's fees or native currency.
 * @param token - (Optional) The KeybanToken object which provides token-specific decimals and symbol.
 * @returns A formatted string representing the balance with the appropriate decimals and symbol.
 *
 * @example
 * ```typescript
 * const client = new KeybanClient(...);
 * const balance = { raw: 1000000000000000000n, decimals: 18, symbol: 'ETH', isFees: false, isNative: true };
 * console.log(formatBalance(client, balance)); // "1.0 ETH"
 *
 * const token = { decimals: 6, symbol: 'USDT' };
 * const balanceWithToken = { raw: 1000000n, decimals: 6, symbol: 'USDT', isFees: false, isNative: false };
 * console.log(formatBalance(client, balanceWithToken, token)); // "1.0 USDT"
 *
 * const feeBalance = { raw: 1000n, decimals: 2, symbol: 'GWEI', isFees: true, isNative: false };
 * console.log(formatBalance(client, feeBalance)); // "10.00 GWEI"
 * ```
 */
export function formatBalance(
  client: KeybanClient,
  balance: Balance,
  token?: KeybanToken,
): string {
  let decimals = balance.decimals;
  let symbol = balance.symbol;
  if (balance.isFees) {
    decimals = client.feesUnit.decimals;
    symbol = client.feesUnit.symbol;
  } else if (balance.isNative) {
    decimals = client.nativeCurrency.decimals;
    symbol = client.nativeCurrency.symbol;
  } else if (token) {
    decimals = token.decimals ?? undefined;
    symbol = token.symbol ?? undefined;
  }
  decimals = decimals ?? 0;

  const fmt = formatUnits(
    typeof balance.raw === "bigint" ? balance.raw : BigInt(balance.raw),
    decimals,
  );
  return symbol ? `${fmt} ${symbol}` : fmt;
}

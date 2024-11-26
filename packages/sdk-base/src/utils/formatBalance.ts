import { formatUnits } from "viem";

import type { KeybanClient, KeybanToken } from "~/index";

export type Balance = {
  raw: string | bigint;
  decimals?: number;
  symbol?: string;
  isNative?: boolean;
  isFees?: boolean;
};

/**
 * Formats a balance in a human-readable format using the Keyban client.
 * This is typically used to display the balance of an account, as retrieved by
 * {@link KeybanAccount.getBalance | KeybanAccount.getBalance()}.
 *
 * @param client - The Keyban client to use for formatting.
 * @param balance - The balance as a raw balance object.
 * @param token - The token object, if the balance is for a token.
 * @returns - The formatted balance as a string.
 *
 * @see {@link KeybanClient}
 * @see {@link useKeybanClient}
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

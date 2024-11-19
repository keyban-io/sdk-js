import { formatUnits } from "viem";
import type {
  KeybanClient,
  KeybanToken,
} from "~/index";

export type Balance = {
  raw: string | bigint;
  decimals?: number;
  symbol?: string;
  isNative?: boolean;
}

/**
 * Formats a balance in a human-readable format using the Keyban client.
 * This is typically used to display the balance of an account, as retrieved by
 * {@link KeybanAccount.getBalance | KeybanAccount.getBalance()}.
 *
 * @param client - The Keyban client to use for formatting.
 * @param balance - The balance as a bigint.
 * @returns - The formatted balance as a string.
 *
 * @see {@link KeybanClient}
 * @see {@link useKeybanClient}
 */
export function formatBalance(client: KeybanClient, balance: Balance, token?: KeybanToken,): string {
  const decimals = balance.isNative ? client.nativeCurrency.decimals : balance.decimals ?? token?.decimals ?? 0;
  const symbol = balance.isNative ? client.nativeCurrency.symbol : balance.decimals ?? token?.symbol ?? undefined;

  const fmt = formatUnits(typeof balance.raw === 'bigint' ? balance.raw : BigInt(balance.raw), decimals);
  return symbol ? `${fmt} ${symbol}` : fmt;
}

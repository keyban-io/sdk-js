import { formatUnits } from "viem";
import type { KeybanClient } from "~/client";

/**
 * Formats a balance in a human-readable format using the Keyban client.
 * This is typically used to display the balance of an account, as retrieved by
 * {@link KeybanAccount.getBalance | KeybanAccount.getBalance()}.
 *
 * @param client - The Keyban client to use for formatting.
 * @param balance - The balance as a bigint.
 * @returns The formatted balance as a string.
 *
 */
export function formatBalance(client: KeybanClient, balance: bigint) {
  const { decimals, symbol } = client.publicClient.chain.nativeCurrency;
  return `${formatUnits(balance, decimals)} ${symbol}`;
}

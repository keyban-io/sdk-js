import { formatUnits } from "viem";
import * as chains from "viem/chains";

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
 * @see {@link KeybanClient}
 * @see {@link useKeybanClient}
 */
export function formatBalance(client: KeybanClient, balance: bigint) {
  const { decimals, symbol } = chains[client.chain].nativeCurrency;
  return `${formatUnits(balance, decimals)} ${symbol}`;
}

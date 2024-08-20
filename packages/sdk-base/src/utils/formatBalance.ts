import { formatUnits } from "viem";
import type { KeybanClient } from "~/client";

export function formatBalance(client: KeybanClient, balance: bigint) {
  const { decimals, symbol } = client.publicClient.chain.nativeCurrency;
  return `${formatUnits(balance, decimals)} ${symbol}`;
}

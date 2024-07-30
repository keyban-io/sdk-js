import { formatBalance } from "@keyban/sdk-base";
import { useKeyban } from "./provider";

export function useFormattedBalance(balance: bigint) {
  return formatBalance(useKeyban().client, balance);
}

export type BalanceProps = { balance: bigint };
export function FormattedBalance({ balance }: BalanceProps) {
  return useFormattedBalance(balance);
}

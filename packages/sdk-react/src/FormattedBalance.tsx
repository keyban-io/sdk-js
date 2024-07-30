import { formatBalance } from "@keyban/sdk-base";
import { useKeyban } from "./provider";

export function useFormattedBalance(balance: bigint) {
  const { client } = useKeyban();
  if (!client) return null;

  return formatBalance(client, balance);
}

export type BalanceProps = { balance: bigint };
export function FormattedBalance({ balance }: BalanceProps) {
  return useFormattedBalance(balance);
}

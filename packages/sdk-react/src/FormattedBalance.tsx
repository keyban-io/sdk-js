import { formatBalance } from "@keyban/sdk-base";
import { useKeyban } from "./provider";

/**
 * Formats a balance in a human-readable format using the Keyban client.
 * This is typically used to display the balance of an account, as retrieved by
 * {@link KeybanAccount.getBalance | KeybanAccount.getBalance()}.
 *
 * @param balance - The balance as a bigint.
 * @returns The formatted balance as a string.
 *
 * @example
 * ```tsx
 * import { useFormattedBalance } from "@keyban/sdk-react";
 *
 * const formattedBalance = useFormattedBalance(BigInt(0x2c68af0bb140000));
 * console.log(formattedBalance); // "0.2 MATIC"
 * ```
 */
export function useFormattedBalance(balance: bigint) {
  return formatBalance(useKeyban().client, balance);
}

export type BalanceProps = { balance: bigint };

/**
 * Component to display a formatted balance.
 * This is typically used to display the balance of an account, as retrieved by
 * {@link KeybanAccount.getBalance | KeybanAccount.getBalance()}.
 *
 * @param props - The component properties.
 * @param props.balance - The balance as a bigint.
 * @returns A JSX element displaying the formatted balance.
 *
 * @example
 * ```tsx
 * import { FormattedBalance } from "@keyban/sdk-react";
 *
 * function BalanceDisplay() {
 *   const balance = BigInt(0x2c68af0bb140000);
 *   return (
 *     <div>
 *       <p>Native Balance: <FormattedBalance balance={balance} /></p>
 *     </div>
 *   );
 * }
 *
 * export default BalanceDisplay;
 * ```
 */
export function FormattedBalance({ balance }: BalanceProps) {
  return useFormattedBalance(balance);
}

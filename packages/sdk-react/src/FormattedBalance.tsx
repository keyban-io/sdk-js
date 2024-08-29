import { formatBalance, KeybanAccountTokenBalance } from "@keyban/sdk-base";
import { useKeybanClient } from "./provider";

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
 * const formattedBalance = useFormattedBalance(BigInt(2e17));
 * console.log(formattedBalance); // "0.2 ETH"
 * ```
 */
export function useFormattedBalance(
  balance: bigint | KeybanAccountTokenBalance,
) {
  return formatBalance(useKeybanClient(), balance);
}

/**
 * Props for the FormattedBalance component.
 * @see {@link FormattedBalance}
 */
export type FormatedBalanceProps = {
  balance: bigint | KeybanAccountTokenBalance;
};

/**
 * Component to display a formatted balance.
 * This is typically used to display the balance of an account, as retrieved by
 * {@link KeybanAccount.getBalance | KeybanAccount.getBalance()}.
 *
 * @returns A JSX element displaying the formatted balance.
 *
 * @example
 * ```tsx
 * import { FormattedBalance } from "@keyban/sdk-react";
 *
 * function BalanceDisplay() {
 *   return (
 *     <p>Native Balance: <FormattedBalance balance={BigInt(2e17)} /></p>
 *   );
 * }
 *
 * export default BalanceDisplay;
 * ```
 */
export function FormattedBalance({ balance }: FormatedBalanceProps) {
  return useFormattedBalance(balance);
}

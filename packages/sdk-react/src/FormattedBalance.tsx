import { Balance, formatBalance, KeybanToken } from "@keyban/sdk-base";

import { useKeybanClient } from "./provider";

/**
 * Formats a balance in a human-readable format using the Keyban client.
 * This is typically used to display the balance of an account, as retrieved by
 * {@link KeybanAccount.getBalance | KeybanAccount.getBalance()}.
 *
 * @param balance - The raw balance to format.
 * @param token - The token details, if the balance is not native.
 * @returns - The formatted balance as a string.
 *
 * @example
 * ```tsx
 * import { useFormattedBalance } from "@keyban/sdk-react";
 *
 * const formattedBalance = useFormattedBalance({raw: BigInt(2e17), isNative: true});
 * console.log(formattedBalance); // "0.2 ETH"
 * ```
 */
export function useFormattedBalance(
  balance: Balance,
  token?: KeybanToken,
): string {
  return formatBalance(useKeybanClient(), balance, token);
}

/**
 * Props for the FormattedBalance component.
 * @see {@link FormattedBalance}
 */
export type FormatedBalanceProps = {
  balance: Balance;
  token?: KeybanToken;
};

/**
 * Component to display a formatted balance.
 * This is typically used to display the balance of an account, as retrieved by
 * {@link KeybanAccount.getBalance | KeybanAccount.getBalance()}.
 *
 * @returns - A JSX element displaying the formatted balance.
 *
 * @example
 * ```tsx
 * import { FormattedBalance } from "@keyban/sdk-react";
 *
 * function BalanceDisplay() {
 *   return (
 *     <p>Native Balance: <FormattedBalance balance={{raw: BigInt(2e17), isNative: true}} /></p>
 *   );
 * }
 *
 * export default BalanceDisplay;
 * ```
 */
export function FormattedBalance({ balance, token }: FormatedBalanceProps) {
  return useFormattedBalance(balance, token);
}

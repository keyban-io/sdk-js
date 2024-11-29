/**
 * @module Formatted Balance
 */
import { Balance, formatBalance, KeybanToken } from "@keyban/sdk-base";

import { useKeybanClient } from "./provider";

/**
 * Formats a balance in a human-readable format using the Keyban client.
 * This is typically used to display the balance of an account, as retrieved by
 * @param {Balance} balance - The raw balance to format.
 * @param {KeybanToken} token - The token details, if the balance is not native.
 * @returns {string} - The formatted balance as a string.
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
 * @typedef {object} FormatedBalanceProps
 * @see {@link FormattedBalance}
 */
export type FormatedBalanceProps = {
  /** The balance to be formatted and displayed.  */
  balance: Balance;
  /** Optional token information associated with the balance. */
  token?: KeybanToken;
};

/**
 * A React component that formats and displays a balance.
 * @param {FormatedBalanceProps} props - The properties for the FormattedBalance component.
 * @returns {string} The formatted balance.
 * @example
 * ```tsx
 * import { FormattedBalance } from "@keyban/sdk-react";
 * const MyComponent: React.FC = () => {
 *   const balance = {
 *     raw: BigInt(1000000000000000000),
 *     decimals: 18,
 *     symbol: "ETH",
 *     isNative: true,
 *     isFees: false,
 *   };
 *
 *   return <div>Your balance: <FormattedBalance balance={balance} /></div>;
 * };
 * ```
 */
export function FormattedBalance({ balance, token }: FormatedBalanceProps) {
  return useFormattedBalance(balance, token);
}

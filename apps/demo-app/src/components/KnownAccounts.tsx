import React from "react";
import { FormattedBalance } from "@keyban/sdk-react";
import type { KeybanAccount } from "@keyban/sdk-react";

interface KnownAccountsProps {
  accounts: KeybanAccount[];
}

export default function KnownAccounts({ accounts }: KnownAccountsProps) {
  const [balances, setBalances] = React.useState<bigint[]>([]);

  React.useEffect(() => {
    (async () => {
      const fetchedBalances = await Promise.all(
        accounts.map((account) => account.getBalance())
      );

      setBalances(fetchedBalances);
    })();
  }, [accounts]);

  return (
    <>
      {accounts.map((account, index) => (
        <div key={index} className="account-details">
          <p>Account {account.keyId}</p>
          <p>Address: {account.address}</p>
          <p>
            Balance:{" "}
            {balances[index] != null && (
              <FormattedBalance balance={balances[index]} />
            )}
          </p>
        </div>
      ))}
    </>
  );
}

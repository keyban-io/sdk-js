import React from "react";
import { FormattedBalance, KeybanAccount } from "@keyban/sdk-react";

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
          <p>Account {index + 1}</p>
          <p>Key ID: {account.keyId}</p>
          <p>Address: {account.address}</p>
          <p>
            Balance: <FormattedBalance balance={balances[index]} />
          </p>
          <p>Public Key: {account.clientPublicKey}</p>
        </div>
      ))}
    </>
  );
}

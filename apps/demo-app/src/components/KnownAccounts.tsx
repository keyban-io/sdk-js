import React, { useEffect, useState } from "react";
import { KeybanAccount } from "@keyban/sdk-react";

interface KnownAccountsProps {
  accounts: KeybanAccount[];
}

const KnownAccounts: React.FC<KnownAccountsProps> = ({ accounts }) => {
  const [balances, setBalances] = useState<string[]>([]);

  useEffect(() => {
    const fetchAccountData = async () => {
      const fetchedBalances = await Promise.all(
        accounts.map(async (account) => (await account.getBalance()).toString())
      );
      setBalances(fetchedBalances);
    };

    fetchAccountData();
  }, [accounts]);

  return (
    <>
      {accounts.map((account, index) => (
        <div key={index} className="account-details">
          <p>Account {index + 1}</p>
          <p>Key ID: {account.keyId}</p>
          <p>Address: {account.address}</p>
          <p>Balance: {balances[index]}</p>
          <p>Public Key: {account.clientPublicKey}</p>
        </div>
      ))}
    </>
  );
};

export default KnownAccounts;

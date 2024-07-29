import React, { useEffect, useState } from "react";

interface Account {
  clientPublicKey: string;
  keyId: string;
  getAddress: () => Promise<string>;
  getBalance: () => Promise<number>;
}

interface KnownAccountsProps {
  accounts: Account[];
}

const KnownAccounts: React.FC<KnownAccountsProps> = ({ accounts }) => {
  const [addresses, setAddresses] = useState<string[]>([]);
  const [balances, setBalances] = useState<number[]>([]);

  useEffect(() => {
    const fetchAccountData = async () => {
      const fetchedAddresses = await Promise.all(
        accounts.map((account) => account.getAddress())
      );
      const fetchedBalances = await Promise.all(
        accounts.map((account) => account.getBalance())
      );
      setAddresses(fetchedAddresses);
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
          <p>Address: {addresses[index]}</p>
          <p>Balance: {balances[index]}</p>
          <p>Public Key: {account.clientPublicKey}</p>
        </div>
      ))}
    </>
  );
};

export default KnownAccounts;

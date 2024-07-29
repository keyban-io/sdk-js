// sdk/apps/demo-app/src/components/KnownAccounts.tsx
import React from 'react';

interface Account {
  clientPublicKey: string;
  keyId: string;
}

interface KnownAccountsProps {
  accounts: Account[];
}

const KnownAccounts: React.FC<KnownAccountsProps> = ({ accounts }) => {
  return (
    <>
      {accounts.map((account, index) => (
        <div key={index} className="account-details">
          <p>Account {index + 1}</p>
          <p>Public Key: {account.clientPublicKey}</p>
          <p>Key ID: {account.keyId}</p>
        </div>
      ))}
    </>
  );
};

export default KnownAccounts;

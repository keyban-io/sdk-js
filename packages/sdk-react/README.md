# Keyban React SDK

The Keyban React SDK provides a seamless way to integrate Keyban’s blockchain services into your React applications. It offers React hooks and components to manage accounts, perform transactions, retrieve balances, interact with NFTs, and more, all within the React ecosystem.

## Installation

Install the Keyban React SDK using npm or yarn:

```bash
npm install @keyban/sdk-react
```

or

```bash
yarn add @keyban/sdk-react
```

## Configuration

To start using the Keyban React SDK, wrap your application with the `KeybanProvider` component. This component provides the necessary context for the SDK's hooks to function correctly.

### Example of KeybanProvider Usage

```jsx
import React from "react";
import { KeybanProvider, KeybanNetwork, KeybanClientShareProvider } from "@keyban/sdk-react";

const App = () => {
  return (
    <KeybanProvider
      appId="your-app-id"  // Your unique application ID from Keyban
      network={KeybanNetwork.EthereumAnvil}  // Specify the blockchain network (e.g., Testnet or Mainnet)
      clientShareProvider={React.useMemo(() => new KeybanClientShareProvider(), [])}
    >
      {/* Your application components go here */}
      <YourMainComponent />
    </KeybanProvider>
  );
};

export default App;
```

### Configuration Options

- **`appId`**: Your application ID for authentication with the Keyban API.
- **`network`**: The blockchain network used by Keyban (e.g., `KeybanNetwork.EthereumAnvil`).
- **`clientShareProvider`**: An instance of the `KeybanClientShareProvider`, responsible for securely storing and retrieving the client share via Keyban's infrastructure. For more details, refer to the [KeybanClientShareProvider documentation](https://docs.beta.keyban.io/api/sdk-react/Class.KeybanClientShareProvider).

---

## Creating a Custom ClientShareProvider

The `clientShareProvider` can be customized to allow the integrator to control the storage and retrieval of client shares directly. Below is a guide on how to implement a custom `ClientShareProvider`.

### Example Implementation

```typescript
import { ClientShareProvider } from "@keyban/sdk-base";

export class MyClientShareProvider implements ClientShareProvider {
  async get(): Promise<string | null> {
    // Replace with your API endpoint or secure storage
    return fetch("/api/clientShare").then((res) => res.json());
  }

  async set(clientShare: string): Promise<void> {
    // Save the client share securely
    await fetch("/api/clientShare", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clientShare }),
    });
  }
}
```

> **Note**
>
> The `/api/clientShare` endpoint (or any custom endpoint you define) is **mandatory**. This endpoint is responsible for securely saving and restoring the client shares for end users.
>
> This example is intentionally simple and does not cover authentication mechanisms to protect access to this endpoint. It is the integrator's responsibility to implement appropriate security measures.

You can choose to use this custom provider instead of the default `KeybanClientShareProvider` if you require full control over client share storage.

---

## Authentication Features

### Using the useKeybanAuth Hook

The `useKeybanAuth` hook provides access to authentication features, allowing you to manage user login, logout, and authentication state.

```jsx
import { useKeybanAuth } from "@keyban/sdk-react";

const AuthInfo = () => {
  const { isAuthenticated, login, logout } = useKeybanAuth();

  if (isAuthenticated) {
    return (
      <div>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }

  return <button onClick={() => login()}>Login</button>;
};
```

### Hook Return Values

- **`user`**: The authenticated user object or `null` if not logged in.
- **`isAuthenticated`**: A boolean indicating if the user is authenticated.
- **`login`**: A function to initiate the login process.
- **`logout`**: A function to log out the user.

For more details on authentication, refer to the [KeybanAuthContext documentation](https://docs.beta.keyban.io/api/sdk-react/Function.useKeybanAuth).

---

### Using the SignIn Component

The `SignIn` component renders a customizable sign-in form, supporting multiple authentication methods such as username/password and OAuth.

#### Example Usage

```jsx
import { SignIn } from "@keyban/sdk-react";

const AuthPage = () => {
  return (
    <div>
      <SignIn enableGoogleAuth enableLoginPasswordAuth />
    </div>
  );
};
```

For more details, visit the [SignIn documentation](https://docs.beta.keyban.io/api/sdk-react/Function.SignIn).

## Using React Hooks

The Keyban React SDK provides several React hooks that allow you to interact with the Keyban API in a declarative and efficient manner.

### Accessing the Keyban Client

Use the `useKeybanClient` hook to access the Keyban client within your components.

```jsx
import { useKeybanClient } from "@keyban/sdk-react";

const MyComponent = () => {
  const keybanClient = useKeybanClient();

  // Use keybanClient to interact with the Keyban API
};
```

### Retrieving the Keyban Account

Use the `useKeybanAccount` hook to get the Keyban account associated with the current user.

```jsx
import { useKeybanAccount } from "@keyban/sdk-react";

const AccountInfo = () => {
  const [account, error] = useKeybanAccount();

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return <div>Account Address: {account.address}</div>;
};
```

### Retrieving the Account Balance

Use the `useKeybanAccountBalance` hook to get the native token balance of the account.

```jsx
import { useKeybanAccount, useKeybanAccountBalance } from "@keyban/sdk-react";

const BalanceInfo = () => {
  const [account, accountError] = useKeybanAccount();
  const [balance, balanceError] = useKeybanAccountBalance(account);

  if (accountError || balanceError) {
    return <div>Error: {accountError?.message || balanceError?.message}</div>;
  }

  return <div>Balance: {balance}</div>;
};
```

### Retrieving NFTs of the Account

Use the `useKeybanAccountNfts` hook to get the list of NFTs owned by the account.

```jsx
import { useKeybanAccount, useKeybanAccountNfts } from "@keyban/sdk-react";

const NftsList = () => {
  const [account, accountError] = useKeybanAccount();
  const [nfts, nftsError, { fetchMore, loading }] = useKeybanAccountNfts(account, { first: 5 });

  if (accountError || nftsError) {
    return <div>Error: {accountError?.message || nftsError?.message}</div>;
  }

  return (
    <div>
      <h3>Your NFTs</h3>
      <ul>
        {nfts.nodes.map((nft) => (
          <li key={nft.id}>
            <p>NFT ID: {nft.id}</p>
            <p>Collection: {nft.nft.collection?.name || "Unknown"}</p>
            <p>Token ID: {nft.nft.tokenId}</p>
          </li>
        ))}
      </ul>
      {nfts.hasNextPage && (
        <button onClick={fetchMore} disabled={loading}>
          {loading ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
};
```

### Performing Transactions

Use the methods available on the `KeybanAccount` instance to perform transactions.

#### Transferring Native Tokens

```jsx
import { useKeybanAccount } from "@keyban/sdk-react";

const TransferNativeToken = () => {
  const [account] = useKeybanAccount();

  const handleTransfer = async () => {
    try {
      const valueInWei = BigInt(1e18); // 1 ETH in Wei
      const txHash = await account.transfer("0xRecipientAddress", valueInWei);
      console.log(`Transaction sent: ${txHash}`);
    } catch (err) {
      console.error(err);
    }
  };

  return <button onClick={handleTransfer}>Send 1 ETH</button>;
};
```

#### Transferring ERC20 Tokens

```jsx
import { useKeybanAccount } from "@keyban/sdk-react";

const TransferERC20Token = () => {
  const [account] = useKeybanAccount();

  const handleTransferERC20 = async () => {
    try {
      const valueInWei = BigInt(1e18); // Amount to transfer in Wei
      const txHash = await account.transferERC20({
        contractAddress: "0xTokenContractAddress",
        to: "0xRecipientAddress",
        value: valueInWei,
      });
      console.log(`Transaction sent: ${txHash}`);
    } catch (err) {
      console.error(err);
    }
  };

  return <button onClick={handleTransferERC20}>Send ERC20 Token</button>;
};
```

#### Transferring NFTs

```jsx
import { useKeybanAccount } from "@keyban/sdk-react";

const TransferNft = () => {
  const [account] = useKeybanAccount();

  const handleTransferNft = async () => {
    try {
      const txHash = await account.transferNft({
        contractAddress: "0xNftContractAddress",
        tokenId: BigInt(1), // Token ID
        to: "0xRecipientAddress",
        standard: 'ERC721', // or 'ERC1155'
      });
      console.log(`Transaction sent: ${txHash}`);
    } catch (err) {
      console.error(err);
    }
  };

  return <button onClick={handleTransferNft}>Send NFT</button>;
};
```

## Error Handling

The SDK provides error classes to handle different errors that may occur when using the SDK.

- **`SdkError`**: Represents an SDK-specific error.
- **`SdkErrorTypes`**: Enumeration of possible error types.

### Example of Error Handling

```jsx
import { SdkError, SdkErrorTypes } from "@keyban/sdk-react";

try {
  // Operation that might fail
} catch (error) {
  if (error instanceof SdkError) {
    switch (error.type) {
      case SdkErrorTypes.AddressInvalid:
        console.error("Invalid address");
        break;
      // Handle other error types
      default:
        console.error("SDK Error:", error.message);
    }
  } else {
    console.error("Unexpected Error:", error);
  }
}
```

## Other Features

### Formatting a Balance

Use the `FormattedBalance` component to display a balance in a readable format.

```jsx
import { FormattedBalance } from "@keyban/sdk-react";

const balance = {
  raw: BigInt(1000000000000000000), // 1 ETH in Wei
  decimals: 18,
  symbol: "ETH",
  isNative: true,
};

const BalanceDisplay = () => {
  return (
    <div>
      Balance: <FormattedBalance balance={balance} />
    </div>
  );
};
```

## Notes

- **Ensure your components are wrapped by `KeybanProvider`** for the hooks to function correctly.
- **Handle errors** by checking the second element of the array returned by the hooks.
- **Stay Updated**: Keep an eye on future releases for new features and improvements.

## Additional Resources

- [Complete Keyban React SDK Documentation](https://docs.beta.keyban.io/api/sdk-react)

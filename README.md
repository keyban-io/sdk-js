# dap

Digital Asset Platform with Privacy Preserving Data Management

## Introduction to the System Architecture Diagram for Account and Transaction Management on Hedera and Polygon Networks

This diagram provides a comprehensive overview of the system architecture designed to manage accounts and transactions within the Hedera and Polygon blockchain environments. It highlights key components and interactions that support the end-to-end processes of account management, including the creation, monitoring, and handling of both native and non-native transactions.

The architecture is segmented into various subgraphs, each detailing a specific aspect of the system:

- **React**: Focuses on the frontend interactions within the system, showcasing components like React Wallet which interfaces with both Hedera and Polygon accounts.
- **Hedera and Polygon Subgraphs**: These sections illustrate the specific functionalities provided by the Hedera and Polygon networks, including account creation, balance management, and transaction history, along with detailed transaction processes like crypto and token transfers.
- **Auth**: This subgraph details the authentication services integrated into the system, such as OAuth2, Auth0, and Amazon Cognito, which ensure secure user access and identity management.
- **Key Storage**: Explores various key storage solutions that support secure key management across different platforms including web browsers and smartphones, highlighting both generic and specific storage options like Google Drive, Apple iCloud, and native smartphone storage.

```mermaid
graph LR
    %% Define styles
    classDef react fill:#61dafb,stroke:#000,stroke-width:2px, color:#000;
    classDef hedera fill:#ff9f00,stroke:#000,stroke-width:2px, color:#000;
    classDef polygon fill:#8247e5,stroke:#000,stroke-width:2px, color:#fff;
    classDef auth fill:#5a45ff,stroke:#000,stroke-width:2px, color:#fff;
    classDef keyStorage fill:#2db7f5,stroke:#000,stroke-width:2px, color:#000;
    classDef transfers fill:#f962b1,stroke:#000,stroke-width:2px, color:#000;
    classDef accounts fill:#77b255,stroke:#000,stroke-width:2px, color:#000;
    classDef selected fill:#e91e63,stroke:#000,stroke-width:2px, color:#000;

    MPCTSSSigner("MPC TSS Signer") 

    %% React Subgraph
    subgraph React
        ReactWallet("React Wallet")
        ReactHederaAccounts("React Hedera Accounts")
        ReactPolygonAccounts("React Polygon Accounts")
    end

    %% Hedera Subgraph
    subgraph Hedera
        ReactHederaAccountsCreate("Create an EOA Account")
        ReactHederaAccountsList("Account List")
        ReactHederaNetwork("Hedera Network selection")
        ReactHederaAccountNotifier("Incomes/Outcomes Notifier")
        ReactHederaAccount("Account")
        HederaGetAccount("Get Account")
        ReactHederaAccountsBalance("Balance")
        ReactHederaAccountsBalanceNative("Native")
        ReactHederaAccountsBalanceNonNative("Non Native")
        ReactHederaAccountsBalanceToken("Token")
        ReactHederaAccountsBalanceTokenDetail("Token details")
        ReactHederaAccountsTransactionHistory("Transaction history")
        ReactHederaProvider("Hedera Provider")
        subgraph HederaTransfer
            HederaTransferCrypto("Transfer Crypto (Native/Non-Native)")
            HederaTransferToken("Transfer Token")
            HederaTransferFeeEstimation("Transfer Fee Estimation")
        end
    end

    %% Polygon Subgraph
    subgraph Polygon
        ReactPolygonAccountsCreate("Create a Smart Account")
        ReactPolygonAccountsList("Account List")
        ReactPolygonNetwork("Polygon Network selection")
        ReactPolygonAccountNotifier("Incomes/Outcomes Notifier")
        ReactPolygonAccount("Account")
        ReactPolygonAccountsBalance("Balance")
        ReactPolygonAccountsBalanceNative("Native")
        ReactPolygonAccountsBalanceNonNative("Non Native")
        ReactPolygonAccountsBalanceToken("Token")
        ReactPolygonAccountsBalanceTokenDetail("Token details")
        ReactPolygonAccountsTransactionHistory("Transaction history")
        ReactPolygonProvider("Polygon Provider")
        subgraph PolygonTransfer
            PolygonTransferCrypto("Transfer Crypto (Native/Non-Native)")
            PolygonTransferToken("Transfer Token")
            PolygonTransferFeeEstimation("Transfer Fee Estimation")
        end
        PolygonGetAccount("Get Account")

        subgraph AA
            SmartAccount("Smart Account")
            SmartAccountSocialRecovery("Social Recovery")
            SmartAccountSessionKey("Session Key")
            SmartAccountSponsorPaidFees("Sponsor-Paid Fees")
            SmartAccountBatchTransactions("Batch Transactions")
            subgraph Bundler
                BundlerRelayer("Relayer")
                BundlerRPaymaster("Paymaster")
            end
        end 
    end

    %% Authentication Subgraph
    subgraph Auth
        SDKAuthProviders("React Auth Providers")
        SDKAuthProviders0Auth2("0Auth2")
        SDKAuthProvidersAuth0("Auth0")
        SDKAuthProvidersAmazonCognito("Amazon Cognito")
        SDKAuthProvidersAmazonOther("Other...")
    end

    %% Key Storage Subgraph
    subgraph KeyStorage
        KeyStorageSolutions("Key Storage solutions")
        KeyStorageSolutionsGeneric("Generics (Web browser & Smartphone)")
        KeyStorageSolutionsGenericGoogleDrive("Google Drive")
        KeyStorageSolutionsGenericAppleIcloud("Apple iCloud")
        KeyStorageSolutionsGenericMicrosoftOneDrive("Microsoft OneDrive")
        KeyStorageSolutionsGenericAmazonKMS("Amazon KMS<br>Find a European KSM")
        KeyStorageSolutionsBrowser("Browser")
        KeyStorageSolutionsBrowserUnsafe("Unsafe storage(dev)")
        KeyStorageSolutionsSmartPhone("Smartphone")
        KeyStorageSolutionsSmartPhoneUnsafe("Unsafe storage(dev)")
        KeyStorageSolutionsSmartPhoneNative("Native Storage")
        KeyStorageSolutionsGenericPinCode("Generic Storage (Pin Code)")
    end

    %% Connections for Hedera
    ReactHederaAccounts --> MPCTSSSigner
    ReactHederaAccounts --> HederaTransfer
    ReactHederaAccounts --> HederaGetAccount
    HederaTransfer --> HederaTransferCrypto
    HederaTransfer --> HederaTransferToken
    HederaTransfer --> HederaTransferFeeEstimation

    %% Connections for Polygon
    ReactPolygonAccounts --> MPCTSSSigner
    ReactPolygonAccounts --> PolygonTransfer
    ReactPolygonAccounts --> PolygonGetAccount
    PolygonTransfer --> PolygonTransferCrypto
    PolygonTransfer --> PolygonTransferToken
    PolygonTransfer --> PolygonTransferFeeEstimation

    %% Other connections
    ReactWallet --> ReactHederaAccounts
    ReactWallet --> ReactPolygonAccounts
    ReactWallet --> SDKAuthProviders
    ReactWallet --> KeyStorageSolutions

    ReactHederaAccounts --> ReactHederaAccountsCreate
    ReactHederaAccounts --> ReactHederaAccountsList
    ReactHederaAccounts --> ReactHederaNetwork
    ReactHederaAccounts --> ReactHederaAccountNotifier
    ReactHederaAccounts --> ReactHederaAccount

    ReactHederaAccount --> ReactHederaAccountsBalance
    ReactHederaAccountsBalance --> ReactHederaAccountsBalanceNative
    ReactHederaAccountsBalance --> ReactHederaAccountsBalanceNonNative
    ReactHederaAccountsBalance --> ReactHederaAccountsBalanceToken
    ReactHederaAccountsBalanceToken --> ReactHederaAccountsBalanceTokenDetail
    ReactHederaAccount --> ReactHederaAccountsTransactionHistory

    ReactHederaAccounts --> ReactHederaProvider

    ReactPolygonAccounts --> ReactPolygonAccountsCreate
    ReactPolygonAccounts --> ReactPolygonAccountsList
    ReactPolygonAccounts --> ReactPolygonNetwork
    ReactPolygonAccounts --> ReactPolygonAccountNotifier
    ReactPolygonAccounts --> ReactPolygonAccount

    ReactPolygonAccountsCreate --> SmartAccount
    SmartAccount --> SmartAccountSocialRecovery
    SmartAccount --> SmartAccountSessionKey
    SmartAccount --> SmartAccountSponsorPaidFees
    SmartAccount --> SmartAccountBatchTransactions

    SmartAccountSponsorPaidFees --> BundlerRelayer
    BundlerRelayer --> BundlerRPaymaster

    ReactPolygonAccount --> ReactPolygonAccountsBalance
    ReactPolygonAccountsBalance --> ReactPolygonAccountsBalanceNative
    ReactPolygonAccountsBalance --> ReactPolygonAccountsBalanceNonNative
    ReactPolygonAccountsBalance --> ReactPolygonAccountsBalanceToken
    ReactPolygonAccountsBalanceToken --> ReactPolygonAccountsBalanceTokenDetail
    ReactPolygonAccount --> ReactPolygonAccountsTransactionHistory

    ReactPolygonAccounts --> ReactPolygonProvider

    SDKAuthProviders --> SDKAuthProvidersAuth0
    SDKAuthProviders --> SDKAuthProviders0Auth2
    SDKAuthProviders --> SDKAuthProvidersAmazonCognito
    SDKAuthProviders --> SDKAuthProvidersAmazonOther

    KeyStorageSolutions --> KeyStorageSolutionsGeneric
    KeyStorageSolutionsGeneric --> KeyStorageSolutionsGenericGoogleDrive
    KeyStorageSolutionsGeneric --> KeyStorageSolutionsGenericAppleIcloud
    KeyStorageSolutionsGeneric --> KeyStorageSolutionsGenericMicrosoftOneDrive
    KeyStorageSolutionsGeneric --> KeyStorageSolutionsGenericAmazonKMS
    KeyStorageSolutionsGeneric --> KeyStorageSolutionsGenericPinCode
    KeyStorageSolutions --> KeyStorageSolutionsBrowser
    KeyStorageSolutionsBrowser --> KeyStorageSolutionsBrowserUnsafe
    KeyStorageSolutions --> KeyStorageSolutionsSmartPhone
    KeyStorageSolutionsSmartPhone --> KeyStorageSolutionsSmartPhoneUnsafe
    KeyStorageSolutionsSmartPhone --> KeyStorageSolutionsSmartPhoneNative

    %% Apply styles to classes
    class React,ReactWallet,ReactHederaAccounts,ReactPolygonAccounts react;
    class Hedera,ReactHederaAccountsCreate,ReactHederaAccountsList,ReactHederaNetwork,ReactHederaAccountNotifier,ReactHederaAccount,HederaGetAccount,ReactHederaAccountsBalance,ReactHederaAccountsBalanceNative,ReactHederaAccountsBalanceNonNative,ReactHederaAccountsBalanceToken,ReactHederaAccountsBalanceTokenDetail,ReactHederaAccountsTransactionHistory,ReactHederaProvider,HederaTransfer hedera;
    class Polygon,ReactPolygonAccountsCreate,ReactPolygonAccountsList,ReactPolygonNetwork,ReactPolygonAccountNotifier,ReactPolygonAccount,ReactPolygonAccountsBalance,ReactPolygonAccountsBalanceNative,ReactPolygonAccountsBalanceNonNative,ReactPolygonAccountsBalanceToken,ReactPolygonAccountsBalanceTokenDetail,ReactPolygonAccountsTransactionHistory,ReactPolygonProvider,PolygonTransfer,PolygonGetAccount,AA,SmartAccount,SmartAccountSocialRecovery,SmartAccountSessionKey,SmartAccountSponsorPaidFees,SmartAccountBatchTransactions,Bundler,BundlerRelayer,BundlerRPaymaster polygon;
    class Auth,SDKAuthProviders,SDKAuthProviders0Auth2,SDKAuthProvidersAuth0,SDKAuthProvidersAmazonCognito,SDKAuthProvidersAmazonOther auth;
    class KeyStorage,KeyStorageSolutions,KeyStorageSolutionsGeneric,KeyStorageSolutionsGenericGoogleDrive,KeyStorageSolutionsGenericAppleIcloud,KeyStorageSolutionsGenericMicrosoftOneDrive,KeyStorageSolutionsGenericAmazonKMS,KeyStorageSolutionsBrowser,KeyStorageSolutionsBrowserUnsafe,KeyStorageSolutionsSmartPhone,KeyStorageSolutionsSmartPhoneUnsafe,KeyStorageSolutionsSmartPhoneNative,KeyStorageSolutionsGenericPinCode keyStorage;

    class KeyStorageSolutionsGenericAmazonKMS,KeyStorageSolutionsSmartPhoneNative,SDKAuthProviders0Auth2,MPCTSSSigner selected;

```

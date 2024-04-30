Feature: Multi-Blockchain Wallet Management
    As a client using the React Wallet component,
    I want to manage all my accounts,
    To perform operations on different blockchains (Polygon & Hedera).

    Background:
        Given the React Wallet component is installed and initialized in a React or React Native environment
        And the React Wallet accounts related to Polygon & Hedera are set as the account managers of the React Wallet component
        And I am a user having multiple accounts on both Polygon and Hedera

    @happy_path @wallet
    Scenario: Viewing the comprehensive accounts list
        Given I am logged into the React Wallet
        When I request to view the list of all my accounts
        Then I should receive a list containing accounts from both the Polygon and Hedera blockchains
        And the list should display the following details for each account:
            | Detail                |
            | Account Type          |
            | Account Address       |
            | Associated Blockchain |
        And each account's blockchain should be correctly identified as either Polygon or Hedera

    @happy_path @wallet
    Scenario Outline: Viewing accounts filtered by account manager
        Given I have set <Blockchain> as the active account manager in the React Wallet
        When I request to view the list of accounts managed by <Blockchain>
        Then the list should only display accounts from the <Blockchain> blockchain
        And no accounts from other blockchains should be shown

        Examples:
            | Blockchain |
            | Polygon    |
            | Hedera     |

    @edge_case @wallet
    Scenario: Handling an empty accounts list when no account managers are configured
        Given I am logged into the React Wallet
        And no account managers are associated with my user profile
        When I request to view the list of all my accounts
        Then I should receive a message indicating there are no account managers configured
        And the message should advise checking the account configuration

Notes:
- The authentication required to acces to the wallet will be managed in another iteration
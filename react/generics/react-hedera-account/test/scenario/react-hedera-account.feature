Feature: Hedera Account Management
  As a user of the React Hedera Account component,
  I want to manage my accounts on Hedera
  So that I can perform various account-related operations

  Background:
    Given the React-EdDSA-Signer component is configured as the signer for the Hedera Account component

  @happy_path @account_creation @hedera @without_key
  Scenario Outline: Creating a new account without a specified EdDSA private key
    Given I don't have any EdDSA private key
    When I request a new Hedera account with the alias <AliasName>
    Then EdDSA key shares are generated
    And these key shares are associated with the alias <AliasName>
    And the new account is created using the public key associated with the alias <AliasName>
    And the Hedera blockchain returns a receipt containing the account's address
    And the account ID follows the format shardNum.realmNum.accountNum
    And the accountNum matches the public address

    Examples:
      | AliasName               |
      | My first Hedera account |

  @happy_path @account_creation @hedera @with_key
  Scenario Outline: Creating a new account with a specified EdDSA private key
    Given I have a valid EdDSA private key associated with the alias <AliasName>
    When I request a new Hedera account with the alias <AliasName>
    Then the EdDSA key for the alias <AliasName> is used
    And the new account is created using the public key associated with the alias <AliasName>
    And the Hedera blockchain returns a receipt containing the account's address
    And the account ID follows the format shardNum.realmNum.accountNum
    And the accountNum matches the public address

    Examples:
      | AliasName                |
      | My second Hedera account |

  @happy_path @get_account @hedera
  Scenario Outline: Accessing an existing Hedera account
    Given I have an existing Hedera account with the alias <AliasName>
    When I retrieve the Hedera account with the alias <AliasName>
    Then I can perform operations on the account

    Examples:
      | AliasName               |
      | My first Hedera account |

  @happy_path @account_alias_creation @hedera @with_key
  Scenario Outline: Creating an Account Alias with a specified EdDSA private key
    Given I have a valid EdDSA private key associated with the alias <AliasName>
    When I create a new Account Alias with the <AccountAliasKey>
    Then the EdDSA key for the alias <AliasName> is recovered
    And the Account Alias is created using the <AccountAliasKey>
    And the Account Alias identifier follows the format shardNum.realmNum.<AccountAliasKey>

    Examples:
      | AliasName               | AccountAliasKey  |
      | My third Hedera account | EdDSA Public key |

  @happy_path @account_alias_creation @hedera @without_key
  Scenario Outline: Creating a new Account Alias without a specified EdDSA private key
    Given I don't have any EdDSA private key
    When I create a new Account Alias with the <AccountAliasKey>
    Then EdDSA key shares are generated and associated with the alias <AliasName>
    And the Account Alias is created from the <AccountAliasKey>
    And the Account Alias identifier follows the format shardNum.realmNum.<AccountAliasKey>

    Examples:
      | AliasName         | AccountAliasKey  |
      | My Hedera account | EdDSA Public key |

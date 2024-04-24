Feature: Smart Contract Account (SCA) Creation
  As a client using the React Polygon Account component,
  I want to manage all my smart contract accounts on Polygon
  To perform various operations

  Background:
    Given the React-EcDSA-Signer component is set as the signer for the SCA component

  @happy_path @sca @creation @without_key @polygon
  Scenario Outline: Creating a new SCA without a specified EcDSA private key
    Given I am a user without an EcDSA private key
    When I request a new SCA with the alias <AliasName>
    Then EcDSA key shares for the SCA are generated
    And EcDSA key shares are associated with the alias <AliasName>
    And the SCA has a valid public address on the Polygon network
    And the owner of the SCA is set to the public address derived from the public key
    And the SCA is not yet deployed
    And the address of the SCA is whitelisted on the Paymaster
    And the alias of the SCA is set to <AliasName>

    Examples:
      | AliasName    |
      | My first SCA |

  @happy_path @sca_creation @with_key @polygon
  Scenario Outline: Creating a new SCA with a specified EcDSA private key
    Given I am a user with a valid private key associated with the alias <AliasName>
    When I request a new SCA with the alias <AliasName>
    Then the EcDSA key share from the user is recovered from the alias <AliasName>
    And the SCA has a valid public address on the Polygon network
    And the owner of the SCA is set to the public address derived from the public key
    And the SCA is not yet deployed
    And the address of the SCA is whitelisted on the Paymaster
    And the alias of the SCA is set to <AliasName>

    Examples:
      | AliasName     |
      | My Second SCA |

  @happy_path @get_sca @polygon
  Scenario Outline: Accessing an existing SCA
    Given I already have an SCA with the alias <AliasName>
    When I retrieve the SCA with the alias <AliasName>
    Then I am able to perform operations on the SCA with the alias <AliasName>

    Examples:
      | AliasName    |
      | My first SCA |

  @happy_path @sca @alias @polygon
  Scenario Outline: Changing the alias of an SCA
    Given I have an SCA with the alias <OriginalAliasName>
    When I change the alias of the SCA to <NewAliasName>
    Then the SCA should now be accessible with the new alias <NewAliasName>
    And the SCA should no longer be accessible with the old alias <OriginalAliasName>

    Examples:
      | OriginalAliasName | NewAliasName   |
      | My first SCA      | My Updated SCA |

Note:
- The bundler must know the factory allowing it to deploy the Smart Contract Account.
- By design, during operations leaving tokens or cryptocurrency from the SCA, if at the time of carrying out the operation, the SCA is not deployed, the bundler deploys the contract with execution transfer transaction.
- A Paymaster must be available as a prerequisite.

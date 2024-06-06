Feature: Single Key Generation in React Signer Library with EdDSA
  As a client using the React EdDSA Signer library,
  I want to generate and manage a single master key,
  To streamline the management and operation across platforms supporting  EdDSA signatures.

  Background:
    Given Homepage is opened

  @happy_path @eds_dsa @generic
  Scenario: Successful single master key generation for a user with EdDSA
    Given the client does not have an existing master key
    When the client initiates the key generation process
    Then the public keys from the client and the server are the same

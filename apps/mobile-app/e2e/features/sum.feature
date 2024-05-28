Feature: Single Key Generation in React Signer Library with EdDSA
  As a client using the React EdDSA Signer library,
  I want to generate and manage a single master key,
  To streamline the management and operation across platforms supporting  EdDSA signatures.

  Background:
    Given The mobile app is launched

  @happy_path @eds_dsa @generic
  Scenario: Successful WASM addition
#    Given the client does not have an existing master key
#    When the client initiates the key generation process
    Then Addition result is shown
#    And a server key share should be securely generated on the server side using EdDSA
#    And both key shares should conform to the EdDSA signature requirements

#  Notes:
#  - The server-side protection using Shamir's Secret Sharing will be implemented in a later iteration
#  - Authentication to control access to the service will be implemented in a later iteration

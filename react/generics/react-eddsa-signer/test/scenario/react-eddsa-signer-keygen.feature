Feature: Single Key Generation in React Signer Library with EdDSA
    As a client using the React Signer library,
    I want to generate and manage a single master key for all my blockchain accounts,
    To streamline the management and operation across Hedera and Polygon platforms with EdDSA signatures.

    Background:
        Given the React EdDSA Signer cmoponent is installed and initialized in a React or React Native environment
        And the library is designed to support EdDSA signatures for Hedera

    @happy_path @eds_dsa @generic
    Scenario: Successful single master key generation for a user with EdDSA
        Given the client does not have an existing master key
        When the client initiates the key generation process
        Then a client key share should be securely generated on the client side using EdDSA
        And a server key share should be securely generated on the server side using EdDSA
        And both key shares should conform to the EdDSA signature requirements

    @edge_case @eds_dsa @generic
    Scenario: Handling errors during key generation process with EdDSA
        Given the key generation process is initiated
        When an error occurs during the generation of the master key
        Then the error should be identified as either client-side or server-side
        And the error details should be logged systematically
        And an error is returned by the library indicating the failure
        And ensure the process can be retried or recovered gracefully

    @security @eds_dsa @key_storage @server_side
    Scenario: Secure server key share storage in HSMs with EdDSA
        Given a master key has been generated with EdDSA
        When the server key share is created
        Then it should be encrypted and stored securely in HSMs
        And the HSM storage locations should be across multiple servers in Europe
        And ensure that access to the key share is restricted to authorized personnel only


Notes:
- the server-side protection using Shamir's Secret Sharing will be implemented in a later iteration

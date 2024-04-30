Feature: Signing with the React Signer Library using EdDSA
    As a client using the React Signer library,
    I want to sign data using my master key for all my blockchain accounts,
    To streamline the management and operation across Hedera and Polygon platforms with EdDSA signatures.

    Background:
        Given the React EdDSA Signer cmoponent is installed and initialized in a React or React Native environment
        And the library is designed to support EdDSA signatures for Hedera

    @happy_path @data_signing @eds_dsa @generic
    Scenario: Successfully signing data with the master key using EdDSA
        Given the client has an existing master key using EdDSA
        When the client requests the library to sign data
        Then the library should return successfully signed data with EdDSA signatures

    @edge_case @data_signing @no_master_key @eds_dsa @generic
    Scenario: Attempt to sign data without a master key
        Given the client does not have a master key
        When the client attempts to sign data using the library
        Then the library should return an error indicating "No master key found"
        And the error should be logged with the severity "Critical"

    @error_handling @data_signing @signing_error @eds_dsa @generic
    Scenario: Handling errors during the data signing process with EdDSA
        Given the signing process is initiated with valid input data
        When an error occurs during the signing operation
        Then the error should be categorized as either client-side ou server-side
        And the error details should be systématiquement logged with timestamp and error type
        And an error response should be returned by the library
        And the library should provide suggestions to retry or resolve the issue

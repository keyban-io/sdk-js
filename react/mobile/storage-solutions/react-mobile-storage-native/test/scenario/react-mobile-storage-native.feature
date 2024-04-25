Feature: Native Mobile Storage for Key Share and Metadata
    This feature allows storage and retrieval of client key share and related metadata in native storage on Android and Apple smartphones.
    It supports operations to store, retrieve, and list data using unique aliases. It integrates with react-eddsa-signer and react-ecdsa-signer components for key management.

    Scenario: Store data using an alias
        Given I have a unique alias defined by the component user
        And I have client key share data with metadata
        When I store the data and metadata using the alias in native storage
        Then the data is successfully stored
        And the storage contains a JSON object with metadata and data

    Scenario: Retrieve data using an alias
        Given I have stored data with a unique alias in native storage
        When I retrieve the data using the alias
        Then I get a JSON object containing metadata and data
        And the metadata includes the version, signer type (either ecdsa or eddsa), and any other required information

    Scenario: List all aliases
        Given I have stored data in native storage with multiple aliases
        When I list all available aliases in native storage
        Then I get a list of all unique aliases used for storage

    Scenario: Integration with react-eddsa-signer component
        Given I have a key share from the react-eddsa-signer component
        When I store the key share in native storage using an alias
        Then the key share is successfully stored
        And it can be retrieved and used for signing with react-eddsa-signer

    Scenario: Integration with react-ecdsa-signer component
        Given I have a key share from the react-ecdsa-signer component
        When I store the key share in native storage using an alias
        Then the key share is successfully stored
        And it can be retrieved and used for signing with react-ecdsa-signer

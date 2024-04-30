# React EdDSA Signer

## Description

The *React EdDSA Signer* is a cryptographic library designed to facilitate key generation and transaction signing using a Multi-Party Computation Threshold Signature Scheme (MPC TSS) in a 2/2 configuration. It integrates with the Keyban network, providing EdDSA signatures for blockchain platforms, with a specific focus on Hedera.

## Features

- Single key usage per user for all associated smart accounts, simplifying management and operation.
- EdDSA signing mechanism tailored for the Hedera blockchain platform.
- Support for Externally Owned Accounts (EOA) on Hedera, allowing multiple accounts to be managed by a single key.
- Security ensured through Shamir's Secret Sharing and Hardware Security Module (HSM) storage.

## Installation

To integrate the *React EdDSA Signer* library into your project, execute the following steps:

1. **Prerequisites:**
   - Verify compatibility with the latest versions of React or React Native in your development environment.

2. **Installing via npm:**

   ```bash
   npm install @keyban/react-eddsa-signer
   ```

## Library Usage

### Key Generation

- The library is designed to generate a single master key per user, eliminating the need for key derivation in the MVP phase. This master key can manage all the smart accounts associated with the user.

## 2/2 MPC TSS Configuration

### Operational Dynamics

- Key generation and signing are initiated by the client, with the server playing a supporting role and not able to initiate or sign independently.

### Key Sharing

- Utilizes the [ZF Frost library](https://github.com/ZcashFoundation/frost) for managing shares, enabling remote operations and streamlined error handling.

## Blockchain Platform Specifics

### Hedera

- Supports Externally Owned Accounts (EOA), with the capability to manage multiple accounts under a single key due to the on-chain nature of accounts on Hedera.
- Smart Accounts are not applicable on Hedera as there is no available bundler to abstract transaction fees.

## Obsolete: Polygon Support

- The library was intended to support Smart Account signatures on Polygon, but this functionality will not be implemented due to high transaction costs.
- On-chain signature verification was a key feature exclusive to this platform, but the high costs rendered it impractical.

## Security and Privacy

- The library employs Shamir's Secret Sharing for key management, with server-side shares stored securely in HSMs across multiple servers in Europe, enhancing redundancy and data protection.

## Error Handling and Edge Cases

- A systematic approach will be adopted for error normalization and logging, ensuring robust and reliable operations.

## Compatibility and Support

- Ensured compatibility with the latest versions of React and React Native, facilitating seamless integration and usage.

## License

The *React EdDSA Signer* is provided under a commercial license. For detailed licensing information, contact the project's legal department.

## Additional Notes

- The focus on a single key per user model simplifies the architecture and enhances the system's efficiency, especially in the context of the MVP for the *React EdDSA Signer* project.

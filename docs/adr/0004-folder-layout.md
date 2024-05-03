# 4. Folder Layout

Date: 2024-05-03

## Status

Accepted

## Context

We don't want the repository to become a big ball of mud.

## Decision

This is the folder hierarchy we will try to follow:

- sdk
    - sdk-react
    - sdk-react-native
    - sdk-etc
- backend: nestjs
- signers
    - signer-ecdsa-server: rust
    - signer-ecdsa-client: rust
    - signer-eddsa: rust (?)
- tests
- docs: docusaurus
- infrastructure
    - terraform
    - nats (?)
    - deployment: helm
- contracts: hardhat (ignition) / foundry (rust) / hedera ?

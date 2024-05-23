# 5. RFC9457 Logging Libraries

Date: 2024-05-21

## Status

Proposed

## Context

We need to implement RFC9457 compliant logging mechanisms for both Rust and NestJS services in our project. The goal is to ensure consistent and comprehensive logging across different parts of our system, facilitating better monitoring, debugging, and compliance with regulatory requirements.

## Decision

We propose using the [nest-problem-details](https://github.com/sjfrhafe/nest-problem-details) library for the NestJS services, as it offers a straightforward integration and complies with RFC9457 standards. For the Rust services, we propose using the [problemdetails](https://docs.rs/problemdetails/latest/problemdetails/) library, which aligns with our requirements for RFC9457 compliance and provides a robust solution for logging.

## Data to log

Given our use of OAuth for authentication and our involvement with cryptocurrency transactions on Hedera and Polygon, we should log the following data:

* User information: User ID, username, email (as per OAuth login data).
* Transaction details (if applicable): Transaction ID, type of transaction (e.g., transfer, smart contract interaction), status, and relevant timestamps.
* Error details: Error message, stack trace (if applicable).
* Contextual information: Service name, environment (development, staging, production), and timestamp of the log entry.

## Consequences

### Benefits:

* Improved logging consistency and compliance with RFC9457 across our services.
* Enhanced monitoring and debugging capabilities.
* Clear and structured problem details in logs for both Rust and NestJS services.

### Drawbacks:

* Potential integration challenges during the initial implementation phase.
* Learning curve associated with adopting new libraries for both NestJS and Rust.
* Ensuring compliance with privacy regulations when logging user data.

### Risks:

* The selected Rust library may have unforeseen limitations or incompatibilities.
* Additional training or documentation might be required to ensure all team members are comfortable with the new logging libraries.
* Handling sensitive user and transaction data requires strict adherence to security and privacy best practices.

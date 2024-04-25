# Keyban Technology Stack

## Infrastructure Tools

### Container Management and Orchestration

- **Kubernetes (K8S)**: A robust container orchestration system that automates the deployment, scaling, and operations of application containers. Known for managing complex applications with a rich ecosystem of tools and integrations.
  - **Benefits**:
    - Extensive community support and a large ecosystem.
    - High scalability and robust feature set for managing microservices.
  - **Use Case**: Ideal for enterprises requiring reliable scaling and complex application management across multiple environments.

### Other Infrastructure Tools

- **Helm**: Package manager for Kubernetes, simplifying the management of Kubernetes applications.
- **Google Kubernetes Engine (GKE) / Google Cloud Platform (GCP)**: Managed environment for Kubernetes, providing automated scaling, updates, and maintenance.
- **Autopilot**: Automated Kubernetes node management service, optimizing resource utilization and reducing operational cost.

### Security and CI/CD

- **Auth0**: Comprehensive identity management solutions, simplifying authentication and authorization for applications.
- **GitHub Actions**: Automation of software workflows, integrating with GitHub to run tests, deploy software, and more.
- **Terraform**: Infrastructure as Code tool for managing cloud infrastructure.

### Monitoring and Logging

- **Prometheus**: Open-source system monitoring and alerting toolkit focused on reliability and simplicity.
- **Loki**: Log collector, integrated with Grafana.
- **Grafana**: Multi-platform open source analytics and interactive visualization web application.
- **Velero**: Disaster recovery capabilities, facilitating data backup, recovery, and migration of Kubernetes resources.

### Local Development and Testing

- **Tilt**: Optimizes the development workflow for Kubernetes, providing faster feedback loops during local development.
- **Earthly**: Build tool that enhances build reproducibility across different environments.
- **Kind**: A tool to create local Kubernetes clusters within Docker containers, ideal for development and testing in a controlled environment.

## Secret Management

- **Bitwarden**: Open-source password manager used to secure sensitive information.

## Continuous Integration and Code Review

- **Sonar**: Platform for code quality analysis, identifying bugs and vulnerabilities.
- **Code Linter**: Tools for static code analysis (JavaScript, Rust, etc.), maintaining code quality.
- **GitLeaks**: Tool for detecting sensitive information leaks in git repositories.

## Blockchain Providers

- **EVM/Polygon (Alchemy)**: Infrastructure and scaling solutions for Ethereum and Polygon networks.
- **Hedera**: To be determined (evaluation ongoing).

### Blockchain Development Tools

- **Web3 Library**: [Viem](https://viem.sh/) - Library for developing decentralized applications, especially within the Ethereum ecosystem.
- **Smart Contract Development Environment**: Hardhat selected as the tool for compiling, deploying, testing, and debugging Ethereum software.

## Testing

- **Constraints**: Emphasizes quick feedback and strict environment isolation.
- **End-to-End (e2e) Tests**: Uses Gherkin and Playwright for scenario-based testing. React Native compatibility to be confirmed.
- **Unit Tests (Test U)**: Focuses on individual components to ensure they function correctly in isolation.

## Backend

- **Authentication**: Implements OAuth2/OIDC standards for secure identity management.
- **Server**: Node.js, with a choice between NestJS and Fastify frameworks for performance and scalability.
- **Message Brokers**: Nats and Redis for efficient message queuing, delivery, and processing.
- **Telemetry**: OpenTelemetry for collecting and exporting telemetry data (metrics, logs, and traces).
- **Databases**:
  - **CockroachDB**: For development environments, chosen for its resilience and scalability.
  - **AlloyDB**: For production environments, selected for advanced features and performance.
- **APIs**: Incorporates various APIs, including Open API, REST APIs, and Stripe API for payment processing.
- **Mail Services**: Evaluating 02Switch as a potential provider for comprehensive email solutions.

## Documentation Center

- **Options to Evaluate**: Considering Docusaurus for its simplicity and Gitbook for its rich features and integrations.

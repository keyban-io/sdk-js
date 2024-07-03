# SDK Base

## Overview

SDK Base from Keyban MPC wallet is a foundational package designed to simplify the development of web applications with Node.js and React. This package provides essential configurations and utilities to streamline your project setup and development process.

## Features

- **TypeScript Support**: Fully typed with TypeScript for type safety and improved development experience.
- **Testing**: Integrated with Vitest for robust testing capabilities.
- **Bundling**: Uses tsup for efficient bundling.
- **Documentation**: Generates API documentation using TypeDoc.

## Installation

To install the package, run the following command:

```bash
npm install @keyban/sdk-base
```

## Usage

Here's a basic example of how to use SDK Base in your project:

```typescript
import { someFunction } from '@keyban/sdk-base';

someFunction();
```

## Configuration

### Environment Variables

Create a `.env` file in the root of your project and configure the necessary environment variables as shown in the `.env.example` file.

### Scripts

- `build`: Bundles the application using tsup.
- `test`: Runs the tests using Vitest.
- `doc`: Generates the documentation using TypeDoc.

```json
"scripts": {
  "build": "tsup",
  "test": "vitest",
  "doc": "typedoc"
}
```

## Contributing

We welcome contributions! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to contribute to this project.

## License

This project is licensed under the terms of the [MIT license](LICENSE).

## Changelog

All notable changes to this project will be documented in the [CHANGELOG.md](CHANGELOG.md).

## Support

If you encounter any issues or have any questions, please open an issue in the GitHub repository.

---

### Acknowledgements

We appreciate all the developers and contributors who have worked on this project.

---

Happy coding!

## How to setup the e2e tests with Detox

### iOS (easier one)

*Warning: These are main steps for Detox, there might be extra step depending on the CI*

- Prepare packages for tests
  - `yarn install`
- Install Detox CLI
  - `npm install -g detox-cli`
- Install React Native CLI
  - `npm install -g react-native-cli`
- Install Detox utils
  - `brew tap wix/brew`
  - `brew install applesimutils`
- Build Detox
  - `detox build --configuration ios.sim.release`
- Run E2E tests
  - `detox test --configuration ios.sim.release`


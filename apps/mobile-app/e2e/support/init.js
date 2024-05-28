const detox = require("detox/internals");
const { device } = require("detox");
const { Before, BeforeAll, AfterAll, After } = require("@cucumber/cucumber");

// const config = require('../../../package.json').detox;
// const adapter = require("./adapter");

BeforeAll({ timeout: 120 * 1000 }, async () => {
  await detox.init();
  await device.launchApp();
  await device.reloadReactNative();
});

// Before(async (context) => {
//   await adapter.beforeEach(context);
// });
//
// After(async (context) => {
//   await adapter.afterEach(context);
// });
//
// AfterAll(async () => {
//   await detox.cleanup();
// });

// BeforeAll({ timeout: 120 * 1000 }, async () => {
//   await detox.init(detoxConfig);
//
//   await device.launchApp();
// });
//
Before(async (message) => {
  const { pickle } = message;
  await detox.onTestStart({
    title: pickle.uri,
    fullName: pickle.name,
    status: "running",
  });
});

After(async (message) => {
  const { pickle, result } = message;
  await detox.onTestDone({
    title: pickle.uri,
    fullName: pickle.name,
    status: result ? "passed" : "failed",
  });
});

AfterAll(async () => {
  await detox.cleanup();
});

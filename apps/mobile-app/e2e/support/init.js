const detox = require("detox/internals");
const { device } = require("detox");
const { Before, BeforeAll, AfterAll, After } = require("@cucumber/cucumber");

BeforeAll({ timeout: 120 * 1000 }, async () => {
  await detox.init();
  await device.launchApp({ delete: true });
  await device.reloadReactNative();
});

Before(async (message) => {
  const { pickle } = message;
  console.log(`Running ${pickle.name} secnario...`);
  await detox.onTestStart({
    title: pickle.uri,
    fullName: pickle.name,
    status: "running",
  });
});

After(async (message) => {
  const { pickle, result } = message;
  console.log(`Scenario ${pickle.name} ${result ? "succeeded" : "failed"}`);

  await detox.onTestDone({
    title: pickle.uri,
    fullName: pickle.name,
    status: result ? "passed" : "failed",
  });
});

AfterAll(async () => {
  await detox.cleanup();
});

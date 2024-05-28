const { Given } = require("@cucumber/cucumber");

Given("The mobile app is launched", async () => {
  await device.launchApp();
});

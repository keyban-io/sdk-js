const { Given } = require("@cucumber/cucumber");

Given("Mobile ios app is launched", async () => {
  await device.launchApp();
});

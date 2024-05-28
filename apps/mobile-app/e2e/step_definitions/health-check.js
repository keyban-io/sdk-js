const { Given, Then } = require("@cucumber/cucumber");

Given("the status box is visible", async () => {
  await expect(element(by.id("client-health"))).toBeVisible();
});

Then("status box content is {string}", async (string) => {
  await waitFor(element(by.id("client-health")))
    .toHaveText(string)
    .withTimeout(2000);
});

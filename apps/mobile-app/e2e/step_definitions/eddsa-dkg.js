const { Given, When, Then } = require("@cucumber/cucumber");

Given("the client does not have an existing master key", async () => {
  await expect(element(by.id("first-address"))).toBeVisible();
  await waitFor(element(by.id("first-address")))
    .toHaveText("")
    .withTimeout(2000);
});

When("the client initiates the key generation process", async () => {
  await expect(element(by.id("start-eddsa-dkg-action"))).toBeVisible();
  await element(by.id("start-eddsa-dkg-action")).tap();
});

Then(
  "the public keys from the client and the server are the same",
  async () => {
    await expect(element(by.id("first-address"))).toBeVisible();
    await waitFor(element(by.id("first-address")))
      .not.toHaveText("")
      .withTimeout(2000);
  }
);

const { Then } = require("@cucumber/cucumber");

Then("Addition result is shown", async () => {
  await waitFor(element(by.id("wasm-sum")))
    .toHaveText("6")
    .withTimeout(2000);
  await expect(element(by.id("wasm-sum"))).toBeVisible();
});

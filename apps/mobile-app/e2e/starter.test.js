describe("Eddsa signer", () => {
  beforeAll(async () => {
    await device.launchApp();
    await device.reloadReactNative();
  });

  // beforeEach(async () => {
  // await device.reloadReactNative();
  // });

  it("should render sum text", async () => {
    await expect(element(by.id("wasm-sum"))).toBeVisible();
  });

  it("should render correct sum", async () => {
    await waitFor(element(by.id("wasm-sum")))
      .toHaveText("6")
      .withTimeout(2000);
  });

  it("should show client health - operational", async () => {
    await waitFor(element(by.id("client-health")))
      .toHaveText("operational")
      .withTimeout(2000);
  });
});

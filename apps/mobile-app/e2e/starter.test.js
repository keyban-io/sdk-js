describe("Add function", () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it("should render correct sum", async () => {
    await waitFor(element(by.id("wasm-sum")))
      .toHaveText("6")
      .withTimeout(2000);
  });

  it("should render client health", async () => {
    await waitFor(element(by.id("client-health")))
      .toHaveText("operational")
      .withTimeout(2000);
  });
});

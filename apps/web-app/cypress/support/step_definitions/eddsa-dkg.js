import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { byTestId } from "./common.js";

Given("the client does not have an existing master key", () => {
  cy.get(byTestId("client-pub-key")).should("not.have.text");
});

When("the client initiates the key generation process", () => {
  cy.get(byTestId("start-eddsa-dkg-action")).click();
});

Then("the public keys from the client and the server are the same", () => {
  cy.get(byTestId("client-pub-key")).should("have.text");
  cy.get(byTestId("client-pub-key")).invoke("text").as("client-key");
  cy.get(byTestId("server-pub-key")).invoke("text").as("server-key");
  cy.get("@client-key").then((clientKey) => {
    cy.get("@server-key").then((serverKey) => {
      expect(clientKey.trim()).to.equal(serverKey.trim());
    });
  });
});

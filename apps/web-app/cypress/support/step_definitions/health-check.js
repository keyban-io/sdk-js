import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";
import { byTestId } from "./common.js";

Given("the status box is visible", () => {
  cy.get(byTestId("client-health")).should("be.visible");
});

Then("status box content is {string}", (string) => {
  cy.get(byTestId("client-health")).should("have.text", string);
});

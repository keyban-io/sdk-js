import { Given } from "@badeball/cypress-cucumber-preprocessor";

export const byTestId = (id) => `[data-testid="${id}"]`;

Given("Homepage is opened", () => {
  cy.visit("localhost:3005/");
});

/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe("initial setup", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("show correct sum", () => {
    cy.get("[data-testid=wasm-sum]", { timeout: 2000 }).should(
      "have.text",
      "6"
    );
  });
});

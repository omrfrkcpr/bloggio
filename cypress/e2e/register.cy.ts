/// <reference types="cypress" />

describe("register", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.viewport(1600, 1600);
  });

  it("should open the register form when the register button is clicked", () => {
    cy.get('[data-test="user-menu-icon"]').click();
    cy.get('[data-test="user-menu"]').should("be.visible");
    cy.get("[data-test=login-menu-item-register]").click();
    cy.get("[data-test=register-form]").should("be.visible");
  });

  it("should register a new user", () => {
    cy.register();
  });
});

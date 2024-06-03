/// <reference types="cypress" />

describe("register", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("should register a new user", () => {
    cy.viewport(500, 800);
    cy.get('[data-test="userMenuIcon"]').click();
    cy.get('[data-test="userMenu"]').should("be.visible");
    cy.get('[data-test="loginMenuItem-register"]').click();
    cy.get('[data-test="register-form"]').should("be.visible");
    cy.get("[data-test=register-firstName]").type("John");
    cy.get("[data-test=register-lastName]").type("Doe");
    cy.get("[data-test=register-username]").type("johndoe");
    cy.get("[data-test=register-email]").type("john.doe@example.com");
    cy.get("[data-test=register-password]").type("Password123!");
    cy.get("[data-test=register-confirmPassword]").type("Password123!");
    cy.get("[data-test=register-submit]").click();

    cy.url().should("include", "/");
    cy.get("[data-test=register-form]").should("not.exist");
    cy.get('[data-test="userMenuIcon"]').click();
    cy.get('[data-test="userMenu"]').should("be.visible");
    cy.get('[data-test="userMenuItem-logout"]').should("contain", "Logout");
  });
});

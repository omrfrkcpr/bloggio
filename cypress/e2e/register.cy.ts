/// <reference types="cypress" />

describe("register", () => {
  beforeEach(() => {
    cy.visit("/");
    // Adding a wait to ensure the page is fully loaded
    cy.wait(3000);
  });

  it("should register a new user", () => {
    // Increasing timeout and adding logging
    cy.get('[data-test="userMenuIcon"]').should("exist").debug();
    cy.get('[data-test="userMenuIcon"]', { timeout: 10000 }).then(($icon) => {
      if ($icon.length) {
        cy.log("Icon found");
        $icon.click();
      } else {
        cy.log("Icon not found");
      }
    });

    cy.get('[data-test="userMenu"]').should("be.visible");
    cy.get('[data-test="userMenuItem-register"]').click();
    cy.get('[data-test="register-form"]').should("be.visible");
    cy.get("[data-test=register-form]").should("be.visible");
    cy.get("[data-test=register-firstName]").type("John");
    cy.get("[data-test=register-lastName]").type("Doe");
    cy.get("[data-test=register-username]").type("johndoe");
    cy.get("[data-test=register-email]").type("john.doe@example.com");
    cy.get("[data-test=register-password]").type("Password123!");
    cy.get("[data-test=register-confirmPassword]").type("Password123!");
    cy.get("[data-test=register-submit]").click();

    cy.url().should("include", "/");
    cy.get("[data-test=register-form]").should("not.exist");
    cy.get('[data-test="toast-message"]').should(
      "contain",
      "You're successfully registered!"
    );
  });
});

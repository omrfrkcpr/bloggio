/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
Cypress.Commands.add("login", () => {
  cy.visit("/");
  cy.get('[data-test="user-menu-icon"]').click();
  cy.get('[data-test="user-menu"]').should("be.visible");
  cy.get("[data-test=login-menu-item-login]").click();
  cy.get("[data-test=login-form]").should("be.visible");
  cy.get("[data-test=login-email]").type("john.doe@example.com");
  cy.get("[data-test=login-password]").type("Password123!");
  cy.get("[data-test=login-submit]").click();
  cy.get("[data-test=login-form]").should("not.exist");
  cy.get('[data-test="toast-message"]').should(
    "contain",
    "You're successfully logged in!"
  );
});

Cypress.Commands.add("register", () => {
  cy.visit("/");
  cy.get('[data-test="user-menu-icon"]').click();
  cy.get('[data-test="user-menu"]').should("be.visible");
  cy.get("[data-test=login-menu-item-register]").click();
  cy.get("[data-test=register-form]").should("be.visible");
  cy.get("[data-test=register-firstName]").type("John");
  cy.get("[data-test=register-lastName]").type("Doe");
  cy.get("[data-test=register-username]").type("johndoe");
  cy.get("[data-test=register-email]").type("john.doe@example.com");
  cy.get("[data-test=register-password]").type("Password123!");
  cy.get("[data-test=register-confirmPassword]").type("Password123!");
  cy.get("[data-test=register-submit]").click();
  cy.get("[data-test=register-form]").should("not.exist");
  cy.get('[data-test="toast-message"]').should(
    "contain",
    "You're successfully registered!"
  );
});

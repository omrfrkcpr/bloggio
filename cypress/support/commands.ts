/// <reference types="cypress" />

import { faker } from "@faker-js/faker";

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
  cy.get('[data-test="userMenuIcon"]').click({ force: true });
  cy.get('[data-test="userMenu"]').should("be.visible");
  cy.get('[data-test="loginMenuItem-login"]').click({ force: true });
  cy.get('[data-test="login-form"]').should("be.visible");
  cy.get("[data-test=login-email]").type("omrfrkcpr@gmail.com");
  cy.get("[data-test=login-password]").type("User@123");
  cy.get("[data-test=login-submit]").click({ force: true });
  cy.url().should("include", "/");
  cy.get("[data-test=login-form]").should("not.exist");
  cy.get('[data-test="userMenuIcon"]').click({ force: true });
  cy.get('[data-test="userMenu"]').should("be.visible");
  cy.get('[data-test="userMenuItem-logout"]').should("be.visible");
  cy.wait(3000);
  cy.get('[data-test="userMenuIcon"]').click({ force: true });
  cy.wait(3000);
});

Cypress.Commands.add("logout", () => {
  cy.visit("/");
  cy.login();
  cy.get('[data-test="userMenuItem-logout"]').click({ force: true });
  cy.get('[data-test="bloggioTitle"]').click({ force: true });
  cy.get('[data-test="startWriting"]').should("be.visible");
});

Cypress.Commands.add("register", () => {
  cy.visit("/");
  cy.get('[data-test="userMenuIcon"]').click();
  cy.get('[data-test="userMenu"]').should("be.visible");
  cy.get('[data-test="loginMenuItem-register"]').click();
  cy.get('[data-test="register-form"]').should("be.visible");

  // Generate random user
  const firstName = faker.name.firstName().slice(0, 50);
  const lastName = faker.name.lastName().slice(0, 50);
  const username = faker.internet.userName().slice(0, 15);
  const email = faker.internet.email();
  const password = "Password123!";
  const confirmPassword = password;

  cy.get("[data-test=register-firstName]").type(firstName);
  cy.get("[data-test=register-lastName]").type(lastName);
  cy.get("[data-test=register-username]").type(username);
  cy.get("[data-test=register-email]").type(email);
  cy.get("[data-test=register-password]").type(password);
  cy.get("[data-test=register-confirmPassword]").type(confirmPassword);
  cy.get("[data-test=register-submit]").click();

  cy.url().should("include", "/");
  cy.get("[data-test=register-form]").should("not.exist");
  cy.get('[data-test="userMenuIcon"]').click();
  cy.get('[data-test="userMenu"]').should("be.visible");
  cy.get('[data-test="userMenuItem-logout"]').should("contain", "Logout");
  cy.get('[data-test="bloggioTitle"]').click({ force: true });
});

/// <reference types="cypress" />

import { faker } from "@faker-js/faker";

describe("register", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should register a new user", () => {
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
  });
});

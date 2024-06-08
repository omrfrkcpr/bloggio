/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="cypress" />

import { faker } from "@faker-js/faker";

describe("bloggio", () => {
  // Generate random user
  const firstName = faker.name.firstName().slice(0, 50);
  const lastName = faker.name.lastName().slice(0, 50);
  const username = faker.internet.userName().slice(0, 15);
  const email = faker.internet.email();
  const password = "Password123!";
  const confirmPassword = password;

  const registerUser = (
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    cy.visit("/");
    cy.get('[data-test="userMenuIcon"]').click();
    cy.get('[data-test="userMenu"]').should("be.visible");
    cy.get('[data-test="loginMenuItem-register"]').click();
    cy.get('[data-test="register-form"]').should("be.visible");

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
    cy.get('[data-test="userMenuItem-logout"]').click({ force: true });
    cy.get('[data-test="startWriting"]').should("be.visible");
  };

  const loginUser = (email: string, password: string) => {
    cy.visit("/");
    cy.get('[data-test="userMenuIcon"]').click({ force: true });
    cy.get('[data-test="userMenu"]').should("be.visible");
    cy.get('[data-test="loginMenuItem-login"]').click({ force: true });
    cy.get('[data-test="login-form"]').should("be.visible");
    cy.get("[data-test=login-email]").type(email);
    cy.get("[data-test=login-password]").type(password);
    cy.get("[data-test=login-submit]").click({ force: true });
    cy.url().should("include", "/");
    cy.get("[data-test=login-form]").should("not.exist");
  };

  before(() => {
    registerUser(
      firstName,
      lastName,
      username,
      email,
      password,
      confirmPassword
    );
  });

  beforeEach(() => {
    loginUser(email, password);
  });

  it("should delete current user", () => {
    cy.visit("/");
    cy.get('[data-test="userMenuIcon"]').click({ force: true });
    cy.get('[data-test="userMenu"]').should("be.visible");
    cy.get('[data-test="userMenuItem-profile"]').click({ force: true });
    cy.url().should("include", "/profile");
    cy.get("[data-test=edit-account]").click();
    cy.get('[data-test="edit-account-modal"]').should("be.visible");
    cy.get('[data-test="delete-account"]').click({ force: true });

    cy.on("window:confirm", (str) => {
      expect(str).to.equal("Are you sure you want to delete this Account?");
      return true;
    });

    cy.get('[data-test="userMenuIcon"]').click({ force: true });
    cy.get('[data-test="loginMenuItem-login"]').should("be.visible");
  });
});

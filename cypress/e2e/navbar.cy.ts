/// <reference types="cypress" />

describe("navbar", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display the logo and title", () => {
    cy.get('[data-test="logo"]').should("be.visible");
    cy.get('[data-test="bloggioTitle"]').should("contain", "Bloggio");
  });

  // it("should open the mobile menu and display menu items", () => {
  //   cy.viewport("iphone-6");
  //   cy.get('[data-test="menuIcon"]').click();
  //   cy.get('[data-test="mobileMenu"]').should("be.visible");
  //   cy.get('[data-test="mobileMenuItem-home"]').should("contain", "Home");
  //   cy.get('[data-test="mobileMenuItem-contact"]').should("contain", "Contact");
  //   cy.get('[data-test="mobileMenuItem-about"]').should("contain", "About");
  // });

  // it("should display desktop menu items", () => {
  //   cy.viewport("macbook-15");
  //   cy.get('[data-test="desktopMenuItem-home"]').should("contain", "Home");
  //   cy.get('[data-test="desktopMenuItem-contact"]').should(
  //     "contain",
  //     "Contact"
  //   );
  //   cy.get('[data-test="desktopMenuItem-about"]').should("contain", "About");
  // });

  it("should open user menu and display user settings", () => {
    cy.get('[data-test="userMenuIcon"]').click();
    cy.get('[data-test="userMenu"]').should("be.visible");
    cy.get('[data-test="userMenuItem-login"]').click();
    cy.get('[data-test="login-form"]').should("be.visible");
    cy.login();

    cy.get('[data-test="userMenuIcon"]').click();
    cy.get('[data-test="userMenu"]').should("be.visible");
    cy.get('[data-test="userInfo"]').should("contain", "John Doe");
    cy.get('[data-test="userInfo"]').should("contain", "j***@example.com");
    cy.get('[data-test="userMenuItem-profile"]').should("contain", "Profile");
    cy.get('[data-test="userMenuItem-stats"]').should("contain", "Stats");
    cy.get('[data-test="userMenuItem-logout"]').should("contain", "Logout");
  });

  it("should log out the user", () => {
    cy.login(); // Logging in an existing user

    cy.get('[data-test="userMenuIcon"]').click();
    cy.get('[data-test="userMenuItem-logout"]').click();
    cy.get('[data-test="userMenu"]').should("not.exist");
  });

  it("should open login modal", () => {
    cy.get('[data-test="userMenu-icon"]').click();
    cy.get('[data-test="loginMenuItem-login"]').click();
    cy.get('[data-test="login-form"]').should("be.visible");
  });
});

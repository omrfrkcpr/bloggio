/// <reference types="cypress" />

describe("navbar", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display the mobile logo and title", () => {
    cy.viewport(500, 800);
    cy.get('[data-test="logoMobile"]').should("be.visible");
    cy.get('[data-test="bloggioTitleMobile"]').should("contain", "Bloggio");
  });

  it("should display the desktop logo and title", () => {
    cy.viewport("macbook-16");
    cy.get('[data-test="logo"]').should("be.visible");
    cy.get('[data-test="bloggioTitle"]').should("contain", "Bloggio");
  });

  it("should open the mobile menu and display menu items", () => {
    cy.viewport(500, 800);
    cy.get('[data-test="menuIcon"]').click();
    cy.get('[data-test="mobileMenu"]').should("be.visible");
    cy.get('[data-test="mobileMenuItem-home"]').should("contain", "Home");
    cy.get('[data-test="mobileMenuItem-contact"]').should("contain", "Contact");
    cy.get('[data-test="mobileMenuItem-about"]').should("contain", "About");
  });

  it("should display desktop menu items", () => {
    cy.viewport("macbook-15");
    cy.get('[data-test="desktopMenuItem-home"]').should("contain", "Home");
    cy.get('[data-test="desktopMenuItem-contact"]').should(
      "contain",
      "Contact"
    );
    cy.get('[data-test="desktopMenuItem-about"]').should("contain", "About");
  });
});

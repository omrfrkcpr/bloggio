describe("login", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.wait(300);
  });

  it("should open login form", () => {
    cy.get('[data-test="user-menu-icon"]').click();
    cy.get('[data-test="user-menu"]').should("be.visible");
    cy.get("[data-test=login-menu-item-login]").click();
    cy.get("[data-test=login-form]").should("be.visible");
  });

  it("should login an existing user", () => {
    cy.get("[data-test=login-email]").type("john.doe@example.com");
    cy.get("[data-test=login-password]").type("Password123!");
    cy.get("[data-test=login-submit]").click();

    cy.url().should("include", "/");
    cy.get("[data-test=login-form]").should("not.exist");
    cy.get('[data-test="toast-message"]').should(
      "contain",
      "You're successfully logged in!"
    );
  });
});

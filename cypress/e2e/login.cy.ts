describe("login", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("should login an existing user", () => {
    cy.get('[data-test="userMenuIcon"]').click();
    cy.get('[data-test="userMenu"]').should("be.visible");
    cy.get('[data-test="userMenuItem-login"]').click();
    cy.get('[data-test="login-form"]').should("be.visible");
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

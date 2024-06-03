describe("login", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("should login an existing user", () => {
    cy.viewport(500, 800);
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
    cy.get('[data-test="userMenuItem-logout"]').should("contain", "Logout");
  });
});

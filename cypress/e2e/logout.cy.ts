describe("logout", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("should login an existing user", () => {
    cy.login();
    cy.get('[data-test="userMenuItem-logout"]').click({ force: true });
    cy.get('[data-test="startWriting"]').should("be.visible");
  });
});

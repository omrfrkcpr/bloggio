describe("hero", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("should display if current user exists", () => {
    cy.viewport(900, 900);
    cy.login();
    cy.get('[data-test="projectSlogan"]').should("be.visible");
    cy.get('[data-test="projectDesc"]').should("be.visible");
    cy.get('[data-test="pencil"]').should("be.visible");
    cy.get('[data-test="typewriter"]').should("not.exist");
  });
  it("should display if current user doesnt exist", () => {
    cy.viewport(1200, 1200);
    cy.logout();
    cy.get('[data-test="projectSlogan"]').should("be.visible");
    cy.get('[data-test="projectDesc"]').should("be.visible");
    cy.get('[data-test="pencil"]').should("be.visible");
    cy.get('[data-test="typewriter"]').should("be.visible");
  });
});

describe("blogDetails", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.viewport("macbook-15");
  });

  it("should check sing page functionality", () => {
    cy.login();

    cy.get('[data-test="readMore-blog"]').first().click({ force: true });
    cy.url().should("contain", "/blog/");

    cy.get('[data-test="blog-image"]').should("be.visible");
    cy.get('[data-test="blog-title"]').should("be.visible");
    cy.get('[data-test="blog-category"]').should("be.visible");
    cy.get('[data-test="blog-userInfo"]').should("be.visible");
    cy.get('[data-test="blog-details"]').should("be.visible");
    cy.get('[data-test="blog-description"]').should("be.visible");
    cy.get('[data-test="blog-analytics"]').should("be.visible");

    // cy.get('[data-test="heart-icon"]')
    //   .should("have.class", "text-[#A1A1A1]")
    //   .click();
    //   cy.wait(2000)
    // cy.get('[data-test="heart-icon"]')
    //   .should("have.class", "text-red-500")
    //   .click();
    // cy.get('[data-test="heart-icon"]').should("have.class", "text-[#A1A1A1]");

    cy.get('[data-test="comment-icon"]')
      .should("be.visible")
      .click({ force: true });

    cy.get('[data-test="commentsSection-title"]').should("contain", "Comments");
    cy.get('[data-test="commentsSection"]').click({ force: true });

    cy.get('[data-test="comment-textArea"]')
      .should("be.visible")
      .click({ force: true })
      .type("Awesome Blog!", { force: true });

    cy.get('[data-test="responseBlog"]').click({ force: true });
    cy.wait(2000);
    cy.get('[data-test="comment"]').first().should("contain", "Awesome Blog!");
    cy.get('[data-test="toggleCommentsModal"]').click({ force: true });
    cy.get('[data-test="desktopMenuItem-home"]').click({ force: true });
    cy.url().should("contain", "/");
  });
});

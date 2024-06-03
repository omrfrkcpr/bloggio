/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    login(): Chainable<Element>;
    register(): Chainable<Element>;
    logout(): Chainable<Element>;
  }
}

import WelcomeItem from "../WelcomeItem.vue";

describe("HelloWorld", () => {
  it("playground", () => {
    cy.mount(WelcomeItem, { slots: { default: "Hello Cypress" } });
    cy.contains("Hello Cypress");
  });
});

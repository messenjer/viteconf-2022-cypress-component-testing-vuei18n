import Counter from "../TheCounter.vue";

const initialValue = 5;

describe("Counter", () => {
  it("displays the intial value", () => {
    cy.mount(Counter, { props: { initialValue } });
    cy.contains(initialValue);
  });
  it("increments when I click on the increment button", () => {
    cy.mount(Counter, { props: { initialValue } });
    cy.get(`[data-test-id=increment]`).click();
    cy.contains(initialValue + 1);
  });
  it("decrements when I click on the decrement button", () => {
    cy.mount(Counter, { props: { initialValue } });
    cy.get(`[data-test-id=decrement]`).click();
    cy.contains(initialValue - 1);
  });
  it("should not be under the min value", () => {
    cy.mount(Counter, { props: { initialValue: 0, min: 0 } });
    cy.get(`[data-test-id=decrement]`).click();
    cy.contains(0);
  });
  it("should not be above the max value", () => {
    cy.mount(Counter, { props: { initialValue: 1000, max: 1000 } });
    cy.get(`[data-test-id=increment]`).click();
    cy.contains(1000);
  });
});

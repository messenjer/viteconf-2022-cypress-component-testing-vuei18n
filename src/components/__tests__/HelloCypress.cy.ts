import HelloCypress from "../HelloCypress.vue";

describe("HelloWorld", () => {
  it("playground", () => {
    cy.mount(HelloCypress);
  });

  it("display hello message from the default options", () => {
    cy.mount(HelloCypress);
    cy.get("h1").should("contain", "hello!");
  });

  it("display the japanese hello message from the default options", () => {
    cy.mount(HelloCypress, {
      i18n: {
        locale: "ja",
        messages: {
          en: {
            hello: "hello",
          },
          ja: {
            hello: "こんにちは！",
          },
        },
      },
    });
    cy.get("h1").should("contain", "こんにちは！");
  });
});

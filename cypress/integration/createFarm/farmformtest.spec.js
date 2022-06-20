describe("farmForm Testing", () => {
  before(() => {
    cy.visit("/");
    cy.get("[data-testid=signin]").click();
    cy.get("[data-testid=email]").type("chris@gmail.com");
    cy.get("[data-testid=password]").type("123qwe");
    cy.get("[data-testid=login]").click();
    cy.get("[data-testid=addButton]").click();
  });
  it("UI testing", () => {
    cy.get("[data-testid=displayName]").should("be.visible");
    cy.get("[data-testid=name]").should("be.visible");
    cy.get("[data-testid=phoneNumber]").should("be.visible");
    cy.get("[data-testid=hours]").should("be.visible");
    cy.get("[data-testid=uploadimg]").should("be.visible");
    cy.get("[data-testid=submit]").should("be.visible");
  });
  it("Functions Testing", () => {
    cy.get("[data-testid=displayName]").type("ChrisFarm");
    cy.get("[data-testid=name]").type("myFarm");
    cy.get("[data-testid=phoneNumber]").type("01256487");
    cy.get("[data-testid=hours]").type("12");
    cy.get("[data-testid=uploadimg]").click();
    cy.get("[data-testid=submit]").click();
  });
});

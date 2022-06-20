describe("addFarm Testing", () => {
  before(() => {
    cy.visit("/");
    cy.get("[data-testid=signin]").click();
    cy.get("[data-testid=email]").type("chris@gmail.com");
    cy.get("[data-testid=password]").type("123qwe");
    cy.get("[data-testid=login]").click();
  });
  it("UI testing", () => {
    cy.get("[data-testid=addButton]").should("be.visible");
  });
  it("click Add Button", () => {
    cy.get("[data-testid=addButton]").click();
  });
});

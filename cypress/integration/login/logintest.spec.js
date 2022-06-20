describe("Login Testing", () => {
  before(() => {
    cy.visit("/");
    cy.get("[data-testid=signin]").click();
  });
  it("UI testing", () => {
    cy.get("[data-testid=email]").should("be.visible");
    cy.get("[data-testid=password]").should("be.visible");
    cy.get("[data-testid=login]").should("be.visible");
  });
  it("Functions Testing", () => {
    cy.get("[data-testid=email]").type("chris@gmail.com");
    cy.get("[data-testid=password]").type("123qwe");
    cy.get("[data-testid=login]").click();
  });
});

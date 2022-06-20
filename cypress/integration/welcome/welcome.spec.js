describe("test UI", () => {
  it("title, login,signup button", () => {
    cy.visit("/");
    cy.contains("Welcome screen!").should("be.visible");
    cy.get("[data-testid=signin]").should("be.visible");
    cy.get("[data-testid=signup]").should("be.visible");
    cy.get("[data-testid=signin]").click();
    cy.reload();
    cy.get("[data-testid=signup]").click();
    cy.reload();
  });
});

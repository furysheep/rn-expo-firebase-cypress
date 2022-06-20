describe("SignUp testing", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("[data-testid=signup]").click();
  });
  it("UI testing", () => {
    cy.get("[data-testid=email]").should("be.visible");
    cy.get("[data-testid=password]").should("be.visible");
    cy.get("[data-testid=submit]").should("be.visible");
  });
  it("functions Testing", () => {
    cy.get("[data-testid=email]").type("chris@gmail.com");
    cy.get("[data-testid=password]").type("123qwe");
    cy.get("[data-testid=submit]").click();
    cy.on("window:alert", (text) => {
      expect(text).to.contains("it has been already logged in");
    });
    cy.reload();
    // cy.get("[data-testid=email]").type("chris_second@gmail.com");
    // cy.get("[data-testid=password]").type("123qwe");
    // cy.get("[data-testid=submit]").click();
  });
  it("functions Testing", () => {
    cy.get("[data-testid=email]").type("chris_seconds@gmail.com");
    cy.get("[data-testid=password]").type("123qwe");
    cy.get("[data-testid=submit]").click();
  });
});

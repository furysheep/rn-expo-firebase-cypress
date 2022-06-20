describe("FarmLists", () => {
  before(() => {
    cy.visit("/");
    cy.get("[data-testid=signin]").click();
    cy.get("[data-testid=email]").type("chris@gmail.com");
    cy.get("[data-testid=password]").type("123qwe");
    cy.get("[data-testid=login]").click();
    // cy.get("[data-testid=addButton]").click();
    // cy.get("[data-testid=displayName]").type("ChrisFarm");
    // cy.get("[data-testid=name]").type("myFarm");
    // cy.get("[data-testid=phoneNumber]").type("01256487");
    // cy.get("[data-testid=hours]").type("12");
    // cy.get("[data-testid=uploadimg]").click();
    // cy.get("[data-testid=submit]").click();
  });
  it("UI testing", () => {
    // cy.wait("farms")
    //   .its("response")
    //   .should("be.an", "Array")
    //   .and("have.length.gt", 3)
    //   .then((farm) => {
    //     cy.get("[data-testid=displayName_list]").should(
    //       "have.length",
    //       farm.length
    //     );
    //   });
    cy.get("[aria-label=farms]").should("be.visible");
    cy.get("[data-testid=signout]").should("be.visible");
  });
  it("Functions Testing", () => {
    cy.get("[data-testid=signout]").click();
  });
});

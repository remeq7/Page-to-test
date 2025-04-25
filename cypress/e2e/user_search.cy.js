describe("User Search", () => {
  beforeEach(() => {
    cy.visit("html/user_form.html");
  });

  it("should display user data after a successful API request (mocked)", () => {
    cy.intercept("GET", "/api/users/123", { fixture: "user.json" }).as(
      "getUser"
    );

    cy.get("#userId").type("123");
    cy.get('button[type="submit"]').click();

    cy.wait("@getUser").then((interception) => {
      expect(interception.request.url).to.include("/api/users/123");
      expect(interception.request.method).to.equal("GET");
    });

    cy.get("#user-details").should("contain", "User Details");
    cy.get("#user-details").should("contain", "ID: 123");
    cy.get("#user-details").should("contain", "Name: Jan Kowalski");
    cy.get("#user-details").should(
      "contain",
      "Email: jan.kowalski@example.com"
    );
  });

  it("should display a 'user not found' message when the API returns 404", () => {
    cy.intercept("GET", "/api/users/404", { statusCode: 404, body: {} }).as(
      "getUserNotFound"
    );

    cy.get("#userId").type("404");
    cy.get('button[type="submit"]').click();

    cy.wait("@getUserNotFound");

    cy.get("#user-details").should("contain", "User not found.");
  });

  it("should display an error message when the API returns a server error", () => {
    cy.intercept("GET", "/api/users/500", {
      statusCode: 500,
      body: "Internal Server Error",
    }).as("getUserError");

    cy.get("#userId").type("500");
    cy.get('button[type="submit"]').click();

    cy.wait("@getUserError");

    cy.get("#user-details").should(
      "contain",
      "An error occurred while fetching data."
    );
  });

  it("should check the request parameters", () => {
    cy.intercept("GET", "/api/users/*", (req) => {
      expect(req.url).to.include("/api/users/789");
      req.reply({ fixture: "user.json" });
    }).as("getUserWithParams");

    cy.get("#userId").type("789");
    cy.get('button[type="submit"]').click();

    cy.wait("@getUserWithParams");
  });

  it("should test the application in offline mode", () => {
    cy.intercept("GET", "/api/users/*", { fixture: "user.json" }).as(
      "getUserOffline"
    );

    cy.visit("html/user_form.html", {
      onBeforeLoad(win) {
        Object.defineProperty(win.navigator, "onLine", { value: false });
      },
    });

    cy.get("#userId").type("999");
    cy.get('button[type="submit"]').click();

    cy.wait("@getUserOffline");

    cy.get("#user-details").should("contain", "User Details");
  });
});

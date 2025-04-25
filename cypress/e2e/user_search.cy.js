describe("Wyszukiwanie użytkownika", () => {
  beforeEach(() => {
    cy.visit("user_form.html");
  });

  it("powinien wyświetlić dane użytkownika po pomyślnym zapytaniu API (mockowane)", () => {
    cy.intercept("GET", "/api/users/123", { fixture: "user.json" }).as(
      "getUser"
    );

    cy.get("#userId").type("123");
    cy.get('button[type="submit"]').click();

    cy.wait("@getUser").then((interception) => {
      expect(interception.request.url).to.include("/api/users/123");
      expect(interception.request.method).to.equal("GET");
    });

    cy.get("#user-details").should("contain", "Dane użytkownika");
    cy.get("#user-details").should("contain", "ID: 123");
    cy.get("#user-details").should("contain", "Imię: Jan Kowalski");
    cy.get("#user-details").should(
      "contain",
      "Email: jan.kowalski@example.com"
    );
  });

  it("powinien wyświetlić komunikat o braku użytkownika, gdy API zwraca 404", () => {
    cy.intercept("GET", "/api/users/404", { statusCode: 404, body: {} }).as(
      "getUserNotFound"
    );

    cy.get("#userId").type("404");
    cy.get('button[type="submit"]').click();

    cy.wait("@getUserNotFound");

    cy.get("#user-details").should("contain", "Nie znaleziono użytkownika.");
  });

  it("powinien wyświetlić komunikat o błędzie, gdy API zwraca błąd serwera", () => {
    cy.intercept("GET", "/api/users/500", {
      statusCode: 500,
      body: "Internal Server Error",
    }).as("getUserError");

    cy.get("#userId").type("500");
    cy.get('button[type="submit"]').click();

    cy.wait("@getUserError");

    cy.get("#user-details").should(
      "contain",
      "Wystąpił błąd podczas pobierania danych."
    );
  });

  it("powinien sprawdzić parametry zapytania", () => {
    cy.intercept("GET", "/api/users/*", (req) => {
      expect(req.url).to.include("/api/users/789");
      req.reply({ fixture: "user.json" });
    }).as("getUserWithParams");

    cy.get("#userId").type("789");
    cy.get('button[type="submit"]').click();

    cy.wait("@getUserWithParams");
  });

  it("powinien przetestować aplikację w trybie offline", () => {
    cy.intercept("GET", "/api/users/*", { fixture: "user.json" }).as(
      "getUserOffline"
    );

    cy.visit("user_form.html", {
      onBeforeLoad(win) {
        Object.defineProperty(win.navigator, "onLine", { value: false });
      },
    });

    cy.get("#userId").type("999");
    cy.get('button[type="submit"]').click();

    cy.wait("@getUserOffline");

    cy.get("#user-details").should("contain", "Dane użytkownika");
  });
});

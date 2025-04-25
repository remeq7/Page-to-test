describe("Testy strony logowania", () => {
  beforeEach(() => {
    cy.visit("login.html");
    localStorage.clear(); // Wyczyść localStorage przed każdym testem
  });

  it("Powinien poprawnie wyświetlić stronę logowania", () => {
    cy.get("h2").should("contain", "Logowanie");
    cy.get('label[for="username"]').should("contain", "Nazwa użytkownika:");
    cy.get('label[for="password"]').should("contain", "Hasło:");
    cy.get('input[name="username"]').should("be.visible");
    cy.get('input[name="password"]').should("be.visible");
    cy.get('button[type="submit"]').should("contain", "Zaloguj się");
    cy.get("#errorMessage").should("not.be.visible");
  });

  it("Powinien wyświetlić komunikat o błędzie przy nieprawidłowych danych logowania", () => {
    cy.get('input[name="username"]').type("zle_haslo");
    cy.get('input[name="password"]').type("zly_login");
    cy.get('button[type="submit"]').click();
    cy.get("#errorMessage")
      .should("be.visible")
      .should("contain", "Nieprawidłowa nazwa użytkownika lub hasło.");
    cy.url().should("include", "login.html"); // Powinien pozostać na stronie logowania
    cy.window().then((win) => {
      expect(win.localStorage.getItem("isLoggedIn")).to.be.null; // Sprawdź, czy localStorage nie zostało ustawione
    });
  });

  it("Powinien przekierować na stronę zalogowany.html po poprawnym zalogowaniu", () => {
    cy.get('input[name="username"]').type("demo");
    cy.get('input[name="password"]').type("password");
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "zalogowany.html");
    cy.window().then((win) => {
      expect(win.localStorage.getItem("isLoggedIn")).to.eq("true"); // Sprawdź, czy localStorage zostało ustawione
    });
    cy.get("h1").should("contain", "Witaj, zalogowany użytkowniku!");
    cy.get("button#logoutButton")
      .should("be.visible")
      .should("contain", "Wyloguj się");
  });

  it("Powinien automatycznie przekierować na stronę zalogowany.html, jeśli użytkownik jest już zalogowany", () => {
    cy.window().then((win) => {
      win.localStorage.setItem("isLoggedIn", "true");
    });
    cy.visit("login.html");
    cy.url().should("include", "zalogowany.html");
    cy.get("h1").should("contain", "Witaj, zalogowany użytkowniku!");
  });
});

describe("Testy strony zalogowany", () => {
  beforeEach(() => {
    cy.visit("zalogowany.html");
  });

  it("Powinien poprawnie wyświetlić stronę zalogowaną, jeśli użytkownik jest zalogowany", () => {
    cy.window().then((win) => {
      win.localStorage.setItem("isLoggedIn", "true");
    });
    cy.visit("zalogowany.html");
    cy.get("h1").should("contain", "Witaj, zalogowany użytkowniku!");
    cy.get("button#logoutButton")
      .should("be.visible")
      .should("contain", "Wyloguj się");
  });

  it("Powinien przekierować na stronę logowania, jeśli użytkownik nie jest zalogowany", () => {
    cy.window().then((win) => {
      win.localStorage.removeItem("isLoggedIn");
    });
    cy.visit("zalogowany.html");
    cy.url().should("include", "login.html");
    cy.get("h2").should("contain", "Logowanie");
  });

  it('Powinien wylogować użytkownika i przekierować na stronę logowania po kliknięciu "Wyloguj się"', () => {
    cy.window().then((win) => {
      win.localStorage.setItem("isLoggedIn", "true");
    });
    cy.visit("zalogowany.html");
    cy.get("button#logoutButton").click();
    cy.url().should("include", "login.html");
    cy.get("h2").should("contain", "Logowanie");
    cy.window().then((win) => {
      expect(win.localStorage.getItem("isLoggedIn")).to.be.null;
    });
  });
});

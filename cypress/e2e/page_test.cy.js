describe("Testowanie strony głównej https://remeq7.github.io/Page-to-test/index.html", () => {
  beforeEach(() => {
    cy.visit("https://remeq7.github.io/Page-to-test/index.html");
  });

  it("powinien poprawnie wypełnić i wysłać formularz", () => {
    // Wypełnij pole Imię
    cy.get('input[name="imie"]').type("Jan");

    // Wypełnij pole Email
    cy.get('input[name="email"]').type("jan.kowalski@example.com");

    // Wypełnij pole Hasło
    cy.get('input[name="haslo"]').type("tajnehaslo");

    // Wybierz płeć Mężczyzna
    cy.get('input[name="plec"][value="mezczyzna"]').check();

    // Wybierz język Polski z dropdownu
    cy.get('select[name="jezyk"]').select("Polski");

    // Zaznacz zainteresowanie Programowanie
    cy.get('input[name="zainteresowania"][value="programowanie"]').check();

    // Wpisz wiadomość
    cy.get('textarea[name="wiadomosc"]').type("4terter");

    // Kliknij przycisk Wyślij
    cy.get('button[type="submit"]').click();

    // Oczekuj na zmianę URL-a i sprawdź jego zawartość za pomocą URLSearchParams
    cy.url().then((url) => {
      const searchParams = new URLSearchParams(new URL(url).search);
      expect(searchParams.get("imie")).to.eq("Jan");
      expect(searchParams.get("email")).to.eq("jan.kowalski@example.com");
      expect(searchParams.get("haslo")).to.eq("tajnehaslo");
      expect(searchParams.get("plec")).to.eq("mezczyzna");
      expect(searchParams.get("jezyk")).to.eq("polski");
      expect(searchParams.get("zainteresowania")).to.eq("programowanie");
      expect(searchParams.get("wiadomosc")).to.eq("4terter");
    });
  });
});

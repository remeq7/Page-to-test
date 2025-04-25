describe("Testing the homepage", () => {
  beforeEach(() => {
    cy.visit("index.html");
  });

  it("Should correctly fill and submit the form", () => {
    // Fill in the Name field
    cy.get('input[name="name"]').type("John");

    // Fill in the Email field
    cy.get('input[name="email"]').type("john.kowalski@example.com");

    // Fill in the Password field
    cy.get('input[name="password"]').type("testpassword");

    // Select gender
    cy.get('input[name="gender"][value="male"]').check();

    // Select a language
    cy.get('select[name="language"]').select("English");

    // Select interest
    cy.get('input[name="interests"][value="programming"]').check();

    // Enter a message
    cy.get('textarea[name="message"]').type("Test message");

    // Click the Submit button
    cy.get('button[type="submit"]').click();

    // Expect URL to change and verify its content using URLSearchParams
    cy.url().then((url) => {
      const searchParams = new URLSearchParams(new URL(url).search);
      expect(searchParams.get("name")).to.eq("John");
      expect(searchParams.get("email")).to.eq("john.kowalski@example.com");
      expect(searchParams.get("password")).to.eq("testpassword");
      expect(searchParams.get("gender")).to.eq("male");
      expect(searchParams.get("language")).to.eq("english");
      expect(searchParams.get("interests")).to.eq("programming");
      expect(searchParams.get("message")).to.eq("Test message");
    });
  });
});

describe("Login Page Tests", () => {
  beforeEach(() => {
    cy.visit("login.html");
    localStorage.clear(); // Clear localStorage before each test
  });

  it("Should correctly display the login page", () => {
    cy.get("h2").should("contain", "Login");
    cy.get('label[for="username"]').should("contain", "Username:");
    cy.get('label[for="password"]').should("contain", "Password:");
    cy.get('input[name="username"]').should("be.visible");
    cy.get('input[name="password"]').should("be.visible");
    cy.get('button[type="submit"]').should("contain", "Log In");
    cy.get("#errorMessage").should("not.be.visible");
  });

  it("Should display an error message for incorrect login credentials", () => {
    cy.get('input[name="username"]').type("wrong_password");
    cy.get('input[name="password"]').type("wrong_login");
    cy.get('button[type="submit"]').click();
    cy.get("#errorMessage")
      .should("be.visible")
      .should("contain", "Incorrect username or password.");
    cy.url().should("include", "login.html"); // Should remain on the login pagetest
    cy.window().then((win) => {
      expect(win.localStorage.getItem("isLoggedIn")).to.be.null; // Check if localStorage was not set
    });
  });

  it("Should redirect to logged_in.html after successful login", () => {
    cy.get('input[name="username"]').type("demo");
    cy.get('input[name="password"]').type("password");
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "logged_in.html");
    cy.window().then((win) => {
      expect(win.localStorage.getItem("isLoggedIn")).to.eq("true"); // Check if localStorage was set
    });
    cy.get("h1").should("contain", "Welcome, logged in user!");
    cy.get("button#logoutButton")
      .should("be.visible")
      .should("contain", "Log Out");
  });

  it("Should automatically redirect to logged_in.html if the user is already logged in", () => {
    cy.window().then((win) => {
      win.localStorage.setItem("isLoggedIn", "true");
    });
    cy.visit("login.html");
    cy.url().should("include", "logged_in.html");
    cy.get("h1").should("contain", "Welcome, logged in user!");
  });
});

describe("Logged In Page Tests", () => {
  beforeEach(() => {
    cy.visit("logged_in.html");
  });

  it("Should correctly display the logged in page if the user is logged in", () => {
    cy.window().then((win) => {
      win.localStorage.setItem("isLoggedIn", "true");
    });
    cy.visit("logged_in.html");
    cy.get("h1").should("contain", "Welcome, logged in user!");
    cy.get("button#logoutButton")
      .should("be.visible")
      .should("contain", "Log Out");
  });

  it("Should redirect to the login page if the user is not logged in", () => {
    cy.window().then((win) => {
      win.localStorage.removeItem("isLoggedIn");
    });
    cy.visit("logged_in.html");
    cy.url().should("include", "login.html");
    cy.get("h2").should("contain", "Login");
  });

  it('Should log out the user and redirect to the login page after clicking "Log Out"', () => {
    cy.window().then((win) => {
      win.localStorage.setItem("isLoggedIn", "true");
    });
    cy.visit("logged_in.html");
    cy.get("button#logoutButton").click();
    cy.url().should("include", "login.html");
    cy.get("h2").should("contain", "Login");
    cy.window().then((win) => {
      expect(win.localStorage.getItem("isLoggedIn")).to.be.null;
    });
  });
});

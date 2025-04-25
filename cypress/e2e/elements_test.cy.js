describe("Elements Test Page", () => {
  beforeEach(() => {
    cy.visit("html/elements.html");
  });

  it("should display the main heading", () => {
    cy.get("h1").should("contain", "Page with Various Elements for Testing");
  });

  describe("Buttons Section", () => {
    it("should display the basic button", () => {
      cy.get('[data-testid="basic-button"]')
        .should("be.visible")
        .should("contain", "Basic Button");
    });

    it("should display the disabled button and it should be disabled", () => {
      cy.get('[data-testid="disabled-button"]')
        .should("be.visible")
        .should("contain", "Disabled Button")
        .should("be.disabled");
    });

    it('should display the "Another Button" with a specific class', () => {
      cy.get('[data-testid="another-button"]')
        .should("be.visible")
        .should("contain", "Another Button")
        .should("have.class", "inny-styl");
    });
  });

  describe("Progress Bar Section", () => {
    it("should display the progress bar with the correct value and max attributes", () => {
      cy.get('[data-testid="progress-bar"]')
        .should("be.visible")
        .should("have.attr", "value", "70")
        .should("have.attr", "max", "100")
        .should("contain", "70%");
    });
  });

  describe("Number Input Section", () => {
    it("should display the number input with correct attributes and initial value", () => {
      cy.get('[data-testid="number-input"]')
        .should("be.visible")
        .should("have.attr", "type", "number")
        .should("have.attr", "min", "0")
        .should("have.attr", "max", "100")
        .should("have.value", "50");
    });

    it("should be able to type a number within the min and max range", () => {
      cy.get('[data-testid="number-input"]')
        .clear()
        .type("25")
        .should("have.value", "25");
    });
  });

  describe("Range Input / Slider Section", () => {
    it("should display the range input with correct attributes and initial value", () => {
      cy.get('[data-testid="range-input"]')
        .should("be.visible")
        .should("have.attr", "type", "range")
        .should("have.attr", "min", "0")
        .should("have.attr", "max", "100")
        .should("have.value", "30");
    });

    it("should display the initial range value", () => {
      cy.get('[data-testid="range-value-display"]').should("contain", "30");
    });

    it("should update the displayed range value when the slider is moved", () => {
      cy.get('[data-testid="range-input"]').invoke("val", 75).trigger("input");
      cy.get('[data-testid="range-value-display"]').should("contain", "75");
    });
  });

  describe("Date Input Section", () => {
    it("should display the date input with the correct type", () => {
      cy.get('[data-testid="date-input"]')
        .should("be.visible")
        .should("have.attr", "type", "date");
    });

    //add test to pick dates
  });

  describe("Color Input Section", () => {
    it("should display the color input with the correct type and initial value", () => {
      cy.get('[data-testid="color-input"]')
        .should("be.visible")
        .should("have.attr", "type", "color")
        .should("have.value", "#ff0000");
    });

    it("should allow the user to interact with the color picker", () => {
      cy.get('[data-testid="color-input"]').click();
    });
  });

  describe("File Input Section", () => {
    it("should display the file input with the correct type", () => {
      cy.get('[data-testid="file-input"]')
        .should("be.visible")
        .should("have.attr", "type", "file");
    });

    it("should allow the user to select a file", () => {
      cy.get('[data-testid="file-input"]').selectFile(
        "cypress/fixtures/example.txt",
        { force: true }
      );
      cy.get('[data-testid="file-input"]').then(($input) => {
        expect($input[0].files).to.have.length(1);
        expect($input[0].files[0].name).to.equal("example.txt");
      });
    });
  });
});

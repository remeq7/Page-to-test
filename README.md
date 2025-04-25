# Page to Test 🧪

A simple HTML page created for practicing and demonstrating automated UI testing with tools like Cypress.

## 🌐 Live Preview

You can access the test page here:  
👉 https://remeq7.github.io/Page-to-test/

## 📂 Project Structure

```bash
Page-to-test/
├── cypress/                # Cypress tests
│   ├── e2e/
│   │   ├── login_spec.cy.js
│   │   ├── page_test.cy.js
│   │   └── user_search.cy.js
│   └── support/
│       └── ...
├── index.html              # Main test form page
├── login.html              # Login test page
├── elements.html           # Element interaction page
├── users.html              # User search page
├── README.md               # Project documentation
└── ...
```

## ✅ Features

- HTML form with various input fields:
  - Text fields
  - Radio buttons
  - Select dropdown
  - Checkboxes
  - Textarea
- Submit button that reflects input values in the URL
- Multiple pages for diverse test cases (e.g., login, search, form validation)

## 🚀 How to Use

### Run Locally

1. Clone the repo:

   ```bash
   git clone https://github.com/remeq7/Page-to-test.git
   cd Page-to-test
   ```

2. Open `index.html` in your browser (or use Live Server in VS Code).

### Run Cypress Tests

1. Make sure Cypress is installed:

   ```bash
   npm install
   ```

2. Open Cypress test runner:

   ```bash
   npx cypress open
   ```

3. Select a test spec and run it!

Or run all tests headlessly:

```bash
npx cypress run
```

## 🧪 Example Test Case

Tests include actions like:

- Filling form fields
- Selecting dropdown options
- Checking checkboxes and radio buttons
- Submitting the form
- Validating URL query parameters

## 🛠️ Tech Stack

- HTML/CSS
- [Cypress](https://www.cypress.io/) for testing
- GitHub Pages for deployment

## 📄 License

This project is open-source and available under the MIT License.

---

Happy testing! 🎉

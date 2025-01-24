# AEGISLAB-QA-Assessment-Test

This repository contains end-to-end tests using Cypress for web applications QA Assesment.

## Prerequisites

- Node.js (v14 or above)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
    ```bash
    https://github.com/DianPermana/AEGISLAB-QA-Assessment-Test.git
    cd cypress-testing-framework
    ```

2. Install dependencies:
    
    Makesure Username & Password
    ```
        const { defineConfig } = require("cypress");
    
    module.exports = defineConfig({
      e2e: {
        setupNodeEvents(on, config) {
          config.browser = 'chrome';
        },
        env: {
          USERNAME: 'green12',
          PASSWORD: '123Password!123',
        },
        
        reporter: "mochawesome",        // Use mochawesome as the reporter
        reporterOptions: {
          reportDir: "cypress/reports", // Directory to save the report
          overwrite: true,              // (false) Don't overwrite existing reports
          html: true,                   // Generate an HTML report
          json: true,                   // Generate a JSON report
        },
        
      },
    });```


## Running Tests

- To open Cypress in debugs mode:
    ```bash
    npx cypress open
    ```

    
- To open Cypress in interactive mode:
    ```bash
    npm run test:newmeter_single_positive
    npm run test:newmeter_modular_positive
    npm run test:newmeter_modular_negative
    ```

## Generating Tests Report
- To open Cypress in debugs mode:
    ```bash
    npm run report
    ```


# AEGISLAB-QA-Assessment-Test

This repository contains end-to-end tests using Cypress for web applications QA Assesment.

## Prerequisites

- Node.js (v14 or above)
- Cypress package version: 14.0.0
- Cypress binary version: 14.0.0
- Electron version: 33.2.1
- Bundled Node version: 20.18.1

    ```bash
    npm install cypress --save-dev
    ```

## Installation

1. Clone the repository:
    ```bash
    https://github.com/DianPermana/AEGISLAB-QA-Assessment-Test.git
    cd AEGISLAB-QA-Assessment-Test
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
          USERNAME: 'redvelvet',
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

    
- To run Cypress in specific scenario test:
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


## Tests Run & Report

https://github.com/user-attachments/assets/9c1685c2-3da2-43c0-9874-eae324f57e06



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
});

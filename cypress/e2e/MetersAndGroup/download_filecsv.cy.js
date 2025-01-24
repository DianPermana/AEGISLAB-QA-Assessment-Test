describe('Meters & Group Module New Meter', () => {
  
    const username = Cypress.env('USERNAME');
    const password = Cypress.env('PASSWORD');
  
    beforeEach(() => {
      // Perform login before accessing the input form
      login(username, password);  // Call the login function
    });
  
    it('downloads a Meter CSV file', () => {

        meterandgroupmodule();  // Call the meterandgroupmodule function
    
        cy.contains('button', 'Download')  
          .click();
    
        cy.get('#swal2-html-container')
          .should('be.visible') // Ensure the confirmation dialog is visible
          .contains('Are you sure to download ?')
            
        //cy.get('body > div.swal2-container.swal2-center.swal2-backdrop-show > div > div.swal2-actions > button.swal2-confirm.swal2-styled.swal2-default-outline')
        cy.contains('button', 'Yes! Confirm') 
          .click(); 
    
        cy.wait(2000); 
    
        cy.contains('button', 'OK') 
           .click();

        // Assert the file exists in the default download folder
        //cy.readFile('${downloadsFolder}/meter.csv').should('exist');
      });
  
  });


// Function to handle login
const login = (username, password) => {
    // Perform login before accessing the input form
  cy.visit('https://cmms.dev.aegislabs.work/#/');

  // Login action
  cy.get('input[name="username"]')
    .type(username);
  cy.get('input[name="password"]')
    .type(password);
  cy.get('button[type="submit"]')
  .click();

  // Assert successful login by checking the URL or a dashboard element
  cy.url().should('include', '/dashboard');
};
// Function to handle meter and group module
const meterandgroupmodule = () => {

  // Navigate to the input form page after login
  cy.visit('https://cmms.dev.aegislabs.work/#/page/assets/meters-&-groups');

  cy.url().should('include', '/page/assets/meters-&-groups');
  
}

// Function to handle logout
const logout = () => {
    // Click the specific sidebar item inside a container
    cy.get('.sidebar .dropdown-toggle.nav-link')  
      .first()  
      .click();
    // Click the Logout button
    cy.get('a.dropdown-item')
      .find('span.text-red-main') 
      .contains('Logout')
      .click({ force: true });     
};
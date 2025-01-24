describe('Meters & Group Module', () => {
  
    const username = 'redvelvet';
    const password = '123Password!123';
  
    beforeEach(() => {
      // Perform login before accessing the input form
      cy.visit('https://cmms.dev.aegislabs.work/#/');
  
      // Login action
      cy.get('input[name="username"]').type(username);
      cy.get('input[name="password"]').type(password);
      cy.get('button[type="submit"]').click();
  
      // Assert successful login by checking the URL or a dashboard element
      cy.url().should('include', '/dashboard');

    });
  
    it.skip('Should allow users to fill out and submit the New Meter', () => {
  
      // Navigate to the input form page after login
      cy.visit('https://cmms.dev.aegislabs.work/#/page/assets/meters-&-groups');
  
      // wait until button "Choose Action" is visible and then click it
      cy.get('button.btn.btn-primary.dropdown-toggle') 
      .should('be.visible') 
      .click();
  
      // Add    : #btn-action-Meter-0
      // Update : #btn-action-Meter-1 
      // delete : #btn-action-Meter-2
      cy.get('#btn-action-Meter-0')
        .should('be.visible')   
        .click();
      
      // Fill out the input meter name
      cy.get('input[name="meter_name"]')
        .type('SmartMeter_1234')
        .should('have.value', 'SmartMeter_1234');
      
    // Fill out the input meter description
      cy.get('input[name="meter_description"]')
        .type('SmartMeter_1234')
        .should('have.value', 'SmartMeter_1234');
  
    // Choose the meter type option :  Gauge, Continuous, Characteristic
      cy.get('#react-select-2-input').click();
      cy.get('[role="option"]')  
        .contains('Continuous')   
        .click();
    
    // Assert the selected value
      cy.get('input[name="meter_type"]')  
        .should('have.value', 'continuous'); 
  
    // Choose the reading type option : ACTUAL, DELTA
      cy.get('#react-select-3-input').click();
      cy.get('[role="option"]')  
        .contains('ACTUAL')  
        .click();
  
    // Assert the selected value : Actual readings, Delta readings
      cy.get('input[name="meter_reading_type_description"]') 
        .should('have.value', 'Actual readings');  
      
    // Choose the domain option : SEARCHTYPE, SCRLAUNCHPNTTYPE
      cy.get('#react-select-4-input').click();
      cy.get('[role="option"]')  
        .contains('SEARCHTYPE')  
        .click();

    // Assert the selected value : Search Types, Script launch point
      cy.get('input[name="domain_description"]')  
        .should('have.value', 'Search Types');  
  
    // choose the UOM option : B34, B45, B47
      cy.get('#react-select-5-input').click();
      cy.get('[role="option"]')  
        .contains('B34')  
        .click();

    // Assert the selected value : Kilogram/cubic decimeter, Kilomol, kilonewton
      cy.get('input[name="uom_description"]')  
        .should('have.value', 'Kilogram/cubic decimeter'); 
  
      //click submit button
      cy.get('button[type="submit"]').click();
  
      // click confirm button with text "Yes! Confirm"
      cy.get('button.swal2-confirm')
        .should('be.visible') 
        .and('have.text', 'Yes! Confirm')
        .click();
  
      // Assert the success! pop-up
      cy.get('#swal2-title')
        .should('be.visible') 
        .and('contain.text', 'Success!'); 
        
      // Click the OK button
      cy.get('button.swal2-confirm')
        .should('be.visible') 
        .and('have.text', 'OK')
        .click();
  
      // Assert "SmartMeter_1234" is inside the span
      cy.get('input[placeholder="Search"]')
        .eq(0) 
        .type('SmartMeter_1234', { force: true });
      
      // assert the table row contains SmartMeter_1234
      cy.get('tbody')
        .find('tr') 
        .should('have.length.greaterThan', 0)  
        .contains('td', 'SmartMeter_1234') 
  
      // Click the specific sidebar item inside a container
      cy.get('.sidebar .dropdown-toggle.nav-link')
        .first()
        .click();
    
      // Click the Logout button
      cy.get('a.dropdown-item')
        .find('span.text-red-main') 
        .contains('Logout')
        .click({ force: true }); 
    });
  
    it.skip('Should allow users to update New Meter', () => {

      // Navigate to the input form page after login
      cy.visit('https://cmms.dev.aegislabs.work/#/page/assets/meters-&-groups');
  
        // Search for the meter name "SmartMeter_1234"
      cy.get('td')
        .contains('SmartMeter_1234')  
        .should('be.visible')       
        .trigger('mouseover')        
        .click();                    
  
        // wait until button is visible
      cy.get('button.btn.btn-primary.dropdown-toggle') 
        .should('be.visible') 
        .click(); 
        
      // Add    : #btn-action-Meter-0
      // Update : #btn-action-Meter-1 
      // delete : #btn-action-Meter-2
      cy.get('#btn-action-Meter-1')
        .should('be.visible')   
        .click();
      

      // Update the meter description from SmartMeter_1234 to SmartMeter_1235
      cy.get('input[name="meter_name"]')
        .clear()  
        .type('SmartMeter_1235')
        .should('have.value', 'SmartMeter_1235');
      
      // Update the meter description from SmartMeter_1234 to SmartMeter_1235  
      cy.get('input[name="meter_description"]')
        .clear()  
        .type('SmartMeter_1235 description')
        .should('have.value', 'SmartMeter_1235 description');
  
      // Choose the meter type option :  Gauge, Continuous, Characteristic 
      cy.get('#react-select-2-input').click();
      cy.get('[role="option"]') 
        .contains('Continuous') 
        .click();
    
      // Assert the selected value
      cy.get('input[name="meter_type"]')  
        .should('have.value', 'continuous'); 
  
      cy.get('#react-select-3-input').click();
      cy.get('[role="option"]')  
        .contains('ACTUAL')  
        .click();
  
      cy.get('input[name="meter_reading_type_description"]') 
        .should('have.value', 'Actual readings'); 
      
    // Choose the domain option : SEARCHTYPE, SCRLAUNCHPNTTYPE
      cy.get('#react-select-4-input').click();
      cy.get('[role="option"]')  
        .contains('SEARCHTYPE')   
        .click();

    // Assert the selected value : Search Types, Script launch point
      cy.get('input[name="domain_description"]')  
        .should('have.value', 'Search Types');  
  
    // choose the UOM option : B34, B45, B47
      cy.get('#react-select-5-input').click();
      cy.get('[role="option"]')  
        .contains('B34')   
        .click();

    // Assert the selected value : Kilogram/cubic decimeter, Kilomol, kilonewton
      cy.get('input[name="uom_description"]')  
        .should('have.value', 'Kilogram/cubic decimeter');
  
      //click submit button
      cy.get('button[type="submit"]').click();
  
      // click confirm button
      cy.get('button.swal2-confirm')
        .should('be.visible') 
        .and('have.text', 'Yes! Confirm') 
        .click(); // Click the button
  
      // Assert the success pop-up
      cy.get('#swal2-title')
        .should('be.visible') 
        .and('contain.text', 'Success!'); 
  
      // Target the button and click it
      cy.get('button.swal2-confirm')
        .should('be.visible') 
        .and('have.text', 'OK') 
        .click(); 
  
      // Assert "SmartMeter_1235" is inside the span
      cy.get('span.font-semibold')
        .contains('SmartMeter_1235')
        .should('be.visible');
  
      // Click the specific sidebar item inside a container
      cy.get('.sidebar .dropdown-toggle.nav-link')  
        .first() 
        .click();
  
      // Click the Logout button
      cy.get('a.dropdown-item')
        .find('span.text-red-main') 
        .contains('Logout')
        .click({ force: true }); 
  
    });
  
    it.skip('Should allow users to Delete New Meter', () => {
      // Navigate to the input form page after login
      cy.visit('https://cmms.dev.aegislabs.work/#/page/assets/meters-&-groups');
  
      // wait until button is visible
      cy.get('button.btn.btn-primary.dropdown-toggle') 
        .should('be.visible') // Pastikan tombol terlihat
        .click(); // Klik tombol
  
      // Add    : #btn-action-Meter-0
      // Update : #btn-action-Meter-1 
      // delete : #btn-action-Meter-2
      cy.get('#btn-action-Meter-2')
        .should('be.visible')   
        .click();
      
      // Fill out the input meter name input[role="combobox"]
      cy.get('input[role="combobox"]')
        .should('be.visible')  
        .click({ force: true }) 
        .type('SmartMeter_1235') 
        .wait(1000); 
    
      // Step 2: Select the first matching option from the dropdown
      cy.get('.css-1nmdiq5-menu')  
        .contains('SmartMeter_1235')  
        .click(); 
    
      // Step 3: Assert the selected value
      cy.get('.css-1dimb5e-singleValue')
        .should('have.text', 'SmartMeter_1235'); 

      //click Delete button
      cy.get('button[type="submit"]').click();
  
      // click confirm button
      cy.get('button.swal2-confirm')
        .should('be.visible') 
        .and('have.text', 'Yes! Confirm') 
        .click();
  
      // Assert the success pop-up
      cy.get('#swal2-title')
        .should('be.visible') 
        .and('contain.text', 'Success'); 
  
      // Target the button and click it
      cy.get('button.swal2-confirm')
        .should('be.visible') 
        .and('have.text', 'OK') 
        .click(); 
  
      cy.get('input[placeholder="Search"]')
        .eq(0)  
        .type('SmartMeter_1235', { force: true }); 
      
      // Click the specific sidebar item inside a container
      cy.get('.sidebar .dropdown-toggle.nav-link')  
        .first()  
        .click();
  
      // Click the Logout button
      cy.get('a.dropdown-item')
        .find('span.text-red-main') 
        .contains('Logout')
        .click({ force: true });  
        
    });
  
  });
  

describe('Meters & Group Module', () => {
  
  const username = Cypress.env('USERNAME');
  const password = Cypress.env('PASSWORD');

  beforeEach(() => {
    // Perform login before accessing the input form
    login(username, password);  // Call the login function
  });

  const meterName = `SmartMeter${Cypress._.random(1000, 9999)}`; // Generate a random meter name
  //const meterName = `SmartMeter3874`; // Generate a random meter name
  const meterdescription = "Description" + meterName;
  it('Should allow users to fill out and submit the New Meter', () => {

    meterandgroupmodule();  // Call the meterandgroupmodule function

    // Perform the Update action
    handleFlow('Add', meterName, meterdescription);

    //meterType       : Meter Type Description
    // Gauge          : Gauge 
    // Continuous     : Continuous [OK]
    // Characteristic : Characteristic

    // Readingtype    : meter_reading_type_description : 
    // ACTUAL         : Actual readings [OK]
    // DELTA          : Delta readings

    // domain          : domain
    // SEARCHTYPE     : Search Types [OK]
    // SCRLAUNCHPNTTYPE: Script launch point

    // unitOfMeasure  : UOM
    // B34            : Kilogram/cubic [OK]
    // B45            : Kilomol
    // B46            : kilonewton


    // Select dropdown options for New Meter creation
    selectDropdownOption('meterType', 'Continuous');
    selectDropdownOption('readingType', 'ACTUAL');
    selectDropdownOption('domain', 'SEARCHTYPE');
    selectDropdownOption('unitOfMeasure', 'B34');

    submitMeter(true);  // Call the submitMeter function
    
    // Assert "SmartMeter_1234" is inside the span
    cy.get('input[placeholder="Search"]')
      .eq(0) 
      .type('SmartMeter_1234', { force: true });
        
    // assert the table row contains SmartMeter_1234
    cy.get('tbody')
      .find('tr') 
      .should('have.length.greaterThan', 0)  
      .contains('td', meterName) 

    logout();  // Call the logout function

  });

  it('Shouldnt allow users to fill out and submit the New Meter because resource already exists', () => {

      meterandgroupmodule();  // Call the meterandgroupmodule function
  
      // Perform the Update action
      handleFlow('Add', meterName, meterdescription);
  
      //meterType       : Meter Type Description
      // Gauge          : Gauge 
      // Continuous     : Continuous [OK]
      // Characteristic : Characteristic
  
      // Readingtype    : meter_reading_type_description : 
      // ACTUAL         : Actual readings [OK]
      // DELTA          : Delta readings
  
      // domain          : domain
      // SEARCHTYPE     : Search Types [OK]
      // SCRLAUNCHPNTTYPE: Script launch point
  
      // unitOfMeasure  : UOM
      // B34            : Kilogram/cubic [OK]
      // B45            : Kilomol
      // B46            : kilonewton
  
  
      // Select dropdown options for New Meter creation
      selectDropdownOption('meterType', 'Continuous');
      selectDropdownOption('readingType', 'ACTUAL');
      selectDropdownOption('domain', 'SEARCHTYPE');
      selectDropdownOption('unitOfMeasure', 'B34');
  
      submit_resource_already_exist(true); 
      
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

    // wait until button is visible
    cy.get('button.btn.btn-primary.dropdown-toggle') 
      .should('be.visible') // Pastikan tombol terlihat
      .click(); // Klik tombol
}
// Function to handle submit meter
const submitMeter = (add) => {
    //click submit button
    cy.get('button[type="submit"]').click();
      
    // click confirm button with text "Yes! Confirm"
    cy.get('button.swal2-confirm')
      .should('be.visible') 
      .and('have.text', 'Yes! Confirm')
      .click();

    if (add)  {
      // Assert the success! pop-up
      cy.get('#swal2-title')
        .should('be.visible') 
        .and('contain.text', 'Success!'); 
        } else {
        // Assert the success pop-up
        cy.get('#swal2-title')
          .should('be.visible') 
          .and('contain.text', 'Success'); 
        }

      
    // Click the OK button
    cy.get('button.swal2-confirm')
      .should('be.visible') 
      .and('have.text', 'OK')
      .click();
}
  // Function to handle submit meter
const submit_resource_already_exist = (add) => {
    //click submit button
    cy.get('button[type="submit"]').click();
      
    // click confirm button with text "Yes! Confirm"
    cy.get('button.swal2-confirm')
      .should('be.visible') 
      .and('have.text', 'Yes! Confirm')
      .click();

    if (add)  {
      // Assert the success! pop-up
      cy.get('#swal2-title')
        .should('be.visible') 
        .and('contain.text', 'Oops...!'); 

      cy.get('#swal2-html-container')
        .should('be.visible') 
        .and('contain.text', 'resource already exists'); 

        } else {
        // Assert the success pop-up
        cy.get('#swal2-title')
          .should('be.visible') 
          .and('contain.text', 'Oops...!'); 

        cy.get('#swal2-html-container')
          .should('be.visible') 
          .and('contain.text', 'resource already exists'); 
        }

    // Click the OK button
    cy.get('button.swal2-confirm')
      .should('be.visible') 
      .and('have.text', 'OK')
      .click();
}
//function to delete meter
const deleteMeter = () => {
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
// Function to handle dropdown selection or input field entry dynamically
const selectDropdownOption = (dropdownType, option) => {

    //meterType       : Meter Type Description
    // Gauge          : Gauge 
    // Continuous     : Continuous
    // Characteristic : Characteristic

    // Readingtype    : meter_reading_type_description : 
    // ACTUAL         : Actual readings
    // DELTA          : Delta readings

    // domain          : domain
    // SEARCHTYPE     : Search Types
    // SCRLAUNCHPNTTYPE: Script launch point

    // unitOfMeasure  : UOM
    // B34            : Kilogram/cubic
    // B45            : Kilomol
    // B46            : kilonewton


  const dropdownMap = {
    'meterType'                     : '#react-select-2-input', // Meter Type dropdown
    'readingType'                   : '#react-select-3-input', // Reading Type dropdown
    'domain'                        : '#react-select-4-input', // Domain dropdown
    'unitOfMeasure'                 : '#react-select-5-input', // Unit of Measure dropdown
  };

  // Check if the dropdownType exists in the map
  const dropdownId = dropdownMap[dropdownType];
  if (!dropdownId) {
    throw new Error(`Dropdown type '${dropdownType}' is not recognized`);
  }

  cy.get(dropdownId).click();  // Open the dropdown
  cy.get('[role="option"]')
    .contains(option) // Find the option in the dropdown
    .click();         // Click the option to select
  
};
// Function to handle flow (Add, Update, Delete)
const handleFlow = (flowType, meterName, meterdescription) => {
  switch (flowType) {
    case 'Add':
      // Add    : #btn-action-Meter-0
      // Update : #btn-action-Meter-1 
      // delete : #btn-action-Meter-2
      cy.get('#btn-action-Meter-0')
        .should('be.visible')   
        .click();

      // Fill out the input meter name
      cy.get('input[name="meter_name"]')
        .type(meterName)
        .should('have.value', meterName);

          // Fill out the input meter description
      cy.get('input[name="meter_description"]')
        .type(meterdescription)
        .should('have.value', meterdescription);
      break;
    case 'Update':

        // Search for the meter name "SmartMeter_1234"
      cy.get('td')
        .contains(meterName)  
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
        .type('update'+ meterName)
        .should('have.value', 'update'+ meterName);

          // Fill out the input meter description
      cy.get('input[name="meter_description"]')
        .clear()
        .type( 'update' + meterdescription)
        .should('have.value', 'update' + meterdescription);
      break;
    case 'Delete':
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
        .type('update' + meterName) 
        .wait(1000); 

      // Step 2: Select the first matching option from the dropdown
      cy.get('.css-1nmdiq5-menu')  
        .contains('update' + meterName)  
        .click(); 

      // Step 3: Assert the selected value
      cy.get('.css-1dimb5e-singleValue')
        .should('have.text', 'update' + meterName); 
         
      break;
    default:
      throw new Error(`Flow type '${flowType}' is not recognized`);
  }
};
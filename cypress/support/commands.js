Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Jhonatan')
    cy.get('#lastName').type('Rodrigues')
    cy.get('#email').type('jhonatan@exemplo.com')
    cy.get('#open-text-area').type('teste')
    cy.contains('button', 'Enviar').click()

})

require('@cypress/xpath');


Cypress.Commands.add("login", (username, password) => {
    cy.get('[name="username"]').type(username)
    cy.get('[name="password"]').type(password)
    cy.get('[type="submit"]').click()
}
)
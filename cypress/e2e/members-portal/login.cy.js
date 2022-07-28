describe('members portal', () => {
  before(() => {
    cy.visit('https://ns-booking-dev.newshore.es/en-US/')
  })

  it('login to members portal', () => {
    cy.intercept('https://ns-booking-dev.newshore.es/en-us/members/profile/')
      .as('profilePageLoad')

    cy.findByText('Sign in').click()

    cy.get('.auth-popover_login').then(() => {
      cy.get('#emailLoginInput')
        .click()
        .type('paula@g.com')

      cy.get('#passwordLoginInput')
        .click()
        .type('Newshore2020*')
      
      cy.get('.ui-form_button-action.button').click()
    })

    cy.wait('@profilePageLoad')

    cy.location().should((loc) => {
      expect(loc.href).to.eq('https://ns-booking-dev.newshore.es/en-us/members/profile/')
    })
  })
})
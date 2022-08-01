import dayjs from "dayjs";

function removeRecentSearches($body) {
  if ($body.html().includes('recent-search_list')) {
    cy.get('.recent-search_item').each(($element) => {
      cy.wrap($element).within(() => {
        cy.get('.recent-search_item_action_button').click({ force: true })
      })
    })
  }
}

describe('one way basic booking', () => {
  before(() => {
    cy.visit('https://ns-booking-dev2.newshore.es/en-US/')
  })

  it('search journey eldoret to mombasa, in next to 2 days, 1 adult, basic economy', () => {
    cy.get("body").then(($body) => {
      removeRecentSearches($body)
    })

    cy.findByText('One way').click()
    cy.get('#originDiv').within(() => {
      cy.get('#originBtn').click({ force: true})
      cy.get('input').type('Kenya')
    })
    cy.get('#departureStationsListId').within(() => {
      cy.get('.station-control-list_item').first().click()
    })
    cy.findByPlaceholderText('Destination').click().type('Mombasa')
    cy.findByText('Mombasa').click()
    cy.findByText('Departure').click()
  
    const dateIn2Days = dayjs()
      .add(2, 'days')
      .format('D-M-YYYY')
  
    cy.get(`[aria-label="${dateIn2Days}"]`).click()
  
    cy.findByText('Confirm').click()
    cy.get('#searchButton').click()
  
    cy.findByText('From').click()
    cy.findByText('BASIC ECONOMY').click()

    cy.get('input[id^="acceptTermsInput"]').click()

    cy.get('.summary_total_list').within(() => {
      cy.findAllByText('Continue').click()
    })
  })
})


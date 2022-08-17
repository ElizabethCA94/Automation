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
    // home page
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
  
    const dateIn3Days = dayjs()
      .add(3, 'days')
      .format('D-M-YYYY')
  
    cy.get(`[aria-label="${dateIn3Days}"]`).click()
  
    cy.findByText('Confirm').click()
    cy.get('#searchButton').click()
  
    // selected flight
    cy.findByText('From').click()
    cy.findByText('BASIC ECONOMY').click()

    cy.get('input[id^="acceptTermsInput"]').click()

    cy.get('.summary_total_list').within(() => {
      cy.findAllByText('Continue').click()
    })

    // passengers page
    cy.get('input[id^="IdFirstName"]').click().type('Mario')

    cy.get('input[id^="IdLastName"]').click().type('Rios')

    cy.get('[id^=dateDay_IdDateBirth]').click()
    cy.get('[aria-labelledby^="labelId_dateDay_IdDateBirth"] li').first().click()

    cy.get('[id^=dateMonth_IdDateBirth]').click()
    cy.get('[aria-labelledby^="labelId_dateMonth_IdDateBirth"] li').first().click()

    cy.get('[id^=dateYear_IdDateBirth]').click()
    cy.get('[aria-labelledby^="labelId_dateYear_IdDateBirth"] li').eq(20).click()

    cy.get('button[id^=IdDocNationality]').click()
    cy.get('ul[aria-labelledby^="labelId_IdDocNationality"] li').first().click()

    cy.get('button[id^=IdDocType]').click()
    cy.get('ul[aria-labelledby^="labelId_IdDocType"] li').within(() => {
      cy.findAllByText('All Other Passports').click()
    })

    cy.get('button[id^=IdDocCountry]').click()
    cy.get('ul[aria-labelledby^="labelId_IdDocCountry"] li').first().click()

    cy.get('button[id^=dateDay_IdDocExpDate]').click()
    cy.get('ul[aria-labelledby^="labelId_dateDay_IdDocExpDate"] li').first().click()

    cy.get('button[id^=dateMonth_IdDocExpDate]').click()
    cy.get('ul[aria-labelledby^="labelId_dateMonth_IdDocExpDate"] li').first().click()

    cy.get('button[id^=dateYear_IdDocExpDate]').click()
    cy.get('ul[aria-labelledby^="labelId_dateYear_IdDocExpDate"] li').eq(4).click()

    cy.get('button[id^=phone_prefixPhoneInput').click()
    cy.get('ul[aria-labelledby^="labelId_phone_prefixPhoneInput"] li').first().click()

    cy.get('button[id^=countrySelect').click()
    cy.get('ul[aria-labelledby^="labelId_countrySelect"] li').first().click()

    cy.get('input[id^="IdDocNum"]').click().type('123456')
  
    cy.get('input[id^="checkbox-2"]').click()

    cy.get('input[id^="phone_phoneNumberInput"]').click().type('3819201220')

    cy.get('input[id^="email"]').click().type('e@e.com')
    cy.get('input[id^="streetAddress"]').click().type('Street 1')
    cy.get('input[id^="city"]').click().type('Nairobi')

    cy.intercept('GET', '**/booking/services').as('servicesPage')

    cy.get('.summary_total_list').within(() => {
      cy.findAllByText('Continue').click()
    })

    cy.wait('@servicesPage')

    // services page
    cy.get('.summary_total_list').within(() => {
      cy.findAllByText('Continue').click()
    })

    

    // seatmap page
    cy.get('.combined_summary_bar').within(() => {
      cy.findAllByText('Continue').click()
    })
    
  })
})


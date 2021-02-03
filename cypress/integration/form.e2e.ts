/// <reference types="Cypress" />
export default {}

context('Form', () => {

    beforeEach(() => {
        cy.visit('/')
    })

    it('Form should call api', () => {
        const submit = () => cy.get('[type="submit"]').click()
        cy.intercept({
            method: 'GET',
            path: /\api\/flights/
        }).as('getFlights')

        cy.get('[test-id="autocomplete-from"]').click()
        cy.get('.MuiAutocomplete-popper li[data-option-index="0"]').click()

        cy.get('[test-id="autocomplete-to"]').click()
        cy.get('.MuiAutocomplete-popper li[data-option-index="0"]').click()
        submit()

        cy.wait('@getFlights').then((res) => {
            expect(res.response?.statusCode).to.eq(200)
            expect(res.response?.body).to.have.property("data")
            expect(res.response?.body.data.length).to.be.greaterThan(0)
        })
    })
})

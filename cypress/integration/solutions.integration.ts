/// <reference types="Cypress" />
export default {}

context('Solution', () => {

    beforeEach(() => {
        cy.visit('/')
    })

    it('Submit form should produce solutions', () => {
        const submit = () => cy.get('[type="submit"]').click()
        cy.intercept({
            method: 'GET',
            path: /\api\/flights/,
        }, {
            fixture: 'flights200multiple.json'
        }).as('getFlights')

        cy.get('[test-id="autocomplete-from"]').click()
        cy.get('.MuiAutocomplete-popper li[data-option-index="0"]').click()

        cy.get('[test-id="autocomplete-to"]').click()
        cy.get('.MuiAutocomplete-popper li[data-option-index="0"]').click()
        submit()

        cy.get('[test-id="row-solution"]').its('length').then(lengthOfClassElements => {
            expect(lengthOfClassElements).eq(2)
        })
    })
})

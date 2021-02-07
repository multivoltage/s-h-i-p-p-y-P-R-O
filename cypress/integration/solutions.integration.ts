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

    it('Submit form should produce print solutions on UI', () => {
        const submit = () => cy.get('[type="submit"]').click()
        cy.intercept({
            method: 'GET',
            path: /\api\/flights/,
        }, {
            fixture: 'flights200Empty.json'
        }).as('getFlights')

        cy.get('[test-id="autocomplete-from"]').click()
        cy.get('.MuiAutocomplete-popper li[data-option-index="0"]').click()

        cy.get('[test-id="autocomplete-to"]').click()
        cy.get('.MuiAutocomplete-popper li[data-option-index="0"]').click()
        submit()

        cy.get('[test-id="row-solution"]').should("not.exist")
    })

    it('Submit form should sho popup in case of API error', () => {
        const submit = () => cy.get('[type="submit"]').click()
        cy.intercept({
            method: 'GET',
            path: /\api\/flights/,

        }, {
            statusCode: 400
        }).as('getFlights')

        cy.get('[test-id="autocomplete-from"]').click()
        cy.get('.MuiAutocomplete-popper li[data-option-index="0"]').click()

        cy.get('[test-id="autocomplete-to"]').click()
        cy.get('.MuiAutocomplete-popper li[data-option-index="0"]').click()
        submit()

        cy.get('[test-id="row-solution"]').should("not.exist")
        cy.get('.MuiSnackbar-root').should("be.visible")
    })
})

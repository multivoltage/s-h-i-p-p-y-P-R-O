/// <reference types="Cypress" />
export default {}

context('Form', () => {

    beforeEach(() => {
        cy.visit('/')
    })

    it('Print error message if submit when empty', () => {
        const submit = () => cy.get('[type="submit"]').click()
        submit()
        cy.get('[test-id="autocomplete-from"]').find('.MuiFormHelperText-root').should("be.visible")
        cy.get('[test-id="autocomplete-to"]').find('.MuiFormHelperText-root').should("be.visible")

        cy.get('[test-id="autocomplete-from"]').click()
        cy.get('.MuiAutocomplete-popper li[data-option-index="0"]').click()
        submit()
        cy.get('[test-id="autocomplete-from"]').find('.MuiFormHelperText-root').should('not.exist');
        cy.get('[test-id="autocomplete-to"]').click()
        cy.get('.MuiAutocomplete-popper li[data-option-index="0"]').click()
        submit()
        cy.get('[test-id="autocomplete-to"]').find('.MuiFormHelperText-root').should('not.exist');
    })

    it('Form should call api', () => {
        const submit = () => cy.get('[type="submit"]').click()
        cy.intercept({
            method: 'GET',
            path: /\api\/flights/,
        }, {
            fixture: 'flights200.json'
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

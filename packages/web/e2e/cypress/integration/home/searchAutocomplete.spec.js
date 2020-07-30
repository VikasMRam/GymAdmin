describe('Marketplace Home Page', () => {
  it('AutoComplete City Search', () => {
    // eslint-disable-next-line no-console
    // console.log('print config', Cypress.config());

    cy.visit('/');

    cy.contains('Find The Best Senior Living Near You');

    cy.get('input[class*=SearchBox__SearchTextBox]').last()
      .type('San Francisco, CA, USA');

    cy.get('div[class*=SearchBox__SearchSuggestion]')
      .should('have.length', 2)
      .contains('San Francisco')
      .click();

    cy.url().should('have.string', '/assisted-living/california/san-francisco');
  });
});

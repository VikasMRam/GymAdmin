describe('Marketplace Home Page', () => {
  it('AutoComplete City Search', () => {
    // eslint-disable-next-line no-console
    // console.log('print config', Cypress.config());

    cy.visit('/');

    cy.contains('Find The Best Assisted Living Near You');

    cy.get('div[class*=HomePage__SearchBoxWrapper]').within(() => {
      cy.get('input[class*=Input__StyledInput]')
        .type('San Francisco');
    });

    cy.get('div[class*=SearchBox__SuggestionsWrapper]')
      .contains('San Francisco')
      .click();

    cy.url().should('have.string', '/assisted-living/california/san-francisco');
  });
});

export const toSearchPage = (address) => {
  cy.server();
  cy.route('GET', '**/search?**').as('searchRequest');

  // Get Search Box Input
  cy.get('input[data-testid="search-box"]').type(address);

  cy.wait('@searchRequest');

  // Wait untill suggestions appear
  cy.get('div[class*=__SuggestionsWrapper]').contains(address, {
    timeout: 50000,
  });

  // Click Search Icon
  cy.get('button[data-testid="search-button"]').trigger('click');
};

export const toSearchPageFromCity = (cityName) => {
  cy.server();
  cy.route('GET', '**community-search?filter[city]**').as('communitySearch');
  cy.get('a h4')
    .contains(cityName)
    .click();
  cy.url().should('have.string', 'assisted-living');
};

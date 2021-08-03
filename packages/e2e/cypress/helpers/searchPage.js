export const toSearchPage = (address) => {
  cy.intercept('GET', '**/search/searchpage?filter**').as('searchResults');
  cy.intercept('GET', '**/search?**').as('searchRequest');
  // Get Search Box Input
  cy.get('nav').find('input[placeholder="Search by city, zip, community name"]').click().type(address);
  cy.wait('@searchRequest');
  // Wait untill suggestions appear
  cy.get('div[class*=__SuggestionsWrapper]').contains(address);
  // Click Search Icon
  cy.get('nav').find('input[placeholder="Search by city, zip, community name"]').parent().find('button')
    .click({ force: true });
};

export const toSearchPageFromCity = (cityName) => {
  cy.get('a h4')
    .contains(cityName)
    .click({ force: true });
  cy.url().should('have.string', 'assisted-living');
};

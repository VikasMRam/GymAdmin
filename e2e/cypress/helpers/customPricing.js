export const doCustomPricingFlow = (cy, data) => {
  const {
    communitySlug, name, phoneNumber, typeOfRoom, typeOfCare, medicaid,
  } = data;
  cy.get('button').contains('Let\'s Begin').click();

  cy.contains('Get your Pricing and Availability');

  cy.get('div[class*=BoxChoiceTile__StyledBox]').contains(typeOfRoom).click();

  cy.get('div[class*=BoxChoiceTile__StyledBox]').contains(typeOfCare).click();

  cy.get('div[class*=BoxChoiceTile__StyledBox]').contains(medicaid).click();

  cy.get('button').contains('Continue').click();

  cy.get('input[name="name"]').type(name);
  cy.get('input[name="phone"]').type(phoneNumber);

  cy.get('button').contains('Continue').click();

  cy.get('button').contains('Talk to an advisor').click();

  cy.get('button').contains('$2000 - $3000').click();

  cy.url().should('have.string', `/assisted-living/california/san-francisco/${communitySlug}`);
};

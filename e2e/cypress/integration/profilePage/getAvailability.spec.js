import { doCustomPricingFlow } from '../../helpers/customPricing';
import { assertUserActionsForGetAvailability } from '../../helpers/userActions';

function inputValuesAndAssert(cy) {
  const communitySlug = 'araville-residential-care-home-temp';
  const name = 'Pranesh Kumar';
  const phoneNumber = '9999999999';
  const email = 'pranesh@seniorly.com';
  const typeOfRoom = 'Suite';
  const typeOfCare = 'Medication Management';
  const medicaid = 'Yes';

  cy.visit(`/assisted-living/california/san-francisco/${communitySlug}`);

  cy.get('#availability input[name="email"]').type(email);

  cy.get('button').contains('Get Availability').click();

  const data = {
    communitySlug, name, phoneNumber, typeOfRoom, typeOfCare, medicaid, email,
  };

  doCustomPricingFlow(cy, data);

  cy.request({
    url: '/v0/platform/user-actions',
  })
    .then((response) => {
      cy.log('response', response);
      assertUserActionsForGetAvailability(response, data);
    });
}

describe('Marketplace Profile Page', () => {
  it('tests Get Availability Flow for Assisited Living Community in Mobile', () => {
    cy.viewport('iphone-6');

    inputValuesAndAssert(cy);
  });

  it('tests Get Availability Flow for Assisited Living Community in Tablet', () => {
    cy.viewport('ipad-2');

    inputValuesAndAssert(cy);
  });

  it('tests Get Availability Flow for Assisited Living Community in Laptop', () => {
    cy.viewport('macbook-13');

    inputValuesAndAssert(cy);
  });
});


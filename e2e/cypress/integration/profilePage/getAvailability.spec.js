import { doCustomPricingFlow } from './../../helpers/customPricing';
import { assertUserActionsForGetAvailability } from './../../helpers/userActions';

function inputValuesAndAssert(cy) {
  const communitySlug = 'buena-vista-manor-house';
  const name = 'Pranesh Kumar';
  const phoneNumber = '9999999999';
  const email = 'pranesh@seniorly.com';
  const typeOfRoom = 'Suite';
  const typeOfCare = 'Medication Management';
  const medicaid = 'Yes';

  // FIXME: Visiting / inorder to avoid GET user-actions 400 error
  cy.visit('/');

  cy.visit(`/assisted-living/california/san-francisco/${communitySlug}?experimentEvaluations=ProfileCTA_ButtonStyle:FullWidth,PricingCTA_Language:Detailed`);

  cy.get('button').contains('Get Detailed Pricing').click();

  const data = {
    communitySlug, name, phoneNumber, typeOfRoom, typeOfCare, medicaid, email,
  };

  doCustomPricingFlow(cy, data);

  cy
    .request({
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


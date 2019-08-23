import { doCustomPricingFlow } from './../../helpers/customPricing';
import { assertUserActionsForCustomPricing } from './../../helpers/userActions';

function inputValuesAndAssert(cy) {
  const communitySlug = 'buena-vista-manor-house';
  const name = 'Pranesh Kumar';
  const phoneNumber = '9999999999';
  const typeOfRoom = 'Suite';
  const typeOfCare = 'Medication Management';
  const medicaid = 'Yes';

  cy.visit(`/custom-pricing/${communitySlug}`);

  const data = {
    communitySlug, name, phoneNumber, typeOfRoom, typeOfCare, medicaid,
  };

  doCustomPricingFlow(cy, data);

  cy
    .request({
      url: '/v0/platform/user-actions',
    })
    .then((response) => {
      cy.log('response', response);
      assertUserActionsForCustomPricing(response, data);
    });
}

describe('Marketplace Profile Page', () => {
  it('tests Pricing Wizard for Assisited Living Community in Mobile', () => {
    cy.viewport('iphone-6');

    inputValuesAndAssert(cy);
  });

  it('tests Pricing Wizard for Assisited Living Community in Tablet', () => {
    cy.viewport('ipad-2');

    inputValuesAndAssert(cy);
  });

  it('tests Pricing Wizard for Assisited Living Community in Laptop', () => {
    cy.viewport('macbook-13');

    inputValuesAndAssert(cy);
  });
});

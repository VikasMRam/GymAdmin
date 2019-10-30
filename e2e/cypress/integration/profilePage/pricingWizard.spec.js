import { doCustomPricingFlow } from '../../helpers/customPricing';
import { assertUserActionsForCustomPricing } from '../../helpers/userActions';
import { responsive } from '../../helpers/tests';
import { TEST_COMMUNITY } from '../../constants/community';

describe('Marketplace Profile Page', () => {
  responsive((viewport) => {
    it('tests Pricing Wizard for Assisited Living Community in Mobile', () => {
      const name = 'Pranesh Kumar';
      const phoneNumber = '9999999999';
      const typeOfRoom = 'Suite';
      const typeOfCare = 'Medication Management';
      const medicaid = 'Yes';

      if (viewport === 'mobile' || viewport === 'tablet') {
        cy.visit(`/assisted-living/california/san-francisco/${TEST_COMMUNITY}`);
        cy.get('button').contains('Get Pricing').click();
      } else {
        // FIXME: Fix going to custom pricing on Request Info button click
        // cy.get('form[name="ConversionForm"] input[name="full_name"]').type(name);
        // cy.get('form[name="ConversionForm"] input[name="email"]').type(email);
        // cy.get('form[name="ConversionForm"] input[name="phone"]').type(phoneNumber);

        // cy.get('button').contains('Request Info').click();
        cy.visit(`/custom-pricing/${TEST_COMMUNITY}`);
      }

      // cy.url().should('include', `/custom-pricing/${communitySlug}`);

      const data = {
        communitySlug: TEST_COMMUNITY, name, phoneNumber, typeOfRoom, typeOfCare, medicaid,
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
    });
  });
});

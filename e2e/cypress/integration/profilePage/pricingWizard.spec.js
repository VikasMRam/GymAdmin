import { doCustomPricingTalkToAdvisorFlow } from '../../helpers/customPricing';
import { assertUserActionsForCustomPricing } from '../../helpers/userActions';
import { responsive, waitForHydration } from '../../helpers/tests';
import { TEST_COMMUNITY } from '../../constants/community';

import randomUser from 'e2e/helpers/randomUser';

describe('Marketplace Profile Page', () => {
  responsive((viewport) => {
    it('tests Pricing Wizard for Assisited Living Community in Mobile', () => {
      const { name, phone } = randomUser();

      const typeOfRoom = 'Suite';
      const typeOfCare = 'Medication Management';
      const medicaid = 'Yes';

      if (viewport === 'mobile' || viewport === 'tablet') {
        cy.visit(`/assisted-living/california/san-francisco/${TEST_COMMUNITY}`);

        waitForHydration(cy.get('button').contains('Get Pricing')).click();
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
        communitySlug: TEST_COMMUNITY, name, phone, typeOfRoom, typeOfCare, medicaid,
      };

      doCustomPricingTalkToAdvisorFlow(cy, data);

      cy.getUser().then((userData) => {
        assertUserActionsForCustomPricing(userData, data);
      });
    });
  });
});

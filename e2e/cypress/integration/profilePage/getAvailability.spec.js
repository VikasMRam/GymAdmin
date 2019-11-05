import { doCustomPricingFlow } from '../../helpers/customPricing';
import { assertUserActionsForGetAvailability } from '../../helpers/userActions';
import {responsive, waitForHydration} from '../../helpers/tests';
import { TEST_COMMUNITY } from '../../constants/community';

describe('Marketplace Profile Page', () => {
  responsive(() => {
    it('tests Get Availability Flow for Assisited Living Community', () => {
      const communitySlug = TEST_COMMUNITY;
      const name = 'Pranesh Kumar';
      const phoneNumber = '9999999999';
      const email = 'pranesh@seniorly.com';
      const typeOfRoom = 'Suite';
      const typeOfCare = 'Medication Management';
      const medicaid = 'Yes';

      cy.visit(`/assisted-living/california/san-francisco/${communitySlug}`);

      waitForHydration();
      cy.get('button').contains('Get Detailed Pricing').click();

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
    });
  });
});


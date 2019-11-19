import { doCustomPricingFlow } from '../../helpers/customPricing';
import { assertUserActionsForGetAvailability } from '../../helpers/userActions';
import { responsive, waitForHydration } from '../../helpers/tests';
import { TEST_COMMUNITY } from '../../constants/community';
import randomUser from '../../helpers/randomUser';

describe('Marketplace Profile Page', () => {
  responsive(() => {
    it('tests Get Availability Flow for Assisited Living Community', () => {
      const communitySlug = TEST_COMMUNITY;
      const { name, phone, email } = randomUser();
      const typeOfRoom = 'Suite';
      const typeOfCare = 'Medication Management';
      const medicaid = 'Yes';

      cy.visit(`/assisted-living/california/san-francisco/${communitySlug}`);

      waitForHydration(cy.get('button').contains('Get Detailed Pricing')).click();

      const data = {
        communitySlug, name, phone, typeOfRoom, typeOfCare, medicaid, email,
      };

      doCustomPricingFlow(cy, data);

      cy.getUser().then((userData) => {
        assertUserActionsForGetAvailability(userData, data);
      });
    });
  });
});


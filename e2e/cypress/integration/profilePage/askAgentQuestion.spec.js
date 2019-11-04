import { doAskAgentQuestionFlow } from '../../helpers/askAgentQuestion';
import { assertUserActionsForAskAgentQuestion } from '../../helpers/userActions';
import { responsive } from '../../helpers/tests';
import { TEST_COMMUNITY } from '../../constants/community';

describe('Marketplace Profile Page', () => {
  responsive(() => {
    it('tests care services Ask Agent Question for Assisited Living Community', () => {
      const communitySlug = TEST_COMMUNITY;
      const name = 'Pranesh Kumar';
      const phoneNumber = '9999999999';
      const question = 'test question care services';

      cy.visit(`/assisted-living/california/san-francisco/${communitySlug}`);

      cy.get('button').contains('Ask About Care Services').click();

      const data = { question, name, phone: phoneNumber, communitySlug };
      doAskAgentQuestionFlow(cy, data);

      cy.request({
        url: '/v0/platform/user-actions',
      })
        .then((response) => {
          cy.log('response', response);
          assertUserActionsForAskAgentQuestion(response, data);
        });
    });

    it('tests amenities Ask Agent Question for Assisited Living Community', () => {
      const communitySlug = TEST_COMMUNITY;
      const name = 'Pranesh Kumar';
      const phoneNumber = '9999999999';
      const question = 'test question amenities';

      cy.visit(`/assisted-living/california/san-francisco/${communitySlug}`);

      cy.get('button').contains('Ask About Amenities').click();

      const data = { question, name, phone: phoneNumber, communitySlug };
      doAskAgentQuestionFlow(cy, data);

      cy.request({
        url: '/v0/platform/user-actions',
      })
        .then((response) => {
          cy.log('response', response);
          assertUserActionsForAskAgentQuestion(response, data);
        });
    });
  });
});


import { responsive, select, getSelector } from '../../helpers/tests';
import buildEntity from '../../helpers/buildEntity';

describe('Review Community', () => {
  let community;

  beforeEach(() => {
    cy.server();

    cy.fixture('community-rhoda').then((response) => {
      community = buildEntity(response);
    });
  });

  responsive(() => {
    it('should leave a review', () => {
      cy.route('POST', '**/ratings').as('postRatings');
      cy.route('POST', '**/uuid-actions').as('postUuidActions');

      cy.visit(`/assisted-living/california/san-francisco/${community.id}`);

      cy.get('button').contains('Write a Review').click();

      const header = select('.ReactModal h2').contains(`Write a review for ${community.name}`);
      cy.get(getSelector('.ReactModal h2 .Rating.Star :last-child')).click();
      header.parent().get('textarea[name="comments"]').type('my comments');

      let rateId;

      cy.wait('@postRatings').then(async (xhr) => {
        expect(xhr.status).to.equal(200);
        expect(xhr.requestBody).to.deep.equal({
          communitySlug: 'rhoda-goldman-plaza',
          comments: 'my comments',
          value: 5,
        });
        const responseText = await xhr.response.body.text();
        const response = JSON.parse(responseText);
        rateId = response.id;
      });

      cy.wait('@postUuidActions').then((xhr) => {
        expect(xhr.requestBody).to.deep.equal({
          data: {
            type: 'UUIDAction',
            attributes: {
              actionInfo: {
                slug: community.id,
                entityType: 'Community',
                rateId,
                ratedValue: 5,
              },
              actionPage: `/assisted-living/california/san-francisco/${community.id}`,
              actionType: 'profileRating',
            },
          },
        });
      });

      cy.get('.Modal.Body .Thankyou').contains('Your review has been submitted for approval').should('exist');
    });
  });
});

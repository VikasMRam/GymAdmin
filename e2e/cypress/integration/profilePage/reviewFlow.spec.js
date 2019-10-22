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

  const portal = selector => select(`.ReactModalPortal ${selector}`);

  responsive(() => {
    it('should leave a review', () => {
      cy.route('POST', '**/ratings').as('postRatings');
      cy.route('POST', '**/uuid-actions').as('postUuidActions');

      cy.visit(`/assisted-living/california/san-francisco/${community.id}`);

      cy.wait('@postUuidActions');

      cy.get('button').contains('Write a Review').click();

      portal('h2').contains(`Write a review for ${community.name}`).should('exist');
      portal('.Rating.Star:last-child').click();
      portal('textarea[name="comments"]').type('my comments');
      portal('input[name="name"]').type('Fonz');
      portal('input[name="email"]').type('fonz@seniorly.com');
      portal('button[type="submit"]').click();

      let ratedId;

      cy.wait('@postRatings').then(async (xhr) => {
        expect(xhr.status).to.equal(200);
        expect(xhr.requestBody).to.deep.equal({
          communitySlug: community.id,
          comments: 'my comments',
          email: 'fonz@seniorly.com',
          name: 'Fonz',
          value: 5,
        });
        const responseText = await xhr.response.body.text();
        const response = JSON.parse(responseText);
        ratedId = response.data.id;
      });

      cy.wait('@postUuidActions').then((xhr) => {
        expect(xhr.requestBody).to.deep.equal({
          data: {
            type: 'UUIDAction',
            attributes: {
              actionInfo: {
                slug: community.id,
                entityType: 'Community',
                ratedId,
                ratedValue: 5,
                email: 'fonz@seniorly.com',
                name: 'Fonz',
              },
              actionPage: `/assisted-living/california/san-francisco/${community.id}`,
              actionType: 'profileRating',
            },
          },
        });
      });

      portal('.Modal.Body .Thankyou').contains('Your review has been submitted for approval').should('exist');
    });
  });
});

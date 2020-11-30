import { responsive, select, waitForHydration } from '../../helpers/tests';
import { toJson } from '../../helpers/request';
import { TEST_COMMUNITY } from '../../constants/community';

const randHash = () => Math.random().toString(36).substring(7);

describe('Review Community', () => {
  let community;
  let user;

  beforeEach(() => {
    cy.server();

    if (!community) {
      cy.getCommunity(TEST_COMMUNITY).then((response) => {
        community = response;
      });
    }

    if (!user) {
      cy.fixture('user-slytest-admin').then((response) => {
        user = response;
      });
    }
  });

  const portal = selector => select(`.ReactModalPortal ${selector}`);

  // nth-of-type 2 because it has already an element in position 1 that is not a review
  const lastReview = selector => select(`.EntityReview__Wrapper:nth-of-type(2) ${selector}`);

  responsive(() => {
    it('should leave a review', () => {
      cy.route('POST', '**/ratings').as('postRatings');
      cy.route('POST', '**/uuid-actions').as('postUuidActions');

      cy.visit(`/assisted-living/california/san-francisco/${community.id}`);

      cy.wait('@postUuidActions');

      waitForHydration(cy.get('button').contains('Write a Review')).click();

      const commentText = `my comments ${randHash()}`;

      waitForHydration(portal('h2').contains(`Write a review for ${community.name}`).should('exist'));
      portal('.Rating.Star:nth-of-type(4)').click();
      portal('textarea[name="comments"]').type(commentText);
      portal('input[name="name"]').type('Fonz');
      portal('input[name="email"]').type('fonz@seniorly.com');
      portal('button[type="submit"]').click();

      let ratedId;

      cy.wait('@postRatings').then(async (xhr) => {
        expect(xhr.status).to.equal(200);
        expect(xhr.requestBody).to.deep.equal({
          communitySlug: community.id,
          comments: commentText,
          email: 'fonz@seniorly.com',
          name: 'Fonz',
          value: 4,
        });
        const response = await toJson(xhr.response);
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
                ratedValue: 4,
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

      portal('#close').click();

      cy.wait(3000);

      cy.request('POST', '/v0/platform/auth/login', user)
        .then(() => cy.visit(`/rating/${ratedId}/approve`));


      cy.get('div[class*="AuthContainer__ModalBody"]').within(() => {
        cy.get('input[name="email"]').type('slytest+admin@seniorly.com');
        cy.get('input[name="password"]').type('nopassword');
        cy.get('button').contains('Log in').click();
      });


      cy.get('div').contains('Status: Success').should('exist');
      cy.request('DELETE', '/v0/platform/auth/logout');
      cy.visit(`/assisted-living/california/san-francisco/${community.id}`);

      const date = new Date();
      const month = date.toLocaleString('en-GB', { month: 'long' });
      const year = date.getFullYear();

      lastReview('.CommentBlock').contains(commentText).should('exist');
      lastReview('.BottomSection > :first-child').contains('By Fonz').should('exist');
      lastReview('.BottomSection > :last-child').contains(`${month} ${year}`).should('exist');
    });
  });
});
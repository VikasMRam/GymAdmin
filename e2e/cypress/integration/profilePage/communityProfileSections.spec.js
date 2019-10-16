import { responsive, select } from '../../helpers/tests';
import buildEntity from '../../helpers/buildEntity';

describe('Community Profile Sections', () => {
  let data;

  beforeEach(() => {
    cy.fixture('community-rhoda').then((response) => {
      data = buildEntity(response);
    });
  });

  responsive(() => {
    it('Should see details', () => {
      cy.visit(`/assisted-living/california/san-francisco/${data.id}`);

      cy.get('h1').contains(data.name).its('length').should('be', 1);

      const { line1, city, state, zip } = data.address;

      cy.get('h3').should(($h3) => {
        const address = `${line1}, ${city}, ${state} ${zip}`;
        expect($h3.first().text().replace(/\s+/g, ' ')).to.equal(address);
      });

      select('#concierge-number').should(($div) => {
        expect($div.text().replace(/[^\d]/g, '')).to.equal(data.twilioNumber.numbers[0].toString());
      });

      select('.CommunityPricingAndRating').should('contain', data.propInfo.ratesText)

      const rating = data.propRatings.reviewsValue.toFixed(1).replace(/\.0+$/, '');
      select('.CommunityPricingAndRating').should('contain', rating);
    });

    it.only('should be able to share', () => {
      cy.server();

      cy.route('POST', '**/user-shares').as('postUserShares');

      cy.visit(`/assisted-living/california/san-francisco/${data.id}`);
      cy.get('button').contains('Share').click();
      select('.ReactModal', 'h2').contains('Share this community').should('exist')

      cy.get('form input[name="to"]').type('fonz@seniorly.com');
      cy.get('form input[name="from"]').type('fonz@botverse.com');
      cy.get('form textarea[name="message"]').type('check out this property');

      cy.get('form button').contains('Send').click();

      cy.wait('@postUserShares').then(async xhr => {
        const text = await xhr.response.body.text();
        const json = JSON.parse(text);
        // expect(json).toEqual({
        //
        // });
      });

      select('.Notifications').contains('Community has been shared').should('exist');
    });
  });
});

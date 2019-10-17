import { responsive, select } from '../../helpers/tests';
import buildEntity from '../../helpers/buildEntity';

const randHash = () => Math.random().toString(36).substring(7);

describe('Community Profile Sections', () => {
  let data;

  beforeEach(() => {
    cy.server();

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

    it('should be able to share', () => {
      cy.route('POST', '**/user-shares').as('postUserShares');

      cy.visit(`/assisted-living/california/san-francisco/${data.id}`);
      cy.get('button').contains('Share').click();
      select('.ReactModal h2').contains('Share this community').should('exist')

      cy.get('form input[name="to"]').type('fonz@seniorly.com');
      cy.get('form input[name="from"]').type('fonz@botverse.com');
      cy.get('form textarea[name="message"]').type('check out this property');

      cy.get('form button').contains('Send').click();

      cy.wait('@postUserShares').then((xhr) => {
        expect(xhr.status).to.equal(200);
        expect(xhr.requestBody).to.deep.equal({
          toEmails: [
            'fonz@seniorly.com',
          ],
          message: 'check out this property',
          entitySlug: 'rhoda-goldman-plaza',
          entityType: 'Community',
          fromEmail: 'fonz@botverse.com',
        });
      });

      select('.Notifications').contains('Community has been shared').should('exist');
    });

    it.only('should be able to save and remove community', () => {
      let userSave;

      cy.route('POST', '**/user-saves').as('postUserSaves');
      cy.route('PATCH', '**/user-saves/*').as('patchUserSaves');

      cy.visit(`/assisted-living/california/san-francisco/${data.id}`);

      cy.get('button').contains('Save').click();

      cy.registerWithEmailFlow(`fonz+e2e+${randHash()}@seniorly.com`, 'nopassword');

      cy.wait('@postUserSaves').then(async (xhr) => {
        expect(xhr.status).to.equal(200);
        expect(xhr.requestBody).to.deep.equal({
          entitySlug: data.id,
          entityType: 'Community',
        });
        const responseText = await xhr.response.body.text();
        const response = JSON.parse(responseText);
        userSave = buildEntity(response);
        expect(userSave.entitySlug).to.equal(data.id);
      });

      cy.get('textarea[name="note"]').type('additional notes');

      cy.get('button[type="submit"]').contains('Save Note').click();

      cy.wait('@patchUserSaves').then((xhr) => {
        expect(xhr.url).to.contain(userSave.id);
        expect(xhr.status).to.equal(200);
        expect(xhr.requestBody).to.deep.equal({
          note: 'additional notes',
        });
      });

      cy.get('h2').contains('Community Saved!').should.exist;

      select('.CommunitySaved button').contains('Done').click();

      select('.CommunitySaved h2').should('not.exist');
    });
  });
});

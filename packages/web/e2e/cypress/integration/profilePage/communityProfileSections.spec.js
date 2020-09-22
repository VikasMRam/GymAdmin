import { responsive, select, waitForHydration } from '../../helpers/tests';
import { toJson } from '../../helpers/request';
import { TEST_COMMUNITY } from '../../constants/community';

import { formatMoney } from 'sly/web/services/helpers/numbers';
import { normalizeResponse } from 'sly/web/services/api';

const randHash = () => Math.random().toString(36).substring(7);

export const buildEstimatedPriceList = (community) => {
  const {
    sharedSuiteRate,
    privateSuiteRate,
    studioApartmentRate,
    oneBedroomApartmentRate,
    twoBedroomApartmentRate,
  } = community.propInfo;

  const priceList = [];
  sharedSuiteRate && sharedSuiteRate !== 'N/A' && priceList.push({ label: 'Shared Suite', value: sharedSuiteRate });
  privateSuiteRate && privateSuiteRate !== 'N/A' && priceList.push({ label: 'Private Suite', value: privateSuiteRate });
  studioApartmentRate && studioApartmentRate !== 'N/A' && priceList.push({ label: 'Studio Apartment', value: studioApartmentRate });
  oneBedroomApartmentRate && oneBedroomApartmentRate !== 'N/A' && priceList.push({ label: 'One Bedroom Apartment', value: oneBedroomApartmentRate });
  twoBedroomApartmentRate && twoBedroomApartmentRate !== 'N/A' && priceList.push({ label: 'Two Bedroom Apartment', value: twoBedroomApartmentRate });

  return priceList;
};


describe('Community Profile Sections', () => {
  let community;

  beforeEach(() => {
    cy.server();
    cy.route('POST', '**/uuid-actions').as('postUuidActions');

    cy.getCommunity(TEST_COMMUNITY).then((response) => {
      community = response;
    });
  });

  responsive(() => {
    it('Should see community details', () => {
      cy.visit(`/assisted-living/california/san-francisco/${community.id}`);

      cy.wait('@postUuidActions').then((xhr) => {
        expect(xhr.requestBody).to.deep.equal({
          data: {
            type: 'UUIDAction',
            attributes: {
              actionType: 'profileViewed',
              actionPage: `/assisted-living/california/san-francisco/${community.id}`,
              actionInfo: {
                slug: community.id,
              },
            },
          },
        });
      });
      const rating = community.propRatings.reviewsValue.toFixed(1).replace(/\.0+$/, '');

      waitForHydration(cy.get('div[class*=CommunityDetailPage__StyledCommunitySummary]')).within(() => {
        const {
          line1, city, state, zip,
        } = community.address;

        cy.get('h2').should(($h3) => {
          const address = `${line1}, ${city}, ${state} ${zip}`;
          expect($h3.first().text().replace(/\s+/g, ' ')).to.equal(address);
        });
      });

      select('.CommunityPricing__StyledCommunityPricingWrapper').should('contain', formatMoney(community.startingRate));
      select('.CommunityRating__RatingValue').contains(rating);
      cy.get('a[class*=GetCommunityPricingAndAvailability').contains('Get Pricing and Availability').click({ force: true });
      cy.url().should('include', `wizards/assessment/community/${community.id}`);
    });

    it('should show pricing section', () => {
      cy.visit(`/assisted-living/california/san-francisco/${community.id}`);
      cy.wait('@postUuidActions');

      const pricingContent = cy.get('h3').contains(`Pricing at ${community.name}`).parent();

      pricingContent.should('contain', formatMoney(community.startingRate));

      buildEstimatedPriceList(community).forEach(({ label, value }) => {
        pricingContent.get('tbody td').contains(label).next().should('contain', formatMoney(value));
      });
      cy.get('section[id*="pricing-and-floor-plans"]').contains('Get Pricing and Availability')
        .click();
      cy.url().should('include', `wizards/assessment/community/${community.id}`);
    });


    it('should show care services section', () => {
      cy.visit(`/assisted-living/california/san-francisco/${community.id}`);
      cy.wait('@postUuidActions');

      cy.get('h3').contains(`Care Services at ${community.name}`).parent().within(() => {
        cy.wrap(community.propInfo.careServices).each((service) => {
          cy.get('> h3 + div > div > div > div > div + div').contains(service).should('exist');
        });
      });
    });


    it('should show amenities section', () => {
      cy.visit(`/assisted-living/california/san-francisco/${community.id}`);
      cy.wait('@postUuidActions');

      const careContent = select('h3').contains(`Amenities at ${community.name}`).parent().next();
      [
        ...community.propInfo.personalSpace,
        ...community.propInfo.nonCareServices,
      ].forEach((service) => {
        careContent.get('div').contains(service).should('exist');
      });
    });


    it('should be able to share', () => {
      cy.route('POST', '**/user-shares').as('postUserShares');

      cy.visit(`/assisted-living/california/san-francisco/${community.id}`);

      waitForHydration(cy.get('button').contains('Share')).click({ force: true });
      select('.ReactModal').contains('Share this community').should('exist');

      cy.get('form input[name="to"]').type('inchara@seniorly.com');
      cy.get('form input[name="from"]').type('inchara@botverse.com');
      cy.get('form textarea[name="message"]').type('check out this property');

      cy.get('form button').contains('Send').click();

      cy.wait('@postUserShares').then((xhr) => {
        expect(xhr.status).to.equal(200);
        expect(xhr.requestBody).to.deep.equal({
          toEmails: [
            'inchara@seniorly.com',
          ],
          message: 'check out this property',
          entitySlug: community.id,
          entityType: 'Community',
          fromEmail: 'inchara@botverse.com',
        });
      });

      select('.Notifications').contains('Community has been shared').should('exist');
    });


    it('should be able to save and remove community', () => {
      let userSave;

      cy.route('POST', '**/user-saves').as('postUserSaves');
      cy.route('PATCH', '**/user-saves/*').as('patchUserSaves');

      const rand = randHash();
      cy.visit(`/assisted-living/california/san-francisco/${community.id}`);
      cy.registerWithEmail(`fonz+e2e+${rand}@seniorly.com`, 'nopassword');

      waitForHydration(cy.get('button').contains('Favorite')).click({ force: true });
      cy.get('form input[label*=Email]').last().type(`fonz+e2e+${rand}@seniorly.com`);
      cy.get('form input[id*=password]').last().type('nopassword');
      cy.get('form button[type*=submit]').contains('Log in').click();


      cy.wait('@postUserSaves').then(async (xhr) => {
        expect(xhr.status).to.equal(200);
        expect(xhr.requestBody).to.deep.equal({
          entitySlug: community.id,
          entityType: 'Community',
        });
        const response = await toJson(xhr.response);
        userSave = normalizeResponse(response);
        expect(userSave.entitySlug).to.equal(community.id);
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

      cy.contains('h3', 'Community Saved!').should('exist');

      select('.CommunitySaved button').contains('Done').click();

      select('.CommunitySaved h3').should('not.exist');
    });
  });
});

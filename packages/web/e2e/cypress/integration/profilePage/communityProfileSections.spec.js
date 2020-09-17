import { responsive, select, waitForHydration } from '../../helpers/tests';
import { toJson } from '../../helpers/request';
import { TEST_COMMUNITY } from '../../constants/community';
import randomUser from '../../helpers/randomUser';

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


  function confirmationRecieved() {
    waitForHydration(cy.get('div[class*=Thankyou__Wrapper]')).within(() => {
      cy.get('h2').contains('Success');
      cy.get('div[class*=Thankyou__StyledBlock]').contains('Your request has been sent and we will connect with you shortly.');
      cy.get('button').contains('Finish').click();
    });
  }

  function verifyagentaskQuestion(community, name, phone, email) {
    cy.wait('@postUuidActions').then((xhr) => {
      const uuidAction = {
        data: {
          type: 'UUIDAction',
          attributes: {
            actionType: 'agentAskQuestions',
            actionPage: `/assisted-living/california/san-francisco/${community.id}`,
            actionInfo: {
              email,
              slug: community.id,
              question: 'my message',
              entityType: 'Community',
              name,
              phone,
            },
          },
        },
      };
      expect(xhr.requestBody).to.deep.equal(uuidAction);
    });
  }

  function submitForm() {
    const { name, phone, email } = randomUser();
    const [fname, lname] = name.split(' ');

    select('form input[id*=firstName]').type(fname);
    select('form input[id*=lastName]').type(lname);
    select('form input[id*=phone]').type(phone);
    select('form input[id*=email]').last().type(email);
    select('form textarea[id*=message]').type('{selectall}{del}my message');
    select('form button[type=submit]').contains('Send').click();
    verifyagentaskQuestion(community, name, phone, email);
  }

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

    it('should show and request pricing', () => {
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


    it('should show and request care services', () => {
      cy.visit(`/assisted-living/california/san-francisco/${community.id}`);
      cy.wait('@postUuidActions');

      cy.get('h3').contains(`Care Services at ${community.name}`).parent().within(() => {
        cy.wrap(community.propInfo.careServices).each((service) => {
          cy.get('> h3 + div > div > div > div > div + div').contains(service).should('exist');
        });
        waitForHydration(cy.get('> h3 + div ~ div button').contains('Ask About Care Services')).click();
      });
      submitForm();
      confirmationRecieved();
    });


    it('should show and request amenities', () => {
      cy.visit(`/assisted-living/california/san-francisco/${community.id}`);
      cy.wait('@postUuidActions');

      const careContent = select('h3').contains(`Amenities at ${community.name}`).parent().next();
      [
        ...community.propInfo.personalSpace,
        ...community.propInfo.nonCareServices,
      ].forEach((service) => {
        careContent.get('div').contains(service).should('exist');
      });

      waitForHydration(careContent.get('button').contains('Ask About Amenities')).click();
      submitForm();
      confirmationRecieved();
    });


    it.skip('should be able to share', () => {
      cy.route('POST', '**/user-shares').as('postUserShares');

      cy.visit(`/assisted-living/california/san-francisco/${community.id}`);

      waitForHydration(cy.get('button').contains('Share')).click({ force: true });
      select('.ReactModal').contains('Share this community').should('exist');

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
          entitySlug: community.id,
          entityType: 'Community',
          fromEmail: 'fonz@botverse.com',
        });
      });

      select('.Notifications').contains('Community has been shared').should('exist');
    });

    it.skip('should be able to save and remove community', () => {
      let userSave;

      cy.route('POST', '**/user-saves').as('postUserSaves');
      cy.route('PATCH', '**/user-saves/*').as('patchUserSaves');

      cy.registerWithEmail(`fonz+e2e+${randHash()}@seniorly.com`, 'nopassword');

      cy.visit(`/assisted-living/california/san-francisco/${community.id}`);

      waitForHydration(cy.get('button').contains('Favorite')).click({ force: true });

      cy.get('div[class*="AuthContainer__ModalBody"]').within(() => {
        cy.get('input[name="email"]').type('slytest+admin@seniorly.com');
        cy.get('input[name="password"]').type('nopassword');
        cy.get('button').contains('Log in').click();
      });

      cy.reload();

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

      cy.contains('h2', 'Community Saved!').should('exist');

      select('.CommunitySaved button').contains('Done').click();

      select('.CommunitySaved h2').should('not.exist');
    });
  });
});

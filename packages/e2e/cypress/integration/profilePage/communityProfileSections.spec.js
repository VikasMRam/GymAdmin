// eslint-disable-next-line spaced-comment
/// <reference types="Cypress" />


import { responsive, select, waitForHydration } from '../../helpers/tests';
import { toJson } from '../../helpers/request';
import { PROFILE_TEST_COMMUNITY, ServicesAmenitiesFilters } from '../../constants/community';

import { formatMoney } from 'sly/web/services/helpers/numbers';
import { normalizeResponse } from 'sly/web/services/api';
import * as communityPage from './comProfPage';

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
  studioApartmentRate && studioApartmentRate !== 'N/A' && priceList.push({ label: 'Studio', value: studioApartmentRate });
  oneBedroomApartmentRate && oneBedroomApartmentRate !== 'N/A' && priceList.push({ label: 'One Bedroom', value: oneBedroomApartmentRate });
  twoBedroomApartmentRate && twoBedroomApartmentRate !== 'N/A' && priceList.push({ label: 'Two Bedroom', value: twoBedroomApartmentRate });

  return priceList;
};


describe('Community Profile Sections', () => {
  let community;
  const retries = 10;

  beforeEach(() => {
    Cypress.on('uncaught:exception', () => {
      // returning false here prevents Cypress from
      // failing the test
      return false;
    });

    cy.clearCookie('sly_sid', 'sly_uuid', 'sly-session');
    cy.server();
    cy.route('POST', '**/uuid-actions').as('postUuidActions');
    cy.route('GET', '**/users/me').as('getUser');
    cy.route('GET', '**/uuid-auxes/me').as('getUuid');
    let attempts = 0;
    while (!community?.id && attempts < retries) {
      // eslint-disable-next-line no-loop-func
      cy.getCommunity(PROFILE_TEST_COMMUNITY).then((response) => {
        community = response;
      });
      // eslint-disable-next-line no-loop-func
      attempts++;
    }

    Cypress.Commands.add('login', () => {
      cy.get('button').then(($a) => {
        if ($a.text().includes('Log In')) {
          waitForHydration(cy.get('div[class*=Header__HeaderItems]').contains('Log In')).click({ force: true });
          const rand = randHash();
          cy.registerWithEmail(`fonz+e2e+${rand}@seniorly.com`, 'nopassword');
          waitForHydration(cy.get('form input[name="email"]')).type(`fonz+e2e+${rand}@seniorly.com`).should('have.value', `fonz+e2e+${rand}@seniorly.com`);
          waitForHydration(cy.get('form input[name="password"]')).type('nopassword').should('have.value', 'nopassword');
          waitForHydration(cy.get('button[type="submit"]').contains('Log in')).click();
        }
      });
    });

    Cypress.Commands.add('adminLogin', () => {
      cy.get('button').then(($a) => {
        if ($a.text().includes('Log In')) {
          cy.wait('@getUser');
          cy.wait('@getUuid');
          waitForHydration(cy.get('div[class*=Header__HeaderItems]').contains('Log In')).click({ force: true });
          waitForHydration(cy.get('form input[name="email"]')).type('slytest+admin@seniorly.com');
          waitForHydration(cy.get('form input[name="password"]')).type('nopassword');
          waitForHydration(cy.get('button[type="submit"]').contains('Log in')).click({ force: true });
        }
      });
    });
  });

  // responsive(() => {
  //   it('Should see community details', () => {
  //     cy.visit(`/assisted-living/california/san-francisco/${community.id}`);
  //     cy.wait('@postUuidActions').then((xhr) => {
  //       expect(xhr.requestBody).to.deep.equal({
  //         data: {
  //           type: 'UUIDAction',
  //           attributes: {
  //             actionType: 'profileViewed',
  //             actionPage: `/assisted-living/california/san-francisco/${community.id}`,
  //             actionInfo: {
  //               slug: community.id,
  //             },
  //           },
  //         },
  //       });
  //     });
  //     const rating = community.propRatings.reviewsValue.toFixed(1).replace(/\.0+$/, '');
  //
  //     waitForHydration(cy.get('div[class*=CommunityDetailPage__StyledCommunitySummary]')).within(() => {
  //       const {
  //         line1, city, state, zip,
  //       } = community.address;
  //
  //       cy.get('h2').should(($h3) => {
  //         const address = `${line1}, ${city}, ${state} ${zip}`;
  //         expect($h3.first().text().replace(/\s+/g, ' ')).to.equal(address);
  //       });
  //     });
  //
  //     select('.CommunityPricing__StyledCommunityPricingWrapper').should('contain', formatMoney(community.startingRate));
  //     select('.CommunityRating__StyledRating').parent().contains(rating);
  //     cy.get('[data-buttonid="GetCommunityPricingAndAvailability"]').contains('Get Pricing and Availability').click({ force: true });
  //     cy.url().should('include', `wizards/assessment/community/${community.id}`);
  //   });
  //
  //   it('should show pricing section', () => {
  //     cy.visit(`/assisted-living/california/san-francisco/${community.id}`);
  //     cy.wait('@postUuidActions');
  //     const pricingContent = cy.get('h3').contains(`Pricing at ${community.name}`).parent();
  //
  //     pricingContent.should('contain', formatMoney(community.startingRate));
  //
  //     buildEstimatedPriceList(community).forEach(({ label, value }) => {
  //       pricingContent.get('tbody td').contains(label).next().should('contain', formatMoney(value));
  //     });
  //     cy.wait('@getUser');
  //     cy.get('section[id*="pricing-and-floor-plans"]').contains('Get Pricing and Availability')
  //       .click();
  //     cy.url().should('include', `wizards/assessment/community/${community.id}`);
  //   });
  //
  //
  //   it('should show care services section', () => {
  //     cy.visit(`/assisted-living/california/san-francisco/${community.id}`);
  //     cy.wait('@postUuidActions');
  //     waitForHydration(cy.get('h3').contains('Services and Amenities').parent()).within(() => {
  //       waitForHydration(cy.get('div').contains('Care services').parent())
  //         .within(() => {
  //           cy.wrap(community.propInfo.careServices).each((service) => {
  //             if (ServicesAmenitiesFilters.careServices.includes(service.toLowerCase())) {
  //               waitForHydration(cy.get('> div > div > div + div').contains(service, { matchCase: false })).should('exist');
  //             }
  //           });
  //         });
  //     });
  //   });
  //
  //   it('should show non-care services section', () => {
  //     cy.visit(`/assisted-living/california/san-francisco/${community.id}`);
  //     cy.wait('@postUuidActions');
  //
  //     waitForHydration(cy.get('h3').contains('Services and Amenities').parent()).within(() => {
  //       waitForHydration(cy.get('div').contains('Non-care services').parent()).within(() => {
  //         cy.wrap(community.propInfo.nonCareServices).each((service) => {
  //           if (ServicesAmenitiesFilters.nonCareServices.includes(service.toLowerCase())) {
  //             waitForHydration(cy.get('> div > div > div + div').contains(service, { matchCase: false })).should('exist');
  //           }
  //         });
  //       });
  //     });
  //   });
  //
  //   it('Should show room amenities', () => {
  //     cy.visit(`/assisted-living/california/san-francisco/${community.id}`);
  //     cy.wait('@postUuidActions');
  //
  //     waitForHydration(cy.get('h3').contains('Services and Amenities').parent()).within(() => {
  //       waitForHydration(cy.get('div').contains('Room amenities').parent()).within(() => {
  //         cy.wrap(community.propInfo.personalSpace).each((service) => {
  //           if (ServicesAmenitiesFilters.personalSpace.includes(service.toLowerCase())) {
  //             waitForHydration(cy.get('> div > div > div + div').contains(service, { matchCase: false })).should('exist');
  //           }
  //         });
  //       });
  //     });
  //   });
  //
  //   it.skip('Should show community amenities', () => {
  //     cy.visit(`/assisted-living/california/san-francisco/${community.id}`);
  //     cy.wait('@postUuidActions');
  //
  //     waitForHydration(cy.get('h3').contains('Services and Amenities').parent()).within(() => {
  //       waitForHydration(cy.get('div').contains('Community amenities').parent()).within(() => {
  //         cy.wrap(community.propInfo.communitySpace).each((service) => {
  //           if (ServicesAmenitiesFilters.communitySpace.includes(service.toLowerCase())) {
  //             waitForHydration(cy.get('> div > div > div + div').contains(service, { matchCase: false })).should('exist');
  //           }
  //         });
  //       });
  //     });
  //   });
  //
  //
  //   it('should be able to share', () => {
  //     cy.route('POST', '**/user-shares').as('postUserShares');
  //     cy.visit(`/assisted-living/california/san-francisco/${community.id}`);
  //     cy.wait('@postUuidActions');
  //     waitForHydration(cy.get('button').contains('Share')).click({ force: true });
  //     select('.ReactModal').contains('Share this community').should('exist');
  //
  //     cy.get('form input[name="to"]').type('inchara@seniorly.com');
  //     cy.get('form input[name="from"]').type('inchara@botverse.com');
  //     cy.get('form textarea[name="message"]').type('check out this property').should('have.value', 'check out this property');
  //
  //     cy.get('form button').contains('Send').click();
  //
  //     cy.wait('@postUserShares').then((xhr) => {
  //       expect(xhr.status).to.equal(200);
  //       expect(xhr.requestBody).to.deep.equal({
  //         toEmails: [
  //           'inchara@seniorly.com',
  //         ],
  //         message: 'check out this property',
  //         entitySlug: community.id,
  //         entityType: 'Community',
  //         fromEmail: 'inchara@botverse.com',
  //       });
  //     });
  //
  //     select('.Notifications').contains('Community has been shared').should('exist');
  //   });
  //
  //
  //   it('should be able to save and remove community', () => {
  //     let userSave;
  //
  //     cy.route('POST', '**/user-saves').as('postUserSaves');
  //     cy.route('PATCH', '**/user-saves/*').as('patchUserSaves');
  //     cy.visit(`/assisted-living/california/san-francisco/${community.id}`);
  //     cy.wait('@postUuidActions');
  //     cy.login();
  //     waitForHydration(cy.get('button').contains('Favorite')).click({ force: true });
  //
  //     cy.wait('@postUserSaves').then(async (xhr) => {
  //       expect(xhr.status).to.equal(200);
  //       expect(xhr.requestBody).to.deep.equal({
  //         entitySlug: community.id,
  //         entityType: 'Community',
  //       });
  //       const response = await toJson(xhr.response);
  //       userSave = normalizeResponse(response);
  //       expect(userSave.entitySlug).to.equal(community.id);
  //     });
  //
  //     cy.get('textarea[name="note"]').type('additional notes');
  //
  //     cy.get('button[type="submit"]').contains('Save Note').click();
  //
  //     cy.wait('@patchUserSaves').then((xhr) => {
  //       expect(xhr.url).to.contain(userSave.id);
  //       expect(xhr.status).to.equal(200);
  //       expect(xhr.requestBody).to.deep.equal({
  //         note: 'additional notes',
  //       });
  //     });
  //
  //     cy.contains('h3', 'Community Saved!').should('exist');
  //
  //     select('.CommunitySaved button').contains('Done').click();
  //
  //     select('.CommunitySaved h3').should('not.exist');
  //   });
  //
  //
  //   it('creates prospective lead when question is asked on community profile', () => {
  //     cy.route('POST', '**/questions').as('postQuestions');
  //     cy.route('POST', '**/auth/register').as('postRegister');
  //     cy.route('POST', '**/uuid-actions?filter*').as('getUuidActions');
  //     cy.visit(`/assisted-living/california/san-francisco/${community.id}`);
  //     cy.wait('@postUuidActions').then((xhr) => {
  //       expect(xhr.requestBody).to.deep.equal({
  //         data: {
  //           type: 'UUIDAction',
  //           attributes: {
  //             actionType: 'profileViewed',
  //             actionPage: `/assisted-living/california/san-francisco/${community.id}`,
  //             actionInfo: {
  //               slug: community.id,
  //             },
  //           },
  //         },
  //       });
  //     });
  //     cy.wait('@getUser');
  //
  //     waitForHydration(cy.get('button').contains('Ask a Question')).click();
  //     select('.ReactModal').contains(`Ask us anything about living at ${community.name}`).should('exist');
  //
  //     const firstName = `Lead${randHash()}`;
  //     const lastName = 'Question';
  //     const email = `dev${randHash()}@seniorly.com`;
  //     const phone = '5555555555';
  //     const formattedPhone = '(555) 555-5555';
  //     const message = 'I have a question';
  //
  //     cy.get('form input[name="firstName"]').type(firstName);
  //     cy.get('form input[name="lastName"]').type(lastName);
  //     cy.get('form input[name="phone"]').type(phone);
  //
  //     cy.get('section > form > [type="email"]').type(email);
  //     cy.get('form textarea[name="message"').type(message);
  //
  //     cy.get('button').contains('Send').click();
  //
  //     cy.wait('@postQuestions').then((xhr) => {
  //       expect(xhr.status).to.equal(200);
  //       expect(xhr.requestBody).to.deep.equal({
  //         data: {
  //           communitySlug: community.id,
  //           email,
  //           name: `${firstName} ${lastName}`,
  //           question: message,
  //         },
  //       });
  //     });
  //
  //     cy.wait('@postUuidActions');
  //
  //     cy.wait('@postRegister').then((xhr) => {
  //       expect(xhr.status).to.equal(200);
  //       expect(xhr.requestBody).to.deep.equal({
  //         email,
  //         name: `${firstName} ${lastName}`,
  //         phone_number: phone,
  //       });
  //     });
  //
  //     cy.wait('@getUser');
  //
  //
  //     waitForHydration(cy.contains('Finish').click({ force: true }));
  //
  //     cy.getCookie('sly-session').should('exist');
  //     cy.clearCookie('sly-session');
  //     cy.reload();
  //     cy.visit('/');
  //
  //     waitForHydration(cy.adminLogin());
  //
  //     cy.visit('/dashboard/agent/my-families/new');
  //     waitForHydration(cy.get('tr').contains(`${firstName} ${lastName}`)).click();
  //
  //     cy.get('h2').contains(`${firstName} ${lastName}`);
  //     cy.get('a').contains('See more family details').click();
  //
  //     cy.get('input[name="name"]').should('have.value', `${firstName} ${lastName}`);
  //     cy.get('input[name="email"]').should('have.value', email);
  //     cy.get('input[name="phone"]').should('have.value', formattedPhone);
  //     cy.get('input[name="referralSource"]').should('have.value', 'Online');
  //     cy.get('input[value="San Francisco, CA"]').should('exist');
  //   });
  // });

  responsive(() => {
    it('Check wizard pricing footer (ComPrfPage - row 4)', function() {
      cy.visit(`/assisted-living/california/san-francisco/${community.id}`);
      cy.wait('@postUuidActions');
      // Second button 'Get pricing' button (footer) - in responsive mode with small resolution will display first
      communityPage.getPriceBtnFooter();
      communityPage.getPriceWizardInfoIsPresent();
      cy.url().should('include', 'cta=pricing&entry=communityFooter');
    });
  });

  it.only('Check wizard pricing table (ComPrfPage - row 5)', function() {
    cy.visit(`/assisted-living/california/san-francisco/${community.id}`);
    cy.wait('@postUuidActions');
    communityPage.getPriceBtnTable();
    communityPage.getPriceWizardInfoIsPresent();
    cy.url().should('include', 'cta=pricing&entry=pricingTable');
  });

});


import { responsive, select } from '../../helpers/tests';
import buildEntity from '../../helpers/buildEntity';
import { toJson } from '../../helpers/request';
import { getCommunity } from '../../helpers/getCommunity';
import { formatMoney } from '../../helpers/money';
import { TEST_COMMUNITY } from '../../constants/community';

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

    getCommunity(TEST_COMMUNITY).then((response) => {
      community = response;
    });
  });

  responsive(() => {
    it('Should see details', () => {
      cy.visit(`/assisted-living/california/san-francisco/${community.id}`);

      cy.get('h1').contains(community.name).its('length').should('be', 1);

      const {
        line1, city, state, zip,
      } = community.address;

      cy.get('h3').should(($h3) => {
        const address = `${line1}, ${city}, ${state} ${zip}`;
        expect($h3.first().text().replace(/\s+/g, ' ')).to.equal(address);
      });

      const number = community.twilioNumber.numbers[0];
      select(`.CommunitySummary [href="tel:${number}"]`).should(($div) => {
        expect($div.text().replace(/[^\d]/g, '')).to.equal(number.toString());
      });

      select('.CommunityPricingAndRating').should('contain', formatMoney(community.startingRate));

      const rating = community.propRatings.reviewsValue.toFixed(1).replace(/\.0+$/, '');
      select('.CommunityPricingAndRating').should('contain', rating);
    });

    it('should be able to share', () => {
      cy.route('POST', '**/user-shares').as('postUserShares');

      cy.visit(`/assisted-living/california/san-francisco/${community.id}`);
      cy.get('button').contains('Share').click();
      select('.ReactModal h2').contains('Share this community').should('exist');

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

    it('should be able to save and remove community', () => {
      let userSave;

      cy.route('POST', '**/user-saves').as('postUserSaves');
      cy.route('PATCH', '**/user-saves/*').as('patchUserSaves');

      cy.registerWithEmail(`fonz+e2e+${randHash()}@seniorly.com`, 'nopassword');

      cy.visit(`/assisted-living/california/san-francisco/${community.id}`);

      cy.get('button').contains('Save').click();

      cy.wait('@postUserSaves').then(async (xhr) => {
        expect(xhr.status).to.equal(200);
        expect(xhr.requestBody).to.deep.equal({
          entitySlug: community.id,
          entityType: 'Community',
        });
        const response = await toJson(xhr);
        userSave = buildEntity(response);
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

      cy.get('h2').contains('Community Saved!').should.exist;

      select('.CommunitySaved button').contains('Done').click();

      select('.CommunitySaved h2').should('not.exist');
    });

    it('should request pricing from section', () => {
      // the pricing wizard is tested on it's own test,
      // so we just check that we get there

      cy.visit(`/assisted-living/california/san-francisco/${community.id}`);

      const pricingContent = select('.CollapsibleSection__Header h2').contains(`Pricing at ${community.name}`).parent().next();

      pricingContent.should('contain', formatMoney(community.startingRate));

      const list = buildEstimatedPriceList(community);

      list.forEach(({ label, value }) => {
        pricingContent.get('tbody').contains(label).next().should('contain', formatMoney(value));
      });

      select('button.CommunityPricingTable').contains('Get Detailed Pricing').click();

      cy.url().should('include', `/custom-pricing/${community.id}`);
    });

    it('should show and request care services', () => {
      cy.route('POST', '**/uuid-actions').as('postUuidActions');

      cy.visit(`/assisted-living/california/san-francisco/${community.id}`);

      const careContent = select('.CollapsibleSection__Header h2').contains(`Care Services at ${community.name}`).parent().next();
      community.propInfo.careServices.forEach((service) => {
        careContent.get('div').contains(service).should('exist');
      });

      careContent.get('button').contains('Ask About Care Services').click();

      select('form[name="CommunityAskQuestionAgentForm"] input[name="full_name"]').type('Fonz de la Osa');
      select('form[name="CommunityAskQuestionAgentForm"] input[name="phone"]').type('9087654321');
      select('form[name="CommunityAskQuestionAgentForm"] textarea[name="question"]').type('{selectall}{del}my message');
      select('form[name="CommunityAskQuestionAgentForm"]').contains('Send').click();

      cy.wait('@postUuidActions');

      cy.wait('@postUuidActions').then((xhr) => {
        const uuidAction = {
          data: {
            type: 'UUIDAction',
            attributes: {
              actionType: 'agentAskQuestions',
              actionPage: `/assisted-living/california/san-francisco/${community.id}`,
              actionInfo: {
                slug: community.id,
                question: 'my message',
                entityType: 'Property',
                name: 'Fonz de la Osa',
                phone: '9087654321',
              },
            },
          },
        };
        expect(xhr.requestBody).to.deep.equal(uuidAction);
      });

      select('.Notifications').contains('Question sent successfully.').should('exist');
    });

    it('should show and request amenities', () => {
      cy.route('POST', '**/uuid-actions').as('postUuidActions');

      cy.visit(`/assisted-living/california/san-francisco/${community.id}`);

      const careContent = select('.CollapsibleSection__Header h2').contains(`Amenities at ${community.name}`).parent().next();

      [
        ...community.propInfo.communityHighlights,
        ...community.propInfo.personalSpace,
        ...community.propInfo.nonCareServices,
      ].forEach((service) => {
        careContent.get('div').contains(service).should('exist');
      });

      careContent.get('button').contains('Ask About Amenities').click();

      select('form[name="CommunityAskQuestionAgentForm"] input[name="full_name"]').type('Fonz de la Osa');
      select('form[name="CommunityAskQuestionAgentForm"] input[name="phone"]').type('9087654321');
      select('form[name="CommunityAskQuestionAgentForm"] textarea[name="question"]').type('{selectall}{del}my message');
      select('form[name="CommunityAskQuestionAgentForm"]').contains('Send').click();

      // page visit
      cy.wait('@postUuidActions');

      cy.wait('@postUuidActions').then((xhr) => {
        const uuidAction = {
          data: {
            type: 'UUIDAction',
            attributes: {
              actionType: 'agentAskQuestions',
              actionPage: `/assisted-living/california/san-francisco/${community.id}`,
              actionInfo: {
                slug: community.id,
                question: 'my message',
                entityType: 'Property',
                name: 'Fonz de la Osa',
                phone: '9087654321',
              },
            },
          },
        };
        expect(xhr.requestBody).to.deep.equal(uuidAction);
      });

      select('.Notifications').contains('Question sent successfully.').should('exist');
    });

    it('should ask a question', () => {
      cy.route('POST', '**/uuid-actions').as('postUuidActions');

      cy.visit(`/assisted-living/california/san-francisco/${community.id}`);

      const careContent = select('.CollapsibleSection__Header h2').contains(`Care Services at ${community.name}`).parent().next();
      community.propInfo.careServices.forEach((service) => {
        careContent.get('div').contains(service).should('exist');
      });

      careContent.get('button').contains('Ask About Care Services').click();

      select('form[name="CommunityAskQuestionAgentForm"] input[name="full_name"]').type('Fonz de la Osa');
      select('form[name="CommunityAskQuestionAgentForm"] input[name="phone"]').type('9087654321');
      select('form[name="CommunityAskQuestionAgentForm"] textarea[name="question"]').type('{selectall}{del}my message');
      select('form[name="CommunityAskQuestionAgentForm"]').contains('Send').click();

      cy.wait('@postUuidActions');

      cy.wait('@postUuidActions').then((xhr) => {
        const uuidAction = {
          data: {
            type: 'UUIDAction',
            attributes: {
              actionType: 'agentAskQuestions',
              actionPage: `/assisted-living/california/san-francisco/${community.id}`,
              actionInfo: {
                slug: community.id,
                question: 'my message',
                entityType: 'Property',
                name: 'Fonz de la Osa',
                phone: '9087654321',
              },
            },
          },
        };
        expect(xhr.requestBody).to.deep.equal(uuidAction);
      });

      select('.Notifications').contains('Question sent successfully.').should('exist');
    });
  });
});
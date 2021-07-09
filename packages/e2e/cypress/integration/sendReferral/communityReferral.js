// eslint-disable-next-line spaced-comment
/// <reference types="Cypress" />

import { responsive, select } from '../../helpers/tests';
import randomUser from '../../helpers/randomUser';
import randomCommunity from '../../helpers/randomCommunity';

Cypress.on('uncaught:exception', () => {
  return false;
});

let community;

function addtestCommunity() {
  const { name, phone, address, city, state, zip } = randomCommunity();
  community = {
    name,
    phone,
    address,
    typeofCare: ['Assisted Living', 'Memory Care'],
    city,
    state,
    zip,
  };
  cy.get('form input[id*=name]').type(community.name);
  cy.get('form input[id*=communityPhone]').type(community.phone);

  community.typeofCare.forEach((care) => {
    cy.get('form div[class*=react-select__control]').click();
    cy.get('div[class*=react-select__menu-list').within(() => {
      cy.get('div').contains(care).click();
    });
  });
  cy.get('form input[id*=line1]').type(community.address);
  cy.get('form input[id*=city]').type(community.city);
  cy.get('form select[id*=state]').select(community.state);
  cy.get('form input[id*=zip]').type(community.zip);
}

function addfamilyContact() {
  const { name, phone, email } = randomUser();
  cy.get('form input[label*=\'Contact name\']').type(name, { force: true });
  cy.get('form input[id*=email]').last().type(email, { force: true });
  cy.get('form input[id*=phone]').type(phone, { force: true });
  cy.get('form input[placeholder*="Search by city, state, zip"]').type(community.zip, { force: true, delay: 50 });

  cy.get('div[class*=SearchBox__Suggestion]').contains(community.zip)
    .click({ force: true });
  cy.get('form select[id*=source]').select('Voicemail');
}

function addcommContact() {
  const { name, phone, email } = randomUser();
  cy.get('form input[label*=\'Contact name\']').type(name);
  cy.get('form input[id*=email]').last().type(email);
  cy.get('form input[id*=mobilePhone]').type(phone);
}

describe('Sending Referral to Community', () => {
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('sly_uuid', 'sly_sid', 'sly-session');
    cy.intercept('GET', '**/users/me').as('getUser');
  });

  responsive(() => {
    it('Add Test community', () => {
      cy.adminLogin();
      cy.intercept('POST', '**/communities').as('createCommunity');
      cy.intercept('GET', '**/communities/*').as('getCommunities');
      cy.visit('/dashboard/communities');
      cy.get('[data-cy="plus"]').scrollIntoView().click();
      addtestCommunity();
      cy.get('button').contains('Create Community').click();
      cy.wait('@createCommunity');
      cy.wait('@getCommunities');
      cy.url().should('contain', 'profile');
      select('.Notifications').contains('Community added successfully');
    });

    it('Add multiple contacts to Test community', () => {
      cy.intercept('GET', '**/marketplace/communities*', (req) => {
        if (req.url.indexOf(encodeURIComponent(community.name)) !== -1) {
          req.alias = 'getNewCommunity';
        }
      });
      cy.visit('/dashboard/communities');
      cy.wait('@getUser');
      cy.get('input[class*=SearchTextInput]').scrollIntoView().type(community.name,  { delay: 50 }).should('have.value', community.name);
      cy.wait('@getNewCommunity');
      cy.get('table').find('tbody').find('tr a[class*=Root]').contains(community.name)
        .scrollIntoView()
        .click();
      cy.get('a[id=contacts]').click();

      cy.get('section[class*=DashboardAgentContacts]').contains('Add contact').scrollIntoView().dblclick({ force: true });
      addcommContact();
      cy.get('button').contains('Add Contact').click();
      select('.Notifications').contains('Contact created');
    });

    it('Create lead', () => {
      cy.intercept('POST', '**/clients').as('createLead');
      cy.intercept('GET', '**/clients/*').as('getLead');
      cy.intercept('GET', '**/notes*').as('getNotes');
      cy.visit('/dashboard/agent/my-families/new');
      cy.get('div [class*=DashboardAgentFamilyOverviewSection__TwoColumn]').contains('Add family').click('right', { force: true });
      addfamilyContact();
      cy.get('button').contains('Create').click();
      cy.wait('@createLead');
      cy.wait('@getLead');
      cy.wait('@getNotes');
      select('.Notifications').contains('Family added successfully');
    });

    it('Send referral to community', () => {
      cy.intercept('GET', '**/communities*').as('searchCommunities');
      cy.intercept('POST', '**/clients').as('sendReferral');
      cy.intercept('GET', '**/clients/*').as('getReferral');
      cy.visit('/dashboard/agent/my-families/new');

      cy.get('table').find('tbody').find('tr a[class*=ClientRowCard__StyledNameCell]').first()
        .click();
      cy.get('a[id*=communities]').contains('Communities').click({ force: true });

      cy.get('button').contains('Search for communities').click({ force: true });

      cy.get('form[name="CommunityAgentSearchForm"]').within(() => {
        cy.get('div input[placeholder=\'Search by city, state, zip\']').clear();
        cy.get('div input[placeholder="Search by name"]').type(community.name,  { delay: 50 });
        cy.get('[data-cy="search"]').eq(1).click({ force: true });
      });
      cy.wait('@searchCommunities');
      cy.get('div[class*="DashboardCommunityReferralSearch__StyledDashboardAdminReferralCommunityTile"]').first().click('right');
      cy.get('button').contains('Send Referral').click({ force: true });
      cy.wait('@sendReferral');
      cy.get('div[class*="TopWrapper"]').should('contain', 'Communities');
      select('.Notifications').contains('Sent referrral successfully');
    });
  });
});

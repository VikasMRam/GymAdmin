// eslint-disable-next-line spaced-comment
/// <reference types="Cypress" />

import { responsive, select, waitForHydration } from '../../helpers/tests';
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
  waitForHydration(cy.get('form input[id*=name]')).type(community.name);
  waitForHydration(cy.get('form input[id*=communityPhone]')).type(community.phone);

  community.typeofCare.forEach((care) => {
    waitForHydration(cy.get('form div[class*=react-select__control]')).click();
    cy.get('div[class*=react-select__menu-list').within(() => {
      cy.get('div').contains(care).click();
    });
  });
  waitForHydration(cy.get('form input[id*=line1]')).type(community.address);
  waitForHydration(cy.get('form input[id*=city]')).type(community.city);
  waitForHydration(cy.get('form select[id*=state]')).select(community.state);
  waitForHydration(cy.get('form input[id*=zip]')).type(community.zip);
}

function addfamilyContact() {
  const { name, phone, email } = randomUser();
  waitForHydration(cy.get('form input[label*=\'Contact name\']')).type(name, { force: true });
  waitForHydration(cy.get('form input[id*=email]').last()).type(email, { force: true });
  waitForHydration(cy.get('form input[id*=phone]')).type(phone, { force: true });
  waitForHydration(cy.get('form input[placeholder*="Search by city, state, zip"]')).type(community.zip, { force: true, delay: 50 });

  cy.get('div[class*=SearchBox__Suggestion]').contains(community.zip)
    .click({ force: true });
  waitForHydration(cy.get('form select[id*=source]')).select('Voicemail');
}

function addcommContact() {
  const { name, phone, email } = randomUser();
  waitForHydration(cy.get('form input[label*=\'Contact name\']')).type(name);
  waitForHydration(cy.get('form input[id*=email]').last()).type(email);
  waitForHydration(cy.get('form input[id*=mobilePhone]')).type(phone);
}

describe('Sending Referral to Community', () => {
  responsive(() => {
    beforeEach(() => {
      cy.visit('/');
      cy.clearCookie('sly_sid');
      cy.clearCookie('sly_uuid');
      cy.clearCookie('sly-session');
      cy.server();
      cy.route('POST', '**/auth/login').as('login');
      cy.route('GET', '**/users/me').as('getUser');
      cy.reload();
      cy.wait('@getUser');
      Cypress.Commands.add('login', () => {
        cy.get('button').then(($a) => {
          if ($a.text().includes('Log In')) {
            waitForHydration(cy.get('div[class*=Header__HeaderItems]').contains('Log In')).click({ force: true });
            waitForHydration(cy.get('form input[name="email"]')).type('slytest+admin@seniorly.com');
            waitForHydration(cy.get('form input[name="password"]')).type('nopassword');
            waitForHydration(cy.get('button[type="submit"]').contains('Log in')).click();
            cy.wait('@login');
            cy.wait('@getUser');
          }
        });
      });
    });

    it('Add Test community', () => {
      cy.login();
      cy.route('POST', '**/communities').as('createCommunity');
      cy.route('GET', '**/communities/*').as('getNewCommunity');
      cy.visit('/dashboard/communities');
      waitForHydration(cy.get('[data-cy="plus"]')).click();
      addtestCommunity();
      waitForHydration(cy.get('button').contains('Create Community')).click();
      cy.wait('@createCommunity');
      cy.wait('@getNewCommunity');
      cy.url().should('contain', 'profile');
      select('.Notifications').contains('Community added successfully');
    });

    it('Add multiple contacts to Test community', () => {
      cy.login();
      cy.visit('/dashboard/communities');
      waitForHydration(cy.get('input[class*=SearchTextInput]')).type(community.name,  { delay: 50 }).should('have.value', community.name);
      cy.wait(1000);
      waitForHydration(cy.get('table').find('tbody').find('tr a[class*=Root]').contains(community.name)).click();
      waitForHydration(cy.get('a[id=contacts]')).click();

      waitForHydration(cy.get('section[class*=DashboardAgentContacts]').contains('Add contact')).dblclick({ force: true });
      addcommContact();
      waitForHydration(cy.get('button').contains('Add Contact')).click();
      select('.Notifications').contains('Contact created');
    });

    it('Create lead', () => {
      cy.login();
      cy.route('POST', '**/clients').as('createLead');
      cy.route('GET', '**/clients/*').as('getLead');
      cy.route('GET', '**/notes*').as('getNotes');
      cy.visit('/dashboard/agent/my-families/new');
      waitForHydration(cy.get('div [class*=DashboardAgentFamilyOverviewSection__TwoColumn]').contains('Add family')).click('right', { force: true });
      addfamilyContact();
      waitForHydration(cy.get('button').contains('Create')).click();
      cy.wait('@createLead');
      cy.wait('@getLead');
      cy.wait('@getNotes');
      select('.Notifications').contains('Family added successfully');
    });

    it('Send referral to community', () => {
      cy.login();
      cy.route('GET', '**/communities*').as('searchCommunities');
      cy.route('POST', '**/clients').as('sendReferral');
      cy.route('GET', '**/clients/*').as('getReferral');
      cy.visit('/dashboard/agent/my-families/new');

      waitForHydration(cy.get('table').find('tbody').find('tr a[class*=ClientRowCard__StyledNameCell]').first()).click();
      waitForHydration(cy.get('a[id*=communities]').contains('Communities')).click({ force: true });

      waitForHydration(cy.get('button').contains('Search for communities')).click({ force: true });

      cy.get('form[name="CommunityAgentSearchForm"]').within(() => {
        waitForHydration(cy.get('div input[placeholder=\'Search by city, state, zip\']')).clear();
        waitForHydration(cy.get('div input[placeholder="Search by name"]')).type(community.name,  { delay: 50 });
        waitForHydration(cy.get('[data-cy="search"]').eq(1)).click({ force: true });
      });
      cy.wait('@searchCommunities');
      waitForHydration(cy.get('div[class*="DashboardCommunityReferralSearch__StyledDashboardAdminReferralCommunityTile"]').first()).click('right');
      waitForHydration(cy.get('button').contains('Send Referral')).click({ force: true });
      cy.wait('@sendReferral');
      waitForHydration(cy.get('div[class*="TopWrapper"]').should('contain', 'Communities'));
      select('.Notifications').contains('Sent referrral successfully');
    });
  });
});

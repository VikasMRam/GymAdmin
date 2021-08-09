
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import 'cypress-wait-until';

import { select } from '../helpers/tests';
import { toJson } from '../helpers/request';

import { normalizeResponse } from 'sly/web/services/api';

Cypress.Commands.add('registerWithEmailFlow', (email, password) => {
  cy.route('POST', '**/auth/register').as('registerUser');

  cy.get('span').contains('Create an account').click();
  select('.JoinSlyButtons').contains('Sign up with Email').click();
  select('.SignupForm input[name="email"]').type(email);
  select('.SignupForm input[name="password"]').type(password);
  select('.SignupForm button[type="submit"]').click();

  cy.wait('@registerUser').then((xhr) => {
    expect(xhr.status).to.equal(200);
    expect(xhr.requestBody).to.deep.equal({
      email, password,
    });
  });
});

Cypress.Commands.add('registerWithEmail', (email, password) => {
  cy.request('POST', '/v0/platform/auth/register', {
    email,
    password,
  }).as('registerUser');

  cy.get('@registerUser').its('status').should('eq', 200);
});

function throwOnUnsuccessful(response) {
  if (!response.ok) {
    throw new Error(`Failed to fetch ${response.url}: ${response.statusText} (${response.status})`);
  }
  return response;
}

Cypress.Commands.add('getUser', () => {
  const url = 'https://api.myseniorly.com';
  return Cypress.Promise.all([
    fetch(`${url}/v0/platform/uuid-actions`, { credentials: 'include' }).then(throwOnUnsuccessful),
    fetch(`${url}/v0/platform/users/me`, { credentials: 'include' }).then(throwOnUnsuccessful),
  ])
    .then(responses => Cypress.Promise.all(responses.map(toJson)))
    // .then(responses => Cypress.Promise.all(responses.map(toJson)))
    .then((result) => {
      const [
        uuidActions,
        user,
      ] = result.map(body => normalizeResponse(body));

      return {
        uuidActions,
        user,
      };
    });
});

Cypress.Commands.add('getCommunity', (community) => {
  const url = `/v0/marketplace/communities/${community}?include=similar-communities%2Cquestions%2Cagents`;
  return fetch(url)
    .then(toJson)
    .then(normalizeResponse);
});


Cypress.Commands.add('waitForPageViewEvent', () => {
  let ENV = null;
  cy.waitUntil(() => {
    return cy.window().then((win) => {
      if (!win.SLY_EVENT_ENV) {
        return Cypress.Promise.reject();
      }
      cy.log('win ENV', win.SLY_EVENT_ENV);
      ENV = win.SLY_EVENT_ENV;
      return Cypress.Promise.resolve();
    });
  });
  cy.then(() => {
    if (ENV === 'production') {
      cy.wait('@getEvent');
    } else {
      cy.waitUntil(() => {
        const result = global.infoSpy.getCalls().some((call) => {
          return call.args[0] === 'EVENT page';
        });
        return result
          ? Promise.resolve(true)
          : Promise.reject();
      });
    }
  });
});

Cypress.Commands.add('fullLogin', (email, password) => {
  cy.intercept('GET', '**/events/new*').as('getEvent');

  cy.clearCookie('sly_sid');
  cy.clearCookie('sly_uuid');
  cy.clearCookie('sly-session');
  cy.visit('/');

  cy.waitForPageViewEvent();

  cy.get('div[class*=Header__HeaderItems]').contains('Log In').scrollIntoView().click({ force: true });
  cy.modalLogin(email, password);
});


Cypress.Commands.add('modalLogin', (email, password) => {
  cy.intercept('POST', '**/auth/login').as('login');
  cy.intercept('GET', '**/users/me').as('getUser');
  cy.intercept('POST', '**/auth/start').as('authStart');

  cy.get('form input[name="email"]').type(email);

  cy.get('button[type="submit"]').contains('Continue').click();
  cy.wait('@authStart');
  cy.get('form input[name="password"]').type(password);
  cy.get('button[type="submit"]').contains('Log in').click();
  cy.wait('@login');
  cy.wait('@getUser');
});


Cypress.Commands.add('adminLogin', () => {
  cy.fullLogin('slytest+admin@seniorly.com', 'nopassword');
});


Cypress.Commands.add('modalAdminLogin', () => {
  cy.modalLogin('slytest+admin@seniorly.com', 'nopassword');
});


Cypress.Commands.add('waitForUser', () => {
  cy.wait('@getUser');
});

Cypress.Commands.add('getIframeDocument', (iframe) => {
  cy.get(iframe).its('0.contentDocument').its('body').should('not.be.undefined')
    .then(cy.wrap);
});

Cypress.Commands.add('waitForIframe', (iframe, timeout) => {
  cy.get(iframe, { timeout }).its('0.contentDocument').its('body').should('not.be.undefined')
    .then(cy.wrap);
});


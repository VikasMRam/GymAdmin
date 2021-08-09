// eslint-disable-next-line spaced-comment
/// <reference types="Cypress" />
import { toSearchPageFromCity } from '../../helpers/searchPage';


const handleChatbotFlow = () => {
  cy.getIframeDocument('iframe[name*="widget-window"]').find('div[class*="action"] span').contains('Parent').click();
  cy.wait(1500);
  cy.getIframeDocument('iframe[name*="widget-window"]').find('div[class*="action"] span').contains('Need to find a community immediately').click();
  cy.wait(1500);
  cy.getIframeDocument('iframe[name*="widget-window"]').find('div[class*="action"] span').contains('Memory care (wandering risk, increased confusion, etc)').click();
  cy.getIframeDocument('iframe[name*="widget-window"]').find('div[class*="send-btn"] div').contains('Confirm selections').click();
  cy.wait(1500);
  cy.getIframeDocument('iframe[name*="widget-window"]').find('div[class*="action"] span').contains('Veterans benefits').click();
  cy.wait(1500);
  cy.getIframeDocument('iframe[name*="widget-window"]').find('div[class*="send-btn"] div').contains('Confirm selections').click();
  cy.wait(1500);
  cy.getIframeDocument('iframe[name*="widget-window"]').find('div[class*="action"] span').contains('Yes').click();
  cy.wait(1500);
  cy.getIframeDocument('iframe[name*="widget-window"]').find('input').click().type('test');
  cy.getIframeDocument('iframe[name*="widget-window"]').find('div[class*="send-btn"]').click();
  cy.wait(1500);
  cy.getIframeDocument('iframe[name*="widget-window"]').find('input').click().type('8105702064');
  cy.getIframeDocument('iframe[name*="widget-window"]').find('div[class*="send-btn"]').click();
  cy.wait(1500);
  cy.getIframeDocument('iframe[name*="widget-window"]').find('input').click().type(`dev+test${new Date().getTime()}@seniorly.com`);
  cy.getIframeDocument('iframe[name*="widget-window"]').find('div[class*="send-btn"]').click();
  cy.getIframeDocument('iframe[name*="widget-window"]').find('div').contains("You're all set!");
};

describe('Chat Bot', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', () => {
      // returning false here prevents Cypress from
      // failing the test
      return false;
    });
  });
  it('Chatbot Functianlity check - Home page', () => {
    cy.intercept('GET', '**/events/new*').as('getEvent');
    cy.visit('/');
    cy.waitForPageViewEvent();
    cy.waitForIframe('iframe[name*="widget-window"]', 50000).then(() => {
      handleChatbotFlow();
    });
  });
  it('Chatbot Functianlity check - Search page', () => {
    cy.intercept('GET', '**/events/new*').as('getEvent');
    cy.visit('/');
    toSearchPageFromCity('San Francisco');
    cy.waitForPageViewEvent();
    cy.waitForIframe('iframe[name*="widget-window"]', 50000).then(() => {
      handleChatbotFlow();
    });
  });
  it('Chatbot Functianlity check - Community Details page', () => {
    cy.intercept('GET', '**/events/new*').as('getEvent');
    cy.visit('/');
    cy.waitForPageViewEvent();
    toSearchPageFromCity('San Francisco');
    cy.get('a article h3').parents('a').then((res) => {
      if (res.length) {
        cy.visit(res[0].href);
        cy.waitForPageViewEvent();
        cy.waitForIframe('iframe[name*="widget-window"]', 50000).then(() => {
          handleChatbotFlow();
        });
      }
    });
  });
});


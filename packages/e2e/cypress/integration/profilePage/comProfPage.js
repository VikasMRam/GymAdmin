import {isVisibleXpath, isNotVisibleXpath, domElement} from '../../helpers/domElements';
import { waitForHydration } from '../../helpers/tests';

// Selectors static
const getPriceFooter =
  "(//button[@data-buttonid='GetCommunityPricingAndAvailability'])[last()]";
const getPriceTable =
  "(//button[@data-buttonid='GetCommunityPricingAndAvailability'])[1]";

// Selectors dynamic
const imageByScr = src => `(//img[@src='${src}'])[last()]`;
const divText = text => `//div[text()='${text}']`;
const divContainText = containText =>
  `//div[contains(text(),'${containText}')]`;
const buttonText = text => `//button[text()="${text}"]`;
const h3Text = text => `//h3[text()='${text}']`;
const h1Text = text => `//h1[text()='${text}']`;

//Methods

export const getPriceBtnFooter = () =>
  waitForHydration(cy.xpath(getPriceFooter)).click({ force: true });

export const getPriceBtnTable = () =>
  waitForHydration(cy.xpath(getPriceTable)).click({ force: true });

export const getPriceWizardInfoIsPresent = () => {
  isVisibleXpath(buttonText("Let's get started"));
  isVisibleXpath(buttonText('No thanks, I just want to see pricing.'));
  isVisibleXpath(
    h3Text('We need to ask a few quick questions to understand your needs.'),
  );
  isVisibleXpath(
    divText(
      'Since pricing can vary depending on your preferences and care needs, you’ll get more accurate, up-to-date information working with a Seniorly Local Advisor.',
    ),
  );
};

export const nameEmailPhoneInput = (name, lastName, email, phone) => {
  waitForHydration(domElement('#firstName')).type(name);
  waitForHydration(cy.get('#lastName')).type(lastName);
  waitForHydration(cy.xpath("(//input[@id='email'])[1]")).type(email);
  waitForHydration(cy.get('#phone')).type(phone);
};

export const justWantToSeePricing = ({ ...props }) => {
  const { name, lastName, email, phone } = props;
  waitForHydration(cy.xpath(buttonText('No thanks, I just want to see pricing.'))).click({ force: true });
  nameEmailPhoneInput(name, lastName, email, phone);
  waitForHydration(cy.xpath(buttonText('Get pricing'))).click();
};

export const askQuestBtn = () =>
  waitForHydration(cy.xpath(buttonText('Ask a Question'))).click({ force: true });

export const askExperttBtn = () =>
  waitForHydration(cy.get('button[type="expert"]')).click({ force: true });

export const sendAskForm = ({ ...props }) => {
  const { name, lastName, email, phone, question } = props;
  nameEmailPhoneInput(name, lastName, email, phone);
  waitForHydration(cy.get('#message')).type(question);
  waitForHydration(cy.xpath(buttonText('Send'))).click();
};

export const successModalIsSeenAndClosed = () => {
  const finishBtn = buttonText("Finish");
  isVisibleXpath(h1Text('Success!'));
  isVisibleXpath(divText('Your request has been sent and we will connect with you shortly.'));
  waitForHydration(cy.xpath(finishBtn)).click();
  isNotVisibleXpath(finishBtn);
};

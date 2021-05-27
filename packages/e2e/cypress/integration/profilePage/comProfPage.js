import { isVisibleXpath } from '../../helpers/domElements'
import { waitForHydration } from "../../helpers/tests";

// Selectors static
const getPriceFooter = "(//button[@data-buttonid='GetCommunityPricingAndAvailability'])[last()]";
const getPriceTable = "(//button[@data-buttonid='GetCommunityPricingAndAvailability'])[1]";

// Selectors dynamic
const imageByScr = (src) => `(//img[@src='${src}'])[last()]`;
const divText = text => `//div[text()='${text}']`;
const divContainText = containText => `//div[contains(text(),'${containText}')]`;
const buttonText = text => `//button[text()="${text}"]`;
const h3Text = text => `//h3[text()='${text}']`;

//Methods

export const getPriceBtnFooter = () => waitForHydration(cy.xpath(getPriceFooter)).click({ force: true });

export const getPriceBtnTable = () => waitForHydration(cy.xpath(getPriceTable)).click({ force: true });

export const getPriceWizardInfoIsPresent = () => {
  isVisibleXpath(buttonText("Let's get started"));
  isVisibleXpath(buttonText("No thanks, I just want to see pricing."));
  isVisibleXpath(h3Text("We need to ask a few quick questions to understand your needs."));
  isVisibleXpath(divText("Since pricing can vary depending on your preferences and care needs, you’ll get more accurate, up-to-date information working with a Seniorly Local Advisor."));
};

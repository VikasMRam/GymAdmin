import {
  isVisibleXpath,
  isNotVisibleXpath,
  isAbsentXpath,
  domElement,
} from '../../helpers/domElements';
import { waitForHydration } from '../../helpers/tests';
// eslint-disable-next-line import/extensions
import { baseUrl } from '../../../cypress';

//= ========Selectors static=========
const getPriceFooter =
  "(//button[@data-buttonid='GetCommunityPricingAndAvailability'])[last()]";
const getPriceTable =
  "(//button[@data-buttonid='GetCommunityPricingAndAvailability'])[1]";

const getPricingAndAvailabilitySectionBtn =
  '//h2[text()="Get Pricing and Availability"]/parent::div//button';

const gallery = '//div[contains(@class, "Modal__Body")]';

const mediaGalleryBtnClose =
  "(//div[@class='ReactModalPortal']/div//button)[1]";

const mediaGalleryBtnLeft = "(//div[@class='ReactModalPortal']/div//button)[2]";

const mediaGalleryBtnRight =
  "(//div[@class='ReactModalPortal']/div//button)[3]";

const currentDisplayingImage =
  "(//div[@aria-hidden='false'])[last()]//picture/img";

const filmstripPictures = '//ul/li/picture';

const map = 'div[aria-label="Map"]';

//= ========Selectors dynamic=========
const imageByScr = src => `(//img[@src='${src}'])[last()]`;

const divText = text => `//div[text()='${text}']`;

const buttonText = text => `//button[text()="${text}"]`;

const h3Text = text => `//h3[text()='${text}']`;

export const h1Text = text => `//h1[text()='${text}']`;

const spanText = text => `//span[text()='${text}']`;

//= ========Methods=========
export const getPriceBtnFooter = () =>
  waitForHydration(cy.xpath(getPriceFooter)).click({ force: true });

export const getPriceBtnTable = () =>
  waitForHydration(cy.xpath(getPriceTable)).click({ force: true });

export const getPriceBtnRightSectionDesktop = () =>
  waitForHydration(cy.xpath(getPricingAndAvailabilitySectionBtn)).click({
    force: true,
  });

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
  waitForHydration(domElement('#firstName')).type(
    name,
  );
  waitForHydration(cy.get('#lastName')).type(
    lastName,
  );
  waitForHydration(cy.get('#email')).type(email);
  waitForHydration(cy.get('input[label="Phone"]')).type(phone);
};

export const justWantToSeePricing = ({ ...props }) => {
  const { name, lastName, email, phone } = props;
  waitForHydration(
    domElement(buttonText('No thanks, I just want to see pricing.')),
  )
    .click();
  nameEmailPhoneInput(name, lastName, email, phone);
  waitForHydration(cy.xpath(buttonText('Get pricing'))).click();
};

export const askQuestBtn = () => {
  waitForHydration(cy.xpath(buttonText('Ask a Question')));
  cy.wait(1500);
  cy.xpath(buttonText('Ask a Question')).click();
};

export const askExpertBtn = () => {
  waitForHydration(cy.get('button[type="expert"]'));
  cy.wait(1500);
  cy.get('button[type="expert"]').click({ force: true });
};


export const sendAskForm = ({ ...props }) => {
  const { name, lastName, email, phone, question } = props;
  nameEmailPhoneInput(name, lastName, email, phone);
  waitForHydration(cy.get('#message')).type(question);
  waitForHydration(cy.xpath(buttonText('Send'))).click();
};

export const successModalIsSeenAndClosed = () => {
  const finishBtn = buttonText('Finish');
  isVisibleXpath(h1Text('Success!'));
  isVisibleXpath(
    divText('Your request has been sent and we will connect with you shortly.'),
  );
  waitForHydration(cy.xpath(finishBtn)).click();
  isNotVisibleXpath(finishBtn);
};

export const viewPhotos = () =>
  waitForHydration(cy.xpath(buttonText('View Photos'))).click({ force: true });

export const galleryIsOpen = () => isVisibleXpath(gallery);

export const galleryIsClosed = () => isNotVisibleXpath(gallery);

export const closeGalleryBtn = () =>
  waitForHydration(cy.xpath(mediaGalleryBtnClose)).click({ force: true });

export const clickGalleryRight = () =>
  waitForHydration(cy.xpath(mediaGalleryBtnRight)).click({ force: true });

export const clickGalleryLeft = () =>
  waitForHydration(cy.xpath(mediaGalleryBtnLeft)).click({ force: true });

export const leftRightGalleryButtonIsWorks = () => {
  let pic1 = null;
  let pic2 = null;
  let pic3 = null;
  domElement(currentDisplayingImage)
    .invoke('attr', 'src')
    .then((src) => {
      pic1 = src;
      isVisibleXpath(imageByScr(pic1));
    });
  clickGalleryRight();
  domElement(currentDisplayingImage)
    .invoke('attr', 'src')
    .then((src) => {
      pic2 = src;
      isVisibleXpath(imageByScr(pic2));
      expect(pic1).to.not.equal(pic2);
    });
  clickGalleryRight();
  domElement(currentDisplayingImage)
    .invoke('attr', 'src')
    .then((src) => {
      pic3 = src;
      isVisibleXpath(imageByScr(pic3));
      expect(pic1).to.not.equal(pic3);
      expect(pic2).to.not.equal(pic3);
    });
  clickGalleryLeft();
  domElement(currentDisplayingImage)
    .invoke('attr', 'src')
    .then((backToPicture2) => {
      isVisibleXpath(imageByScr(backToPicture2));
      expect(pic2).equal(backToPicture2);
    });
};

export const scrollFilmStripToLastPicture = () => {
  domElement(filmstripPictures)
    .first()
    .realSwipe('toLeft', { length: 5000 });
  domElement(filmstripPictures).then((list) => {
    const lastPicture = list.length;
    isVisibleXpath(`(${filmstripPictures})[${lastPicture}]`);
  });
  isAbsentXpath(`(${filmstripPictures})[1]`);
};

const BREADCRUMBS_OPTIONS = {
  Home: {
    url: `${baseUrl}/`,
    expectUI: 'Find a senior living community you’ll love.',
  },
  'Assisted Living': {
    url: `${baseUrl}/assisted-living`,
    expectUI: 'What is Assisted Living?',
  },

  California: {
    url: `${baseUrl}/assisted-living/california`,
    expectUI: 'Assisted Living Facilities in CA',
    mapPresent: true,
  },
  'San Francisco': {
    url: `${baseUrl}/assisted-living/california/san-francisco`,
    expectUI: 'Assisted Living Facilities in San Francisco, CA',
    mapPresent: true,
  },
};

export const navigationBreadcrumbs = (communityId) => {
  cy.wrap(Object.keys(BREADCRUMBS_OPTIONS)).each((option) => {
    cy.visit(`/assisted-living/california/san-francisco/${communityId}`);
    cy.wait('@postUuidActions', { timeout: 10000 });

    waitForHydration(domElement(spanText(option))).click({ force: true });
    cy.url().should('eq', BREADCRUMBS_OPTIONS[option].url);
    cy.contains(BREADCRUMBS_OPTIONS[option].expectUI, {
      timeout: 10000,
    }).should('be.visible');
    if (BREADCRUMBS_OPTIONS[option].mapPresent) {
      cy.get(map).should('be.visible');
    }
  });
};

export const clickTagUnderAddress = (tagName) => {
  // Cypress can not handle different tabs or windows, so better take href and open in current window
  domElement(
    `//div[@class='overlayGallery']/parent::div//a[text()='${tagName}']`,
  )
    .first()
    .invoke('attr', 'href')
    .then((href) => {
      cy.visit(`${baseUrl}${href}`);
    });
};

export const nameIsPresent = name =>
  cy.xpath(h1Text(name)).should('be.visible');

export const addressIsPresent = (city, line1, state, zip) => {
  cy.get('div[class*=CommunityDetailPage__StyledCommunitySummary]>h2').should(
    (h2) => {
      const actualAddr = h2.text().replace(/\s+/g, ' ');
      const expectedAddress = `${line1}, ${city}, ${state} ${zip}`;
      expect(actualAddr).to.equal(expectedAddress);
    },
  );
};

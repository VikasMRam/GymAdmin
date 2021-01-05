import { TEST_COMMUNITY } from '../../constants/community';
import { responsive, waitForHydration } from '../../helpers/tests';
import randomUser from '../../helpers/randomUser';

import { SERVICES_OPTIONS, WHO_PERSON_OPTIONS, ADL_OPTIONS, TIMING_OPTIONS, BUDGET_OPTIONS, MEDICAID_OPTIONS }
  from 'sly/web/constants/wizards/assessment';

Cypress.on('uncaught:exception', () => {
  return false;
});

describe('Community survey', () => {
  let community;
  let lookingFor;
  const wizardVersion = 'Wizard_V1';
  const wizardSteps = 6;
  const WizardConfiguration = {
    Wizard_V1:
          [{ name: 'step-2:Who',
            title: 'Are you looking for yourself or someone else?',
            Options: WHO_PERSON_OPTIONS,
            maxSelect: 4,
            optionsId: 'lookingFor',
            skipAllowed: true,
            backAllowed: true,
            submitText: 'Continue',
            isSelect: true,
            multipleselectionAllowed: false,
            istitleNested: false,
          },
          { name: 'step-3:Timing',
            title: 'What’s your timeframe?',
            Options: TIMING_OPTIONS,
            maxSelect: 3,
            skipAllowed: false,
            backAllowed: false,
            submitText: 'Continue',
            optionsId: 'timing',
            isSelect: false,
            multipleselectionAllowed: false,
            istitleNested: false,
          },
          { name: 'step-4:ADL',
            title: {
              spouse: 'Does your spouse or partner need help with any of the following?',
              myself: 'Do you need help with any of the following?',
              parents: 'Does your parent need help with any of the following?',
              other: 'Do you need help with any of the following?',
            },
            Options: ADL_OPTIONS,
            maxSelect: 4,
            optionsId: 'adl',
            skipAllowed: true,
            backAllowed: true,
            submitText: 'Continue',
            isSelect: false,
            multipleselectionAllowed: true,
            istitleNested: true,
          },
          { name: 'step-5:Budget',
            title: {
              spouse: 'Does your spouse or partner have access to any of these benefits?',
              myself: 'Do you have access to any of these benefits?',
              parents: 'Does your parent have access to any of these benefits?',
              other: 'Do you have access to any of these benefits?',
            },
            Options: BUDGET_OPTIONS,
            maxSelect: 5,
            optionsId: 'budget',
            skipAllowed: true,
            backAllowed: true,
            submitText: 'Continue',
            isSelect: false,
            multipleselectionAllowed: true,
            istitleNested: true,
          },

          { name: 'step-6:Medicaid',
            title: {
              spouse: 'Does your spouse or partner qualify for Medicaid?',
              myself: 'Do you qualify for Medicaid?',
              parents: 'Does your parent qualify for Medicaid?',
              other: 'Does the person you are looking for qualify for Medicaid?',
            },
            Options: MEDICAID_OPTIONS,
            maxSelect: 3,
            optionsId: 'medicaid',
            skipAllowed: true,
            backAllowed: true,
            submitText: 'Continue',
            isSelect: false,
            multipleselectionAllowed: false,
            istitleNested: true,
          },

          { name: 'step-7:Services',
          title: {
            spouse: 'Would your spouse or partner be interested in any of these other services?',
            myself: 'Would you be interested in any of these other services?',
            parents: 'Would your parent be interested in any of these other services?',
            other: 'Would you be interested in any of these other services?',
          },
            Options: SERVICES_OPTIONS,
            maxSelect: 5,
            optionsId: 'services',
            skipAllowed: true,
            backAllowed: true,
            submitText: 'Continue',
            isSelect: false,
            multipleselectionAllowed: true,
            istitleNested: true,
          },
          ],
  };

  // Generates 'qty' number of unique random integer numbers between min and max
  function getuniqueRandoms(qty, min, max) {
    let rnd;
    const arr = [];
    do {
      do { rnd = Math.floor(Math.random() * (max - min)) + min; }
      while (arr.includes(rnd));
      arr.push(rnd);
    } while (arr.length < qty);
    return arr;
  }

  // Do not include memory care for 'myself'
  function getminIndex(name) {
    if (name === 'step-4:ADL' && (lookingFor === 'myself')) { return 1; }
    return 0;
  }

  function setlookingFor(value) {
    lookingFor = value;
  }

  function getlookingFor() {
    return lookingFor;
  }

  function verifypostUuidActions(stepname, optionsId, val) {
    cy.wait('@postUuidActions').then((xhr) => {
      const request = xhr.requestBody;
      const attrs = request.data.attributes;
      expect(request.data).to.have.property('type', 'UUIDAction');
      expect(attrs.actionInfo).to.have.property('stepName', stepname);
      expect(attrs.actionInfo).to.have.property('wizardName', 'assessmentWizard');
      expect(attrs.actionInfo.data).to.have.property(`${optionsId}`).to.deep.equal(val);
      expect(attrs).to.have.property('actionPage', `/wizards/assessment/community/${community.id}`);
      expect(attrs).to.have.property('actionType', 'wizardStepCompleted');
    });
  }

  function getTitle(istitleNested, i) {
    if (!istitleNested) { return WizardConfiguration[wizardVersion][i].title; }
    return WizardConfiguration[wizardVersion][i].title[getlookingFor()];
  }

  function verifywizardStep(i) {
    const { name, Options, maxSelect, submitText, optionsId, isSelect, multipleselectionAllowed, istitleNested } = WizardConfiguration[wizardVersion][i];
    it(`${name}`, () => {
      const title = getTitle(istitleNested, i);
      waitForHydration(cy.get('main[class*=AssessmentWizardPage]').find('h3').contains(title)).should('exist');
      
      const minSelect = getminIndex(name);
      if (!multipleselectionAllowed) {
        const rand = getuniqueRandoms(1, minSelect, maxSelect);
        const { label, value } = Options[rand];
        if (name === 'step-2:Who') setlookingFor(value);
        waitForHydration(cy.get(`div[id*=${optionsId}]`).contains(label)).click();
        waitForHydration(cy.get('button').contains(submitText)).click();
        verifypostUuidActions(name, optionsId, value);
      } else {
        const valueArr = [];
        const qty = Math.floor(Math.random() * (maxSelect));
        const arr = getuniqueRandoms(qty, minSelect, maxSelect);

        for (let i = 0; i < arr.length; i++) {
          const { label, value } = Options[arr[i]];
          valueArr.push(value);
          waitForHydration(cy.get(`div[id*=${optionsId}]`).contains(label)).click();
        }
        waitForHydration(cy.get('button').contains(submitText)).click();
        verifypostUuidActions(name, optionsId, valueArr);
      }
    });
  }

  beforeEach(() => {
    cy.server();
    cy.route({
      method: 'POST',
      url: '**/uuid-actions',
      response: {},
    }).as('postUuidActions');

    cy.getCommunity(TEST_COMMUNITY).then((response) => {
      community = response;
    });
    Cypress.Cookies.preserveOnce('sly_uuid', 'sly_sid');
  });

  responsive(() => {
    it('Visit community page', () => {
      cy.visit(`/assisted-living/california/san-francisco/${community.id}`);

      waitForHydration(cy.get('div[data-testid*=GetAssessmentBox]')).within(() => {
        cy.get('h3').contains('Need help finding senior living options?').should('exist');
        cy.get('a').contains('Take the quiz').click();
      });
    });

    for (let i = 0; i < wizardSteps; i++) {
      verifywizardStep(i);
    }

    it('Submit wizard form', () => {
      const { name, phone, email } = randomUser();
      const [fname, lname] = name.split(' ');
      waitForHydration(cy.get('form input[id=firstName]')).type(fname);
      waitForHydration(cy.get('form input[id=lastName]')).type(lname);
      waitForHydration(cy.get('form input[id=email]').first()).type(email);
      waitForHydration(cy.get('form input[id=phone_number]')).type(phone);
      waitForHydration(cy.get('form button[type=submit]').contains('Sign up to submit your request')).click({ force: true });

      cy.wait('@postUuidActions').then(async (xhr) => {
        const request = xhr.requestBody;
        const attrs = request.data.attributes;
        const contactType = 'pricingRequest';
        const slug = community.id;
        expect(attrs.actionInfo).to.deep.equal({ contactType, email,  name,  phone, slug });
        expect(attrs).to.have.property('actionPage', `/wizards/assessment/community/${community.id}`);
        expect(attrs).to.have.property('actionType', 'profileContacted');
      });

      cy.wait('@postUuidActions').then((xhr) => {
        const request = xhr.requestBody;
        const attrs = request.data.attributes;
        expect(attrs.actionInfo).to.have.property('stepName', 'step-8:Conversion');
        expect(attrs.actionInfo).to.have.property('wizardName', 'assessmentWizard');
        expect(attrs.actionInfo).to.have.property('wizardPostConversionInfo', 'wizardPostConversionInfo');
        expect(attrs).to.have.property('actionPage', `/wizards/assessment/community/${community.id}`);
        expect(attrs).to.have.property('actionType', 'wizardStepCompleted');
      });
      waitForHydration(cy.contains(`We've sent your request!`, { timeout: 30000 }));
    });
  });
});



import { LOCAL_EXPERT_OPTIONS, LIVE_SEARCH_STATE, PRODUCTS_OPTIONS, SERVICES_OPTIONS, AGE_OPTIONS, WORKING_WITH_OPTIONS, WHO_PERSON_OPTIONS, ADL_OPTIONS, TIMING_OPTIONS, BUDGET_OPTIONS, MEDICAID_OPTIONS } from '../../../../src/constants/wizards/assessment';
import { TEST_COMMUNITY } from '../../constants/community';
import { responsive, waitForHydration } from '../../helpers/tests';
import randomUser from '../../helpers/randomUser';

Cypress.on('uncaught:exception', () => {
  return false;
});

describe('Community survey', () => {
  let community;
  let lookingFor;
  const wizardVersion = 'Wizard_V1';
  const wizardSteps = 8;
  const postauthwizardSteps = 3;
  const WizardConfiguration = {
    Wizard_V1:
          [{ name: 'step-1:Timing',
            title: 'Where are you in your senior living search?',
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

          { name: 'step-2:WorkingWith',
            title: 'Do any of these apply to you?',
            Options: WORKING_WITH_OPTIONS,
            maxSelect: 4,
            optionsId: 'workingWith',
            skipAllowed: true,
            backAllowed: true,
            submitText: 'Continue',
            isSelect: false,
            multipleselectionAllowed: true,
            istitleNested: false,
          },

          { name: 'step-3:Who',
            title: 'Who are you looking for?',
            Options: WHO_PERSON_OPTIONS,
            maxSelect: 7,
            optionsId: 'lookingFor',
            skipAllowed: true,
            backAllowed: true,
            submitText: 'Continue',
            isSelect: true,
            multipleselectionAllowed: false,
            istitleNested: false,
          },

          { name: 'step-4:Age',
            title: {
              spouse: 'How old is your spouse?',
              myself: 'How old are you?',
              parents: 'How old is your parent(s)?',
              'myself-and-spouse': 'How old are you and your spouse?',
              friend: 'How old is your friend?',
              'other-relatives': 'How old is your relative?',
              other: 'How old is the person(s) you are searching for?',
            },
            Options: AGE_OPTIONS,
            maxSelect: 5,
            optionsId: 'age',
            skipAllowed: true,
            backAllowed: true,
            submitText: 'Continue',
            isSelect: false,
            multipleselectionAllowed: false,
            istitleNested: true,
          },
          { name: 'step-7:LocalSearch',
            title: 'Do you live in the state you’re searching in?',
            Options: LIVE_SEARCH_STATE,
            maxSelect: 2,
            optionsId: 'localSearch',
            skipAllowed: true,
            backAllowed: true,
            submitText: 'Continue',
            isSelect: false,
            multipleselectionAllowed: false,
            istitleNested: false,
          },
          { name: 'step-8:ADL',
            title: {
              spouse: 'Which activities does your spouse need help with?',
              myself: 'Which activities do you need help with?',
              parents: 'Which activities does your parent(s) need help with?',
              'myself-and-spouse': 'Which activities do you and your spouse need help with?',
              friend: 'Which activities does your friend(s) need help with?',
              'other-relatives': 'Which activities does your relative need help with?',
              other: 'Which activities below does the person you are looking for need help with?',
            },
            Options: ADL_OPTIONS,
            maxSelect: 7,
            optionsId: 'adl',
            skipAllowed: true,
            backAllowed: true,
            submitText: 'Continue',
            isSelect: false,
            multipleselectionAllowed: true,
            istitleNested: true,
          },
          { name: 'step-9:Budget',
            title: {
              spouse: 'Does your spouse have access to any of these benefits?',
              myself: 'Do you have access to any of these benefits?',
              parents: 'Do your parents have access to any of these benefits?',
              'myself-and-spouse': 'Do you and your spouse have access to any of these benefits?',
              friend: 'Does your friend(s) have access to any of these benefits?',
              'other-relatives': 'Does your relative(s) have access to any of these benefits?',
              other: 'Does the person you are looking for have access to any of these benefits?',
            },
            Options: BUDGET_OPTIONS,
            maxSelect: 7,
            optionsId: 'budget',
            skipAllowed: true,
            backAllowed: true,
            submitText: 'Continue',
            isSelect: false,
            multipleselectionAllowed: true,
            istitleNested: true,
          },
          { name: 'step-10:Medicaid',
            title: {
              spouse: 'Does your spouse qualify for Medicaid?',
              myself: 'Do you qualify for Medicaid?',
              parents: 'Do your parents qualify for Medicaid?',
              'myself-and-spouse': 'Do you or your spouse qualify for Medicaid?',
              friend: 'Does your friend(s) qualify for Medicaid?',
              'other-relatives': 'Does your relative(s) qualify for Medicaid?',
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
          {
            name: 'step-13:LocalExpert',
            title: 'Are you interested in working with a Local Senior Living Expert? They can help you find senior living options that fit your budget and care needs.',
            Options: LOCAL_EXPERT_OPTIONS,
            maxSelect: 3,
            optionsId: 'localExpert',
            skipAllowed: true,
            backAllowed: true,
            submitText: 'Finish',
            isSelect: false,
            multipleselectionAllowed: false,
            istitleNested: false,
          },
          { name: 'post-auth-step-6:Services',
            title: 'Please tell us if you are interested in these other services:',
            Options: SERVICES_OPTIONS,
            maxSelect: 7,
            optionsId: 'services',
            skipAllowed: true,
            backAllowed: true,
            submitText: 'Continue',
            isSelect: false,
            multipleselectionAllowed: true,
            istitleNested: false,
          },

          { name: 'post-auth-step-5:Products',
            title: 'Please tell us if you are interested in these products:',
            Options: PRODUCTS_OPTIONS,
            maxSelect: 7,
            optionsId: 'products',
            skipAllowed: true,
            backAllowed: true,
            submitText: 'Continue',
            isSelect: false,
            multipleselectionAllowed: true,
            istitleNested: false,
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

  function makeSelection(isSelect, optionsId, label) {
    if (isSelect) {
      waitForHydration(cy.get(`select[id*=${optionsId}]`).select(label));
    } else { waitForHydration(cy.get(`div[id*=${optionsId}]`).contains(label)).click(); }
  }

  // Do not include memory care for 'myself' and 'myself-and-spouse'
  function getminIndex(name) {
    if (name === 'step-8:ADL') {
      if (lookingFor === 'myself' || lookingFor === 'myself-and-spouse') { return 1; }
    }
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

  function verifyResidentDetails(stepname, data) {
    cy.wait('@postUuidActions').then((xhr) => {
      const request = xhr.requestBody;
      const attrs = request.data.attributes;
      expect(attrs.actionInfo.data).to.include(data);
      expect(request.data).to.have.property('type', 'UUIDAction');
      expect(attrs.actionInfo).to.have.property('stepName', stepname);
      expect(attrs.actionInfo).to.have.property('wizardName', 'assessmentWizard');
      expect(attrs).to.have.property('actionPage', `/wizards/assessment/community/${community.id}`);
      expect(attrs).to.have.property('actionType', 'wizardStepCompleted');
    });
  }


  function fillinresidentDetails(id1, id2, firstName, lastName) {
    waitForHydration(cy.get(`input[id*=${id1}]`).should('exist')).type(firstName.trim());
    waitForHydration(cy.get(`input[id*=${id2}]`).should('exist')).type(lastName.trim());
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
        if (name === 'step-3:Who') setlookingFor(value);
        makeSelection(isSelect, optionsId, label);
        waitForHydration(cy.get('button').contains(submitText)).click();
        verifypostUuidActions(name, optionsId, value);
      } else {
        const valueArr = [];
        const qty = Math.floor(Math.random() * (maxSelect));
        const arr = getuniqueRandoms(qty, minSelect, maxSelect);

        for (let i = 0; i < arr.length; i++) {
          const { label, value } = Options[arr[i]];
          valueArr.push(value);
          makeSelection(isSelect, optionsId, label);
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

      waitForHydration(cy.get('div[class*=GetAssessmentBox__Wrapper]')).within(() => {
        cy.get('h3').contains('Complete this 3-minute assessment tool to get personalized senior living and care options.').should('exist');
        cy.get('a').contains('Start').click();
      });
    });

    for (let i = 0; i < wizardSteps; i++) {
      verifywizardStep(i);
    }
    it('Submit wizard form', () => {
      // waitForHydration(cy.get('main[class*=AssessmentWizardPage]').find('h3').contains('Please provide your contact details so we can connect with you regarding your detailed pricing and personalized senior living and care options.', { timeout: 30000 })).should('exist');
      const { name, phone, email } = randomUser();
      const [fname, lname] = name.split(' ');
      waitForHydration(cy.get('form input[id=firstName]')).type(fname.trim());
      waitForHydration(cy.get('form input[id=lastName]')).type(lname.trim());
      waitForHydration(cy.get('form input[id=email]').first()).type(email.trim());
      waitForHydration(cy.get('form input[id=phone_number]')).type(phone.trim());
      waitForHydration(cy.get('form button[type=submit]').contains('Get Pricing')).click();

      cy.wait('@postUuidActions').then(async (xhr) => {
        const request = xhr.requestBody;
        const attrs = request.data.attributes;
        expect(attrs.actionInfo).to.deep.equal({ contactType: 'pricingRequest',  email,  name,  phone,  slug: `${community.id}` });
        expect(attrs).to.have.property('actionPage', `/wizards/assessment/community/${community.id}`);
        expect(attrs).to.have.property('actionType', 'profileContacted');
      });

      cy.wait('@postUuidActions').then((xhr) => {
        const request = xhr.requestBody;
        const attrs = request.data.attributes;
        expect(attrs.actionInfo).to.have.property('stepName', 'step-11:Auth');
        expect(attrs.actionInfo.data).to.deep.equal({ contactType: 'pricingRequest',  email,  name,  phone,  slug: `${community.id}` });
        expect(attrs).to.have.property('actionPage', `/wizards/assessment/community/${community.id}`);
        expect(attrs).to.have.property('actionType', 'wizardStepCompleted');
      });
    });

    it('Resident details', () => {
      const randUser = randomUser();
      const lookingFor = getlookingFor();
      const [fname, lname] = (randUser.name).split(' ');
      let data = {};

      if (lookingFor === 'parents' || lookingFor === 'myself-and-spouse') {
        waitForHydration(cy.get('main[class*=AssessmentWizardPage]').find('h3').contains('What are the residents\' names?')).should('exist');
        fillinresidentDetails('firstName1', 'lastName1', fname, lname);
        const randUser2 = randomUser();
        const [fname2, lname2] = (randUser2.name).split(' ');
        fillinresidentDetails('firstName2', 'lastName2', fname2, lname2);
        data = { firstName1: fname, lastName1: lname, firstName2: fname2, lastName2: lname2 };
      } else {
        waitForHydration(cy.get('main[class*=AssessmentWizardPage]').find('h3').contains('What is the resident\'s name?')).should('exist');
        fillinresidentDetails('firstName', 'lastName', fname, lname);
        data = { firstName: fname, lastName: lname };
      }
      waitForHydration(cy.get('button').contains('Continue')).click();
      verifyResidentDetails('step-12:ResidentName', data);
    });

    for (let i = wizardSteps; i < wizardSteps + postauthwizardSteps; i++) {
      verifywizardStep(i);
    }

    it('Post Conversion step', () => {
      waitForHydration(cy.contains('You\'re all set! One of our Local Senior Living Experts will reach out shortly to assist you with pricing for AlmaVia of San Francisco.', { timeout: 30000 }));
      waitForHydration(cy.get('div[class*=PostConversionGreetingForm]').contains('Return to Profile')).click();
      cy.url().should('have.string', `/assisted-living/california/san-francisco/${community.id}`);
    });
  });
});


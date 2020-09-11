
import { LIVE_SEARCH_STATE, PRODUCTS_OPTIONS, SERVICES_OPTIONS, AGE_OPTIONS, WORKING_WITH_OPTIONS, WHO_PERSON_OPTIONS, ADL_OPTIONS, TIMING_OPTIONS, BUDGET_OPTIONS, MEDICAID_OPTIONS } from '../../../../src/constants/wizards/assessment';
import { TEST_COMMUNITY } from '../../constants/community';
import { responsive, waitForHydration } from '../../helpers/tests';

describe('Community survey', () => {
  let community;
  let lookingFor;
  const wizardVersion = 'Wizard_V1';
  const wizardSteps = 11;
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
            isselect: false,
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
            isselect: false,
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
            isselect: true,
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
              'other-relatives': 'How old is the person(s) you are searching for?',
              other: 'How old is the person(s) you are searching for?',
            },
            Options: AGE_OPTIONS,
            maxSelect: 5,
            optionsId: 'age',
            skipAllowed: true,
            backAllowed: true,
            submitText: 'Continue',
            isselect: false,
            multipleselectionAllowed: false,
            istitleNested: true,
          },
          { name: 'step-6:Services',
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

          { name: 'step-5:Products',
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
              spouse: 'Which activities below does the person you are looking for need help with?',
              myself: 'Which activities do you need help with?',
              parents: 'Which activities do your parents need help with?',
              'myself-and-spouse': 'Which activities do you and your spouse need help with?',
              friend: 'Which activities do you need help with?',
              'other-relatives': 'Which activities below does the person you are looking for need help with?',
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
              spouse: 'Does the person you are looking for have access to any of these benefits?',
              myself: 'Do you have access to any of these benefits?',
              parents: 'Do your parents have access to any of these benefits?',
              'myself-and-spouse': 'Do you and your spouse have access to any of these benefits?',
              friend: 'Does the person you are looking for have access to any of these benefits?',
              'other-relatives': 'Does the person you are looking for have access to any of these benefits?',
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
              spouse: 'Does your person qualify for Medicaid?',
              myself: 'Do you qualify for Medicaid?',
              parents: 'Do your parents qualify for Medicaid?',
              'myself-and-spouse': 'Do you or your spouse qualify for Medicaid?',
              friend: 'Does your friend(s) qualify for Medicaid?',
              'other-relatives': 'Does your person qualify for Medicaid?',
              other: 'Does your person qualify for Medicaid?',
            },
            Options: MEDICAID_OPTIONS,
            maxSelect: 3,
            optionsId: 'medicaid',
            skipAllowed: true,
            backAllowed: true,
            submitText: 'Continue',
            isSelect: true,
            multipleselectionAllowed: false,
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

  function makeSelection(isselect, optionsId, label) {
    if (isselect) {
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


  function verifypostUuidActions(stepname, val, optionsId) {
    cy.wait('@postUuidActions').then((xhr) => {
      const request = xhr.requestBody;
      expect(request.data).to.have.property('type', 'UUIDAction');
      expect(request.data.attributes.actionInfo).to.have.property('stepName', stepname);
      expect(request.data.attributes.actionInfo).to.have.property('wizardName', 'assessmentWizard');
      expect(request.data.attributes.actionInfo.data).to.have.property(`${optionsId}`).to.deep.equal(val);
      expect(request.data.attributes).to.have.property('actionPage', `/wizards/assessment/community/${community.id}`);
      expect(request.data.attributes).to.have.property('actionType', 'wizardStepCompleted');
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
  });


  responsive(() => {
    it('Visit community page', () => {
      cy.visit(`/assisted-living/california/san-francisco/${community.id}`);

      waitForHydration(cy.get('div[class*=GetAssessmentBox__Wrapper]')).within(() => {
        cy.get('h3').contains('Complete this 3-minute assessment tool to get personalized senior living and care options.').should('exist');
        cy.get('a').contains('Start').click();
      });
    });


    for (let i = 0; i < wizardSteps - 1; i++) {
      const { name, Options, maxSelect, submitText, optionsId, isselect, multipleselectionAllowed, istitleNested } = WizardConfiguration[wizardVersion][i];

      const title = () => {
        if (!istitleNested) { return WizardConfiguration[wizardVersion][i].title; }
        return WizardConfiguration[wizardVersion][i].title[getlookingFor()];
      };

      it(`${name}`, () => {
        waitForHydration(cy.get('div[class*=Box]').first().find('h3').contains(title())).should('exist');

        const min = getminIndex(name);
        if (!multipleselectionAllowed) {
          const rand = getuniqueRandoms(1, min, maxSelect);
          const { label, value } = Options[rand];
          if (name === 'step-3:Who') setlookingFor(value);
          makeSelection(isselect, optionsId, label, submitText);
          waitForHydration(cy.get('button').contains(submitText)).click();
          verifypostUuidActions(name, value, optionsId);
        } else {
          const valueArr = [];
          const qty = Math.floor(Math.random() * (maxSelect));
          const arr = getuniqueRandoms(qty, min, maxSelect);

          for (let i = 0; i < arr.length; i++) {
            const { label, value } = Options[arr[i]];
            valueArr.push(value);
            makeSelection(isselect, optionsId, label, submitText);
          }
          waitForHydration(cy.get('button').contains(submitText)).click();
          verifypostUuidActions(name, valueArr, optionsId);
        }
      });
    }
  });
});

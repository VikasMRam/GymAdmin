import { WHO_PERSON_OPTIONS, FEELING_OPTIONS, ADL_OPTIONS, DEMENTIA_FORGETFUL_DEFAULT_OPTIONS, DEMENTIA_FORGETFUL_OPTIONS, TIMING_OPTIONS, CURRENT_LIVING_OPTIONS, CURRENT_LIVING_DEFAULT_OPTIONS, BUDGET_OPTIONS, MEDICAID_OPTIONS } from '../../../../src/constants/wizards/assessment';
import { TEST_COMMUNITY, LOOKING_FOR, SEARCH_FEELING, HELP_REQUIRED, FORGETFULNESS, SEARCH_TIMING, CURRENT_LIVING, BUDGET_PLAN, MEDICAID_ALLOWANCE } from '../../constants/community';
import { responsive, waitForHydration } from '../../helpers/tests';

describe('Community survey', () => {
  let community;

  const whoObj = WHO_PERSON_OPTIONS.filter(e =>  e.label === `${LOOKING_FOR}`);

  const feelingObj = FEELING_OPTIONS.filter(e => e.label === `${SEARCH_FEELING}`);

  const medicaidObj = MEDICAID_OPTIONS.filter(e =>  e.value === `${MEDICAID_ALLOWANCE}`);

  const adlObj = [];
  HELP_REQUIRED.forEach((key) => {
    adlObj.push(ADL_OPTIONS.filter((e) => { return e.label === key; }));
  });
  const adlValues = adlObj.map((Item) => { return Item[0].value; });

  const loaddementiaDefaults = (() => {
    if (`${LOOKING_FOR}` === 'Parents' || `${LOOKING_FOR}` === 'Myself and spouse') return DEMENTIA_FORGETFUL_OPTIONS;
    return DEMENTIA_FORGETFUL_DEFAULT_OPTIONS;
  })();

  const dementiaObj = [];
  FORGETFULNESS.forEach((key) => {
    dementiaObj.push(loaddementiaDefaults[`${whoObj[0].value}`].filter((e) => { return e.value === key; }));
  });
  const dementiaOptions = dementiaObj.map((Item) => { return Item[0].label; });

  const timingObj = [];
  SEARCH_TIMING.forEach((key) => {
    timingObj.push(TIMING_OPTIONS.filter((e) => { return e.value === key; }));
  });
  const timingOptions = timingObj.map((Item) => { return Item[0].label; });

  let currentLivingObj;
  if (`${LOOKING_FOR}` === 'Parents' || `${LOOKING_FOR}` === 'Myself and spouse') {
    currentLivingObj = CURRENT_LIVING_OPTIONS[`${whoObj[0].value}`].filter((e) => {
      return e.value === `${CURRENT_LIVING}`;
    });
  } else {
    currentLivingObj = CURRENT_LIVING_DEFAULT_OPTIONS.filter((e) => {
      return e.value === `${CURRENT_LIVING}`;
    });
  }

  const budgetObj = [];
  BUDGET_PLAN.forEach((key) => {
    budgetObj.push(BUDGET_OPTIONS.filter((e) => { return e.value === key; }));
  });
  const budgetOptions = budgetObj.map((Item) => { return Item[0].label; });

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

      cy.wait('@postUuidActions').then((xhr) => {
        expect(xhr.requestBody).to.deep.equal({
          data: {
            type: 'UUIDAction',
            attributes: {
              actionType: 'profileViewed',
              actionPage: `/assisted-living/california/san-francisco/${community.id}`,
              actionInfo: {
                slug: community.id,
              },
            },
          },
        });
      });

      waitForHydration(cy.get('div[class*=GetAssessmentBox__Wrapper]')).within(() => {
        cy.get('h3').contains('Complete this 3-minute assessment tool to get personalized senior living and care options.').should('exist');
        cy.get('a').contains('Start').click();
      });
    });

    it('WHO - Verify header', () => {
      waitForHydration(cy.get('div[class*=Box]').first().find('h3').contains('Who are you looking for?')).should('exist');
      waitForHydration(cy.get('select[id*=lookingFor]').contains('Select a person')).should('exist');
    });

    it('WHO -  single selection', () => {
      waitForHydration(cy.get('select').eq(0).select(whoObj[0].label)).should('have.value', whoObj[0].value);
      waitForHydration(cy.get('button').contains('Continue')).click();

      cy.wait('@postUuidActions').then((xhr) => {
        expect(xhr.requestBody).to.deep.equal({
          data: {
            type: 'UUIDAction',
            attributes: {
              actionInfo: {
                stepName: 'who',
                wizardName: 'assessmentWizard',
                data: {
                  lookingFor: whoObj[0].value,
                },
              },
              actionPage: `/wizards/assessment/community/${community.id}`,
              actionType: 'wizardStepCompleted',
            },
          },
        });
      });
    });

    it('FEELING - Verify header', () => {
      waitForHydration(cy.get('div[class*=Box-sc]').find('h3').contains('How are you feeling about finding a senior living community?')).should('exist');
    });

    it('FEELING - single selection', () => {
      waitForHydration(cy.get('div[class*=Feeling__StyledField]').contains(feelingObj[0].label)).click();
      waitForHydration(cy.get('button').contains('Continue')).click({ force: true });

      cy.wait('@postUuidActions').then((xhr) => {
        expect(xhr.requestBody).to.deep.equal({
          data: {
            type: 'UUIDAction',
            attributes: {
              actionInfo: {
                stepName: 'feeling',
                wizardName: 'assessmentWizard',
                data: {
                  lookingFor: whoObj[0].value,
                  feeling: feelingObj[0].value,
                },
              },
              actionPage: `/wizards/assessment/community/${community.id}`,
              actionType: 'wizardStepCompleted',
            },
          },
        });
      });
    });

    it('ADL co existing options - \'None\' selection should uncheck other selections', () => {
      // Should unselect all other selections on selecting None
      waitForHydration(cy.get('div[class*=ADL__StyledField]')).within(() => {
        cy.contains('Bathing').click();
        cy.contains('Dressing').click();
        cy.contains('Eating').click();
        cy.contains('I\'m not sure').click();

        cy.contains('None').click();

        cy.contains('Bathing').parent().should('have.descendants', '[data-cy=checkbox-empty]');
        cy.contains('Dressing').parent().should('have.descendants', '[data-cy=checkbox-empty]');
        cy.contains('Eating').parent().should('have.descendants', '[data-cy=checkbox-empty]');
        cy.contains('I\'m not sure').parent().should('have.descendants', '[data-cy=checkbox-empty]');
        cy.contains('None').parent().should('have.descendants', '[data-cy=checkbox]');
      });

      waitForHydration(cy.get('button').contains('Continue')).click();
      cy.wait('@postUuidActions').then((xhr) => {
        expect(xhr.requestBody).to.deep.equal({
          data: {
            type: 'UUIDAction',
            attributes: {
              actionInfo: {
                stepName: 'ADL',
                wizardName: 'assessmentWizard',
                data: {
                  lookingFor: whoObj[0].value,
                  feeling: feelingObj[0].value,
                  adl: ['none'],
                },
              },
              actionPage: `/wizards/assessment/community/${community.id}`,
              actionType: 'wizardStepCompleted',
            },
          },
        });
      });
      waitForHydration(cy.get('div[class*=Template__ButtonWrapper]').contains('Back')).click();
    });

    it('ADL co existing options - \'Not Sure\' should uncheck other selections', () => {
      // Should unselect all other selections on selecting I'm not sure
      waitForHydration(cy.get('div[class*=ADL__StyledField]')).within(() => {
        cy.contains('Bathing').click();
        cy.contains('Dressing').click();
        cy.contains('Eating').click();
        cy.contains('I\'m not sure').click();

        cy.contains('Bathing').parent().should('have.descendants', '[data-cy=checkbox-empty]');
        cy.contains('Dressing').parent().should('have.descendants', '[data-cy=checkbox-empty]');
        cy.contains('Eating').parent().should('have.descendants', '[data-cy=checkbox-empty]');
        cy.contains('I\'m not sure').parent().should('have.descendants', '[data-cy=checkbox]');
      });

      waitForHydration(cy.get('button').contains('Continue')).click({ force: true });

      cy.wait('@postUuidActions').then((xhr) => {
        expect(xhr.requestBody).to.deep.equal({
          data: {
            type: 'UUIDAction',
            attributes: {
              actionInfo: {
                stepName: 'ADL',
                wizardName: 'assessmentWizard',
                data: {
                  lookingFor: whoObj[0].value,
                  feeling: feelingObj[0].value,
                  adl: ['im-not-sure'],
                },
              },
              actionPage: `/wizards/assessment/community/${community.id}`,
              actionType: 'wizardStepCompleted',
            },
          },
        });
      });
    });

    it('Verify back button', () => {
      waitForHydration(cy.get('div[class*=Template__ButtonWrapper]').contains('Back')).click();
    });

    it('ADL - Verify header', () => {
      if (`${LOOKING_FOR}` === 'Myself') {
        waitForHydration(cy.get('div[class*=Box-sc]').find('h3').contains('Which activities do you need help with?')).should('exist');
      } else if (`${LOOKING_FOR}` === 'Myself and spouse') { waitForHydration(cy.get('div[class*=Box-sc]').find('h3').contains('Which activities do you and your spouse need help with?')).should('exist'); } else if (`${LOOKING_FOR}` === 'Parents') { waitForHydration(cy.get('div[class*=Box-sc]').find('h3').contains('Which activities do your parents need help with?')).should('exist'); } else { waitForHydration(cy.get('div[class*=Box-sc]').find('h3').contains(`Which activities below does your ${whoObj[0].value} need help with?`)).should('exist'); }
    });

    it('ADL - Multiple selection', () => {
      waitForHydration(cy.get('div[class*=ADL__StyledField')).within(() => {
        HELP_REQUIRED.forEach((key) => {
          cy.contains(key).click();
        });
      });
      waitForHydration(cy.get('button').contains('Continue')).click({ force: true });

      cy.wait('@postUuidActions').then((xhr) => {
        expect(xhr.requestBody).to.deep.equal({
          data: {
            type: 'UUIDAction',
            attributes: {
              actionInfo: {
                stepName: 'ADL',
                wizardName: 'assessmentWizard',
                data: {
                  lookingFor: whoObj[0].value,
                  feeling: feelingObj[0].value,
                  adl: adlValues,
                },
              },
              actionPage: `/wizards/assessment/community/${community.id}`,
              actionType: 'wizardStepCompleted',
            },
          },
        });
      });
    });

    it('DEMENTIA - Verify header', () => {
      if (`${LOOKING_FOR}` === 'Myself') {
        waitForHydration(cy.get('div[class*=Box-sc]').find('h3').contains('Are you forgetful?')).should('exist');
      } else if (`${LOOKING_FOR}` === 'Parents') { waitForHydration(cy.get('div[class*=Box-sc]').find('h3').contains('Are your parents forgetful?')).should('exist'); } else if (`${LOOKING_FOR}` === 'Myself and spouse') { waitForHydration(cy.get('div[class*=Box-sc]').find('h3').contains('Are you and your spouse forgetful?')).should('exist'); } else { waitForHydration(cy.get('div[class*=Box-sc]').find('h3').contains(`Is your ${whoObj[0].value} forgetful?`)).should('exist'); }
    });

    it('DEMENTIA - multiple selection', () => {
      waitForHydration(cy.get('div[class*=Dementia__StyledField')).within(() => {
        dementiaOptions.forEach((key) => {
          cy.contains(key).click();
        });
      });
      waitForHydration(cy.get('button').contains('Continue')).click({ force: true });

      cy.wait('@postUuidActions').then((xhr) => {
        expect(xhr.requestBody).to.deep.equal({
          data: {
            type: 'UUIDAction',
            attributes: {
              actionInfo: {
                stepName: 'dementia',
                wizardName: 'assessmentWizard',
                data: {
                  lookingFor: whoObj[0].value,
                  feeling: feelingObj[0].value,
                  adl: adlValues,
                  forgetful: FORGETFULNESS,
                },
              },
              actionPage: `/wizards/assessment/community/${community.id}`,
              actionType: 'wizardStepCompleted',
            },
          },
        });
      });
    });

    it('TIMING- Verify header', () => {
      waitForHydration(cy.get('div[class*=Box-sc]').find('h3').contains('Please tell us about where you are in your search.')).should('exist');
    });

    it('TIMING - multiple selection', () => {
      waitForHydration(cy.get('div[class*=Timing__StyledField')).within(() => {
        timingOptions.forEach((key) => {
          cy.contains(key).click();
        });
      });
      waitForHydration(cy.get('button').contains('Continue')).click({ force: true });

      cy.wait('@postUuidActions').then((xhr) => {
        expect(xhr.requestBody).to.deep.equal({
          data: {
            type: 'UUIDAction',
            attributes: {
              actionInfo: {
                stepName: 'timing',
                wizardName: 'assessmentWizard',
                data: {
                  lookingFor: whoObj[0].value,
                  feeling: feelingObj[0].value,
                  adl: adlValues,
                  forgetful: FORGETFULNESS,
                  timing: SEARCH_TIMING,
                },
              },
              actionPage: `/wizards/assessment/community/${community.id}`,
              actionType: 'wizardStepCompleted',
            },
          },
        });
      });
    });

    it('CURRENTLIVING - Verify header', () => {
      if (`${LOOKING_FOR}` === 'Myself') {
        waitForHydration(cy.get('div[class*=Box-sc]').find('h3').contains('Please tell us about your current living situation')).should('exist');
      } else if (`${LOOKING_FOR}` === 'Parents') {
        waitForHydration(cy.get('div[class*=Box-sc]').find('h3').contains('Please tell us about your parents\'s current living situation.')).should('exist');
      } else if (`${LOOKING_FOR}` === 'Myself and spouse') { waitForHydration(cy.get('div[class*=Box-sc]').find('h3').contains('Please tell us about you and your spouse\'s current living situation.')).should('exist'); } else { waitForHydration(cy.get('div[class*=Box-sc]').find('h3').contains(`Please tell us about your ${whoObj[0].value}'s current living situation.`)).should('exist'); }
    });

    it('CURRENTLIVING - multiple selection', () => {
      waitForHydration(cy.get('div[class*=CurrentLiving__StyledField')).within(() => {
        cy.contains(currentLivingObj[0].label).click();
      });
      waitForHydration(cy.get('button').contains('Continue')).click({ force: true });

      cy.wait('@postUuidActions').then((xhr) => {
        expect(xhr.requestBody).to.deep.equal({
          data: {
            type: 'UUIDAction',
            attributes: {
              actionInfo: {
                stepName: 'currentLiving',
                wizardName: 'assessmentWizard',
                data: {
                  lookingFor: whoObj[0].value,
                  feeling: feelingObj[0].value,
                  adl: adlValues,
                  forgetful: FORGETFULNESS,
                  timing: SEARCH_TIMING,
                  currentLiving: currentLivingObj[0].value,
                },
              },
              actionPage: `/wizards/assessment/community/${community.id}`,
              actionType: 'wizardStepCompleted',
            },
          },
        });
      });
    });

    it('BUDGET - Verify header', () => {
      if (`${LOOKING_FOR}` === 'Myself') {
        waitForHydration(cy.get('div[class*=Box-sc]').find('h3').contains('Do you have access to any of these benefits?')).should('exist');
      } else if (`${LOOKING_FOR}` === 'Parents') {
        waitForHydration(cy.get('div[class*=Box-sc]').find('h3').contains('Do your parents have access to any of these benefits?')).should('exist');
      } else if (`${LOOKING_FOR}` === 'Myself and spouse') { waitForHydration(cy.get('div[class*=Box-sc]').find('h3').contains('Do you and your spouse have access to any of these benefits?')).should('exist'); } else { waitForHydration(cy.get('div[class*=Box-sc]').find('h3').contains(`Does your ${whoObj[0].value} have access to any of these benefits?`)).should('exist'); }
    });

    it('BUDGET - multiple selection', () => {
      waitForHydration(cy.get('div[class*=Budget__StyledField')).within(() => {
        budgetOptions.forEach((key) => {
          cy.contains(key).click();
        });
      });
      waitForHydration(cy.get('button').contains('Continue')).click({ force: true });

      cy.wait('@postUuidActions').then((xhr) => {
        expect(xhr.requestBody).to.deep.equal({
          data: {
            type: 'UUIDAction',
            attributes: {
              actionInfo: {
                stepName: 'budget',
                wizardName: 'assessmentWizard',
                data: {
                  lookingFor: whoObj[0].value,
                  feeling: feelingObj[0].value,
                  adl: adlValues,
                  forgetful: FORGETFULNESS,
                  timing: SEARCH_TIMING,
                  currentLiving: currentLivingObj[0].value,
                  budget: BUDGET_PLAN,
                },
              },
              actionPage: `/wizards/assessment/community/${community.id}`,
              actionType: 'wizardStepCompleted',
            },
          },
        });
      });
    });

    it('MEDICAID - Verify header', () => {
      if (`${LOOKING_FOR}` === 'Myself') {
        waitForHydration(cy.get('div[class*=Box-sc]').find('h3').contains('Do you qualify for Medicaid?')).should('exist');
      } else if (`${LOOKING_FOR}` === 'Parents') {
        waitForHydration(cy.get('div[class*=Box-sc]').find('h3').contains('Do your parents qualify for Medicaid?')).should('exist');
      } else if (`${LOOKING_FOR}` === 'Myself and spouse') { waitForHydration(cy.get('div[class*=Box-sc]').find('h3').contains('Do you or your spouse qualify for Medicaid?')).should('exist'); } else { waitForHydration(cy.get('div[class*=Box-sc]').find('h3').contains(`Does your ${whoObj[0].value} qualify for Medicaid?`)).should('exist'); }
    });

    it('MEDICAID - single selection', () => {
      waitForHydration(cy.get('div[class*=Medicaid__StyledField')).within(() => {
        cy.contains(medicaidObj[0].label).click();
      });
      waitForHydration(cy.get('button').contains('Continue')).click({ force: true });

      cy.wait('@postUuidActions').then((xhr) => {
        expect(xhr.requestBody).to.deep.equal({
          data: {
            type: 'UUIDAction',
            attributes: {
              actionInfo: {
                stepName: 'medicaid',
                wizardName: 'assessmentWizard',
                data: {
                  lookingFor: whoObj[0].value,
                  feeling: feelingObj[0].value,
                  adl: adlValues,
                  forgetful: FORGETFULNESS,
                  timing: SEARCH_TIMING,
                  currentLiving: currentLivingObj[0].value,
                  budget: BUDGET_PLAN,
                  medicaid: medicaidObj[0].value,
                },
              },
              actionPage: `/wizards/assessment/community/${community.id}`,
              actionType: 'wizardStepCompleted',
            },
          },
        });
      });
    });

    it('Submit End wizard form - Login to existing account', () => {
      waitForHydration(cy.get('div[class*=Box-sc]').find('h2').contains('Please provide your contact details so we can connect with you regarding your detailed pricing and personalized senior living and care options.')).should('exist');
      waitForHydration(cy.get('div[class*=SignupForm__BottomWrapper]').contains('Log in')).click();
      waitForHydration(cy.get('form div[type=email]').contains('Email')).type('slytest+admin@seniorly.com');
      waitForHydration(cy.get('form div[type=password]').contains('Password')).type('nopassword');
      waitForHydration(cy.get('form button[type=submit]').contains('Log in')).click();
      // cy.wait(1000);
      cy.wait('@postUuidActions').then((xhr) => {
        expect(xhr.requestBody).to.deep.equal({
          data: {
            type: 'UUIDAction',
            attributes: {
              actionInfo: {
                contactType: 'pricingRequest',
                email: 'slytest+admin@seniorly.com',
                phone: '4155554444',
                slug: 'almavia-of-san-francisco',
              },
              actionPage: `/wizards/assessment/community/${community.id}`,
              actionType: 'profileContacted',
            },
          },
        });
      });

      cy.wait('@postUuidActions').then((xhr) => {
        expect(xhr.requestBody).to.deep.equal({
          data: {
            type: 'UUIDAction',
            attributes: {
              actionInfo: {
                stepName: 'auth',
                wizardName: 'assessmentWizard',
                data: {
                  contactType: 'pricingRequest',
                  email: 'slytest+admin@seniorly.com',
                  phone: '4155554444',
                  slug: 'almavia-of-san-francisco',
                },
              },
              actionPage: `/wizards/assessment/community/${community.id}`,
              actionType: 'wizardStepCompleted',
            },
          },
        });
      });

      // 1. ENTER RESIDENTS DETAILS
      // Enter 2 residents for parents and myself and spouse
      if (`${LOOKING_FOR}` === 'Parents' || `${LOOKING_FOR}` === 'Myself and spouse') {
        waitForHydration(cy.get('div[class*=Box-sc]').find('h3').contains('Last question, what are the residents\' names?')).should('exist');
        waitForHydration(cy.get('input[name=firstName1]').should('exist')).type('test+inchara+fname1');
        waitForHydration(cy.get('input[name=lastName1]').should('exist')).type('test+raj+lname1');
        waitForHydration(cy.get('input[name=firstName2]').should('exist')).type('test+inchara+fname2');
        waitForHydration(cy.get('input[name=lastName2]').should('exist')).type('test+inchara+lname2');

        waitForHydration(cy.get('button').contains('Finish')).click();

        cy.wait('@postUuidActions').then((xhr) => {
          expect(xhr.requestBody).to.deep.equal({
            data: {
              type: 'UUIDAction',
              attributes: {
                actionInfo: {
                  stepName: 'residentName',
                  wizardName: 'assessmentWizard',
                  data: {
                    lookingFor: whoObj[0].value,
                    feeling: feelingObj[0].value,
                    adl: adlValues,
                    forgetful: FORGETFULNESS,
                    timing: SEARCH_TIMING,
                    currentLiving: currentLivingObj[0].value,
                    budget: BUDGET_PLAN,
                    medicaid: medicaidObj[0].value,
                    firstName1: 'test+inchara+fname1',
                    lastName1: 'test+raj+lname1',
                    firstName2: 'test+inchara+fname2',
                    lastName2: 'test+inchara+lname2',
                  },
                },
                actionPage: `/wizards/assessment/community/${community.id}`,
                actionType: 'wizardStepCompleted',
              },
            },
          });
        });
      } else {
        waitForHydration(cy.get('div[class*=Box-sc]').find('h3').contains('Last question, what is the resident\'s name?')).should('exist');
        waitForHydration(cy.get('input[name=firstName]').should('exist')).type('test+inchara');
        waitForHydration(cy.get('input[name=lastName]').should('exist')).type('test+raj');

        waitForHydration(cy.get('button').contains('Finish')).click();

        cy.wait('@postUuidActions').then((xhr) => {
          expect(xhr.requestBody).to.deep.equal({
            data: {
              type: 'UUIDAction',
              attributes: {
                actionInfo: {
                  stepName: 'residentName',
                  wizardName: 'assessmentWizard',
                  data: {
                    lookingFor: whoObj[0].value,
                    feeling: feelingObj[0].value,
                    adl: adlValues,
                    forgetful: FORGETFULNESS,
                    timing: SEARCH_TIMING,
                    currentLiving: currentLivingObj[0].value,
                    budget: BUDGET_PLAN,
                    medicaid: medicaidObj[0].value,
                    firstName: 'test+inchara',
                    lastName: 'test+raj',
                  },
                },
                actionPage: `/wizards/assessment/community/${community.id}`,
                actionType: 'wizardStepCompleted',
              },
            },
          });
        });
      }

      waitForHydration(cy.contains('You\'re all set! One of our Local Senior Living Experts will reach out shortly to assist you with pricing for AlmaVia of San Francisco.', { timeout: 30000 }));
      waitForHydration(cy.get('div[class*=PostConversionGreetingForm__BoxWrapper]').contains('Return to Profile')).click();
      cy.url().should('have.string', `/assisted-living/california/san-francisco/${TEST_COMMUNITY}`);

      cy.request('DELETE', '/v0/platform/auth/logout');
    });
  });
});

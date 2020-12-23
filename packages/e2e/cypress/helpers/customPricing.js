import { select } from './tests';

const submitTillContactStep = (data) => {
  const {
    name, phone, moveTimeline, typeOfCare, medicaid,
  } = data;

  cy.server();
  cy.route('POST', '**/uuid-actions').as('postUuidActions');
  cy.route('POST', '**/auth/register').as('postAuthRegister');
  cy.route('GET', '**/users/me').as('getUserMe');

  cy.contains('Please help by answering these three questions');

  cy.get('div[class*=BoxChoiceTile__StyledBox]').contains(moveTimeline).click();

  cy.get('div[class*=BoxChoiceTile__StyledBox]').contains(typeOfCare).click();

  cy.get('div[class*=BoxChoiceTile__StyledBox]').contains(medicaid).click();

  cy.get('button').contains('Continue').click();

  cy.get('div[class*=ConversionWizardInfoStep__ButtonWrapper]').contains('I do NOT qualify for Medicaid').click();

  cy.get('input[name="name"]').type(name);
  cy.get('input[name="phone"]').type(phone);

  cy.get('button').contains('Continue').click();


  cy.wait(['@postUuidActions', '@postAuthRegister', '@getUserMe']);

  // wait till step is progressed

  // cy.contains('Your estimated pricing');
  cy.contains('One of our Seniorly Local Advisors will reach out shortly to assist you with pricing', { timeout: 30000 });
};

export const doCustomPricingTalkToAdvisorFlow = (cy, data) => {
  const { communitySlug } = data;

  submitTillContactStep(data);

  // cy.get('button').contains('Talk to an advisor').click();

  // select('.Modal__Body h2').contains('Thank you! Our team will be calling you from (855) 855-2629.');

  // select('.Modal__Head button').click();

  cy.get('div[class*=PostConversionGreetingForm__BoxWrapper]').contains('Return to Profile').click();

  cy.url().should('have.string', `/assisted-living/california/san-francisco/${communitySlug}`);

  select('.CommunityDetailPage').should('exist');
};

// export const doCustomPricingExploreAffordableOptionsFlow = (cy, data) => {
//    submitTillContactStep(data);

// cy.get('button').contains('Explore more affordable options').click();

// cy.contains('What is your monthly');

// cy.get('button').contains('$2000 - $3000').click();

// cy.contains('what happens next');

// cy.get('button').contains('View Dashboard').click();

// cy.url().should('have.string', '/dashboard/family/my-profile');
// };

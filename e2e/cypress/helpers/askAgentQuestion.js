export const doAskAgentQuestionFlow = (cy, data) => {
  const { question, name, phone, communitySlug } = data;

  cy.get('form[name="CommunityAskQuestionAgentForm"]').within(() => {
    cy.get('input[name="full_name"]').type(name);

    cy.get('input[name="phone"]').type(phone);

    cy.get('textarea[name="question"]').type(question);

    cy.root().submit();
  });

  cy.url().should('have.string', `/assisted-living/california/san-francisco/${communitySlug}`);
};

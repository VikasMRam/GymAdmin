function inputValuesAndAssert(cy) {
  const communitySlug = 'buena-vista-manor-house';
  const name = 'Pranesh Kumar';
  const phoneNumber = '9999999999';

  cy.visit(`/custom-pricing/${communitySlug}`);

  cy.contains('Get your Pricing and Availability');

  cy.get('div[class*=BoxChoiceTile__StyledBox]').contains('Suite').click();

  cy.get('div[class*=BoxChoiceTile__StyledBox]').contains('Medication Management').click();

  cy.get('div[class*=BoxChoiceTile__StyledBox]').contains('Yes').click();

  cy.get('button').contains('Continue').click();

  cy.get('input[name="name"]').type(name);
  cy.get('input[name="phone"]').type(phoneNumber);

  cy.get('button').contains('Continue').click();

  cy.get('button').contains('Talk to an advisor').click();

  cy.get('button').contains('$2000 - $3000').click();

  cy.url().should('have.string', '/assisted-living/california/san-francisco/buena-vista-manor-house');

  cy
    .request({
      url: '/v0/platform/user-actions',
    })
    .then((response) => {
      cy.log('response', response);
      const respJson = JSON.parse(response.body);
      expect(respJson.data.type).to.equal('UserAction');
      expect(respJson.data.attributes).to.have.property('profilesContacted');
      expect(respJson.data.attributes.profilesContacted).to.have.length.of.at.least(1);
      const profilesContacted = respJson.data.attributes.profilesContacted.find(pc => pc.contactType === 'LEAD/CUSTOM_PRICING');
      expect(!!profilesContacted).to.be.true;
      expect(profilesContacted.slug).to.equal(communitySlug);
      expect(respJson.data.attributes).to.have.property('userDetails');
      expect(respJson.data.attributes.userDetails).to.have.property('careType');
      expect(respJson.data.attributes.userDetails.careType).to.have.length.of.at.least(1);
      expect(respJson.data.attributes.userDetails.careType).to.contain('medication-management');
      expect(respJson.data.attributes.userDetails).to.have.property('full_name');
      expect(respJson.data.attributes.userDetails.full_name).to.equal(name);
      expect(respJson.data.attributes.userDetails).to.have.property('interest');
      expect(respJson.data.attributes.userDetails.interest).to.have.length.of.at.least(1);
      expect(respJson.data.attributes.userDetails.interest).to.contain('talk-advisor');
      expect(respJson.data.attributes.userDetails).to.have.property('medicaid_coverage');
      expect(respJson.data.attributes.userDetails.medicaid_coverage).to.equal('yes');
      expect(respJson.data.attributes.userDetails).to.have.property('roomType');
      expect(respJson.data.attributes.userDetails.roomType).to.have.length.of.at.least(1);
      expect(respJson.data.attributes.userDetails.roomType).to.contain('suite');
    });
}

describe('Marketplace Profile Page', () => {
  it('tests Pricing Wizard for Assisited Living Community in Mobile', () => {
    cy.viewport('iphone-6');

    inputValuesAndAssert(cy);
  });

  it('tests Pricing Wizard for Assisited Living Community in Tablet', () => {
    cy.viewport('ipad-2');

    inputValuesAndAssert(cy);
  });

  it('tests Pricing Wizard for Assisited Living Community in Laptop', () => {
    cy.viewport('macbook-13');

    inputValuesAndAssert(cy);
  });
});

const assertUserDetails = (response, data) => {
  const { name } = data;
  const respJson = JSON.parse(response.body);
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
};

// Use this function to assert email during Get Availability CTA
// const assertUserDetailsEmail = (response, data) => {
//   const { email } = data;
//   const respJson = JSON.parse(response.body);
//   expect(respJson.data.attributes.userDetails).to.have.property('email');
//   expect(respJson.data.attributes.userDetails.email).to.equal(email);
// };

const assertProfilesContacted = (response, data, contactType) => {
  const { communitySlug } = data;
  const respJson = JSON.parse(response.body);
  expect(respJson.data.type).to.equal('UserAction');
  expect(respJson.data.attributes).to.have.property('profilesContacted');
  expect(respJson.data.attributes.profilesContacted).to.have.length.of.at.least(1);
  const profilesContacted = respJson.data.attributes.profilesContacted.find(pc => pc.contactType === contactType);
  expect(profilesContacted).to.be.ok;
  expect(profilesContacted.slug).to.equal(communitySlug);
};

export const assertUserActionsForGetAvailability = (response, data) => {
  assertProfilesContacted(response, data, 'LEAD/CUSTOM_PRICING');
  assertUserDetails(response, data);
  // assertUserDetailsEmail(response, data);
};

export const assertUserActionsForCustomPricing = (response, data) => {
  assertProfilesContacted(response, data, 'LEAD/CUSTOM_PRICING');
  assertUserDetails(response, data);
};

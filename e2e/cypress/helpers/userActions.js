const assertUserDetails = (user, data, shouldHave = [
  'careType',
  'name',
  'interest',
  'medicaidCoverage',
  'roomType',
]) => {
  const { name, phone, email } = data;
  if (shouldHave.includes('name')) {
    expect(user).to.have.property('name');
    expect(user.name).to.equal(name);
  }
  if (shouldHave.includes('phone')) {
    expect(user.phoneNumber).to.equal(phone);
  }
  if (shouldHave.includes('email')) {
    expect(user.email).to.equal(email);
  }

  const { uuidInfo } = user.uuidAux;
  if (shouldHave.includes('careType')) {
    expect(uuidInfo.careInfo.adls).to.have.length.of.at.least(1);
    expect(uuidInfo.careInfo.adls).to.contain('medication-management');
  }
  if (shouldHave.includes('interest')) {
    expect(uuidInfo.residentInfo.interest).to.equal('explore-affordable-options');
  }
  if (shouldHave.includes('medicaidCoverage')) {
    expect(uuidInfo.financialInfo.medicaid).to.equal(true);
  }
  if (shouldHave.includes('roomType')) {
    expect(uuidInfo.housingInfo.roomPreference).to.have.length.of.at.least(1);
    expect(uuidInfo.housingInfo.roomPreference).to.contain('suite');
  }
};

const assertProfilesContacted = (uuidActions, data, contactType) => {
  const { communitySlug } = data;
  expect((
    uuidActions.some(action => action.actionType === 'profileContacted'
      && action.actionInfo.contactType === contactType
      && action.actionInfo.slug === communitySlug)
  )).to.be.true;
};

export const assertUserActionsForGetAvailability = ({ uuidActions, user }, data) => {
  assertProfilesContacted(uuidActions, data, 'pricingRequest');
  assertUserDetails(user, data);
};

export const assertUserActionsForCustomPricing = ({ uuidActions, user }, data) => {
  assertProfilesContacted(uuidActions, data, 'pricingRequest');
  assertUserDetails(user, data);
};


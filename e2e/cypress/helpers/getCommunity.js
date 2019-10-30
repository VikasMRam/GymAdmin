import buildEntity from './buildEntity';

export const getCommunity = (community) => {
  const url = `/v0/marketplace/communities/${community}?include=similar-communities%2Cquestions%2Cagents`;
  return cy.request(url).then(response => buildEntity((response.body)));
};

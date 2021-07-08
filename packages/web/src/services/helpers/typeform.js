export const communityPagePricingForm = (community, path) => {
  // console.log('community', community);
  if (path.indexOf('assisted-living') >= 0) {
    return 'https://sushrama.typeform.com/to/dH3EjYYx';
  } else if (path.indexOf('independent-living') >= 0) {
    return 'https://sushrama.typeform.com/to/RYBdR1jm';
  }
  return '#';
};

export const communityPagePricingForm = (community, path) => {
  const { address } = community;
  const { city } = address;
  console.log('community', community);
  if (path.indexOf('assisted-living') >= 0) {
    if (city === 'Chicago') {
      return 'https://sushrama.typeform.com/to/RYBdR1jm'; // wiz 2
    }
    return 'https://sushrama.typeform.com/to/dH3EjYYx'; // wiz1
  } else if (path.indexOf('independent-living') >= 0) {
    return 'https://sushrama.typeform.com/to/RYBdR1jm';
  }
  return '#';
};

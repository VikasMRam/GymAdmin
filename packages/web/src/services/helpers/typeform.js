
export const getTypeformDetailsByCommunity = (community, path) => {
  const { address } = community;
  const { line1, line2, city, state, zip } = address;
  // wiz1 => dH3EjYYx
  // Wiz2 => RYBdR1jm
  // if (path.indexOf('assisted-living') >= 0) {
  //   if (city === 'Chicago') {
  //     return 'RYBdR1jm';
  //   }
  //   return 'dH3EjYYx';
  // } else if (path.indexOf('independent-living') >= 0) {
  //   return 'RYBdR1jm';
  // }
  return 'dH3EjYYx';
};

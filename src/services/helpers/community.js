export const hasCCRC = (community) => {
  const { propInfo } = community;
  const { typeCare } = propInfo;
  return typeCare.includes('Continuing Care Retirement Community(CCRC)');
};

export const hasSNF = (community) => {
  const { propInfo } = community;
  const { typeCare } = propInfo;
  return typeCare.includes('Skilled Nursing Facility');
};

export const formatAddress = (community) => {
  const { address } = community;

  if (!address) return '';

  return [
    'line1',
    'city',
    'state',
  ].reduce((acc, attr) => {
    if (address[attr]) {
      acc.push(address[attr]);
    }
    return acc;
  }, []).join(', ');
};

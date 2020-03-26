export const getIsCCRC = (community) => {
  const { propInfo } = community;
  if (propInfo) {
    const { typeCare } = propInfo;
    if (typeCare) {
      return typeCare.includes('Continuing Care Retirement Community(CCRC)');
    }
  }
  return false;
};

export const getHasContract = (community) => {
  const { rgsAux, info = {} } = community;
  const hasRgsContract = rgsAux && rgsAux.rgsInfo && rgsAux.rgsInfo.contract_info ? rgsAux.rgsInfo.contract_info.hasContract : false;
  // When community is sent has a Provider, contract info is stored in the info elsewhere.
  const { hasContract: hasInfoContract } = info;
  return hasRgsContract || hasInfoContract;
};

export const getIsSNF = (community) => {
  const { propInfo } = community;
  if (propInfo) {
    const { typeCare: typeCares } = propInfo;
    if (typeCares) {
      return typeCares.includes('Skilled Nursing Facility');
    }
  }
  return false;
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

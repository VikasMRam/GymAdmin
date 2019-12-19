import dayjs from 'dayjs';

export const getHasContract = (community) => {
  const { rgsAux, info={} } = community;
  const hasRgsContract = rgsAux && rgsAux.rgsInfo && rgsAux.rgsInfo.contract_info ? rgsAux.rgsInfo.contract_info.hasContract : false;
  // When community is sent has a Provider, contract info is stored in the info elsewhere.
  const { hasContract:hasInfoContract } = info;
  return hasRgsContract || hasInfoContract;
};

export const getIsCCRC = (community) => {
  const { propInfo } = community;
  if (propInfo) {
    const { typeCare: typeCares } = propInfo;
    if (typeCares) {
      return typeCares.includes('Continuing Care Retirement Community(CCRC)');
    }
  }
  return false;
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

export const buildAddressDisplay = (community) => {
  const { address } = community;
  return `${address.line1}, ${address.city}, ${address.zip}, ${address.state}`;
};

export const getReferralSentTimeText = date => dayjs(date).format('M/D/YY, h:mmA');

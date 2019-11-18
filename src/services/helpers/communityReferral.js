import dayjs from 'dayjs';

export const getHasContract = (community) => {
  const { rgsAux } = community;
  const hasContract = rgsAux && rgsAux.rgsInfo && rgsAux.rgsInfo.contract_info ? rgsAux.rgsInfo.contract_info.hasContract : false;
  return hasContract;
};

export const getIsCCRC = (community) => {
  const { propInfo } = community;
  if (propInfo) {
    const { typeCare: typeCares } = propInfo;
    if (typeCares){
      return  typeCares.includes('Continuing Care Retirement Community(CCRC)');
    }

  }
  return false;
};

export const buildAddressDisplay = (community) => {
  const { address } = community;
  return `${address.line1}, ${address.city}, ${address.zip}, ${address.state}`;
};

export const getReferralSentTimeText = (date) => {
  date = dayjs(date).utc();
  return date.format('M/D/YY, h:mmA');
};


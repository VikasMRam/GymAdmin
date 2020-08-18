import { areaCode } from './phone';
import { tocs } from './search';

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

export const getIsActiveAdult = (community) => {
  const { propInfo } = community;
  if (propInfo) {
    const { typeCare: typeCares } = propInfo;
    if (typeCares) {
      return typeCares.length === 1 && typeCares.includes('Active Adult (55+)');
    }
  }
  return false;
};

export const getIsSellerAgentCTA = (community) => {
  // const validTocLabels =  tocs.filter(e =>
  //   e.value.match(/active-adult|independent-living|continuing-care-retirement-community/)).map(e => e.label);
  // const { propInfo } = community;
  // if (propInfo) {
  //   const { typeCare: typeCares } = propInfo;
  //   if (typeCares) {
  //     return typeCares.length === 1 && validTocLabels.includes(typeCares[0]);
  //   }
  // }
  return getIsActiveAdult(community);
};


export const formatAddress = (address) => {
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

// Faf = Friends and Family
export const showFafNumber= (address)  => {
  if (!address || !address.zipcode || !address.zipcode.cityTier) return false;
  return address.zipcode.cityTier === '1'
};

export const getFafNumber = (communityPhone='',tier)  => {
  // Hard coded business logic ( only for tier 1
  const tier1Nums = ['4153004354','6506845456'];
  let fafn = tier1Nums[0];
  let foundNum = tier1Nums.find((num)=> areaCode(num) === areaCode(communityPhone));
  if (!!foundNum) {
    fafn = foundNum;
  }
  return fafn;
};

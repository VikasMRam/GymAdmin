import { areaCode } from './phone';
import { tocs } from './search';

import { formatDate } from 'sly/web/services/helpers/date';

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
export const showFafNumber = (address)  => {
  if (!address || !address.zipcode || !address.zipcode.cityTier) return false;
  return address.zipcode.cityTier === '1';
};

export const getFafNumber = (communityPhone = '', tier)  => {
  // Hard coded business logic ( only for tier 1
  const tier1Nums = ['4153004354', '6506845456'];
  let fafn = tier1Nums[0];
  const foundNum = tier1Nums.find(num => areaCode(num) === areaCode(communityPhone));
  if (foundNum) {
    fafn = foundNum;
  }
  return fafn;
};

const getStateLink = (addressState) => {
  if (addressState === 'CA') {
    return 'https://www.cdss.ca.gov/inforesources/community-care-licensing';
  }
  return 'https://www.ahcancal.org/Assisted-Living/Policy/Pages/state-regulations.aspx';
};

// valid types : stateScore
export const getTrustScoreType = (community, scoreType) => {
  const { rgsAux = { rgsInfo: {} }, address: { state } }  = community;
  const { rgsInfo = {} } = rgsAux;
  const { trustScore, scoreParams = { lastInspectionDate: '', licensedDate: ''  } } = rgsInfo;
  const ld = formatDate(scoreParams.licensedDate);
  const lastLicensedDate = ld.match(/invalid/) ? 'unknown date' : ld;
  const prop1 = `Licensed since ${lastLicensedDate}`;
  const lid = formatDate(scoreParams.lastInspectionDate);
  const lastInspectionDate = ld.match(/invalid/) ? 'unknown date' : lid;
  const prop2 = `Most recent inspection on ${lastInspectionDate}`;
  let prop3 = 'Has fewer complaints relative to communities in the state.';
  if (trustScore > 50 &&  trustScore < 61) {
    prop3 = 'Has more complaints relative to communities in the state';
  } else if (trustScore > 25 &&  trustScore < 51) {
    prop3 = 'Has significantly more complaints and inspections relative to communities in the state';
  }
  const licensingUrl = getStateLink(state);
  const moreInfoText = 'Seniorly Trust Score is a rating of an assisted living community ' +
    'that is a represents how assisted living facilities are complying with state regulations. Public access to assisted living records ' +
    `varies greatly state by state. Visit ${state} website to learn more about the regulations and practices in ${state}.`;

  const trustScores = { stateScore:
      { value: trustScore, prop1, prop2, prop3, moreInfoText, licensingUrl } };
  // livabilityScore: {} }; // Can add other types of score in the future.
  return trustScores[scoreType];
};

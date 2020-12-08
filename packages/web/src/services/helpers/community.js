import { areaCode } from './phone';

import { AGENT_STATUS_LIVE_ON_PROFILE } from 'sly/web/constants/agents';
import { stateNames } from 'sly/web/services/helpers/url';
import { formatDate } from 'sly/web/services/helpers/date';

export const getIsCCRC = (community) => {
  const { care } = community;
  if (care) {
    return care.includes('Continuing Care Retirement Community(CCRC)');
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
  const { care } = community;
  if (care) {
    return care.includes('Skilled Nursing Facility');
  }
  return false;
};

export const getIsActiveAdult = (community) => {
  const { care } = community;
  if (care) {
    return care.includes('Active Adult Communities (55+)');
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

export const getFafNumber = (communityPhone = '')  => {
  // Hard coded business logic ( only for tier 1
  const tier1Nums = ['4153004354', '6506845456'];
  let fafn = tier1Nums[0];
  const foundNum = tier1Nums.find(num => areaCode(num) === areaCode(communityPhone));
  if (foundNum) {
    fafn = foundNum;
  }
  return fafn;
};

const getStateLink = (addressState, licenseNumber) => {
  if (addressState === 'CA' && licenseNumber !== '') {
    return `https://www.ccld.dss.ca.gov/carefacilitysearch/FacDetail/${licenseNumber}`;
  } else if (addressState === 'CA') {
    return 'https://www.cdss.ca.gov/inforesources/community-care-licensing';
  }
  return 'https://www.ahcancal.org/Assisted-Living/Policy/Pages/state-regulations.aspx';
};

// valid types : stateScore
export const getTrustScoreType = (community, scoreType) => {
  const { name, propInfo: { licenseNumber = '' }, rgsAux = { rgsInfo: {} }, address: { state } }  = community;
  const { rgsInfo = {} } = rgsAux;
  const { trustScore, scoreParams = { lastInspectionDate: '', licensedDate: ''  } } = rgsInfo;
  const ld = formatDate(scoreParams.licensedDate);
  const lastLicensedDate = ld.match(/invalid/) ? 'unknown date' : ld;
  const lid = formatDate(scoreParams.lastInspectionDate);
  const lastInspectionDate = ld.match(/invalid/) ? 'unknown date' : lid;
  const fullStateName = stateNames[state];
  const licensingUrl = getStateLink(state, licenseNumber);
  const linkText = `To learn more, visit the state licensing authority for ${name}`;
  const prop1 = `Licensed since ${lastLicensedDate}`;
  const prop2 = `Most recent inspection on ${lastInspectionDate}`;
  let prop3 = `Has fewer complaints relative to communities in ${fullStateName}`;
  if (trustScore < 71) {
    prop3 = `Has more complaints relative to communities in ${fullStateName}`;
  }
  let valueText = 'Excellent';
  if (trustScore > 70 && trustScore < 81) {
    valueText = 'Good';
  } else if (trustScore > 50 && trustScore < 71) {
    valueText = 'Okay';
  } else if (trustScore < 51) {
    valueText = 'Poor';
  }

  const moreInfoText = 'Our Trust Score gives you an easy tool for evaluating assisted living options. When building a Trust Score, ' +
    'we look at each community\'s compliance with state regulations (information that can be hard to access) and other key factors that ' +
    'indicate overall quality and responsible management. ';
  const trustScores = { stateScore:
      { value: trustScore, prop1, prop2, prop3, moreInfoText, linkText, licensingUrl, valueText } };
  // livabilityScore: {} }; // Can add other types of score in the future.
  // Next iteration: GET REQUEST TO https://www.ccld.dss.ca.gov/transparencyapi/api/EmailSubscribe?facNum=015600130&Semail=sushanthr+testccld@gmail.com

  return trustScores[scoreType];
};

export const getPartnerAgent = (community) => {
  const { partnerAgents } = community;
  // filtering out status 1 partnerAgents
  const livePartnerAgents = partnerAgents && partnerAgents.filter(e => e.status === AGENT_STATUS_LIVE_ON_PROFILE);
  const partnerAgent = livePartnerAgents && livePartnerAgents.length > 0 ? livePartnerAgents[0] : null;

  return partnerAgent;
};

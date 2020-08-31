import { tocs } from 'sly/web/services/helpers/search';
import { tocPaths, urlize } from 'sly/web/services/helpers/url';
import { zillowIBuyerCities } from 'sly/web/services/helpers/zillow_cities';

export const shouldShowZillowAd = (toc, city) => {
  // return true;
  const validTocs = tocs.filter(e =>
    e.value.match(/active-adult|independent-living|continuing-care-retirement-community/)).map(e => e.value);
  return validTocs.indexOf(toc) > -1 && zillowIBuyerCities.indexOf(city) > -1;
};

export const shouldShowZillowSearchAd = (toc) => {
  const validTocs = tocs.filter(e =>
    e.value.match(/active-adult|independent-living|continuing-care-retirement-community/)).map(e => e.value);
  return validTocs.indexOf(toc) > -1;
};

export const  shouldShowZillowProfileAd = (community) => {
  // return true;
  if (!community || !community.propInfo || !community.propInfo.typeCare) {
    return false;
  }
  const { propInfo: { typeCare: careList }, address: { city: cityLabel } } = community;
  const { path: tocSegment = '' } = tocPaths(careList);
  const toc = tocSegment.substr(1);
  const city = urlize(cityLabel);
  return shouldShowZillowAd(toc, city);
};

export const shouldShowZillowPostConversionAd = (community) => {
  if (!community || !community.propInfo || !community.propInfo.typeCare) {
    return false;
  }
  const { propInfo: { typeCare: careList }, address: { city: cityLabel } } = community;
  const toc = tocPaths(careList);
  const city = urlize(cityLabel);
  return shouldShowZillowAd(toc, city);
};


// Move to API service
export const getWizardEndAd = ({ community, toc, city }) => {
  const AD_LABEL_ZILLOW = 'getOffer';
  const AD_LABEL_HOMECARE = 'homeCare';
  // If community or in search
  if (shouldShowZillowPostConversionAd(community) || shouldShowZillowSearchAd(toc, city)) {
    return AD_LABEL_ZILLOW;
  }
  return AD_LABEL_HOMECARE;
};

import { tocs } from './search';
import { tocPaths, urlize } from './url';

export const shouldShowZillowSearchAd = (toc, city ) => {
  return shouldShowZillowAd(toc,city);
};

export const shouldShowZillowProfileAd = (community) => {
  // return true;
  if (!community || !community.propInfo || !community.propInfo.typeCare ) {
    return false;
  }
  const { propInfo:{ typeCare: careList }, address:{ city: cityLabel} } = community;
  const toc = tocPaths(careList);
  const city = urlize(cityLabel);
  return shouldShowZillowAd(toc,city);
};

export const shouldShowZillowPostConversionAd = (community) => {
  if (!community || !community.propInfo || !community.propInfo.typeCare ) {
    return false;
  }
  const { propInfo:{ typeCare: careList }, address:{ city: cityLabel} } = community;
  const toc = tocPaths(careList);
  const city = urlize(cityLabel);
  return shouldShowZillowAd(toc,city);
};

export const shouldShowZillowAd = (toc, city) => {
  // return true;
  const zillowCities = ["portland", "sacramento", "riverside", "los-angeles", "san-diego",
    "las-vegas", "phoenix", "tucson", "fort-collins", "denver", "colorado-springs",
    "minneapolis", "dallas", "austin", "san-antonio", "houston", "atlanta", "nashville",
    "raleigh", "charlotte", "tampa", "orlando", "miami"];
  const validTocs = tocs.filter(e =>
    e.value.match(/active-adult|independent-living|continuing-care-retirement-community/)).map(e => e.value);
  return validTocs.indexOf(toc) > -1 && zillowCities.indexOf(city) > -1;
};

// Move to API service
export const getWizardEndAd = ({ community, toc, city}) => {
  const AD_LABEL_ZILLOW= 'getOffer';
  const AD_LABEL_HOMECARE= 'homeCare';
  // If community or in search
  if (shouldShowZillowPostConversionAd(community) || shouldShowZillowSearchAd(toc, city )) {
    return AD_LABEL_ZILLOW;
  }
  return AD_LABEL_HOMECARE;
};

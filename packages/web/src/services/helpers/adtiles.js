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
  // S1303 : Zillow Ad Tiles on CCRC Do Not Send List
  // https://airtable.com/tblt2MRAZThT31Ee9/viwlPQXuHxbH2unIj/recfsTZBjUSGl0TUe?blocks=hide
  const specialSlugs = ['moosehaven', 'san-francisco-towers-san-francisco', 'sequoias-san-francisco-the',
    'the-village-at-orchard-ridge-winchester', 'westminister-at-lake-ridge', 'towers-at-laguna-woods-village',
    'falcons-landing', 'reata-glen', 'the-glen-at-scripps-ranch', 'la-costa-glen-carlsbad', 'penney-retirement-community',
    'smith-village', 'woodland-pond-at-new-paltz', 'lasell-village', 'sequoias-portola-valley-the'];
  if (!community || !community.propInfo || !community.propInfo.typeCare) {
    return false;
  }
  const { id, propInfo: { typeCare: careList }, address: { city: cityLabel } } = community;
  if (specialSlugs.indexOf(id) > -1) {
    return true;
  }
  // S1482 : Remove Zillow Ads on Communities where we have contracts
  if (careList && careList[0] === 'continuing-care-retirement-community') {
    // eslint-disable-next-line camelcase
    const { rgsAux: { rgsInfo: { contract_info } } } = community;
    // eslint-disable-next-line camelcase
    if (contract_info && contract_info.hasContract) {
      return false;
    }
  }
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

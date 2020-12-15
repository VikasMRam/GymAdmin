import { tocs } from 'sly/web/components/search/helpers';
import { tocPaths, urlize } from 'sly/web/services/helpers/url';

export const ccrcAdTileStates = ['AZ', 'CT', 'DC', 'DE', 'HI', 'ID', 'IN', 'KS', 'KY', 'LA', 'MN', 'NE', 'NH', 'OH', 'OK', 'RI', 'TX', 'UT', 'WA', 'WI', 'MO', 'NY', 'NC'];

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
  if (!community || !community.care) {
    return false;
  }
  const { id, care, address: { state } } = community;
  if ((specialSlugs.indexOf(id) > -1) || (care && care[0] === 'active-adult')) {
    return true
  }

  if (care && care[0] === 'continuing-care-retirement-community') {
    // eslint-disable-next-line camelcase
    const { rgsAux: { rgsInfo: { contract_info } } } = community;
    // eslint-disable-next-line camelcase
    if (contract_info && contract_info.hasContract) {
      return false;
    }

    if (ccrcAdTileStates.indexOf(state) > -1) {
      return true
    }
  }
  return false
};

export const shouldShowZillowPostConversionAd = (community) => {
  if (!community || !community.care) {
    return false;
  }
  const {care} = community;
  return (care && (care[0] === 'active-adult' || care[0] === 'continuing-care-retirement-community'));
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

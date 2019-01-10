import { urlize, stateRegionMap, getStateAbbr, objectToURLQueryParams } from 'sly/services/helpers/url';

export const getSearchParamFromPlacesResponse = ({ address_components, geometry }) => {
  const cityFull = address_components.filter(e => e.types.indexOf('locality') > -1 || e.types.indexOf('administrative_area_level_3') > -1);
  const stateFull = address_components.filter(e => e.types.indexOf('administrative_area_level_1') > -1);
  if (cityFull.length > 0 && stateFull.length > 0) {
    const city = urlize(cityFull[0].long_name);
    const state = urlize(stateFull[0].long_name);
    const { lat, lng } = geometry.location;
    return {
      state,
      city,
      latitude: lat(),
      longitude: lng(),
    };
  } else if (stateFull.length > 0) {
    const state = urlize(stateFull[0].long_name);
    return {
      state,
    };
  }
  return {};
};

const validNumber = x => typeof x === 'number' || x === undefined;
export const filterLinkPath = (currentFilters, nextFilters = {}) => {
  let pageFilters = {
    'page-number': currentFilters['page-number'] || null,
    'page-size': currentFilters['page-size'] || null,
  };
  if (validNumber(nextFilters['page-number']) || validNumber(nextFilters['page-size'])) {
    pageFilters = {
      'page-number': nextFilters['page-number'],
      'page-size': nextFilters['page-size'],
    };
  }

  const filters = {
    ...currentFilters,
    ...nextFilters,
    ...pageFilters,
  };

  const {
    state, city, ...qs
  } = filters;
  const region = stateRegionMap[getStateAbbr(state)];

  const selected = !Object.keys(nextFilters)
    .some(key => currentFilters[key] !== nextFilters[key]);

  if (selected) {
    Object.keys(nextFilters)
      .forEach(filter => delete qs[filter]);
  }

  let path = '/agents';
  if (region && city) {
    const qsString = objectToURLQueryParams(qs);
    const qsPart = qsString ? `?${qsString}` : '';
    path = `${path}/${urlize(region)}/${city}${qsPart}`;
  } else if (region) {
    const qsString = objectToURLQueryParams(qs);
    const qsPart = qsString ? `?${qsString}` : '';
    path = `${path}/${urlize(region)}${qsPart}`;
  }

  return {
    path,
    selected,
  };
};

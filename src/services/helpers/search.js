import { urlize, objectToURLQueryParams, parseURLQueryParams } from './url';
import {assetPath} from "sly/components/themes";

const fnExecutionTracker = {};

/**
 * Decorator function that helps restrict number of function calls  to 1 within a specified timelimit.
 * It always executes the last function call
 * @param fnToEval - the actual function you want to be executed.
 * @param key
 * @param waitTimeInMillis
 * @returns {Function}
 */
export const delayedExecutor = (fnToEval, key, waitTimeInMillis = 800) => {
  // Add fnExecutionQ
  fnExecutionTracker[key] = { lastExecutionTime: undefined, timer: undefined };


  return function (...args) {
    const timeNow = new Date();
    if (
      !fnExecutionTracker[key].lastExecutionTime ||
      timeNow - fnExecutionTracker[key].lastExecutionTime > waitTimeInMillis
    ) {
      fnExecutionTracker[key].lastExecutionTime = new Date();
      fnExecutionTracker[key].timer = undefined;
      fnToEval(...args);
    } else {
      if (fnExecutionTracker[key].timer) {
        clearTimeout(fnExecutionTracker[key].timer);
      }
      const timeout =
        waitTimeInMillis -
        (timeNow - fnExecutionTracker[key].lastExecutionTime);
      const timer = setTimeout(() => {
        fnToEval(...args);
      }, timeout);
      fnExecutionTracker[key].timer = timer;
    }
  };
};

export const getRadiusFromMapBounds = (bounds) => {
  const center = bounds.getCenter();
  const ne = bounds.getNorthEast();

  // r = radius of the earth in miles
  const r = 3963.0;

  // Convert lat or lng from decimal degrees into radians (divide by 57.2958)
  const lat1 = center.lat() / 57.2958;
  const lon1 = center.lng() / 57.2958;
  const lat2 = ne.lat() / 57.2958;
  const lon2 = ne.lng() / 57.2958;

  // distance = circle radius from center to Northeast corner of bounds
  const dis =
    r *
    Math.acos((Math.sin(lat1) * Math.sin(lat2)) +
      (Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1)));
  return Math.round(dis);
};

const searchParamsWhitelist = [
  'toc',
  'state',
  'city',
  'communitySlug',
  'size',
  'budget',
  'sort',
  'page-number',
  'page-size',
  'radius',
  'view',
  'latitude',
  'longitude',
  'searchOnMove',
  'modal',
  'token',
  'entityId',
  'currentStep',
  'redirectTo',
  'action',
];

export const tocs = [
  {
    label: 'All Communities',
    value: 'retirement-community',
    segment: 'retirement-community',
    searchLabel: 'Retirement Communities',
    seoLabel: 'Retirement Communities',
  },
  {
    label: 'Assisted Living',
    value: 'assisted-living',
    segment: 'assisted-living',
    searchLabel: 'Assisted Living Communities',
    seoLabel: 'Assisted Living Facilities',
  },
  {
    label: 'Independent Living',
    value: 'independent-living',
    segment: 'independent-living',
    searchLabel: 'Independent Living Communities',
    seoLabel: 'Independent Living Communities',
  },
  {
    label: 'Memory Care',
    value: 'memory-care',
    segment: 'memory-care',
    searchLabel: 'Memory Care Communities',
    seoLabel: 'Memory Care Facilities',
  },
  {
    label: 'Continuing Care Retirement Communities',
    value: 'continuing-care-retirement-community',
    segment: 'continuing-care-retirement-community',
    searchLabel: 'CCRCs',
    seoLabel: 'Continuing Care Retirement Communities',
  },
];

export const sizes = [
  { label: 'Small', segment: 'less-than-20-beds', value: 'small' },
  { label: 'Medium', segment: '20-to-51-beds', value: 'medium' },
  { label: 'Large', segment: 'greater-than-51-beds', value: 'large' },
];

export const communitySizeSearchParamMap = {
  'up to 20 Beds': 'small',
  '20 - 51 Beds': 'medium',
  '51 +': 'large',
}

export const budgets = [
  { label: 'Up to $2500', segment: '2500-dollars', value: 2500 },
  { label: 'Up to $3000', segment: '3000-dollars', value: 3000 },
  { label: 'Up to $3500', segment: '3500-dollars', value: 3500 },
  { label: 'Up to $4000', segment: '4000-dollars', value: 4000 },
  { label: 'Up to $4500', segment: '4500-dollars', value: 4500 },
  { label: 'Up to $5000', segment: '5000-dollars', value: 5000 },
  { label: 'Up to $5500', segment: '5500-dollars', value: 5500 },
  { label: 'Up to $6000', segment: '6000-dollars', value: 6000 },
  { label: 'More than $6000', segment: 'greater-than-6000-dollars', value: 100000 },
];

/** Not used currently
const findAFilter = (ary, filters='') => filters.split('/')
  .reduce((cumul, filter) => {
    return ary
      .reduce((cumul, item) => {
        if (item.segment === filter) return item.segment;
        return cumul;
      }, cumul)
  }, undefined);
 */

export const filterSearchParams = params =>
  Object.keys(params).reduce((cumul, key) => {
    if (searchParamsWhitelist.includes(key) && params[key]) {
      cumul[key] = params[key];
    }
    if (key === 'budget' && params[key]) {
      cumul[key] = Math.floor(parseInt(params[key], 10));
    }
    return cumul;
  }, {});

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

  const filters = filterSearchParams({
    ...currentFilters,
    ...nextFilters,
    ...pageFilters,
  });

  const {
    toc, state, city, communitySlug, ...qs
  } = filters;

  const selected = !Object.keys(nextFilters)
    .some(key => currentFilters[key] !== nextFilters[key]);

  if (selected) {
    Object.keys(nextFilters)
      .forEach(filter => delete qs[filter]);
  }

  let path = `/${toc}`;
  if (state && city && communitySlug) {
    const qsString = stringify(qs);
    const qsPart = qsString ? `?${qsString}` : '';
    path = `/${toc}/${state}/${city}/${communitySlug}${qsPart}`;
  } else if (state && city) {
    const qsString = objectToURLQueryParams(qs);
    const qsPart = qsString ? `?${qsString}` : '';
    path = `/${toc}/${state}/${city}${qsPart}`;
  } else if (state) {
    const qsString = objectToURLQueryParams(qs);
    const qsPart = qsString ? `?${qsString}` : '';
    path = `/${toc}/${state}${qsPart}`;
  }

  return {
    path,
    selected,
  };
};

export const getSearchParams = ({ params }, location) => {
  const qs = parseURLQueryParams(location.search);

  return filterSearchParams({
    ...params,
    ...qs,
  });
};

export const getSearchParamFromPlacesResponse = ({ address_components, geometry }) => {
  const cityFull = address_components.filter(e => e.types.indexOf('locality') > -1 || e.types.indexOf('administrative_area_level_3') > -1);
  const stateFull = address_components.filter(e => e.types.indexOf('administrative_area_level_1') > -1);
  if (cityFull.length > 0 && stateFull.length > 0) {
    const city = urlize(cityFull[0].long_name);
    const state = urlize(stateFull[0].long_name);
    const { lat, lng } = geometry.location;
    return {
      toc: 'assisted-living',
      state,
      city,
      latitude: lat(),
      longitude: lng(),
    };
  } else if (stateFull.length > 0) {
    const state = urlize(stateFull[0].long_name);
    return {
      toc: 'assisted-living',
      state
    };
  }
  return { toc: 'assisted-living' };
};

export const getFiltersApplied = (searchParams) => {
  const { size, budget } = searchParams;
  const filtersApplied = [];
  if (size) filtersApplied.push('size');
  if (budget) filtersApplied.push('budget');
  return filtersApplied;
};

export const getEvtHandler = (paramsToRemove, origFn) => {
  return (uiEvt) => {
    origFn({ origUiEvt: uiEvt, paramsToRemove });
  };
};

export const getTocSearchLabel = (toc) => {
  let actualToc = tocs.find(elem => (elem.value === toc));
  if (typeof actualToc === 'undefined'){
    return 'retirement communities';
  }
  return actualToc.searchLabel;
};

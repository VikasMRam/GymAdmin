import { stringify, parse } from 'query-string';

import { urlize } from './url';

const fnExecutionTracker = {};

/**
 * Decorator function that helps restrict number of function calls  to 1 within a specified timelimit.
 * It always executes the last function call
 * @param fnToEval - the actual function you want to be executed.
 * @param key
 * @param waitTimeInMillis
 * @returns {Function}
 */
export const delayedExecutor = (fnToEval, key, waitTimeInMillis) => {
  // Add fnExecutionQ
  fnExecutionTracker[key] = { lastExecutionTime: undefined, timer: undefined };

  if (waitTimeInMillis === undefined) {
    waitTimeInMillis = 800;
  }

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
    Math.acos(Math.sin(lat1) * Math.sin(lat2) +
        Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1));
  return Math.round(dis);
};

const searchParamsWhitelist = [
  'toc',
  'state',
  'city',
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
];

export const tocs = [
  {
    label: 'All Communities',
    value: 'retirement-community',
    segment: 'retirement-community',
  },
  {
    label: 'Assisted Living',
    value: 'assisted-living',
    segment: 'assisted-living',
  },
  {
    label: 'Independent Living',
    value: 'independent-living',
    segment: 'independent-living',
  },
  {
    label: 'Memory Care',
    value: 'alzheimers-care',
    segment: 'alzheimers-care',
  },
];

export const sizes = [
  { label: 'Small', segment: 'less-than-20-beds', value: 'small' },
  { label: 'Medium', segment: '20-to-51-beds', value: 'medium' },
  { label: 'Large', segment: 'greater-than-51-beds', value: 'large' },
];

export const budgets = [
  { label: 'Up to $2500', segment: '2500-dollars', value: 2500 },
  { label: 'Up to $3000', segment: '3000-dollars', value: 3000 },
  { label: 'Up to $3500', segment: '3500-dollars', value: 3500 },
  { label: 'Up to $4000', segment: '4000-dollars', value: 4000 },
  { label: 'Up to $4500', segment: '4500-dollars', value: 4500 },
  { label: 'Up to $5000', segment: '5000-dollars', value: 5000 },
  { label: 'Up to $5500', segment: '5500-dollars', value: 5500 },
  { label: 'Up to $6000', segment: '6000-dollars', value: 6000 },
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
      cumul[key] = Math.floor(parseInt(params[key]));
    }
    return cumul;
  }, {});

export const filterLinkPath = (currentFilters, nextFilters) => {
  const filters = filterSearchParams({
    ...currentFilters,
    ...nextFilters,
  });

  const {
    toc, state, city, ...qs
  } = filters;

  const qsString = stringify(qs);
  const qsPart = qsString ? `?${qsString}` : '';

  const key = Object.keys(nextFilters)[0];
  const selected = currentFilters[key] === nextFilters[key];

  return {
    path: `/${toc}/${state}/${city}${qsPart}`,
    selected,
  };
};

export const getSearchParams = ({ params }, location) => {
  const qs = parse(location.search);

  return filterSearchParams({
    ...params,
    ...qs,
  });
};

export const getPathFromPlacesResponse = ({ address_components, geometry }) => {
  const cityFull = address_components.filter(e => e.types.indexOf('locality') > -1);
  const stateFull = address_components.filter(e => e.types.indexOf('administrative_area_level_1') > -1);
  if (cityFull.length > 0 && stateFull.length > 0) {
    const city = urlize(cityFull[0].long_name);
    const state = urlize(stateFull[0].long_name);
    const { lat, lng } =  geometry['location'];
    return `${'/assisted-living/'}${state}/${city}?latitude=${lat()}&longitude=${lng()}`;
  }
  return '/assisted-living/';
};

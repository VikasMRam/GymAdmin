import { stringify, parse } from 'query-string';


const fnExecutionTracker = {};

/**
 * Decorator function that helps restrict number of function calls  to 1 within a specified timelimit.
 * It does execute the last function requested
 * @param fnToEval -
 * @param key
 * @param waitTimeInMillis
 * @returns {Function}
 */
export const delayedExecutor = (fnToEval, key, waitTimeInMillis)=> {
  //Add fnExecutionQ
  fnExecutionTracker[key] = { lastExecutionTime:undefined, timer:undefined };
  if (waitTimeInMillis === undefined) {
    waitTimeInMillis = 800;
  }
  return function(...args) {
    let timeNow = new Date();
    if ( !fnExecutionTracker[key].lastExecutionTime ||  ( (timeNow - fnExecutionTracker[key].lastExecutionTime) > waitTimeInMillis) ){
      fnExecutionTracker[key].lastExecutionTime = new Date();
      fnExecutionTracker[key].timer = undefined;
      fnToEval(...args);
    } else {
      if (fnExecutionTracker[key].timer){
        clearTimeout(fnExecutionTracker[key].timer);
      }
      let timeout = waitTimeInMillis - (timeNow - fnExecutionTracker[key].lastExecutionTime);
      let timer = setTimeout(() => {
        fnToEval(...args)
      },timeout);
      fnExecutionTracker[key].timer = timer;
    }

  }


};

export const getRadiusFromMapBounds = (bounds) => {

  let center = bounds.getCenter();
  let ne = bounds.getNorthEast();

// r = radius of the earth in miles
  let r = 3963.0;

// Convert lat or lng from decimal degrees into radians (divide by 57.2958)
  let lat1 = center.lat() / 57.2958;
  let lon1 = center.lng() / 57.2958;
  let lat2 = ne.lat() / 57.2958;
  let lon2 = ne.lng() / 57.2958;

// distance = circle radius from center to Northeast corner of bounds
  let dis = r * Math.acos(Math.sin(lat1) * Math.sin(lat2) +
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
  { label: 'All Communities', value: 'retirement-community' },
  { label: 'Assisted Living', value: 'assisted-living' },
  { label: 'Independent Living', value: 'independent-living' },
  { label: 'Memory Care', value: 'alzheimers-care' },
];

export const sizes = [
  { label: 'Small', value: 'small' },
  { label: 'Medium', value: 'medium' },
  { label: 'Large', value: 'large' },
];

export const budgets = [
  { label: 'Up to $2500', value: 2500 },
  { label: 'Up to $3000', value: 3000 },
  { label: 'Up to $3500', value: 3500 },
  { label: 'Up to $4000', value: 4000 },
  { label: 'Up to $4500', value: 4500 },
  { label: 'Up to $5000', value: 5000 },
  { label: 'Up to $5500', value: 5500 },
  { label: 'Up to $6000', value: 6000 },
];

const filterSearchParams = params => Object.keys(params)
  .reduce((cumul, key) => {
    if (searchParamsWhitelist.includes(key)) {
      cumul[key] = params[key];
    }
    return cumul;
  }, {});

export const filterLinkPath = (currentFilters, nextFilters) => {
  const filters = filterSearchParams({
    ...currentFilters,
    ...nextFilters,
  });

  const { toc, state, city, ...qs } = filters;

  const qsString = stringify(qs);
  const qsPart = qsString ? `?${qsString}` : '';

  const keys = Object.keys(nextFilters);
  const selected = keys.reduce((cumul, key) => {
    const next = nextFilters[key];
    const current = typeof next === 'number'
      ? parseInt(currentFilters[key])
      : currentFilters[key];
    if (current === next) {
      return true;
    }
    return cumul;
  }, false);

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

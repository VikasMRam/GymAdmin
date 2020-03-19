import { stringify, parse } from 'query-string';

import { titleize } from 'sly/services/helpers/strings';
import { communitySizeSearchParamMap } from 'sly/services/helpers/search';

export const getSearchUrl = (matchParams) => {
  /*
   { careType: 'assisted-living', state: 'califo', city: 'sf' }
   */
  const outUrl = {
    city: matchParams.city,
    state: matchParams.state,
    toc: matchParams.toc,
  };
  return outUrl;
};

export const tocPaths = (toc) => {
  if (toc && toc.length > 0) {
    switch (toc[0]) {
      case 'Assisted Living':
        return {
          path: '/assisted-living',
          label: 'Assisted Living',
        };
      case 'Independent Living':
        return {
          path: '/independent-living',
          label: 'Independent Living',
        };
      case 'Memory Care':
        return {
          path: '/memory-care',
          label: 'Memory Care',
        };
      case 'Board and Care Home':
        return {
          path: '/board-and-care-home',
          label: 'Board and Care Home',
        };
      case 'Continuing Care Retirement Community(CCRC)':
        return {
          path: '/continuing-care-retirement-community',
          label: 'Continuing Care Retirement Community(CCRC)',
        };
      case 'Skilled Nursing Facility':
        return {
          path: '/skilled-nursing-facility',
          label: 'Skilled Nursing Facility',
        };
      default:
        return {
          path: '/nursing-homes',
          label: 'Nursing Homes',
        };
    }
  } else {
    return {
      path: '/nursing-homes',
      label: 'Nursing Homes',
    };
  }
};

const tocGuidePaths = (toc) => {
  if (toc && toc.length > 0) {
    switch (toc[0]) {
      case 'Assisted Living':
        return {
          path: '/assisted-living-guide',
          label: 'Assisted Living Guide',
        };
      case 'Memory Care':
        return {
          path: '/memory-care-guide',
          label: 'Memory Care Guide',
        };
      default:
        return {
          path: '/nursing-homes-guide',
          label: 'Nursing Homes Guide',
        };
    }
  } else {
    return {
      path: '/nursing-homes-guide',
      label: 'Nursing Homes Guide',
    };
  }
};

export const stateNames = {
  AL: 'Alabama',
  AK: 'Alaska',
  AZ: 'Arizona',
  AR: 'Arkansas',
  AS: 'American Samoa',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DC: 'District Of Columbia',
  DE: 'Delaware',
  FL: 'Florida',
  GA: 'Georgia',
  GU: 'Guam',
  HI: 'Hawaii',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  IA: 'Iowa',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  ME: 'Maine',
  MD: 'Maryland',
  MA: 'Massachusetts',
  MI: 'Michigan',
  MN: 'Minnesota',
  MS: 'Mississippi',
  MO: 'Missouri',
  MT: 'Montana',
  NE: 'Nebraska',
  NV: 'Nevada',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NY: 'New York',
  NC: 'North Carolina',
  ND: 'North Dakota',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PA: 'Pennsylvania',
  PR: 'Puerto Rico',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VT: 'Vermont',
  VA: 'Virginia',
  VI: 'U.S. Virgin Islands',
  WA: 'Washington',
  WV: 'West Virginia',
  WI: 'Wisconsin',
  WY: 'Wyoming',
};

const stateAbbr = {
  Alabama: 'AL',
  Alaska: 'AK',
  Arizona: 'AZ',
  Arkansas: 'AR',
  'American Samoa': 'AS',
  California: 'CA',
  Colorado: 'CO',
  Connecticut: 'CT',
  'District Of Columbia': 'DC',
  Delaware: 'DE',
  Florida: 'FL',
  Georgia: 'GA',
  Guam: 'GU',
  Hawaii: 'HI',
  Idaho: 'ID',
  Illinois: 'IL',
  Indiana: 'IN',
  Iowa: 'IA',
  Kansas: 'KS',
  Kentucky: 'KY',
  Louisiana: 'LA',
  Maine: 'ME',
  Maryland: 'MD',
  Massachusetts: 'MA',
  Michigan: 'MI',
  Minnesota: 'MN',
  Mississippi: 'MS',
  Missouri: 'MO',
  Montana: 'MT',
  Nebraska: 'NE',
  Nevada: 'NV',
  'New Hampshire': 'NH',
  'New Jersey': 'NJ',
  'New Mexico': 'NM',
  'New York': 'NY',
  'North Carolina': 'NC',
  'North Dakota': 'ND',
  Ohio: 'OH',
  Oklahoma: 'OK',
  Oregon: 'OR',
  Pennsylvania: 'PA',
  'Puerto Rico': 'PR',
  'Rhode Island': 'RI',
  'South Carolina': 'SC',
  'South Dakota': 'SD',
  Tennessee: 'TN',
  Texas: 'TX',
  Utah: 'UT',
  Vermont: 'VT',
  Virginia: 'VA',
  'U.S. Virgin Islands': 'VI',
  Washington: 'WA',
  'West Virginia': 'WV',
  Wisconsin: 'WI',
  Wyoming: 'WY',
};

const regionStateMap = {
  Northeast: ['CT', 'ME', 'MA', 'NH', 'RI', 'VT', 'NJ', 'NY', 'PA'],
  Midwest: ['IL', 'IN', 'MI', 'OH', 'WI', 'IA', 'KS', 'MN', 'MO', 'NE', 'ND', 'SD'],
  South: ['DE', 'FL', 'GA', 'MD', 'NC', 'SC', 'VA', 'DC', 'WV'],
  Southeast: ['AL', 'KY', 'MS', 'TN'],
  Southwest: ['AR', 'LA', 'OK', 'TX'],
  'Mountain West': ['AZ', 'CO', 'ID', 'MT', 'NV', 'NM', 'PR', 'UT', 'VI', 'WY'],
  'Pacific West': ['AS', 'GU', 'AK', 'CA', 'HI', 'OR', 'WA'],
};

export const stateRegionMap = Object.entries(regionStateMap).reduce((res, [region, states]) => {
  states.forEach((state) => {
    res[state] = region;
  });
  return res;
}, {});

export const urlize = inString =>
  decodeURI(inString)
    .trim()
    .toLowerCase()
    .replace(/_/g, '-')
    .replace(/[^\w\s-]+/g, '')
    .replace(/[\s-]+/g, ' ')
    .replace(/\s/g, '-');

global.stateData = {
  names: stateNames,
  slugs: Object.entries(stateNames).reduce((res, [key, name]) => (res[key] = urlize(name), res), {}),
  stateRegionMap,
  regionStateMap,
  regionSlugs: Object.keys(regionStateMap).reduce((res, name) => (res[name] = urlize(name), res), {}),
};

export const getBreadCrumbsForCommunity = ({ name, propInfo, address }) => {
  const tocBc = tocPaths(propInfo.typeCare);
  // TODO: use react router generated paths once router wiring is complete
  return [
    {
      path: '/',
      label: 'Home',
    },
    tocBc,
    {
      path: `${tocBc.path}/${urlize(stateNames[address.state])}`,
      label: stateNames[address.state],
    },
    {
      path: `${tocBc.path}/${urlize(stateNames[address.state])}/${urlize(address.city)}`,
      label: address.city,
    },
    {
      path: '#',
      label: name,
    },
  ];
};

export const getBreadCrumbsForLocation = ({ toc, state, city }) => {
  const tocBc = tocPaths([titleize(toc)]);
  // TODO: use react router generated paths once router wiring is complete
  const baseBcs = [{
    path: '/',
    label: 'Home',
  }];
  // TODO A better job
  if (tocBc) {
    baseBcs.push(tocBc);
  } else {
    // Safety
    return baseBcs;
  }

  if (state) {
    baseBcs.push({
      path: `${tocBc.path}/${state}`,
      label: titleize(state),
    });
  } else {
    return baseBcs;
  }

  if (city) {
    baseBcs.push({
      path: `${tocBc.path}/${state}/${city}`,
      label: titleize(city),
    });
  }

  return baseBcs;
};

const agentsPath = '/agents';
export const getBreadCrumbsForAgent = ({ name, state, city, id }) => {
  const baseBcs = [{
    path: '/',
    label: 'Home',
  },
  {
    path: agentsPath,
    label: 'Agents',
  }];

  if (state) {
    const region = stateRegionMap[state];
    baseBcs.push({
      path: `${agentsPath}/${urlize(region)}`,
      label: region,
    });
    if (city) {
      baseBcs.push({
        path: `${agentsPath}/${urlize(region)}/${urlize(city)}-${urlize(state)}`,
        label: `${city}, ${state}`,
      });
      if (name) {
        baseBcs.push({
          path: `${agentsPath}/${urlize(region)}/${urlize(city)}-${urlize(state)}/${id}`,
          label: name,
        });
      }
    } else {
      return baseBcs;
    }
  } else {
    return baseBcs;
  }
  return baseBcs;
};

export const getBreadCrumbsForGuides = ({ toc, region, regionName }) => {
  const tocBc = tocGuidePaths([titleize(toc)]);
  // TODO: use react router generated paths once router wiring is complete
  const baseBcs = [{
    path: '/',
    label: 'Home',
  }];
  // TODO A better job
  if (tocBc) {
    baseBcs.push(tocBc);
  } else {
    // Safety
    return baseBcs;
  }

  if (region) {
    baseBcs.push({
      path: `${tocBc.path}/${region}`,
      label: regionName,
    });
  } else {
    return baseBcs;
  }

  return baseBcs;
};

export const getAgentUrl = ({ id, address }) => {
  const { state, city } = address;
  const region = stateRegionMap[state];
  return `${agentsPath}/${urlize(region)}/${urlize(city)}-${urlize(state)}/${id}`;
};

export const getCitySearchUrl = ({ propInfo, address }) => {
  const tocBc = tocPaths(propInfo.typeCare);
  return `${tocBc.path}/${urlize(stateNames[address.state])}/${address.city ? urlize(address.city) : ''}`;
};

export const getCitySearchWithSizeUrl = ({ propInfo, address }) => {
  const sizeParam = communitySizeSearchParamMap[propInfo.communitySize];
  return `${getCitySearchUrl({ propInfo, address })}?size=${sizeParam}`;
};
export const getCitySearchWithSizeUrlMapView = ({ propInfo, address }) => {
  const sizeParam = communitySizeSearchParamMap[propInfo.communitySize];
  return `${getCitySearchUrl({ propInfo, address })}?size=${sizeParam}&view=map`;
};

export const getOrigin = () => {
  if (!window) {
    return '';
  }
  // window.location.origin is not present in ie, opera and some mobile browsers
  if (!window.location.origin) {
    const port = window.location.port ? `:${window.location.port}` : '';
    window.location.origin = `${window.location.protocol}//${window.location.hostname}${port}`;
  }
  return window.location.origin;
};

export const objectToURLQueryParams = (obj, options) => stringify(obj, options);
export const parseURLQueryParams = obj => parse(obj);

export const getStateAbbr = (state) => {
  if (state) {
    const st = titleize(state);
    return stateAbbr[st];
  }
};

export const removeQueryParamFromURL = (key, sourceURL) => {
  const [path, queryStringStr] = sourceURL.split('?');
  const queryStringsObj = parse(queryStringStr);
  queryStringsObj[key] = undefined;
  const newQs = stringify(queryStringsObj);
  let newPath = path;
  if (newQs !== '') {
    newPath = `${path}?${newQs}`;
  }
  return newPath;
};

export const replaceLastSegment = (orig, id) => {
  if (!id) {
    // remove the last segment
    return orig.replace(/\/[^\/]+\/?$/gm, '');
  }
  // replace it
  return orig.replace(/[^\/]+\/?$/gm, id);
};

export const getLastSegment = (url) => {
  const [last] = url.match(/([^\/]+)\/?$/gm);
  return last;
};

export const generateSearchUrl = (toc, address) => {
  const tocBc = tocPaths(toc);
  return `${tocBc.path}/${urlize(stateNames[address.state])}/${urlize(address.city)}`;
};

export const generateCityPathSearchUrl = (address) => {
  return `${urlize(stateNames[address.state])}/${urlize(address.city)}`;
};

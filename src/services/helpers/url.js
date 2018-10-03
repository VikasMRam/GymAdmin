import { stringify, parse } from 'query-string';

import { titleize } from 'sly/services/helpers/strings';

export default function getSearchUrl(matchParams) {
  /*
   { careType: 'assisted-living', state: 'califo', city: 'sf' }
   */
  const outUrl = {
    city: matchParams.city,
    state: matchParams.state,
    toc: matchParams.toc,
  };
  return outUrl;
}

const tocPaths = (toc) => {
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
      case 'Alzheimers Care':
        return {
          path: '/alzheimers-care',
          label: 'Alzheimers Care',
        };
      default:
        return {
          path: '/retirement-community',
          label: 'Retirement Community',
        };
    }
  } else {
    return {
      path: '/retirement-community',
      label: 'Retirement Community',
    };
  }
};

const stateNames = {
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

export const urlize = inString =>
  inString
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/\s/g, '-');

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
  //TODO A better job
  if (tocBc){
    baseBcs.push(tocBc);
  }
  else {
    //Safety
    return baseBcs;
  }

  if (state) {
    baseBcs.push({
      path: `${tocBc.path}/${state}`,
        label: titleize(state),
    })
  } else {
    return baseBcs;
  }

  if (city) {
    baseBcs.push({
      path: `${tocBc.path}/${state}/${city}`,
      label: titleize(city),
    })
  }

  return baseBcs;

};

export const getCitySearchUrl = ({ propInfo, address }) => {
  const tocBc = tocPaths(propInfo.typeCare);
  return `${tocBc.path}/${urlize(stateNames[address.state])}/${urlize(address.city)}?latitude=${address.latitude}&longitude=${address.longitude}`;
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

export const objectToURLQueryParams = obj => stringify(obj);
export const parseURLQueryParams = obj => parse(obj);

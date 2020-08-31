import { urlize, stateRegionMap, getStateAbbr, objectToURLQueryParams } from 'sly/web/services/helpers/url';

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
  const stateAbbr = getStateAbbr(state);
  const region = stateRegionMap[stateAbbr];

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
    path = `${path}/${urlize(region)}/${urlize(city)}-${urlize(stateAbbr)}${qsPart}`;
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

export const generateAskAgentQuestionContents = (name, city, type) => {
  let heading = `Ask your Local Senior Living Expert a question about ${name} in ${city}.`;
  let placeholder = `Hi, I have a question about ${name} in ${city}...`;
  let description = null;
  let question = null;

  if (type === 'tour') {
    heading = 'We have received your tour request.';
    description = 'Your Local Senior Living Expert will reach out to you soon. Feel free to ask them any questions in' +
      ' the meantime.';
    placeholder = `Hi, I would like more information about ${name}.`;
  } else if (type === 'pricing') {
    heading = 'We have received your custom pricing request.';
    description = 'Your Local Senior Living Expert will reach out to you soon. Feel free to ask them any questions in the meantime.';
  } else if (type === 'offer') {
    heading = `Ask your Local Senior Living Expert about the holiday incentive at ${name}`;
    question = `Hi, I am interested in knowing more about the holiday promotion at ${name}. I am looking for...`;
  } else if (type === 'services') {
    heading = `Ask your Local Senior Living Expert about services provided at ${name}`;
    question = `Hi, I would like more information about ${name}'s amenities.`;
  } else if (type === 'covid-banner') {
    heading = `We are excited to provide you a virtual tour of ${name}`;
    description = "Please tell us when you are available to take your virtual tour?";
    placeholder = "Write your preferred day and time here."
  } else if (type === 'profile-content-question') {
    heading = `Ask us anything about living at ${name}`;
    question = "Hi, I am interested in knowing more about...";
  }

  return {
    heading,
    placeholder,
    description,
    question,
  };
};

export const isOnVacation = (agent) => {
  const { name: businessName, info={}, status } = agent;
  const { vacationStart, vacationEnd } = info;
  try {
    const now = new Date();
    const eDate = Date.parse(vacationEnd);
    return eDate > now;
  }catch (e){
    return false
  }

};

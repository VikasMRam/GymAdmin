import { URL, parse as parseUrl } from 'url';

import { stringify, parse } from 'query-string';

const propToQueryParam = {
  action: 'sly_action',
  label: 'sly_label',
  category: 'sly_category',
  value: 'sly_value',
  nonInteraction: 'sly_ni',
};

export function extractEventFromQuery(search) {
  const qs = parse(search);
  if (!qs.sly_action) {
    return { event: null, search };
  }

  const {
    sly_action: action,
    sly_label: label,
    sly_category: category,
    sly_value: value,
    sly_ni: nonInteraction,
    ...rest
  } = qs;
  const remainingSearch = stringify(rest, {
    sort: (a, b) => search.indexOf(a) - search.indexOf(b),
  });

  return {
    event: Object.assign(
      { action },
      typeof label !== 'undefined' && { label },
      typeof category !== 'undefined' && { category },
      typeof value !== 'undefined' && { value: Number(value) || value },
      typeof nonInteraction !== 'undefined' && { nonInteraction: nonInteraction === 'true' },
    ),
    search: remainingSearch.length > 1 ? `?${remainingSearch}` : '',
  };
}

export function addEventToQueryString(search, event) {
  if (!event || !event.action) {
    return search;
  }


  const serializedEvent = Object.keys(event).reduce((acc, key) => {
    if (event[key] !== 'undefined') {
      acc.push(`${propToQueryParam[key]}=${encodeURIComponent(event[key])}`);
    }

    return acc;
  }, []).join('&');

  const maybeQuestion = search[0] === '?' ? '' : '?';
  const maybeAnd = search.length === 0 ? '' : '&';

  return maybeQuestion + search + maybeAnd + serializedEvent;
}

export function addEventToUrl(urlString, event) {
  if (!urlString) {
    return urlString;
  }

  const url = parseUrl(urlString);

  url.search = addEventToQueryString(url.search || '', event);

  return url.format();
}

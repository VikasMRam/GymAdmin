import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router';
import queryString from 'query-string';

import { usePrefetch } from 'sly/web/services/api/prefetch';
import Search from 'sly/web/components/search/Search';
import { getSearchParams, filterLinkPath, clearFilters } from 'sly/web/components/search/helpers';
import {
  TOC,
  NH,
  CLEARABLE_FILTERS,
} from 'sly/web/components/search/Filters/constants';
import careTypes from 'sly/web/constants/careTypes';
import { getPaginationData } from 'sly/web/services/helpers/pagination';

const getApiFilters = (filters) => Object.entries(filters)
// .filter(([key, value]) => {
//     return !['city', 'state'].includes(key)
//       && !(key === TOC && value === NH);
//   })
  .reduce((acc, [key, value]) => {
    acc[`filter[${key}]`] = encodeURIComponent(value);
    return acc;
  }, {
    //   'filter[geo]': '37.7749295,-122.4194155,10',
  });

export default function SearchContainer() {
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch(`/:toc(${careTypes.join('|')})/:state/:city`);
  // const [kitchens, setKitchens] = useState([]);
  const currentFilters = getSearchParams(match, location);

  const apiFilters = getApiFilters(currentFilters);
  const { requestInfo } = usePrefetch('getSearchResources', request => request(currentFilters));

  const [communities, setCommunities] = useState(requestInfo.normalized);
  useEffect(() => {
    if (requestInfo.hasFinished && communities !== requestInfo.normalized) {
      setCommunities(requestInfo.normalized);
    }
  }, [requestInfo]);

  const onFilterChange = useCallback((param, value) => {
    history.push(filterLinkPath(currentFilters, {
      [param]: value,
    }).path);
  }, [currentFilters]);

  const onClearFilters = useCallback((filtersToClear = CLEARABLE_FILTERS) => {
    const nextFilters = Object.entries(currentFilters)
      .reduce((acc, [key, value]) => {
        if (!filtersToClear.includes(key)) {
          acc[key] = value;
        } else if (key === TOC) {
          acc[key] = NH;
        }
        return acc;
      }, {});
    history.push(filterLinkPath(currentFilters, nextFilters).path);
  }, [currentFilters]);

  const onMapChange = useCallback(() => {
    console.log('map changed');
  }, []);

  let center = {
    lng: 0,
    lat: 0,
  };

  const defaultCenter = center;

  if (requestInfo.normalized && requestInfo.normalized.length) {
    center = {
      lng: requestInfo.normalized[0].longitude,
      lat: requestInfo.normalized[0].latitude,
    };
  }
  const requestMeta = requestInfo.meta;
  let current;
  let total;
  let start;
  let end;
  let count;
  if (requestMeta) {
    ({ current, total } = getPaginationData(requestMeta));
    count = requestMeta['filtered-count'];
    const present = (requestMeta['page-number'] * requestMeta['page-size']);
    start = present + 1;
    end = (present + requestMeta['page-size']  > count ? count : present + requestMeta['page-size']);
  }
  const qs = queryString.stringify(currentFilters);
  let basePath = location.pathname;
  if (qs.length > 0) {
    basePath = `${basePath}?${qs}`;
  }

  return (
    <Search
      currentFilters={currentFilters}
      onMapChange={onMapChange}
      onFilterChange={onFilterChange}
      onClearFilters={onClearFilters}
      defaultCenter={defaultCenter}
      center={center}
      communities={communities || []}
      current={current}
      total={total}
      start={start}
      end={end}
      count={count}
      basePath={basePath}
    />
  );
}


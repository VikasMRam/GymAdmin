import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router';

import { usePrefetch } from 'sly/web/services/api/prefetch';
import Search from 'sly/web/components/search/Search';
import { getSearchParams, filterLinkPath } from 'sly/web/services/helpers/search';
import careTypes from 'sly/web/constants/careTypes';

export default function SearchContainer() {
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch(`/:toc(${careTypes.join('|')})/:state/:city`);
  // const [kitchens, setKitchens] = useState([]);
  const currentFilters = getSearchParams(match, location);
  const { requestInfo } = usePrefetch('getSearchResources', request => request(currentFilters));

  const onFilterChange = useCallback((param, value) => {
    history.push(filterLinkPath(currentFilters, {
      [param]: value,
    }).path);
  }, [currentFilters]);

  // console.log({location, match})
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

  return (
    <Search
      currentFilters={currentFilters}
      onMapChange={onMapChange}
      onFilterChange={onFilterChange}
      defaultCenter={defaultCenter}
      center={center}
      communities={requestInfo.normalized || []}
    />
  );
}


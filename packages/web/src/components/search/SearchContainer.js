import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router';

import { usePrefetch } from 'sly/web/services/api/prefetch';
import Search from 'sly/web/components/search/Search';
import { getSearchParams, filterLinkPath, getApiFilters, getPagination } from 'sly/web/components/search/helpers';
import {
  TOC,
  NH,
  GEO,
  CLEARABLE_FILTERS,
} from 'sly/web/components/search/Filters/constants';
import careTypes from 'sly/web/constants/careTypes';

export default function SearchContainer() {
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch(`/:toc(${careTypes.join('|')})/:state/:city`);
  // const [kitchens, setKitchens] = useState([]);
  const currentFilters = useMemo(() => getSearchParams(match, location), [location]);

  const apiFilters = getApiFilters(currentFilters);
  const { requestInfo: requestResult } = usePrefetch('getCommunitySearch', request => request(apiFilters));

  // set the state to avoid blank page during fetch
  const [requestInfo, setRequestInfo] = useState(requestResult);
  useEffect(() => {
    if (requestResult.hasFinished && requestInfo !== requestResult) {
      setRequestInfo(requestResult);
    }
  }, [requestResult]);

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
    history.push(filterLinkPath({}, nextFilters).path);
  }, [currentFilters]);

  const pagination = useMemo(() => getPagination(requestInfo.meta, location, currentFilters), [requestInfo]);

  return (
    <Search
      currentFilters={currentFilters}
      onFilterChange={onFilterChange}
      onClearFilters={onClearFilters}
      communities={requestInfo.normalized || []}
      meta={requestInfo.meta || {}}
      pagination={pagination}
      location={location}
      hasFinished={requestInfo.hasFinished}
    />
  );
}


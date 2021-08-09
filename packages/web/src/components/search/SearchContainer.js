import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useHistory, useLocation, useParams } from 'react-router';

import events from 'sly/web/services/events';
import { usePrefetch } from 'sly/web/services/api/prefetch';
import Search from 'sly/web/components/search/Search';
import { getSearchParams, filterLinkPath, getApiFilters, getPagination } from 'sly/web/components/search/helpers';
import {
  TOC,
  NH,
  CLEARABLE_FILTERS,
} from 'sly/web/components/search/Filters/constants';
import { useChatbox } from 'sly/web/services/chatbox/ChatBoxContext';

export default function SearchContainer() {
  const location = useLocation();
  const history = useHistory();

  const params = useParams();
  const currentFilters = useMemo(() => getSearchParams({ params }, location), [location]);

  useEffect(() => {
    if (!params) {
      return;
    }
    const { city, state, toc: care } = params;
    events.page('Search', {
      city,
      state,
      care,
    });
  }, [params]);

  const apiFilters = getApiFilters(currentFilters);
  const { requestInfo: requestResult } = usePrefetch('getSearchPage', apiFilters);

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

  const { triggerChatBot } = useChatbox();
  useEffect(() => {
    if (location.pathname.indexOf('nursing-homes') === -1) {
      // triggerChatBot('search-bot');
      triggerChatBot('Bot reintro');
    }
  }, []);

  return (
    <Search
      currentFilters={currentFilters}
      onFilterChange={onFilterChange}
      onClearFilters={onClearFilters}
      entities={requestInfo.normalized || []}
      meta={requestInfo.meta || {}}
      pagination={pagination}
      location={location}
      hasFinished={requestInfo.hasFinished}
    />
  );
}


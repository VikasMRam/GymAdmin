import { useCallback, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import SlyEvent from 'sly/web/services/helpers/events';
import { extractEventFromQuery } from 'sly/web/services/helpers/queryParamEvents';

const PageEventsContainer = ({ skipPageEvent }) => {
  const { replace } = useHistory();
  const location = useLocation();

  const sendQueryEvents = useCallback(() => {
    const { pathname, search, hash } = location;

    const { event, search: searchWithoutEvent } = extractEventFromQuery(search);
    if (event) {
      SlyEvent.getInstance().sendEvent(event);
      replace(pathname + searchWithoutEvent + hash);
      return true;
    }
    return false;
  }, [location]);

  useEffect(() => {
    const { pathname, search } = location;

    if (sendQueryEvents()) return;

    if (!skipPageEvent) {
      SlyEvent.getInstance().sendPageView(pathname, search);
    }
  }, [location]);

  return null;
};

export default PageEventsContainer;

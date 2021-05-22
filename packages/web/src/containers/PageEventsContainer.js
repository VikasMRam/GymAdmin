import { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import SlyEvent from 'sly/web/services/helpers/events';
import { extractEventFromQuery } from 'sly/web/services/helpers/queryParamEvents';

const PageEventsContainer = () => {
  const { replace, location } = useHistory();

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

    SlyEvent.getInstance().sendPageView(pathname, search);
  }, [location]);

  return null;
};

PageEventsContainer.typeHydrationId = 'PageEventsContainer';

export default PageEventsContainer;

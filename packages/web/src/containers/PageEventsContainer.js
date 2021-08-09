import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import SlyEvent from 'sly/web/services/helpers/events';

const PageEventsContainer = ({ skipPageEvent }) => {
  const location = useLocation();

  useEffect(() => {
    const { pathname, search } = location;

    if (!skipPageEvent) {
      SlyEvent.getInstance().sendPageView(pathname, search);
    }
  }, [location]);

  return null;
};

export default PageEventsContainer;

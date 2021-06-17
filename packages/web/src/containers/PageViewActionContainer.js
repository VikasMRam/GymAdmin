import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useQuery } from 'sly/web/services/api';


const PageViewActionContainer = ({ actionType, actionInfo }) => {
  const createAction = useQuery('createUuidAction');
  const { pathname } = useLocation();

  useEffect(() => {
    createAction({
      type: 'UUIDAction',
      attributes: {
        actionInfo,
        actionPage: pathname,
        actionType,
      },
    });
  }, []);

  return null;
};

PageViewActionContainer.typeHydrationId = 'PageViewActionContainer';

export default PageViewActionContainer;

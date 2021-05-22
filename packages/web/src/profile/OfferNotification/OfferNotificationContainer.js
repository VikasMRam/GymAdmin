import React from 'react';
import { useParams } from 'react-router-dom';

import { usePrefetch } from 'sly/web/services/api';
import { PROFILE_CONTACTED } from 'sly/web/services/api/constants';
import { useHasPricingRequest } from 'sly/web/profile/hooks/useHasPricingRequest';
import OfferNotification from 'sly/web/profile/OfferNotification/OfferNotification';

const OfferNotificationContainer = (props) => {
  const params = useParams();

  const { requestInfo: { normalized: uuidActions } } = usePrefetch('getUuidActions', {
    'filter[actionType]': PROFILE_CONTACTED,
    'filter[actionInfo-slug]': params.communitySlug,
  });

  const hasAlreadyRequestedPricing = useHasPricingRequest(uuidActions);

  return <OfferNotification {...props} hasAlreadyRequestedPricing={hasAlreadyRequestedPricing} />;
};

OfferNotification.typeHydrationId = 'OfferNotificationContainer';

export default OfferNotificationContainer;

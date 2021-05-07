import React, { useMemo } from 'react';
import isMatch from 'lodash/isMatch';
import { Redirect } from 'react-router-dom';
import { useParams, useLocation } from 'react-router';

import { useUser, usePrefetch } from 'sly/web/services/api';
import { getLastSegment, replaceLastSegment } from 'sly/web/services/helpers/url';
import CommunityDetailPage from 'sly/web/components/pages/CommunityDetailPage';
import {
  AVAILABILITY_REQUEST,
  PRICING_REQUEST,
  PROFILE_CONTACTED,
  TOUR_BOOKED,
} from 'sly/web/services/api/constants';

const createHasProfileAction = uuidActions => (type, actionInfo) => {
  if (!uuidActions) return false;
  return uuidActions.some((uuidAction) => {
    return uuidAction.actionType === type && isMatch(uuidAction.actionInfo, actionInfo);
  });
};

const CommunityDetailPageContainer = () => {
  const { communitySlug } = useParams();
  const location = useLocation() || {};

  const { requestInfo } = usePrefetch('getCommunity', {
    id: communitySlug,
    include: 'similar-communities,questions,agents',
  });

  const {
    normalized: community,
    status: communityStatus,
    headers: { location: communityLocation },
  } = requestInfo;

  const { requestInfo: { normalized: uuidActions }} = usePrefetch('getUuidActions', {
    'filter[actionType]': `${PROFILE_CONTACTED},${TOUR_BOOKED}`,
    'filter[actionInfo-slug]': communitySlug,
  });

  const hasProfileAction = useMemo(() => createHasProfileAction(uuidActions), [uuidActions]);
  const profileContacted = useMemo(() => ({
    tour: hasProfileAction(TOUR_BOOKED),

    pricing: hasProfileAction(PROFILE_CONTACTED, {
      contactType: PRICING_REQUEST,
    }),

    availability: hasProfileAction(PROFILE_CONTACTED, {
      contactType: AVAILABILITY_REQUEST,
    }),
  }), [hasProfileAction]);

  if (communityStatus === 301) {
    const newSlug = getLastSegment(communityLocation);
    return <Redirect to={replaceLastSegment(location.pathname, newSlug)} />;
  }

  if (communityStatus === 404) {
    return <Redirect to={replaceLastSegment(location.pathname)} />;
  }

  if (!community) {
    return null;
  }

  // If request url does not match resource url from api, perform 302 redirect
  if (location.pathname !== community.url) {
    return <Redirect to={community.url} />;
  }

  return (
    <CommunityDetailPage
      community={community}
      location={location}
      profileContacted={profileContacted}
    />
  );
};

export default React.memo(CommunityDetailPageContainer, () => true);

import React, { useCallback } from 'react';
import { bool, string } from 'prop-types';
import { useParams } from 'react-router-dom';

import SlyEvent from 'sly/web/services/helpers/events';
import CommunitySummary from 'sly/web/components/organisms/CommunitySummary';
import { usePrefetch } from 'sly/web/services/api/prefetch';

const CommunitySummaryContainer = ({ isAdmin, className }) => {
  const params = useParams();

  const { requestInfo: { normalized: community } } = usePrefetch('getCommunity', {
    id: params.communitySlug,
    include: 'similar-communities,questions,agents',
  });

  const sendEvent = useCallback((action, category) =>
    SlyEvent.getInstance().sendEvent({
      action,
      category,
      label: community.id,
    }), []);

  const conciergeNumberClicked = useCallback(() => sendEvent('click', 'conciergeNumberClicked'), []);

  const communityNumberClicked = useCallback(() => sendEvent('click', 'communityNumberClicked'), []);

  const goToReviews = useCallback(() => sendEvent('click', 'viewReviews'), []);

  return (
    <CommunitySummary
      community={community}
      isAdmin={isAdmin}
      onConciergeNumberClicked={conciergeNumberClicked}
      onCommunityNumberClicked={communityNumberClicked}
      goToReviews={goToReviews}
      className={className}
      searchParams={params}
    />
  );
};

CommunitySummaryContainer.propTypes = {
  isAdmin: bool,
  className: string,
};

CommunitySummaryContainer.typeHydrationId = 'CommunitySummaryContainer';

export default CommunitySummaryContainer;

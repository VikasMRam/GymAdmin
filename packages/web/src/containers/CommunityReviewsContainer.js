import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';

import EntityReviews from 'sly/web/components/organisms/EntityReviews';
import SlyEvent from 'sly/web/services/helpers/events';
import { usePrefetch } from 'sly/web/services/api/prefetch';

const CommunityReviewsContainer = () => {
  const { communitySlug } = useParams();

  const { requestInfo: { normalized: community } } = usePrefetch('getCommunity', {
    id: communitySlug,
    include: 'similar-communities,questions,agents',
  });

  const { id, reviews, propRatings: { reviewsValue, ratingsArray } } = community || {};

  const onReviewLinkClicked = useCallback((name) => {
    SlyEvent.getInstance().sendEvent({
      action: 'click',
      category: 'externalReview',
      label: id,
      value: name,
    });
  }, [id]);

  return (
    <EntityReviews
      reviewsValue={reviewsValue}
      reviews={reviews || []}
      reviewRatings={ratingsArray || []}
      onReviewLinkClicked={onReviewLinkClicked}
    />
  );
};

CommunityReviewsContainer.typeHydrationId = 'CommunityReviewsContainer';

export default CommunityReviewsContainer;

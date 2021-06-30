import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ifProp } from 'styled-tools';

import EntityReviews from 'sly/web/components/organisms/EntityReviews';
import SlyEvent from 'sly/web/services/helpers/events';
import { usePrefetch } from 'sly/web/services/api/prefetch';
import HeadingBoxSection from 'sly/web/components/molecules/HeadingBoxSection';
import { space, sx$tablet, sx$laptop, font } from 'sly/common/system';

const StyledHeadingBoxSection = styled(HeadingBoxSection).attrs({ hasNoHr: true })`
  margin-bottom:  ${space('s')};
  ${ifProp('hasNoBottomHr', sx$tablet({
    marginBottom: 'm',
    paddingBottom: 'm',
    paddingTop: '0',
  }), sx$tablet({
    marginBottom: '0',
    paddingBottom: '0',
    paddingTop: '0',
  }))}

  ${sx$laptop({
    paddingX: '0',
  })}
  font:${font('body-l')};
`;

const ListingReviewsContainer = () => {
  const { id } = useParams();
  const { requestInfo: { normalized: listing } } = usePrefetch('getListing', {
    id,
    include: 'similar-communities,questions,agents,reviews',
  });
  const { reviews, name } = listing || {};
  const { reviewsValue, ratingsArray, numReviews } = listing?.info?.raratingInfo || {};
  const onReviewLinkClicked = useCallback((name) => {
    SlyEvent.getInstance().sendEvent({
      action: 'click',
      category: 'externalReview',
      label: id,
      value: name,
    });
  }, [id]);

  return (
    <StyledHeadingBoxSection
      heading={`Reviews at ${name}`}
      id="reviews"
    >
      <EntityReviews
        reviewsValue={reviewsValue}
        numReviews={numReviews}
        reviews={reviews || []}
        reviewRatings={ratingsArray || []}
        onReviewLinkClicked={onReviewLinkClicked}
      />
    </StyledHeadingBoxSection>
  );
};

ListingReviewsContainer.typeHydrationId = 'CommunityReviewsContainer';

export default ListingReviewsContainer;

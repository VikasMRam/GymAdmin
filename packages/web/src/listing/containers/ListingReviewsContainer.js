import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ifProp } from 'styled-tools';

import EntityReviews from 'sly/web/components/organisms/EntityReviews';
import SlyEvent from 'sly/web/services/helpers/events';
import { usePrefetch } from 'sly/web/services/api/prefetch';
import HeadingBoxSection from 'sly/web/components/molecules/HeadingBoxSection';
import { space, sx$tablet, sx$laptop, font, Block, color } from 'sly/common/system';
import { listing as listingPropType } from 'sly/common/propTypes/listing';

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


const StyledButton = styled(Block)`
    font:${font('body-xs')};
    color:${color('viridian.base')};
    text-decoration:underline;
    cursor: pointer;

  `;

const ListingReviewsContainer = ({ listing, ...props }) => {
  const { id } = useParams();
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

  const [showAllReviews, setShowAllReviews] = useState(false);
  const [reviewsUnderView, setReviewsUnderView] = useState([]);

  const showAllReviewsHandler = () => {
    if (showAllReviews) {
      setReviewsUnderView(reviews);
      setShowAllReviews(false);
    } else {
      setReviewsUnderView(reviews.slice(0, 4));
      setShowAllReviews(true);
    }
  };

  useEffect(() => {
    if (reviews.length > 4) {
      setShowAllReviews(true);
      setReviewsUnderView(reviews.slice(0, 4));
    } else {
      setReviewsUnderView(reviews);
    }
  }, reviews);

  return (
    <StyledHeadingBoxSection
      heading={`Reviews at ${name}`}
      {...props}
    >
      <EntityReviews
        reviewsValue={reviewsValue}
        numReviews={numReviews}
        reviews={reviewsUnderView || []}
        reviewRatings={ratingsArray || []}
        onReviewLinkClicked={onReviewLinkClicked}
      />
      {
        (reviews && reviews.length > 4) &&
        <>
          {
          showAllReviews &&
          <StyledButton onClick={showAllReviewsHandler}>
            See all reviews
          </StyledButton>
          }
          {
          !showAllReviews &&
          <StyledButton onClick={showAllReviewsHandler}>
            See less reviews
          </StyledButton>
          }
        </>
      }
    </StyledHeadingBoxSection>

  );
};

ListingReviewsContainer.propTypes = {
  listing: listingPropType,
};

ListingReviewsContainer.typeHydrationId = 'CommunityReviewsContainer';

export default ListingReviewsContainer;

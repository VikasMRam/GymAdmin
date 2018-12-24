import React from 'react';
import { arrayOf, shape, string, number, func, object } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import { Icon, Span } from 'sly/components/atoms';
import EntityReview from 'sly/components/molecules/EntityReview';
import GatheredReviewRatings from 'sly/components/molecules/GatheredReviewRatings';
import { formatRating } from 'sly/services/helpers/rating';

const ReviewValueSection = styled.div`
  margin-bottom: ${size('spacing.large')};
  align-items: center;
`;

const EntityReviews = ({
  reviewsValue,
  reviews,
  reviewRatings,
  onLeaveReview,
  communityReviewsRef,
  onReviewLinkClicked,
}) => {
  let entityReviews = null;
  if (reviews.length > 0) {
    entityReviews = reviews.map((review) => {
      return <EntityReview {...review} key={review.id} />;
    });
  }
  return (
    <article ref={communityReviewsRef}>
      {reviewsValue > 0 &&
      <ReviewValueSection>
        <Icon icon="star" size="regular" palette="secondary" />
        <Span size="subtitle" weight="medium"> {formatRating(reviewsValue)}</Span>
        <Span size="caption" palette="grey"> Average rating</Span>
      </ReviewValueSection>
      }
      {entityReviews}
      {reviewRatings.length > 0 && (
        <GatheredReviewRatings
          reviewRatings={reviewRatings}
          onLeaveReview={onLeaveReview}
          onReviewLinkClicked={onReviewLinkClicked}
        />
      )}
    </article>
  );
};

EntityReviews.propTypes = {
  reviewsValue: number,
  reviews: arrayOf(shape({
    id: string.isRequired,
    author: string.isRequired,
    createdAt: string.isRequired,
    value: number.isRequired,
    comments: string.isRequired,
  })),
  reviewRatings: arrayOf(shape({
    name: string.isRequired,
    numReviews: number.isRequired,
    reviewsUrl: string.isRequired,
    avgRating: number.isRequired,
  })),
  onLeaveReview: func,
  communityReviewsRef: object,
  onReviewLinkClicked: func,
};

EntityReviews.defaultProps = {
  reviews: [],
  reviewRatings: [],
};

export default EntityReviews;

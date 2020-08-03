import React from 'react';
import { arrayOf, shape, string, number, func, object } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/common/components/themes';
import { Icon } from 'sly/common/components/atoms';
import { Span } from 'sly/web/components/atoms';
import EntityReview from 'sly/web/components/molecules/EntityReview';
import GatheredReviewRatings from 'sly/web/components/molecules/GatheredReviewRatings';
import { formatRating } from 'sly/web/services/helpers/rating';

const ReviewValueSection = styled.div`
  margin-bottom: ${size('spacing.large')};
  align-items: center;
`;

const EntityReviews = ({
  reviewsValue,
  reviews,
  reviewRatings,
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
        <Icon icon="star" palette="primary" variation="base" />
        <Span size="subtitle" weight="medium" palette="primary" variation="base"> {formatRating(reviewsValue)}</Span>
        <Span size="caption" palette="grey"> Average rating</Span>
      </ReviewValueSection>
      }
      {entityReviews}
      {reviewRatings.length > 0 && (
        <GatheredReviewRatings
          reviewRatings={reviewRatings}
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
  communityReviewsRef: object,
  onReviewLinkClicked: func,
};

EntityReviews.defaultProps = {
  reviews: [],
  reviewRatings: [],
};

export default EntityReviews;

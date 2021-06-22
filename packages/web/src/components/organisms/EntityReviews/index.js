import React from 'react';
import { arrayOf, shape, string, number, func, object } from 'prop-types';

import EntityReview from 'sly/web/components/molecules/EntityReview';
import GatheredReviewRatings from 'sly/web/components/molecules/GatheredReviewRatings';
import CommunityRating from 'sly/web/components/molecules/CommunityRating';


const EntityReviews = ({
  reviewsValue,
  reviews,
  reviewRatings,
  communityReviewsRef,
  onReviewLinkClicked,
  numReviews,
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
        <CommunityRating
          rating={reviewsValue}
          numReviews={numReviews}
          reviewsText
          pad="l"
        />
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
  numReviews: number,
  communityReviewsRef: object,
  onReviewLinkClicked: func,
};

EntityReviews.defaultProps = {
  reviews: [],
  reviewRatings: [],
};

export default EntityReviews;

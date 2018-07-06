import React from 'react';
import { arrayOf, shape, string, number, func, bool, object } from 'prop-types';

import PropertyReview from 'sly/components/molecules/PropertyReview';
import GatheredReviewRatings from 'sly/components/molecules/GatheredReviewRatings';

const PropertyReviews = ({
  hasSlyReviews,
  hasWebReviews,
  reviews,
  reviewRatings,
  onLeaveReview,
  communityReviewsRef,
  onReviewLinkClicked,
}) => {
  let propertyReviews = null;
  if (hasSlyReviews) {
    propertyReviews = reviews.map((review) => {
      return <PropertyReview {...review} key={review.id} />;
    });
  }
  return (
    <article ref={communityReviewsRef}>
      {propertyReviews}
      {hasWebReviews && (
        <GatheredReviewRatings
          reviewRatings={reviewRatings}
          onLeaveReview={onLeaveReview}
          onReviewLinkClicked={onReviewLinkClicked}
        />
      )}
    </article>
  );
};

PropertyReviews.propTypes = {
  reviews: arrayOf(shape({
    id: string.isRequired,
    author: string.isRequired,
    createdAt: string.isRequired,
    value: number.isRequired,
    comments: string.isRequired,
  })).isRequired,
  reviewRatings: arrayOf(shape({
    name: string.isRequired,
    numReviews: number.isRequired,
    reviewsUrl: string.isRequired,
    avgRating: number.isRequired,
  })).isRequired,
  onLeaveReview: func.isRequired,
  hasSlyReviews: bool.isRequired,
  hasWebReviews: bool.isRequired,
  communityReviewsRef: object,
  onReviewLinkClicked: func,
};

export default PropertyReviews;

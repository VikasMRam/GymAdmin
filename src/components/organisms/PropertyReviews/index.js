import React, { Component } from 'react';
import { arrayOf, shape, string, number, func, bool } from 'prop-types';

import PropertyReview from 'sly/components/molecules/PropertyReview';
import GatheredReviewRatings from 'sly/components/molecules/GatheredReviewRatings';

export default class PropertyReviews extends Component {
  static propTypes = {
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
  };

  render() {
    const {
      hasSlyReviews,
      hasWebReviews,
      reviews,
      reviewRatings,
      onLeaveReview,
    } = this.props;
    let propertyReviews = null;
    if (hasSlyReviews) {
      propertyReviews = reviews.map((review) => {
        return <PropertyReview {...review} key={review.id} />;
      });
    }
    console.log(propertyReviews);
    return (
      <div>
        {propertyReviews}
        {hasWebReviews && (
          <GatheredReviewRatings
            reviewRatings={reviewRatings}
            onLeaveReview={onLeaveReview}
          />
        )}
      </div>
    );
  }
}

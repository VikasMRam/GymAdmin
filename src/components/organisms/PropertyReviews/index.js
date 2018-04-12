import React, { Component } from 'react';
import { arrayOf, shape, string, number, func } from 'prop-types';

import PropertyReview from 'sly/components/molecules/PropertyReview';
import GatheredReviewRatings from 'sly/components/molecules/GatheredReviewRatings';

export default class PropertyReviews extends Component {
  static propTypes = {
    reviews: arrayOf(shape({
      id: number.isRequired,
      name: string.isRequired,
      date: string.isRequired,
      rating: number.isRequired,
      content: string.isRequired,
    })).isRequired,
    reviewRatings: arrayOf(shape({
      name: string.isRequired,
      numReviews: number.isRequired,
      reviewsUrl: string.isRequired,
      avgRating: number.isRequired,
    })).isRequired,
    onLeaveReview: func.isRequired,
  };

  render() {
    const { reviews, reviewRatings, onLeaveReview } = this.props;
    const propertyReviews = reviews.map((review) => {
      return <PropertyReview {...review} key={review.id} />;
    });
    return (
      <div>
        {propertyReviews}
        <GatheredReviewRatings
          reviewRatings={reviewRatings}
          onLeaveReview={onLeaveReview}
        />
      </div>
    );
  }
}

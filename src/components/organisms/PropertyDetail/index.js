import React, { Component } from 'react';

import { CareServicesList, PropertyReviews } from 'sly/components/organisms';

export default class PropertyDetail extends Component {
  render() {
    const {
      name, propInfo, propRatings, reviews, onLeaveReview,
    } = this.props;
    const { careServices, serviceHighlights } = propInfo;
    // TODO : Fix API Response
    const ratingsArray = propRatings.ratingsArray || [];
    const reviewsTemp = reviews[0] || [];
    return (
      <div>
        {name}
        <CareServicesList
          propertyName={name}
          careServices={careServices}
          serviceHighlights={serviceHighlights}
        />
        <PropertyReviews
          reviews={reviewsTemp}
          reviewRatings={ratingsArray}
          onLeaveReview={onLeaveReview}
        />
      </div>
    );
  }
}

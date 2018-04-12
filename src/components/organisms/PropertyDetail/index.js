import React, { Component } from 'react';

import { CareServicesList, PropertyReviews } from 'sly/components/organisms';

export default class PropertyDetail extends Component {
  render() {
    const { detail, onLeaveReview } = this.props;
    if(detail) {
      console.log(JSON.stringify((detail)));
      const { name, propInfo, propRatings, reviews } = detail;
      const { careServices, serviceHighlights } = propInfo;
      // TODO : Fix API Response
      const ratingsArray = propRatings.ratingsArray || [];
      const reviewsTemp = reviews[0] || [];
      return (
        <div>
          {name}
          <CareServicesList propertyName={name} careServices={careServices} serviceHighlights={serviceHighlights} />
          <PropertyReviews reviews={reviewsTemp} reviewRatings={ratingsArray} onLeaveReview={onLeaveReview} />
        </div>
      );
    }
    else{
      return <div>Loading...</div>;
    }
  }
}

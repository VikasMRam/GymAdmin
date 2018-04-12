import React, { Component } from 'react';

import { CareServicesList, PropertyReviews } from 'sly/components/organisms';

export default class PropertyDetail extends Component {
  render() {
    const { detail, onLeaveReview } = this.props;
    if(detail) {
      console.log(JSON.stringify((detail)));
      const { name, propInfo, propRatings } = detail;
      const { careServices, serviceHighlights } = propInfo;
      const { ratingsArray } = propRatings;
      const  reviews = [];
      return (
        <div>
          {name}
          <CareServicesList propertyName={name} careServices={careServices} serviceHighlights={serviceHighlights} />
          <PropertyReviews reviews={reviews} reviewRatings={ratingsArray} onLeaveReview={onLeaveReview} />
        </div>
      );
    }
    else{
      return <div>Loading...</div>;
    }
  }
}

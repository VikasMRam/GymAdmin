import React, { Component } from 'react';
import { Heading } from 'sly/components/atoms';

import CollapsibleSection from 'sly/components/molecules/CollapsibleSection';
import { CareServicesList, PropertyReviews, CommunityDetails } from 'sly/components/organisms';

export default class PropertyDetail extends Component {
  render() {
    const { property, propertySlug, ...props } = this.props;
    const {
      name, propInfo, propRatings, reviews,
    } = property;
    const { careServices, serviceHighlights } = propInfo;
    const {
      communityDescription, staffDescription, residentDescription,
    } = propInfo;
    // TODO: move this to a container for PropertyReviews handling posts
    const onLeaveReview = () => {};
    const ratingsArray = propRatings.ratingsArray || [];
    const reviewsFinal = reviews[0] || [];

    return (
      <div {...props}>
        <Heading level="hero">{name}</Heading>
        <CollapsibleSection title="Community Details">
          <CommunityDetails
            communityName={name}
            communityDescription={communityDescription}
            staffDescription={staffDescription}
            residentDescription={residentDescription}
          />
        </CollapsibleSection>
        <CollapsibleSection title="Care Services">
          <CareServicesList
            propertyName={name}
            careServices={careServices}
            serviceHighlights={serviceHighlights}
          />
        </CollapsibleSection>
        <CollapsibleSection title="Reviews">
          <PropertyReviews
            reviews={reviewsFinal}
            reviewRatings={ratingsArray}
            onLeaveReview={onLeaveReview}
          />
        </CollapsibleSection>
      </div>
    );
  }
}

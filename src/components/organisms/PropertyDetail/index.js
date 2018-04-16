import React, { Component } from 'react';
import { Heading } from 'sly/components/atoms';

import CollapsibleSection from 'sly/components/molecules/CollapsibleSection';
import CareServicesList from 'sly/components/organisms/CareServicesList';
import PropertyReviews from 'sly/components/organisms/PropertyReviews';
import CommunityDetails from 'sly/components/organisms/CommunityDetails';
import PricingAndAvailability from 'sly/components/organisms/PricingAndAvailability';
import SimilarCommunities from 'sly/components/organisms/SimilarCommunities';

export default class PropertyDetail extends Component {
  render() {
    const { property, propertySlug, ...props } = this.props;
    const {
      name,
      propInfo,
      propRatings,
      reviews,
      address,
      rgsAux,
      floorPlans,
      similarProperties,
    } = property;
    const { careServices, serviceHighlights } = propInfo;
    const {
      communityDescription,
      staffDescription,
      residentDescription,
    } = propInfo;
    // TODO: move this to a container for PropertyReviews handling posts
    const onLeaveReview = () => {};
    // TODO: move this to a container PricingAndAvailability for handling bookings
    const onInquireOrBookClicked = () => {};
    const ratingsArray = propRatings.ratingsArray || [];
    const reviewsFinal = reviews || [];
    const roomPrices = floorPlans.map(({ info }) => info);
    // TODO: mock as USA until country becomes available
    address.country = 'USA';

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
        <CollapsibleSection title="Pricing & Floor Plans">
          <PricingAndAvailability
            propertyName={name}
            address={address}
            estimatedPrice={rgsAux.estimatedPrice}
            roomPrices={roomPrices}
            onInquireOrBookClicked={onInquireOrBookClicked}
          />
        </CollapsibleSection>
        <CollapsibleSection title="Similar Communities">
          <SimilarCommunities similarProperties={similarProperties} />
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

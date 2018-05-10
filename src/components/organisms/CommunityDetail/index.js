import React from 'react';
import styled from 'styled-components';
import { size } from 'sly/components/themes';
import { object } from 'prop-types';

import { getBreadCrumbsForCommunity } from "sly/services/helpers/url";
import { Heading } from 'sly/components/atoms';
import CollapsibleSection from 'sly/components/molecules/CollapsibleSection';
import CareServicesList from 'sly/components/organisms/CareServicesList';
import PropertyReviews from 'sly/components/organisms/PropertyReviews';
import CommunityDetails from 'sly/components/organisms/CommunityDetails';
import PricingAndAvailability from 'sly/components/organisms/PricingAndAvailability';
import SimilarCommunities from 'sly/components/organisms/SimilarCommunities';
import AmenitiesAndFeatures from 'sly/components/organisms/AmenitiesAndFeatures';
import OwnerStory from 'sly/components/organisms/OwnerStory';
import CommunityMap from 'sly/components/organisms/CommunityMap';
import CommunityMediaGallery from 'sly/components/organisms/CommunityMediaGallery';
import MorePictures from 'sly/components/organisms/MorePictures';
import HowSlyWorks from 'sly/components/organisms/HowSlyWorks';
import CommunitySummary from 'sly/components/organisms/CommunitySummary';
import BreadCrumb from 'sly/components/molecules/BreadCrumb';

const Wrapper = styled.div`
  padding-left:1rem;
  padding-right:1rem;
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    padding-left:0rem;
    padding-right:0rem;
  }
`;


const CommunityDetail = ({
  community,
  communityReviewsRef,
  breadCrumbRef,
  pricingAndFloorPlansRef,
  communitySummaryRef,
  amenitiesAndFeaturesRef,
  ...props
}) => {
  const {
    id,
    name,
    mainImage,
    startingRate,
    propInfo,
    propRatings,
    reviews,
    address,
    rgsAux,
    floorPlans,
    similarProperties,
    gallery = {},
    videoGallery = {},
    phoneNumber,
    twilioNumber,
    user,
    url,
    typeCare,
  } = community;
  const images = gallery.images || [];
  const videos = videoGallery.videos || [];
  const { careServices, serviceHighlights } = propInfo;
  const {
    communityDescription,
    staffDescription,
    residentDescription,
    ownerExperience,
  } = propInfo;
  const {
    communityHighlights,
    personalSpace,
    personalSpaceOther,
    communitySpace,
    communitySpaceOther,
    nonCareServices,
    nonCareServicesOther,
    languages,
    languagesOther,
  } = propInfo;

  // TODO: move this to a container for PropertyReviews handling posts
  const onLeaveReview = () => {};
  // TODO: move this to a container PricingAndAvailability for handling bookings
  const onInquireOrBookClicked = () => {};
  const { hasSlyReviews, hasWebReviews } = propRatings;
  const ratingsArray = propRatings.ratingsArray || [];
  const reviewsFinal = reviews || [];
  const serviceHighlightsFinal = serviceHighlights || [];
  const roomPrices = floorPlans.map(({ info }) => info);
  // TODO: mock as USA until country becomes available
  address.country = 'USA';
  const mapViewTitle = `Map View of ${name}`;


  const formattedAddress = `${address.line1}, ${address.line2}, ${
    address.city
  }, ${address.state}
    ${address.zip}`
    .replace(/\s/g, ' ')
    .replace(/, ,/g, ', ');

  return (
    <Wrapper {...props}>
      <CommunityMediaGallery
        communityName={name}
        images={images}
        videos={videos}
      />
      <BreadCrumb items={getBreadCrumbsForCommunity( {name, typeCare, address} )} innerRef={breadCrumbRef} />
      <Heading level="hero">{name}</Heading>
      <Heading level="subtitle">{formattedAddress}</Heading>
      <CommunitySummary
        innerRef={communitySummaryRef}
        pricingAndFloorPlansRef={pricingAndFloorPlansRef}
        amenitiesAndFeaturesRef={amenitiesAndFeaturesRef}
        communityReviewsRef={communityReviewsRef}
        twilioNumber={twilioNumber}
        phoneNumber={phoneNumber}
        user={user}
        amenityScore={rgsAux.amenityScore}
        startingRate={startingRate}
        communityHighlights={communityHighlights}
        reviews={reviews}
      />
      <CollapsibleSection
        title="Pricing & Floor Plans"
        innerRef={pricingAndFloorPlansRef}
      >
        <PricingAndAvailability
          communityName={name}
          address={address}
          estimatedPrice={rgsAux.estimatedPrice}
          roomPrices={roomPrices}
          onInquireOrBookClicked={onInquireOrBookClicked}
        />
      </CollapsibleSection>
      <CollapsibleSection title="Similar Communities">
        <SimilarCommunities similarProperties={similarProperties} />
      </CollapsibleSection>
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
          communityName={name}
          careServices={careServices}
          serviceHighlights={serviceHighlightsFinal}
        />
      </CollapsibleSection>
      <CollapsibleSection
        title="Amenities & Features"
        innerRef={amenitiesAndFeaturesRef}
      >
        <AmenitiesAndFeatures
          communityName={name}
          communityHighlights={communityHighlights}
          personalSpace={personalSpace}
          personalSpaceOther={personalSpaceOther}
          communitySpace={communitySpace}
          communitySpaceOther={communitySpaceOther}
          nonCareServices={nonCareServices}
          nonCareServicesOther={nonCareServicesOther}
          languages={languages}
          languagesOther={languagesOther}
        />
      </CollapsibleSection>
      <CollapsibleSection title="Owner's Story">
        <OwnerStory ownerExperience={ownerExperience} />
      </CollapsibleSection>
      <CollapsibleSection title="Reviews" innerRef={communityReviewsRef}>
        <PropertyReviews
          hasSlyReviews={hasSlyReviews}
          hasWebReviews={hasWebReviews}
          reviews={reviewsFinal}
          reviewRatings={ratingsArray}
          onLeaveReview={onLeaveReview}
        />
      </CollapsibleSection>
      <CollapsibleSection title={mapViewTitle} size="large">
        <CommunityMap
          id={id}
          name={name}
          startingRate={startingRate}
          mainImage={mainImage}
          address={address}
          similarProperties={similarProperties}
        />
      </CollapsibleSection>
      <CollapsibleSection title="More Pictures" size="large">
        <MorePictures gallery={gallery} />
      </CollapsibleSection>
      <CollapsibleSection title="How Seniorly Works" size="large">
        <HowSlyWorks />
      </CollapsibleSection>
    </Wrapper>
  );
};

CommunityDetail.propTypes = {
  community: object.isRequired,
  communityReviewsRef: object.isRequired,
  breadCrumbRef: object.isRequired,
  pricingAndFloorPlansRef: object.isRequired,
  communitySummaryRef: object.isRequired,
  amenitiesAndFeaturesRef: object.isRequired,
};

export default CommunityDetail;

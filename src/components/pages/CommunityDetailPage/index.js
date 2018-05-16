import React, { Fragment } from 'react';
import styled from 'styled-components';
import { object, func } from 'prop-types';
import Sticky from 'react-stickynode';

import { getBreadCrumbsForCommunity, getCitySearchUrl } from 'sly/services/helpers/url';

import CommunityDetailPageTemplate from 'sly/components/templates/CommunityDetailPageTemplate';

import ConciergeContainer from 'sly/containers/ConciergeContainer';
import ConciergeController from 'sly/controllers/ConciergeController';
import StickyFooter from 'sly/components/molecules/StickyFooter';
import CommunityStickyHeader from 'sly/components/organisms/CommunityStickyHeader';
import { Heading, Hr } from 'sly/components/atoms';
import CollapsibleSection from 'sly/components/molecules/CollapsibleSection';
import Section from 'sly/components/molecules/Section';
import CareServicesList from 'sly/components/organisms/CareServicesList';
import PropertyReviews from 'sly/components/organisms/PropertyReviews';
import CommunityDetails from 'sly/components/organisms/CommunityDetails';
import PricingAndAvailability from 'sly/components/organisms/PricingAndAvailability';
import SimilarCommunities from 'sly/components/organisms/SimilarCommunities';
import AmenitiesAndFeatures from 'sly/components/organisms/AmenitiesAndFeatures';
import CommunityMap from 'sly/components/organisms/CommunityMap';
import CommunityMediaGallery from 'sly/components/organisms/CommunityMediaGallery';
import MorePictures from 'sly/components/organisms/MorePictures';
import HowSlyWorks from 'sly/components/organisms/HowSlyWorks';
import CommunitySummary from 'sly/components/organisms/CommunitySummary';
import BreadCrumb from 'sly/components/molecules/BreadCrumb';
import { getHelmetForCommunityPage } from 'sly/services/helpers/html_headers';
import Button from 'sly/components/atoms/Button';

const BackToSearch = styled.div`
  text-align:center
`;

export default class CommunityDetailPage extends React.Component {
  static propTypes = {
    community: object.isRequired,
    onLocationSearch: func,
  };

  state = {
    stickyHeaderVisible: false,
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  // TODO: use ref forwarding once we upgrade to react 16.3+: https://reactjs.org/docs/forwarding-refs.html
  communityReviewsRef = React.createRef();
  breadCrumbRef = React.createRef();
  pricingAndFloorPlansRef = React.createRef();
  communitySummaryRef = React.createRef();
  amenitiesAndFeaturesRef = React.createRef();

  handleScroll = () => {
    if (this.breadCrumbRef.current) {
      const rect = this.breadCrumbRef.current.getBoundingClientRect();
      const elemTop = rect.top;
      const elemBottom = rect.bottom;
      const isVisible = elemTop < window.innerHeight && elemBottom >= 0;

      if (!isVisible) {
        this.setState({
          stickyHeaderVisible: true,
        });
      } else {
        this.setState({
          stickyHeaderVisible: false,
        });
      }
    }
  };

  render() {
    const { community, onLocationSearch } = this.props;
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
      twilioNumber,
      user,
    } = community;
    const images = gallery.images || [];
    const videos = videoGallery.videos || [];
    const { careServices, serviceHighlights, communityPhone } = propInfo;
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
    const { hasSlyReviews, hasWebReviews } = propRatings;
    const ratingsArray = propRatings.ratingsArray || [];
    const reviewsFinal = reviews || [];
    const serviceHighlightsFinal = serviceHighlights || [];
    const roomPrices = floorPlans.map(({ info }) => info);
    // TODO: mock as USA until country becomes available
    address.country = 'USA';
    const formattedAddress = `${address.line1}, ${address.line2}, ${
      address.city
    }, ${address.state}
      ${address.zip}`
      .replace(/\s/g, ' ')
      .replace(/, ,/g, ', ');
    const stickyHeaderItems = [
      { label: 'Summary', ref: this.communitySummaryRef },
      { label: 'Pricing & Floor Plans', ref: this.pricingAndFloorPlansRef },
      { label: 'Reviews', ref: this.communityReviewsRef },
    ];
    // 24px or 84px (when sticky header is visible) from top TODO: figure out how to get this from styled theme sizes
    const columnContent = (
      <Sticky
        top={this.state.stickyHeaderVisible ? 84 : 24}
        bottomBoundary="#sticky-sidebar-boundary"
      >
        <ConciergeContainer community={community} />
      </Sticky>
    );
    const bottomContent = (
      <Fragment>
        { getHelmetForCommunityPage(community) }
        {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
        <Section title={`Map View of ${name}`}>
          <CommunityMap
            id={id}
            name={name}
            startingRate={startingRate}
            mainImage={mainImage}
            address={address}
            similarProperties={similarProperties}
          />
        </Section>
        <Section title="More Pictures">
          <MorePictures gallery={gallery} />
        </Section>
        <Section title="How Seniorly Works">
          <HowSlyWorks />
        </Section>
      </Fragment>
    );

    return (
      <Fragment>
        {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
        <CommunityStickyHeader
          items={stickyHeaderItems}
          visible={this.state.stickyHeaderVisible}
        />
        <CommunityDetailPageTemplate
          column={columnContent}
          bottom={bottomContent}
          onLocationSearch={onLocationSearch}
        >
          {(images.length > 0 || videos.length > 0) &&
            <CommunityMediaGallery
              communityName={name}
              images={images}
              videos={videos}
            />
          }
          <BreadCrumb items={getBreadCrumbsForCommunity({ name, propInfo, address })} innerRef={this.breadCrumbRef} />
          <Heading level="hero">{name}</Heading>
          <Heading level="subtitle">{formattedAddress}</Heading>
          <CommunitySummary
            innerRef={this.communitySummaryRef}
            pricingAndFloorPlansRef={this.pricingAndFloorPlansRef}
            amenitiesAndFeaturesRef={this.amenitiesAndFeaturesRef}
            communityReviewsRef={this.communityReviewsRef}
            twilioNumber={twilioNumber}
            phoneNumber={communityPhone}
            user={user}
            amenityScore={rgsAux.amenityScore}
            startingRate={startingRate}
            communityHighlights={communityHighlights}
            reviews={reviews}
          />
          <CollapsibleSection
            title="Pricing & Floor Plans"
            innerRef={this.pricingAndFloorPlansRef}
          >
          <ConciergeController community={community}>
            {({ getPricing }) =>
              <PricingAndAvailability
                community={community}
                address={address}
                estimatedPrice={rgsAux.estimatedPrice}
                roomPrices={roomPrices}
                onInquireOrBookClicked={getPricing}
              />
            }
          </ConciergeController>
          </CollapsibleSection>
          <CollapsibleSection title="Similar Communities">
            <SimilarCommunities similarProperties={similarProperties} />
            <BackToSearch>
              <Button ghost href={getCitySearchUrl({ propInfo, address })}>Communities In {address.city}</Button>
            </BackToSearch>
          </CollapsibleSection>
          <CollapsibleSection title="Community Details">
            <CommunityDetails
              communityName={name}
              communityDescription={communityDescription || rgsAux.slyCommunityDescription}
              staffDescription={staffDescription}
              residentDescription={residentDescription}
              ownerExperience={ownerExperience}
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
            innerRef={this.amenitiesAndFeaturesRef}
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
          <CollapsibleSection title="Reviews" innerRef={this.communityReviewsRef}>
            <PropertyReviews
              hasSlyReviews={hasSlyReviews}
              hasWebReviews={hasWebReviews}
              reviews={reviewsFinal}
              reviewRatings={ratingsArray}
              onLeaveReview={onLeaveReview}
            />
          </CollapsibleSection>
          <Hr id="sticky-sidebar-boundary" />
        </CommunityDetailPageTemplate>
        <ConciergeController community={community}>
          {({ getPricing }) =>
            <StickyFooter
              footerInfo={{
                title: 'Contact Property',
                name: community.name,
                ctaTitle: 'Contact'
              }}
              onFooterClick={getPricing}
            />
          }
        </ConciergeController>
      </Fragment>
    );
  }
}

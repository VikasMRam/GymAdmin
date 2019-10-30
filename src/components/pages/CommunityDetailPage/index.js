import React, { Component } from 'react';
import styled from 'styled-components';
import { object, func } from 'prop-types';
import Sticky from 'react-stickynode';
import { Lazy } from 'react-lazy';

import { size, palette, assetPath } from 'sly/components/themes';
import {
  getBreadCrumbsForCommunity,
  getCitySearchUrl,
} from 'sly/services/helpers/url';
import { getHelmetForCommunityPage } from 'sly/services/helpers/html_headers';
import {
  calculatePricing,
  buildPriceList,
  buildEstimatedPriceList,
} from 'sly/services/helpers/pricing';
import pad from 'sly/components/helpers/pad';
import { Button, Paragraph, Block } from 'sly/components/atoms';
import SeoLinks from 'sly/components/organisms/SeoLinks';
import SampleMenu from 'sly/components/organisms/SampleMenu';
import {
  CommunityDetailPageTemplate,
  makeHeader,
  makeColumn,
  makeBody,
  makeFooter,
  makeTwoColumn,
  makeWrapper,
  makeGallery,
} from 'sly/components/templates/CommunityDetailPageTemplate';
import CommunityStickyFooter from 'sly/components/organisms/CommunityStickyFooter';
import CollapsibleSection, {
  MainSection,
} from 'sly/components/molecules/CollapsibleSection';
import Section from 'sly/components/molecules/Section';
import CommunityDetails from 'sly/components/organisms/CommunityDetails';
import CommunityPricingComparison from 'sly/components/organisms/CommunityPricingComparison';
import SimilarCommunities from 'sly/components/organisms/SimilarCommunities';
import CommunityAmenities from 'sly/components/organisms/CommunityAmenities';
import CommunityMap from 'sly/components/organisms/CommunityMap';
import CommunityMediaGalleryContainer from 'sly/containers/CommunityMediaGalleryContainer';
import BreadCrumb from 'sly/components/molecules/BreadCrumb';
import CommunityLocalDetails from 'sly/components/organisms/CommunityLocalDetails';
import ConciergeContainer from 'sly/containers/ConciergeContainer';
import OfferNotification from 'sly/components/molecules/OfferNotification';
import CommunityCareService from 'sly/components/organisms/CommunityCareService';
import CommunityExtraInfoSection from 'sly/components/molecules/CommunityExtraInfoSection';
import IconItem from 'sly/components/molecules/IconItem';
import GetCurrentAvailabilityContainer from 'sly/containers/GetCurrentAvailabilityContainer';
import HowSlyWorksVideoContainer from 'sly/containers/HowSlyWorksVideoContainer';
import BannerNotification from 'sly/components/molecules/BannerNotification';
import CommunityPricingTable from 'sly/components/organisms/CommunityPricingTable';
import AskAgentQuestionButtonContainer from 'sly/containers/AskAgentQuestionButtonContainer';
import GetCustomPricingButtonContainer from 'sly/containers/GetCustomPricingButtonContainer';
import PlusBranding from 'sly/components/organisms/PlusBranding';
import CollapsibleBlock from 'sly/components/molecules/CollapsibleBlock';
import withExitIntent from 'sly/services/exitIntent/withExitIntent';
import { clickEventHandler } from 'sly/services/helpers/eventHandlers';
import CommunitySummaryContainer from 'sly/containers/CommunitySummaryContainer';
import CommunityAgentSectionContainer from 'sly/containers/CommunityAgentSectionContainer';
import CommunityQuestionAnswersContainer from "sly/containers/CommunityQuestionAnswersContainer";
import CommunityReviewsContainer from "sly/containers/CommunityReviewsContainer";
import CommunityAddReviewButtonContainer from "sly/containers/CommunityAddReviewButtonContainer";
import CommunityMorePicturesContainer from "sly/containers/CommunityMorePicturesContainer";
import BackToSearchButtonContainer from "sly/containers/BackToSearchButtonContainer";
import TrackedSimilarCommunitiesContainer from "sly/containers/TrackedSimilarCommunitiesContainer";

const BackToSearch = styled.div`
  text-align: center;
`;

const StyledCommunitySummary = styled(CommunitySummaryContainer)`
  margin-bottom: ${size('spacing.xLarge')};
  margin-top: ${size('spacing.xLarge')};
  position: relative;
  background: ${palette('white', 'base')};
  z-index: 1;

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    margin-top: 0;
    position: initial;
    border-top-right-radius: 0;
    border-top-left-radius: 0;
  }
`;

const IconItemWrapper = styled.div`
  margin-bottom: ${size('spacing.large')};
`;

const StyledOfferNotification = styled(OfferNotification)`
  margin-bottom: ${size('spacing.xLarge')};
`;

const BottomCollapsibleSection = styled(CollapsibleSection)`
  margin-bottom: ${size('spacing.xxxLarge')};
`;

const TopCollapsibleSection = styled(CollapsibleSection)`
  margin-bottom: ${size('spacing.xLarge')};
`;

const StyledSection = styled(Section)`
  margin-bottom: ${size('spacing.xxxLarge')}!important;
`;

const StyledCommunityExtraInfoSection = styled(CommunityExtraInfoSection)`
  margin-bottom: ${size('spacing.xLarge')};
`;

const StyledBannerNotification = pad(BannerNotification, 'large');

const ButtonBlock = styled(Block)`
  padding: ${size('spacing.xLarge')};
  padding-top: 0;
`;

const StyledButton = styled(Button)`
  width: 100%;
`;
const StyledLeaveReviewButton = styled(CommunityAddReviewButtonContainer)`
  width: 100%;
`;

const EventsWrapper = styled(CollapsibleBlock)`
  display: grid;
  grid-template-columns: 100%;
  grid-row-gap: ${size('spacing.large')};

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    grid-template-columns: 50% 50%;
    grid-column-gap: ${size('layout.gutter')};
  }
`;

const StyledAskAgentButton = styled(AskAgentQuestionButtonContainer)`
  width: 100%;
`;

const Header = makeHeader();
const TwoColumn = makeTwoColumn('div');
const Body = makeBody('div');
const Column = makeColumn('aside');
const Footer = makeFooter('footer');
const Wrapper = makeWrapper('div');
const Gallery = makeGallery('div');

const makeBanner = (profileContacted) => {
  const requests = Object.entries(profileContacted).reduce(
    (acc, [key, value]) => {
      if (value) {
        if (acc.length) acc.push(', ');
        acc.push(key);
      }
      return acc;
    },
    []
  );

  if (!requests.length) {
    return null;
  }

  if (requests.length > 1) {
    requests[requests.length - 2] = ' and ';
  }

  return `We have your ${requests.join(
    ''
  )} request. Your Seniorly Partner Agent is checking with this community and will get back to you shortly.`;
};

@withExitIntent
export default class CommunityDetailPage extends Component {
  static propTypes = {
    user: object,
    community: object.isRequired,
    location: object.isRequired,
    profileContacted: object.isRequired,
    userAction: object,
    history: object,
  };

  render() {
    const {
      community,
      profileContacted,
      location,
      user,
    } = this.props;

    const {
      name,
      propInfo,
      address,
      rgsAux,
      floorPlans,
      similarProperties,
      gallery = {},
      videoGallery = {},
      mainImage,
      partnerAgents,
      twilioNumber,
      guideUrl,
    } = community;

    const {
      careServices,
      promoDescription,
      promoTitle,
      communitySize,
      communityInsights,
    } = propInfo;

    const {
      plusCommunity, menuLink, sampleAppetizers, sampleMain, sampleSide, sampleDessert, sampleEvents, eventsLink,
    } = propInfo;

    // TODO: move this to common helper, used in multiple places
    const communityDefaultImages = {
      'up to 20 Beds': assetPath('vectors/Board_and_Care.svg'),
      '20 - 51 Beds': assetPath('vectors/Medium_Assisted_Living.svg'),
      '51 +': assetPath('vectors/Large_Assisted_Living.svg'),
    };
    let key = 'up to 20 Beds';
    if (communitySize !== undefined && communitySize !== '') {
      key = communitySize;
    }
    const defaultImageUrl = communityDefaultImages[key];

    let images = gallery.images || [];
    // if images is empty add default image
    if (images.length === 0) {
      const imgShape = {
        sd: defaultImageUrl,
        hd: defaultImageUrl,
        thumb: defaultImageUrl,
        url: defaultImageUrl,
      };
      images.unshift(imgShape);
      gallery.images = images;
    }

    // If there is a mainImage put it in front
    const communityMainImage = images.find((element) => {
      return element.sd === mainImage;
    });

    if (communityMainImage) {
      images = images.filter(img => img.sd !== communityMainImage.sd);
      images.unshift(communityMainImage);
      gallery.images = images;
    }
    const videos = videoGallery.videos || [];
    const {
      communityDescription,
      staffDescription,
      residentDescription,
      ownerExperience,
      typeCare: typeCares,
    } = propInfo;

    const typeOfCare = typeCares[0];
    const hasCCRC = typeCares.includes(
      'Continuing Care Retirement Community(CCRC)'
    );

    // TODO: mock as USA until country becomes available
    address.country = 'USA';

    const bannerNotification = makeBanner(profileContacted);
    // FIXME: @fonz cleaning this up
    const isAlreadyPricingRequested = profileContacted.pricing;

    const { estimatedPriceBase, sortedEstimatedPrice } = calculatePricing(
      community,
      rgsAux.estimatedPrice
    );

    const partnerAgent =
      partnerAgents && partnerAgents.length > 0 ? partnerAgents[0] : null;

    const { autoHighlights, nearbyCities } = rgsAux;

    const pricesList = buildPriceList(community);
    const estimatedPriceList = buildEstimatedPriceList(community);
    const pricingTitle =
      pricesList.length === 0 && floorPlans.length > 0
        ? 'Pricing and Floor Plans'
        : 'Pricing';

    const showSimilarEarlier =
      pricesList.length === 0 &&
      floorPlans.length > 0 &&
      address.city === 'Sacramento' &&
      address.state === 'CA' &&
      (!communityDescription || communityDescription === '');
    const similarCommunityStyle = {
      layout: 'column',
      imageSize: 'regular',
      showDescription: true,
    };

    return (
      <>
        {getHelmetForCommunityPage(community, location)}
        <Header noBottomMargin={!!bannerNotification} />
        {bannerNotification && (
          <StyledBannerNotification>
            {bannerNotification}
          </StyledBannerNotification>
        )}
        <CommunityDetailPageTemplate>
          <Wrapper>
            <BreadCrumb
              items={getBreadCrumbsForCommunity({ name, propInfo, address })}
            />
            <TwoColumn>
              <Body>
                {(images.length > 0 || videos.length > 0) && (
                  <Gallery>
                    <CommunityMediaGalleryContainer community={community} />
                  </Gallery>
                )}
                <StyledCommunitySummary
                  community={community}
                  isAdmin={user && user.admin}
                />
                {(promoDescription || promoTitle) && (
                  <StyledOfferNotification
                    palette="warning"
                    title={promoTitle}
                    description={promoDescription}
                    hasLearnMore
                    community={community}
                    hasAlreadyRequested={isAlreadyPricingRequested}
                  />
                )}
                {communityInsights &&
                  communityInsights.length > 0 && (
                    <TopCollapsibleSection
                      title={`Community Insights at ${name}`}
                    >
                      <MainSection>
                        {communityInsights.map(item => (
                          <IconItemWrapper key={item}>
                            <IconItem
                              icon="check"
                              iconPalette="secondary"
                              borderless={false}
                            >
                              {item}
                            </IconItem>
                          </IconItemWrapper>
                        ))}
                      </MainSection>
                    </TopCollapsibleSection>
                  )}
                {!communityInsights &&
                  autoHighlights && (
                    <TopCollapsibleSection
                      title={`Community Highlights at ${name}`}
                    >
                      <MainSection>
                        {autoHighlights.map(item => (
                          <IconItemWrapper key={item}>
                            <IconItem
                              icon="check"
                              iconPalette="secondary"
                              borderless={false}
                            >
                              {item}
                            </IconItem>
                          </IconItemWrapper>
                        ))}
                      </MainSection>
                    </TopCollapsibleSection>
                  )}
                {showSimilarEarlier && (
                  <TopCollapsibleSection
                    title={`Similar ${typeOfCare} Communities`}
                    id="sticky-sidebar-boundary"
                  >
                    <MainSection>
                      <TrackedSimilarCommunitiesContainer
                        communities={similarProperties}
                        communityStyle={similarCommunityStyle}
                      />
                      <BackToSearch>
                        <BackToSearchButtonContainer
                          community={community}
                          href={getCitySearchUrl({ propInfo, address })}
                          ghost
                        >
                          Communities In {address.city}
                        </BackToSearchButtonContainer>
                      </BackToSearch>
                    </MainSection>
                  </TopCollapsibleSection>
                )}
                <TopCollapsibleSection
                  title={`${pricingTitle} at ${name}`}
                  id="pricing-and-floor-plans"
                >
                  {hasCCRC && (
                    <MainSection>
                      <Paragraph>
                        Pricing for {name} may include both a one time buy-in
                        fee and a monthly component. Connect directly with{' '}
                        {name} to find out your pricing.
                      </Paragraph>
                      <GetCustomPricingButtonContainer
                        hasAlreadyRequestedPricing={isAlreadyPricingRequested}
                        community={community}
                      >
                        Get Detailed Pricing
                      </GetCustomPricingButtonContainer>
                    </MainSection>
                  )}
                  {!hasCCRC && (
                    <CommunityPricingTable
                      name={name}
                      pricesList={pricesList}
                      estimatedPriceList={estimatedPriceList}
                      price={estimatedPriceBase}
                      GetPricingButton={props => (
                        <GetCustomPricingButtonContainer
                          community={community}
                          hasAlreadyRequestedPricing={isAlreadyPricingRequested}
                          {...props}
                        />
                      )}
                      size={communitySize}
                      showToolTip={address.state === 'TN'}
                      community={community}
                    />
                  )}
                </TopCollapsibleSection>

                <TopCollapsibleSection
                  title={`Get Availability at ${name}`}
                  id="availability"
                >
                  <MainSection>
                    <GetCurrentAvailabilityContainer
                      community={community}
                      hasAlreadyRequestedPricing={isAlreadyPricingRequested}
                    />
                  </MainSection>
                </TopCollapsibleSection>
                {plusCommunity && <PlusBranding />}
                {(communityDescription || rgsAux.communityDescription) && (
                  <TopCollapsibleSection
                    title={`Details on ${name}`}
                    id="details"
                  >
                    <MainSection>
                      <CommunityDetails
                        communityName={name}
                        communityDescription={communityDescription}
                        rgsAuxDescription={rgsAux.communityDescription}
                        staffDescription={staffDescription}
                        residentDescription={residentDescription}
                        ownerExperience={ownerExperience}
                        city={address.city}
                        state={address.state}
                        twilioNumber={twilioNumber}
                        guideUrl={guideUrl}
                      />
                    </MainSection>
                  </TopCollapsibleSection>
                )}
                <TopCollapsibleSection title={`How Seniorly Works in ${address.city}, ${address.state}`}>
                  <MainSection noPadding>
                    <HowSlyWorksVideoContainer eventLabel={community.id} />
                  </MainSection>
                </TopCollapsibleSection>
                {partnerAgent && (
                  <TopCollapsibleSection
                    title={`Your Seniorly Partner Agent for ${name}`}
                  >
                    <MainSection>
                      <CommunityAgentSectionContainer agent={partnerAgent} />
                    </MainSection>
                    <ButtonBlock>
                      <StyledAskAgentButton
                        type="services"
                        community={community}
                      >
                        Ask a Question
                      </StyledAskAgentButton>
                    </ButtonBlock>
                  </TopCollapsibleSection>
                )}
                {careServices &&
                  careServices.length > 0 && (
                    <TopCollapsibleSection title={`Care Services at ${name}`}>
                      <MainSection>
                        <CommunityCareService careServices={careServices} />
                      </MainSection>
                      <ButtonBlock>
                        <StyledAskAgentButton
                          type="services"
                          community={community}
                        >
                          Ask About Care Services
                        </StyledAskAgentButton>
                      </ButtonBlock>
                    </TopCollapsibleSection>
                  )}
                <TopCollapsibleSection title={`Amenities at ${name}`}>
                  <MainSection>
                    <CommunityAmenities community={community} />
                  </MainSection>
                  <ButtonBlock>
                    <StyledAskAgentButton type="services" community={community}>
                      Ask About Amenities
                    </StyledAskAgentButton>
                  </ButtonBlock>
                </TopCollapsibleSection>
                {sortedEstimatedPrice.length > 0 && (
                  <TopCollapsibleSection
                    title={`Compare Costs to Nearby ${typeOfCare} Communities`}
                  >
                    <MainSection>
                      <CommunityPricingComparison community={community} />
                    </MainSection>
                  </TopCollapsibleSection>
                )}
                <TopCollapsibleSection
                  title={`Reviews at ${name}`}
                  id="reviews"
                >
                  <MainSection>
                    <CommunityReviewsContainer community={community} />
                  </MainSection>
                  <ButtonBlock>
                    <StyledLeaveReviewButton>Write a Review</StyledLeaveReviewButton>
                  </ButtonBlock>
                </TopCollapsibleSection>

                <TopCollapsibleSection title={`Questions About ${name}`}>
                  <MainSection>
                    <CommunityQuestionAnswersContainer community={community} />
                  </MainSection>
                </TopCollapsibleSection>
                {plusCommunity && eventsLink && sampleEvents &&
                <TopCollapsibleSection title={`Events at ${name}`}>
                  <MainSection>
                    <EventsWrapper>
                      {sampleEvents.map(item => (
                        <IconItemWrapper key={item}>
                          <IconItem icon="check" iconPalette="secondary" borderless={false}>{item}</IconItem>
                        </IconItemWrapper>))
                      }
                    </EventsWrapper>
                  </MainSection>
                  <ButtonBlock>
                    <StyledButton href={eventsLink} onClick={clickEventHandler('events', name)} target="_blank" ghost>Download Events Calendar</StyledButton>
                  </ButtonBlock>
                </TopCollapsibleSection>
                }

                {plusCommunity && menuLink &&
                <TopCollapsibleSection title={`Sample Menu at ${name}`}>
                  <MainSection>
                    <SampleMenu
                      sampleAppetizers={sampleAppetizers}
                      sampleMain={sampleMain}
                      sampleSide={sampleSide}
                      sampleDessert={sampleDessert}
                    />
                  </MainSection>
                  <ButtonBlock>
                    <StyledButton href={menuLink} onClick={clickEventHandler('menu', name)} target="_blank" ghost>Download Current Menu</StyledButton>
                  </ButtonBlock>
                </TopCollapsibleSection>
                }

                {rgsAux.stateLicensingWebsite && (
                  <StyledCommunityExtraInfoSection
                    title={`${name} at ${address.city} State Licensing`}
                    description={`${name} is licensed by the state of ${
                      address.state
                    }`}
                    url={rgsAux.stateLicensingWebsite}
                    urlText="Visit the state licensing website"
                  />
                )}
                <StyledCommunityExtraInfoSection
                  title="Disclaimer"
                  description="The information on this page has been created to the best of our abilities. To ensure accuracy, please confirm with your local Seniorly Seniorly Partner Agent or directly with the property. If this is your senior living community, we would welcome any updates you wish to provide."
                  url="/providers/housing"
                  urlText="Simply claim your profile by clicking here"
                />
                {!showSimilarEarlier && (
                  <BottomCollapsibleSection
                    title={`Similar ${typeOfCare} Communities`}
                    id="sticky-sidebar-boundary"
                  >
                    <MainSection>
                      <TrackedSimilarCommunitiesContainer
                        communities={similarProperties}
                        communityStyle={similarCommunityStyle}
                      />
                      <BackToSearch>
                        <BackToSearchButtonContainer
                          community={community}
                          href={getCitySearchUrl({ propInfo, address })}
                          ghost
                        >
                          Communities In {address.city}
                        </BackToSearchButtonContainer>
                      </BackToSearch>
                    </MainSection>
                  </BottomCollapsibleSection>
                )}
                <CommunityStickyFooter
                  community={community}
                  isAlreadyPricingRequested={isAlreadyPricingRequested}
                />
              </Body>
              <Column>
                <Sticky top={24} bottomBoundary="#sticky-sidebar-boundary">
                  <ConciergeContainer community={community} />
                </Sticky>
              </Column>
            </TwoColumn>
            {images.length > 1 && (
              <StyledSection
                title={`More Photos of ${name}`}
                titleSize="subtitle"
              >
                <CommunityMorePicturesContainer community={community} />
              </StyledSection>
            )}
            <Section title={`Map View of ${name}`} titleSize="subtitle" />
          </Wrapper>
          <StyledSection>
            <Lazy ltIE9 component="div">
              <CommunityMap
                community={community}
                similarProperties={similarProperties}
              />
            </Lazy>
          </StyledSection>

          {nearbyCities &&
            nearbyCities.length > 0 && (
              <Wrapper>
                <SeoLinks
                  title={`Top Cities Near ${name}`}
                  links={nearbyCities}
                />
              </Wrapper>
            )}
          {(address.state === 'NY' ||
            address.state === 'FL' ||
            address.state === 'TX') && (
            <Wrapper>
              {rgsAux && rgsAux.localDetails !== '' ? (
                <Section title="Local Details" titleSize="subtitle">
                  <CommunityLocalDetails localDetails={rgsAux.localDetails} />
                </Section>
              ) : null}
            </Wrapper>
          )}
        </CommunityDetailPageTemplate>
        <Footer />
      </>
    );
  }
}

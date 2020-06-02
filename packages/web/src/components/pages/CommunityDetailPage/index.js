import React, { Component } from 'react';
import styled from 'styled-components';
import { object } from 'prop-types';
import { ifProp } from 'styled-tools';

import { size, palette } from 'sly/web/components/themes';
import {
  getBreadCrumbsForCommunity,
  getCitySearchUrl,
} from 'sly/web/services/helpers/url';
import { getHelmetForCommunityPage } from 'sly/web/services/helpers/html_headers';
import {
  calculatePricing,
  buildPriceList,
  buildEstimatedPriceList,
} from 'sly/web/services/helpers/pricing';
import pad from 'sly/web/components/helpers/pad';
import { withHydration } from 'sly/web/services/partialHydration';
import { getIsCCRC, getIsSNF } from 'sly/web/services/helpers/community';
import { Button, Paragraph, Hr, Block, Link, Heading } from 'sly/web/components/atoms';
import SeoLinks from 'sly/web/components/organisms/SeoLinks';
import SampleMenu from 'sly/web/components/organisms/SampleMenu';
import {
  CommunityDetailPageTemplate,
  makeBody,
  makeColumn,
  makeFooter,
  makeGallery,
  makeHeader,
  makeTwoColumn,
  makeWrapper,
} from 'sly/web/components/templates/CommunityDetailPageTemplate';
import UnhydratedCommunityStickyFooter from 'sly/web/components/organisms/CommunityStickyFooter';
import Section from 'sly/web/components/molecules/Section';
import CommunityDetails from 'sly/web/components/organisms/CommunityDetails';
import CommunityPricingComparison from 'sly/web/components/organisms/CommunityPricingComparison';
import CommunityAmenities from 'sly/web/components/organisms/CommunityAmenities';
import UnhydratedLazyCommunityMap from 'sly/web/containers/LazyCommunityMapContainer';
import UnhydratedCommunityMediaGalleryContainer from 'sly/web/containers/CommunityMediaGalleryContainer';
import BreadCrumb from 'sly/web/components/molecules/BreadCrumb';
import UnhydratedOfferNotification from 'sly/web/components/molecules/OfferNotification';
import CommunityCareService from 'sly/web/components/organisms/CommunityCareService';
import CommunityExtraInfoSection from 'sly/web/components/molecules/CommunityExtraInfoSection';
import IconItem from 'sly/web/components/molecules/IconItem';
import IconButton from 'sly/web/components/molecules/IconButton';
import UnhydratedGetCurrentAvailabilityContainer from 'sly/web/containers/GetCurrentAvailabilityContainer';
import UnhydratedHowSlyWorksVideoContainer from 'sly/web/containers/HowSlyWorksVideoContainer';
import BannerNotification from 'sly/web/components/molecules/BannerNotification';
import CommunityPricingTable from 'sly/web/components/organisms/CommunityPricingTable';
import UnhydratedAskAgentQuestionButtonContainer from 'sly/web/containers/AskAgentQuestionButtonContainer';
import UnhydratedGetCustomPricingButtonContainer from 'sly/web/containers/GetCustomPricingButtonContainer';
import PlusBranding from 'sly/web/components/organisms/PlusBranding';
import CollapsibleBlock from 'sly/web/components/molecules/CollapsibleBlock';
import { clickEventHandler } from 'sly/web/services/helpers/eventHandlers';
import UnhydratedCommunitySummaryContainer from 'sly/web/containers/CommunitySummaryContainer';
import UnhydratedCommunityAgentSectionContainer from 'sly/web/containers/CommunityAgentSectionContainer';
import UnhydratedCommunityQuestionAnswersContainer from 'sly/web/containers/CommunityQuestionAnswersContainer';
import UnhydratedCommunityReviewsContainer from 'sly/web/containers/CommunityReviewsContainer';
import UnhydratedCommunityAddReviewButtonContainer from 'sly/web/containers/CommunityAddReviewButtonContainer';
import UnhydratedCommunityMorePicturesContainer from 'sly/web/containers/CommunityMorePicturesContainer';
import UnhydratedTrackedSimilarCommunitiesContainer from 'sly/web/containers/TrackedSimilarCommunitiesContainer';
import UnhydratedPageViewActionContainer from 'sly/web/containers/PageViewActionContainer';
import { PROFILE_VIEWED } from 'sly/web/services/api/constants';
import HeadingBoxSection from 'sly/web/components/molecules/HeadingBoxSection';
import UnhydratedPageEventsContainer from 'sly/web/containers/PageEventsContainer';
import UnhydratedCommunityDetailsPageColumnContainer from 'sly/web/containers/CommunityDetailsPageColumnContainer';
import UnhydratedCommunityProfileAdTileContainer from 'sly/web/containers/communityProfile/AdTileContainer';
import UnhydratedBannerNotificationAdContainer from 'sly/web/containers/BannerNotificationAdContainer'

const PageViewActionContainer = withHydration(UnhydratedPageViewActionContainer, { alwaysHydrate: true });
const PageEventsContainer = withHydration(UnhydratedPageEventsContainer, { alwaysHydrate: true });
const CommunityMediaGalleryContainer = withHydration(UnhydratedCommunityMediaGalleryContainer);
const CommunitySummaryContainer = withHydration(UnhydratedCommunitySummaryContainer);
const OfferNotification = withHydration(UnhydratedOfferNotification);
const GetCustomPricingButtonContainer = withHydration(UnhydratedGetCustomPricingButtonContainer);
const TrackedSimilarCommunitiesContainer = withHydration(UnhydratedTrackedSimilarCommunitiesContainer);
const GetCurrentAvailabilityContainer = withHydration(UnhydratedGetCurrentAvailabilityContainer);
const HowSlyWorksVideoContainer = withHydration(UnhydratedHowSlyWorksVideoContainer);
const CommunityAgentSectionContainer = withHydration(UnhydratedCommunityAgentSectionContainer);
const AskAgentQuestionButtonContainer = withHydration(UnhydratedAskAgentQuestionButtonContainer);
const CommunityReviewsContainer = withHydration(UnhydratedCommunityReviewsContainer);
const CommunityAddReviewButtonContainer = withHydration(UnhydratedCommunityAddReviewButtonContainer);
const CommunityQuestionAnswersContainer = withHydration(UnhydratedCommunityQuestionAnswersContainer);
const CommunityStickyFooter = withHydration(UnhydratedCommunityStickyFooter, { alwaysHydrate: true });
const CommunityMorePicturesContainer = withHydration(UnhydratedCommunityMorePicturesContainer);
const LazyCommunityMap = withHydration(UnhydratedLazyCommunityMap);
const CommunityDetailsPageColumnContainer = withHydration(UnhydratedCommunityDetailsPageColumnContainer);
const CommunityProfileAdTileContainer = withHydration(UnhydratedCommunityProfileAdTileContainer, { alwaysHydrate: true });
const BannerNotificationAdContainer = withHydration(UnhydratedBannerNotificationAdContainer);

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

const StyledHeadingBoxSection = styled(HeadingBoxSection).attrs({ hasNoHr: true })`
  margin-bottom: ${ifProp('extraBottomMargin', size('spacing.xxxLarge'), size('spacing.xLarge'))};
`;

const StyledSection = styled(Section)`
  margin-bottom: ${size('spacing.xxxLarge')}!important;
`;

const StyledCommunityExtraInfoSection = styled(CommunityExtraInfoSection)`
  margin-bottom: ${size('spacing.xLarge')};
`;

const StyledBannerNotification = pad(BannerNotification, 'large');

const StyledButton = styled(Button)`
  width: 100%;
  margin-top: ${size('spacing.xLarge')};
`;
const StyledLeaveReviewButton = styled(CommunityAddReviewButtonContainer)`
  width: 100%;
  margin-top: ${size('spacing.xLarge')};
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
  margin-top: ${size('spacing.xLarge')};
`;

const StickToTop = styled.div`
  position: sticky;
  top: 24px;
`;

const StyledIconButton = styled(IconButton)`
  font-weight: bold;
  margin-bottom: ${size('spacing.large')};
`;

const StyledHr = styled(Hr)`
  margin-top: ${size('spacing.regular')};;
  margin-bottom: ${size('spacing.xLarge')};
`;

const TextBlock = styled(Block)`
  font-weight: bold;
  margin-bottom: ${size('spacing.large')};
  text-align: center;
`;

const CTAWrapper = styled.div`
  text-align: center;
  display: grid;
  justify-content: center;
  grid-template-columns: auto auto;
`;

const CTAButton = styled(AskAgentQuestionButtonContainer)`
`;

const CTABlock = styled(Block)`
  display: inline-block;
  padding-left: ${size('spacing.regular')};
  line-height: ${size('element.regular')};
`;

const CovidWrapper = styled.div`
  padding: ${size('spacing.large')};
  background-color: ${palette('secondary', 'filler')};
  border-radius: ${size('border.xLarge')};
  border-top: 4px solid ${palette('secondary', 'darker-30')};
  margin-bottom: ${size('spacing.xLarge')};
  text-align: center;
`;

const AdWrapper = styled.div`
  margin-bottom: ${size('spacing.xLarge')};
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
    [],
  );

  if (!requests.length) {
    return null;
  }

  if (requests.length > 1) {
    requests[requests.length - 2] = ' and ';
  }

  return `We have your ${requests.join(
    '',
  )} request. Your Seniorly Local Expert is checking with this community and will get back to you shortly.`;
};

export default class CommunityDetailPage extends Component {
  static propTypes = {
    user: object,
    community: object.isRequired,
    location: object.isRequired,
    profileContacted: object.isRequired,
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
      partnerAgents,
      twilioNumber,
      guideUrl,
    } = community;

    const {
      careServices,
      promoDescription,
      promoTitle,
      covidInfoDescription,
      covidInfoTitle,
      communitySize,
      communityInsights,
      plusCommunity,
      menuLink,
      sampleAppetizers,
      sampleMain,
      sampleSide,
      sampleDessert,
      sampleEvents,
      eventsLink,
      communityDescription,
      staffDescription,
      residentDescription,
      ownerExperience,
      typeCare: typeCares,
    } = propInfo;

    const typeOfCare = typeCares[0];
    const hasCCRC = getIsCCRC(community);
    const hasSNF = getIsSNF(community);

    // TODO: mock as USA until country becomes available
    address.country = 'USA';

    const bannerNotification = makeBanner(profileContacted);
    // FIXME: @fonz cleaning this up
    const isAlreadyPricingRequested = profileContacted.pricing;

    const { estimatedPriceBase, sortedEstimatedPrice } = calculatePricing(community, rgsAux.estimatedPrice);

    const partnerAgent = partnerAgents && partnerAgents.length > 0 ? partnerAgents[0] : null;

    const { autoHighlights, nearbyCities } = rgsAux;

    const showMoreImages = gallery.images && gallery.images.length > 0;

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
        <PageViewActionContainer actionType={PROFILE_VIEWED} actionInfo={{ slug: community.id }} />
        <PageEventsContainer />
        <Header noBottomMargin={bannerNotification || partnerAgent} />
        {bannerNotification && (
          <StyledBannerNotification>
            {bannerNotification}
          </StyledBannerNotification>
        )}
        {!bannerNotification && partnerAgent && (
          <BannerNotificationAdContainer type="covid-19-community" />
        )}
        <CommunityDetailPageTemplate>
          <Wrapper>
            <BreadCrumb pad="large" items={getBreadCrumbsForCommunity({ name, propInfo, address })} />
            <TwoColumn>
              <Body>
                <Gallery>
                  <CommunityMediaGalleryContainer />
                </Gallery>
                <StyledCommunitySummary isAdmin={user && user.admin} />
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
                {(covidInfoDescription || covidInfoTitle) && (
                  <CovidWrapper>
                    <Heading size="subtitle" level="subtitle">
                      {covidInfoTitle}
                    </Heading>
                    <Paragraph>
                      {covidInfoDescription}
                    </Paragraph>
                    <CTAWrapper>
                      <CTAButton type="covid-banner">Take a Virtual Tour</CTAButton>
                      <CTABlock>or call our team at <Link href="tel:+18558664515">(855) 866-4515</Link></CTABlock>
                    </CTAWrapper>
                  </CovidWrapper>
                )}
                {communityInsights &&
                  communityInsights.length > 0 && (
                    <StyledHeadingBoxSection heading={`Community Insights at ${name}`}>
                      {communityInsights.map(item => (
                        <IconItemWrapper key={item}>
                          <IconItem
                            icon="check"
                            iconPalette="secondary"
                            iconVariation="darker-30"
                            borderless={false}
                          >
                            {item}
                          </IconItem>
                        </IconItemWrapper>
                      ))}
                    </StyledHeadingBoxSection>
                  )}
                {!communityInsights &&
                  autoHighlights && (
                    <StyledHeadingBoxSection heading={`Community Highlights at ${name}`}>
                      {autoHighlights.map(item => (
                        <IconItemWrapper key={item}>
                          <IconItem
                            icon="check"
                            iconPalette="secondary"
                            iconVariation="darker-30"
                            borderless={false}
                          >
                            {item}
                          </IconItem>
                        </IconItemWrapper>
                      ))}
                    </StyledHeadingBoxSection>
                  )}
                {showSimilarEarlier && (
                  <StyledHeadingBoxSection
                    heading={`Similar ${typeOfCare} Communities`}
                    id="sticky-sidebar-boundary"
                  >
                    <TrackedSimilarCommunitiesContainer
                      communities={similarProperties}
                      communityStyle={similarCommunityStyle}
                    />
                    <BackToSearch>
                      <Button
                        href={getCitySearchUrl({ propInfo, address })}
                        event={{ action: 'click', category: 'backToSearch', label: community.id }}
                        ghost
                      >
                        Communities In {address.city}
                      </Button>
                    </BackToSearch>
                  </StyledHeadingBoxSection>
                )}
                <StyledHeadingBoxSection
                  heading={`${pricingTitle} at ${name}`}
                  id="pricing-and-floor-plans"
                >
                  {hasCCRC && (
                    <>
                      <Paragraph>
                        Pricing for {name} may include both a one time buy-in
                        fee and a monthly component. Connect directly with{' '}
                        {name} to find out your pricing.
                      </Paragraph>
                      <GetCustomPricingButtonContainer hasAlreadyRequestedPricing={isAlreadyPricingRequested} locTrack="ccrc-pricing-table">
                      Get Detailed Pricing
                      </GetCustomPricingButtonContainer>
                    </>
                  )}
                  {!hasCCRC && hasSNF && (
                    <>
                      <Paragraph>
                        90% of Skilled Nursing Facilities in the United States are Medicare-certified. Some also accept Medicaid. To learn about pricing at {name}, click the button below.
                      </Paragraph>
                      <GetCustomPricingButtonContainer hasAlreadyRequestedPricing={isAlreadyPricingRequested} locTrack="snf-pricing-table">
                        Get Pricing
                      </GetCustomPricingButtonContainer>
                    </>
                  )}
                  {!hasCCRC && !hasSNF && (
                    <CommunityPricingTable
                      name={name}
                      pricesList={pricesList}
                      estimatedPriceList={estimatedPriceList}
                      price={estimatedPriceBase}
                      GetPricingButton={props => (
                        <GetCustomPricingButtonContainer
                          hasAlreadyRequestedPricing={isAlreadyPricingRequested}
                          locTrack="pricing-table"
                          {...props}
                        />
                      )}
                      size={communitySize}
                      showToolTip={address.state === 'TN'}
                      community={community}
                    />
                  )}
                </StyledHeadingBoxSection>
                {/* TODO: ENABLE AFTER FIGURING OUT HYDRATION*/}
                <AdWrapper>
                  <CommunityProfileAdTileContainer type="homeCare" community={community} />
                </AdWrapper>
                <StyledHeadingBoxSection
                  heading={`Get Availability at ${name}`}
                  id="availability"
                >
                  <GetCurrentAvailabilityContainer hasAlreadyRequestedPricing={isAlreadyPricingRequested} />
                </StyledHeadingBoxSection>
                {plusCommunity && <PlusBranding />}
                {(communityDescription || rgsAux.communityDescription ||
                  staffDescription || residentDescription || ownerExperience) && (
                  <StyledHeadingBoxSection heading={`Details on ${name}`}>
                    <CommunityDetails
                      id={community.id}
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
                  </StyledHeadingBoxSection>
                )}
                <StyledHeadingBoxSection heading={`How Seniorly Works in ${address.city}, ${address.state}`} hasNoBodyPadding>
                  <HowSlyWorksVideoContainer eventLabel={community.id} />
                </StyledHeadingBoxSection>
                {partnerAgent && (
                  <StyledHeadingBoxSection heading={`Your Local Senior Living Expert for ${name}`}>
                    <CommunityAgentSectionContainer agent={partnerAgent} />
                    <StyledAskAgentButton type="services">Ask a Question</StyledAskAgentButton>
                  </StyledHeadingBoxSection>
                )}
                {rgsAux.rgsInfo && rgsAux.rgsInfo.resourceLinks && rgsAux.rgsInfo.resourceLinks.length > 0 && (
                  <StyledHeadingBoxSection
                    heading={`Helpful ${typeOfCare} Resources`}
                  >
                    {rgsAux.rgsInfo.resourceLinks.map(item => (
                      <StyledIconButton to={item.to}
                                        icon="chevron"
                                        right
                                        fullWidth
                                        ghost
                                        transparent
                                        borderPalette="slate"
                                        rotate={-1}
                      >{item.title}
                      </StyledIconButton>)
                    )}

                    <StyledHr />
                    <TextBlock size="body">Didn't find what you are looking for? Our Senior Living Experts can help.</TextBlock>
                    <CTAWrapper>
                      <CTAButton type="resources">Ask a Question</CTAButton>
                      <CTABlock>or call our team at <Link href="tel:+18558664515">(855) 866-4515</Link></CTABlock>
                    </CTAWrapper>


                  </StyledHeadingBoxSection>
                )}
                {careServices &&
                  careServices.length > 0 && (
                    <StyledHeadingBoxSection heading={`Care Services at ${name}`}>
                      <CommunityCareService careServices={careServices} />
                      <StyledAskAgentButton type="services">Ask About Care Services</StyledAskAgentButton>
                    </StyledHeadingBoxSection>
                  )}
                <StyledHeadingBoxSection heading={`Amenities at ${name}`}>
                  <CommunityAmenities community={community} />
                  <StyledAskAgentButton type="amenities">Ask About Amenities</StyledAskAgentButton>
                </StyledHeadingBoxSection>
                {sortedEstimatedPrice.length > 0 && (
                  <StyledHeadingBoxSection heading={`Compare Costs to Nearby ${typeOfCare} Communities`}>
                    <CommunityPricingComparison community={community} />
                  </StyledHeadingBoxSection>
                )}
                <StyledHeadingBoxSection
                  heading={`Reviews at ${name}`}
                  id="reviews"
                >
                  <CommunityReviewsContainer />
                  <StyledLeaveReviewButton>Write a Review</StyledLeaveReviewButton>
                </StyledHeadingBoxSection>

                <StyledHeadingBoxSection heading={`Questions About ${name}`}>
                  <CommunityQuestionAnswersContainer />
                </StyledHeadingBoxSection>
                {plusCommunity && eventsLink && sampleEvents &&
                <StyledHeadingBoxSection heading={`Events at ${name}`}>
                  <EventsWrapper>
                    {sampleEvents.map(item => (
                      <IconItemWrapper key={item}>
                        <IconItem icon="check" iconPalette="secondary" iconVariation="darker-30" borderless={false}>{item}</IconItem>
                      </IconItemWrapper>))
                    }
                  </EventsWrapper>
                  {/* todo: fix this */}
                  <StyledButton href={eventsLink} onClick={clickEventHandler('events', name)} target="_blank" ghost>Download Events Calendar</StyledButton>
                </StyledHeadingBoxSection>
                }

                {plusCommunity && menuLink &&
                <StyledHeadingBoxSection heading={`Sample Menu at ${name}`}>
                  <SampleMenu
                    sampleAppetizers={sampleAppetizers}
                    sampleMain={sampleMain}
                    sampleSide={sampleSide}
                    sampleDessert={sampleDessert}
                  />
                  {/* todo: fix this */}
                  <StyledButton href={menuLink} onClick={clickEventHandler('menu', name)} target="_blank" ghost>Download Current Menu</StyledButton>
                </StyledHeadingBoxSection>
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
                  url={`/partners/communities?prop=${community.id}&sly_category=disclaimer&sly_action=cta_link&sly_label=claim`}
                  urlText="Simply claim your profile by clicking here"
                />
                {!showSimilarEarlier && (
                  <StyledHeadingBoxSection
                    heading={`Similar ${typeOfCare} Communities`}
                    id="sticky-sidebar-boundary"
                    extraBottomMargin
                  >
                    <TrackedSimilarCommunitiesContainer
                      communities={similarProperties}
                      communityStyle={similarCommunityStyle}
                    />
                    <BackToSearch>
                      <Button
                        href={getCitySearchUrl({ propInfo, address })}
                        event={{ action: 'click', category: 'backToSearch', label: community.id }}
                        ghost
                      >
                        Communities In {address.city}
                      </Button>
                    </BackToSearch>
                  </StyledHeadingBoxSection>
                )}

                <CommunityStickyFooter isAlreadyPricingRequested={isAlreadyPricingRequested} locTrack="sticky-footer"/>
              </Body>
              <Column>
                <StickToTop>
                  <CommunityDetailsPageColumnContainer community={community} />
                </StickToTop>
              </Column>
            </TwoColumn>
            {showMoreImages && (
              <StyledSection
                title={`More Photos of ${name}`}
                titleSize="subtitle"
              >
                <CommunityMorePicturesContainer />
              </StyledSection>
            )}
            <Section title={`Map View of ${name}`} titleSize="subtitle" />
          </Wrapper>
          <StyledSection>
            <LazyCommunityMap id="map" />
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
        </CommunityDetailPageTemplate>
        <Footer />
      </>
    );
  }
}

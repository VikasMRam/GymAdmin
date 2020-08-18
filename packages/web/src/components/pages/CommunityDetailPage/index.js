import React, { Component } from 'react';
import styled from 'styled-components';
import { object } from 'prop-types';
import { ifProp } from 'styled-tools';

import { size, palette } from 'sly/common/components/themes';
import { PROFILE_VIEWED } from 'sly/web/services/api/constants';
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
import { getIsActiveAdult } from 'sly/web/services/helpers/community';
import { Box, Button, Hr, Block, Heading } from 'sly/common/components/atoms';
import { Paragraph, Link } from 'sly/web/components/atoms';
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
import CommunityDisclaimerSection from 'sly/web/components/molecules/CommunityDisclaimerSection';
import IconItem from 'sly/web/components/molecules/IconItem';
import IconButton from 'sly/common/components/molecules/IconButton';
import UnhydratedGetCurrentAvailabilityContainer from 'sly/web/containers/GetCurrentAvailabilityContainer';
import UnhydratedHowSlyWorksVideoContainer from 'sly/web/containers/HowSlyWorksVideoContainer';
import BannerNotification from 'sly/web/components/molecules/BannerNotification';
import UnhydratedAskAgentQuestionButtonContainer from 'sly/web/containers/AskAgentQuestionButtonContainer';
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
import HeadingBoxSection from 'sly/web/components/molecules/HeadingBoxSection';
import UnhydratedPageEventsContainer from 'sly/web/containers/PageEventsContainer';
import UnhydratedCommunityDetailsPageColumnContainer from 'sly/web/containers/CommunityDetailsPageColumnContainer';
import UnhydratedCommunityProfileAdTileContainer from 'sly/web/containers/communityProfile/AdTileContainer';
import UnhydratedBannerNotificationAdContainer from 'sly/web/containers/BannerNotificationAdContainer';
import UnhydratedGetAssessmentBoxContainerHydrator from 'sly/web/components/pages/CommunityDetailPage/GetAssessmentBoxContainerHydrator';
import UnhydratedCommunityPricingTable from 'sly/web/components/organisms/CommunityPricingTable';

const PageViewActionContainer = withHydration(UnhydratedPageViewActionContainer, { alwaysHydrate: true });
const PageEventsContainer = withHydration(UnhydratedPageEventsContainer, { alwaysHydrate: true });
const CommunityMediaGalleryContainer = withHydration(UnhydratedCommunityMediaGalleryContainer);
const CommunitySummaryContainer = withHydration(UnhydratedCommunitySummaryContainer);
const OfferNotification = withHydration(UnhydratedOfferNotification);
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
const CommunityPricingTable = withHydration(UnhydratedCommunityPricingTable, { alwaysHydrate: true });
const GetAssessmentBoxContainerHydrator = withHydration(UnhydratedGetAssessmentBoxContainerHydrator, { alwaysHydrate: true });

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
  background-color: ${palette('primary', 'filler')};
  border-radius: ${size('spacing.small')};
  border-top: 4px solid ${palette('primary', 'base')};
  margin-bottom: ${size('spacing.xLarge')};
  text-align: center;
`;

const AdWrapper = styled.div`
  margin-bottom: ${size('spacing.xLarge')};
`;

const PaddedGetAssessmentBoxContainerHydrator = pad(GetAssessmentBoxContainerHydrator);

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
      user: communityUser,
    } = community;

    const {
      careServices,
      promoDescription,
      promoTitle,
      covidInfoDescription,
      covidInfoTitle,
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
    const isActiveAdult = getIsActiveAdult(community);

    // TODO: mock as USA until country becomes available
    address.country = 'USA';

    const bannerNotification = makeBanner(profileContacted);
    // FIXME: @fonz cleaning this up
    const isAlreadyPricingRequested = profileContacted.pricing;
    let isClaimed = false;
    if (communityUser && communityUser.email && !communityUser.email.match(/@seniorly.com/)) {
      isClaimed = true;
    }

    const { sortedEstimatedPrice } = calculatePricing(community, rgsAux.estimatedPrice);

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
        <Header noBottomMargin={!isActiveAdult && (bannerNotification || partnerAgent)} />
        {bannerNotification && (
          <StyledBannerNotification>
            {bannerNotification}
          </StyledBannerNotification>
        )}
        {!bannerNotification && !isActiveAdult && partnerAgent && (
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
                            iconPalette="primary"
                            iconVariation="base"
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
                {!isActiveAdult &&
                <StyledHeadingBoxSection
                  heading={`${pricingTitle} at ${name}`}
                  id="pricing-and-floor-plans"
                >
                  <GetAssessmentBoxContainerHydrator
                    startLink={`/wizards/assessment/community/${community.id}`}
                    community={community}
                    layout="pricing-table"
                    extraProps={{
                      pricesList,
                      estimatedPriceList,
                    }}
                  />
                </StyledHeadingBoxSection>
                }
                {!isActiveAdult && sortedEstimatedPrice.length > 0 && (
                  <StyledHeadingBoxSection heading={`Compare Costs for ${name}`}>
                    <CommunityPricingComparison community={community} />
                  </StyledHeadingBoxSection>
                )}

                {/* Disable home care AD and availability only */}
                {/*<AdWrapper>*/}
                  {/*<CommunityProfileAdTileContainer type="getOffer" community={community} />*/}
                {/*</AdWrapper>*/}
                {!isActiveAdult &&
                  <StyledHeadingBoxSection
                    heading={`Get Availability at ${name}`}
                    id="availability"
                  >
                    <GetCurrentAvailabilityContainer hasAlreadyRequestedPricing={isAlreadyPricingRequested} />
                  </StyledHeadingBoxSection>
                }

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
                      communityUser={community.user}
                      licensingInfo={rgsAux.stateLicensingWebsite}
                    />
                  </StyledHeadingBoxSection>
                )}
                {!isActiveAdult &&
                  <StyledHeadingBoxSection heading={`How Seniorly Works in ${address.city}, ${address.state}`} hasNoBodyPadding>
                    <HowSlyWorksVideoContainer eventLabel={community.id} />
                  </StyledHeadingBoxSection>
                }

                {partnerAgent && !isActiveAdult && (
                  <StyledHeadingBoxSection heading={`Your Local Senior Living Expert for ${name}`}>
                    <CommunityAgentSectionContainer agent={partnerAgent} />
                    <StyledAskAgentButton community={community} type="services" ctaText={'Ask a Question'} />
                  </StyledHeadingBoxSection>
                )}
                {!isActiveAdult &&
                <PaddedGetAssessmentBoxContainerHydrator
                  startLink={`/wizards/assessment/community/${community.id}?skipIntro=true`}
                  community={community}
                />
                }
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

                    <Hr marginTop="regular" />
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
                      {!isActiveAdult && <StyledAskAgentButton community={community} type="services" ctaText={'Ask' +
                      ' About Care Services'} />}
                    </StyledHeadingBoxSection>
                  )}
                <StyledHeadingBoxSection heading={`Amenities at ${name}`}>
                  <CommunityAmenities community={community} />
                  {!isActiveAdult && <StyledAskAgentButton community={community} type="amenities" ctaText={'Ask' +
                  ' About Amenities'} />}

                </StyledHeadingBoxSection>

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
                        <IconItem icon="check" iconPalette="primary" iconVariation="base" borderless={false}>{item}</IconItem>
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
                <CommunityDisclaimerSection
                  title="Disclaimer"
                  phone={ (twilioNumber && twilioNumber.numbers && twilioNumber.numbers.length) ? twilioNumber.numbers[0] : '8558664515' }
                  isClaimed={isClaimed}
                  id={community.id}
                  city={address.city}
                  name={name}
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
                <GetAssessmentBoxContainerHydrator
                  startLink={`/wizards/assessment/community/${community.id}`}
                  community={community}
                  layout="footer"
                />
                {/*{isActiveAdult &&*/}
                {/*<CommunityStickyFooter*/}
                  {/*community={community}*/}
                  {/*locTrack="sticky-footer"*/}
                  {/*isActiveAdult={true}*/}
                {/*/>*/}
                {/*}*/}
              </Body>
              <Column>
                <StickToTop>

                  <GetAssessmentBoxContainerHydrator
                    startLink={`/wizards/assessment/community/${community.id}`}
                    community={community}
                    layout="sidebar"
                  />

                  {/*{isActiveAdult &&*/}
                  {/*<Box>*/}
                    {/*<Heading level="title" size="subtitle">Is selling your home part of your senior living plan?</Heading>*/}
                    {/*We can connect you with the top selling agents.*/}
                    {/*<StyledAskAgentButton ackCTA community={community} type="aa-sidebar" ctaText={"Request Info"} />*/}
                  {/*</Box>*/}
                  {/*}*/}

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

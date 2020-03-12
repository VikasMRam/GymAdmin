import React, { Component } from 'react';
import styled from 'styled-components';
import { object } from 'prop-types';
import { ifProp } from 'styled-tools';

import { size, palette } from 'sly/components/themes';
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
import { withHydration } from 'sly/services/partialHydration';
import { Button, Paragraph, Hr, Block, Link } from 'sly/components/atoms';
import SeoLinks from 'sly/components/organisms/SeoLinks';
import SampleMenu from 'sly/components/organisms/SampleMenu';
import {
  CommunityDetailPageTemplate,
  makeBody,
  makeColumn,
  makeFooter,
  makeGallery,
  makeHeader,
  makeTwoColumn,
  makeWrapper,
} from 'sly/components/templates/CommunityDetailPageTemplate';
import UnhydratedCommunityStickyFooter from 'sly/components/organisms/CommunityStickyFooter';
import Section from 'sly/components/molecules/Section';
import CommunityDetails from 'sly/components/organisms/CommunityDetails';
import CommunityPricingComparison from 'sly/components/organisms/CommunityPricingComparison';
import CommunityAmenities from 'sly/components/organisms/CommunityAmenities';
import UnhydratedLazyCommunityMap from 'sly/containers/LazyCommunityMapContainer';
import UnhydratedCommunityMediaGalleryContainer from 'sly/containers/CommunityMediaGalleryContainer';
import BreadCrumb from 'sly/components/molecules/BreadCrumb';
import UnhydratedOfferNotification from 'sly/components/molecules/OfferNotification';
import CommunityCareService from 'sly/components/organisms/CommunityCareService';
import CommunityExtraInfoSection from 'sly/components/molecules/CommunityExtraInfoSection';
import IconItem from 'sly/components/molecules/IconItem';
import IconButton from 'sly/components/molecules/IconButton';
import UnhydratedGetCurrentAvailabilityContainer from 'sly/containers/GetCurrentAvailabilityContainer';
import UnhydratedHowSlyWorksVideoContainer from 'sly/containers/HowSlyWorksVideoContainer';
import BannerNotification from 'sly/components/molecules/BannerNotification';
import CommunityPricingTable from 'sly/components/organisms/CommunityPricingTable';
import UnhydratedAskAgentQuestionButtonContainer from 'sly/containers/AskAgentQuestionButtonContainer';
import UnhydratedGetCustomPricingButtonContainer from 'sly/containers/GetCustomPricingButtonContainer';
import PlusBranding from 'sly/components/organisms/PlusBranding';
import CollapsibleBlock from 'sly/components/molecules/CollapsibleBlock';
import { clickEventHandler } from 'sly/services/helpers/eventHandlers';
import UnhydratedCommunitySummaryContainer from 'sly/containers/CommunitySummaryContainer';
import UnhydratedCommunityAgentSectionContainer from 'sly/containers/CommunityAgentSectionContainer';
import UnhydratedCommunityQuestionAnswersContainer from 'sly/containers/CommunityQuestionAnswersContainer';
import UnhydratedCommunityReviewsContainer from 'sly/containers/CommunityReviewsContainer';
import UnhydratedCommunityAddReviewButtonContainer from 'sly/containers/CommunityAddReviewButtonContainer';
import UnhydratedCommunityMorePicturesContainer from 'sly/containers/CommunityMorePicturesContainer';
import UnhydratedTrackedSimilarCommunitiesContainer from 'sly/containers/TrackedSimilarCommunitiesContainer';
import UnhydratedPageViewActionContainer from 'sly/containers/PageViewActionContainer';
import { PROFILE_VIEWED } from 'sly/services/newApi/constants';
import HeadingBoxSection from 'sly/components/molecules/HeadingBoxSection';
import UnhydratedPageEventsContainer from 'sly/containers/PageEventsContainer';
import UnhydratedCommunityDetailsPageColumnContainer from 'sly/containers/CommunityDetailsPageColumnContainer';

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
  )} request. Your Seniorly Partner Agent is checking with this community and will get back to you shortly.`;
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
    const hasCCRC = typeCares.includes(
      'Continuing Care Retirement Community(CCRC)',
    );

    const hasSNF = typeCares.includes(
      'Skilled Nursing Facility'
    );

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
        <Header noBottomMargin={!!bannerNotification} />
        {bannerNotification && (
          <StyledBannerNotification>
            {bannerNotification}
          </StyledBannerNotification>
        )}
        {!bannerNotification && (
          <StyledBannerNotification palette="warning">
            <Link href="https://www.seniorly.com/resources/articles/coronavirus-and-seniors-a-message-from-our-ceo-co-founder-arthur-bretschneider" _target="blank">
              Coronavirus & Seniors: A Message from Arthur Bretschneider, CEO & Co-founder: Click Here.
            </Link>
          </StyledBannerNotification>
        )}
        <CommunityDetailPageTemplate>
          <Wrapper>
            <BreadCrumb
              items={getBreadCrumbsForCommunity({ name, propInfo, address })}
            />
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
                {communityInsights &&
                  communityInsights.length > 0 && (
                    <StyledHeadingBoxSection heading={`Community Insights at ${name}`}>
                      {communityInsights.map(item => (
                        <IconItemWrapper key={item}>
                          <IconItem
                            icon="check"
                            iconPalette="secondary"
                            iconVariation="dark35"
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
                            iconVariation="dark35"
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

                <StyledHeadingBoxSection
                  heading={`Get Availability at ${name}`}
                  id="availability"
                >
                  <GetCurrentAvailabilityContainer hasAlreadyRequestedPricing={isAlreadyPricingRequested} />
                </StyledHeadingBoxSection>
                {plusCommunity && <PlusBranding />}
                {(communityDescription || rgsAux.communityDescription) && (
                  <StyledHeadingBoxSection heading={`Details on ${name}`}>
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
                  </StyledHeadingBoxSection>
                )}
                <StyledHeadingBoxSection heading={`How Seniorly Works in ${address.city}, ${address.state}`} hasNoBodyPadding>
                  <HowSlyWorksVideoContainer eventLabel={community.id} />
                </StyledHeadingBoxSection>
                {partnerAgent && (
                  <StyledHeadingBoxSection heading={`Your Seniorly Partner Agent for ${name}`}>
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
                        <IconItem icon="check" iconPalette="secondary" iconVariation="dark35" borderless={false}>{item}</IconItem>
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
                  url="/providers/housing"
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
            <LazyCommunityMap />
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

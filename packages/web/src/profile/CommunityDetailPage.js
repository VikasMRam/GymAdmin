import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { object } from 'prop-types';
import { ifProp } from 'styled-tools';
import loadable from '@loadable/component';

import { withHydration } from 'sly/web/services/partialHydration';
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
  buildNewPriceList,
} from 'sly/web/services/helpers/pricing';
import pad from 'sly/web/components/helpers/pad';
import { getIsActiveAdult, getPartnerAgent } from 'sly/web/services/helpers/community';
import { getAgentFirstName } from 'sly/web/services/helpers/agents';
import { Button, Block, Heading, Hr, Link } from 'sly/common/components/atoms';
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
import Section from 'sly/web/components/molecules/Section';
import CommunityAbout from 'sly/web/components/organisms/CommunityAbout';
import CommunityDetails from 'sly/web/components/organisms/CommunityDetails';
import BreadCrumb from 'sly/web/components/molecules/BreadCrumb';
import CommunityDisclaimerSection from 'sly/web/components/molecules/CommunityDisclaimerSection';
import IconItem from 'sly/web/components/molecules/IconItem';
import PlusBranding from 'sly/web/components/organisms/PlusBranding';
import CollapsibleBlock from 'sly/web/components/molecules/CollapsibleBlock';
import { clickEventHandler } from 'sly/web/services/helpers/eventHandlers';
import HeadingBoxSection from 'sly/web/components/molecules/HeadingBoxSection';
import ModalContainer from 'sly/web/containers/ModalContainer';

const PageViewActionContainer = loadable(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "chunkPageView" */ 'sly/web/containers/PageViewActionContainer'));
const CommunityMediaGalleryContainer = loadable(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "chunkCommunityMediaGallery" */ 'sly/web/containers/CommunityMediaGalleryContainer'));
const CommunitySummaryContainer = loadable(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "chunkCommunitySummary" */ 'sly/web/containers/CommunitySummaryContainer'));
const GetAssessmentBoxContainerHydrator = loadable(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "chunkGetAssessmentBox" */ 'sly/web/profile/GetAssessmentBoxContainerHydrator'));


const CommunityAgentSection = withHydration(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "chunkCommunityAgentSection" */ 'sly/web/components/molecules/CommunityAgentSection'));
const OfferNotificationContainer = withHydration(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "chunkOfferNotification" */ 'sly/web/profile/OfferNotification/OfferNotificationContainer'));
const TrackedSimilarCommunitiesContainer = withHydration(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "chunkTrackedSimilarCommunities" */ 'sly/web/containers/TrackedSimilarCommunitiesContainer'));
const HowSlyWorksVideoContainer = withHydration(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "chunkHowSlyWorksVideo" */ 'sly/web/containers/HowSlyWorksVideoContainer'));
const CommunityReviewsContainer = withHydration(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "chunkCommunityReviews" */ 'sly/web/containers/CommunityReviewsContainer'));
const CommunityQuestionAnswersContainer = withHydration(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "chunkCommunityQuestionAnswers" */ 'sly/web/containers/CommunityQuestionAnswersContainer'));
const AskAgentQuestionButtonContainer = withHydration(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "chunkAskAgentQuestionButton" */ 'sly/web/containers/AskAgentQuestionButtonContainer'));
const CommunityMorePicturesContainer = withHydration(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "chunkCommunityCommunityMorePictures" */ 'sly/web/containers/CommunityMorePicturesContainer'));

const TrustScoreTile = withHydration(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "chunkTrustScore" */ 'sly/web/containers/communityProfile/TrustScoreContainer'));
const Chatbox = withHydration(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "chunkChatbox" */ 'sly/web/profile/Chatbox'), { alwaysHydrate: true });
const LazyCommunityMap = withHydration(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "chunkLazyCommunityMap" */ 'sly/web/containers/LazyCommunityMapContainer'));


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

const StyledOfferNotification = styled(OfferNotificationContainer)`
  margin-bottom: ${size('spacing.xLarge')};
`;

const StyledHeadingBoxSection = styled(HeadingBoxSection).attrs({ hasNoHr: true })`
  margin-bottom: ${ifProp('extraBottomMargin', size('spacing.xxxLarge'), size('spacing.xLarge'))};
`;

const StyledSection = styled(Section)`
  margin-bottom: ${size('spacing.xxxLarge')}!important;
`;

const StyledButton = styled(Button)`
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

const StickToTop = styled.div`
  position: sticky;
  top: 24px;
`;

const PaddedGetAssessmentBoxContainerHydrator = pad(GetAssessmentBoxContainerHydrator);

const Header = makeHeader();
const TwoColumn = makeTwoColumn('div');
const Body = makeBody('div');
const Column = makeColumn('aside');
const Footer = makeFooter('footer');
const Wrapper = makeWrapper('div');
const Gallery = makeGallery('div');

const getAssessmentBoxModes = {
  pricingTable: { cta: 'pricing', entry: 'pricingTable' },
  profileSection: { cta: 'generalOptions', entry: 'profileSection' },
  communityFooter: { cta: 'pricing', entry: 'communityFooter' },
  communitySidebar: { cta: 'pricing', entry: 'communitySidebar' },
};

export default class CommunityDetailPage extends PureComponent {
  static propTypes = {
    community: object.isRequired,
    location: object.isRequired,
  };

  render() {
    const {
      community,
      location,
    } = this.props;

    const {
      name,
      propInfo = {},
      address,
      rgsAux,
      floorPlans,
      similarProperties,
      gallery = {},
      twilioNumber,
      guideUrl,
      user: communityUser,
      reviews,
    } = community;

    const {
      promoDescription,
      promoTitle,
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
    } = (propInfo || {});

    const typeOfCare = typeCares?.[0];
    const isActiveAdult = getIsActiveAdult(community);

    if (!address.country || address.country === '') {
      address.country = 'United States';
    }

    const isInternational = address.country !== 'United States';

    let isClaimed = false;
    if (communityUser && communityUser.email && !communityUser.email.match(/@seniorly.com/)) {
      isClaimed = true;
    }

    const { sortedEstimatedPrice } = calculatePricing(community, rgsAux.estimatedPrice);

    const partnerAgent = getPartnerAgent(community);
    const { nearbyCities } = rgsAux;

    const showMoreImages = gallery.images && gallery.images.length > 0;

    const newPricesList = buildNewPriceList(community);
    const pricesList = buildPriceList(community);
    const estimatedPriceList = buildEstimatedPriceList(community);
    const pricingTitle =
      pricesList.length === 0 && floorPlans.length > 0
        ? 'Pricing and Floor Plans'
        : 'Pricing';

    const similarCommunityStyle = {
      layout: 'column',
      imageSize: 'regular',
      showDescription: true,
    };

    return (
      <>
        {!isInternational && <Chatbox community={community} /> }
        {getHelmetForCommunityPage(community, location)}
        <ModalContainer />
        <PageViewActionContainer actionType={PROFILE_VIEWED} actionInfo={{ slug: community.id }} />
        <Block pad="large">
          <Header noBottomMargin />
        </Block>
        <CommunityDetailPageTemplate>
          <Wrapper>
            <BreadCrumb pad="m" items={getBreadCrumbsForCommunity({ name, propInfo, address })} />
            <TwoColumn>
              <Body>
                <Gallery>
                  <CommunityMediaGalleryContainer />
                </Gallery>
                <StyledCommunitySummary />
                {(promoDescription || promoTitle) && (
                  <StyledOfferNotification
                    palette="warning"
                    title={promoTitle}
                    description={promoDescription}
                    community={community}
                  />
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
                            borderless
                          >
                            {item}
                          </IconItem>
                        </IconItemWrapper>
                      ))}
                    </StyledHeadingBoxSection>
                  )}

                {!isActiveAdult && !isInternational &&
                <StyledHeadingBoxSection
                  heading={`${pricingTitle} at ${name}`}
                  id="pricing-and-floor-plans"
                >
                  <GetAssessmentBoxContainerHydrator
                    startLink={`/wizards/assessment/community/${community.id}`}
                    community={community}
                    layout="pricing-table"
                    mode={getAssessmentBoxModes.pricingTable}
                    extraProps={{
                      pricesList,
                      estimatedPriceList,
                      newPricesList,
                    }}
                  />
                </StyledHeadingBoxSection>
                }
                {partnerAgent && (
                  <StyledHeadingBoxSection heading={`Your Seniorly Local Advisor in ${address.city}, ${address.state}`}>
                    <CommunityAgentSection agent={partnerAgent} pad="xLarge" />
                    <AskAgentQuestionButtonContainer
                      agent={partnerAgent}
                      width="100%"
                      community={community}
                      type="expert"
                      ctaText={`Talk to ${getAgentFirstName(partnerAgent)} about your options`}
                    />
                  </StyledHeadingBoxSection>
                )}

                {plusCommunity && <PlusBranding />}
                {(communityDescription || rgsAux.communityDescription ||
                  staffDescription || residentDescription || ownerExperience) && (
                    <StyledHeadingBoxSection heading={`About ${name}`}>
                      <CommunityAbout
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
                        isActiveAdult={isActiveAdult}
                        isInternational={isInternational}
                        pad="large"
                      />
                      <Hr />
                      <Heading pad="large" level="subtitle" size="body">
                        Have a question about this community?
                      </Heading>
                      <AskAgentQuestionButtonContainer
                        ghost
                        width="100%"
                        community={community}
                        type="profile-content-question"
                        ctaText="Ask a Question"
                      />
                    </StyledHeadingBoxSection>
                )}
                {rgsAux && rgsAux.rgsInfo &&  rgsAux.rgsInfo.trustScore > 0 &&
                <StyledHeadingBoxSection heading={`Seniorly Trust Score for ${community.name}`}>
                  <TrustScoreTile community={community} />
                </StyledHeadingBoxSection>
                }
                <StyledHeadingBoxSection heading="Services and Amenities">
                  <CommunityDetails community={community} />
                </StyledHeadingBoxSection>
                {!isActiveAdult && !isInternational &&
                  <StyledHeadingBoxSection heading={`How Seniorly Works in ${address.city}, ${address.state}`} hasNoBodyPadding>
                    <HowSlyWorksVideoContainer eventLabel={community.id} />
                  </StyledHeadingBoxSection>
                }
                {!isActiveAdult && !isInternational &&
                <PaddedGetAssessmentBoxContainerHydrator
                  startLink={`/wizards/assessment/community/${community.id}?skipIntro=true`}
                  community={community}
                  mode={getAssessmentBoxModes.profileSection}
                />
                }
                {rgsAux.rgsInfo && rgsAux.rgsInfo.resourceLinks && rgsAux.rgsInfo.resourceLinks.length > 0 && (
                  <StyledHeadingBoxSection
                    heading={`Helpful ${typeOfCare} Resources`}
                  >
                    {rgsAux.rgsInfo.resourceLinks.map((item, i) => (
                      <>
                        <Link
                          to={item.to}
                          palette="primary"
                          event={{
                            category: 'community-resource-link',
                            action: 'link-click',
                            label: item.to,
                          }}
                        >
                          {item.title}
                        </Link>
                        {i !== rgsAux.rgsInfo.resourceLinks.length - 1 && <Hr />}
                      </>
                    ))}
                  </StyledHeadingBoxSection>
                )}

                {reviews && reviews.length > 0 &&
                  <StyledHeadingBoxSection
                    heading={`Reviews at ${name}`}
                    id="reviews"
                  >
                    <CommunityReviewsContainer />
                  </StyledHeadingBoxSection>
                }

                <CommunityQuestionAnswersContainer />

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
                  phone={twilioNumber?.numbers?.[0] || '8558664515'}
                  isClaimed={isClaimed}
                  id={community.id}
                  city={address.city}
                  name={name}
                  agent={partnerAgent}
                />
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
                {!isInternational &&
                  <GetAssessmentBoxContainerHydrator
                    startLink={`/wizards/assessment/community/${community.id}`}
                    community={community}
                    mode={getAssessmentBoxModes.communityFooter}
                    layout="footer"
                  />
                }

              </Body>
              <Column>
                <StickToTop>
                  {!isInternational &&
                  <GetAssessmentBoxContainerHydrator
                    startLink={`/wizards/assessment/community/${community.id}`}
                    community={community}
                    mode={getAssessmentBoxModes.communitySidebar}
                    layout="sidebar"
                  />
                  }
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

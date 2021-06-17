import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { object } from 'prop-types';
import { ifProp } from 'styled-tools';
import loadable from '@loadable/component';

import { withHydration } from 'sly/web/services/partialHydration';
import { size } from 'sly/common/components/themes';
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
import { Button, Link } from 'sly/common/components/atoms';
import { color, space, sx$tablet, sx$laptop, Hr, Block, font } from 'sly/common/system';
import SeoLinks from 'sly/web/components/organisms/SeoLinks';
import SampleMenu from 'sly/web/components/organisms/SampleMenu';
import {
  CommunityDetailPageTemplate,
  makeBody,
  makeColumn,
  makeFooter,
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
import StickyHeader from 'sly/web/profile/StickyHeader';
import Chatbox from 'sly/web/profile/Chatbox';

const PageViewActionContainer = loadable(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "chunkPageView" */ 'sly/web/containers/PageViewActionContainer'));
const CommunityMediaGalleryContainer = loadable(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "chunkCommunityMediaGallery" */ 'sly/web/profile/CommunityMediaGallery/CommunityMediaGalleryContainer'));
const CommunitySummaryContainer = loadable(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "chunkCommunitySummary" */ 'sly/web/containers/CommunitySummaryContainer'));
const GetAssessmentBoxContainerHydrator = loadable(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "chunkGetAssessmentBox" */ 'sly/web/profile/GetAssessmentBoxContainerHydrator'));


const CommunityAgentSection = withHydration(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "chunkCommunityAgentSection" */ 'sly/web/components/molecules/CommunityAgentSection'));
const OfferNotificationContainer = withHydration(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "chunkOfferNotification" */ 'sly/web/profile/OfferNotification/OfferNotificationContainer'));
const TrackedSimilarCommunitiesContainer = withHydration(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "chunkTrackedSimilarCommunities" */ 'sly/web/containers/TrackedSimilarCommunitiesContainer'));
const HowSlyWorksVideoContainer = withHydration(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "chunkHowSlyWorksVideo" */ 'sly/web/containers/HowSlyWorksVideoContainer'));
const CommunityReviewsContainer = withHydration(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "chunkCommunityReviews" */ 'sly/web/containers/CommunityReviewsContainer'));
// const CommunityQuestionAnswersContainer = withHydration(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "chunkCommunityQuestionAnswers" */ 'sly/web/containers/CommunityQuestionAnswersContainer'));
const AskAgentQuestionButtonContainer = withHydration(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "chunkAskAgentQuestionButton" */ 'sly/web/containers/AskAgentQuestionButtonContainer'));
const CommunityMorePicturesContainer = withHydration(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "chunkCommunityCommunityMorePictures" */ 'sly/web/profile/CommunityMorePictures/CommunityMorePicturesContainer'));

const TrustScoreTile = withHydration(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "chunkTrustScore" */ 'sly/web/containers/communityProfile/TrustScoreContainer'));


const LazyCommunityMap = withHydration(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "chunkLazyCommunityMap" */ 'sly/web/containers/LazyCommunityMapContainer'));


const BackToSearch = styled.div`
  text-align: center;
`;

const StyledCommunitySummary = styled(CommunitySummaryContainer)`
  margin-bottom: ${space('s')};
  position: relative;
  background: ${color('white.base')};
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

const StyledHeadingBoxSection = styled(HeadingBoxSection).attrs({ hasNoHr: true })`
  margin-bottom:  ${space('s')};
  ${ifProp('hasNoBottomHr', sx$tablet({
    marginBottom: 'm',
    paddingBottom: 'm',
    paddingTop: '0',
  }), sx$tablet({
    marginBottom: '0',
    paddingBottom: '0',
    paddingTop: '0',
  }))}

  ${sx$laptop({
    paddingX: '0',
  })}
  font:${font('body-l')};
`;

const StyledSection = styled(Section)`
  padding:${space('l')} ${space('m')} ;
  margin-bottom:${space('s')};
  margin-left:auto;
  margin-right:auto;
  background:${color('white.base')};
  ${sx$tablet({
    paddingY: '0',
  })}
  font:${font('body-l')};
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
  top: 74px;
`;

const PaddedGetAssessmentBoxContainerHydrator = pad(GetAssessmentBoxContainerHydrator);

const Header = makeHeader();
const TwoColumn = makeTwoColumn('div');
const Body = makeBody('div');
const Column = makeColumn('aside');
const Footer = makeFooter('footer');
const Wrapper = makeWrapper('div');

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


    const {
      line1, line2, city, state, zip,
    } = address;
    const formattedAddress = `${line1}, ${line2}, ${city},
    ${state}
    ${zip}`
      .replace(/, null,/g, ',')
      .replace(/\s/g, ' ')
      .replace(/, ,/g, ', ');

    const newPricesList = buildNewPriceList(community);
    const pricesList = buildPriceList(community);
    const estimatedPriceList = buildEstimatedPriceList(community);
    const pricingTitle =
      pricesList.length === 0 && floorPlans.length > 0
        ? 'Pricing and Floor Plans'
        : 'Pricing';

    const similarCommunityStyle = {
      layout: 'row',
      imageSize: 'regular',
      showDescription: true,
    };


    const stickyHeaderSections = {
      photos: true,
      pricing: !isActiveAdult && !isInternational,
      advisor: !!partnerAgent,
      about: !!(communityDescription || rgsAux.communityDescription ||
        staffDescription || residentDescription || ownerExperience),
      amenities: true,
      reviews: reviews && reviews.length > 0,
    };


    return (
      <>
        {!isInternational && <Chatbox community={community} /> }
        {getHelmetForCommunityPage(community, location)}
        <ModalContainer />

        <PageViewActionContainer actionType={PROFILE_VIEWED} actionInfo={{ slug: community.id }} />
        <Block pad="m">
          <Header noBottomMargin />
        </Block>
        <Block mx="m" sx$tablet={{ width: 'col8', mx: 'l' }} sx$laptop={{ width: 'col12', mx: 'auto' }}>
          <BreadCrumb pad="m" background="white.base" items={getBreadCrumbsForCommunity({ name, propInfo, address })} />
        </Block>
        <Block id="gallery" mb="l" sx$laptop={{ width: 'col12', mx: 'auto' }}>
          <CommunityMediaGalleryContainer />
        </Block>
        <CommunityDetailPageTemplate>
          <StickyHeader sections={stickyHeaderSections} />
          <Wrapper>
            <TwoColumn>
              <Body>
                <StyledCommunitySummary formattedAddress={formattedAddress} />
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
                  {(promoDescription || promoTitle) && (
                    <OfferNotificationContainer
                      mt="s"
                      sx$laptop={{ display: 'none' }}
                      title={promoTitle}
                      description={promoDescription}
                      community={community}
                    />
                  )}
                </StyledHeadingBoxSection>
                }
                {partnerAgent && (
                  <>
                    <StyledHeadingBoxSection id="agent-section" heading="Have questions? Our Seniorly Local Advisors are ready to help you.">
                      <CommunityAgentSection agent={partnerAgent} pad="l" />
                      <AskAgentQuestionButtonContainer
                        agent={partnerAgent}
                        width="100%"
                        community={community}
                        type="expert"
                        ctaText={`Talk to ${getAgentFirstName(partnerAgent)} about your options`}
                      />
                    </StyledHeadingBoxSection>

                  </>
                )}

                {plusCommunity && <PlusBranding />}
                {(communityDescription || rgsAux.communityDescription ||
                  staffDescription || residentDescription || ownerExperience) && (
                  <StyledHeadingBoxSection id="community-about" heading={`About ${name}`}>
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
                      pad="m"
                    />
                    {/* <Hr />
                    <Heading pad="m" font="title-m">
                      Have a question about this community?
                    </Heading>
                    <AskAgentQuestionButtonContainer
                      ghost
                      width="100%"
                      community={community}
                      type="profile-content-question"
                      ctaText="Ask a Question"
                    /> */}
                  </StyledHeadingBoxSection>
                )}
                {rgsAux && rgsAux.rgsInfo &&  rgsAux.rgsInfo.trustScore > 0 &&
                <StyledHeadingBoxSection heading={`Seniorly Trust Score for ${community.name}`}>
                  <TrustScoreTile community={community} />
                </StyledHeadingBoxSection>
                }
                <StyledHeadingBoxSection id="amenities-section" heading="Amenities">
                  <CommunityDetails community={community} />
                </StyledHeadingBoxSection>
                {!isActiveAdult && !isInternational &&
                  <StyledHeadingBoxSection heading="How Seniorly Works" hasNoBodyPadding>
                    <HowSlyWorksVideoContainer eventLabel={community.id} />

                    <PaddedGetAssessmentBoxContainerHydrator
                      startLink={`/wizards/assessment/community/${community.id}?skipIntro=true`}
                      community={community}
                      mode={getAssessmentBoxModes.profileSection}
                      mt="m"
                    />

                  </StyledHeadingBoxSection>
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

                {/* <CommunityQuestionAnswersContainer /> */}

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

                {!!similarProperties?.length && (
                  <StyledHeadingBoxSection
                    heading="Recommended communities"
                    id="sticky-sidebar-boundary"
                    sx$tablet={{ padding: 0 }}
                  >
                    <TrackedSimilarCommunitiesContainer
                      communities={similarProperties}
                      communityStyle={similarCommunityStyle}
                    />
                    <BackToSearch>
                      <Button
                        href={getCitySearchUrl({ propInfo, address })}
                        event={{ action: 'click', category: 'backToSearch', label: community.id }}
                        width="100%"
                      >
                        Communities In {address.city}
                      </Button>
                    </BackToSearch>
                  </StyledHeadingBoxSection>
                )}
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
                    >
                      {(promoDescription || promoTitle) && (
                        <OfferNotificationContainer
                          sx={{
                            m: 'l -l -l',
                            p: 'l',
                            borderTopLeftRadius: 'unset',
                            borderTopRightRadius: 'unset',
                          }}
                          sx$laptop={{ display: 'flex' }}
                          title={promoTitle}
                          description={promoDescription}
                          community={community}
                        />
                      )}
                    </GetAssessmentBoxContainerHydrator>
                  }
                </StickToTop>
              </Column>
            </TwoColumn>
            <StyledSection
              headingMargin="l"
              title="Location"
              headingFont="title-m"
            >
              <LazyCommunityMap id="map" />
              <Block>{formattedAddress}</Block>
              <Hr mt="xxl" mb="xxl" display="none" sx$tablet={{ display: 'block' }} />
            </StyledSection>
            {/* <StyledHeadingBoxSection */}
            {/*  heading="Active senior living communities" */}
            {/*  id="sticky-sidebar-boundary" */}
            {/*  sx$tablet={{ padding: 0 }} */}
            {/* > */}
            {/*  <TrackedSimilarCommunitiesContainer */}
            {/*    communities={[...similarProperties, ...similarProperties]} */}
            {/*    communityStyle={similarCommunityStyle} */}
            {/*  /> */}
            {/* </StyledHeadingBoxSection> */}
            {/* <StyledHeadingBoxSection */}
            {/*  heading="Senior living communities for those on a budget" */}
            {/*  id="sticky-sidebar-boundary" */}
            {/*  sx$tablet={{ padding: 0 }} */}
            {/* > */}
            {/*  <TrackedSimilarCommunitiesContainer */}
            {/*    communities={[...similarProperties, ...similarProperties]} */}
            {/*    communityStyle={similarCommunityStyle} */}
            {/*  /> */}
            {/* </StyledHeadingBoxSection> */}
            {/* <StyledHeadingBoxSection */}
            {/*  heading="Luxury senior living communities" */}
            {/*  id="sticky-sidebar-boundary" */}
            {/*  sx$tablet={{ padding: 0 }} */}
            {/* > */}
            {/*  <TrackedSimilarCommunitiesContainer */}
            {/*    communities={[...similarProperties, ...similarProperties]} */}
            {/*    communityStyle={similarCommunityStyle} */}
            {/*  /> */}
            {/* </StyledHeadingBoxSection> */}
            {showMoreImages && (
              <StyledSection
                title={`More Photos of ${name}`}
                headingFont="title-l"
                headingMargin="l"
                sx$tablet={{ px: 0 }}
              >
                <CommunityMorePicturesContainer />
                <Hr mt="xxl" mb="xxl" display="none" sx$tablet={{ display: 'block' }} />
              </StyledSection>
            )}
            <StyledHeadingBoxSection
              heading="Disclaimer"
              headingFont="title-m"
              hasNoBottomHr
            >
              <CommunityDisclaimerSection
                phone={twilioNumber?.numbers?.[0] || '8558664515'}
                isClaimed={isClaimed}
                id={community.id}
                city={address.city}
                name={name}
                agent={partnerAgent}
              />
            </StyledHeadingBoxSection>
          </Wrapper>


          {nearbyCities &&
            nearbyCities.length > 0 && (
              <Wrapper>
                <Hr mt="xxl" mb="xxl" display="none" sx$tablet={{ display: 'block' }} />
                <SeoLinks
                  title={`Explore top cities near ${name}`}
                  links={nearbyCities}
                />
              </Wrapper>
            )}
        </CommunityDetailPageTemplate>
        <Footer sx={{ marginBottom: '81px' }} sx$laptop={{ marginBottom: '0px' }} />
      </>
    );
  }
}

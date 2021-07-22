import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { object, func } from 'prop-types';
import { ifProp } from 'styled-tools';
import loadable from '@loadable/component';

// import StickyHeader from 'sly/web/profile/StickyHeader';
import SlyTypeform from './Typeform/Typeform';

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
import { getIsActiveAdult, getPartnerAgent, getChatBotEventName } from 'sly/web/services/helpers/community';
import { getAgentFirstName } from 'sly/web/services/helpers/agents';
import { Button } from 'sly/common/components/atoms';
import { color, space, sx$tablet, sx$laptop, Hr, Block, font } from 'sly/common/system';
import SeoLinks from 'sly/web/components/organisms/SeoLinks';
import FAQItem from 'sly/web/components/organisms/CMSDynamicZone/FAQItem';
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
import CollapsibleBlock from 'sly/web/components/molecules/CollapsibleBlock';
import { clickEventHandler } from 'sly/web/services/helpers/eventHandlers';
import HeadingBoxSection from 'sly/web/components/molecules/HeadingBoxSection';
import ModalContainer from 'sly/web/containers/ModalContainer';
import withChatbox from 'sly/web/services/chatbox/withChatBox';
import StickyHeaderTabs from 'sly/web/components/common/StickyHeaderTabs';
import SimilarCommunities from 'sly/web/components/organisms/SimilarCommunities';
import ArticlePreview from 'sly/web/resourceCenter/components/ArticlePreview';
import { RESOURCE_CENTER_PATH } from 'sly/web/dashboard/dashboardAppPaths';
import Callout from 'sly/web/profile/Callout';
import { addToLocalStorage, retrieveLocalStorage } from 'sly/web/services/helpers/localStorage';
import { getTypeformDetailsByCommunity } from 'sly/web/services/helpers/typeform';

const PageViewActionContainer = loadable(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "chunkPageView" */ 'sly/web/containers/PageViewActionContainer'));
const CommunityMediaGalleryContainer = loadable(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "chunkCommunityMediaGallery" */ 'sly/web/profile/CommunityMediaGallery/CommunityMediaGalleryContainer'));
const CommunitySummaryContainer = loadable(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "chunkCommunitySummary" */ 'sly/web/containers/CommunitySummaryContainer'));
const GetAssessmentBoxContainerHydrator = loadable(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "chunkGetAssessmentBox" */ 'sly/web/profile/GetAssessmentBoxContainerHydrator'));


const CommunityAgentSection = withHydration(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "chunkCommunityAgentSection" */ 'sly/web/components/molecules/CommunityAgentSection'));
const OfferNotificationContainer = withHydration(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "chunkOfferNotification" */ 'sly/web/profile/OfferNotification/OfferNotificationContainer'));
const CarouselContainer = withHydration(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "chunkCarouselContainer" */ 'sly/web/containers/CarouselContainer'));
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
    paddingX: '0',
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

const StyledCallout = styled(Callout)`
  margin-bottom: ${space('s')};
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

@withChatbox
export default class CommunityDetailPage extends PureComponent {
  static propTypes = {
    community: object.isRequired,
    location: object.isRequired,
    triggerChatBot: func,
  };

  state  = { rerender: false }
  componentDidMount() {
    const { community } = this.props;
    const { address } = community;
    const isInternational = address.country !== 'United States';
    if (!isInternational) {
      // const eventName = getChatBotEventName(community);
      const { triggerChatBot } = this.props;
      // triggerChatBot(eventName);
      triggerChatBot('Bot reintro');
    }
  }

  readyHandler1 = () => {
    console.log('ready');
  }

  questionHandler1= () => {
    console.log('question');
  }
  readyHandler = this.readyHandler1.bind(this);
  questionHandler = this.questionHandler1.bind(this);

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
      similarCommunities,
      gallery = {},
      twilioNumber,
      user: communityUser,
      reviews,
    } = community;

    const {
      promoDescription,
      promoTitle,
      communityInsights,
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
    const { nearbyCities, rgsInfo } = rgsAux;
    const { faqs } = rgsInfo;

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
      pricesList.length === 0 && floorPlans?.length > 0
        ? 'Pricing and Floor Plans'
        : 'Pricing';

    const similarCommunityStyle = {
      layout: 'row',
      imageSize: 'regular',
      showDescription: true,
    };


    // Easiest to extract coniditonal to a var for sticky header sections
    const shouldShowPricing = !isActiveAdult && !isInternational;
    const shouldShowPartnerAgent = !!partnerAgent;
    const shouldShowAbout = !!(communityDescription || rgsAux.communityDescription ||
      staffDescription || residentDescription || ownerExperience);
    const shouldShowReviews = reviews && reviews.length > 0;

    const stickyHeaderSections = [
      { label: 'photos', id: 'gallery' },
      shouldShowPricing ? { label: 'pricing', id: 'pricing-and-floor-plans' } : null,
      shouldShowPartnerAgent ? { label: 'advisor', id: 'agent-section' } : null,
      shouldShowAbout ? { label: 'about', id: 'community-about' } : null,
      { label: 'amenities', id: 'amenities-section' },
      shouldShowReviews ? { label: 'reviews', id: 'reviews' } : null,
    ];
    console.log('location', location);

    const typeformId = getTypeformDetailsByCommunity(community, location.pathname);
    const typeformUrl = `/typeform?formid=${typeformId}`;

    console.log(typeformUrl);

    return (
      <>
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
          <StickyHeaderTabs sections={stickyHeaderSections} />
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


                {shouldShowPricing &&
                <StyledHeadingBoxSection
                  heading={`${pricingTitle} at ${name}`}
                  id="pricing-and-floor-plans"
                >
                  {/* <GetAssessmentBoxContainerHydrator
                    startLink={`/wizards/assessment/community/${community.id}`}
                    community={community}
                    layout="pricing-table"
                    mode={getAssessmentBoxModes.pricingTable}
                    extraProps={{
                      pricesList,
                      estimatedPriceList,
                      newPricesList,
                    }}
                  /> */}
                  {/* {
                    this.state.rerender ? 'Re Render' : ' No Rerender'
                  } */}
                  <SlyTypeform wizardType="POPUP_BUTTON" formId={typeformId} popupButtonName="Get Pricing"  />
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
                {shouldShowAbout && (
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
                {shouldShowPartnerAgent && (
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
                      <Callout
                        title="Working with a Seniorly Advisor is a completely FREE service to you!"
                        description={
                          `Connect with ${getAgentFirstName(partnerAgent)} to learn more about your senior care options.`
                        }
                      />
                    </StyledHeadingBoxSection>

                  </>
                )}
                {rgsAux && rgsAux.rgsInfo &&  rgsAux.rgsInfo.trustScore > 0 &&
                <StyledHeadingBoxSection heading={`Seniorly Trust Score for ${community.name}`}>
                  <TrustScoreTile community={community} />
                </StyledHeadingBoxSection>
                }
                <StyledHeadingBoxSection id="amenities-section" heading={`Amenities at ${community.name}`}>
                  <CommunityDetails community={community} />
                </StyledHeadingBoxSection>
                {!isActiveAdult && !isInternational &&
                  <StyledHeadingBoxSection heading="How Seniorly Works" hasNoBodyPadding>
                    <HowSlyWorksVideoContainer eventLabel={community.id} />

                    {/* <PaddedGetAssessmentBoxContainerHydrator
                      startLink={`/wizards/assessment/community/${community.id}?skipIntro=true`}
                      community={community}
                      mode={getAssessmentBoxModes.profileSection}
                      mt="m"
                    /> */}

                    <Block height="350px">
                      {/* <SlyTypeform wizardType="WIDGET" formId="dH3EjYYx" onReadyHandler={this.readyHandler} /> */}
                      <SlyTypeform wizardType="WIDGET" formId="dH3EjYYx" />

                    </Block>

                    {/* Embeded Typeform */}
                    {/* <Block width="100%" height="350px" mt="m">
                      <Block className="typeform-widget" data-url={emdededFormUrl} width="100%" height="100%" />
                    </Block> */}

                  </StyledHeadingBoxSection>
                }

                {shouldShowReviews &&
                  <StyledHeadingBoxSection
                    heading={`Reviews at ${name}`}
                    id="reviews"
                  >
                    <CommunityReviewsContainer />
                  </StyledHeadingBoxSection>
                }


                {!!similarCommunities?.similar?.length && (
                  <StyledHeadingBoxSection
                    heading="Similar communities"
                    id="sticky-sidebar-boundary"
                    sx$tablet={{ padding: '0 !important' }}
                  >
                    <StyledCallout
                      title="We think you might like these nearby communities"
                      description={`They are similar in price, care services, and size as ${community.name}`}
                    />
                    <CarouselContainer itemsQty={similarCommunities.similar.length}>
                      <SimilarCommunities
                        communities={similarCommunities.similar}
                        communityStyle={similarCommunityStyle}
                        canFavourite
                        getEvent={(community, index) => ({
                          action: 'click',
                          category: 'similarCommunityDefault',
                          label: index,
                          value: community.id,
                        })}
                      />
                    </CarouselContainer>
                    <BackToSearch>
                      <Button
                        href={getCitySearchUrl({ propInfo, address })}
                        event={{ action: 'click', category: 'backToSearch', label: community.id }}
                        width="100%"
                      >
                        See more communities
                      </Button>
                    </BackToSearch>
                  </StyledHeadingBoxSection>
                )}

                {rgsAux.rgsInfo?.resourceLinks?.length && (
                  <StyledHeadingBoxSection heading={`Helpful ${typeOfCare} Articles`} sx$tablet={{ padding: '0 !important' }}>
                    <CarouselContainer itemsQty={rgsAux.rgsInfo.resourceLinks.length}>
                      {rgsAux.rgsInfo.resourceLinks.map(item => (
                        <ArticlePreview
                          key={item.title}
                          alternativeText={item.title}
                          {...item}
                          customStyles={{ width: '100%', lineHeight: 'body-m' }}
                        />
                      ))}
                      <div />
                    </CarouselContainer>
                    <Button
                      href={RESOURCE_CENTER_PATH}
                      event={{ action: 'click', category: 'communityResource', label: community.id }}
                      width="100%"
                    >
                      See more articles
                    </Button>
                  </StyledHeadingBoxSection>
                )}
                {faqs && (
                  <StyledHeadingBoxSection
                    heading={`Frequently asked questions about ${name}`}
                    id="sticky-sidebar-boundary"
                    sx$tablet={{ padding: '0 !important' }}
                  >
                    {faqs.map(faq => (
                      <FAQItem
                        key={faq.question}
                        title={faq.question}
                        description={faq.answer}
                      />
                    ))}

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
                          orderIconFirstOnTablet={false}
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
              headingFont="title-l"
            >
              <LazyCommunityMap id="map" />
              <Block font="body-m" >{formattedAddress}</Block>
              <Hr mt="xxl" mb="xxl" display="none" sx$tablet={{ display: 'block' }} />
            </StyledSection>
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
              <Hr mt="xxl" mb="xxl" display="none" sx$tablet={{ display: 'block' }} />
            </StyledHeadingBoxSection>
            {!!similarCommunities?.recommended?.length && (
              <StyledHeadingBoxSection
                heading="Recommended communities"
                id="sticky-sidebar-boundary"
                sx$tablet={{ padding: '0 !important' }}
              >
                <CarouselContainer itemsQty={similarCommunities.recommended.length}>
                  <SimilarCommunities
                    communities={similarCommunities.recommended}
                    communityStyle={similarCommunityStyle}
                    canFavourite
                    getEvent={(community, index) => ({
                      action: 'click',
                      category: 'similarCommunityRecommended',
                      label: index,
                      value: community.id,
                    })}
                  />
                </CarouselContainer>
              </StyledHeadingBoxSection>
              )}
            {!!similarCommunities?.luxury?.length && (
            <StyledHeadingBoxSection
              heading="Luxury senior living communities"
              id="sticky-sidebar-boundary"
              sx$tablet={{ padding: '0 !important' }}
            >
              <CarouselContainer itemsQty={similarCommunities.luxury.length}>
                <SimilarCommunities
                  communities={similarCommunities.luxury}
                  communityStyle={similarCommunityStyle}
                  canFavourite
                  getEvent={(community, index) => ({
                        action: 'click',
                        category: 'similarCommunityLuxury',
                        label: index,
                        value: community.id,
                    })}
                />
              </CarouselContainer>
            </StyledHeadingBoxSection>
              )}
            {!!similarCommunities?.independent?.length && (
            <StyledHeadingBoxSection
              heading="Active senior living communities"
              id="sticky-sidebar-boundary"
              sx$tablet={{ padding: '0 !important' }}
            >
              <CarouselContainer itemsQty={similarCommunities.independent.length}>
                <SimilarCommunities
                  communities={similarCommunities.independent}
                  communityStyle={similarCommunityStyle}
                  canFavourite
                  getEvent={(community, index) => ({
                      action: 'click',
                        category: 'similarCommunityIndependent',
                        label: index,
                        value: community.id,
                      })}
                />
              </CarouselContainer>
            </StyledHeadingBoxSection>
              )}
            {!!similarCommunities?.budget?.length && (
            <StyledHeadingBoxSection
              heading="Senior living communities for those on a budget"
              id="sticky-sidebar-boundary"
              sx$tablet={{ padding: '0 !important' }}
            >
              <CarouselContainer itemsQty={similarCommunities.budget.length}>
                <SimilarCommunities
                  communities={similarCommunities.budget}
                  communityStyle={similarCommunityStyle}
                  canFavourite
                  getEvent={(community, index) => ({
                        action: 'click',
                        category: 'similarCommunityBudget',
                        label: index,
                        value: community.id,
                      })}
                />
              </CarouselContainer>
            </StyledHeadingBoxSection>
              )}

            {nearbyCities &&
            nearbyCities.length > 0 && (
            <SeoLinks
              title={`Explore top cities near ${name}`}
              links={nearbyCities}
              px="m"
              pad="l"
              sx$tablet={{
                px: '0',
                pad: 'xxl',
              }}
              background="white"
            />
            )}
          </Wrapper>


        </CommunityDetailPageTemplate>
        <Footer sx={{ marginBottom: '81px' }} sx$laptop={{ marginBottom: '0px' }} />
      </>
    );
  }
}

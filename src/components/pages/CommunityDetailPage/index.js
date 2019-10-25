import React, { Component } from 'react';
import styled from 'styled-components';
import { object, func, bool } from 'prop-types';
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
import EntityReviews from 'sly/components/organisms/EntityReviews';
import CommunityDetails from 'sly/components/organisms/CommunityDetails';
import CommunityPricingComparison from 'sly/components/organisms/CommunityPricingComparison';
import SimilarCommunities from 'sly/components/organisms/SimilarCommunities';
import CommunityAmenities from 'sly/components/organisms/CommunityAmenities';
import CommunityMap from 'sly/components/organisms/CommunityMap';
import CommunityMediaGalleryContainer from 'sly/containers/CommunityMediaGalleryContainer';
import MorePictures from 'sly/components/organisms/MorePictures';
import CommunityQuestionAnswers from 'sly/components/organisms/CommunityQuestionAnswers';
import BreadCrumb from 'sly/components/molecules/BreadCrumb';
import CommunityLocalDetails from 'sly/components/organisms/CommunityLocalDetails';
import ConciergeContainer from 'sly/containers/ConciergeContainer';
import OfferNotification from 'sly/components/molecules/OfferNotification';
import CommunityAgentSection from 'sly/components/molecules/CommunityAgentSection';
import AdvisorHelpPopup from 'sly/components/molecules/AdvisorHelpPopup';
import CommunityCareService from 'sly/components/organisms/CommunityCareService';
import CommunityExtraInfoSection from 'sly/components/molecules/CommunityExtraInfoSection';
import IconItem from 'sly/components/molecules/IconItem';
import CommunityAskQuestionFormContainer from 'sly/containers/CommunityAskQuestionFormContainer';
import CommunityLeaveAnAnswerFormContainer from 'sly/containers/CommunityLeaveAnAnswerFormContainer';
import GetCurrentAvailabilityContainer from 'sly/containers/GetCurrentAvailabilityContainer';
import HowSlyWorksVideoContainer from 'sly/containers/HowSlyWorksVideoContainer';
import CommunityAddRatingFormContainer from 'sly/containers/CommunityAddRatingFormContainer';
import BannerNotification from 'sly/components/molecules/BannerNotification';
import CommunityPricingTable from 'sly/components/organisms/CommunityPricingTable';
import withExitIntent from 'sly/services/exitIntent/withExitIntent';
import AskAgentQuestionButtonContainer from 'sly/containers/AskAgentQuestionButtonContainer';
import GetCustomPricingButtonContainer from 'sly/containers/GetCustomPricingButtonContainer';
import CommunitySummaryContainer from 'sly/containers/CommunitySummaryContainer';

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
    onBackToSearchClicked: func,
    onReviewLinkClicked: func,
    onConciergeNumberClicked: func,
    onLiveChatClicked: func,
    onReceptionNumberClicked: func,
    onSimilarCommunitiesClick: func,
    profileContacted: object.isRequired,
    userAction: object,
    notifyInfo: func,
    notifyError: func,
    showModal: func,
    hideModal: func,
    onToggleAskQuestionModal: func,
    history: object,
  };
  handleMorePicturesClick = (image) => {
    const {
      community,
      onMediaGallerySlideChange,
      onMediaGalleryToggleFullscreen,
    } = this.props;
    const { gallery = {}, videoGallery = {} } = community;
    const images = gallery.images || [];
    const videos = videoGallery.videos || [];
    let matchingIndex = images.findIndex(i => image.id === i.id);
    if (matchingIndex > -1) {
      matchingIndex = videos.length + matchingIndex;
      onMediaGallerySlideChange(matchingIndex, true);
      onMediaGalleryToggleFullscreen(true);
    }
  };

  // todo clean up
  // openFloorPlanModal = (floorPlan) => {
  //   const {
  //     showModal,
  //     hideModal,
  //     community,
  //     user,
  //     userAction,
  //     onFloorPlanModalToggle,
  //   } = this.props;
  //   const { userDetails } = userAction;
  //   const { info: floorPlanInfo } = floorPlan;
  //   const { id, propInfo } = community;
  //   const { typeCare: typeCares } = propInfo;
  //   const typeOfCare = typeCares[0];
  //
  //   const modalComponentProps = {
  //     communitySlug: id,
  //     typeOfCare,
  //     user,
  //     floorPlanInfo,
  //     userDetails,
  //     postSubmit: hideModal,
  //   };
  //   const onClose = () => {
  //     onFloorPlanModalToggle(floorPlan, true);
  //   };
  //
  //   onFloorPlanModalToggle(floorPlan);
  //   showModal(
  //     <CommunityFloorPlanPopupFormContainer {...modalComponentProps} />,
  //     onClose,
  //     'noPadding'
  //   );
  // };

  openAskQuestionModal = (question) => {
    const { showModal, community, user, onToggleAskQuestionModal } = this.props;
    const { id, name, questions } = community;
    const questionToAnswer = questions.find(
      q => q.type === question.type && q.id === question.id
    );
    // if (!questionToAnswer) {
    //   questionToAnswer = communityFaQs.find(communityFaQ => communityFaQ.type === question.type && communityFaQ.id === question.id);
    // }
    let questionId;
    let contentData;
    let initialValues;
    if (questionToAnswer) {
      ({ id: questionId, contentData } = questionToAnswer);
      initialValues = { question: contentData };
    }

    const modalComponentProps = {
      communityName: name,
      communitySlug: id,
      showModal,
      user,
      initialValues,
      parentSlug: questionId,
    };
    const onClose = () => {
      onToggleAskQuestionModal(true);
    };

    onToggleAskQuestionModal();
    showModal(
      <CommunityAskQuestionFormContainer {...modalComponentProps} />,
      onClose
    );
  };

  openAdvisorHelpModal = () => {
    const { showModal, hideModal } = this.props;
    showModal(<AdvisorHelpPopup onButtonClick={hideModal} />);
  };

  openAnswerQuestionModal = (type, questionId) => {
    const { showModal, hideModal, community } = this.props;
    const { id, questions, communityFaQs } = community;
    let questionToAnswer = questions.find(
      question => question.type === type && question.id === questionId
    );
    if (!questionToAnswer) {
      questionToAnswer = communityFaQs.find(
        communityFaQ =>
          communityFaQ.type === type && communityFaQ.id === questionId
      );
    }
    if (questionToAnswer) {
      const { id: questionId, contentData } = questionToAnswer;
      const modalComponentProps = {
        onSuccess: hideModal,
        communitySlug: id,
        questionText: contentData,
        questionId,
      };

      showModal(
        <CommunityLeaveAnAnswerFormContainer {...modalComponentProps} />
      );
    }
  };

  handleAddReviewButtonClick = () => {
    const { showModal } = this.props;

    showModal(<CommunityAddRatingFormContainer showModal={showModal} />);
  };

  showExitModal = () => {
    const { showModal } = this.props;

    showModal(<CommunityAddRatingFormContainer showModal={showModal} />);
  };

  render() {
    const {
      openAskQuestionModal,
      openAdvisorHelpModal,
      openAnswerQuestionModal,
      handleAddReviewButtonClick,
    } = this;
    const {
      community,
      profileContacted,
      location,
      onBackToSearchClicked,
      onSimilarCommunitiesClick,
      user,
      onReviewLinkClicked,
    } = this.props;

    const {
      id,
      name,
      propInfo,
      propRatings,
      reviews,
      address,
      rgsAux,
      floorPlans,
      similarProperties,
      gallery = {},
      videoGallery = {},
      questions,
      communityFaQs,
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

    // TODO: move this to a container for EntityReviews handling posts
    const onLeaveReview = () => {};
    // TODO: move this to a container PricingAndAvailability for handling bookings
    const { reviewsValue } = propRatings;
    const ratingsArray = propRatings.ratingsArray || [];
    const reviewsFinal = reviews || [];

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
                      <SimilarCommunities
                        communities={similarProperties}
                        onCommunityClick={onSimilarCommunitiesClick}
                        communityStyle={similarCommunityStyle}
                      />
                      <BackToSearch>
                        <Button
                          ghost
                          onClick={onBackToSearchClicked}
                          href={getCitySearchUrl({ propInfo, address })}
                        >
                          Communities In {address.city}
                        </Button>
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
                <TopCollapsibleSection title="How Seniorly Works">
                  <MainSection noPadding>
                    <HowSlyWorksVideoContainer eventLabel={community.id} />
                  </MainSection>
                </TopCollapsibleSection>
                {partnerAgent && (
                  <TopCollapsibleSection
                    title={`Your Seniorly Partner Agent for ${name}`}
                  >
                    <MainSection>
                      <CommunityAgentSection
                        agent={partnerAgent}
                        onAdvisorHelpClick={openAdvisorHelpModal}
                      />
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
                    <EntityReviews
                      reviewsValue={reviewsValue}
                      reviews={reviewsFinal}
                      reviewRatings={ratingsArray}
                      onLeaveReview={onLeaveReview}
                      onReviewLinkClicked={onReviewLinkClicked}
                    />
                  </MainSection>
                  <ButtonBlock>
                    <StyledButton onClick={handleAddReviewButtonClick}>
                      Write a Review
                    </StyledButton>
                  </ButtonBlock>
                </TopCollapsibleSection>

                <TopCollapsibleSection title={`Questions About ${name}`}>
                  <MainSection>
                    <CommunityQuestionAnswers
                      communityName={name}
                      communitySlug={id}
                      questions={questions}
                      communityFaQs={communityFaQs}
                      onLeaveAnswerClick={openAnswerQuestionModal}
                      onAskQuestionClick={openAskQuestionModal}
                      user={user}
                    />
                  </MainSection>
                  <ButtonBlock>
                    <StyledButton onClick={openAskQuestionModal}>
                      Ask a Question
                    </StyledButton>
                  </ButtonBlock>
                </TopCollapsibleSection>
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
                      <SimilarCommunities
                        communities={similarProperties}
                        onCommunityClick={onSimilarCommunitiesClick}
                        communityStyle={similarCommunityStyle}
                      />
                      <BackToSearch>
                        <Button
                          ghost
                          onClick={onBackToSearchClicked}
                          href={getCitySearchUrl({ propInfo, address })}
                        >
                          Communities In {address.city}
                        </Button>
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
                <MorePictures
                  gallery={gallery}
                  communityName={name}
                  city={address.city}
                  state={address.state}
                  onPictureClick={this.handleMorePicturesClick}
                />
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

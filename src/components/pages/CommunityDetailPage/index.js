import React, { Fragment, Component } from 'react';
import styled from 'styled-components';
import { object, func, number, bool } from 'prop-types';
import Sticky from 'react-stickynode';
import { Lazy } from 'react-lazy';

import { size, palette, assetPath } from 'sly/components/themes';
import { USER_SAVE_DELETE_STATUS } from 'sly/constants/userSave';
import { getBreadCrumbsForCommunity, getCitySearchUrl } from 'sly/services/helpers/url';
import { getHelmetForCommunityPage } from 'sly/services/helpers/html_headers';
import SlyEvent from 'sly/services/helpers/events';
import { calculatePricing, buildPriceList, buildEstimatedPriceList } from 'sly/services/helpers/pricing';
import { generateAskAgentQuestionContents } from 'sly/services/helpers/agents';
import pad from 'sly/components/helpers/pad';
import { Heading, Button, Paragraph, Block } from 'sly/components/atoms';
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
import SaveCommunityContainer from 'sly/containers/SaveCommunityContainer';
import CommunityStickyFooter from 'sly/components/organisms/CommunityStickyFooter';
import CollapsibleSection, { MainSection, BottomSection } from 'sly/components/molecules/CollapsibleSection';
import Section from 'sly/components/molecules/Section';
import EntityReviews from 'sly/components/organisms/EntityReviews';
import CommunityDetails from 'sly/components/organisms/CommunityDetails';
import CommunityPricingComparison from 'sly/components/organisms/CommunityPricingComparison';
import SimilarCommunities from 'sly/components/organisms/SimilarCommunities';
import CommunityAmenities from 'sly/components/organisms/CommunityAmenities';
import CommunityMap from 'sly/components/organisms/CommunityMap';
import CommunityMediaGallery from 'sly/components/organisms/CommunityMediaGallery';
import MorePictures from 'sly/components/organisms/MorePictures';
import CommunitySummary from 'sly/components/organisms/CommunitySummary';
import CommunityQuestionAnswers from 'sly/components/organisms/CommunityQuestionAnswers';
import BreadCrumb from 'sly/components/molecules/BreadCrumb';
import CommunityLocalDetails from 'sly/components/organisms/CommunityLocalDetails';
import CommunityAskQuestionAgentFormContainer from 'sly/containers/CommunityAskQuestionAgentFormContainer';
import ConciergeContainer from 'sly/containers/ConciergeContainer';
import OfferNotification from 'sly/components/molecules/OfferNotification';
import CommunityFloorPlansList from 'sly/components/organisms/CommunityFloorPlansList';
import CommunityFloorPlanPopupFormContainer from 'sly/containers/CommunityFloorPlanPopupFormContainer';
import TextBottomSection from 'sly/components/molecules/TextBottomSection';
import CommunityAgentSection from 'sly/components/molecules/CommunityAgentSection';
import AdvisorHelpPopup from 'sly/components/molecules/AdvisorHelpPopup';
import CommunityCareService from 'sly/components/organisms/CommunityCareService';
import CommunityExtraInfoSection from 'sly/components/molecules/CommunityExtraInfoSection';
import IconItem from 'sly/components/molecules/IconItem';
import CommunityAskQuestionFormContainer from 'sly/containers/CommunityAskQuestionFormContainer';
import CommunityLeaveAnAnswerFormContainer from 'sly/containers/CommunityLeaveAnAnswerFormContainer';
import GetCurrentAvailabilityContainer from 'sly/containers/GetCurrentAvailabilityContainer';
import ShareCommunityFormContainer from 'sly/containers/ShareCommunityFormContainer';
import HowSlyWorksVideo from 'sly/components/organisms/HowSlyWorksVideo';
import CommunityAddRatingFormContainer from 'sly/containers/CommunityAddRatingFormContainer';
import BannerNotification from 'sly/components/molecules/BannerNotification';
import CommunityPricingTable from 'sly/components/organisms/CommunityPricingTable';
import { Experiment, Variant } from 'sly/services/experiments';
import exitIntent from 'sly/containers/ExitIntentContainer'

const BackToSearch = styled.div`
  text-align: center
`;

const StyledCommunitySummary = styled(CommunitySummary)`
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
  padding-top:0;
`;

const StyledButton = styled(Button)`
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
  const requests = Object.entries(profileContacted).reduce((acc, [key, value]) => {
    if (value) {
      if (acc.length) acc.push(', ');
      acc.push(key);
    }
    return acc;
  }, []);

  if (!requests.length) {
    return null;
  }

  if (requests.length > 1) {
    requests[requests.length - 2] = ' and ';
  }

  return `We have your ${requests.join('')} request. Your Seniorly Partner Agent is checking with this community and will get back to you shortly.`;
};

const sendEvent = (category, action, label, value) => SlyEvent.getInstance().sendEvent({
  category,
  action,
  label,
  value,
});

@exitIntent
export default class CommunityDetailPage extends Component {
  static propTypes = {
    user: object,
    community: object.isRequired,
    location: object.isRequired,
    mediaGallerySlideIndex: number,
    isMediaGalleryFullscreenActive: bool,
    onMediaGallerySlideChange: func,
    onMediaGalleryToggleFullscreen: func,
    onMediaGalleryFavouriteClick: func,
    onMediaGalleryShareClick: func,
    onShareCommunityModalClose: func,
    onBackToSearchClicked: func,
    onReviewLinkClicked: func,
    onConciergeNumberClicked: func,
    onLiveChatClicked: func,
    onReceptionNumberClicked: func,
    onSimilarCommunitiesClick: func,
    userSave: object,
    searchParams: object,
    setQueryParams: func,
    onBookATourClick: func,
    onGCPClick: func,
    profileContacted: object.isRequired,
    onToggleAskAgentQuestionModal: func,
    userAction: object,
    onFloorPlanModalToggle: func,
    toggleHowSlyWorksVideoPlaying: func,
    isHowSlyWorksVideoPlaying: bool,
    notifyInfo: func,
    notifyError: func,
    showModal: func,
    hideModal: func,
    onToggleAskQuestionModal: func,
    onUnsaveCommunity: func,
    history: object,
  };
  handleMorePicturesClick = (image) => {
    const {
      community, onMediaGallerySlideChange, onMediaGalleryToggleFullscreen,
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

  handleShareClick = () => {
    const {
      showModal, hideModal, notifyInfo, onMediaGalleryShareClick, community, user, onShareCommunityModalClose,
    } = this.props;
    const { id, mainImage } = community;
    const onSuccess = () => {
      onShareCommunityModalClose();
      hideModal();
    };
    const onClose = () => {
      onShareCommunityModalClose(true);
    };

    const modalComponentProps = {
      mainImage,
      fromEnabled: !user || !user.email,
      communitySlug: id,
      notifyInfo,
      onSuccess,
    };

    onMediaGalleryShareClick();
    showModal(<ShareCommunityFormContainer {...modalComponentProps} />, onClose);
  };

  openFloorPlanModal = (floorPlan) => {
    const {
      showModal, hideModal, community, user, userAction, onFloorPlanModalToggle,
    } = this.props;
    const { userDetails } = userAction;
    const { info: floorPlanInfo } = floorPlan;
    const { id, propInfo } = community;
    const { typeCare: typeCares } = propInfo;
    const typeOfCare = typeCares[0];

    const modalComponentProps = {
      communitySlug: id,
      typeOfCare,
      user,
      floorPlanInfo,
      userDetails,
      postSubmit: hideModal,
    };
    const onClose = () => {
      onFloorPlanModalToggle(floorPlan, true);
    };

    onFloorPlanModalToggle(floorPlan);
    showModal(<CommunityFloorPlanPopupFormContainer {...modalComponentProps} />, onClose, 'noPadding');
  };

  openAskQuestionModal = (question) => {
    const {
      showModal, community, user, onToggleAskQuestionModal,
    } = this.props;
    const {
      id, name, questions,
    } = community;
    const questionToAnswer = questions.find(q => q.type === question.type && q.id === question.id);
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
    showModal(<CommunityAskQuestionFormContainer {...modalComponentProps} />, onClose);
  };

  openAdvisorHelpModal = () => {
    const { showModal, hideModal } = this.props;
    showModal(<AdvisorHelpPopup onButtonClick={hideModal} />);
  };

  openAnswerQuestionModal = (type, questionId) => {
    const { showModal, hideModal, community } = this.props;
    const { id, questions, communityFaQs } = community;
    let questionToAnswer = questions.find(question => question.type === type && question.id === questionId);
    if (!questionToAnswer) {
      questionToAnswer = communityFaQs.find(communityFaQ => communityFaQ.type === type && communityFaQ.id === questionId);
    }
    if (questionToAnswer) {
      const { id: questionId, contentData } = questionToAnswer;
      const modalComponentProps = {
        onSuccess: hideModal,
        communitySlug: id,
        questionText: contentData,
        questionId,
      };

      showModal(<CommunityLeaveAnAnswerFormContainer {...modalComponentProps} />);
    }
  };

  openAskAgentQuestionModal = (type) => {
    const {
      showModal, hideModal, notifyInfo, community, onToggleAskAgentQuestionModal,
    } = this.props;
    const { address, name } = community;
    const { city } = address;
    const agentImageUrl = assetPath('images/agent-xLarge.png');
    const {
      heading, description, placeholder, question,
    } = generateAskAgentQuestionContents(name, city, type);

    const toggleAskAgentQuestionModal = () => {
      onToggleAskAgentQuestionModal(true, type);
      hideModal();
    };

    const modalComponentProps = {
      toggleAskAgentQuestionModal,
      notifyInfo,
      community,
      heading,
      description,
      agentImageUrl,
      placeholder,
      question,
    };
    const onClose = () => {
      onToggleAskAgentQuestionModal(true, type);
    };

    onToggleAskAgentQuestionModal(false, type);
    showModal(<CommunityAskQuestionAgentFormContainer {...modalComponentProps} />, onClose);
  };

  handleFavouriteClick = () => {
    const {
      community, onMediaGalleryFavouriteClick, showModal, notifyInfo, notifyError, userSave, hideModal,
      onUnsaveCommunity,
    } = this.props;
    const { id } = community;
    let initedUserSave;
    if (userSave) {
      initedUserSave = userSave.status !== USER_SAVE_DELETE_STATUS ? userSave : null;
    }

    if (initedUserSave) {
      onUnsaveCommunity(notifyInfo, notifyError);
    } else {
      showModal(<SaveCommunityContainer slug={id} onCancelClick={hideModal} onDoneButtonClick={hideModal} notifyInfo={notifyInfo} notifyError={notifyError} />, null, 'noPadding', false);
    }
    onMediaGalleryFavouriteClick();
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
      handleShareClick, openAskAgentQuestionModal, openAskQuestionModal, openFloorPlanModal,
      openAdvisorHelpModal, openAnswerQuestionModal, handleFavouriteClick, handleAddReviewButtonClick,
    } = this;
    const {
      mediaGallerySlideIndex,
      isMediaGalleryFullscreenActive,
      community,
      profileContacted,
      location,
      onMediaGallerySlideChange,
      onMediaGalleryToggleFullscreen,
      onBackToSearchClicked,
      onSimilarCommunitiesClick,
      user,
      onReviewLinkClicked,
      userSave,
      searchParams,
      setQueryParams,
      onBookATourClick,
      onGCPClick,
      toggleHowSlyWorksVideoPlaying,
      isHowSlyWorksVideoPlaying,
      history,
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
    } = community;

    const {
      careServices, websiteUrl, promoDescription, promoTitle, communitySize, communityInsights,
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
        sd: defaultImageUrl, hd: defaultImageUrl, thumb: defaultImageUrl, url: defaultImageUrl,
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
    const { modal, currentStep } = searchParams;
    const hasCCRC = typeCares.includes('Continuing Care Retirement Community(CCRC)');

    // TODO: move this to a container for EntityReviews handling posts
    const onLeaveReview = () => { };
    // TODO: move this to a container PricingAndAvailability for handling bookings
    const { reviewsValue } = propRatings;
    const ratingsArray = propRatings.ratingsArray || [];
    const reviewsFinal = reviews || [];

    // TODO: mock as USA until country becomes available
    address.country = 'USA';

    const bannerNotification = makeBanner(profileContacted);
    // FIXME: @fonz cleaning this up
    const isAlreadyPricingRequested = profileContacted.pricing;
    const isAlreadyTourScheduled = profileContacted.tour;

    const { estimatedPriceBase, sortedEstimatedPrice } = calculatePricing(community, rgsAux.estimatedPrice);

    const partnerAgent = partnerAgents && partnerAgents.length > 0 ? partnerAgents[0] : null;

    const { autoHighlights, nearbyCities } = rgsAux;


    const pricesList = buildPriceList(community);
    const estimatedPriceList = buildEstimatedPriceList(community);
    const pricingTitle = (pricesList.length === 0 && floorPlans.length > 0) ? 'Pricing and Floor Plans' : 'Pricing';

    const showSimilarEarlier = pricesList.length === 0 && floorPlans.length > 0 && address.city === 'Sacramento' && address.state === 'CA' &&
      (!communityDescription || communityDescription === '');

    return (
      <Fragment>
        {getHelmetForCommunityPage(community, location)}
        <Header noBottomMargin={!!bannerNotification} />
        {bannerNotification && <StyledBannerNotification>{bannerNotification}</StyledBannerNotification>}
        <CommunityDetailPageTemplate>
          <Wrapper>
            <BreadCrumb items={getBreadCrumbsForCommunity({ name, propInfo, address })} />
            <TwoColumn>
              <Body>
                {(images.length > 0 || videos.length > 0) &&
                  <Gallery>
                    <CommunityMediaGallery
                      communityName={name}
                      city={address.city}
                      state={address.state}
                      currentSlide={mediaGallerySlideIndex}
                      images={images}
                      videos={videos}
                      websiteUrl={websiteUrl}
                      onSlideChange={onMediaGallerySlideChange}
                      isFullscreenMode={isMediaGalleryFullscreenActive}
                      onToggleFullscreenMode={onMediaGalleryToggleFullscreen}
                    />
                  </Gallery>
                }
                <StyledCommunitySummary
                  community={community}
                  isAdmin={user && user.admin}
                  userSave={userSave}
                  onFavouriteClick={handleFavouriteClick}
                  onShareClick={handleShareClick}
                />
                {(promoDescription || promoTitle) &&
                  (
                    <StyledOfferNotification
                      palette="warning"
                      title={promoTitle}
                      description={promoDescription}
                      onLearnMoreClick={() => openAskAgentQuestionModal('incentive')}
                      hasLearnMore
                    />
                  )
                }
                {communityInsights && communityInsights.length > 0 &&
                  <TopCollapsibleSection
                    title={`Community Insights at ${name}`}
                  >
                    <MainSection>
                      {communityInsights.map(item => (
                        <IconItemWrapper key={item}>
                          <IconItem icon="check" iconPalette="secondary" borderless={false}>{item}</IconItem>
                        </IconItemWrapper>))
                      }
                    </MainSection>
                  </TopCollapsibleSection>
                }
                {!communityInsights && autoHighlights &&
                  <TopCollapsibleSection
                    title={`Community Highlights at ${name}`}
                  >
                    <MainSection>
                      {autoHighlights.map(item => (
                        <IconItemWrapper key={item}>
                          <IconItem icon="check" iconPalette="secondary" borderless={false}>{item}</IconItem>
                        </IconItemWrapper>))
                      }
                    </MainSection>
                  </TopCollapsibleSection>
                }
                {showSimilarEarlier &&
                  <TopCollapsibleSection title={`Similar ${typeOfCare} Communities`} id="sticky-sidebar-boundary">
                    <MainSection>
                      <SimilarCommunities similarProperties={similarProperties} onSimilarCommunityClick={onSimilarCommunitiesClick} />
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
                }
                <TopCollapsibleSection
                  title={`${pricingTitle} at ${name}`}
                  id="pricing-and-floor-plans"
                >
                  {hasCCRC &&
                    <MainSection>
                      <Paragraph>
                        Pricing for {name} may include both a one time buy-in fee and a monthly component. Connect directly with {name} to find out your pricing.
                      </Paragraph>
                      <Button onClick={!isAlreadyPricingRequested ? onGCPClick : () => openAskAgentQuestionModal('pricing')}>Get Detailed Pricing</Button>
                    </MainSection>
                  }
                  {!hasCCRC && (pricesList.length > 0 || estimatedPriceList.length > 0 || floorPlans.length === 0) &&
                    <CommunityPricingTable
                      name={name}
                      pricesList={pricesList}
                      estimatedPriceList={estimatedPriceList}
                      price={estimatedPriceBase}
                      getPricing={!isAlreadyPricingRequested ? onGCPClick : () => openAskAgentQuestionModal('pricing')}
                      size={communitySize}
                      showToolTip={address.state === 'TN'}
                    />
                  }

                  {!hasCCRC && pricesList.length === 0 && estimatedPriceList.length === 0 && floorPlans.length > 0 &&
                    <div>
                      <MainSection>
                        <CommunityFloorPlansList
                          floorPlans={floorPlans}
                          onItemClick={openFloorPlanModal}
                        />
                      </MainSection>
                      <BottomSection>
                        <GetCurrentAvailabilityContainer
                          community={community}
                          queryParams={{ modal, currentStep }}
                          setQueryParams={setQueryParams}
                          onGotoGetCustomPricing={!isAlreadyPricingRequested ? onGCPClick : () => openAskAgentQuestionModal('pricing')}
                          onSubmitExpressConversion={(e, submitExpressConversion) => {
                            if (isAlreadyPricingRequested) {
                              openAskAgentQuestionModal('pricing');
                            } else {
                              submitExpressConversion(e);
                              onGCPClick();
                            }
                          }}
                        />
                      </BottomSection>
                    </div>
                  }
                </TopCollapsibleSection>
                {floorPlans.length === 0 && pricesList.length === 0 && estimatedPriceList.length === 0 &&
                  <TopCollapsibleSection
                    title={`Get Availability at ${name}`}
                  >
                    <MainSection>
                      <GetCurrentAvailabilityContainer
                        community={community}
                        queryParams={{ modal, currentStep }}
                        setQueryParams={setQueryParams}
                        onGotoGetCustomPricing={!isAlreadyPricingRequested ? onGCPClick : () => openAskAgentQuestionModal('pricing')}
                        onSubmitExpressConversion={(e, submitExpressConversion) => {
                          if (isAlreadyPricingRequested) {
                            openAskAgentQuestionModal('pricing');
                          } else {
                            submitExpressConversion(e);
                            onGCPClick();
                          }
                        }}
                      />
                    </MainSection>
                  </TopCollapsibleSection>
                }
                {(communityDescription || rgsAux.communityDescription) &&
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
                      />
                    </MainSection>
                  </TopCollapsibleSection>
                }
                <TopCollapsibleSection title="How Seniorly Works">
                  <MainSection noPadding>
                    <HowSlyWorksVideo
                      isPlaying={isHowSlyWorksVideoPlaying}
                      onThumbnailClick={toggleHowSlyWorksVideoPlaying}
                      onPause={e => sendEvent('howSlyWorksVideo', e.target.ended ? 'complete' : 'pause', id, e.target.currentTime)}
                      onPlay={e => sendEvent('howSlyWorksVideo', 'play', id, e.target.currentTime)}
                    />
                  </MainSection>
                </TopCollapsibleSection>
                {partnerAgent &&
                  <TopCollapsibleSection title={`Your Seniorly Partner Agent for ${name}`}>
                    <MainSection>
                      <CommunityAgentSection agent={partnerAgent} onAdvisorHelpClick={openAdvisorHelpModal} />
                    </MainSection>
                    <Experiment name="ProfileCTA_ButtonStyle" defaultVariant="FooterSmall">
                      <Variant name="FullWidth">
                        <ButtonBlock>
                          <StyledButton onClick={() => openAskAgentQuestionModal('services')}>Ask a question</StyledButton>
                        </ButtonBlock>
                      </Variant>
                      <Variant name="FooterSmall">
                        <BottomSection>
                          <TextBottomSection
                            heading="Ask about pricing, floor plans, availability, anything."
                            buttonText="Ask a question"
                            onButtonClick={() => openAskAgentQuestionModal('services')}
                          />
                        </BottomSection>
                      </Variant>
                    </Experiment>
                  </TopCollapsibleSection>
                }
                {careServices && careServices.length > 0 &&
                  <TopCollapsibleSection title={`Care Services at ${name}`}>
                    <MainSection>
                      <CommunityCareService careServices={careServices} />
                    </MainSection>
                    <Experiment name="ProfileCTA_ButtonStyle" defaultVariant="FooterSmall">
                      <Variant name="FullWidth">
                        <ButtonBlock>
                          <StyledButton onClick={() => openAskAgentQuestionModal('services')}>Ask About Care Services</StyledButton>
                        </ButtonBlock>
                      </Variant>
                      <Variant name="FooterSmall">
                        <BottomSection>
                          <TextBottomSection
                            heading="Need more detailed information on care services?"
                            buttonText="Ask About Care Services"
                            onButtonClick={() => openAskAgentQuestionModal('services')}
                          />
                        </BottomSection>
                      </Variant>
                    </Experiment>
                  </TopCollapsibleSection>
                }
                <TopCollapsibleSection title={`Amenities at ${name}`}>
                  <MainSection>
                    <CommunityAmenities community={community} />
                  </MainSection>
                  <Experiment name="ProfileCTA_ButtonStyle" defaultVariant="FooterSmall">
                    <Variant name="FullWidth">
                      <ButtonBlock>
                        <StyledButton onClick={() => openAskAgentQuestionModal('services')}>Ask About Amenities</StyledButton>
                      </ButtonBlock>
                    </Variant>
                    <Variant name="FooterSmall">
                      <BottomSection>
                        <TextBottomSection
                          heading="Need more detailed information on amenities?"
                          buttonText="Ask About Amenities"
                          onButtonClick={() => openAskAgentQuestionModal('services')}
                        />
                      </BottomSection>
                    </Variant>
                  </Experiment>
                </TopCollapsibleSection>
                {sortedEstimatedPrice.length > 0 &&
                  <TopCollapsibleSection title={`Compare Costs to Nearby ${typeOfCare} Communities`}>
                    <MainSection>
                      <CommunityPricingComparison community={community} />
                    </MainSection>
                  </TopCollapsibleSection>
                }
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
                  <Experiment name="ProfileCTA_ButtonStyle" defaultVariant="FooterSmall">
                    <Variant name="FullWidth">
                      <ButtonBlock>
                        <StyledButton onClick={handleAddReviewButtonClick}>Write a Review</StyledButton>
                      </ButtonBlock>
                    </Variant>
                    <Variant name="FooterSmall">
                      <BottomSection>
                        <TextBottomSection
                          heading={`Have experience with ${name}?`}
                          subHeading="Your review can help other families with their senior living search."
                          buttonText="Write a Review"
                          onButtonClick={handleAddReviewButtonClick}
                        />
                      </BottomSection>
                    </Variant>
                  </Experiment>
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
                  <Experiment name="ProfileCTA_ButtonStyle" defaultVariant="FooterSmall">
                    <Variant name="FullWidth">
                      <ButtonBlock>
                        <StyledButton onClick={openAskQuestionModal}>Ask a Question</StyledButton>
                      </ButtonBlock>
                    </Variant>
                    <Variant name="FooterSmall">
                      <BottomSection>
                        <TextBottomSection
                          heading="Don't see your question? Be the first to ask this community!"
                          buttonText="Ask a Question"
                          onButtonClick={openAskQuestionModal}
                        />
                      </BottomSection>
                    </Variant>
                  </Experiment>
                </TopCollapsibleSection>
                {rgsAux.stateLicensingWebsite &&
                  <StyledCommunityExtraInfoSection
                    title={`${name} at ${address.city} State Licensing`}
                    description={`${name} is licensed by the state of ${address.state}`}
                    url={rgsAux.stateLicensingWebsite}
                    urlText="Visit the state licensing website"
                  />
                }
                <StyledCommunityExtraInfoSection
                  title="Disclaimer"
                  description="The information on this page has been created to the best of our abilities. To ensure accuracy, please confirm with your local Seniorly Seniorly Partner Agent or directly with the property. If this is your senior living community, we would welcome any updates you wish to provide."
                  url="/providers/housing"
                  urlText="Simply claim your profile by clicking here"
                />
                {!showSimilarEarlier &&
                  <BottomCollapsibleSection title={`Similar ${typeOfCare} Communities`} id="sticky-sidebar-boundary">
                    <MainSection>
                      <SimilarCommunities similarProperties={similarProperties} onSimilarCommunityClick={onSimilarCommunitiesClick} />
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
                }
                <CommunityStickyFooter
                  isAlreadyTourScheduled={isAlreadyTourScheduled}
                  isAlreadyPricingRequested={isAlreadyPricingRequested}
                  onBookATourClick={!isAlreadyTourScheduled ? onBookATourClick : () => openAskAgentQuestionModal('tour')}
                  onGCPClick={!isAlreadyPricingRequested ? onGCPClick : () => openAskAgentQuestionModal('pricing')}
                  // onGCPClick={() => setQueryParams({ modal: CONCIERGE })}
                  onAQClick={() => openAskAgentQuestionModal()}
                />
              </Body>
              <Column>
                <Sticky
                  top={24}
                  bottomBoundary="#sticky-sidebar-boundary"
                >
                  <ConciergeContainer history={history} community={community} queryParams={{ modal, currentStep }} setQueryParams={setQueryParams} />
                </Sticky>
              </Column>
            </TwoColumn>
            {(images.length > 1) &&
              <StyledSection title={`More Photos of ${name}`} titleSize="subtitle">
                <MorePictures gallery={gallery} communityName={name} city={address.city} state={address.state} onPictureClick={this.handleMorePicturesClick} />
              </StyledSection>
            }
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

          {(nearbyCities && nearbyCities.length > 0) &&
            <Wrapper>
              <SeoLinks title={`Top Cities Near ${name}`} links={nearbyCities} />
            </Wrapper>
          }
          {(address.state === 'NY' || address.state === 'FL' || address.state === 'TX') &&
            <Wrapper>
              {(rgsAux && rgsAux.localDetails !== '') ? (
                <Section title="Local Details" titleSize="subtitle">
                  <CommunityLocalDetails localDetails={rgsAux.localDetails} />
                </Section>) : null
              }
            </Wrapper>
          }
        </CommunityDetailPageTemplate>
        <Footer />
      </Fragment>
    );
  }
}

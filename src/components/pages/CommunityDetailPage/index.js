import React, { Fragment, Component } from 'react';
import styled from 'styled-components';
import { object, func, number, bool, string } from 'prop-types';
import Sticky from 'react-stickynode';
import { Lazy } from 'react-lazy';

import { size, palette, assetPath } from 'sly/components/themes';
import { getBreadCrumbsForCommunity, getCitySearchUrl } from 'sly/services/helpers/url';
import { ASK_QUESTION, ADD_RATING, THANK_YOU, ANSWER_QUESTION, FLOOR_PLAN, CONCIERGE, ADVISOR_HELP, HOW_SLY_WORKS_VIDEO }
  from 'sly/constants/modalType';
import { USER_SAVE_DELETE_STATUS } from 'sly/constants/userSave';
import { ACTIONS_ADD_TO_FAVOURITE, ACTIONS_REMOVE_FROM_FAVOURITE } from 'sly/constants/actions';
import { getHelmetForCommunityPage } from 'sly/services/helpers/html_headers';
import { CommunityPageTileTexts as adProps } from 'sly/services/helpers/ad';
import { createBooleanValidator, email, required, usPhone } from 'sly/services/validation';
import { Button, Icon, Block } from 'sly/components/atoms';
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
import ShareCommunityFormContainer from 'sly/containers/ShareCommunityFormContainer';
import ConciergeController from 'sly/controllers/ConciergeController';
import SaveCommunityController from 'sly/controllers/SaveCommunityController';
import NotificationController from 'sly/controllers/NotificationController';
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
import HowSlyWorks from 'sly/components/organisms/HowSlyWorks';
import CommunitySummary from 'sly/components/organisms/CommunitySummary';
import CommunityQuestionAnswers from 'sly/components/organisms/CommunityQuestionAnswers';
import BreadCrumb from 'sly/components/molecules/BreadCrumb';
import CommunityLocalDetails from 'sly/components/organisms/CommunityLocalDetails';
import AdTile from 'sly/components/molecules/AdTile';
import Modal from 'sly/components/molecules/Modal';
import Thankyou from 'sly/components/molecules/Thankyou';
import FullScreenWizardController from 'sly/controllers/FullScreenWizardController';
import CommunityBookATourConfirmationPopup from 'sly/components/organisms/CommunityBookATourConfirmationPopup';
import CommunityAskQuestionAgentFormContainer from 'sly/containers/CommunityAskQuestionAgentFormContainer';
import ConciergeContainer from 'sly/containers/ConciergeContainer';
import GetCurrentAvailabilityFormContainer from 'sly/containers/GetCurrentAvailabilityFormContainer';
import OfferNotification from 'sly/components/molecules/OfferNotification';
import CommunityFloorPlansList from 'sly/components/organisms/CommunityFloorPlansList';
import CommunityFloorPlanPopupFormContainer from 'sly/containers/CommunityFloorPlanPopupFormContainer';
import ModalController from 'sly/controllers/ModalController';
import { calculatePricing } from 'sly/services/helpers/pricing';
import EstimatedCost from 'sly/components/molecules/EstimatedCost';
import TextBottomSection from 'sly/components/molecules/TextBottomSection';
import CommunityAddRatingFormContainer from 'sly/containers/CommunityAddRatingFormContainer';
import CommunityAgentSection from 'sly/components/molecules/CommunityAgentSection';
import AdvisorHelpPopup from 'sly/components/molecules/AdvisorHelpPopup';
import CommunityCareService from 'sly/components/organisms/CommunityCareService';
import CommunityExtraInfoSection from 'sly/components/molecules/CommunityExtraInfoSection';
import IconItem from 'sly/components/molecules/IconItem';
import VideoThumbnail from 'sly/components/molecules/VideoThumbnail';
import CommunityAskQuestionFormContainer from 'sly/containers/CommunityAskQuestionFormContainer';
import CommunityLeaveAnAnswerFormContainer from 'sly/containers/CommunityLeaveAnAnswerFormContainer';

const BackToSearch = styled.div`
  text-align: center
`;

const AdTileWrapper = styled.div`
  margin-bottom: ${size('spacing.large')};
`;

const GetAvailabilitySuccessBox = styled.div`
  display: flex;

  > :first-child {
    margin-right: ${size('spacing.regular')};
  }
`;

const StyledCommunitySummary = styled(CommunitySummary)`
  margin-bottom: ${size('spacing.xLarge')};
  margin-top: -${size('spacing.xLarge')};
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

const hasAllUserData = createBooleanValidator({
  fullName: [required],
  email: [required, email],
  phone: [required, usPhone],
});

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

const StyledVideo = styled.video`
  width: 100%!important;
  max-height: 100%;
  object-fit: fill;
`;

const Header = makeHeader();
const TwoColumn = makeTwoColumn('div');
const Body = makeBody('div');
const Column = makeColumn('aside');
const Footer = makeFooter('footer');
const Wrapper = makeWrapper('div');
const Gallery = makeGallery('div');

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
    isShareCommunityModalVisible: bool,
    onBackToSearchClicked: func,
    onReviewLinkClicked: func,
    onConciergeNumberClicked: func,
    onLiveChatClicked: func,
    onReceptionNumberClicked: func,
    setModal: func,
    userSave: object,
    searchParams: object,
    setQueryParams: func,
    onBookATourClick: func,
    onGCPClick: func,
    isAlreadyTourScheduled: bool,
    isAlreadyPricingRequested: bool,
    isAskAgentQuestionModalVisible: bool,
    onToggleAskAgentQuestionModal: func,
    askAgentQuestionType: string,
    userAction: object,
    onFloorPlanModalToggle: func,
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

  handleShareCommunitySuccess = () => {
    const { onShareCommunityModalClose } = this.props;
    onShareCommunityModalClose();
  }

  render() {
    const {
      mediaGallerySlideIndex,
      isMediaGalleryFullscreenActive,
      community,
      location,
      onMediaGallerySlideChange,
      onMediaGalleryToggleFullscreen,
      onMediaGalleryFavouriteClick,
      onMediaGalleryShareClick,
      onBackToSearchClicked,
      onShareCommunityModalClose,
      isShareCommunityModalVisible,
      user,
      onReviewLinkClicked,
      setModal,
      userSave,
      searchParams,
      setQueryParams,
      onBookATourClick,
      onGCPClick,
      isAlreadyTourScheduled,
      isAlreadyPricingRequested,
      isAskAgentQuestionModalVisible,
      onToggleAskAgentQuestionModal,
      askAgentQuestionType,
      userAction,
      onFloorPlanModalToggle,
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
    } = community;

    let initedUserSave;
    if (userSave) {
      initedUserSave = userSave.status !== USER_SAVE_DELETE_STATUS ? userSave : null;
    }

    const {
      careServices, websiteUrl, promoDescription, promoTitle,
    } = propInfo;

    let images = gallery.images || [];
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
    const { userDetails } = userAction;
    const {
      communityDescription,
      staffDescription,
      residentDescription,
      ownerExperience,
      typeCare,
    } = propInfo;

    const typeOfCare = typeCare[0];
    const { modal, currentStep } = searchParams;

    // TODO: move this to a container for EntityReviews handling posts
    const onLeaveReview = () => {};
    // TODO: move this to a container PricingAndAvailability for handling bookings
    const { reviewsValue } = propRatings;
    const ratingsArray = propRatings.ratingsArray || [];
    const reviewsFinal = reviews || [];

    // TODO: mock as USA until country becomes available
    address.country = 'USA';

    let bannerNotification = null;
    if (isAlreadyTourScheduled && isAlreadyPricingRequested) {
      bannerNotification = 'We have received your tour and pricing request. Your Seniorly Partner Agent is checking with this community and will get back to you shortly.';
    } else if (isAlreadyTourScheduled) {
      bannerNotification = 'We have received your tour request. Your Seniorly Partner Agent is checking with this community and will get back to you shortly.';
    } else if (isAlreadyPricingRequested) {
      bannerNotification = 'We have received your pricing request. Your Seniorly Partner Agent is checking with this community and will get back to you shortly.';
    }
    const { estimatedPriceBase, sortedEstimatedPrice } = calculatePricing(community, rgsAux.estimatedPrice);

    const partnerAgent = partnerAgents && partnerAgents.length > 0 ? partnerAgents[0] : null;
    const { autoHighlights } = rgsAux;
    return (
      <Fragment>
        {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
        {getHelmetForCommunityPage(community, location)}
        <Header bannerNotification={bannerNotification} />
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
                  isFavourited={!!initedUserSave}
                  onFavouriteClick={onMediaGalleryFavouriteClick}
                  onShareClick={onMediaGalleryShareClick}
                />
                {(promoDescription || promoTitle) &&
                  (
                    <StyledOfferNotification
                      palette="warning"
                      title={promoTitle}
                      description={promoDescription}
                      onLearnMoreClick={onToggleAskAgentQuestionModal}
                      hasLearnMore
                    />
                  )
                }
                {autoHighlights &&
                  <TopCollapsibleSection
                    title={`Community highlights at  ${name}`}
                  >
                    <MainSection>
                      {autoHighlights.map(item => (
                        <IconItemWrapper>
                          <IconItem icon="care" iconPalette="secondary" borderless={false}>{item}</IconItem>
                        </IconItemWrapper>))
                      }
                    </MainSection>
                  </TopCollapsibleSection>
                }
                <TopCollapsibleSection
                  title={`Pricing and Floor Plans at ${name}`}
                >
                  <MainSection>
                    {floorPlans.length > 0 &&
                      <ModalController>
                        {({ show }) => (
                          <CommunityFloorPlansList
                            typeOfCare={typeOfCare}
                            floorPlans={floorPlans}
                            onItemClick={(floorPlan) => {
                              show(FLOOR_PLAN, floorPlan);
                              onFloorPlanModalToggle(floorPlan);
                            }}
                          />
                        )}
                      </ModalController>
                    }
                    {floorPlans.length === 0 &&
                      <EstimatedCost
                        getPricing={!isAlreadyPricingRequested ? onGCPClick : e => onToggleAskAgentQuestionModal(e, 'pricing')}
                        community={community}
                        price={estimatedPriceBase}
                      />
                    }
                  </MainSection>
                  {floorPlans.length > 0 &&
                  <BottomSection>
                    <ConciergeController
                      communitySlug={community.id}
                      queryParams={{ modal, currentStep }}
                      setQueryParams={setQueryParams}
                      gotoGetCustomPricing={!isAlreadyPricingRequested ? onGCPClick : e => onToggleAskAgentQuestionModal(e, 'pricing')}
                    >
                      {({ concierge, submitExpressConversion, userDetails }) => {
                          if (concierge.contactRequested) {
                            let availabilityDoneText = 'Your Seniorly Guide will reach out to you regarding this community.';
                            if (!hasAllUserData(userDetails)) {
                              availabilityDoneText = 'We received your request, check your inbox shortly.';
                            }
                            return (
                              <GetAvailabilitySuccessBox>
                                <Icon icon="round-checkmark" />
                                <Block weight="bold">{availabilityDoneText}</Block>
                              </GetAvailabilitySuccessBox>
                            );
                          }
                          return (
                            <GetCurrentAvailabilityFormContainer
                              submitExpressConversion={(e) => {
                                if (isAlreadyPricingRequested) {
                                  onToggleAskAgentQuestionModal(e, 'pricing');
                                } else {
                                  submitExpressConversion(e);
                                  onGCPClick(e);
                                }
                              }}
                              community={community}
                            />
                          );
                        }
                      }
                    </ConciergeController>
                  </BottomSection>
                  }
                </TopCollapsibleSection>
                {(communityDescription || rgsAux.communityDescription) &&
                  <TopCollapsibleSection title={`Details on ${name}`}>
                    <MainSection>
                      <CommunityDetails
                        communityName={name}
                        communityDescription={communityDescription}
                        rgsAuxDescription={rgsAux.communityDescription}
                        staffDescription={staffDescription}
                        residentDescription={residentDescription}
                        ownerExperience={ownerExperience}
                        contract={community.contacts && community.contacts.length > 0} // TODO: cheange to use contract info once api sends it
                      />
                    </MainSection>
                  </TopCollapsibleSection>
                }
                <TopCollapsibleSection title="How Seniorly Works">
                  <MainSection noPadding>
                    <Fragment>
                      <ModalController>
                        {({
                            show, modalType, hide,
                          }) => (
                          <VideoThumbnailWrapper>
                            <VideoThumbnail src={assetPath('images/how-sly-works-video-thumbnail.png')} onClick={() => show(HOW_SLY_WORKS_VIDEO)} />
                            <Modal
                              onClose={() => hide()}
                              isOpen={modalType === HOW_SLY_WORKS_VIDEO}
                              layout="fullScreen"
                              closeable
                            >
                              <StyledVideo autoPlay controls controlsList="nodownload">
                                <source src="https://d1qiigpe5txw4q.cloudfront.net/appassets/seniorly_hiw_1.mp4" type="video/mp4" />
                                <source src="https://d1qiigpe5txw4q.cloudfront.net/appassets/seniorly_hiw_1.webm" type="video/webm" />
                              </StyledVideo>
                            </Modal>
                          </VideoThumbnailWrapper>
                        )}
                      </ModalController>

                    </Fragment>
                  </MainSection>
                </TopCollapsibleSection>
                {partnerAgent &&
                  <TopCollapsibleSection title={`Your Seniorly Partner Agent for ${name}`}>
                    <MainSection>
                      <ModalController>
                        {({ show }) => (
                          <CommunityAgentSection agent={partnerAgent} onAdvisorHelpClick={() => show(ADVISOR_HELP)} />
                        )}
                      </ModalController>
                    </MainSection>
                    <BottomSection>
                      <TextBottomSection
                        heading="Ask about pricing, floor plans, availability, anything."
                        subHeading=" Using a Seniorly Partner Agent is a free service for you."
                        buttonText="Send a message"
                        onButtonClick={e => onToggleAskAgentQuestionModal(e, 'services')}
                      />
                    </BottomSection>
                  </TopCollapsibleSection>
                }
                <ModalController>
                  {({ modalType, hide }) => (
                    <Modal closeable isOpen={modalType === ADVISOR_HELP} onClose={hide}>
                      <AdvisorHelpPopup onButtonClick={hide} />
                    </Modal>
                  )}
                </ModalController>
                {careServices && careServices.length > 0 &&
                  <TopCollapsibleSection title={`Care Services at ${name}`}>
                    <MainSection>
                      <CommunityCareService careServices={careServices} />
                    </MainSection>
                    <BottomSection>
                      <TextBottomSection
                        heading="Need more detailed information on care services?"
                        subHeading="Your Seniorly Partner Agent can consult with you on your individual care needs."
                        buttonText="Ask about care services"
                        onButtonClick={e => onToggleAskAgentQuestionModal(e, 'services')}
                      />
                    </BottomSection>
                  </TopCollapsibleSection>
                }
                <TopCollapsibleSection title={`Amenities at ${name}`}>
                  <MainSection>
                    <CommunityAmenities community={community} />
                  </MainSection>
                  <BottomSection>
                    <TextBottomSection
                      heading="Need more detailed information on amenities?"
                      subHeading=" Using a Seniorly Partner Agent is a free service for you."
                      buttonText="Ask about amenities"
                      onButtonClick={e => onToggleAskAgentQuestionModal(e, 'services')}
                    />
                  </BottomSection>
                </TopCollapsibleSection>
                {sortedEstimatedPrice.length > 0 &&
                  <TopCollapsibleSection title={`Compare to other ${typeOfCare} communities in the area`}>
                    <MainSection>
                      <CommunityPricingComparison community={community} />
                    </MainSection>
                  </TopCollapsibleSection>
                }
                <TopCollapsibleSection
                  title={`Reviews at ${name}`}
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
                  <BottomSection>
                    <TextBottomSection
                      heading={`Have experience with ${name}?`}
                      subHeading="Your review can help other families with their senior living search."
                      buttonText="Write a review"
                      onButtonClick={() => setModal(ADD_RATING)}
                    />
                  </BottomSection>
                </TopCollapsibleSection>
                <TopCollapsibleSection title={`Questions about ${name}`}>
                  <MainSection>
                    <ModalController>
                      {({ show }) => (
                        <CommunityQuestionAnswers
                          communityName={name}
                          communitySlug={id}
                          questions={questions}
                          communityFaQs={[]} // TODO: add communityFaQs after api changes are merged
                          onLeaveAnswerClick={(type, questionId) => show(ANSWER_QUESTION, { type, questionId })}
                          user={user}
                        />
                      )}
                    </ModalController>
                  </MainSection>
                  <BottomSection>
                    <ModalController>
                      {({ show }) => (
                        <TextBottomSection
                          heading="Don't see your question? Be the first to ask this community!"
                          buttonText="Ask a Question"
                          onButtonClick={() => show(ASK_QUESTION)}
                        />
                      )}
                    </ModalController>
                  </BottomSection>
                </TopCollapsibleSection>
                <ModalController>
                  {({ modalType, show, hide }) => (
                    <Modal
                      closeable
                      isOpen={modalType === ASK_QUESTION}
                      onClose={() => hide()}
                    >
                      <CommunityAskQuestionFormContainer communityName={name} communitySlug={id} setModal={show} user={user} />
                    </Modal>
                  )}
                </ModalController>
                <ModalController>
                  {({ modalType, modalEntity, hide }) => {
                    let questionToAnswer = {
                      contentData: '',
                      id: '',
                    };
                    if (modalEntity && modalType === ANSWER_QUESTION) {
                      const { type, questionId } = modalEntity;
                      questionToAnswer = questions.find(question => question.type === type && question.id === questionId);
                      if (!questionToAnswer) {
                        questionToAnswer = communityFaQs.find(communityFaQ => communityFaQ.type === type && communityFaQ.id === questionId);
                      }
                    }

                    return (
                      <Modal
                        closeable
                        isOpen={modalType === ANSWER_QUESTION}
                        onClose={() => hide()}
                      >
                        <CommunityLeaveAnAnswerFormContainer
                          onSuccess={() => hide()}
                          communitySlug={id}
                          questionText={questionToAnswer.contentData}
                          questionId={questionToAnswer.id}
                        />
                      </Modal>
                    );
                  }}
                </ModalController>
                <ModalController>
                  {({ modalType, hide }) => (
                    <Modal
                      closeable
                      isOpen={modalType === THANK_YOU}
                      onClose={() => hide()}
                    >
                      <Thankyou />
                    </Modal>
                  )}
                </ModalController>
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
                <BottomCollapsibleSection title={`Similar ${typeOfCare} Communities`} id="sticky-sidebar-boundary">
                  <MainSection>
                    <SimilarCommunities similarProperties={similarProperties} />
                    <ConciergeController communitySlug={community.id} queryParams={{ modal, currentStep }} setQueryParams={setQueryParams}>
                      {({ gotoAdvancedInfo }) => (
                        <AdTileWrapper>
                          <AdTile {...adProps} onClick={() => gotoAdvancedInfo()} />
                        </AdTileWrapper>
                      )
                      }
                    </ConciergeController>
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
                <CommunityStickyFooter
                  isAlreadyTourScheduled={isAlreadyTourScheduled}
                  isAlreadyPricingRequested={isAlreadyPricingRequested}
                  onBookATourClick={!isAlreadyTourScheduled ? onBookATourClick : e => onToggleAskAgentQuestionModal(e, 'tour')}
                  // onGCPClick={!isAlreadyPricingRequested ? onGCPClick : e => onToggleAskAgentQuestionModal(e, 'pricing')}
                  onGCPClick={() => setQueryParams({ modal: CONCIERGE })}
                  onAQClick={onToggleAskAgentQuestionModal}
                />
                {(searchParams.action === ACTIONS_ADD_TO_FAVOURITE ||
                searchParams.action === ACTIONS_REMOVE_FROM_FAVOURITE) &&
                <NotificationController>
                  {({
                    notifyInfo,
                    notifyError,
                  }) => <SaveCommunityController notifyInfo={notifyInfo} notifyError={notifyError} />}
                </NotificationController>
                }
                <Modal
                  closeable
                  isOpen={searchParams.modal === THANK_YOU}
                  onClose={() => setQueryParams({ modal: null })}
                >
                  <Thankyou />
                </Modal>
                <Modal
                  closeable
                  isOpen={isShareCommunityModalVisible}
                  onClose={onShareCommunityModalClose}
                >
                  <NotificationController>
                    {({
                      notifyInfo,
                    }) => (
                      <ShareCommunityFormContainer
                        mainImage={mainImage}
                        fromEnabled={!user}
                        communitySlug={community.id}
                        notifyInfo={notifyInfo}
                        onSuccess={this.handleShareCommunitySuccess}
                      />
                    )}
                  </NotificationController>
                </Modal>
                <ModalController>
                  {({ modalType, modalEntity, hide }) => (
                    <Modal
                      noPadding
                      closeable
                      isOpen={modalType === FLOOR_PLAN}
                      onClose={() => { onFloorPlanModalToggle(); hide(); }}
                    >
                      {modalEntity && <CommunityFloorPlanPopupFormContainer community={community} user={user} typeOfCare={typeOfCare} floorPlanInfo={modalEntity.info} userDetails={userDetails} postSubmit={hide} />}
                    </Modal>
                  )}
                </ModalController>
                <Modal
                  onClose={() => setModal(null)}
                  isOpen={modal === ADD_RATING}
                  closeable
                >
                  <CommunityAddRatingFormContainer user={user} communitySlug={id} communityName={name} setModal={setModal} />
                </Modal>
                <FullScreenWizardController>
                  {({ isConfirmationModalVisible, toggleConfirmationModal, type }) => {
                      let heading = null;
                      if (type === 'booking') {
                        heading = 'Tour Request Sent!';
                      } else if (type === 'pricing') {
                        heading = 'Custom pricing request sent!';
                      }
                      let subheading = null;
                      if (type === 'booking') {
                        subheading = 'Your Seniorly Partner Agent will check if this community is available at this time. They will get back to you shortly by phone or email.';
                      } else if (type === 'pricing') {
                        subheading = 'Your Seniorly Partner Agent will work with you to get your exact pricing. They will reach out to you soon.';
                      }
                      const props = {
                        similarCommunities: similarProperties,
                        similarCommunititesHref: getCitySearchUrl({ propInfo, address }),
                        onTileClick: toggleConfirmationModal,
                        heading,
                        subheading,
                      };
                      return (
                        <Modal
                          onClose={toggleConfirmationModal}
                          isOpen={isConfirmationModalVisible}
                          closeable
                        >
                          <CommunityBookATourConfirmationPopup {...props} />
                        </Modal>
                      );
                  }}
                </FullScreenWizardController>
                <Modal
                  closeable
                  isOpen={isAskAgentQuestionModalVisible}
                  onClose={onToggleAskAgentQuestionModal}
                >
                  <NotificationController>
                    {({
                      notifyInfo,
                    }) => {
                      const { name, address } = community;
                      const { city } = address;
                      let heading = `Ask your Seniorly Partner Agent a question about ${name} in ${city}.`;
                      let placeholder = `Hi Rachel, I have a question about ${name} in ${city}...`;
                      let description = null;
                      let question = null;
                      const agentImageUrl = assetPath('images/agent-xLarge.png');

                      if (askAgentQuestionType === 'tour') {
                        heading = 'We have received your tour request.';
                        description = 'Your Seniorly Partner Agent will reach out to you soon. Feel free to ask them any questions in the meantime.';
                        placeholder = `Hi, I have a question about my tour with ${name}...`;
                      } else if (askAgentQuestionType === 'pricing') {
                        heading = 'We have received your custom pricing request.';
                        description = 'Your Seniorly Partner Agent will reach out to you soon. Feel free to ask them any questions in the meantime.';
                      } else if (askAgentQuestionType === 'offer') {
                        heading = `Ask your Seniorly Partner Agent about the holiday incentive at ${name}`;
                        question = `Hi, I am interested in knowing more about the holiday promotion at ${name}. I am looking for...`;
                      } else if (askAgentQuestionType === 'services') {
                        heading = `Ask your Seniorly Partner Agent about services provided at ${name}`;
                        question = `Hi, I need .... and am interested in knowing whether ${name} has ...`;
                      }

                      return (
                        <CommunityAskQuestionAgentFormContainer
                          toggleAskAgentQuestionModal={onToggleAskAgentQuestionModal}
                          notifyInfo={notifyInfo}
                          community={community}
                          heading={heading}
                          description={description}
                          agentImageUrl={agentImageUrl}
                          placeholder={placeholder}
                          question={question}
                        />
                    );
                  }}
                  </NotificationController>
                </Modal>
              </Body>
              <Column>
                <Sticky
                  top={24}
                  bottomBoundary="#sticky-sidebar-boundary"
                >
                  <ConciergeContainer community={community} queryParams={{ modal, currentStep }} setQueryParams={setQueryParams} />
                </Sticky>
              </Column>
            </TwoColumn>
            {(images.length > 1) &&
              <StyledSection title={`More photos of ${name}`} titleSize="subtitle">
                <MorePictures gallery={gallery} communityName={name} city={address.city} state={address.state} onPictureClick={this.handleMorePicturesClick} />
              </StyledSection>
            }
            <Section title={`Map view of ${name}`} titleSize="subtitle" />
          </Wrapper>
          <StyledSection>
            <Lazy ltIE9 component="div">
              <CommunityMap
                community={community}
                similarProperties={similarProperties}
              />
            </Lazy>
          </StyledSection>
          <Wrapper>
            {(rgsAux && rgsAux.localDetails !== '') ? (
              <Section title="Local Details" titleSize="subtitle">
                <CommunityLocalDetails localDetails={rgsAux.localDetails} />
              </Section>) : null
            }
          </Wrapper>
        </CommunityDetailPageTemplate>
        <Footer />
      </Fragment>
    );
  }
}

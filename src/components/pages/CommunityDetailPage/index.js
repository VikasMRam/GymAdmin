import React, { Fragment, Component } from 'react';
import styled from 'styled-components';
import { object, func, number, bool, string } from 'prop-types';
import Sticky from 'react-stickynode';
import { Lazy } from 'react-lazy';

import { size, assetPath } from 'sly/components/themes';
import { getBreadCrumbsForCommunity, getCitySearchUrl } from 'sly/services/helpers/url';
import { ASK_QUESTION, ADD_RATING, THANK_YOU, ANSWER_QUESTION, FLOOR_PLAN, CONCIERGE, ADVISOR_HELP } from 'sly/constants/modalType';
import { USER_SAVE_DELETE_STATUS } from 'sly/constants/userSave';
import { ACTIONS_ADD_TO_FAVOURITE, ACTIONS_REMOVE_FROM_FAVOURITE } from 'sly/constants/actions';
import { getHelmetForCommunityPage } from 'sly/services/helpers/html_headers';
import { CommunityPageTileTexts as adProps } from 'sly/services/helpers/ad';
import { Link, Heading, Hr, Button, Icon, Block } from 'sly/components/atoms';
import { CommunityDetailPageTemplate, makeHeader, makeColumn, makeBody, makeFooter }
  from 'sly/components/templates/CommunityDetailPageTemplate';
import ShareCommunityFormContainer from 'sly/containers/ShareCommunityFormContainer';
import ConciergeController from 'sly/controllers/ConciergeController';
import SaveCommunityController from 'sly/controllers/SaveCommunityController';
import NotificationController from 'sly/controllers/NotificationController';
import CommunityStickyFooter from 'sly/components/organisms/CommunityStickyFooter';
import CommunityStickyHeader from 'sly/components/organisms/CommunityStickyHeader';
import CollapsibleSection from 'sly/components/molecules/CollapsibleSection';
import Section from 'sly/components/molecules/Section';
import CareServicesList from 'sly/components/organisms/CareServicesList';
import EntityReviews from 'sly/components/organisms/EntityReviews';
import CommunityDetails from 'sly/components/organisms/CommunityDetails';
import PricingAndAvailability from 'sly/components/organisms/PricingAndAvailability';
import SimilarCommunities from 'sly/components/organisms/SimilarCommunities';
import AmenitiesAndFeatures from 'sly/components/organisms/AmenitiesAndFeatures';
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
import CommunitySidebarWidget from 'sly/components/organisms/CommunitySidebarWidget';
import FullScreenWizardController from 'sly/controllers/FullScreenWizardController';
import CommunityBookATourConfirmationPopup from 'sly/components/organisms/CommunityBookATourConfirmationPopup';
import CommunityAskQuestionAgentFormContainer from 'sly/containers/CommunityAskQuestionAgentFormContainer';
import ConciergeContainer from 'sly/containers/ConciergeContainer';
import GetCurrentAvailabilityFormContainer from 'sly/containers/GetCurrentAvailabilityFormContainer';
import OfferNotification from 'sly/components/molecules/OfferNotification';
import { createBooleanValidator, email, required, usPhone } from 'sly/services/validation';
import CommunityFloorPlansList from 'sly/components/organisms/CommunityFloorPlansList/index';
import CommunityFloorPlanPopupFormContainer from 'sly/containers/CommunityFloorPlanPopupFormContainer';
import ModalController from 'sly/controllers/ModalController';
import { calculatePricing, findPercentage } from 'sly/services/helpers/pricing';
import EstimatedCost from 'sly/components/molecules/EstimatedCost';
import PriceBar from 'sly/components/molecules/PriceBar';
import CommunityReviewsBottomSection from 'sly/components/molecules/CommunityReviewsBottomSection/index';
import CommunityAddRatingFormContainer from 'sly/containers/CommunityAddRatingFormContainer';
import CommunityAgentSection from 'sly/components/molecules/CommunityAgentSection';
import AdvisorHelpPopup from 'sly/components/molecules/AdvisorHelpPopup';

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

const Body = makeBody('main');
const Column = makeColumn('aside');
const Footer = makeFooter('footer');

const PriceLabel = styled.div`
  margin-bottom: ${size('spacing.small')};
`;

const StyledPriceBar = styled(PriceBar)`
  margin-bottom: ${size('spacing.small')};
`;

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
    isStickyHeaderVisible: bool,
    isShareCommunityModalVisible: bool,
    onToggleStickyHeader: func,
    onBackToSearchClicked: func,
    onReviewLinkClicked: func,
    onConciergeNumberClicked: func,
    onLiveChatClicked: func,
    onReceptionNumberClicked: func,
    setModal: func,
    setQuestionToAsk: func,
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

  componentDidMount() {
    // if page is reloaded at scroll position where sticky header should be visible, don't wait for scroll to happen
    this.handleScroll();
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  // TODO: use ref forwarding once we upgrade to react 16.3+: https://reactjs.org/docs/forwarding-refs.html
  communityReviewsRef = React.createRef();
  pricingAndFloorPlansRef = React.createRef();
  communitySummaryRef = React.createRef();
  amenitiesAndFeaturesRef = React.createRef();

  handleScroll = () => {
    if (this.communitySummaryRef.current) {
      const { onToggleStickyHeader, isStickyHeaderVisible } = this.props;
      const rect = this.communitySummaryRef.current.getBoundingClientRect();
      const elemTop = rect.top;
      const isVisible = elemTop < 0;

      // Important: don't trigger rerender if sticky header visiblity hasn't changed
      if (isStickyHeaderVisible !== isVisible) {
        onToggleStickyHeader();
      }
    }
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
      isStickyHeaderVisible,
      isShareCommunityModalVisible,
      user,
      onReviewLinkClicked,
      onConciergeNumberClicked,
      onLiveChatClicked,
      onReceptionNumberClicked,
      setModal,
      setQuestionToAsk,
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
      rates,
      startingRate,
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
      mainImage,
      partnerAgents,
    } = community;

    let initedUserSave;
    if (userSave) {
      initedUserSave = userSave.status !== USER_SAVE_DELETE_STATUS ? userSave : null;
    }

    const {
      careServices, websiteUrl, serviceHighlights,
      promoDescription, promoTitle,
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

    const {
      communityHighlights,
      personalSpace,
      personalSpaceOther,
      communitySpace,
      communitySpaceOther,
      nonCareServices,
      nonCareServicesOther,
      languages,
      languagesOther,
    } = propInfo;
    const typeOfCare = typeCare[0];
    const { modal, entityId, currentStep } = searchParams;
    let questionToAnswer = null;
    if (modal === ANSWER_QUESTION && entityId) {
      questionToAnswer = questions.find(question => question.id === entityId);
    }
    // To clear the flag incase the question is not found
    if (questionToAnswer === undefined && entityId) {
      setQuestionToAsk(null);
    }

    // TODO: move this to a container for EntityReviews handling posts
    const onLeaveReview = () => {};
    // TODO: move this to a container PricingAndAvailability for handling bookings
    const { hasSlyReviews, hasWebReviews, reviewsValue } = propRatings;
    const ratingsArray = propRatings.ratingsArray || [];
    const reviewsFinal = reviews || [];
    const serviceHighlightsFinal = serviceHighlights || [];
    const isCCRC = typeCare && (typeCare.indexOf('Continuing Care Retirement Community(CCRC)') !== -1);
    const ratesProvided = (rates && rates === 'Provided');

    // TODO: mock as USA until country becomes available
    address.country = 'USA';
    const stickyHeaderItems = [
      { label: 'Summary', ref: this.communitySummaryRef },
      { label: 'Pricing & Floor Plans', ref: this.pricingAndFloorPlansRef },
      { label: 'Reviews', ref: this.communityReviewsRef },
    ];

    let bannerNotification = null;
    if (isAlreadyTourScheduled && isAlreadyPricingRequested) {
      bannerNotification = 'We have received your tour and pricing request. Your partner agent is checking with this community and will get back to you shortly.';
    } else if (isAlreadyTourScheduled) {
      bannerNotification = 'We have received your tour request. Your partner agent is checking with this community and will get back to you shortly.';
    } else if (isAlreadyPricingRequested) {
      bannerNotification = 'We have received your pricing request. Your partner agent is checking with this community and will get back to you shortly.';
    }
    const Header = makeHeader(bannerNotification);
    const {
      estimatedPriceBase, estimatedPriceLabelMap, sortedEstimatedPrice, maxPrice,
    } = calculatePricing({
      community, estimatedPrice: rgsAux.estimatedPrice, address,
    });

    const partnerAgent = partnerAgents.length > 0 ? partnerAgents[0] : null;

    return (
      <Fragment>
        {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
        {getHelmetForCommunityPage(community, location)}
        <CommunityStickyHeader
          items={stickyHeaderItems}
          visible={isStickyHeaderVisible}
        />
        <Header />
        <CommunityDetailPageTemplate>
          <BreadCrumb items={getBreadCrumbsForCommunity({ name, propInfo, address })} />
          <Body>
            {(images.length > 0 || videos.length > 0) &&
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
            }

            <StyledCommunitySummary
              innerRef={this.communitySummaryRef}
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
              )}
            {partnerAgent &&
              <CollapsibleSection
                title={`Your advisor for ${name}`}
              >
                <ModalController>
                  {({ show }) => (
                    <CommunityAgentSection agent={partnerAgent} onAdvisorHelpClick={() => show(ADVISOR_HELP)} />
                  )}
                </ModalController>
              </CollapsibleSection>
            }
            <ModalController>
              {({ modalType, hide }) => (
                <Modal closeable isOpen={modalType === ADVISOR_HELP} onClose={hide}>
                  <AdvisorHelpPopup onButtonClick={hide} />
                </Modal>
              )}
            </ModalController>
            <CollapsibleSection
              title={`Pricing and Floor Plans at ${name}`}
              botttomSection={
                floorPlans.length > 0 &&
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
                }
              innerRef={this.pricingAndFloorPlansRef}
            >
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
            </CollapsibleSection>
            {sortedEstimatedPrice.length > 0 &&
              <CollapsibleSection title="Compare to other communities in the area">
                <article id="pricing-and-floor-plans-comparison">
                  {sortedEstimatedPrice.map(object => (
                    <Fragment key={object[1]}>
                      <PriceLabel>{estimatedPriceLabelMap[object[0]]}</PriceLabel>
                      <StyledPriceBar
                        width={findPercentage(object[1], maxPrice)}
                        price={object[1]}
                      />
                    </Fragment>
                  ))}
                </article>
              </CollapsibleSection>
            }
            {(communityDescription || rgsAux.communityDescription) &&
              <CollapsibleSection title="Community Details">
                <CommunityDetails
                  communityName={name}
                  communityDescription={communityDescription}
                  rgsAuxDescription={rgsAux.communityDescription}
                  staffDescription={staffDescription}
                  residentDescription={residentDescription}
                  ownerExperience={ownerExperience}
                  contract={community.contacts && community.contacts.length > 0} // TODO: cheange to use contract info once api sends it
                />
              </CollapsibleSection>
            }
            <CollapsibleSection paddedContent title="Care Services">
              <CareServicesList
                communityName={name}
                careServices={careServices}
                serviceHighlights={serviceHighlightsFinal}
              />
            </CollapsibleSection>
            <CollapsibleSection
              paddedContent
              title="Amenities & Features"
              innerRef={this.amenitiesAndFeaturesRef}
            >
              <AmenitiesAndFeatures
                communityName={name}
                communityHighlights={communityHighlights}
                personalSpace={personalSpace}
                personalSpaceOther={personalSpaceOther}
                communitySpace={communitySpace}
                communitySpaceOther={communitySpaceOther}
                nonCareServices={nonCareServices}
                nonCareServicesOther={nonCareServicesOther}
                languages={languages}
                languagesOther={languagesOther}
              />
            </CollapsibleSection>
            <CollapsibleSection
              title={`Reviews at ${name}`}
              innerRef={this.communityReviewsRef}
              botttomSection={<CommunityReviewsBottomSection communityName={name} onButtonClick={() => setModal(ADD_RATING)} />}
            >
              <EntityReviews
                reviewsValue={reviewsValue}
                reviews={reviewsFinal}
                reviewRatings={ratingsArray}
                onLeaveReview={onLeaveReview}
                onReviewLinkClicked={onReviewLinkClicked}
              />
            </CollapsibleSection>
            <CollapsibleSection title="Questions">
              <CommunityQuestionAnswers
                communityName={name}
                communitySlug={id}
                questions={questions}
                setModal={setModal}
                isQuestionModalOpenValue={modal === ASK_QUESTION}
                answerQuestion={setQuestionToAsk}
                answerQuestionValue={questionToAnswer}
                user={user}
              />
            </CollapsibleSection>

            <CollapsibleSection title="Similar Communities">
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
            </CollapsibleSection>
            <Hr id="sticky-sidebar-boundary" />
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
                    subheading = 'Your partner agent will check if this community is available at this time. They will get back to you shortly by phone or email.';
                  } else if (type === 'pricing') {
                    subheading = 'Your partner agent will work with you to get your exact pricing. They will reach out to you soon.';
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
                  let heading = `Ask your partner agent a question about ${name} in ${city}.`;
                  let placeholder = `Hi Rachel, I have a question about ${name} in ${city}...`;
                  let description = null;
                  let question = null;
                  const agentImageUrl = assetPath('images/agent-xLarge.png');

                  if (askAgentQuestionType === 'tour') {
                    heading = 'We have received your tour request.';
                    description = 'Your partner agent will reach out to you soon. Feel free to ask them any questions in the meantime.';
                    placeholder = `Hi Rachel, I have a question about my tour with ${name}...`;
                  } else if (askAgentQuestionType === 'pricing') {
                    heading = 'We have received your custom pricing request.';
                    description = 'Your partner agent will reach out to you soon. Feel free to ask them any questions in the meantime.';
                  } else if (askAgentQuestionType === 'offer') {
                    heading = `Ask your partner agent about the holiday incentive at ${name}`;
                    question = `Hi, I am interested in knowing more about the holiday promotion at ${name}. I am looking for...`;
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
            <Section title={`Map View of ${name}`}>
              <Lazy ltIE9 component="div">
                <CommunityMap
                  community={community}
                  similarProperties={similarProperties}
                />
              </Lazy>
            </Section>
            {(images.length > 1) &&
              <Section title="More Pictures">
                <MorePictures gallery={gallery} communityName={name} city={address.city} state={address.state} onPictureClick={this.handleMorePicturesClick} />
              </Section>
            }
            <Section title="How Seniorly Works">
              <HowSlyWorks />
            </Section>
            { (rgsAux && rgsAux.localDetails !== '') ? (
              <Section title="Local Details">
                <CommunityLocalDetails localDetails={rgsAux.localDetails} />
              </Section>) : null
            }
          </Body>
          <Column>
            <Sticky
              top={isStickyHeaderVisible ? 84 : 24}
              bottomBoundary="#sticky-sidebar-boundary"
            >
              <ConciergeContainer community={community} queryParams={{ modal, currentStep }} setQueryParams={setQueryParams} />
            </Sticky>
          </Column>
        </CommunityDetailPageTemplate>
        <Footer />
      </Fragment>
    );
  }
}

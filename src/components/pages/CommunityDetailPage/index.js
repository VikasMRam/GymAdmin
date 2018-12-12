import React, { Fragment, Component } from 'react';
import styled from 'styled-components';
import { object, func, number, bool, string } from 'prop-types';
import Sticky from 'react-stickynode';
import { Lazy } from 'react-lazy';

import { size, assetPath } from 'sly/components/themes';
import { getBreadCrumbsForCommunity, getCitySearchUrl } from 'sly/services/helpers/url';
import { ASK_QUESTION, ADD_RATING, THANK_YOU, ANSWER_QUESTION } from 'sly/constants/modalType';
import { USER_SAVE_DELETE_STATUS } from 'sly/constants/userSave';
import { ACTIONS_ADD_TO_FAVOURITE, ACTIONS_REMOVE_FROM_FAVOURITE } from 'sly/constants/actions';
import { getHelmetForCommunityPage } from 'sly/services/helpers/html_headers';
import { CommunityPageTileTexts as adProps } from 'sly/services/helpers/ad';
import { Link, Heading, Hr, Button, Icon, Block } from 'sly/components/atoms';
import CommunityDetailPageTemplate from 'sly/components/templates/CommunityDetailPageTemplate';
import ShareCommunityFormContainer from 'sly/containers/ShareCommunityFormContainer';
import ConciergeController from 'sly/controllers/ConciergeController';
import SaveCommunityController from 'sly/controllers/SaveCommunityController';
import NotificationController from 'sly/controllers/NotificationController';
import CommunityStickyFooter from 'sly/components/organisms/CommunityStickyFooter';
import CommunityStickyHeader from 'sly/components/organisms/CommunityStickyHeader';
import CollapsibleSection from 'sly/components/molecules/CollapsibleSection';
import Section from 'sly/components/molecules/Section';
import CareServicesList from 'sly/components/organisms/CareServicesList';
import PropertyReviews from 'sly/components/organisms/PropertyReviews';
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

const BackToSearch = styled.div`
  text-align: center
`;

const NameHeading = styled(Heading)`
  margin-bottom: ${size('spacing.small')};
  line-height: ${size('lineHeight.minimal')};

  a { display: none; }
  &:hover { a { display: unset; } }
`;

const AddressHeading = styled(Heading)`
  margin-bottom: ${size('spacing.xLarge')};
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

const hasAllUserData = createBooleanValidator({
  fullName: [required],
  email: [required, email],
  phone: [required, usPhone],
});

const StyledOfferNotification = styled(OfferNotification)`
  margin-bottom: ${size('spacing.xLarge')};
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: none;
  }
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
  breadCrumbRef = React.createRef();
  pricingAndFloorPlansRef = React.createRef();
  communitySummaryRef = React.createRef();
  amenitiesAndFeaturesRef = React.createRef();

  handleScroll = () => {
    if (this.breadCrumbRef.current) {
      const { onToggleStickyHeader, isStickyHeaderVisible } = this.props;
      const rect = this.breadCrumbRef.current.getBoundingClientRect();
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
      twilioNumber,
      user: communityUser,
      questions,
      mainImage,
    } = community;

    let initedUserSave;
    if (userSave) {
      initedUserSave = userSave.status !== USER_SAVE_DELETE_STATUS ? userSave : null;
    }

    const {
      careServices, licenseUrl, websiteUrl, serviceHighlights, communityPhone,
      promoDescription, promoTitle,
    } = propInfo;

    let images = gallery.images || [];
    // If there is a mainImage put it in front
    const communityMainImage = images.find((element) => {
      return element.sd === mainImage;
    });

    let receptionNumber = communityPhone;
    if ((receptionNumber === undefined || receptionNumber === '') && user) {
      receptionNumber = user.phoneNumber;
    }
    // let conciergeNumber = receptionNumber;
    // if (twilioNumber && twilioNumber.numbers && twilioNumber.numbers.length) {
    //   conciergeNumber = twilioNumber.numbers[0];
    // }
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

    // TODO: move this to a container for PropertyReviews handling posts
    const onLeaveReview = () => {};
    // TODO: move this to a container PricingAndAvailability for handling bookings
    const { hasSlyReviews, hasWebReviews, reviewsValue } = propRatings;
    const ratingsArray = propRatings.ratingsArray || [];
    const reviewsFinal = reviews || [];
    const serviceHighlightsFinal = serviceHighlights || [];
    const roomPrices = floorPlans.map(({ info }) => info);
    const isCCRC = typeCare && (typeCare.indexOf('Continuing Care Retirement Community(CCRC)') !== -1);
    const ratesProvided = (rates && rates === 'Provided');

    // TODO: mock as USA until country becomes available
    address.country = 'USA';
    const formattedAddress = `${address.line1}, ${address.line2}, ${
      address.city
    }, ${address.state}
      ${address.zip}`
      .replace(/\s/g, ' ')
      .replace(/, ,/g, ', ');
    const stickyHeaderItems = [
      { label: 'Summary', ref: this.communitySummaryRef },
      { label: 'Pricing & Floor Plans', ref: this.pricingAndFloorPlansRef },
      { label: 'Reviews', ref: this.communityReviewsRef },
    ];
    // 24px or 84px (when sticky header is visible) from top TODO: figure out how to get this from styled theme sizes
    const columnContent = (
      <Sticky
        top={isStickyHeaderVisible ? 84 : 24}
        bottomBoundary="#sticky-sidebar-boundary"
      >
        <Fragment>
          <ConciergeContainer community={community} queryParams={{ modal, currentStep }} setQueryParams={setQueryParams} />
          {(promoDescription || promoTitle) &&
          (
            <OfferNotification
              onLearnMoreClick={e => onToggleAskAgentQuestionModal(e, 'offer')}
              palette="warning"
              title={promoTitle}
              description={promoDescription}
              hasLearnMore
            />
          )}
        </Fragment>
      </Sticky>
    );
    const bottomContent = (
      <Fragment>
        { getHelmetForCommunityPage(community, location) }
        {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
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
      </Fragment>
    );
    let bannerNotification = null;
    if (isAlreadyTourScheduled && isAlreadyPricingRequested) {
      bannerNotification = 'We have received your tour and pricing request. Your partner agent is checking with this community and will get back to you shortly.';
    } else if (isAlreadyTourScheduled) {
      bannerNotification = 'We have received your tour request. Your partner agent is checking with this community and will get back to you shortly.';
    } else if (isAlreadyPricingRequested) {
      bannerNotification = 'We have received your pricing request. Your partner agent is checking with this community and will get back to you shortly.';
    }

    return (
      <Fragment>
        {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
        <CommunityStickyHeader
          items={stickyHeaderItems}
          visible={isStickyHeaderVisible}
        />
        <CommunityDetailPageTemplate
          column={columnContent}
          bottom={bottomContent}
          bannerNotification={bannerNotification}
        >
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
              isFavourited={!!initedUserSave}
              onFavouriteClick={onMediaGalleryFavouriteClick}
              onShareClick={onMediaGalleryShareClick}
            />
          }
          <BreadCrumb items={getBreadCrumbsForCommunity({ name, propInfo, address })} innerRef={this.breadCrumbRef} />

          <NameHeading level="hero" size="hero">
            {name}{' '}
            {(user && user.admin) &&
              <Link
                to={`/mydashboard#/mydashboard/communities/${community.id}/about`}
              >
               (Edit)
              </Link>
            }
          </NameHeading>

          <AddressHeading level="subtitle" size="subtitle">{formattedAddress}</AddressHeading>
          <ConciergeController communitySlug={community.id} queryParams={{ modal, currentStep }} setQueryParams={setQueryParams}>
            {({ gotoWhatNext }) => (
              <CommunitySummary
                innerRef={this.communitySummaryRef}
                pricingAndFloorPlansRef={this.pricingAndFloorPlansRef}
                amenitiesAndFeaturesRef={this.amenitiesAndFeaturesRef}
                communityReviewsRef={this.communityReviewsRef}
                isCCRC={isCCRC}
                twilioNumber={twilioNumber}
                reviewsValue={reviewsValue}
                phoneNumber={communityPhone}
                licenseUrl={licenseUrl}
                websiteUrl={websiteUrl}
                user={communityUser}
                amenityScore={rgsAux.amenityScore}
                startingRate={startingRate}
                ratesProvided={ratesProvided}
                estimatedPrice={rgsAux.estimatedPrice}
                communityHighlights={communityHighlights}
                reviews={reviews}
                onConciergeNumberClicked={onConciergeNumberClicked}
                onReceptionNumberClicked={onReceptionNumberClicked}
                onHowSeniorlyWorks={gotoWhatNext}
              />
              )
            }
          </ConciergeController>

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

          <CollapsibleSection
            title={`Floor plans at ${name}`}
            botttomSection={
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
            {/* <ConciergeController communitySlug={community.id} queryParams={{ modal, currentStep }} setQueryParams={setQueryParams}>
              {() => (
                <PricingAndAvailability
                  community={community}
                  isCCRC={isCCRC}
                  address={address}
                  estimatedPrice={rgsAux.estimatedPrice}
                  roomPrices={roomPrices}
                  onInquireOrBookClicked={!isAlreadyPricingRequested ? onGCPClick : e => onToggleAskAgentQuestionModal(e, 'pricing')}
                  onLiveChatClicked={onLiveChatClicked}
                  queryParams={{ modal, currentStep }}
                  setQueryParams={setQueryParams}
                  gotoGetCustomPricing={!isAlreadyPricingRequested ? onGCPClick : e => onToggleAskAgentQuestionModal(e, 'pricing')}
                />
              )}
            </ConciergeController> */}
            <CommunityFloorPlansList typeOfCare={typeOfCare} floorPlans={floorPlans} />
          </CollapsibleSection>
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
          <CollapsibleSection title="Reviews" innerRef={this.communityReviewsRef}>
            <PropertyReviews
              hasSlyReviews={hasSlyReviews}
              hasWebReviews={hasWebReviews}
              reviews={reviewsFinal}
              reviewRatings={ratingsArray}
              onLeaveReview={onLeaveReview}
              onReviewLinkClicked={onReviewLinkClicked}
              isAskRatingModalOpen={modal === ADD_RATING}
              setModal={setModal}
              user={user}
              communitySlug={id}
              communityName={name}
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
        </CommunityDetailPageTemplate>
        <CommunityStickyFooter
          isAlreadyTourScheduled={isAlreadyTourScheduled}
          isAlreadyPricingRequested={isAlreadyPricingRequested}
          onBookATourClick={!isAlreadyTourScheduled ? onBookATourClick : e => onToggleAskAgentQuestionModal(e, 'tour')}
          onGCPClick={!isAlreadyPricingRequested ? onGCPClick : e => onToggleAskAgentQuestionModal(e, 'pricing')}
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
          noPadding
          layout={mainImage ? 'double' : 'single'}
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
                  layout="double"
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
      </Fragment>
    );
  }
}

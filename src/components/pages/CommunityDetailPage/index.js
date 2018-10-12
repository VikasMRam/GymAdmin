import React, { Fragment, Component } from 'react';
import styled from 'styled-components';
import { object, func, number, bool } from 'prop-types';
import Sticky from 'react-stickynode';
import { Lazy } from 'react-lazy';

import { getBreadCrumbsForCommunity, getCitySearchUrl } from 'sly/services/helpers/url';
import { ASK_QUESTION, ADD_RATING, THANK_YOU, ADD_TO_FAVOURITE, ANSWER_QUESTION } from 'sly/constants/modalType';

import CommunityDetailPageTemplate from 'sly/components/templates/CommunityDetailPageTemplate';

import { getHelmetForCommunityPage } from 'sly/services/helpers/html_headers';
import { size } from 'sly/components/themes';

import { Link, Heading, Hr, Block } from 'sly/components/atoms';

import ConciergeContainer from 'sly/containers/ConciergeContainer';
import ConciergeController from 'sly/controllers/ConciergeController';
import StickyFooter from 'sly/components/molecules/StickyFooter';
import CommunityStickyHeader from 'sly/components/organisms/CommunityStickyHeader';
import CollapsibleSection from 'sly/components/molecules/CollapsibleSection';
import Section from 'sly/components/molecules/Section';
import CareServicesList from 'sly/components/organisms/CareServicesList';
import PropertyReviews from 'sly/components/organisms/PropertyReviews';
import CommunityDetails from 'sly/components/organisms/CommunityDetails';
import PricingAndAvailability from 'sly/components/organisms/PricingAndAvailability';
import SimilarCommunities from 'sly/components/organisms/SimilarCommunities';
import SimilarCommunitiesNearby from 'sly/components/organisms/SimilarCommunitiesNearby';
import AmenitiesAndFeatures from 'sly/components/organisms/AmenitiesAndFeatures';
import CommunityMap from 'sly/components/organisms/CommunityMap';
import CommunityMediaGallery from 'sly/components/organisms/CommunityMediaGallery';
import MorePictures from 'sly/components/organisms/MorePictures';
import HowSlyWorks from 'sly/components/organisms/HowSlyWorks';
import CommunitySummary from 'sly/components/organisms/CommunitySummary';
import CommunityQuestionAnswers from 'sly/components/organisms/CommunityQuestionAnswers';
import BreadCrumb from 'sly/components/molecules/BreadCrumb';
import Button from 'sly/components/atoms/Button';
import CommunityLocalDetails from "sly/components/organisms/CommunityLocalDetails";
import AdTile from 'sly/components/molecules/AdTile';
import Modal from 'sly/components/molecules/Modal';
import JoinSlyButtons from 'sly/components/molecules/JoinSlyButtons';
import SaveCommunityForm from 'sly/components/organisms/SaveCommunityForm';
import Thankyou from 'sly/components/molecules/Thankyou/index';
import ToastNotification from 'sly/components/molecules/ToastNotification';

import { CommunityPageTileTexts as adProps } from 'sly/services/helpers/ad';

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

const StyledHeading = styled(Heading)`
  margin-bottom: ${size('spacing.xLarge')}
`;

const ButtonsWrapper = styled.div`
  display: flex;

  > * {
    flex: 3;
  }
`;

const StyledDoneButton = styled(Button)`
  flex: 1;
  margin-right: ${size('spacing.large')};
`;

export default class CommunityDetailPage extends Component {
  static propTypes = {
    user: object,
    community: object.isRequired,
    mediaGallerySlideIndex: number,
    isMediaGalleryFullscreenActive: bool,
    onMediaGallerySlideChange: func,
    onMediaGalleryToggleFullscreen: func,
    onMediaGalleryFavouriteClick: func,
    isStickyHeaderVisible: bool,
    onToggleStickyHeader: func,
    onBackToSearchClicked: func,
    onReviewLinkClicked: func,
    onConciergeNumberClicked: func,
    onLiveChatClicked: func,
    onReceptionNumberClicked: func,
    setModal: func,
    setQuestionToAsk: func,
    isUserSaveCreateFailure: bool,
    isGetCommunityUserSaveComplete: bool,
    userSave: object,
    searchParams: object,
    onSubmitSaveCommunityForm: func,
    isUserSaveUpdateComplete: bool,
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

  render() {
    const {
      mediaGallerySlideIndex,
      isMediaGalleryFullscreenActive,
      community,
      onMediaGallerySlideChange,
      onMediaGalleryToggleFullscreen,
      onMediaGalleryFavouriteClick,
      onBackToSearchClicked,
      isStickyHeaderVisible,
      user,
      onReviewLinkClicked,
      onConciergeNumberClicked,
      onLiveChatClicked,
      onReceptionNumberClicked,
      setModal,
      setQuestionToAsk,
      isUserSaveCreateFailure,
      isGetCommunityUserSaveComplete,
      userSave,
      searchParams,
      onSubmitSaveCommunityForm,
      isUserSaveUpdateComplete,
    } = this.props;

    const {
      id,
      name,
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
      url,
    } = community;

    const {
      careServices, licenseUrl, websiteUrl, serviceHighlights, communityPhone,
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

    let conciergeNumber = receptionNumber;
    if (twilioNumber && twilioNumber.numbers && twilioNumber.numbers.length) {
      conciergeNumber = twilioNumber.numbers[0];
    }
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
    const { modal, entityId } = searchParams;
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
        <ConciergeContainer community={community} />
      </Sticky>
    );
    const bottomContent = (
      <Fragment>
        { getHelmetForCommunityPage(community) }
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
            <MorePictures gallery={gallery} communityName={name} onPictureClick={this.handleMorePicturesClick} />
          </Section>
        }
        <Section title="How Seniorly Works">
          <HowSlyWorks />
        </Section>
        { (rgsAux && rgsAux.localDetails !=='') ?
                (<Section title="Local Details">
                  <CommunityLocalDetails localDetails={rgsAux.localDetails}/>
                </Section>) : null
        }
      </Fragment>
    );
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
        >
          {(images.length > 0 || videos.length > 0) &&
            <CommunityMediaGallery
              communityName={name}
              currentSlide={mediaGallerySlideIndex}
              images={images}
              videos={videos}
              websiteUrl={websiteUrl}
              onSlideChange={onMediaGallerySlideChange}
              isFullscreenMode={isMediaGalleryFullscreenActive}
              onToggleFullscreenMode={onMediaGalleryToggleFullscreen}
              isFavouriteEnabled={user !== null && isGetCommunityUserSaveComplete}
              isFavourited={!!userSave}
              onFavouriteClick={onMediaGalleryFavouriteClick}
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
          <ConciergeController community={community}>
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

          <CollapsibleSection
            title="Pricing & Floor Plans"
            innerRef={this.pricingAndFloorPlansRef}
          >
            <ConciergeController community={community}>
              {({ concierge, getPricing}) => (
                <PricingAndAvailability
                  community={community}
                  isCCRC={isCCRC}
                  address={address}
                  estimatedPrice={rgsAux.estimatedPrice}
                  roomPrices={roomPrices}
                  onInquireOrBookClicked={getPricing}
                  onLiveChatClicked={onLiveChatClicked}
                />
              )}
            </ConciergeController>
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
          <CollapsibleSection paddedContent={true} title="Care Services">
            <CareServicesList
              communityName={name}
              careServices={careServices}
              serviceHighlights={serviceHighlightsFinal}
            />
          </CollapsibleSection>
          <CollapsibleSection
            paddedContent={true}
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
            <ConciergeController community={community}>
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
        <ConciergeController community={community}>
          {({ concierge, getPricing }) => (
            <StickyFooter
              footerInfo={{
                title: 'Contact Property',
                name: community.name,
                ctaTitle: 'Contact',
              }}
              onFooterClick={getPricing}

            />

          )}
        </ConciergeController>
        {/* TODO: create component for this modal */}
        <Modal
          closeable
          noPadding={user != null && !isUserSaveUpdateComplete}
          layout={user == null || isUserSaveUpdateComplete ? 'single' : 'double'}
          isOpen={searchParams.modal === ADD_TO_FAVOURITE}
          onClose={() => setModal(null)}
        >
          {!isUserSaveUpdateComplete && user == null &&
            <Fragment>
              <StyledHeading size="subtitle">Add to your favourites list</StyledHeading>
              <JoinSlyButtons />
            </Fragment>
          }
          {!isUserSaveUpdateComplete && user != null &&
            <SaveCommunityForm mainImage={mainImage} submitForm={onSubmitSaveCommunityForm} />
          }
          {isUserSaveUpdateComplete &&
            <Fragment>
              <StyledHeading size="subtitle">Community Saved!</StyledHeading>
              <Block>You can view your saved communities from your dashboard</Block>
              <br />
              <ButtonsWrapper>
                <StyledDoneButton
                  onClick={() => setModal(null)}
                  palette="secondary"
                  ghost
                >
                  Done
                </StyledDoneButton>
                <Button href="/mydashboard">
                  Go to my dashboard
                </Button>
              </ButtonsWrapper>
              <br /><br /><br />
              <Hr />
              <StyledHeading size="subtitle">Similar communities nearby</StyledHeading>
              <SimilarCommunitiesNearby similarCommunities={similarProperties} />
            </Fragment>
          }
        </Modal>
        <Modal
          closeable
          isOpen={searchParams.modal === THANK_YOU}
          onClose={() => setModal(null)}
        >
          <Thankyou />
        </Modal>
        <ToastNotification isOpen={isUserSaveCreateFailure} status="error">
          Failed to save community. Please try again.
        </ToastNotification>
      </Fragment>
    );
  }
}

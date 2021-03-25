import 'intersection-observer';
// eslint-disable-next-line import/extensions
/* eslint-disable no-underscore-dangle */
import partiallyHydrateClient from 'sly/web/services/partialHydration/partiallyHydrateClient';
import ModalContainer from 'sly/web/containers/ModalContainer';
import HeaderContainer from 'sly/web/containers/HeaderContainer';
import CommunityMediaGalleryContainer from 'sly/web/containers/CommunityMediaGalleryContainer';
import CommunitySummaryContainer from 'sly/web/containers/CommunitySummaryContainer';
import OfferNotification from 'sly/web/components/molecules/OfferNotification';
import GetCustomPricingButtonContainer from 'sly/web/containers/GetCustomPricingButtonContainer';
import TrackedSimilarCommunitiesContainer from 'sly/web/containers/TrackedSimilarCommunitiesContainer';
import GetCurrentAvailabilityContainer from 'sly/web/containers/GetCurrentAvailabilityContainer';
import HowSlyWorksVideoContainer from 'sly/web/containers/HowSlyWorksVideoContainer';
import CommunityAgentSectionContainer from 'sly/web/containers/CommunityAgentSectionContainer';
import AskAgentQuestionButtonContainer from 'sly/web/containers/AskAgentQuestionButtonContainer';
import CommunityReviewsContainer from 'sly/web/containers/CommunityReviewsContainer';
import CommunityAddReviewButtonContainer from 'sly/web/containers/CommunityAddReviewButtonContainer';
import CommunityQuestionAnswersContainer from 'sly/web/containers/CommunityQuestionAnswersContainer';
import CommunityStickyFooter from 'sly/web/components/organisms/CommunityStickyFooter';
import ConciergeContainer from 'sly/web/containers/ConciergeContainer';
import CommunityMorePicturesContainer from 'sly/web/containers/CommunityMorePicturesContainer';
import LazyCommunityMapContainer from 'sly/web/containers/LazyCommunityMapContainer';
import PageViewActionContainer from 'sly/web/containers/PageViewActionContainer';
import PageEventsContainer from 'sly/web/containers/PageEventsContainer';
import AskAgentQuestionHowItWorksBannerNotificationContainer from 'sly/web/containers/AskAgentQuestionHowItWorksBannerNotificationContainer';
import CommunityDetailsPageColumnContainer from 'sly/web/containers/CommunityDetailsPageColumnContainer';
import RetentionPopup from 'sly/web/services/retentionPopup';
import Image from 'sly/web/components/atoms/Image';
import careTypes from 'sly/web/constants/careTypes';
import CommunityProfileAdTileContainer from 'sly/web/containers/communityProfile/AdTileContainer';
import BannerNotificationAdContainer from 'sly/web/containers/BannerNotificationAdContainer';
import CommunityPricingTable from 'sly/web/components/organisms/CommunityPricingTable';
import GetAssessmentBoxContainerHydrator from 'sly/web/components/pages/CommunityDetailPage/GetAssessmentBoxContainerHydrator';
import Chatbox from 'sly/web/components/pages/CommunityDetailPage/Chatbox';
import TrustScoreContainer from 'sly/web/containers/communityProfile/TrustScoreContainer';
import SidebarCTAContainer from 'sly/web/containers/communityProfile/SidebarCTAContainer';
import StickyFooterCTAContainer from 'sly/web/containers/communityProfile/StickyFooterCTAContainer';
import AgentAppointmentContainer from 'sly/web/containers/communityProfile/AgentAppointmentContainer';

// For Lazy loading images, used in ResponsiveImage
require('sly/web/services/yall');

const root = document.getElementById('app');

partiallyHydrateClient(
  [
    ModalContainer,
    HeaderContainer,
    PageViewActionContainer,
    PageEventsContainer,
    CommunityMediaGalleryContainer,
    CommunitySummaryContainer,
    OfferNotification,
    GetCustomPricingButtonContainer,
    TrackedSimilarCommunitiesContainer,
    GetCurrentAvailabilityContainer,
    HowSlyWorksVideoContainer,
    CommunityAgentSectionContainer,
    AskAgentQuestionButtonContainer,
    AskAgentQuestionHowItWorksBannerNotificationContainer,
    CommunityReviewsContainer,
    CommunityAddReviewButtonContainer,
    CommunityQuestionAnswersContainer,
    CommunityStickyFooter,
    ConciergeContainer,
    CommunityMorePicturesContainer,
    LazyCommunityMapContainer,
    CommunityDetailsPageColumnContainer,
    RetentionPopup,
    Image,
    CommunityProfileAdTileContainer,
    BannerNotificationAdContainer,
    CommunityPricingTable,
    GetAssessmentBoxContainerHydrator,
    SidebarCTAContainer,
    StickyFooterCTAContainer,
    Chatbox,
    TrustScoreContainer,
    AgentAppointmentContainer,
  ],
  `/:toc(${careTypes.join('|')})/:state/:city/:communitySlug`,
  root,
);

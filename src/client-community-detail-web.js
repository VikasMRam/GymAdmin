/* eslint-disable no-underscore-dangle */

import partiallyHydrateClient from 'sly/services/partialHydration/partiallyHydrateClient';
import clientConfigs from 'sly/clientConfigs';
import ModalContainer from 'sly/containers/ModalContainer';
import HeaderContainer from 'sly/containers/HeaderContainer';
import CommunityMediaGalleryContainer from 'sly/containers/CommunityMediaGalleryContainer';
import CommunitySummaryContainer from 'sly/containers/CommunitySummaryContainer';
import OfferNotification from 'sly/components/molecules/OfferNotification';
import GetCustomPricingButtonContainer from 'sly/containers/GetCustomPricingButtonContainer';
import BackToSearchButtonContainer from 'sly/containers/BackToSearchButtonContainer';
import TrackedSimilarCommunitiesContainer from 'sly/containers/TrackedSimilarCommunitiesContainer';
import GetCurrentAvailabilityContainer from 'sly/containers/GetCurrentAvailabilityContainer';
import HowSlyWorksVideoContainer from 'sly/containers/HowSlyWorksVideoContainer';
import CommunityAgentSectionContainer from 'sly/containers/CommunityAgentSectionContainer';
import AskAgentQuestionButtonContainer from 'sly/containers/AskAgentQuestionButtonContainer';
import CommunityReviewsContainer from 'sly/containers/CommunityReviewsContainer';
import CommunityAddReviewButtonContainer from 'sly/containers/CommunityAddReviewButtonContainer';
import CommunityQuestionAnswersContainer from 'sly/containers/CommunityQuestionAnswersContainer';
import CommunityStickyFooter from 'sly/components/organisms/CommunityStickyFooter';
import ConciergeContainer from 'sly/containers/ConciergeContainer';
import CommunityMorePicturesContainer from 'sly/containers/CommunityMorePicturesContainer';
import LazyCommunityMapContainer from 'sly/containers/LazyCommunityMapContainer';
import PageViewActionContainer from 'sly/containers/PageViewActionContainer';
import RetentionPopup from 'sly/services/retentionPopup';

const root = document.getElementById('app');

partiallyHydrateClient(
  [
    ModalContainer,
    HeaderContainer,
    PageViewActionContainer,
    CommunityMediaGalleryContainer,
    CommunitySummaryContainer,
    OfferNotification,
    GetCustomPricingButtonContainer,
    BackToSearchButtonContainer,
    TrackedSimilarCommunitiesContainer,
    GetCurrentAvailabilityContainer,
    HowSlyWorksVideoContainer,
    CommunityAgentSectionContainer,
    AskAgentQuestionButtonContainer,
    CommunityReviewsContainer,
    CommunityAddReviewButtonContainer,
    CommunityQuestionAnswersContainer,
    CommunityStickyFooter,
    ConciergeContainer,
    CommunityMorePicturesContainer,
    LazyCommunityMapContainer,
    RetentionPopup,
  ],
  clientConfigs.find(x => x.bundle === 'community-details').path,
  root
);

import React, { Component } from 'react';
import styled from 'styled-components';
import { object } from 'prop-types';
import { ifProp } from 'styled-tools';

import { size, palette } from 'sly/components/themes';
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
import { withHydration } from 'sly/services/partialHydration';
import { Button, Paragraph } from 'sly/components/atoms';
import SeoLinks from 'sly/components/organisms/SeoLinks';
import SampleMenu from 'sly/components/organisms/SampleMenu';
import {
  CommunityDetailPageTemplate,
  makeBody,
  makeColumn,
  makeFooter,
  makeGallery,
  makeHeader,
  makeTwoColumn,
  makeWrapper,
} from 'sly/components/templates/CommunityDetailPageTemplate';
import UnhydratedCommunityStickyFooter from 'sly/components/organisms/CommunityStickyFooter';
import Section from 'sly/components/molecules/Section';
import CommunityDetails from 'sly/components/organisms/CommunityDetails';
import CommunityPricingComparison from 'sly/components/organisms/CommunityPricingComparison';
import CommunityAmenities from 'sly/components/organisms/CommunityAmenities';
import UnhydratedLazyCommunityMap from 'sly/containers/LazyCommunityMapContainer';
import UnhydratedCommunityMediaGalleryContainer from 'sly/containers/CommunityMediaGalleryContainer';
import BreadCrumb from 'sly/components/molecules/BreadCrumb';
import CommunityLocalDetails from 'sly/components/organisms/CommunityLocalDetails';
import UnhydratedConciergeContainer from 'sly/containers/ConciergeContainer';
import UnhydratedOfferNotification from 'sly/components/molecules/OfferNotification';
import CommunityCareService from 'sly/components/organisms/CommunityCareService';
import CommunityExtraInfoSection from 'sly/components/molecules/CommunityExtraInfoSection';
import IconItem from 'sly/components/molecules/IconItem';
import UnhydratedGetCurrentAvailabilityContainer from 'sly/containers/GetCurrentAvailabilityContainer';
import UnhydratedHowSlyWorksVideoContainer from 'sly/containers/HowSlyWorksVideoContainer';
import BannerNotification from 'sly/components/molecules/BannerNotification';
import CommunityPricingTable from 'sly/components/organisms/CommunityPricingTable';
import UnhydratedAskAgentQuestionButtonContainer from 'sly/containers/AskAgentQuestionButtonContainer';
import UnhydratedGetCustomPricingButtonContainer from 'sly/containers/GetCustomPricingButtonContainer';
import PlusBranding from 'sly/components/organisms/PlusBranding';
import CollapsibleBlock from 'sly/components/molecules/CollapsibleBlock';
import { clickEventHandler } from 'sly/services/helpers/eventHandlers';
import UnhydratedCommunitySummaryContainer from 'sly/containers/CommunitySummaryContainer';
import UnhydratedCommunityAgentSectionContainer from 'sly/containers/CommunityAgentSectionContainer';
import UnhydratedCommunityQuestionAnswersContainer from 'sly/containers/CommunityQuestionAnswersContainer';
import UnhydratedCommunityReviewsContainer from 'sly/containers/CommunityReviewsContainer';
import UnhydratedCommunityAddReviewButtonContainer from 'sly/containers/CommunityAddReviewButtonContainer';
import UnhydratedCommunityMorePicturesContainer from 'sly/containers/CommunityMorePicturesContainer';
import UnhydratedTrackedSimilarCommunitiesContainer from 'sly/containers/TrackedSimilarCommunitiesContainer';
import UnhydratedPageViewActionContainer from 'sly/containers/PageViewActionContainer';
import { PROFILE_VIEWED } from 'sly/services/newApi/constants';
import HeadingBoxSection from 'sly/components/molecules/HeadingBoxSection';
import UnhydratedPageEventsContainer from 'sly/containers/PageEventsContainer';

const PageViewActionContainer = withHydration(UnhydratedPageViewActionContainer, { alwaysHydrate: true });
const PageEventsContainer = withHydration(UnhydratedPageEventsContainer, { alwaysHydrate: true });
const CommunityMediaGalleryContainer = withHydration(UnhydratedCommunityMediaGalleryContainer);
const CommunitySummaryContainer = withHydration(UnhydratedCommunitySummaryContainer);
const OfferNotification = withHydration(UnhydratedOfferNotification);
const GetCustomPricingButtonContainer = withHydration(UnhydratedGetCustomPricingButtonContainer);
const TrackedSimilarCommunitiesContainer = withHydration(UnhydratedTrackedSimilarCommunitiesContainer);
const GetCurrentAvailabilityContainer = withHydration(UnhydratedGetCurrentAvailabilityContainer);
const HowSlyWorksVideoContainer = withHydration(UnhydratedHowSlyWorksVideoContainer);
const CommunityAgentSectionContainer = withHydration(UnhydratedCommunityAgentSectionContainer);
const AskAgentQuestionButtonContainer = withHydration(UnhydratedAskAgentQuestionButtonContainer);
const CommunityReviewsContainer = withHydration(UnhydratedCommunityReviewsContainer);
const CommunityAddReviewButtonContainer = withHydration(UnhydratedCommunityAddReviewButtonContainer);
// const CommunityQuestionAnswersContainer = withHydration(UnhydratedCommunityQuestionAnswersContainer);
const CommunityStickyFooter = withHydration(UnhydratedCommunityStickyFooter, { alwaysHydrate: true });
const ConciergeContainer = withHydration(UnhydratedConciergeContainer);
const CommunityMorePicturesContainer = withHydration(UnhydratedCommunityMorePicturesContainer);
const LazyCommunityMap = withHydration(UnhydratedLazyCommunityMap);

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

const StyledHeadingBoxSection = styled(HeadingBoxSection).attrs({ hasNoHr: true })`
  margin-bottom: ${ifProp('extraBottomMargin', size('spacing.xxxLarge'), size('spacing.xLarge'))};
`;

const StyledSection = styled(Section)`
  margin-bottom: ${size('spacing.xxxLarge')}!important;
`;

const StyledCommunityExtraInfoSection = styled(CommunityExtraInfoSection)`
  margin-bottom: ${size('spacing.xLarge')};
`;

const StyledBannerNotification = pad(BannerNotification, 'large');

const StyledButton = styled(Button)`
  width: 100%;
  margin-top: ${size('spacing.xLarge')};
`;
const StyledLeaveReviewButton = styled(CommunityAddReviewButtonContainer)`
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

const StyledAskAgentButton = styled(AskAgentQuestionButtonContainer)`
  width: 100%;
  margin-top: ${size('spacing.xLarge')};
`;

const StickToTop = styled.div`
  position: sticky;
  top: 24px;
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
    [],
  );

  if (!requests.length) {
    return null;
  }

  if (requests.length > 1) {
    requests[requests.length - 2] = ' and ';
  }

  return `We have your ${requests.join(
    '',
  )} request. Your Seniorly Partner Agent is checking with this community and will get back to you shortly.`;
};

export default class CommunityDetailPage extends Component {
  static propTypes = {
    user: object,
    community: object.isRequired,
    location: object.isRequired,
    profileContacted: object.isRequired,
    history: object,
  };

  render() {
    return (
      <>
          <StyledSection>
          </StyledSection>
      </>
    );
  }
}

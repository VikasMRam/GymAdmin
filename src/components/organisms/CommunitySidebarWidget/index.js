import React, { Fragment } from 'react';
import styled from 'styled-components';
import { number, func, bool } from 'prop-types';

import { size } from 'sly/components/themes';
import { Box, Hr } from 'sly/components/atoms';
import { community as communityPropType } from 'sly/propTypes/community';
import CommunityPricingAndRating from 'sly/components/molecules/CommunityPricingAndRating';
import CommunityActions from 'sly/components/molecules/CommunityActions';
import OfferNotification from 'sly/components/molecules/OfferNotification';

const Wrapper = styled(Box)`
  width: ${size('layout.col4')};
  display: flex;
  flex-direction: column;
  border-radius: ${size('spacing.small')};
  margin-bottom: ${size('spacing.xLarge')};
  padding: ${size('spacing.xLarge')};
`;

const CommunityPricingAndRatingWrapper = styled.div`
  margin-bottom: ${size('spacing.xLarge')};
`;

const CommunitySidebarWidget = ({
  community, onBookATourClick, onGCPClick, onAQClick, isAlreadyTourScheduled, isAlreadyPricingRequested,
  onLearnMoreClick,
}) => {
  const { startingRate, propRatings, propInfo } = community;
  const { reviewsValue } = propRatings;
  const { promoDescription, promoTitle } = propInfo;

  return (
    <Fragment>
      <Wrapper>
        {(startingRate > 0 || startingRate > 0) &&
          <Fragment>
            <CommunityPricingAndRatingWrapper>
              <CommunityPricingAndRating price={startingRate} rating={reviewsValue} />
            </CommunityPricingAndRatingWrapper>
            <Hr />
          </Fragment>
        }
        <CommunityActions
          isAlreadyPricingRequested={isAlreadyPricingRequested}
          onGCPClick={onGCPClick}
        />
      </Wrapper>
      {(promoDescription || promoTitle) &&
        (
          <OfferNotification
            onLearnMoreClick={onLearnMoreClick}
            palette="warning"
            title={promoTitle}
            description={promoDescription}
            hasLearnMore
          />
        )}
    </Fragment>
  );
};

CommunitySidebarWidget.propTypes = {
  community: communityPropType,
  onBookATourClick: func,
  onGCPClick: func,
  onAQClick: func,
  isAlreadyTourScheduled: bool,
  isAlreadyPricingRequested: bool,
  onLearnMoreClick: func,
};

CommunitySidebarWidget.defaultProps = {
  community: {},
};

export default CommunitySidebarWidget;

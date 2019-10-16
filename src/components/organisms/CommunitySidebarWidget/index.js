import React from 'react';
import styled from 'styled-components';
import { func, bool } from 'prop-types';

import { size } from 'sly/components/themes';
import { Box, Hr } from 'sly/components/atoms';
import { community as communityPropType } from 'sly/propTypes/community';
import pad from 'sly/components/helpers/pad';
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

const CommunityPricingAndRatingWrapper = pad(styled.div``);

const CommunitySidebarWidget = ({
  community, onGCPClick, isAlreadyPricingRequested,
  onLearnMoreClick,
}) => {
  const { startingRate, propRatings, propInfo } = community;
  const { reviewsValue } = propRatings;
  const { promoDescription, promoTitle } = propInfo;

  return (
    <>
      <Wrapper>
        {(startingRate > 0 || startingRate > 0) &&
          <>
            <CommunityPricingAndRatingWrapper>
              <CommunityPricingAndRating price={startingRate} rating={reviewsValue} />
            </CommunityPricingAndRatingWrapper>
            <Hr />
          </>
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
    </>
  );
};

CommunitySidebarWidget.propTypes = {
  community: communityPropType,
  onGCPClick: func,
  isAlreadyPricingRequested: bool,
  onLearnMoreClick: func,
};

CommunitySidebarWidget.defaultProps = {
  community: {},
};

export default CommunitySidebarWidget;

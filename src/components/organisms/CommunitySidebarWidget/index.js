import React, { Fragment } from 'react';
import styled from 'styled-components';
import { number, func, bool } from 'prop-types';

import { size } from 'sly/components/themes';
import { Box, Hr } from 'sly/components/atoms';
import CommunityPricingAndRating from 'sly/components/molecules/CommunityPricingAndRating';
import CommunityActions from 'sly/components/molecules/CommunityActions';
import CommunityAgentCashback from 'sly/components/molecules/CommunityAgentCashback';

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
  price, rating, onSATClick, onGCPClick, onAQClick, isAlreadyTourScheduled, isAlreadyPricingRequested,
}) => (
  <Fragment>
    <Wrapper>
      {(price > 0 || rating > 0) &&
        <Fragment>
          <CommunityPricingAndRatingWrapper>
            <CommunityPricingAndRating price={price} rating={rating} />
          </CommunityPricingAndRatingWrapper>
          <Hr />
        </Fragment>
      }
      <CommunityActions
        isAlreadyPricingRequested={isAlreadyPricingRequested}
        isAlreadyTourScheduled={isAlreadyTourScheduled}
        onSATClick={onSATClick}
        onGCPClick={onGCPClick}
        onAQClick={onAQClick}
      />
    </Wrapper>
    <CommunityAgentCashback />
  </Fragment>
);

CommunitySidebarWidget.propTypes = {
  price: number,
  rating: number,
  onSATClick: func,
  onGCPClick: func,
  onAQClick: func,
  isAlreadyTourScheduled: bool,
  isAlreadyPricingRequested: bool,
};

export default CommunitySidebarWidget;

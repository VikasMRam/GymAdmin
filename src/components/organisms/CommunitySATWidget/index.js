import React, { Fragment } from 'react';
import styled from 'styled-components';
import { number, func, bool } from 'prop-types';

import { size, palette } from 'sly/components/themes';
import { Box } from 'sly/components/atoms';
import CommunityPricingAndRating from 'sly/components/molecules/CommunityPricingAndRating';
import CommunityScheduleATour from 'sly/components/molecules/CommunityScheduleATour';
import CommunityAgentCashback from 'sly/components/molecules/CommunityAgentCashback';

const Wrapper = styled(Box)`
  width: ${size('layout.col4')};
  display: flex;
  flex-direction: column;
  border-radius: ${size('spacing.small')};
  margin-bottom: ${size('spacing.xLarge')};
  padding: 0;
`;

const PricingAndRatingWrapper = styled.div`
  padding: ${size('spacing.xLarge')};
  border-bottom: ${size('border.regular')} solid ${palette('slate', 'stroke')};
`;

const CommunitySATWidget = ({
  price, rating, onSATClick, isAlreadyTourScheduled,
}) => (
  <Fragment>
    <Wrapper>
      <PricingAndRatingWrapper>
        <CommunityPricingAndRating price={price} rating={rating} />
      </PricingAndRatingWrapper>
      <CommunityScheduleATour isAlreadyTourScheduled={isAlreadyTourScheduled} onSATClick={onSATClick} />
    </Wrapper>
    <CommunityAgentCashback />
  </Fragment>
);

CommunitySATWidget.propTypes = {
  price: number,
  rating: number,
  onSATClick: func,
  isAlreadyTourScheduled: bool,
};

export default CommunitySATWidget;

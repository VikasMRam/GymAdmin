import React from 'react';
import styled from 'styled-components';
import { number, func } from 'prop-types';

import { size, palette } from 'sly/components/themes';
import CommunityPricingAndRating from 'sly/components/molecules/CommunityPricingAndRating/index';
import CommunityScheduleATour from 'sly/components/molecules/CommunityScheduleATour/index';
import CommunityAgentCashback from 'sly/components/molecules/CommunityAgentCashback/index';
import Hr from 'sly/components/atoms/Hr/index';

const Wrapper = styled.div`
  width: ${size('layout.col4')};
  display: flex;
  flex-direction: column;
  border: ${size('border.regular')} solid ${palette('slate', 'stroke')};
  border-radius: ${size('spacing.small')};
`;

const PricingAndRatingWrapper = styled.div`
  padding: ${size('spacing.large')};
`;

const StyledHr = styled(Hr)`
  margin-bottom: 0;
`;

const CommunitySATWidget = ({ price, rating, onSATClick }) => (
  <Wrapper>
    <PricingAndRatingWrapper>
      <CommunityPricingAndRating price={price} rating={rating} />
    </PricingAndRatingWrapper>
    <StyledHr />
    <CommunityScheduleATour onSATClick={onSATClick} />
    <CommunityAgentCashback />
  </Wrapper>
);

CommunitySATWidget.propTypes = {
  price: number.isRequired,
  rating: number.isRequired,
  onSATClick: func.isRequired,
};

export default CommunitySATWidget;

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import numeral from 'numeral';

import { size } from 'sly/components/themes';
import { Button, Block, Box } from 'sly/components/atoms';

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    flex-direction: initial;
  }
`;

const EstimatedCostWrapper = styled.div`
  margin-bottom: ${size('spacing.large')};
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    margin-bottom: 0;
    margin-right: ${size('spacing.regular')};
  }
`;
const SpacingBottomRegularWrapper = styled.div`
  margin-bottom: ${size('spacing.regular')};
`;

const percentageOf = (num, percentage) => {
  return (percentage / 100) * num;
};

const EstimatedCost = ({
  price, communityName, onGetDetailedPricingClicked,
}) => {
  let from = 0;
  let to = 0;
  // create a fuzzy range from given price
  const basePer = percentageOf(price, 10);
  from = price - basePer;
  to = price + basePer;

  return (
    <StyledBox>
      <EstimatedCostWrapper>
        <SpacingBottomRegularWrapper>
          Estimated cost from ${numeral(from).format('0,0')} to ${numeral(to).format('0,0')} per month*
        </SpacingBottomRegularWrapper>
        <Block size="caption">
          *Seniorly’s estimated monthly pricing is based on the local average pricing of other communities in the area, and the amenities and care services provided at {communityName}.
        </Block>
      </EstimatedCostWrapper>
      <div>
        <Button onClick={onGetDetailedPricingClicked}>Get Detailed Pricing</Button>
      </div>
    </StyledBox>
  );
};

EstimatedCost.propTypes = {
  price: PropTypes.number.isRequired,
  communityName: PropTypes.string.isRequired,
  onGetDetailedPricingClicked: PropTypes.func,
};

export default EstimatedCost;

import React from 'react';
import { func, number, object } from 'prop-types';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';

import { size } from 'sly/components/themes';
import { Button, Block, Heading } from 'sly/components/atoms';

const StyledBox = styled.div`

`;

const EstimatedCostWrapper = styled.div`
  margin-bottom: ${size('spacing.large')};
`;

const StyledBlock = styled(Block)`
  margin-bottom: 0;
`;

const percentageOf = (num, percentage) => {
  return (percentage / 100) * num;
};

const EstimatedCost = ({
  price, getPricing,
}) => {
  let from = 0;
  let to = 0;
  // create a fuzzy range from given price
  const basePer = percentageOf(price, 10);
  from = Math.round(price - basePer);
  to = Math.round(price + basePer);

  return (
    <StyledBox>
      <EstimatedCostWrapper>
        <Heading level="subtitle" size="subtitle">
          Estimated cost from <NumberFormat value={from} displayType="text" thousandSeparator prefix="$" /> to <NumberFormat value={to} displayType="text" thousandSeparator prefix="$" /> per month*
        </Heading>
        <StyledBlock size="caption" palette="grey">
          *Seniorly’s estimated monthly pricing is based on the local average pricing of other communities in the area and what typical communities of the same size offer in services. Please verify all information prior to making a decision. Seniorly is not responsible for any errors regarding the information displayed on this website.
        </StyledBlock>
      </EstimatedCostWrapper>
      <Button ghost onClick={getPricing}>Get Detailed Pricing</Button>
    </StyledBox>
  );
};

EstimatedCost.propTypes = {
  price: number.isRequired,
  getPricing: func,
};

export default EstimatedCost;

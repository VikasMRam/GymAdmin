import React from 'react';
import { func, number, string, arrayOf } from 'prop-types';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';

import { size } from 'sly/components/themes';
import { Button, Block, Span, Paragraph } from 'sly/components/atoms';

const EstimatedCostWrapper = styled.div`
  margin-bottom: ${size('spacing.large')};
`;

const StyledBlock = styled(Block)`
  margin-bottom: ${size('spacing.regular')};
`;

const StyledNumberFormat = styled(NumberFormat)`
  font-weight: ${size('weight.medium')};
`;

const percentageOf = (num, percentage) => {
  return (percentage / 100) * num;
};

const EstimatedCost = ({
  price, getPricing, typeCares, name,
}) => {
  // create a fuzzy range from given price
  const basePer = percentageOf(price, 10);
  const from = Math.round(price - basePer);
  const to = Math.round(price + basePer);
  const hasCCRC = typeCares.includes('Continuing Care Retirement Community(CCRC)');

  return (
    <>
      {!hasCCRC && (from > 0 || to > 0) &&
        <EstimatedCostWrapper>
          <StyledBlock size="caption" palette="grey">Estimated Pricing*</StyledBlock>
          <Block size="title">
            <StyledNumberFormat value={from} displayType="text" thousandSeparator prefix="$" /> - <StyledNumberFormat value={to} displayType="text" thousandSeparator prefix="$" /><Span size="caption"> per month</Span>
          </Block>
          <Button ghost onClick={getPricing}>Get Detailed Pricing</Button>
          <Block size="caption" palette="grey">
            *Seniorly’s estimated monthly pricing is based on the local average pricing of other communities in the area and what typical communities of the same size offer in services. Please verify all information prior to making a decision. Seniorly is not responsible for any errors regarding the information displayed on this website.
          </Block>
        </EstimatedCostWrapper>
      }
      {hasCCRC &&
        <div>
          <Paragraph>
            Pricing for {name} may include both a one time buy-in fee and a monthly component. Connect directly with {name} to find out your pricing.
          </Paragraph>
          <Button ghost onClick={getPricing}>Get Detailed Pricing</Button>
        </div>
      }
    </>
  );
};

EstimatedCost.propTypes = {
  price: number.isRequired,
  getPricing: func,
  typeCares: arrayOf(string).isRequired,
  name: string.isRequired,
};

export default EstimatedCost;

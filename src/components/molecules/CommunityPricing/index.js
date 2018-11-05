import React from 'react';
import { number, string } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import Block from 'sly/components/atoms/Block/index';
import { Heading } from 'sly/components/atoms/index';

const DescriptionBlock = styled(Block)`
  margin-bottom: ${size('spacing.regular')};
`;

const PricingBox = styled.div`
  display: flex;
  align-items: baseline;
`;

const PriceValueHeading = styled(Heading)`
  margin-right: ${size('spacing.small')};
`;

const CommunityPricing = ({ price, description }) => {
  return (
    <div>
      <DescriptionBlock size="caption">{description}</DescriptionBlock>
      <PricingBox>
        <PriceValueHeading>${price}</PriceValueHeading>
        <Block size="caption">/mo</Block>
      </PricingBox>
    </div>
  );
};

CommunityPricing.propTypes = {
  price: number.isRequired,
  description: string,
};

CommunityPricing.defaultProps = {
  description: 'Pricing starts from',
};

export default CommunityPricing;

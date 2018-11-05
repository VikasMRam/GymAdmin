import React from 'react';
import { number, string } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import Block from 'sly/components/atoms/Block/index';

const DescriptionBlock = styled(Block)`
  margin-bottom: ${size('spacing.regular')};
`;

const MoSpan = styled.span`
  font-size: ${size('text.caption')};
`;

const CommunityPricing = ({ price, description }) => {
  return (
    <div>
      <DescriptionBlock size="caption">{description}</DescriptionBlock>
      <Block size="title">${price} <MoSpan size="caption">/mo</MoSpan> </Block>
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

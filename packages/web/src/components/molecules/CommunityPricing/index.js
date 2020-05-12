import React from 'react';
import { number, string } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import { palette as palettePropType } from 'sly/propTypes/palette';
import { variation as variationPropType } from 'sly/propTypes/variation';
import pad from 'sly/components/helpers/pad';
import { formatMoney } from 'sly/services/helpers/numbers';
import { Block } from 'sly/components/atoms';

const StyledCommunityPricingWrapper = styled.div`
  width: calc(${size('layout.col2')} + ${size('layout.gutter')});
`;

const DescriptionBlock = pad(Block, 'regular');

const CommunityPricing = ({ description, price, palette, variation, className }) => (
  <StyledCommunityPricingWrapper className={className}>
    {description && <DescriptionBlock size="caption">{description}</DescriptionBlock>}
    <Block size="subtitle" weight="medium" palette={palette} variation={variation}>
      {formatMoney(price)}/month*
    </Block>
  </StyledCommunityPricingWrapper>
);

CommunityPricing.propTypes = {
  description: string,
  price: number.isRequired,
  palette: palettePropType,
  variation: variationPropType,
  className: string,
};

CommunityPricing.defaultProps = {
  palette: 'secondary',
  variation: 'dark35',
};

export default CommunityPricing;
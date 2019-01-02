import React from 'react';
import { number, string, node } from 'prop-types';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';

import { size } from 'sly/components/themes';
import { Bar, Block } from 'sly/components/atoms';
import { palette as palettePropType } from 'sly/propTypes/palette';
import { variation as variationPropType } from 'sly/propTypes/variation';

const StyledBlock = styled(Block)`
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: space-between;
  padding: 0 ${size('spacing.regular')};
`;

const Label = styled.div`
  white-space: nowrap;
  margin-right: ${size('spacing.large')};
`;

const PriceBar = ({
  width, price, children, palette, variation, className,
}) => (
  <Bar className={className} width={width / 2.5} palette={palette} variation={variation}>
    <StyledBlock size="caption">
      <Label>{children}</Label>
      <NumberFormat value={price} displayType="text" thousandSeparator prefix="$" />
    </StyledBlock>
  </Bar>
);

PriceBar.propTypes = {
  width: number.isRequired,
  price: number.isRequired,
  children: node,
  palette: palettePropType,
  variation: variationPropType,
  className: string,
};

export default PriceBar;

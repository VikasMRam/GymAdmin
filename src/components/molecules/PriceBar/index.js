import React from 'react';
import { number, string } from 'prop-types';
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
  padding: 0 ${size('spacing.large')};
`;

const PriceBar = ({
  width, price, label, palette, variation,
}) => (
  <Bar width={width / 2.5} palette={palette} variation={variation}>
    <StyledBlock size="caption">
      <div>{label}</div>
      <NumberFormat value={price} displayType="text" thousandSeparator prefix="$" />
    </StyledBlock>
  </Bar>
);

PriceBar.propTypes = {
  width: number.isRequired,
  price: number.isRequired,
  label: string,
  palette: palettePropType,
  variation: variationPropType,
};

export default PriceBar;

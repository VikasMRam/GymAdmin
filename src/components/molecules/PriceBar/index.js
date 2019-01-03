import React from 'react';
import { number, string, node } from 'prop-types';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';

import { size } from 'sly/components/themes';
import { Bar, Block, ClampedText } from 'sly/components/atoms';
import { palette as palettePropType } from 'sly/propTypes/palette';
import { variation as variationPropType } from 'sly/propTypes/variation';

const StyledBlock = styled(Block)`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 ${size('spacing.regular')};
`;

const Label = styled(ClampedText)`
  margin-left: ${size('spacing.regular')};
  margin-right: ${size('spacing.large')};
`;

const StyledBar = styled(Bar)`
  margin-right: ${size('spacing.regular')};
  display: flex;
  align-items: center;
`;

const PriceBar = ({
  width, price, children, palette, variation, className,
}) => (
  <StyledBlock size="caption" className={className}>
    <StyledBar width={width / 2.5} palette={palette} variation={variation}>
      <Label size="caption" title={children && children.toString()}>{children}</Label>
    </StyledBar>
    <NumberFormat value={price} displayType="text" thousandSeparator prefix="$" />
  </StyledBlock>
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

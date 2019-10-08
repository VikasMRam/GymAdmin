import React from 'react';
import { string, node, bool } from 'prop-types';
import styled from 'styled-components';

import { size, palette } from 'sly/components/themes';
import { palette as palettePropType } from 'sly/propTypes/palette';
import { variation as variationPropType } from 'sly/propTypes/variation';
import { Icon, Block } from 'sly/components/atoms';

const getMarginRight = p => p.borderless ? size('spacing', p.iconRightMarginSpacing) : size('spacing.large');

const Wrapper = styled.div`
  display: flex;
  align-items: baseline;
`;

const IconWrapper = styled.div`
  margin-right: ${getMarginRight};
  padding: calc(${size('spacing.regular')} - ${size('border.regular')});
  border: ${p => (p.borderless ? 0 : size('border.regular'))} solid ${palette('grey', 'filler')};
  border-radius: ${size('border.xxLarge')};
`;

const IconItem = ({
  icon, iconSize, iconPalette, iconVariation, size, children, borderless,
  textPalette, textVariation, iconRightMarginSpacing, className,
}) => (
  <Wrapper className={className}>
    <IconWrapper borderless={borderless} iconRightMarginSpacing={iconRightMarginSpacing}>
      <Icon icon={icon} size={iconSize} palette={iconPalette} variation={iconVariation} />
    </IconWrapper>
    <Block size={size} palette={textPalette} variation={textVariation}>{children}</Block>
  </Wrapper>
);

IconItem.propTypes = {
  icon: string.isRequired,
  iconSize: string,
  iconPalette: palettePropType,
  iconVariation: variationPropType,
  size: string,
  children: node,
  borderless: bool,
  textPalette: palettePropType,
  textVariation: variationPropType,
  iconRightMarginSpacing: string,
  className: string,
};

IconItem.defaultProps = {
  borderless: true,
  iconPalette: 'secondary',
  iconVariation: 'base',
  textPalette: 'slate',
  textVariation: 'base',
  iconRightMarginSpacing: 'small',
};

export default IconItem;

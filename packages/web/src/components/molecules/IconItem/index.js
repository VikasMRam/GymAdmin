import React from 'react';
import { string, node, bool } from 'prop-types';
import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';

import { size, palette } from 'sly/web/components/themes';
import { palette as palettePropType } from 'sly/web/propTypes/palette';
import { variation as variationPropType } from 'sly/web/propTypes/variation';
import { Icon, Block } from 'sly/web/components/atoms';

const getMarginRight = p => p.borderless ? size('spacing', p.iconRightMarginSpacing) : size('spacing.large');

const Wrapper = styled.div`
  display: flex;
  align-items: baseline;
`;

const IconWrapper = styled.div`
  margin-right: ${getMarginRight};
  padding: calc(${size('spacing.regular')} - ${size('border.regular')});
  ${ifProp('borderless', css`padding-left: 0;`)}
  border: ${p => (p.borderless ? 0 : size('border.regular'))} solid ${p => (palette(p.borderPalette, p.borderVariation))};
  border-radius: ${size('border.xxLarge')};
`;

const IconItem = ({
  icon, iconSize, iconPalette, iconVariation, size, children, borderless,
  textPalette, textVariation, iconRightMarginSpacing, className, borderPalette, borderVariation,
}) => (
  <Wrapper className={className}>
    <IconWrapper borderless={borderless} borderPalette={borderPalette} borderVariation={borderVariation} iconRightMarginSpacing={iconRightMarginSpacing}>
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
  borderPalette: palettePropType,
  borderVariation: variationPropType,
};

IconItem.defaultProps = {
  borderless: true,
  iconPalette: 'primary',
  iconVariation: 'base',
  textPalette: 'slate',
  textVariation: 'base',
  iconRightMarginSpacing: 'small',
  borderPalette: 'grey',
  borderVariation: 'filler',
};

export default IconItem;

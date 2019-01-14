import React from 'react';
import { string, node, bool } from 'prop-types';
import styled from 'styled-components';

import { size, palette } from 'sly/components/themes';
import { palette as palettePropType } from 'sly/propTypes/palette';
import { variation as variationPropType } from 'sly/propTypes/variation';
import { Icon, Block } from 'sly/components/atoms';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  margin-right: ${p => p.borderless ? size('spacing.small') : size('spacing.large')};
  padding: calc(${size('spacing.regular')} - ${size('border.regular')});
  border: ${p => (p.borderless ? 0 : size('border.regular'))} solid ${palette('grey', 'filler')};
  border-radius: ${size('border.xLarge')};
`;

const IconItem = ({
  icon, iconSize, iconPalette, iconVariation, size, children, borderless,
  textPalette, textVariation,
}) => {
  const defIconSize = iconSize || size;

  return (
    <Wrapper>
      <IconWrapper borderless={borderless}>
        <Icon icon={icon} size={defIconSize} palette={iconPalette} variation={iconVariation} />
      </IconWrapper>
      <Block palette={textPalette} variation={textVariation}>{children}</Block>
    </Wrapper>
  );
};

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
};

IconItem.defaultProps = {
  borderless: true,
  iconPalette: 'secondary',
  iconVariation: 'base',
  textPalette: 'slate',
  textVariation: 'base',
};

export default IconItem;

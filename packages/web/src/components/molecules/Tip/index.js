import React from 'react';
import { string, node } from 'prop-types';
import styled from 'styled-components';

import { size, palette } from 'sly/web/components/themes';
import { palette as palettePropType } from 'sly/web/propTypes/palette';
import { variation as variationPropType } from 'sly/web/propTypes/variation';
import { Icon, Block } from 'sly/web/components/atoms';


const Wrapper = styled.div`
  display: flex;
  align-items: baseline;
  background-color: ${palette('secondary', 'stroke')};
  padding: ${size('spacing.xLarge')};
  border: ${size('border.regular')} solid ${palette('slate', 'stroke')};
  border-radius: ${size('spacing.small')};
  margin-bottom:${size('spacing.large')};
`;

const IconWrapper = styled.div`
  margin-right: ${size('spacing.regular')};
`;


const Tip = ({
  icon, iconSize, iconPalette, iconVariation, size, children,
  textPalette, textVariation,
}) => (
  <Wrapper>
    <IconWrapper>
      <Icon icon={icon} size={iconSize} palette={iconPalette} variation={iconVariation} />
    </IconWrapper>
    <Block size={size} palette={textPalette} variation={textVariation}>{children}</Block>
  </Wrapper>
);

Tip.propTypes = {
  icon: string.isRequired,
  iconSize: string,
  iconPalette: palettePropType,
  iconVariation: variationPropType,
  size: string,
  children: node,
  textPalette: palettePropType,
  textVariation: variationPropType,
};

Tip.defaultProps = {
  icon: 'flag',
  iconPalette: 'secondary',
  iconVariation: 'dark35',
  textPalette: 'slate',
  textVariation: 'base',
};

export default Tip;

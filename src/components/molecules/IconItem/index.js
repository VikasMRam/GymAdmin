import React, { Fragment } from 'react';
import { string, node, bool } from 'prop-types';
import styled from 'styled-components';
import { prop } from 'styled-tools';

import { size, palette } from 'sly/components/themes';
import { palette as palettePropType } from 'sly/propTypes/palette';
import { variation as variationPropType } from 'sly/propTypes/variation';
import { Icon, Block, Hr } from 'sly/components/atoms';

const getMarginRight = p => p.borderless ? size('spacing', p.iconRightMarginSpacing) : size('spacing.large');

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  margin-right: ${getMarginRight};
  padding: calc(${size('spacing.regular')} - ${size('border.regular')});
  border: ${p => (p.borderless ? 0 : size('border.regular'))} solid ${palette('grey', 'filler')};
  border-radius: ${size('border.xxLarge')};
`;

const StyledHr = styled(Hr)`
  margin-left: calc(${size('border.regular')} + ${size('spacing.regular')} + ${getMarginRight} + ${props => size('icon', prop('iconSize', 'regular')(props))(props)});
  margin-bottom: 0;
  margin-top: ${size('spacing.regular')};
`;

const IconItem = ({
  icon, iconSize, iconPalette, iconVariation, size, children, borderless,
  textPalette, textVariation, iconRightMarginSpacing, hasBottomBorder,
}) => {
  const defIconSize = iconSize || size;

  return (
    <Fragment>
      <Wrapper>
        <IconWrapper borderless={borderless} iconRightMarginSpacing={iconRightMarginSpacing}>
          <Icon icon={icon} size={defIconSize} palette={iconPalette} variation={iconVariation} />
        </IconWrapper>
        <Block palette={textPalette} variation={textVariation}>{children}</Block>
      </Wrapper>
      {hasBottomBorder && <StyledHr iconRightMarginSpacing={iconRightMarginSpacing} iconSize={defIconSize} />}
    </Fragment>
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
  iconRightMarginSpacing: string,
  hasBottomBorder: bool,
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

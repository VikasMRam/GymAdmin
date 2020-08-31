import React from 'react';
import { string, bool, node, number } from 'prop-types';
import styled, { css, keyframes } from 'styled-components';
import { ifProp } from 'styled-tools';

import { palette as palettePropType } from 'sly/common/propTypes/palette';
import { isReactNative } from 'sly/common/constants/utils';
import { upTo } from 'sly/common/components/helpers';
import { Icon, Button, Block } from 'sly/common/components/atoms';

const StyledIcon = styled(Icon)`
  ${ifProp('hideTextInMobile', css`
    ${upTo('mobile', css`
      margin-right: 0;
    `)}
  `)}
`;

const Text = styled(Block)`
  ${ifProp('hideTextInMobile', css`
    ${upTo('mobile', css`
      display: none;
    `)}
  `)}
`;

const IconButton = styled(({
  icon, iconSize, transparent, children, hideTextInMobile, iconPalette,
  right, rotate, collapsed, noSpaceBetween,  ...props
}) => {
  const { palette, ghost } = props;

  if (ghost && iconPalette === 'white') {
    iconPalette = palette || Button.defaultProps.background;
  }

  const iconElement = (
    <StyledIcon
      icon={icon}
      size={iconSize}
      palette={transparent && !ghost ? palette : iconPalette}
      marginRight={!!children && !right ? 'regular' : undefined}
      className="icon"
      hideTextInMobile={hideTextInMobile}
      rotate={rotate}
    />
  );

  let textPalette = 'white';
  if ((transparent && !palette) || (ghost && !palette)) {
    textPalette = !ghost ? 'slate' : Button.defaultProps.background;
  } else {
    textPalette = !palette ? textPalette : palette || iconPalette;
  }

  return (
    <Button
      transparent={transparent}
      padding={transparent && !children ? '0' : undefined}
      {...props}
    >
      <Block display="flex" width="100%" align={props.width && !noSpaceBetween ? 'space-between' : 'center'} verticalAlign="middle">
        {!right && iconElement}
        {children &&
          <Text
            lineHeight="normal"
            marginTop="tiny"
            marginRight={right ? 'regular' : undefined}
            marginLeft={collapsed ? 'regular' : undefined}
            hideTextInMobile={hideTextInMobile}
            palette={textPalette}
            className="text"
          >
            {children}
          </Text>
        }
        {right && iconElement}
      </Block>
    </Button>
  );
})`
  ${!isReactNative && ifProp('collapsed', css`
    overflow: hidden;
    transition: max-width 250ms ease-in-out;
    will-change: max-width;
    & .text {
      display: none;
    }
    & .icon {
      margin-right: 0;
    }
    &:hover {
      max-width: 100%;
      & .text {
        display: block;
        animation: ${keyframes`
          0% { display: none; opacity: 0; }
          1% { display: block: opacity: 0; }
          100% { display: block; opacity: 1; }
        `} 250ms;
      }
    }
  `)};
`;

IconButton.propTypes = {
  icon: string.isRequired,
  iconSize: string,
  palette: palettePropType,
  borderPalette: palettePropType,
  iconPalette: palettePropType,
  transparent: bool,
  collapsed: bool,
  right: bool,
  children: node,
  hideTextInMobile: bool,
  rotate: number,
  noSpaceBetween: bool,
};

IconButton.defaultProps = {
  iconSize: 'caption',
  background: 'primary',
  iconPalette: 'white',
};

export default IconButton;

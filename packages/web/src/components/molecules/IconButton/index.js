import React from 'react';
import { string, bool, node, number } from 'prop-types';
import styled, { css, keyframes } from 'styled-components';
import { ifProp } from 'styled-tools';

import { size } from 'sly/web/components/themes';
import { palette as palettePropType } from 'sly/common/propTypes/palette';
import { Icon, Button } from 'sly/web/components/atoms';

const fadeIn = keyframes`
  0% { display: none; opacity: 0; }
  1% { display: block: opacity: 0; }
  100% { display: block; opacity: 1; }
`;

const StyledIcon = styled(({ padRight, fullWidth, ...props }) => <Icon {...props} />)`
  margin-right: ${ifProp('padRight', size('spacing.regular'), 0)};
  margin-top: -1px;
  margin-bottom: -1px;
  ${ifProp('hideTextInMobile', css`
    margin-right: 0;
    @media screen and (min-width: ${size('breakpoint.tablet')}) {
      margin-right: ${ifProp('padRight', size('spacing.regular'), 0)};
    }
  `)}
  ${ifProp('fullWidth', css`
    position: absolute;
    right: 0;
  `)}
`;

const Text = styled.span`
  white-space: nowrap;
  margin-right: ${ifProp('padRight', size('spacing.regular'), 0)};
  ${ifProp('hideTextInMobile', css`
    display: none;

    @media screen and (min-width: ${size('breakpoint.tablet')}) {
      display: inline;
    }
  `)}
`;

const IconButton = styled(({
  icon, iconSize, transparent, fill, children, hideTextInMobile, iconPalette, right, fullWidth, rotate, ...props
}) => {
  const { palette } = props;
  const iconElement = (
    <StyledIcon
      icon={icon}
      size={iconSize}
      palette={transparent ? palette : iconPalette}
      padRight={(!!children && !right) || fullWidth}
      className="icon"
      hideTextInMobile={hideTextInMobile}
      fullWidth={fullWidth}
      rotate={rotate}
    />
  );

  return (
    <Button
      transparent={transparent}
      padRight={!!children && !right}
      noPadding={transparent && !children}
      fullWidth={fullWidth}
      {...props}
    >
      {right || iconElement}
      {children && <Text padRight={right} hideTextInMobile={hideTextInMobile} className="text">{children}</Text>}
      {right && iconElement}
    </Button>
  );
})`
  ${ifProp('fullWidth', css`
    width: 100%;
    justify-content: left;
    position: relative;`)}
  ${ifProp('noPadding', css`padding: 0;`)}
  ${ifProp('collapsed', css`
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
        animation: ${fadeIn} 250ms;
      }
      & .icon {
        margin-right: ${ifProp('padRight', size('spacing.regular'), 0)};
      }
    }
  `)};
`;

IconButton.propTypes = {
  fill: string,
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
  fullWidth: bool,
  rotate: number,
};

IconButton.defaultProps = {
  iconSize: 'caption',
  palette: 'primary',
  iconPalette: 'white',
};

export default IconButton;

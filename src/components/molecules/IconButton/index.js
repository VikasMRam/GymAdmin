import React from 'react';
import { string, bool, node } from 'prop-types';
import styled, { css, keyframes } from 'styled-components';
import { ifProp } from 'styled-tools';

import { size } from 'sly/components/themes';
import { palette as palettePropType } from 'sly/propTypes/palette';
import { Icon, Button } from 'sly/components/atoms';

const fadeIn = keyframes`
  0% { display: none; opacity: 0; }
  1% { display: block: opacity: 0; }
  100% { display: block; opacity: 1; }
`;

const StyledButton = styled(({ noPadding, padRight, ...props }) => <Button {...props} />)`
  ${ifProp('noPadding', css`padding: 0;`)}
  ${ifProp(
    'collapsed',
    css`
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
    `,
  )};
`;

const StyledIcon = styled(({ padRight, ...props }) => <Icon {...props} />)`
  margin-right: ${ifProp('padRight', size('spacing.regular'), 0)};
  margin-top: -1px;
  margin-bottom: -1px;
  ${ifProp('hideTextInMobile', css`
    margin-right: 0;
    @media screen and (min-width: ${size('breakpoint.tablet')}) {
      margin-right: ${ifProp('padRight', size('spacing.regular'), 0)};
    }
  `)}
`;

const Text = styled.span`
  margin-right: ${ifProp('padRight', size('spacing.regular'), 0)};
  ${ifProp('hideTextInMobile', css`
    display: none;

    @media screen and (min-width: ${size('breakpoint.tablet')}) {
      display: inline;
    }
  `)}
`;

const IconButton = ({
  icon, iconSize, transparent, fill, children, hideTextInMobile, iconPalette, right, ...props
}) => {
  const { palette } = props;
  const iconElement = (
    <StyledIcon
      icon={icon}
      size={iconSize}
      palette={transparent ? palette : iconPalette}
      padRight={!!children && !right}
      className="icon"
      hideTextInMobile={hideTextInMobile}
    />
  );

  return (
    <StyledButton
      transparent={transparent}
      padRight={!!children && !right}
      noPadding={transparent && !children}
      {...props}
    >
      {right || iconElement}
      {children && <Text padRight={right} hideTextInMobile={hideTextInMobile} className="text">{children}</Text>}
      {right && iconElement}
    </StyledButton>
  );
};

IconButton.propTypes = {
  fill: string,
  icon: string.isRequired,
  iconSize: string,
  palette: palettePropType,
  iconPalette: palettePropType,
  transparent: bool,
  collapsed: bool,
  right: bool,
  children: node,
  hideTextInMobile: bool,
};

IconButton.defaultProps = {
  iconSize: 'caption',
  palette: 'primary',
  iconPalette: 'white',
};

export default IconButton;

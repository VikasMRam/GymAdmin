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

const StyledButton = styled(Button)`
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
    `
  )};
`;

const StyledIcon = styled(Icon)`
  margin-right: ${ifProp('padRight', size('spacing.regular'), 0)};
`;

const Text = styled.span`
  margin-right: ${ifProp('padRight', size('spacing.regular'), 0)};
`;

const IconButton = ({
  icon, iconSize, transparent, fill, children, ...props
}) => {
  const { right, palette, iconPalette } = props;
  const iconElement = (
    <StyledIcon
      icon={icon}
      size={iconSize}
      palette={transparent ? palette : iconPalette}
      padRight={!!children && !right}
      className="icon"
    />
  );

  return (
    <StyledButton
      hasText={!!children}
      transparent={transparent}
      padRight={!!children && !right}
      {...props}
    >
      {right || iconElement}
      {children && <Text padRight={right} className="text">{children}</Text>}
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
};

IconButton.defaultProps = {
  iconSize: 'caption',
  palette: 'primary',
  iconPalette: 'white',
};

export default IconButton;

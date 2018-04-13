import React from 'react';
import { string, bool, number, node } from 'prop-types';
import styled, { css, keyframes } from 'styled-components';
import { ifProp, prop } from 'styled-tools';

import { size } from 'sly/components/themes';
import { Icon, Button } from 'sly/components/atoms';

const fadeIn = keyframes`
  0% { display: none; opacity: 0; }
  1% { display: block: opacity: 0; }
  100% { display: block; opacity: 1; }
`;

const iconWidth = p => p.hasText
  ? 'auto'
  : p.iconOnly
    ? size('icon.regular')
    : size('icon.button');

const iconHeight = p => p.iconOnly ? size('icon.regular') : size('icon.button');

// TODO: measurements from theme
const StyledButton = styled(Button)`
  width: ${iconWidth};
  height: ${iconHeight};
  padding: ${ifProp('hasText', '0 0.4375em', 0)};
  flex: 0 0 2.5em;
  ${ifProp(
    'collapsed',
    css`
      overflow: hidden;
      transition: max-width 250ms ease-in-out;
      will-change: max-width;
      & .text {
        display: none;
      }
      &:hover {
        max-width: 100%;
        & .text {
          display: block;
          animation: ${fadeIn} 250ms;
        }
      }
    `
  )};
`;

// TODO: measurements from theme
const Text = styled.span`
  padding: 0.4375em;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const StyledIcon = styled(Icon)`
  flex: none;
`;

const IconButton = ({
  icon, iconOnly, fill, children, ...props
}) => {
  const { right, height, palette } = props;
  const iconElement = (
    <StyledIcon
      height={height ? height / 2.5 : undefined}
      fill={fill}
      icon={icon}
      palette={palette}
    />
  );
  return (
    <StyledButton hasText={!!children} iconOnly transparent={iconOnly} {...props}>
      <Wrapper>
        {right || iconElement}
        {children && <Text className="text">{children}</Text>}
        {right && iconElement}
      </Wrapper>
    </StyledButton>
  );
};

IconButton.propTypes = {
  fill: string,
  icon: string.isRequired,
  iconOnly: bool,
  collapsed: bool,
  right: bool,
  height: number,
  children: node,
};

IconButton.defaultProps = {
  iconOnly: false,
};

export default IconButton;

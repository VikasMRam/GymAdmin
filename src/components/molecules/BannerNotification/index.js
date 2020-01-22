import React from 'react';
import { node, string, bool, func } from 'prop-types';
import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';

import { palette as palettePropType } from 'sly/propTypes/palette';
import { spacing as spacingPropType } from 'sly/propTypes/spacing';
import borderRadius from 'sly/components/helpers/borderRadius';
import { Block } from 'sly/components/atoms';
import IconButton from 'sly/components/molecules/IconButton';
import { size, palette } from 'sly/components/themes';

const background = ({ type }) => palette(type, 'base');

const padding = ({ padding }) => size('spacing', padding);

const styles = css`
  background: ${background};
  text-align: center;
  padding: ${padding};
  display: flex;
  justify-content: ${ifProp('hasCloseButton', 'initial', 'center')};
  align-items: center;
`;

const Wrapper = styled(Block)`
  ${styles}
`;

const BorderRadiusWrapper = borderRadius(Wrapper);

const StyledIconButton = styled(IconButton)`
  padding-left: ${size('spacing.large')};
  // always pull the close button to right
  margin-left: auto;
`;

const BannerNotification = ({
  children, palette, className, padding, hasBorderRadius, onCloseClick, iconPalette, childrenPalette,
}) => {
  const close = onCloseClick ? (
    <StyledIconButton icon="close" iconSize="caption" palette={iconPalette} transparent onClick={onCloseClick} />
  ) : null;
  const props = {
    type: palette,
    palette: childrenPalette,
    className,
    padding,
    hasCloseButton: !!onCloseClick,
  };

  return hasBorderRadius ? (
    <BorderRadiusWrapper {...props}>
      {children}
      {close}
    </BorderRadiusWrapper>
  ) : (
    <Wrapper {...props}>
      {children}
      {close}
    </Wrapper>
  );
};

BannerNotification.propTypes = {
  children: node.isRequired,
  className: string,
  palette: palettePropType.isRequired,
  iconPalette: palettePropType.isRequired,
  childrenPalette: palettePropType.isRequired,
  padding: spacingPropType,
  hasBorderRadius: bool,
  onCloseClick: func,
};

BannerNotification.defaultProps = {
  palette: 'green',
  iconPalette: 'slate',
  childrenPalette: 'white',
  padding: 'large',
};

export default BannerNotification;

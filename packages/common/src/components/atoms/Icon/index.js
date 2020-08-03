import React from 'react';
import { string, number, bool, oneOfType } from 'prop-types';
import styled, { css } from 'styled-components';

import { variation as variationPropType } from 'sly/common/propTypes/variation';
import { palette as palettePropType } from 'sly/common/propTypes/palette';
import { key, getThemePropType, getKey } from 'sly/common/components/themes';
import { withBorder, withColor, withSpacing, withText } from 'sly/common/components/helpers';

const iconSize = ({ size: s }) => {
  const textSize = getKey(`sizes.text.${s}`);
  const lineHeight = getKey(`sizes.lineHeight.${s}`);
  return textSize
    ? css`calc(${textSize} * ${lineHeight});`
    : s;
};
const getTransform = ({ rotate, flip }) => `transform: rotate(${rotate * 90}deg)${flip ? ' scaleX(-1) scaleY(-1)' : ''}`;

/**
 * To make Icon compatible with text sizes, but backward compatible with the
 * deprecated icon size
 */
const Wrapper = styled.span`
  ${withSpacing}
  ${withColor}
  ${withText}
  ${withBorder}

  display: inline-flex;
  // sizes relative to set font-size
  vertical-align: top;
  align-self: center;

  width: max-content;
  height: max-content;
  text-align: center;
  ${getTransform};
  transition: transform ${key('transitions.fast')};
  & > svg {
    align-self: center;
    height: ${iconSize};
    min-width: ${iconSize};
    display: block;
  }
`;

const Icon = styled(({ icon, size, ...props }) => {
  let svg;
  try {
    svg = require(`!raw-loader!./icons/${icon}-regular.svg`).default;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Icon not found:', `${icon}-regular`);
    svg = '<span>x</span>';
  }
  return (
    <Wrapper size={size} {...props} data-cy={icon} dangerouslySetInnerHTML={{ __html: svg }} />
  );
})``;

Icon.displayName = 'Icon';

Icon.propTypes = {
  icon: string.isRequired,
  width: number,
  size: oneOfType([getThemePropType('text'), string]),
  palette: palettePropType,
  variation: variationPropType,
  flip: bool,
  rotate: number,
};

Icon.defaultProps = {
  flip: false,
  rotate: 0,
  size: 'body',
};

export default Icon;

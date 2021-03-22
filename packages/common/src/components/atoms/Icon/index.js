import React from 'react';
import { string, number, bool, oneOfType } from 'prop-types';
import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';

import { key, palette, getThemePropType, getKey } from 'sly/common/components/themes';
import { variation as variationPropType } from 'sly/common/propTypes/variation';
import { palette as palettePropType } from 'sly/common/propTypes/palette';
import Block from 'sly/common/components/atoms/Block';

const iconSize = ({ size: s }) => {
  if (typeof s === 'number') {
    return `${s}px`;
  }

  const textSize = getKey(`sizes.text.${s}`);
  const lineHeight = getKey(`sizes.lineHeight.${s}`);
  return textSize
    ? css`calc(${textSize} * ${lineHeight});`
    : s;
};

const getTransform = ({ rotate, flip }) => `${rotate ? `transform: rotate(${rotate * 90}deg)` : ''}; ${flip ? ' scaleX(-1) scaleY(-1)' : ''}`;


/**
 * To make Icon compatible with text sizes, but backward compatible with the
 * deprecated icon size
 */
const Wrapper = styled(Block)`
  // sizes relative to set font-size
  vertical-align: top;
  /* align-self: center; */

  width: max-content;
  height: max-content;
  text-align: center;
  transition: transform ${key('transitions.slow.out')};
  & > svg {
    ${getTransform};
    align-self: center;
    height: ${iconSize};
    min-width: ${iconSize};
    display: block;
    ${ifProp('palette', css`
      fill: ${palette('base')};
    `)}
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
  display: 'inline-flex',
};

export default Icon;

import React from 'react';
import { string, number, bool, oneOfType } from 'prop-types';
import styled from 'styled-components';
import { prop } from 'styled-tools';

import getIcon from './getIcon';

import { key, getThemePropType, getKey } from 'sly/common/components/themes';
import { Block } from 'sly/common/components/atoms';

const iconSize = ({ size }) => {
  const textSize = getKey(`sizes.text.${size}`);
  const lineHeight = getKey(`sizes.lineHeight.${size}`);
  return textSize ? textSize * lineHeight : size;
};
const getTransform = ({ rotate, flip }) => `transform: rotate(${rotate * 90}deg)${flip ? ' scaleX(-1) scaleY(-1)' : ''}`;

/**
 * To make Icon compatible with text sizes, but backward compatible with the
 * deprecated icon size
 */
// sizes relative to set font-size
const Wrapper = styled(Block)`
  justify-content: center;
  ${getTransform};
`;

const Icon = styled(({ icon, size, ...props }) => {
  let Svg = getIcon(icon);
  if (!Svg) {
    // eslint-disable-next-line no-console
    console.error('Icon not found:', `${icon}-regular`);
  } else {
    Svg = styled(Svg)`
      align-self: center;
      height: ${iconSize};
      min-width: ${iconSize};
      fill: currentColor;
      stroke: ${prop('stroke', 'none')};
    `;
  }
  return (
    <Wrapper size={size} {...props} data-cy={icon}>
      <Svg />
    </Wrapper>
  );
})``;

Icon.displayName = 'Icon';

Icon.propTypes = {
  icon: string.isRequired,
  size: oneOfType([getThemePropType('text'), string]),
  stroke: string,
  flip: bool,
  rotate: number,
};

Icon.defaultProps = {
  flip: false,
  rotate: 0,
  size: 'body',
  display: 'inline-flex',
  align: 'center',
};

export default Icon;

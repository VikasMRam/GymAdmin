// https://github.com/diegohaz/arc/wiki/Example-components#icon
import React from 'react';
import { string, number, bool, oneOf } from 'prop-types';
import styled from 'styled-components';
import { ifProp, prop } from 'styled-tools';

import { variation as variationPropType } from 'sly/propTypes/variation';
import { palette as palettePropType } from 'sly/propTypes/palette';
import { size, palette, key } from 'sly/components/themes';

const fontSize = props => size('icon', props.size);
const getColor = ({ palette: paletteProp, variation }) => palette(paletteProp, variation);

const Wrapper = styled.span`
  display: inline-block;
  vertical-align: top;
  font-size: ${fontSize};
  color: ${prop('fill', getColor)};
  // sizes relative to set font-size
  width: ${fontSize};
  height: ${fontSize};
  ${ifProp('flip', 'transform: rotate(180deg)', '')};
  transition: transform ${key('transitions.fast')};
  & > svg {
    font-size: ${fontSize};
    display: block;
    fill: currentColor;
    stroke: ${prop('stroke', 'none')};
  }
`;

const Icon = ({ icon, size, ...props }) => {
  let svg;
  // FIXME: hack to use captionsize icons with current icons until we clarify with Jared
  const iconSize = size === 'caption'
    ? 'regular'
    : size;
  try {
    svg = require(`!raw-loader!./icons/${icon}-${iconSize}.svg`);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Icon not found:', `${icon}-${size}`);
    svg = '<span>x</span>';
  }
  return (
    <Wrapper size={size} {...props} dangerouslySetInnerHTML={{ __html: svg }} />
  );
};

Icon.propTypes = {
  icon: string.isRequired,
  width: number,
  size: oneOf(['tiny', 'small', 'regular', 'caption', 'large', 'xLarge', 'xxLarge']),
  palette: palettePropType,
  variation: variationPropType,
  fill: string,
  stroke: string,
  flip: bool,
};

Icon.defaultProps = {
  flip: false,
  size: 'regular',
  palette: 'secondary',
  variation: 'base',
};

export default Icon;

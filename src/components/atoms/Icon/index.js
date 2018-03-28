// https://github.com/diegohaz/arc/wiki/Example-components#icon
import React from 'react';
import { string, number, bool, oneOf, func } from 'prop-types';
import styled from 'styled-components';
import { palette } from 'styled-theme';
import { ifProp, prop } from 'styled-tools';

import { size } from 'sly/components/themes';

const fontSize = props => size('icon', props.size);

const Wrapper = styled.span`
  display: inline-block;
  font-size: ${fontSize};
  color: ${prop('fill', palette(0))};
  width: 1em;
  height: 1em;
  box-sizing: border-box;
  transform: ${ifProp({ orientation: 'up' }, 'rotate(180deg)', 'rotate(0deg)')};
  transition: transform 2s;
  & > svg {
    width: 100%;
    height: 100%;
    fill: currentcolor;
    stroke: ${prop('stroke', 'none')};
  }
`;

const Icon = ({ icon, transform, ...props }) => {
  const svg = require(`!raw-loader!./icons/${icon}.svg`);
  return (
    <Wrapper {...props} dangerouslySetInnerHTML={{ __html: transform(svg) }} />
  );
};

Icon.propTypes = {
  icon: string.isRequired,
  width: number,
  size: oneOf(['small', 'regular', 'large', 'xLarge']),
  palette: string,
  fill: string,
  stroke: string,
  transform: func,
};

Icon.defaultProps = {
  size: 'regular',
  palette: 'secondary',
  transform: txt => txt,
};

export default Icon;

import { css } from 'styled-components';
import { ifProp } from 'styled-tools';

import { palette } from 'sly/web/components/themes';

const getColor = (color, variation) => {
  const args = [color];
  if (variation) {
    args.push(variation);
  }
  return palette(...args);
};
/**
 *
 * @param props
 * @returns {[]|string|string|*}
 */
export const withColor = (props = {}) => css` 
  ${ifProp([
    'palette',
    'variation',
  ], css`
    color: ${getColor(props.palette, props.variation)}};
  `)}
  ${ifProp([
    'bg',
    'bgVariation',
  ], css`
    background: ${getColor(props.bg, props.bgVariation)};
  `)}
`;

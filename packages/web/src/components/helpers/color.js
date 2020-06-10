import { css } from 'styled-components';
import { ifProp } from 'styled-tools';

import { getColor } from './getColor';
/**
 *
 * @param props
 * @returns {[]|string|string|*}
 */
export const withColor = () => css` 
  ${ifProp('palette', css`
    color: ${getColor('palette', 'variation')}};
  `)}
  ${ifProp('background', css`
    background: ${getColor('background', 'backgroundVariation')};
  `)}
  ${ifProp('border', css`
    border-color: ${getColor('border', 'borderVariation')};
  `)}
`;

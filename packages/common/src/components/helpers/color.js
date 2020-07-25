import { css } from 'styled-components';
import { ifProp, ifNotProp } from 'styled-tools';

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
    ${ifNotProp('borderPalette', css`
      border-color: ${getColor('border', 'borderVariation')};
    `)}
  `)}
`;
// add border colour only if borderPalette prop is not passed
// this is important for preventing react native from crashing at seeing border-color: ;

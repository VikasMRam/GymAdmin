import { css } from 'styled-components';
import { ifProp } from 'styled-tools';

import { getWeight, getSize } from './helpers';

export const withText = props => css`
  ${ifProp('size', css`
    font-size: ${getSize('text')(props)};
    line-height: ${getSize('lineHeight')(props)};
  `)}

  ${ifProp('lineHeight', css`
    line-height: ${getSize('lineHeight', 'lineHeight')(props)};
  `)}

  ${ifProp('textDecoration', css`
    text-decoration: ${props.textDecoration};
  `)}

  ${getWeight(props)}
`;

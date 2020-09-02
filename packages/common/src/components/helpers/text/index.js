import { css } from 'styled-components';
import { ifProp, ifNotProp } from 'styled-tools';

import { getWeight, getSize } from './helpers';

const validLineHeightValues = ['0', 'normal'];

export const withText = ({ textDecoration, textTransform, ...props }) => css`
  ${ifProp('size', css`
    font-size: ${getSize('text')(props)};
    ${ifNotProp('lineHeight', css`
      line-height: ${getSize('lineHeight')(props)};
    `)}
  `)}

  // support lineHeight="0", lineHeight="normal" etc
  ${ifProp('lineHeight', css`
    line-height: ${validLineHeightValues.includes(props.lineHeight) ? props.lineHeight : getSize('lineHeight', 'lineHeight')(props)};
  `)}

  ${css({
    textDecoration,
    textTransform,
  })}

  ${getWeight(props)}
`;

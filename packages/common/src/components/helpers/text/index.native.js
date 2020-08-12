import { css } from 'styled-components';
import { ifProp } from 'styled-tools';

import { getWeight, getSize } from './helpers';

export const withText = (props) => {
  let lineHeight = '';
  if (props.size) {
    const fontSize = getSize('text')(props);
    if (fontSize) {
      lineHeight = `${fontSize.replace('px', '') * getSize('lineHeight')(props)}px`;
    }
  }
  if (props.lineHeight) {
    const fontSize = props.size ? getSize('text')(props) : 16;
    if (fontSize) {
      lineHeight = `${fontSize.replace('px', '') * getSize('lineHeight', 'lineHeight')(props)}px`;
    }
  }

  return css`
    ${props.size && css`
      font-size: ${getSize('text')(props)};
      line-height: ${lineHeight};
    `}

    ${ifProp('lineHeight', css`
      line-height: ${lineHeight};
    `)}

    ${ifProp('textDecoration', css`
      text-decoration: ${props.textDecoration};
    `)}

    ${getWeight(props)};
  `;
};

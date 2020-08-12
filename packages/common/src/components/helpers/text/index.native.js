import { css } from 'styled-components';
import { ifProp } from 'styled-tools';

import { getWeight, getSize } from './helpers';

// some values supported in web and not react native
const skipLineHeightValues = ['normal'];

export const withText = (props) => {
  let lineHeight = '';
  // support lineHeight="0"
  const hasLineHeightProp =
    props.lineHeight !== null && props.lineHeight !== undefined && !skipLineHeightValues.includes(props.lineHeight);
  if (props.size) {
    const fontSize = getSize('text')(props);
    if (fontSize && !hasLineHeightProp) {
      lineHeight = `${fontSize.replace('px', '') * getSize('lineHeight')(props)}px`;
    }
  }
  if (hasLineHeightProp) {
    if (parseInt(props.lineHeight, 10) === 0) {
      ({ lineHeight } = props);
    } else {
      const fontSize = props.size ? getSize('text')(props) : 16;
      if (fontSize) {
        lineHeight = `${fontSize.replace('px', '') * getSize('lineHeight', 'lineHeight')(props)}px`;
      }
    }
  }

  return css`
    ${props.size && css`
      font-size: ${getSize('text')(props)};
    `}

    ${lineHeight && css`
      line-height: ${lineHeight};
    `}

    ${ifProp('textDecoration', css`
      text-decoration: ${props.textDecoration};
    `)}

    ${getWeight(props)};
  `;
};

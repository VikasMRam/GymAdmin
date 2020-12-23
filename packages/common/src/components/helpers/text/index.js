import { css } from 'styled-components';
import { ifProp, ifNotProp, withProp } from 'styled-tools';

import { getFont, getSize as getThemeSize } from 'sly/common/components/themes';
import { getWeight, getSize } from './helpers';
import { startingWith } from '../media';

const validLineHeightValues = ['0', 'normal'];

const tabletQuery = `@media screen and (min-width: ${getThemeSize('breakpoint.tablet')})`;

export const font = (textProp) => {
  const variants = getFont(textProp);
  if (Array.isArray(variants)) {
    const [rest, mobile] = variants;
    return css({
      font: mobile,
      [tabletQuery]: { font: rest },
    });
  }
  return css({
    font: variants,
  });
};

export const withText = ({ textDecoration, textTransform, ...props }) => css`
  ${ifProp('size', css`
    font-size: ${getSize('text')(props)};
    ${ifNotProp('lineHeight', css`
      line-height: ${getSize('lineHeight')(props)};
    `)}
  `, withProp('font', font))}

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

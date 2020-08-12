import { css } from 'styled-components';

import padBottomStyle from './padBottomStyle';

import { size } from 'sly/common/components/themes';
import { getCardinalValues } from 'sly/common/components/helpers/getCardinalValues';

export const withPadding = ({ noPadding, ...props } = {}) => {
  // TODO: padding="0" instead
  if (noPadding) {
    return css`padding: 0px;`;
  }
  const values = getCardinalValues(props, 'padding', 'spacing');

  // if there is padding-bottom, remove last's child margin
  if (values.padding || values.paddingBottom) {
    return css`
      ${padBottomStyle}
      ${css(values)}
    `;
  }

  if (Object.keys(values).length) {
    return css(values);
  }

  return null;
};

export const withMargin = (props = {}) =>
  css(getCardinalValues(props, 'margin', 'spacing'));

// allow pad={0} or pad="0"
export const withPad = ({ pad } = {}) => pad !== undefined && pad !== null && css({
  marginBottom: parseInt(pad, 10) === 0 ? '0px' : size('spacing', pad),
});

export const withSpacing = () => css`
  ${withPadding}
  ${withMargin}
  ${withPad}
`;

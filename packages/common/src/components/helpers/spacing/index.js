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
      ${css(values)};
    `;
  }

  return css(values);
};

export const withMargin = (props = {}) => {
  return css(getCardinalValues(props, 'margin', 'spacing'));
};

export const withPad = ({ pad } = {}) => {
  return pad && css({
    marginBottom: size('spacing', pad),
  });
};

export const withSpacing = () => css`
  ${withPadding}
  ${withMargin}
  ${withPad}
`;

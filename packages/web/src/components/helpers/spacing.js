import styled, { css } from 'styled-components';

import { size } from 'sly/web/components/themes';
import { getCardinalValues } from 'sly/web/components/helpers/getCardinalValues';

const spacing = (Component, { top = 'xLarge', bottom = 'xLarge', left = 'xLarge', right = 'xLarge' }) => styled(Component)`
  padding-top: ${size('spacing', top)};
  padding-bottom: ${size('spacing', bottom)};
  padding-left: ${size('spacing', left)};
  padding-right: ${size('spacing', right)};
`;

export const withPadding = ({ noPadding, ...props } = {}) => {
  // TODO: padding="none" instead
  if (noPadding) {
    return css`padding: 0px;`;
  }
  return css(getCardinalValues(props, 'padding', 'spacing'));
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

export default spacing;

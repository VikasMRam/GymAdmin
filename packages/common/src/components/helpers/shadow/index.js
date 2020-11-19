import { css } from 'styled-components';

import { size, palette } from 'sly/common/components/themes';
import { withTransition } from 'sly/common/components/helpers/transition';

export const withShadow = ({ shadow, shadowHOffset, shadowVOffset, shadowBlur, shadowSpread, shadowPalette = 'slate.filler' }) => {
  if (shadowHOffset || shadowVOffset || shadowBlur || shadowSpread) {
    return css`
      box-shadow: ${shadowHOffset ? size('spacing', shadowHOffset) : '0'} ${shadowVOffset ? size('spacing', shadowVOffset) : '0'} ${size('spacing', shadowBlur)} ${size('spacing', shadowSpread)} ${palette(shadowPalette)}20;
    `;
  }
  if (shadow === 'regular') {
    return css`
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    `;
  }
};

export const withShadowOnHover = ({
  shadowOnHoverHOffset,
  shadowOnHoverVOffset,
  shadowOnHoverBlur,
  shadowOnHoverSpread,
  shadowOnHoverPalette = 'slate.filler',
}) =>
  (shadowOnHoverHOffset || shadowOnHoverVOffset || shadowOnHoverBlur || shadowOnHoverSpread) && css`
    ${withTransition('all')}
    &:hover {
      box-shadow: ${shadowOnHoverHOffset ? size('spacing', shadowOnHoverHOffset) : '0'} ${shadowOnHoverVOffset ? size('spacing', shadowOnHoverVOffset) : '0'} ${size('spacing', shadowOnHoverBlur)} ${size('spacing', shadowOnHoverSpread)} ${palette(shadowOnHoverPalette)}80;
    }
  `;

import { css } from 'styled-components';

import { size, palette } from 'sly/common/components/themes';
import { withTransition } from 'sly/common/components/helpers/transition';

export const withShadow = ({ shadowHOffset, shadowVOffset, shadowBlur, shadowSpread, shadowPalette = 'slate.filler' }) =>
  (shadowHOffset || shadowVOffset || shadowBlur || shadowSpread) && css`
    box-shadow: ${shadowHOffset ? size('spacing', shadowHOffset) : '0'} ${shadowVOffset ? size('spacing', shadowVOffset) : '0'} ${size('spacing', shadowBlur)} ${size('spacing', shadowSpread)} ${palette(shadowPalette)}80;
  `;

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

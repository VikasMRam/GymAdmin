import { css } from 'styled-components';

import { size, getKey, palette } from 'sly/common/components/themes';

const getElevation = ({ shadow }) => getKey(`sizes.spacing.${shadow}`).replace('px', '');

// elevation is for android
export const withShadow = ({ shadow }) => shadow && css`
  box-shadow: 0 0 ${size('spacing', shadow)} ${palette('slate', 'filler')};
  elevation: ${getElevation};
`;

// there is no hover in mobile. But allow this to pass in universal components without error.
export const withShadowOnHover = null;

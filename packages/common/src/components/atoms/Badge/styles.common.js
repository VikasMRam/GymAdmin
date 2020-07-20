import { css } from 'styled-components';

import { withColor, withText, withBorder } from 'sly/common/components/helpers';

export const textStyles = css`
  ${withText}
`;

export default css`
  ${textStyles}
  ${withColor}
  ${withBorder}
`;

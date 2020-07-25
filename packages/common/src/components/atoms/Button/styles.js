import { css } from 'styled-components';
import { ifProp } from 'styled-tools';

import { size } from 'sly/common/components/themes';
import {
  withSpacing,
  withBorder,
  withDisplay,
  withText,
  withColor,
} from 'sly/common/components/helpers';

export const textStyles = css`
  ${withText}
  ${withColor}
  font-weight: ${size('weight.medium')};
  text-decoration: none;
`;

export default css`
  ${textStyles}
  ${withColor}
  ${withBorder}
  ${withSpacing}
  display: flex;
  align-items: center;
  justify-content: center;
  ${ifProp({ kind: 'label' }, css`
    height: ${size('element.regular')};
  `)};
  ${withDisplay}
`;
// put withDisplay last to make sure that this display styles are always first priority

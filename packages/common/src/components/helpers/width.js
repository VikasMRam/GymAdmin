import { css } from 'styled-components';
import { ifProp } from 'styled-tools';

import { getKey } from 'sly/common/components/themes';

export const withWidth = ({ width }) => css`
  ${ifProp('width', css`
    width: ${getKey('sizes', 'layout', width) || width};
  `)}
`;
